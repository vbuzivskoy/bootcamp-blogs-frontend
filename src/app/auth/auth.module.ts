import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared';
import { SignInComponent, SignUpComponent } from './components';
import { AuthService, UserService } from './services';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [AuthService, UserService],
})
export class AuthModule {}
