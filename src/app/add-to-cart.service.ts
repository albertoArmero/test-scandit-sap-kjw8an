import { HttpClient } from "@angular/common/http";
import { ActiveCartService, CartActions, BadRequestHandler, CartVoucherService } from "@spartacus/core";
import { Barcode } from "scandit-sdk";
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class AddToCartService{

constructor(private http: HttpClient, private activeCartService: ActiveCartService, private errorVoucher: CartVoucherService){
 }
  
  addProductToCart(barcode: Barcode[]){

    var mapped_product:string = this.mapBarcodeWithProduct(barcode[0].data);
    this.activeCartService.addEntry(mapped_product,1);
    //console.log('Product ' + mapped_product + ' has been added to the cart');

}

  mapBarcodeWithProduct(barcode_value: string): string{
    var mapped_product:string;

    switch(barcode_value) { 
      case '5395215092097250130':{ 
        mapped_product = '300938';
        break; 
      } 
      case '5213848038594001059':{ 
        mapped_product = '553637';
        break; 
      }
      case '5561378049223501222':{ 
        mapped_product = '1934793';
        break; 
      }
      case '5337894712216009332':{ 
        mapped_product = '1981415';
        break; 
      }
      case '5181326608309400233':{ 
        mapped_product = '816780';
        break; 
      }   
      default: { 
        mapped_product = 'InvalidProductID';
        this.invalidProduct();
        break; 
      } 
  } 

    return mapped_product;
  }

  invalidProduct(){

    var cart_ID:string;
    this.errorVoucher.addVoucher("invalidProductID",cart_ID);
    
  }

}