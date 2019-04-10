import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this._authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
   }

   logout() {
      this._authService.logout();
   }

   ngOnDestroy() {
     this.authSubscription.unsubscribe();
   }

}
