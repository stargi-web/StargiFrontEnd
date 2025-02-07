import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { MessageService } from 'primeng/api';
import { httpErrorInterceptor } from './core/interceptors/httpError.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([...routes]),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        tokenInterceptor,
        loadingInterceptor,
        httpErrorInterceptor,
      ])
    ),
    importProvidersFrom([BrowserAnimationsModule]),
    MessageService,
  ],
};
