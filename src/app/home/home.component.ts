import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { PopoverController } from '@ionic/angular';
import { BorderComponent } from './../border/border.component';

import { Injectable } from '@angular/core';
import * as PDFJS from "pdfjs-dist/webpack.js";
import { PDFPageProxy, PDFPageViewport, PDFRenderTask } 
from 'pdfjs-dist';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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

   constructor(
        public borderMenuCtrl: MenuController,
        private file:File
  ) {
   }
  ngOnInit() {
    console.log('ngOnInit');
    //pdf file with image: pdfImage.pdf
    //pdf file with table: tablePdf.pdf
    this.extractImageFromPdf('assets/pdfImage.pdf');//pdfImage   
  }
  //This method reads a pdf file ,which contains one image.
  extractImageFromPdf(dropBoxUrl: string) {
    let extractedImage:any=0;
    this.PDFJSViewer.getDocument(dropBoxUrl)
    .then(pdf => {
      for(var i=1;i<(pdf.numPages+1);i++){
                  pdf.getPage(i).then(function(page:any) {
                    //console.log('hei2 page= ',page);
                    //here it reads the text if any.
                    /*page.getTextContent().then(value => {
                      //var sentence=JSON.stringify(data);
                      var textItems = value.items;
                      //var finalString='';
                      console.log('textItems= ',textItems);
                      // Concatenate the string of the item to the final string
                      for (var i = 0; i < textItems.length; i++) {
                          var item = textItems[i];
                          //finalString += item.str + " ";
                      }
                      //extractedText= finalString;
                      //console.log("finalString pdf: "+finalString);
                    });*/
                    //and here we get the image.
                    page.getOperatorList().then(function (ops) {
                      console.log('ops= ',ops);
                      for (var i=0; i < ops.fnArray.length; i++) {
                        let currentElement=ops.argsArray[i];
                        console.log('currentElement ',currentElement);
                        var TypedArray = Object.getPrototypeOf(Uint8Array);
                        //if(currentElement instanceof TypedArray){
                          //let image=currentElement;
                          //console.log('image= ',image);
                        //}
                        if (ops.fnArray[i] == PDFJS.OPS.paintImageXObject) {
                            //here it finds the image as a string ,
                            //i.e: img_p0_1 but not the image data.
                            console.log('is image currentElement= ',
                            currentElement);  
                            let imageName=ops.argsArray[i][0];
                            page.objs.get(imageName, function(img) {  
                              console.log('image url= ', img.data); 
                              let finalImageUrl=
                              new Blob([img.data.buffer], { type: 'image/png' });
                              console.log('finalImageUrl= ',finalImageUrl);
                            });
                            //console.log('extractedImage= ',extractedImage);
                            //_this.objs.push(ops.argsArray[i][0]);
                        }
                      }
                   })
                  });
      }
  }).catch((error)=>{
    console.log(error);
  });    
  return extractedImage;
  }
}
