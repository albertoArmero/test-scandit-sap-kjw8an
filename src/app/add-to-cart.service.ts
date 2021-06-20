import { HttpClient } from "@angular/common/http";
import { ActiveCartService, CartActions } from "@spartacus/core";
import { AddToCartComponent } from "@spartacus/storefront";
import { Barcode } from "scandit-sdk";
import barcodeScannerComponentHtml from "./barcode-scanner/barcode-scanner.component.html";

export class AddToCartService{
private http: HttpClient;
//export class AddToCartService extends ActiveCartService{ 

//  constructor(){

//  }

  getLog(){

    console.log('This is a TEST');

  }

  printBarcode(barcode: Barcode[]){

    console.log(barcode[0].data);
  }

  addToCartHTTP(){

        const headers = { 'Authorization': 'LOBjhYx3jPcC2H1s_eVFVPuWXvw', 'My-Custom-Header': 'foobar' };
        const body = { title: 'Angular POST Request Example' };
        this.http.post<any>('https://scandit-commerce2011cx.demo.hybris.com/occ/v2/electronics-spa/users/anonymous/carts/f7b1f42f-abdd-459a-9a31-e0b1a0c29cf8/entries?code=300938&qty=3&lang=en&curr=USD', body, { headers });



  }
  addProductToCart(){
    //let myaddentry = ActiveCartService.getActive();
    //this.addEntry('300938',1);
    //this.productCode='300938';
    //this.quantity=1;
    //this.addToCart();
    //this.getActiveCartId();
    let myddd= new CartActions.DeleteCart({cartId:'e4f6b7d5-ea5a-4ea7-a1ce-9f0c1a8e98f3',userId:'anonymous'});
    console.log('This is a TEST22');


    // let mycart = new CartActions.CartAddEntry({cartId:'f3d73d65-21c4-4a45-b43f-142e4ad1d65a',userId:'anonymous',productCode:'300938',quantity:1});
  }
  

}