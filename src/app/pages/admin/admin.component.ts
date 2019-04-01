import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Artiste } from '../../interfaces/artiste';
import { url_api } from '../../../environments/environment';
import { ArtistesService } from '../../services/artistes.service';
import { FileService } from '../../services/files.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  safeVideoUrl: SafeResourceUrl;
  constructor(private http: HttpClient, private artisteProvider: ArtistesService, private fs: FileService, private sanitizer: DomSanitizer) { }

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
            this.videoUrl = `${f.url}`;
            this.safeVideoUrl = this.sanitizeUrl(this.videoUrl);
            console.log(this.safeVideoUrl);
            
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

  onVideoSubmit(vName) {
    console.log(vName);
    this.fs.setVideo(vName).subscribe();
  }

  changeMainColor() {
    console.log('Change color !');
  }

  sanitizeUrl(url){
     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

