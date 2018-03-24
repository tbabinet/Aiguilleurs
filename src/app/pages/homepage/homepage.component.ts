import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    calculHeight();
    $(window).resize(calculHeight);
  }

  onMouseEnterArtiste(e) {
    $(e.srcElement).children().addClass("open");
  }

  onMouseLeaveArtiste(e) {
    $(e.srcElement).children().removeClass("open");
  }

}

function calculHeight() {
  var artistes = document.getElementsByClassName('artiste');
  for (var i = 0; i < artistes.length; i++) {
    var a = artistes[i];
    var width = $(a).css('width');
    $(a).css("height", width);
  }
}