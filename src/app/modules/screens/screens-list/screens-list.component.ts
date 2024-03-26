import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, map, startWith, takeUntil, tap, withLatestFrom } from 'rxjs';
import { ConnectScreenModalComponent } from '../connect-screen-modal/connect-screen-modal.component';
import { ScreensFacade } from '../services/screens-facade.service';
import { IScreenFolder, ITvs } from '../../../core/models/typings.model';
import { ConfirmationService } from 'primeng/api';
import { FoldarCreationModalComponent } from '../../../../shared/foldar-creation-modal/foldar-creation-modal.component';
import { AppFacade } from '../../../app-facade.service';

@Component({
  selector: 'app-screens-list',
  templateUrl: './screens-list.component.html',
  styleUrls: ['./screens-list.component.scss'],
})
export class ScreensListComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public searchForm: FormGroup;
  public ref!: DynamicDialogRef;
  public filteredScreens!: ITvs[];
  public screens!: ITvs[];
  public isSorting = false;
  public clientID!: string;
  public folders!: IScreenFolder[];
  public selectedScreen!: ITvs;
  public isScreenListLoading$ = this.screensFacade.isScreenListLoading$;
  public isFolderLoading$ = this.screensFacade.isFolderLoading$;
  public totalScreens$ = this.screensFacade.totalScreens$;
  public screens$ = this.screensFacade.screens$.pipe(
    tap((screens) => {
      this.screens = screens;
      if (screens.length) {

        this.screensFacade.loadScreensFolders();
        this.filteredScreens = screens;
        this.handleScreenSelection(0);
      }
    })
  );
  constructor(
    private dialogService: DialogService,
    private screensFacade: ScreensFacade,
    private confirmationService: ConfirmationService,
    private appFacade: AppFacade
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.screensFacade.loadScreenList();
    this.searchForm
      .get('search')!
      .valueChanges.pipe(
        startWith(''),
        withLatestFrom(this.screens$),
        map(([val, screens]) =>
          !val
            ? screens
            : screens.filter(
                (term) =>
                  term.contact_lastname
                    .toLowerCase()
                    .indexOf(val.toLowerCase()) !== -1 ||
                  term.contact_wilaya
                    .toLowerCase()
                    .indexOf(val.toLowerCase()) !== -1 ||
                  term.contact_firstname
                    .toLowerCase()
                    .indexOf(val.toLowerCase()) !== -1
              )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((filteredList) => {
        this.filteredScreens = filteredList;
        this.searchAndPreserveSelectedScreen();
      });
    this.screensFacade.clientID$
      .pipe(takeUntil(this.destroy$))
      .subscribe((client_id) => (this.clientID = client_id));

    this.screensFacade.screenFolders$
      .pipe(takeUntil(this.destroy$))
      .subscribe((folders) => {
        this.folders = folders;
        if (folders.length > 0) {
          this.calculateFolderOfflineTvs();
          this.calculateFolderOnlineTvs();
        }
      });
  }

  public findFoldersBySelectedScreen(screen: any) {
    let filteredFolders: IScreenFolder[] = [];
    if (this.folders?.length > 0) {
      filteredFolders = this.folders.filter((folder) => {
        return folder.tv_ids && folder.tv_ids.includes(screen.video_id);
      });
    }
    return filteredFolders;
  }
  public sortByStatus() {
    this.isSorting = !this.isSorting;
    this.filteredScreens = this.appFacade.sortByTvStatus(
      this.filteredScreens,
      'tv_status',
      this.isSorting
    );
  }
  public sortAlphabetically() {
    this.isSorting = !this.isSorting;
    this.filteredScreens = this.appFacade.sortAlphabetically(
      this.filteredScreens,
      'contact_lastname',
      this.isSorting
    );
  }
  public calculateOnlineTvs() {
    return this.screens.filter((tv) => tv.tv_status === 'on').length;
  }
  public calculateOfflineTvs() {
    return this.screens.filter((tv) => tv.tv_status === 'off').length;
  }
  public filterOnlineTvs() {
    this.filteredScreens = this.screens;
    this.filteredScreens = this.filteredScreens.filter(
      (status) => status.tv_status === 'on'
    );
  }
  public filterOfflineTvs() {
    this.filteredScreens = this.screens;
    this.filteredScreens = this.filteredScreens.filter(
      (status) => status.tv_status === 'off'
    );
  }
  public calculateFolderOnlineTvs() {
    let folders = this.folders;

    this.folders = folders.map((folder) => ({
      ...folder,
      onTvCount: folder.tvs_info
        ? folder.tvs_info.filter((tv) => tv.tv_status === 'on').length
        : 0,
    }));
  }
  public calculateFolderOfflineTvs() {
    let folders = this.folders;
    this.folders = folders.map((folder) => ({
      ...folder,
      offTvCount: folder.tvs_info
        ? folder.tvs_info.filter((tv) => tv.tv_status === 'off').length
        : 0,
    }));
  }

  public showAllScreens() {
    this.resetFolderSelection();
    this.filteredScreens = this.screens;
    this.handleScreenSelection(0);
    return this.filteredScreens;
  }

  public resetFolderSelection() {
    if (this.folders) {
      this.folders = this.folders.map((folder) => ({
        ...folder,
        isSelected: false,
      }));
    }
  }
  public handleScreenSelection(index: number) {
    const selectedFolder = this.findFoldersBySelectedScreen(
      this.filteredScreens[index]
    );
    this.emitScreenSelection(
      this.filteredScreens[index],
      selectedFolder,
    );
  }
  public emitScreenSelection(
    selected: ITvs,
    folders: IScreenFolder[],
  ) {
    this.screensFacade.onScreenSelection(selected, folders);
  }
  public onScreenSelection(index: number) {
    this.selectedScreen = this.filteredScreens[index];
    if (!this.filteredScreens[index].isSelected) {
      this.filteredScreens = this.updateSelectedScreen(index);
      const selected = this.filteredScreens[index];
      const folders = this.getSelectedScreenFolders(selected);
      this.emitScreenSelection(selected, folders);
      this.screensFacade.clearScreensCurrentDiffusion();
    }
  }
  public updateSelectedScreen(index: number) {
    return this.filteredScreens.map((screen, i) => ({
      ...screen,
      isSelected: i === index,
    }));
  }
  public getSelectedScreenFolders(selected: ITvs) {
    return selected.isSelected
      ? this.findFoldersBySelectedScreen(selected)
      : this.findFoldersBySelectedScreen(this.filteredScreens[0]);
  }

  public onFolderSelection(index: number) {
    if (this.folders.length) {
      this.updateFolderSelection(index);
    }
    this.emitFolderSelection(index);
    this.filterScreensByFolder(this.folders[index]);
  }

  public updateFolderSelection(index: number): void {
    this.folders = this.folders.map((folder, i) => ({
      ...folder,
      isSelected: i === index ? true : false,
    }));
  }

  public emitFolderSelection(index: number): void {
    const { client_id, folder_id } = this.folders[index];
    this.screensFacade.onFolderSelection(client_id, folder_id);
  }
  public filterScreensByFolder(folder: IScreenFolder) {
    if (!folder.isSelected) {
      this.filteredScreens = this.screens;
    } else {
      this.filteredScreens = this.filterScreens(folder);
    }

    const index = this.getSelectedScreenIndex();
    if (index !== -1) {
      this.handleScreenSelection(index);
    }

    return this.filteredScreens;
  }

  public filterScreens(folder: IScreenFolder) {
    return folder.tv_ids && folder.tv_ids.length > 0
      ? this.screens.filter((screen) => folder.tv_ids.includes(screen.tv_id))
      : [];
  }

  public getSelectedScreenIndex(): number {
    return this.filteredScreens?.findIndex((screeen) => screeen.isSelected);
  }
  public openConfirmationModal(
    folder_id: string,
    client_id: string,
    event: Event
  ) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment confirmer la suppression ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.screensFacade.onAcceptDeleteFolder(folder_id, client_id);
        this.showAllScreens();
      },
      reject: () => {
        console.log('You have rejected');
      },
    });
  }
  public openUploadDialog() {
    this.dialogService.open(ConnectScreenModalComponent, {
      header: 'Connect a new Screen',
      width: '45%',
      height: 'auto',
      baseZIndex: 10000,
      closeOnEscape: true,
      dismissableMask: true,

      styleClass: 'connect-screen',
    });
  }
  public openFoldarModal() {
    this.ref = this.dialogService.open(FoldarCreationModalComponent, {
      header: 'Créer un nouveau Dossier',
      width: '30%',
      baseZIndex: 10000,
      closeOnEscape: true,
      dismissableMask: true,
      styleClass: 'new-folder',
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.screensFacade.createScreenFolder({
          folder_title: res.title,
          folder_description: res.description,
          client_id: this.clientID,
        });
      }
    });
  }
  public searchAndPreserveSelectedScreen() {
    if (this.selectedScreen?.tv_id) {
      this.filteredScreens = this.filteredScreens.map((screen, i) => {
        return {
          ...screen,
          isSelected: screen.tv_id === this.selectedScreen.tv_id ? true : false,
        };
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
