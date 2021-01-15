import { Injectable } from '@angular/core';
import * as PDFJS from "pdfjs-dist/webpack.js";
import { PDFPageProxy, PDFPageViewport, PDFRenderTask } 
from 'pdfjs-dist';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfHandlingService {

  pdfDocument: PDFJS.PDFDocumentProxy;
  PDFJSViewer = PDFJS;
  finalString = "";
  //extractedText='';

  constructor(private file:File) {
  }
   
  // 2nd approach
  extractTextFromPdf(dropBoxUrl: string,ending:string) {
    let extractedText:any=0;
    console.log('IN READ MODE. Reading file');
    console.log('dropboxurl=',dropBoxUrl);
    //this.extractTextFromDoc(dropBoxUrl);
    console.log('dropBoxUrl= ',dropBoxUrl);
    //dropBoxUrl = dropBoxUrl.replace("/private","file:///private");
    var _this=this;
    this.file.resolveLocalFilesystemUrl(dropBoxUrl)
    .then((entry: any)=>{
      entry.file(function (file) {
        //if(ending=='pdf'){
          console.log('File= ',JSON.stringify(file));
          let reader = new FileReader();
          reader.onloadend = function (encodedFile: any) {
            let fileBlob=reader.result;
            console.log('fileBlob=  ', fileBlob);
            if(ending=='pdf'){
              var loadingTask = pdfjsLib.getDocument({data: fileBlob});
              loadingTask.promise.then(function(pdf) {
                console.log('hei1 pdf= ',pdf);
                for(var i=1;i<(pdf.numPages+1);i++){
                  //this.loadPage(i);
                  pdf.getPage(i).then(function(page:any) {
                    console.log('hei2 page= ',page);
                    //window.objs = []
                    page.getTextContent().then(value => {
                      //var sentence=JSON.stringify(data);
                      var textItems = value.items;
                      var finalString='';
                      console.log('textItems= ',textItems);
                      // Concatenate the string of the item to the final string
                      for (var i = 0; i < textItems.length; i++) {
                          var item = textItems[i];
                          finalString += item.str + " ";
                      }
                      extractedText= finalString;
                      console.log("finalString pdf: "+finalString);
                      //console.log('data1= ',JSON.stringify(sentence[0]));
                  });

                    /*page.getTextContent().then(value => {
                        //var sentence=JSON.stringify(data);
                        var textItems = value.items;
                        var finalString='';
                        // Concatenate the string of the item to the final string
                        for (var i = 0; i < textItems.length; i++) {
                            var item = textItems[i];
                            finalString += item.str + " ";
                        }
                        extractedText= finalString;
                        console.log("finalString pdf: "+finalString);
                        //console.log('data1= ',JSON.stringify(sentence[0]));
                    });*/ 

                    });
                }



                
                
              });
            }else{
              console.log('encodedFile= ',JSON.stringify(encodedFile));

            }
          };
          reader.readAsBinaryString(file);
        //}else{

        //}
        
    });
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
            for (var i = 0; i < textItems.length; i++) {
                var item = textItems[i];

                this.finalString += item.str + " ";

            }
            console.log("finalString pdf: "+this.finalString);

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
}
