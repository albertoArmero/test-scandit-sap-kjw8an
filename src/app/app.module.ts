import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScanditSdkModule } from "scandit-sdk-angular";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from "@angular/common/http";

import { ConfigModule, GlobalMessageConfig, GlobalMessageType} from '@spartacus/core';
import { translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule} from '@spartacus/storefront';
import { AddToCartService } from './add-to-cart.service';

const licenseKey: string = "AfNA5Wd/RW6pNTmJfRRmQrAlYOjPJs8Ep23NDwdbciySeTCVlGOpvOkrc5Z3R+pQwVhnuN1AuMhuPT7DQn03uyhPVVuXTRopcjTFebp231wiKrWSsSPKCoN6JRXWNLlDukKQrj5mtsUQFoVfgjRrBnAN4FDDAcOGNhYm1UlnbxGySJ5Arr8rDQBO/83d5c4qSFO4Omk8pRKoS+GZbeuNdGspK+/uVoD5UiTTAPn77aYMhoLHUbIxEezoB982fnaSkx0TFE6TMuIQvV9I21EGsSMVENZWVMdQTww/Z/IsyehbngQnYkkHI452ZwsaTcfrI315l51PG+Yx7WZ0wJ5l6V/CVsnZSay8pW2E5CQRXKrl0wdarGJ8MHMx1bsHSW3AZuFug5smvIa6cL8yh220/lkiDebZ6OWhzIxyuXVn02YG3bYv5Ur6DrKeBEF+nFpSYMZiyQHnAbvS9SixmnW6MjqXGhmsOQzraF0G8QcilVrlLCJTZg1uMcwbDMSFHgDyITAluln40KnL4Gm62vBhVBt/nL2eHibhskLftzpsCTj2hK5YSmV67dpdARgQr7riB3G3PcPBbPNTfZFsivqrOP+iMYq6rsjffxBMuTidZEcJULg48lL6ebCY7fREb3wUG0RSwSB7di3BJMyHW5+b4m6pK9vr5pO6Ypa3wqbnZ0fp6hoIsJLPVVBK/FH+aavrk5ObKmj65v9nolB9kWZAB+XCP4Ct/gn7BTmIvm/rj19Z54+Qg4E1frSBXtuCcIwcqcNtyA68A1HsVyuvxrtWrK/UU/QNtUbglulVVAih6eER1emx0SrEZ/YBNtc6th12TgkNWMx+koGFvdBTMQ==";
const engineLocation: string = "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/"; // could also be e.g. "build"

enableProdMode();

function yourGlobalMessageConfigFactory(): GlobalMessageConfig {
  return {
    globalMessages: {
      [GlobalMessageType.MSG_TYPE_CONFIRMATION]: {
        timeout: 5000,
      },
      [GlobalMessageType.MSG_TYPE_ERROR]: {
        timeout: 3000,
      },
    },
  };
}

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
        backend: {
          loadPath: 'assets/i18n-assets/en/{{ns}}.json'
        },
        chunks: translationChunksConfig
      }
    }),
    ScanditSdkModule.forRoot(licenseKey, { engineLocation }),
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ConfigModule.withConfigFactory(yourGlobalMessageConfigFactory)
  ],
  providers: [AddToCartService],
  bootstrap: [AppComponent]
})
export class AppModule {}






