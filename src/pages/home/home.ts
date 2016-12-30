import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { ChecklistsPage } from '../checklists/checklists';
import { ChecklistsModel } from '../../models/checklists-model';
import { Data } from '../../providers/data';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    //Variables
    checklists: ChecklistsModel[] =[];

    //Contructor
  constructor(public navCtrl: NavController, public dataService: Data, public alertCtrl: AlertController, public platform: Platform) {
    
  }
    //Methods
  ionViewDidLoad()
  {

  }

  addChecklists():void
  {

      let prompt = this.alertCtrl.create
      (
          {
              title: 'New Checklist',
              message: 'Enter the name of your new checklist below',
              inputs: [
                  {
                      name: 'name'
                  }
              ],

              buttons: [
                  {
                      text: 'Cancel'
                  },
                  {
                      text: 'Save',
                      handler: data =>{
                          let newChecklist = new ChecklistsModel(data.name, []);
                          this. checklists.push(newChecklist);

                          newChecklist.checklist.subscribe(update => {
                              this.save();
                          });

                          this.save();
                      }

                  }
              ]
          }
      );

      prompt.present();

  }

  renameChecklist(checklist): void
  {
      let prompt = this.alertCtrl.create({
          title: 'Rename Checklist',
          message: 'Enter the new name of this checklist below',
          inputs: [
              {
                  name: 'name'
              }
          ],
          buttons: [
              {
                  text: 'Cancel'
              },
              {
                  text: 'Save',
                  handler: data =>{
                      let index = this. checklists.indexOf(checklist);

                      if ( index > -1)
                      {
                          this.checklists[index].setTitle(data.name);
                          this.save();
                      }
                  }
              }
          ]
      });

      prompt.present();

  }

  viewChecklist(checklist): void
  {

  }

  removeChecklist(checklist): void
  {

  }

  save():void
  {

  }



}
