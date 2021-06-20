import { ActiveCartService } from "@spartacus/core";
import { Barcode } from "scandit-sdk";
import barcodeScannerComponentHtml from "./barcode-scanner/barcode-scanner.component.html";

export class AddToCartService extends ActiveCartService {
  getLog(){

    console.log('This is a TEST');

  }

  printBarcode(barcode: Barcode[]){

    console.log(barcode[0].data);
  }

  addToCartHTTP(){

  }
  addToCart(){
    this.addEntry('300938',1);
  }
  

}