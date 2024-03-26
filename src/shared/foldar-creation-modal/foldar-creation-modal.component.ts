import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-foldar-creation-modal',
  templateUrl: './foldar-creation-modal.component.html',
  styleUrls: ['./foldar-creation-modal.component.scss'],
})
export class FoldarCreationModalComponent {
  public folderForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public ref: DynamicDialogRef) {
    this.folderForm = this.formBuilder.group({
      folder_title: this.formBuilder.control('', [Validators.required]),
      folder_description: this.formBuilder.control('', [Validators.required]),
    });
  }

  public emitFolderDetails() {
    this.ref.close({
      title: this.FolderTitle,
      description: this.FolderDescritption,
    });
  }
  public closeCFoldarModal() {
    this.ref.close();
  }
  public get FolderTitle() {
    return this.folderForm.get('folder_title')?.value.trim();
  }
  public get FolderDescritption() {
    return this.folderForm.get('folder_description')?.value.trim();
  }
}
