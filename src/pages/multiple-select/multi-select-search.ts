
import { Component , Directive, ElementRef, Input} from '@angular/core';
import { NavController,ViewController,NavParams,Events,ModalController } from 'ionic-angular';

@Component({
  selector: 'multi-select-search',
  templateUrl: 'multi-select-search.html'
})
export class ModalMultiSelectSearch {

  public contentEle: any;
  public title: string = "";
  public options: any;
  public selectedItemIndex: any = [];
  public showNoTextMsg: boolean = false;
  public showSearchTextBox: boolean = false;
  public showOKButton: boolean = false;

  constructor( public viewCtrl: ViewController,
    public navParams: NavParams,
    public eventsCtrl: Events) {
      this.title = "Select option";
      this.contentEle = this.navParams.get('content');
      this.selectedItemIndex = this.navParams.get('index');
      this.init();
  }

  init(){
    this.options = this.navParams.get('options');
    if (this.options != null && this.options.length > 0) {
      this.showNoTextMsg = false;
      this.showSearchTextBox = true;
      this.showOKButton = true;

      for(let i =0;i< this.options.length ;i++){
        if(this.selectedItemIndex != null){
          if(this.selectedItemIndex.some(x => this.options[i].key == x)){
            this.options[i].isCheked = true;
          }else {
            this.options[i].isCheked = false;
          }
        }else {
          this.options[i].isCheked = false;
        }
      }
    } else {
      this.showNoTextMsg = true;
      this.showSearchTextBox = false;
      this.showOKButton = false;
    }
  }

  dismiss() {
    if (this.viewCtrl != null) {
      this.viewCtrl.dismiss();
    }
  }

  onSearchItems(ev: any) {
    this.init();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.options = this.options.filter((item) => {
        return (item.value.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

    if (this.options.length <= 0) {
      this.showNoTextMsg = true;
      this.showOKButton = false;
    } else {
      this.showNoTextMsg = false;
      this.showOKButton = true;
    }
  }

  onSelectItem(){
    this.selectedItemIndex = [];
    this.contentEle.innerHTML = "";
    for(let i =0;i< this.options.length ;i++){
        if(this.options[i].isCheked){
          this.selectedItemIndex.push(this.options[i].key);
          this.contentEle.innerHTML += this.options[i].value + ', <br>';
        }
    }

    let tempData = {
      "data": this.selectedItemIndex,
      "element": this.contentEle
    };

    this.eventsCtrl.publish("search-select:refresh_value", (tempData));
    this.viewCtrl.dismiss();
  }

  clearData() {
    this.selectedItemIndex = [];
    this.contentEle.innerHTML = "";

    this.init();

    let tempData = {
      "data": null,
      "element": this.contentEle
    };

    this.eventsCtrl.publish("search-select:refresh_value", (tempData));
  }

}

@Directive({
  selector: '[multiSelect]',
  inputs: ['data', 'dataIndex'],
  host: {
    '(click)': 'showModal()'
  }
})

export class MultiSelect {
    @Input() ngModel: any;

    public mDataArray: any;
    public mDataIndex: any;

    constructor(  public navCtrl: NavController,
      public _elementRef: ElementRef,
      public modalCtrl: ModalController,
      public eventsCtrl: Events){

    }


    set data(mDataArray) {
      this.mDataArray = mDataArray;
    }

    set dataIndex(mDataIndex){
      this.mDataIndex = mDataIndex;
      setTimeout( ()=>{
        if(this.mDataIndex != null && this.mDataIndex.length > 0){
          this.setAutoSelectValue();
        }else {
          this._elementRef.nativeElement.innerHTML = "Select Item";
        }
      },1500)
    }

    showModal() {
      if (this._elementRef.nativeElement) {
        // console.log(this._elementRef.nativeElement);

        if (this.ngModel) {
          // console.log(this.ngModel);
        }
        let modal = this.modalCtrl.create(ModalMultiSelectSearch, { content: this._elementRef.nativeElement, options: this.mDataArray, index: this.mDataIndex });
        modal.present();
      }
    }

    setAutoSelectValue(){
      if (this.mDataArray != null && this.mDataArray.length > 0) {
        this._elementRef.nativeElement.innerHTML = "";
        for(let i =0;i< this.mDataArray.length ;i++){
            if(this.mDataIndex.some(x => this.mDataArray[i].key == x)){
              this._elementRef.nativeElement.innerHTML += this.mDataArray[i].value + ', <br>';
            }
          }
      }
    }
}
