import { Injectable } from '@angular/core';

import { CanDropOutFormWithUnsavedDataGuard } from '../../common/guards';
import { SignUpComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class CanDropOutSignUpGuard extends CanDropOutFormWithUnsavedDataGuard<SignUpComponent> {}
