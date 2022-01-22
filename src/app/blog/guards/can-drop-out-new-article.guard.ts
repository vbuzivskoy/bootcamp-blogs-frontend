import { Injectable } from '@angular/core';

import { CanDropOutFormWithUnsavedDataGuard } from '../../common/guards';
import { NewArticleComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class CanDropOutNewArticle extends CanDropOutFormWithUnsavedDataGuard<NewArticleComponent> {}
