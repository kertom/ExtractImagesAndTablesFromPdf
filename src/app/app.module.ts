import { FormsModule } from '@angular/forms';
//import { HttpClientJsonpModule } from '@ionic-native/http/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as BrowserFS from "BrowserFS";

import * as PDFJS from "pdfjs-dist/webpack.js";
//import {MyHammerConfig} ;
//import { GestureController }  from '@ionic/angular';
import 'hammerjs';

import * as Hammer from 'hammerjs';
import {IonicGestureConfig} from "./gestures/ionic-gesture-config";
import { HAMMER_GESTURE_CONFIG} 
from '@angular/platform-browser';
import { ZoomAreaModule } from 'ionic2-zoom-area';
import { HttpClientModule,HttpClient,HttpHandler } from '@angular/common/http';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { RouterModule, Routes } from '@angular/router';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';//'@ckeditor/ckeditor5-angular';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ckeditor from "ckeditor";
import { HomeComponent } from './home/home.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
//import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave'
import { BorderComponent } from './border/border.component';
//import { NavController, NavParams  } from '@ionic/angular';
import { Keyboard } from '@ionic-native/Keyboard/ngx'
import { HTTP } from '@ionic-native/http/ngx';
import { DatePipe } from '@angular/common';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Zip } from '@ionic-native/zip/ngx';
//import * as BrowserFS from "browserfs";

//collection/utils/gesture/gesture-controller’;
//const appRoutes: Routes = [
  //{ 
   // path: 'simple-usage', component: SimpleUsageComponent 
  //}];
@NgModule({
  declarations: [AppComponent,
    //FormsModule  
    BorderComponent,
    HomeComponent
    ],
  entryComponents: [BorderComponent],//
  imports: [ 
    //IonAffixModule,
    FormsModule,  
    ZoomAreaModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    //HttpClientJsonpModule,
    CommonModule,
    CKEditorModule,
    BrowserModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    PinchZoomModule,
    HttpClientModule
  ],
  providers: [
    BorderComponent,
    StatusBar,
    SplashScreen,
    IOSFilePicker,
    FormsModule, 
    File,
    Keyboard,
    //PinchZoom,
    FileTransfer,
    FileOpener,
    BrowserAnimationsModule,
    HttpClient,
    HttpClientModule,
    DocumentViewer,
    FormsModule,  
    ReactiveFormsModule,
    ScreenOrientation,
    CKEditorModule,
    BrowserModule,
    HTTP,
    DatePipe,Injectable,
    Zip,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: IonicGestureConfig
        },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [
    FormsModule,BorderComponent
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA ]

})
export class AppModule {

  constructor() {
    /*BrowserFS.configure({
      fs: "InMemory",
      options: {}
    }, function(error) { console.error(error) });

    // @ts-ignore
    var fs = require('fs');
    fs.writeFile('/test.txt', 'Cool, I can do this in the browser!');
  */
 }

}
