import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    this.favorites.push(id);
    return true;
  }

  removeFavorite(id: number): boolean {
    var index: number = this.favorites.indexOf(id, 0);
    if (index > -1) {
      this.favorites.splice(id, 1);
      return true;
    }
    
    return false;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

}
