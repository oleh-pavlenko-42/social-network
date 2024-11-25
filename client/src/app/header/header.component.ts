import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  isAuthenticated = false;
  isMobileNavOpen = false;

  ngOnInit(): void {
    const userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.destroyRef.onDestroy(() => {
      userSub.unsubscribe();
    });
  }

  onToggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
