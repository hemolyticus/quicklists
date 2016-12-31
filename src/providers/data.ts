import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

    //Constructor
  constructor(public storage: Storage)
  {

  }

    //Functions
  getData(): Promise<any>
  {
      return this.storage.get('checklists');
  }

  save(data): void
  {
      //local variable
      let saveData =[];


      //Remove observables
      data.forEach((checklist) => {
          saveData.push({
              title: checklist.title,
              items: checklist.items
          });
      });

      let newData = JSON.stringify(saveData);
      this.storage.set('checklists', newData);

  }

}
