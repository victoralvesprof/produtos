import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProductAction } from './components/shared/store/actions/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'produtos';

  constructor(private store: Store){ }
  
  ngOnInit(): void {
    this.store.dispatch(getProductAction());
  }
}
