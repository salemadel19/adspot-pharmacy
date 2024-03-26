import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScreensFacade } from '../services/screens-facade.service';
import { OverlayListenerOptions, OverlayOptions } from 'primeng/api';
import {
  ICurrentDiffusions,
  IScreenFolder,
  ITvs,
} from '../../../core/models/typings.model';
import { Dropdown } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FoldersModalComponent } from '../../../../shared/folders-modal/folders-modal.component';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-screens-details',
  templateUrl: './screens-details.component.html',
  styleUrls: ['./screens-details.component.scss'],
})
export class ScreensDetailsComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  @ViewChild('propDropdown', { static: true }) propDropdown!: Dropdown;
  @ViewChild('dropdownTvsList', { static: true }) dropdownTvsList!: Dropdown;
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;
  public ref!: DynamicDialogRef;
  public tvs!: any[];
  public screenDetails!: ITvs;
  public folders!: IScreenFolder[];
  public currentScreensDiffusion!: ICurrentDiffusions[];
  public currentVideoIndex = 0;
  public isTvsDetailsRotated = false;
  public isTvsListRotated = false;
  public optionLabel: string = '';
  public isScreenListLoading$ = this.screensFacade.isScreenListLoading$;
  public currentDiffusion$ = this.screensFacade.currentScreensDiffusions$.pipe(
    tap((diff) => {
      this.optionLabel = 'Vidéos En cours';
      if (diff.length) {
        this.currentScreensDiffusion = diff;
      }
    })
  );
  constructor(
    private screensFacade: ScreensFacade,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.screensFacade.screenDetails$
      .pipe(
        tap((tv) => this.mapScreenDetailsToTvsList(tv)),
        takeUntil(this.destroy$)
      )
      .subscribe((details) => {
        if (details.tv_id) {
          this.screenDetails = details;
          this.showDropdownOveraly();
        }
      });
    this.screensFacade.screenFolders$
      .pipe(takeUntil(this.destroy$))
      .subscribe((folders) => {
        this.folders = folders;
      });
  }
  public showDropdownOveraly() {
    if (this.propDropdown) {
      this.isTvsDetailsRotated = true;
      this.isTvsListRotated = true;
      this.propDropdown.show();
      this.dropdownTvsList.show();
    }
  }
  getOverlayOptions(): OverlayOptions {
    return {
      listener: (event: Event, options?: OverlayListenerOptions) => {
        return false;
      },
    };
  }
  public openFoldersModal() {
    this.ref = this.dialogService.open(FoldersModalComponent, {
      header: 'Select a Folder',
      width: '25%',
      baseZIndex: 10000,
      closeOnEscape: true,
      dismissableMask: true,
      styleClass: 'folders',
      data: { type: 'screen' },
    });
    this.ref.onClose.subscribe((folder: IScreenFolder) => {
      if (folder) {
        let tvs_ids: any[];
        if (!folder.tv_ids) {
          tvs_ids = [];
        } else {
          tvs_ids = [...folder.tv_ids];
        }
        
        if (!tvs_ids.includes(this.screenDetails.tv_id)) {
          tvs_ids.push(this.screenDetails.tv_id);
        }
        
        this.screensFacade.addScreenToAFolder({
          ...folder,
          tv_ids: tvs_ids,
        });
      }
    });
  }
  public mapScreenDetailsToTvsList(tv: ITvs) {
    this.tvs = [
      {
        name: 'Ville: ',
        code: tv.contact_wilaya + ', ' + tv.contact_city,
      },
      {
        name: 'Adresse: ',
        code: tv.contact_address,
      },
      {
        name: 'Résolution: ',
        code: '1920 x 1080',
      },
      {
        name: 'Taille: ',
        code: '43',
      },
    ];
  }
  public preventClickIfNoLocation(isLocation: boolean, event: Event) {
    if (!isLocation) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public startVideoPlayback() {
    this.currentVideoIndex = 0;
    this.toggleFullScreen(this.videoPlayer.nativeElement);
    this.playNextVideo();
  }
  public toggleFullScreen(videoElement: any) {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    }
  }
  public playNextVideo() {
    const videoElement = this.videoPlayer.nativeElement as HTMLVideoElement;
    videoElement.src = this.getNextVideoSource();
    videoElement.load();
    videoElement.play();
    videoElement.onended = () => {
      this.playNextVideo();
    };
  }
  public getNextVideoSource(): string {
    if (this.currentVideoIndex < this.currentScreensDiffusion.length) {
      this.currentVideoIndex = this.currentVideoIndex;
    } else {
      this.currentVideoIndex = 0;
    }
    let video_url =
      this.currentScreensDiffusion[this.currentVideoIndex].video_url;
    this.currentVideoIndex++;
    return video_url;
  }

  toggleRotation(dropdownType: string) {
    if (dropdownType === 'tvs_details') {
      this.isTvsDetailsRotated = !this.isTvsDetailsRotated;
    } else {
      this.isTvsListRotated = !this.isTvsListRotated;
    }
  }
  public onScreenVideoSelection(diffusion: ICurrentDiffusions) {
    this.optionLabel = diffusion ? diffusion.video_name : '';
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.src = diffusion.video_url;
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
      this.toggleFullScreen(this.videoPlayer.nativeElement);
    }
  }
  public disabledDropdown() {
    if (!this.screenDetails.contact_id) {
      this.isTvsDetailsRotated = false;
      return false;
    }
    return true;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  handleFullscreenChange(event: any) {
    if (!document.fullscreenElement && !document.fullscreen) {
      this.showDropdownOveraly();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
