import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Artiste } from '../../interfaces/artiste';
import { url_api } from '../../../environments/environment';
import { ArtistesService } from '../../services/artistes.service';
import { FileService } from '../../services/files.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('slideDown', [
      state('void', style({
        opacity: 0,
        height: '0px'
      })),
      state('*',   style({
        opacity: 1,
        height: '400px'
      })),
      transition('void => *', animate('500ms ease-in')),
      transition('* => void', animate('500ms ease-out'))
    ])
  ]
})
export class HomepageComponent implements OnInit {

  scrolled: boolean = false;
  affiche: string = "";
  video: string = "";
  artistes: Artiste[];
  artisteFocused: Artiste;
  descriptionOnFocus: string[];
  connectionError: boolean = false;

  constructor(private http:HttpClient, private artisteProvider:ArtistesService, private fs:FileService) {
   }

  ngOnInit() {
    $(window).resize(calculHeight);

    this.artisteProvider.getArtistes().subscribe(data => {
      if(data) {
        this.connectionError = false;
        this.artistes = data;
        setTimeout(calculHeight, 0);
      }
    }, err => {
      console.log(err);
      this.connectionError = true;
    });

    this.fs.getAssets().subscribe(data => {
      data.forEach(f => {
        switch (f.name) {
          case 'affiche':
            this.affiche = `${url_api}/Containers/media/download/${f.url}`;
            break;
          case 'video':
            this.video = `${url_api}/Containers/media/download/${f.url}`;
            break;
          default:
            break;
        }
      });
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    if(!this.scrolled && window.pageYOffset > 100) {
      this.scrolled = true;
    }
    else if(this.scrolled && window.pageYOffset <= 100) {
      this.scrolled = false;
    }
  }

  onMouseEnterArtiste(e) {
    $(e.srcElement).children().addClass("open");
  }

  onMouseLeaveArtiste(e) {
    $(e.srcElement).children().removeClass("open");
  }

  selectArtiste(artiste : Artiste) {
    this.artisteFocused = artiste;
    this.descriptionOnFocus = artiste.description.split('\n');
  }

}

function calculHeight() {
  let artistes = document.getElementsByClassName('artiste');
  let width = $(artistes[0]).css('width');
  for (let i = 0; i < artistes.length; i++) {
    let a = artistes[i];
    $(a).css("height", width);
  }
}