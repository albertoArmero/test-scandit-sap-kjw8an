import { HttpClient } from "@angular/common/http";
import { ActiveCartService, CartActions } from "@spartacus/core";
import { AddToCartComponent } from "@spartacus/storefront";
import { Barcode } from "scandit-sdk";
import barcodeScannerComponentHtml from "./barcode-scanner/barcode-scanner.component.html";
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class AddToCartService{
//private http: HttpClient;
postId: any;
errorMessage;
//export class AddToCartService extends ActiveCartService{ 

constructor(private http: HttpClient, private activeCartService: ActiveCartService){

 }

  getLog(){

    console.log('This is a TEST');

  }

  printBarcode(barcode: Barcode[]){

    console.log(barcode[0].data);
  }

  
  mapBarcodeWithProduct(barcode_value: string): string{
    var mapped_product:string;
    if (barcode_value == '5395215092097250130')
      mapped_product = '300938';
    if (barcode_value == '5213848038594001059')
      mapped_product = '553637';
    if (barcode_value == '5561378049223501222')
      mapped_product = '1934793';
    if (barcode_value == '5337894712216009332')
      mapped_product = '1981415';
    if (barcode_value == '5181326608309400233')
      mapped_product = '816780';


    return mapped_product;
  }

  addProductToCart(barcode: Barcode[]){

    var mapped_product:string = this.mapBarcodeWithProduct(barcode[0].data);
    //this.mapBarcodeWithProduct(barcode[0].data);
    this.activeCartService.addEntry(mapped_product,1);
    //this.activeCartService.addEntry('300938',1);
    console.log('Product ' + mapped_product + ' has been added to the cart');
    //console.log(barcode[0].data);
    //console.log(mapped_product);

    // let mycart = new CartActions.CartAddEntry({cartId:'f3d73d65-21c4-4a45-b43f-142e4ad1d65a',userId:'anonymous',productCode:'300938',quantity:1});
  }
  

  /*addToCartHTTP(){

        //const headers = { 'Authorization': 'LOBjhYx3jPcC2H1s_eVFVPuWXvw', 'My-Custom-Header': 'foobar' };
        const headers = { 'Authorization': `Bearer my_Token`};

        //const body = { title: 'Angular POST Request Example' };
        this.http.post<any>('https://scandit-commerce2011cx.demo.hybris.com/occ/v2/electronics-spa/users/anonymous/carts/f3d73d65-21c4-4a45-b43f-142e4ad1d65a/entries?code=300938&qty=3&lang=en&curr=USD', { headers }).subscribe({            
                error: error => {
                this.errorMessage = error.message;
                console.error('There was an ERROR!', error);
                }
        });



  }*/


}