import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppFacade } from '../../app-facade.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public currentItem!: string;
  public menu1!: MenuItem[];
  public isCloseSidebar!: boolean;
  public isCloseContent!: boolean;
  public creationType!: string;

  constructor(private appFacade: AppFacade) {}
  ngOnInit() {
    this.appFacade.currentRoute$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        this.currentActiveMenu(item);
        this.currentItem = item;
        this.creationType = '';
        this.stupMenu();
      });
    this.appFacade.currentSidebarStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.isCloseSidebar = data;
      });

    
  }

  public stupMenu() {
    this.menu1 = [
      {
        label: 'Tableau de bord',
        icon: 'pi pi-home',
        routerLink: ['/dashboard'],
        command: (e) => {
          this.activeMenu(e);
        },
        styleClass: this.currentItem === 'dashboard' ? 'active' : 'inactive',
      },

      {
        label: 'Ecrans',
        icon: 'pi pi-desktop',
        routerLink: ['/screens'],
        command: (e) => {
          this.activeMenu(e);
        },

        styleClass: this.currentItem === 'screens' ? 'active' : 'inactive',
      },
    ];
  }
  public currentActiveMenu(item: string) {
    switch (item) {
      case 'dashboard':
        return this.appFacade.onMenuSelection('Tableau de bord');
      case 'screens':
        return this.appFacade.onMenuSelection('Ecrans');
      default:
        return this.appFacade.onMenuSelection('Profile');
    }
  }
  activeMenu(e: any) {
    this.appFacade.onMenuSelection(e.item.label);
    this.menu1.forEach((item) => {
      if (item.label) {
        item.styleClass = 'inactive';
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
