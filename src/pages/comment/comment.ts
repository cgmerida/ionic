import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  // comment: Comment;  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private viewCtl: ViewController) {
    this.commentForm = this.formBuilder.group({
      author: null,
      rating: 5,
      comment: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtl.dismiss();
  }

  onSubmit() {
    console.log(this.commentForm.value);

    // this.comment = this.commentForm.value;
    // this.comment.date = new Date().toISOString();
    // console.log(this.comment);
    // this.viewCtrl.dismiss(this.comment);
    // this.comment = null;
    this.viewCtl.dismiss(this.commentForm.value);
  }

}
