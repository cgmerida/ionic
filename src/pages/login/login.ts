import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtl: ViewController,
    private formBuilder: FormBuilder,
    private storage: Storage) {

      this.loginForm = this.formBuilder.group({
        username: [null, Validators.required],
        password: [null, Validators.required],
        remember: true
      });

      storage.get('user').then(user => {
        if (user) {
          this.user = user;
          this.loginForm.patchValue({
            'username': this.user.username,
            'password': this.user.password
          });
        } else 
          console.log('user not defined')
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtl.dismiss();
  }

  onSubmit(){
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;

    if (this.loginForm.get('remember').value) {
      this.storage.set('user', this.user);
    } else {
      this.storage.remove('user');
    }
    this.dismiss()
  }
}
