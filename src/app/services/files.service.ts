import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { url_api } from '../../environments/environment';
import { File } from '../interfaces/file';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class FileService {

  accessToken: string = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) {}

  getAssets(): Observable<File[]> {
    return this.http.get<File[]>(`${url_api}/assets`);
  }

  setAffiche(name: string) {
    return this.http.post<File>(`${url_api}/assets/update?where=%7B%22name%22%3A%20%22affiche%22%7D&access_token=${this.accessToken}`, {url: name});
  }
}
