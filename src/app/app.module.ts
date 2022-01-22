import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app-routes';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { authInterceptorProviders } from './auth/interceptors';
import { DropOutDialogComponent } from './common/components';
import { MaterialModule } from './shared';

@NgModule({
  declarations: [AppComponent, DropOutDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
  ],
  providers: [...authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
