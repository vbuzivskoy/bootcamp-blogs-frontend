import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let storage: any;
  let authService: AuthService;
  let mockHttp: any;
  let mockLocalStorage: any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj(['get', 'post']);
    authService = new AuthService(mockHttp);
    storage = {};

    mockLocalStorage = {
      setItem: (itemName: string, itemValue: any) => {
        storage[itemName] = itemValue;
      },
      getItem: (itemName: string) => {
        return storage[itemName];
      },
      removeItem: (itemName: string) => {
        delete storage[itemName];
      },
    };

    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
  });

  it('should not be logged in initialy', () => {
    expect(authService.isLoggedIn()).toBeFalse();
  });

  it('should sign in correctly', () => {
    const authToken = 'test auth token';
    const email = 'test@example.com';
    const password = 'ThisIsAVarySecretPassword';
    mockHttp.post.and.returnValue(of({ token: authToken }));

    authService.signIn(email, password).subscribe();

    expect(mockHttp.post).toHaveBeenCalledWith('http://test.test/user/signin', {
      email,
      password,
    });
    expect(authService.getAuthToken()).toBe(authToken);
    expect(authService.isLoggedIn()).toBeTrue();
  });

  it('should logout correctly', () => {
    const authToken = 'test auth token';
    const email = 'test@example.com';
    const password = 'ThisIsAVarySecretPassword';
    mockHttp.post.and.returnValue(of({ token: authToken }));
    authService.signIn(email, password).subscribe();

    authService.logout();

    expect(authService.isLoggedIn()).toBeFalse();
  });

  it('should call http get method when getting current user', () => {
    const user = 'fake user';
    mockHttp.get.and.returnValue(of({ user }));
    authService.getCurrentUser().subscribe();

    expect(mockHttp.get).toHaveBeenCalledWith('http://test.test/user/me');
  });

  it('should call http get method one time when getting current user twice', () => {
    const user = 'fake user';
    mockHttp.get.and.returnValue(of({ user }));
    authService.getCurrentUser().subscribe();
    authService.getCurrentUser().subscribe();

    expect(mockHttp.get).toHaveBeenCalledTimes(1);
  });
});
