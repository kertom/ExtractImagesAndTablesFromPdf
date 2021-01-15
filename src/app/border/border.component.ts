import { NavParams, PopoverController,Events } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.scss'],
})
export class BorderComponent implements OnInit {

  passedId = null;

  constructor(private events: Events,
    private navParams: NavParams, 
    //private miscOperationsService:MiscOperationsService,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }
  closePopover() {
    this.popoverController.dismiss();
  }
  eventFromPopover() {
    this.events.publish('fromPopoverEvent');
    this.popoverController.dismiss();
  }
}
