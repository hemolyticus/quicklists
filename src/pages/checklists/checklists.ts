import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the Checklists page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checklists',
  templateUrl: 'checklists.html'
})
export class ChecklistsPage {

    //Variables
    checklist:any;

    //Constructor
  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController)
  {

      this.checklist= this.navParams.get('checklist');
  }

    //Functions
  addItem(): void
  {
      let prompt = this.alertCtrl.create({
          title: 'Add Item',
          message: 'Enter the name of the task for this checklist below',
          inputs: [
              {
                  name: 'name'
              }
          ],
          buttons:[
              {
                text: 'Cancel'
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.checklist.addItem(data.name);
                  }
              }
          ]

      });

      prompt.present();

  }

  toggleItem(item): void
  {


  }

  removeItem(item): void
  {

  }

  renameItem(item):void
  {


  }


  uncheckItems():void
  {

  }




}
