import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
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
     @Inject('BaseURL') private BaseURL,
     private favoriteService: FavoriteProvider,
     private actionsheetController: ActionSheetController,
     private modalController: ModalController,
     private toastController: ToastController) {
       this.dish = navParams.get('dish');
       this.favorite = this.favoriteService.isFavorite(this.dish.id);
       this.numcomments = this.dish.comments.length;
       let total = 0;
       this.dish.comments.forEach(comment => total += comment.rating);
       this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  removeFromFavorites() {
    console.log('Removing from Favorites', this.dish.id);
    this.favorite = !this.favoriteService.removeFavorite(this.dish.id);
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastController.create({
      message: 'Dish ' + this.dish.id + ' added as a favorite successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }

  showActionSheet() {
    let actionSheet = this.actionsheetController.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            this.openComment();
          }
        },
        {
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

  openComment() {
    let modal = this.modalController.create(CommentPage);
    modal.onDidDismiss(data => {
      console.log('data received: ', data);
      let newComment = {
        rating: data.rating,
        comment: data.comment,
        author: data.name,
        date: new Date().toString()
      };
      this.dish.comments.push(newComment);
    });
    modal.present();
  }
}
