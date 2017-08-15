import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'; 

/**
 * Generated class for the CommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private viewController: ViewController,
     private formBuilder: FormBuilder) {
       this.commentFormGroup = this.formBuilder.group({
         name: ['', Validators.required],
         rating: 5,
         comment: ['', Validators.required]
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewController.dismiss();
  }

  onSubmit() {
    console.log(this.commentFormGroup.value);
    this.viewController.dismiss(this.commentFormGroup.value);
  }
}
