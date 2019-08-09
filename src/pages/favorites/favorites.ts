import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    private toastCtl: ToastController,
    private loadingCtl: LoadingController,
    private alertCtl: AlertController,
    @Inject('BaseURL') public BaseURL) {
  }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(
        favorites => this.favorites = favorites,
        errmes => this.errMess = errmes
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    let alert = this.alertCtl.create({
      title: 'Confirm Title',
      message: 'Do you want to delete Dish ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete Cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingCtl.create({
              content: 'Deleting...'
        
            });
        
            let toast = this.toastCtl.create({
              message: `Dish ${id} deleted successfully`,
              position: 'middle',
              duration: 3000
            });
        
            loading.present();
        
            console.log('delete', id);
            this.favoriteService.deleteFavorite(id)
              .subscribe(
                favorites => {
                  this.favorites = favorites;
                  loading.dismiss();
                  toast.present();
                },
                errmes => {
                  this.errMess = errmes;
                  loading.dismiss();
                }
              );
          }
        }
      ]
    });

    alert.present();

    item.close();
  }

}
