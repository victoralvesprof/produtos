import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarModule } from './components/cadastrar/cadastrar.module';
import { ConsultarModule } from './components/consultar/consultar.module';
import { productReducer } from './components/shared/store/reducers/product.reducer';
import { ProductEffects } from './components/shared/store/effects/product.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CadastrarModule,
    ConsultarModule,
    StoreModule.forRoot({ products: productReducer }, {}),
    EffectsModule.forRoot([
      ProductEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
