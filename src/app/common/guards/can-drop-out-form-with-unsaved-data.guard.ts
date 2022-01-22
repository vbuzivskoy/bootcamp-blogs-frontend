import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { OnDropOut } from '../interfaces';

export class CanDropOutFormWithUnsavedDataGuard<T extends OnDropOut>
  implements CanDeactivate<T>
{
  canDeactivate(component: T): Observable<boolean> {
    return component.onDropOut();
  }
}
