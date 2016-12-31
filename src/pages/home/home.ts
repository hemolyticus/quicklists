import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { ChecklistsPage } from '../checklists/checklists';
import { ChecklistsModel } from '../../models/checklists-model';
import { Data } from '../../providers/data';
import { Keyboard } from 'ionic-native';
import { IntroPage } from '../intro/intro';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    //Variables
    checklists: ChecklistsModel[] =[];

    //Constructor
  constructor(public nav: NavController, public dataService: Data,
              public alertCtrl: AlertController, public storage: Storage, public platform: Platform) {
    
  }
    //Methods
  ionViewDidLoad()
  {
      this.platform.ready().then(() => {

          this.storage.get('introShown'). then((result) => {

              if (!result)
              {
                  this.storage.set('introShown', true);
                  this.nav.setRoot(IntroPage);
              }
          });

          this.dataService.getData().then((checklists) =>{

              let savedChecklists: any = false;

              if (typeof(checklists) != "undefined")
              {
                  savedChecklists = JSON.parse(checklists);
              }

              if (savedChecklists)
              {
                  savedChecklists.forEach((savedChecklists) =>
                  {
                    let loadChecklist = new ChecklistsModel(savedChecklists.title, savedChecklists.items);
                    this.checklists.push(loadChecklist);

                    loadChecklist.checklist.subscribe(update =>
                    {
                        this.save();
                    });
                  });
              }
          });
      });

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
      this.nav.push(ChecklistsPage, {
          checklist: checklist
      });

  }

  removeChecklist(checklist): void
  {
      let index = this.checklists.indexOf(checklist);

      if (index >-1)
      {
          this.checklists.splice(index, 1);
          this.save();
      }

  }

  save():void
  {
      Keyboard.close();
      this.dataService.save(this.checklists);

  }



}
