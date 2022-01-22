import { Observable } from 'rxjs';

export interface OnDropOut {
  onDropOut: () => Observable<boolean>;
}
