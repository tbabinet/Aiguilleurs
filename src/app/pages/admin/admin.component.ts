import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Artiste } from '../../interfaces/artiste';
import { url_api } from '../../../environments/environment';
import { ArtistesService } from '../../services/artistes.service';
import { FileService } from '../../services/files.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  option: number = 1;
  artistes: Artiste[];
  succes: boolean;
  showModal: boolean = false;
  idArtiste: number;
  action: string;
  accessToken: string = localStorage.getItem('accessToken');
  formUrl: string = `${url_api}/Containers/media/upload?access_token=${this.accessToken}`

  constructor(private http: HttpClient, private artisteProvider: ArtistesService, private fs: FileService) { }

  ngOnInit() {
    $(window).resize(calculHeight);
    this.artisteProvider.getArtistes().subscribe(data => {
      this.artistes = data;
      setTimeout(calculHeight, 0);
    });
  }

  setOption(page: number) {
    this.option = page;
    if(page == 1) {
      setTimeout(calculHeight, 0);
    }
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
      this.artisteProvider.getArtistes().subscribe(data => {
        this.artistes = data;
        setTimeout(calculHeight, 0);
      });
    });
  }

  ajouterArtiste(nom, style, description, photo, lien) {
    this.artisteProvider.ajouterArtiste(nom, style, description, photo, lien).subscribe((artiste) => {
      this.showModal = false;
      this.artisteProvider.getArtistes().subscribe(data => {
        this.artistes = data;
        setTimeout(calculHeight, 0);
      });
    });
  }

  modifierArtiste(nom, style, description, photo, lien) {
    this.artisteProvider.modifierArtiste(this.idArtiste, nom, style, description, photo, lien).subscribe((artiste) => {
      this.showModal = false;
      this.artisteProvider.getArtistes().subscribe(data => {
        this.artistes = data;
        setTimeout(calculHeight, 0);
      });
    });
  }

  onAfficheSubmit(e) {
    const fileName = e.target[0].files[0].name;
    this.fs.setAffiche(fileName).subscribe();
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
