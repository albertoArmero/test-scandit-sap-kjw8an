import { Component, Injectable } from '@angular/core';
import { Barcode, BarcodePicker, Camera, CameraAccess, CameraSettings, ScanResult, ScanSettings } from "scandit-sdk";
import { BarcodeScannerComponent} from './barcode-scanner/barcode-scanner.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AddToCartComponent, ModalService } from '@spartacus/storefront';
import { AddToCartModule} from '@spartacus/storefront';
import { CartAddEntry } from '@spartacus/core/src/cart/store/actions/cart-entry.action';
import { AddToCartService } from './add-to-cart.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
@Injectable({providedIn:'root'})
export class AppComponent  {
  name = 'Angular';
  faCoffee = faCoffee;

  public activeSettings: ScanSettings;
  public settings128: ScanSettings;
  public settings39: ScanSettings;
  public scannerGuiStyle: BarcodePicker.GuiStyle = BarcodePicker.GuiStyle.VIEWFINDER;
  public activeCamera: Camera;
  public cameraSettings: CameraSettings;
  public scanningPaused: boolean = false;
  public visible: boolean = true;
  public fps: number = 30;
  public videoFitContain: BarcodePicker.ObjectFit = BarcodePicker.ObjectFit.CONTAIN;
  public videoFitCover: BarcodePicker.ObjectFit = BarcodePicker.ObjectFit.COVER;
  public videoFit: BarcodePicker.ObjectFit = this.videoFitCover;
  public scannedCodes: Barcode[] = [];
  public isReady: boolean = false;
  public enableCameraSwitcher: boolean = true;
  public enablePinchToZoom: boolean = true;
  public enableTapToFocus: boolean = true;
  public enableTorchToggle: boolean = true;
  public enableVibrateOnScan: boolean = true;
  public cameraAccess: boolean = true;
  public enableSoundOnScan: boolean = true;


  public possibleCameras: Camera[] = [];
  

  constructor(private addToCartService : AddToCartService) {
    this.settings128 = new ScanSettings({
      enabledSymbologies: [Barcode.Symbology.CODE128],
      codeDuplicateFilter: 3000
    });
    this.settings39 = new ScanSettings({
      enabledSymbologies: [Barcode.Symbology.CODE39],
    });
    this.activeSettings = this.settings128;

    CameraAccess.getCameras().then((cameras) => {
      this.possibleCameras = cameras;
    });

    this.cameraSettings = {
      resolutionPreference: CameraSettings.ResolutionPreference.FULL_HD,
    };

    this.setupCameraSettings();
  

  }

  public toggleGuiStyle(): void {
    if (this.scannerGuiStyle === BarcodePicker.GuiStyle.VIEWFINDER) {
      this.scannerGuiStyle = BarcodePicker.GuiStyle.LASER;
    } else {
      this.scannerGuiStyle = BarcodePicker.GuiStyle.VIEWFINDER;
    }
  }

  public onScan(result: ScanResult): void {
    this.scannedCodes = this.scannedCodes.concat(result.barcodes);

    // API CALL to add to the Cart the item that corresponds to result.barcode
    //addToCart();
    //let cart = new AddToCart
    //let mycart = new CartAddEntry({cartId:'e4f6b7d5-ea5a-4ea7-a1ce-9f0c1a8e98f3',userId:'anonymous',productCode:'300938',quantity:1});
    //let myModalService = new ModalService();
    //this.addToCartService.getLog();
    this.addToCartService.addProductToCart(result.barcodes);
    //this.addToCartService.addToCartHTTP();
    //let myservice = new AddToCartService();
    //myservice.getLog();
    //myservice.printBarcode(result.barcodes);
    //myservice.addToCart();
    //myservice.addToCartHTTP();
    //myservice.addProductToCart();


  }

  public setupCameraSettings(): void{
    this.cameraAccess = !this.cameraAccess;
    this.scanningPaused = !this.scanningPaused;
    this.visible = !this.visible;
    




  }

}
