import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, EventEmitter } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { OnInit, ViewChild } from '@angular/core';
import * as BrowserFS from 'BrowserFS';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  //public ClassicEditorBuild = ClassicEditorBuild;
  //public editor: CKEditor5.Editor = null;
  
  //public readyEmitter = new EventEmitter<CKEditor5.Editor>();
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
  //public onReady( editor: CKEditor5.Editor ) {
    //this.editor = editor;
    //this.readyEmitter.emit( this.editor );
  //}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
