import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Artiste } from '../../interfaces/artiste';
import { url_api } from '../../../environments/environment';
import { ArtistesService } from '../../services/artistes.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  artistes: Artiste[];

  constructor(private http:HttpClient, private artisteProvider:ArtistesService) { }

  ngOnInit() {
    $(window).resize(calculHeight);
    this.artisteProvider.getArtistes().subscribe(data => {
      this.artistes = data;
      setTimeout(calculHeight, 0);
    });
  }

  onMouseEnterArtiste(e) {
    $(e.srcElement).children().addClass("open");
  }

  onMouseLeaveArtiste(e) {
    $(e.srcElement).children().removeClass("open");
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