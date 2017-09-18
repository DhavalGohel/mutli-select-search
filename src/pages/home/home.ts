import { Component } from '@angular/core';
import { NavController ,Events} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mSelectedId: any = [1,2,3,4,14];
  mDDData: any = [];

  constructor(public navCtrl: NavController,
  public eventsCtrl: Events) {
    this.eventsCtrl.subscribe("search-select:refresh_value", (data) => {
      this.mSelectedId = data.data;
    });
    this.setDDdata();
  }

  setDDdata(){
    for(let i = 1; i<15; i++){
      this.mDDData.push({"key":i,"value":"Option Select" +i})
    }
  }

}
