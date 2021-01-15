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
  
   constructor(
        public borderMenuCtrl: MenuController,
        private file:File
  ) {
   }
  ngOnInit() {
    console.log('ngOnInit');
    //pdf file with image: pdfImage.pdf
    //pdf file with table: tablePdf.pdf
    this.extractTextFromPdf('assets/tablePdf.pdf');//pdfImage   
  }
  onReady(){
    console.log('onReady');
  }
  extractTextFromPdf(dropBoxUrl: string) {
    let extractedText:any=0;
    console.log('dropBoxUrl= ',dropBoxUrl);
    var _this=this;
    this.PDFJSViewer.getDocument(dropBoxUrl)
    .then(pdf => {
      console.log('hei1 pdf= ',pdf);
      for(var i=1;i<(pdf.numPages+1);i++){
                  //this.loadPage(i);
                  pdf.getPage(i).then(function(page:any) {
                    console.log('hei2 page= ',page);
                    //window.objs = []
                    page.getTextContent().then(value => {
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
                  });
                  });
      }
  }).catch((error)=>{
    console.log(error);
  });    
  return extractedText;
  }
  loadPage(pageNum: number = 1) {
    //console.log("loadPage pageNum: "+pageNum);
    let pdfPage: PDFPageProxy;

      return this.pdfDocument.getPage(pageNum).then(thisPage => {
          pdfPage = thisPage;
          
          pdfPage.getTextContent().then(value=> {
            var textItems = value.items;

            // Concatenate the string of the item to the final string
            //for (var i = 0; i < textItems.length; i++) {
                //var item = textItems[i];
            //}

            //this.linesArray.push(finalString);
            //if(pageNum==1){
            //  this.splitLines(finalString);
            //}

        });
         
      }).then(textContentInPage => {
        console.log("textContentInPage : "+textContentInPage);
        return textContentInPage;
      });

  }
  // https://gist.github.com/hperrin/8830538
  onInput(event){
  }
  ionViewWillEnter() {
      console.log("hello");
  }
}