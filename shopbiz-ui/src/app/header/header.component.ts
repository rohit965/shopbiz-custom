import {Component, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import { Subscription } from 'rxjs';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/user';
// import { ShoppingIcon } from '../../assets/shopping-bag.svg';
// import  * as ShoppingIcon   from 'raw-loader!../../assets/shopping-bag.svg';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  user: User;
  private userSub: Subscription;
  private cartSub: Subscription;
  title = 'Shop-n-Top';
  collapsed = true;
  totalQuantity: number = 0;

  constructor(
    public authService: AuthService,
    public shoppingCartService: ShoppingCartService
    // public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
        // console.log("user1", !user);
        // console.log("user2", !!user);
    });
    this.cartSub = this.shoppingCartService.getTotalItemsCount()
                        .subscribe(totalCount => this.totalQuantity = totalCount);
  }

  onLogout(e: Event) {
    this.authService.logout();
    e.preventDefault();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
