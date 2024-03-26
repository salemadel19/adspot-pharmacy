import { Component, OnInit } from '@angular/core';
import { AppFacade } from '../../app-facade.service';

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.scss'],
})
export class ScreensComponent implements OnInit {
  constructor(private appFacade: AppFacade) {}
  ngOnInit(): void {
    this.appFacade.setSidebarStatusToClose(false);
  }
}
