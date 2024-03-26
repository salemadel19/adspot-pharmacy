import { Component, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScreensFacade } from '../services/screens-facade.service';

@Component({
  selector: 'app-connect-screen-modal',
  templateUrl: './connect-screen-modal.component.html',
  styleUrls: ['./connect-screen-modal.component.scss'],
})
export class ConnectScreenModalComponent implements OnInit {
  constructor(
    public ref: DynamicDialogRef,
    private screenFacade: ScreensFacade
  ) {}
  ngOnInit(): void {}
  public closeModal() {
    this.ref.close();
  }
}
