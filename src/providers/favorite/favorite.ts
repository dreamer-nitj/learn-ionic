import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Dish } from '../../shared/dish'; 
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import 'rxjs/add/operator/map';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http,
     private dishService: DishProvider,
     private storage: Storage,
     private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');

    this.favorites = [];
    
    storage.get('favorites').then(favorites => {
      if (favorites) {
        this.favorites = favorites;
      } else {
        console.log('favorites not defined');
      }
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
       this.favorites.push(id);
       this.storage.set('favorites', this.favorites);

       this.localNotifications.schedule({
         id: id,
         text: 'Dish ' + id + ' added as a favorite successfully'
       });
    }

    console.log('favorites: ', this.favorites);
    return true;
  }

  removeFavorite(id: number): boolean {
    var index: number = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites);
      return true;
    }
    
    return false;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
     return this.dishService.getDishes()
       .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    var isDeleted: boolean = this.removeFavorite(id);
    if (isDeleted) {
       return this.getFavorites();
    }
    else {
      console.log('Deleting non-existent favorite', id);
      return Observable.throw('Deleting non-existent favorite' + id);
    }
  }
}
