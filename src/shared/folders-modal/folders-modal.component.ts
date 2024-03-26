import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ScreensFacade } from '../../app/modules/screens/services/screens-facade.service';

@Component({
  selector: 'app-folders-modal',
  templateUrl: './folders-modal.component.html',
  styleUrls: ['./folders-modal.component.scss'],
})
export class FoldersModalComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public folders!: any[];
  public componentType!: string;
  constructor(
    public ref: DynamicDialogRef,
    private screenFacade: ScreensFacade,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.componentType = this.config.data['type'];

    this.screenFacade.screenFolders$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.length && this.componentType === 'screen') {
          this.folders = res;
          this.calculateTotalItemIDS();
        }
      });
  }

  closeCFoldarModal() {
    this.ref.close();
  }
  public onFolderSelection(index: number) {
    if (this.folders.length) {
      this.folders = this.folders.map((folder: any, i: number) => {
        if (i === index) {
          return { ...folder, isSelected: !folder.isSelected };
        } else {
          return { ...folder, isSelected: false };
        }
      });
    }
  }
  public isFolderSelected() {
    return this.folders.some((folder: any) => folder.isSelected);
  }

  public submitSelectedFolder() {
    let folder = this.folders.find((folder: any) => folder.isSelected);
    this.ref.close(folder);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  public calculateTotalItemIDS() {
    if (this.componentType === 'screen') {
      this.calculateTotalItemsForScreenFolders();
    }
  }

  private calculateTotalItemsForScreenFolders() {
    this.folders = this.folders.map((folder) => ({
      ...folder,
      totalItems:
        folder?.tv_ids && folder?.tv_ids.length ? folder?.tv_ids.length : 0,
    }));
  }
}
