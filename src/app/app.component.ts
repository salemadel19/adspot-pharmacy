import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AppFacade } from './app-facade.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  selectedMenuItem: string = '';
  activeRouteName: string = '';
  public isUserLogged$ = this.appFacade.loggedUser$;
  public currentRoute!: string;
  public isCloseSidebar!: boolean;


  constructor(
    private appFacade: AppFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    
    this.appFacade.currentRoute$
      .pipe(takeUntil(this.destroy$))
      .subscribe((route) => {
        this.currentRoute = route;
        this.appFacade.onCurrentActiveRoute(route);
      });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const childRoute = this.route.firstChild;
        childRoute?.snapshot.url[0]?.path
          ? (this.selectedMenuItem = childRoute?.snapshot.url[0]?.path)
          : '';
        this.appFacade.onCurrentActiveRoute(this.selectedMenuItem);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
