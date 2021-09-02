import { Component, Inject, Injectable } from '@angular/core';
import { Barcode, BarcodePicker, Camera, CameraAccess, CameraSettings, ScanResult, ScanSettings } from "scandit-sdk";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { AddToCartService } from './add-to-cart.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
@Injectable({providedIn:'root'})
export class AppComponent  {
  name = 'Angular';

  public activeSettings: ScanSettings;
  public settings128: ScanSettings;
  public settings39: ScanSettings;
  public scannerGuiStyle: BarcodePicker.GuiStyle = BarcodePicker.GuiStyle.LASER;
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
  public isShowDiv: boolean = false;  


  public possibleCameras: Camera[] = [];
  

  constructor(private addToCartService : AddToCartService, private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer) {

      const svgUrl = 'assets/Barcode_icon.svg';

      this.matIconRegistry.addSvgIconLiteral('barcodeicon', this.domSanitizer.bypassSecurityTrustHtml(`<?xml version="1.0"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 490.667 490.667" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
      <g xmlns="http://www.w3.org/2000/svg">
        <path style="" d="M74.667,362.667C68.776,362.667,64,357.891,64,352V138.667C64,132.776,68.776,128,74.667,128   s10.667,4.776,10.667,10.667V352C85.333,357.891,80.558,362.667,74.667,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M117.333,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667   S128,132.776,128,138.667v170.667C128,315.224,123.224,320,117.333,320z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M160,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667   s10.667,4.776,10.667,10.667v170.667C170.667,315.224,165.891,320,160,320z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M202.667,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667   s10.667,4.776,10.667,10.667v170.667C213.333,315.224,208.558,320,202.667,320z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M245.333,362.667c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667   c5.891,0,10.667,4.776,10.667,10.667V352C256,357.891,251.224,362.667,245.333,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M288,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667   c5.891,0,10.667,4.776,10.667,10.667v170.667C298.667,315.224,293.891,320,288,320z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M330.667,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667   c5.891,0,10.667,4.776,10.667,10.667v170.667C341.333,315.224,336.558,320,330.667,320z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M373.333,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667   S384,132.776,384,138.667v170.667C384,315.224,379.224,320,373.333,320z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M416,362.667c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667   c5.891,0,10.667,4.776,10.667,10.667V352C426.667,357.891,421.891,362.667,416,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M117.333,362.667c-1.4,0.048-2.791-0.245-4.053-0.853c-1.334-0.449-2.516-1.262-3.413-2.347   c-4.124-3.922-4.288-10.444-0.366-14.567c0.119-0.125,0.241-0.247,0.366-0.366c0.896-1.086,2.079-1.899,3.413-2.347   c3.96-1.631,8.514-0.704,11.52,2.347c4.124,4.206,4.058,10.96-0.149,15.084C122.694,361.536,120.074,362.628,117.333,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M160,362.667c-1.4,0.048-2.791-0.245-4.053-0.853c-1.334-0.449-2.516-1.262-3.413-2.347   c-4.124-3.922-4.288-10.444-0.366-14.567c0.119-0.125,0.241-0.247,0.366-0.366c0.896-1.086,2.079-1.899,3.413-2.347   c3.958-1.656,8.525-0.725,11.52,2.347c1.085,0.897,1.898,2.079,2.347,3.413c1.138,2.582,1.138,5.524,0,8.107   c-0.445,1.336-1.258,2.52-2.347,3.413C165.544,361.543,162.83,362.707,160,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M202.667,362.667c-1.4,0.048-2.791-0.245-4.053-0.853c-1.334-0.449-2.516-1.262-3.413-2.347   c-4.124-3.922-4.288-10.444-0.366-14.567c0.119-0.125,0.241-0.247,0.366-0.366c0.896-1.086,2.079-1.899,3.413-2.347   c3.958-1.656,8.525-0.725,11.52,2.347c1.085,0.897,1.898,2.079,2.347,3.413c1.138,2.582,1.138,5.524,0,8.107   c-0.445,1.336-1.258,2.52-2.347,3.413C208.211,361.543,205.497,362.707,202.667,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M288,362.667c-5.89-0.083-10.599-4.925-10.516-10.815c0.039-2.74,1.13-5.361,3.049-7.318   c4.148-4.065,10.786-4.065,14.933,0c1.085,0.897,1.898,2.079,2.347,3.413c1.138,2.582,1.138,5.524,0,8.107   c-0.445,1.336-1.258,2.52-2.347,3.413C293.544,361.543,290.83,362.707,288,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M330.667,362.667c-5.89-0.083-10.599-4.925-10.516-10.815c0.038-2.74,1.13-5.361,3.049-7.318   c4.148-4.066,10.786-4.066,14.933,0c4.124,4.206,4.058,10.96-0.149,15.084C336.028,361.536,333.407,362.628,330.667,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
        <path style="" d="M373.333,362.667c-2.83,0.04-5.544-1.123-7.467-3.2c-1.089-0.893-1.903-2.076-2.347-3.413   c-1.138-2.582-1.138-5.524,0-8.107c0.448-1.335,1.261-2.517,2.347-3.413c4.148-4.066,10.786-4.066,14.933,0   c4.124,4.206,4.058,10.96-0.149,15.084C378.694,361.536,376.074,362.628,373.333,362.667L373.333,362.667z" fill="#ffffff" data-original="#455a64" class=""/>
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
        <path style="" d="M10.667,149.333C4.776,149.333,0,144.558,0,138.667v-64C0,68.776,4.776,64,10.667,64h64   c5.891,0,10.667,4.776,10.667,10.667s-4.776,10.667-10.667,10.667H21.333v53.333C21.333,144.558,16.558,149.333,10.667,149.333z" fill="#ffffff" data-original="#2196f3" class=""/>
        <path style="" d="M74.667,426.667h-64C4.776,426.667,0,421.891,0,416v-64c0-5.891,4.776-10.667,10.667-10.667   S21.333,346.109,21.333,352v53.333h53.333c5.891,0,10.667,4.776,10.667,10.667C85.333,421.891,80.558,426.667,74.667,426.667z" fill="#ffffff" data-original="#2196f3" class=""/>
        <path style="" d="M480,149.333c-5.891,0-10.667-4.776-10.667-10.667V85.333H416c-5.891,0-10.667-4.776-10.667-10.667   S410.109,64,416,64h64c5.891,0,10.667,4.776,10.667,10.667v64C490.667,144.558,485.891,149.333,480,149.333z" fill="#ffffff" data-original="#2196f3" class=""/>
        <path style="" d="M480,426.667h-64c-5.891,0-10.667-4.776-10.667-10.667c0-5.891,4.776-10.667,10.667-10.667h53.333   V352c0-5.891,4.776-10.667,10.667-10.667c5.891,0,10.667,4.776,10.667,10.667v64C490.667,421.891,485.891,426.667,480,426.667z" fill="#ffffff" data-original="#2196f3" class=""/>
      </g>
      <path xmlns="http://www.w3.org/2000/svg" d="M74.667,362.667C68.776,362.667,64,357.891,64,352V138.667C64,132.776,68.776,128,74.667,128s10.667,4.776,10.667,10.667  V352C85.333,357.891,80.558,362.667,74.667,362.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M117.333,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667S128,132.776,128,138.667  v170.667C128,315.224,123.224,320,117.333,320z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M160,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667s10.667,4.776,10.667,10.667  v170.667C170.667,315.224,165.891,320,160,320z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M202.667,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667s10.667,4.776,10.667,10.667  v170.667C213.333,315.224,208.558,320,202.667,320z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M245.333,362.667c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667  c5.891,0,10.667,4.776,10.667,10.667V352C256,357.891,251.224,362.667,245.333,362.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M288,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667  c5.891,0,10.667,4.776,10.667,10.667v170.667C298.667,315.224,293.891,320,288,320z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M330.667,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667  c5.891,0,10.667,4.776,10.667,10.667v170.667C341.333,315.224,336.558,320,330.667,320z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M373.333,320c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667S384,132.776,384,138.667  v170.667C384,315.224,379.224,320,373.333,320z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M416,362.667c-5.891,0-10.667-4.776-10.667-10.667V138.667c0-5.891,4.776-10.667,10.667-10.667  c5.891,0,10.667,4.776,10.667,10.667V352C426.667,357.891,421.891,362.667,416,362.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M117.333,362.667c-1.4,0.043-2.79-0.249-4.053-0.853c-1.333-0.452-2.514-1.264-3.413-2.347  c-4.124-3.939-4.274-10.475-0.335-14.598c0.109-0.114,0.221-0.226,0.335-0.335c0.898-1.083,2.08-1.896,3.413-2.347  c2.597-1.067,5.51-1.067,8.107,0c1.336,0.446,2.519,1.259,3.413,2.347c4.124,4.206,4.058,10.96-0.149,15.084  C122.694,361.536,120.074,362.628,117.333,362.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M160,362.667c-5.891-0.071-10.608-4.904-10.537-10.795c0.033-2.748,1.125-5.377,3.049-7.339  c2.989-3.083,7.563-4.015,11.52-2.347c1.336,0.446,2.519,1.259,3.413,2.347c4.124,4.206,4.058,10.96-0.148,15.084  C165.345,361.531,162.733,362.623,160,362.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M202.667,362.667c-5.891-0.071-10.608-4.904-10.537-10.795c0.033-2.748,1.125-5.377,3.049-7.339  c0.898-1.083,2.08-1.896,3.413-2.347c3.96-1.631,8.514-0.704,11.52,2.347c4.124,4.206,4.058,10.96-0.149,15.084  c-1.957,1.919-4.577,3.011-7.318,3.049H202.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M288,362.667c-1.398,0.022-2.783-0.269-4.053-0.853c-1.333-0.452-2.514-1.264-3.413-2.347  c-4.124-3.939-4.274-10.475-0.335-14.598c0.109-0.114,0.221-0.226,0.335-0.335c0.898-1.083,2.08-1.896,3.413-2.347  c2.597-1.067,5.51-1.067,8.107,0c1.336,0.446,2.519,1.259,3.413,2.347c4.124,4.206,4.058,10.96-0.149,15.084  C293.361,361.536,290.74,362.628,288,362.667L288,362.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M330.667,362.667c-1.398,0.022-2.783-0.269-4.053-0.853c-1.333-0.452-2.514-1.264-3.413-2.347  c-4.124-3.939-4.274-10.475-0.335-14.598c0.109-0.114,0.221-0.226,0.335-0.335c4.148-4.066,10.786-4.066,14.933,0  c4.124,3.905,4.301,10.413,0.397,14.536c-0.129,0.136-0.261,0.268-0.397,0.397c-0.895,1.087-2.078,1.9-3.413,2.347  C333.451,362.4,332.065,362.692,330.667,362.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M373.333,362.667c-1.398,0.022-2.783-0.269-4.053-0.853c-1.333-0.452-2.514-1.264-3.413-2.347  c-2.074-1.924-3.237-4.637-3.2-7.467c-0.053-1.401,0.24-2.793,0.853-4.053c0.441-1.333,1.246-2.515,2.325-3.413  c0.898-1.083,2.08-1.896,3.413-2.347c3.96-1.631,8.514-0.704,11.52,2.347c1.078,0.903,1.89,2.083,2.347,3.413  c0.613,1.261,0.906,2.653,0.853,4.053c-0.157,5.825-4.842,10.51-10.667,10.667H373.333z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M10.667,149.333C4.776,149.333,0,144.558,0,138.667v-64C0,68.776,4.776,64,10.667,64h64c5.891,0,10.667,4.776,10.667,10.667  s-4.776,10.667-10.667,10.667H21.333v53.333C21.333,144.558,16.558,149.333,10.667,149.333z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M74.667,426.667h-64C4.776,426.667,0,421.891,0,416v-64c0-5.891,4.776-10.667,10.667-10.667S21.333,346.109,21.333,352  v53.333h53.333c5.891,0,10.667,4.776,10.667,10.667C85.333,421.891,80.558,426.667,74.667,426.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M480,149.333c-5.891,0-10.667-4.776-10.667-10.667V85.333H416c-5.891,0-10.667-4.776-10.667-10.667S410.109,64,416,64h64  c5.891,0,10.667,4.776,10.667,10.667v64C490.667,144.558,485.891,149.333,480,149.333z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <path xmlns="http://www.w3.org/2000/svg" d="M480,426.667h-64c-5.891,0-10.667-4.776-10.667-10.667c0-5.891,4.776-10.667,10.667-10.667h53.333V352  c0-5.891,4.776-10.667,10.667-10.667c5.891,0,10.667,4.776,10.667,10.667v64C490.667,421.891,485.891,426.667,480,426.667z" fill="#ffffff" data-original="#000000" style="" class=""/>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
      </g>
      </g></svg>`));


      
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

    this.addToCartService.addProductToCart(result.barcodes);

  }

  public setupCameraSettings(): void{
    this.cameraAccess = !this.cameraAccess;
    this.scanningPaused = !this.scanningPaused;
    this.visible = !this.visible;
    //this.showCameraDiv();
    this.isShowDiv = !this.isShowDiv; 
  
  }

  public showCameraDiv(): void{
    console.log('CAMERA OPENED');
     
      this.isShowDiv = !this.isShowDiv;  
  }



}
