import { Component, OnInit } from '@angular/core';
import { PartenairesService } from '../../services/partenaires.services';
import { Partenaire } from '../../interfaces/partenaires';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../../services/files.service';
import * as $ from 'jquery';

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

}

function calculHeight() {
  let artistes = document.getElementsByClassName('artiste');
  for (let i = 0; i < artistes.length; i++) {
    let a = artistes[i];
    let width = $(a).css('width');
    $(a).css("height", width);
  }

}
