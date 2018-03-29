import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Artiste } from '../../interfaces/artiste';
import { url_api } from '../../../environments/environment';
import { ArtistesService } from '../../services/artistes.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  artistes: Artiste[];
  succes: boolean;
  showModal: boolean = false;
  idArtiste: number;
  action: string;

  constructor(private http: HttpClient, private artisteProvider: ArtistesService) { }

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

  toggleModal(idArtiste, action) {
    this.action = action;
    this.idArtiste = idArtiste;
    this.showModal = !this.showModal;
  }

  deleteArtiste(idArtiste) {
    this.artisteProvider.deleteArtiste(idArtiste).subscribe(() => {
      this.displaySucces("L'artiste a bien été supprimé");
      this.artisteProvider.getArtistes().subscribe(data => {
        this.artistes = data;
        setTimeout(calculHeight, 0);
      });
    });
  }

  ajouterArtiste(nom, style, description, photo) {
    this.artisteProvider.ajouterArtiste(nom, style, description, photo).subscribe((artiste) => {
      this.showModal = false;
      this.artisteProvider.getArtistes().subscribe(data => {
        this.artistes = data;
        setTimeout(calculHeight, 0);
      });
    });
  }

  modifierArtiste(nom, style, description, photo) {
    this.artisteProvider.modifierArtiste(this.idArtiste, nom, style, description, photo).subscribe((artiste) => {
      this.showModal = false;
      this.artisteProvider.getArtistes().subscribe(data => {
        this.artistes = data;
        setTimeout(calculHeight, 0);
      });
    });
  }

  displaySucces(message) {
    console.log(message);
  }

}

function calculHeight() {
  let artistes = document.getElementsByClassName('artiste');
  for (let i = 0; i < artistes.length; i++) {
    let a = artistes[i];
    let width = $(a).css('width');
    $(a).css("height", width);
  }

}
