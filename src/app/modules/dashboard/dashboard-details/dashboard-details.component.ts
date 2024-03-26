import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardFacade } from '../services/dashboard-facade.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.scss'],
})
export class DashboardDetailsComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public isDashboardLoading$ = this.dashboardFacade.isDashboardLoading$;
  public notifications$ = this.dashboardFacade.notifications$;
  constructor(private dashboardFacade: DashboardFacade) {}
  ngOnInit(): void {}
  public onCloseNotifcation(notification_id: string) {
    this.dashboardFacade.onCloseNotification(notification_id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
