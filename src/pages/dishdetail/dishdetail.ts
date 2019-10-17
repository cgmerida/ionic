import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from "../../shared/dish";
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';
import { Comment } from '../../shared/comment';
import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') public BaseURL,
    private favoriteService: FavoriteProvider,
    private toastCtl: ToastController,
    private actionCtl: ActionSheetController,
    private modalCtl: ModalController,
    private socialSharing: SocialSharing) {
    this.dish = navParams.get('dish');
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total / this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastCtl.create({
      message: `Dish ${this.dish.id} added as a favorite successfully`,
      position: 'middle',
      duration: 3000
    }).present();
  }

  addComment() {
    let commentModal = this.modalCtl.create(CommentPage);
    commentModal.onDidDismiss(data => {
      data.date = new Date().toISOString();
      let newComment: Comment = data;

      // if (comment) {
      //   this.dish.comments.push(comment);
      // }
      this.dish.comments.push(newComment);
    });
    commentModal.present();
  }

  openAction() {
    const actionSheet = this.actionCtl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
            console.log('Added to Favorites');
          }
        }, {
          text: 'Add Comment',
          handler: () => {
            this.addComment();
            console.log('Comment Added');
          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        // {
        //   text: 'Share via Email',
        //   handler: () => {
        //     this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org'])
        //       .then(() => console.log('Posted successfully to Twitter'))
        //       .catch(() => console.log('Failed to post to Twitter'));
        //   }
        // }

        , {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
