import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit,  OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this._authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  closeSidenav() {
    this.sidenavClose.emit();
    this.logout();
  }

  logout() {
    this._authService.logout();
 }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
