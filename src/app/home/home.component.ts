import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { PopoverController } from '@ionic/angular';
import { BorderComponent } from './../border/border.component';

import { Injectable } from '@angular/core';
import * as PDFJS from "pdfjs-dist/webpack.js";
import { PDFPageProxy, PDFPageViewport, PDFRenderTask }
  from 'pdfjs-dist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {
  pdfDocument: PDFJS.PDFDocumentProxy;
  PDFJSViewer = PDFJS;
  objs = [];
  PDFJS = pdfjsLib;
  pdfMime = 'application/pdf';
  sURL = 'https://dl.dropboxusercontent.com/s/bf3e1jr41uemh9f/Liste%20telephone%20CDV.pdf?dl=0';
  //9r24qq5s61o7mbi/jpgImagePdf.pdf?dl=0';
  //bf3e1jr41uemh9f/jpgImagePdf.pdf?dl=0';

  //ad = ABOUtils.DOM,
  //[$, $$] = ad.selectors();
  url = 'assets/Liste telephone CDV.pdf';//"test/pdf_one.pdf";
  //Vite_et_Bien_1
  //Liste telephone CDV
  pageNum = 11;
  pageCount = 0;
  state = {
    mime: 'application/pdf',
    docs: [],
  };

  constructor(
  ) {
    console.log('constructor called.');
  }
  ngOnInit() {
    //console.log('ngOnInit');
    //pdf file with image: pdfImage.pdf
    //pdf file with table: tablePdf.pdf
    //this.loadPage(this.pageNum);
    // ('assets/pdfImage.pdf');  
    //this.handleFiles('assets/pdfImage.pdf'); 
    this.extractImageFromPdf('assets/Liste telephone CDV.pdf');
  }
  extractImageFromPdf(dropBoxUrl) {
    console.log('hello codepen!!!');
    let extractedImage = 0;
    let _this = this;
    let myImg =
      document.getElementById('my-img');
    //window.objs=[];
    this.PDFJSViewer.getDocument(this.url).promise
      .then(pdf => {
        console.log('pdf.numPages= ', pdf.numPages);
        for (var i = 1; i < (pdf.numPages + 1); i++) {
          pdf.getPage(i).then(function (page) {
            page.getOperatorList().then(function (ops) {
              console.log('ops.fnArray= ',ops.fnArray); 
              for (var i = 0; i < ops.fnArray.length; i++) {
                let currentElement = ops.argsArray[i];
                if ((ops.fnArray[i] == PDFJS.OPS.paintImageXObject) 
                ||(ops.fnArray[i] == PDFJS.OPS.paintJpegXObject)
                //||(ops.fnArray[i] == PDFJS.OPS.paint XObject)
                
                ){

                  //window.objs.push(ops.argsArray[i][0])
                  let imageName = ops.argsArray[i][0];
                  console.log('imageName= ',imageName);
                  page.objs.get(imageName, function (img) {
                    const content = img.data;
                    let isJpg=1;
                    if(ops.fnArray[i] == PDFJS.OPS.paintJpegXObject){
                      isJpg=0;
                    }
                    (<HTMLImageElement>
                      document.getElementById("my-img")).src
                      = <any>_this.imagedata_to_image(img,isJpg);
                    //'data:image/png;base64,'+newB64;
                  });
                }
              }
            });
          });
        }
      }).catch((error) => {
        console.log('Error now is: ', error);
      });
  }
  addAlphaChannel(uint8Array, isRGB) {
    const convertedArray = Array.from(uint8Array);
    const newArray = [];
    console.log('hei1');
    if (!isRGB) {
      return Uint8ClampedArray.from(uint8Array);
    }
    for (let i = 0; convertedArray.length > i; i++) {
      newArray.push(convertedArray[i])
      if ((i + 1) % 3 === 0) {
        newArray.push(255);
      }
    }
    console.log('hei2');
    return Uint8ClampedArray.from(newArray);
  }
  // Base by https://stackoverflow.com/questions/13416800/how-to-generate-an-image-from-imagedata-in-javascript
  imagedata_to_image(imagedata,isJpg) {
    try {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = imagedata.width;
      canvas.height = imagedata.height;
      if(isJpg){
        const isRGB = (imagedata.width * imagedata.height * 3) === 
        imagedata.data.length;
        const withAlpha = <Uint8ClampedArray>
          this.addAlphaChannel(imagedata.data, isRGB);
        console.log('withAlpha= ', withAlpha);
        console.log('typeof withAlpha= ', typeof (withAlpha));
        const imgData =
          //ctx.createImageData(imagedata.width, imagedata.height); 
          new ImageData(<Uint8ClampedArray>withAlpha, imagedata.width, imagedata.height)
        //ctx.createImageData(imagedata.width, imagedata.height);
        console.log('typeof= ', typeof (imgData));
        console.log('imageData= ', imgData);
  
  
  
  
  
        for (var i = 0; i < imgData.data.length; i += 4) {
          //imageData.data[i+0] = 255;
          //imageData.data[i+1] = 0;
          //imageData.data[i+2] = 0;
          //imageData.data[i+3] = withAlpha;
        }
  
        ctx.putImageData(imgData, 0, 0);
  
      }
      
      var image = new Image();
      image.src = canvas.toDataURL();
      document.body.appendChild(image)
      return image;
    } catch (e) {
      console.log(e)
    }
  }


  onReady() {
    console.log('onReady');
  }


}
