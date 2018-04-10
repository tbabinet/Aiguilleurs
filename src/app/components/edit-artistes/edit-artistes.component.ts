import { Component, Input, AfterViewChecked } from '@angular/core';
import * as $ from 'jquery';
import { Artiste } from '../../interfaces/artiste';
import { ArtistesService } from '../../services/artistes.service';

@Component({
  selector: 'edit-artistes',
  templateUrl: './edit-artistes.component.html',
  styleUrls: ['./edit-artistes.component.scss']
})
export class EditArtistesComponent implements AfterViewChecked {

  @Input()
  artistes: Artiste[];

  showModal: boolean = false;
  selectedArtiste: Artiste;
  action: string;

  constructor(private artisteProvider: ArtistesService) {
    $(window).resize(calculHeight);
   }

  ngAfterViewChecked() {
    calculHeight();
  }

  toggleModal(artiste, action) {
    this.action = action;
    this.selectedArtiste = artiste;
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
    this.artisteProvider.modifierArtiste(this.selectedArtiste.id, nom, style, description, photo, lien).subscribe((artiste) => {
      this.showModal = false;
      this.artisteProvider.getArtistes().subscribe(data => {
        this.artistes = data;
        setTimeout(calculHeight, 0);
      });
    });
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
