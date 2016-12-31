import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})

export class IntroPage {

    //Variables
    slideOptions:any;

    //Constructor
  constructor(public nav: NavController)
  {
      this.slideOptions =
          {
              pager:true
          };

  }

  goToHome():void
  {
      this.nav.setRoot(HomePage);
  }



}
