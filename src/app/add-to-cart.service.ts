import { Barcode } from "scandit-sdk";
import barcodeScannerComponentHtml from "./barcode-scanner/barcode-scanner.component.html";

export class AddToCartService {
  getLog(){

    console.log('This is a TEST');

  }

  printBarcode(barcode: Barcode[]){

    console.log(barcode);
  }

  addToCartHTTP(){

  }

}