import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacade } from '../../app-facade.service';
import { DashboardFacade } from './services/dashboard-facade.service';
import { Subject, takeUntil } from 'rxjs';
import { INotification } from '../../core/models/typings.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public notifications!: INotification[];
  public destroy$ = new Subject<void>();

  constructor(
    private appFacade: AppFacade,
    private dashboardFacade: DashboardFacade
  ) {}
  ngOnInit(): void {
    this.appFacade.setSidebarStatusToClose(false);
   
    this.dashboardFacade.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
