import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  currentRoute: string = '';

  navItems: MenuItem[] = [
    {
      label: 'Entity Search',
      route: '/entity/search',
    },
    {
      label: 'Entity Management',
      expanded: false,
      children: [
        {
          label: 'Entity Information',
          route: '/entity/information',
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial route
    this.currentRoute = this.router.url;

    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  toggleSubmenu(item: MenuItem, event?: Event): void {
    if (item.children) {
      event?.stopPropagation();
      item.expanded = !item.expanded;
    }
  }

  navigateTo(item: MenuItem, event?: Event): void {
    if (item.route) {
      event?.stopPropagation();
      this.router.navigate([item.route]);
    } else if (item.children) {
      this.toggleSubmenu(item, event);
    }
  }

  isActive(item: MenuItem): boolean {
    if (item.route) {
      return this.currentRoute === item.route;
    }
    // Check if any child is active
    if (item.children) {
      return item.children.some((child) => child.route === this.currentRoute);
    }
    return false;
  }
}
