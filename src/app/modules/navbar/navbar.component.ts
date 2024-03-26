import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AppFacade } from '../../app-facade.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public isCloseSidebar!: boolean;
  public isCloseContent!: boolean;
  items: MenuItem[] | undefined;
  public stepper!: MenuItem[];
  public client$ = this.appFacade.client$;
  public activeItem$ = this.appFacade.activeItem$;
  public firstLetter = '';
  public activeIndex: number = 0;
  @Input() selectedMenuItem!: string;
  public user$ = this.appFacade.user$.pipe(
    tap((user) => (this.firstLetter = user[0].toUpperCase()))
  );
  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  clickedOutside(): void {
    this.isDropdownVisible = false;
  }

  constructor(private appFacade: AppFacade, private router: Router) {}
  ngOnInit(): void {
    this.appFacade.currentSidebarStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.isCloseSidebar = data;
      });

   
  }

  public logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }
  public navigateProfile() {
    this.router.navigate(['/profile']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
