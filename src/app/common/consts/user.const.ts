import { InjectionToken } from '@angular/core';

const defaultUserAvatarUrl = '/assets/images/314672_smiling_face_icon.png';

export const DEFAULT_USER_AVATAR_URL_INJECTION_TOKEN = new InjectionToken<string>(
  'defaultUserAvatarUrl',
  {
    factory: () => defaultUserAvatarUrl,
  }
);
