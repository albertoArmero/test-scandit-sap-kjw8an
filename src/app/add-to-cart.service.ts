import { ActiveCartService} from "@spartacus/core";
import { Barcode } from "scandit-sdk";
import { Injectable } from '@angular/core';
import { BARCODE_DICTIONARY } from './barcode-dictionary';

@Injectable({providedIn:'root'})
export class AddToCartService{

constructor(private activeCartService: ActiveCartService){
 }
  
  addProductToCart(barcode: Barcode[]){

    let mappedProduct:string = this.mapBarcodeWithProduct(barcode[0].data);
    this.activeCartService.addEntry(mappedProduct, 1);

}

  mapBarcodeWithProduct(barcode: string): string{

    let productID:string;

    productID = BARCODE_DICTIONARY[barcode];

    return productID;

  }


}