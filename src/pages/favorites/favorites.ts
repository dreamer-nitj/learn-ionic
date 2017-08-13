import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController,
   LoadingController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
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
     private toastController: ToastController,
     private loadingController: LoadingController,
     private alertController: AlertController,
     @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
      errmess => this.errMess = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
     console.log('delete', id);
     let alert = this.alertController.create({
       title: 'Confirm Delete',
       message: 'Do you want to delete Favorite ' + id,
       buttons: [
         {
           text: 'Cancel',
           role: 'cancel',
           handler: () => {
             console.log('Delete cancelled');
           }
         },
         {
           text: 'Delete',
           handler: () => {
             let loading = this.loadingController.create({
                 content: 'Deleting ...'
             });
             let toast = this.toastController.create({
                 message: 'Dish ' + id + ' deleted successfully',
                 duration: 3000
             });

             loading.present();

             this.favoriteService.deleteFavorite(id)
                 .subscribe(favorites => { this.favorites = favorites; loading.dismiss(); toast.present(); },
                    errmess => { this.errMess = errmess; loading.dismiss(); });
           }
         }
       ]
     });
     
     alert.present();
     item.close();
  }

}
