import { Component } from '@angular/core';
import { SearchPage } from "../search/search";
import { FavoritePage } from "../favorite/favorite";

/*
 Generated class for the Tabs page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  searchPage = SearchPage;
  favoritePage = FavoritePage;

}
