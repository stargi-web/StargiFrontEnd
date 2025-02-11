import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

//variables:
// token, userId,name, username,role,teamId
@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Guarda un valor en sessionStorage
  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      sessionStorage.setItem(key, value);
    } else {
      console.warn('SessionStorage no está disponible en este entorno.');
    }
  }

  // Recupera un valor de sessionStorage
  getItem(key: string): string | null {
    return this.isBrowser ? sessionStorage.getItem(key) : null;
    //return sessionStorage.getItem(key);
  }

  // Elimina un ítem de sessionStorage
  removeItem(key: string): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }

  // Limpia todos los datos de sessionStorage
  clear(): void {
    if (this.isBrowser) {
      sessionStorage.clear();
    }
  }
}
