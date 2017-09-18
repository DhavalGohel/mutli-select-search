import { Component } from '@angular/core';
import { NavController ,Events} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  test: any = [12,13,15,18,19];
  mClientTypeDD: any = [
    {key: "12",value:"sasdlkasd"},
    {key: "13",value:"headlkasd"},
    {key: "14",value:"ahesdsaadlkasd"},
    {key: "15",value:"rwsheadlkasd"},
    {key: "16",value:"q4wheadlkasd"},
    {key: "17",value:"czc xcheadlkasd"},
    {key: "18",value:"a11e headlkasd"},
    {key: "19",value:"d7ghd headlkasd"}
  ];

  constructor(public navCtrl: NavController,
  public eventsCtrl: Events) {
    this.eventsCtrl.subscribe("search-select:refresh_value", (data) => {
      console.log(data);
      this.test = data.data;
    });
  }

}
