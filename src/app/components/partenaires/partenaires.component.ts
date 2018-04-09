import { Component, OnInit } from '@angular/core';
import { PartenairesService } from '../../services/partenaires.service';
import { Partenaire } from '../../interfaces/partenaires';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../../services/files.service';
import * as $ from 'jquery';
import { url_api } from '../../../environments/environment';

@Component({
  selector: 'partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit {

  partenaires : Partenaire[];
  showModal: boolean = false;
  idPartenaire : number;
  action : string;
  accessToken: string = localStorage.getItem('accessToken');
  formUrl: string = url_api + `/Containers/partenaires/upload?access_token=${this.accessToken}`;


  constructor(private http : HttpClient, private partenaireProvider : PartenairesService, private fs : FileService) { }

  ngOnInit() {
    $(window).resize(calculHeight);
    this.partenaireProvider.getPartenaire().subscribe(data => {
      this.partenaires = data;
      setTimeout(calculHeight, 0);
    });
  }

  toggleModal(idArtiste, action) {
    this.action = action;
    this.idPartenaire = idArtiste;
    this.showModal = !this.showModal;
  }

  ajouterPartenaire(e) {
    const nom = $(e.target).siblings()[0].value;
    const image = $(e.target).siblings()[1].files[0].name;
    const url = $(e.target).siblings()[2].value;
    this.partenaireProvider.ajouterPartenaire(nom, image, url).subscribe();
  }

}

function calculHeight() {
  let partenaires = document.getElementsByClassName('partenaire');
  for (let i = 0; i < partenaires.length; i++) {
    let a = partenaires[i];
    let width = $(a).css('width');
    $(a).css("height", width);
  }

}
