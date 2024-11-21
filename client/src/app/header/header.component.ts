import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class HeaderComponent {
  isAuthenticated = false;
  isMobileNavOpen = false;

  onToggleMobileNav(): void {
    console.log('onToggleMobileNav');
    this.isMobileNavOpen = !this.isMobileNavOpen;
    console.log(this.isMobileNavOpen);
  }
}
