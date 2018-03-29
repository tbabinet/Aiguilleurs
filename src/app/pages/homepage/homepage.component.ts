import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Artiste } from '../../interfaces/artiste';
import { url_api } from '../../../environments/environment';
import { ArtistesService } from '../../services/artistes.service';

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

  artistes: Artiste[];
  artisteFocused: Artiste;

  constructor(private http:HttpClient, private artisteProvider:ArtistesService) { }

  ngOnInit() {
    $(window).resize(calculHeight);
    this.artisteProvider.getArtistes().subscribe(data => {
      if(data) {
        this.artistes = data;
        setTimeout(calculHeight, 0);
      }
    });
  }

  onMouseEnterArtiste(e) {
    $(e.srcElement).children().addClass("open");
  }

  onMouseLeaveArtiste(e) {
    $(e.srcElement).children().removeClass("open");
  }

  selectArtiste(artiste) {
    this.artisteFocused = artiste;
  }

}

function calculHeight() {
  let artistes = document.getElementsByClassName('artiste');
  console.log(artistes);
  for (let i = 0; i < artistes.length; i++) {
    let a = artistes[i];
    let width = $(a).css('width');
    $(a).css("height", width);
  }

}