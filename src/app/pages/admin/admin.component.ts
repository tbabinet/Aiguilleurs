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
  accessToken: string = localStorage.getItem('accessToken');
  formUrl: string = `${url_api}/Containers/media/upload?access_token=${this.accessToken}`;
  afficheUrl: string;
  videoUrl: string;
  colors: {main_color: string, second_color: string} = {main_color: '', second_color: ''};

  constructor(private http: HttpClient, private artisteProvider: ArtistesService, private fs: FileService) { }

  ngOnInit() {
    this.artisteProvider.getArtistes().subscribe(data => {
      this.artistes = data;
    });

    this.fs.getColors().subscribe(colors => {
      this.colors = colors;
    });

    this.fs.getAssets().subscribe(data => {
      data.forEach(f => {
        switch (f.name) {
          case 'affiche':
            this.afficheUrl = `${url_api}/Containers/media/download/${f.url}`;
            break;
          case 'video':
            this.videoUrl = `${url_api}/Containers/media/download/${f.url}`;
            break;
          default:
            break;
        }
      });
    });
  }

  setOption(page: number) {
    this.option = page;
  }

  onAfficheSubmit(e) {
    const fileName = e.target[0].files[0].name;
    this.fs.setAffiche(fileName).subscribe();
  }

  onVideoSubmit(e) {
    const fileName = e.target[0].files[0].name;
    this.fs.setVideo(fileName).subscribe();
  }

  changeMainColor() {
    console.log('Change color !');
  }

}

