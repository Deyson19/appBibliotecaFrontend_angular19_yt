import { CommonModule } from '@angular/common';
import { ISideBarItems } from './../../interfaces/ISideBarItems';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {
  public sidebarItems = signal<ISideBarItems[]>([
    {
      icon: 'home',
      name: 'Home',
      path: './',
    },
    {
      icon: 'add',
      name: 'Agregar',
      path: './nuevo',
    },
  ]);
}
