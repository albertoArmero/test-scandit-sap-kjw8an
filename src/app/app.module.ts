import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScanditSdkModule } from "scandit-sdk-angular";

import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ConfigModule } from '@spartacus/core';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule, defaultCmsContentConfig } from '@spartacus/storefront';
import { AddToCartModule } from '@spartacus/storefront';

const licenseKey: string = "AfNA5Wd/RW6pNTmJfRRmQrAlYOjPJs8Ep23NDwdbciySeTCVlGOpvOkrc5Z3R+pQwVhnuN1AuMhuPT7DQn03uyhPVVuXTRopcjTFebp231wiKrWSsSPKCoN6JRXWNLlDukKQrj5mtsUQFoVfgjRrBnAN4FDDAcOGNhYm1UlnbxGySJ5Arr8rDQBO/83d5c4qSFO4Omk8pRKoS+GZbeuNdGspK+/uVoD5UiTTAPn77aYMhoLHUbIxEezoB982fnaSkx0TFE6TMuIQvV9I21EGsSMVENZWVMdQTww/Z/IsyehbngQnYkkHI452ZwsaTcfrI315l51PG+Yx7WZ0wJ5l6V/CVsnZSay8pW2E5CQRXKrl0wdarGJ8MHMx1bsHSW3AZuFug5smvIa6cL8yh220/lkiDebZ6OWhzIxyuXVn02YG3bYv5Ur6DrKeBEF+nFpSYMZiyQHnAbvS9SixmnW6MjqXGhmsOQzraF0G8QcilVrlLCJTZg1uMcwbDMSFHgDyITAluln40KnL4Gm62vBhVBt/nL2eHibhskLftzpsCTj2hK5YSmV67dpdARgQr7riB3G3PcPBbPNTfZFsivqrOP+iMYq6rsjffxBMuTidZEcJULg48lL6ebCY7fREb3wUG0RSwSB7di3BJMyHW5+b4m6pK9vr5pO6Ypa3wqbnZ0fp6hoIsJLPVVBK/FH+aavrk5ObKmj65v9nolB9kWZAB+XCP4Ct/gn7BTmIvm/rj19Z54+Qg4E1frSBXtuCcIwcqcNtyA68A1HsVyuvxrtWrK/UU/QNtUbglulVVAih6eER1emx0SrEZ/YBNtc6th12TgkNWMx+koGFvdBTMQ==";
const engineLocation: string = "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/"; // could also be e.g. "build"


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    
    B2cStorefrontModule.withConfig({

    backend: {
      occ: {
        baseUrl: 'https://scandit-commerce2011cx.demo.hybris.com/',
        prefix: '/occ/v2/',
        legacy: false
      }
    },
    authentication: {
      client_id: 'mobile_android',
      client_secret: 'secret'
    },
    context: {
      baseSite: ['electronics-spa']
    },
    i18n: {
      resources: translations,
      chunks: translationChunksConfig,
      fallbackLang: 'en'
    }

    }),
    ScanditSdkModule.forRoot(licenseKey, {engineLocation}),
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}