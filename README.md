
This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

# mutli-select-search
This is ionic app for multi select search dropdown

To Used this below  in home.html

```bash
<ion-item no-padding class="custom-select-search">
  <div tappable class="select select-md custom-select">
    <div class="select-text"
      tappable
      multiSelect
      ngDefaultControl
      [(ngModel)]="mSelectedId"  
      [(data)]="mDDData"
      [(dataIndex)]="mSelectedId" style="float:left">
      Select Item
    </div>

    <div class="select-icon" style="float:right">
      <div class="select-icon-inner"></div>
    </div>
  </div>
</ion-item>
```
