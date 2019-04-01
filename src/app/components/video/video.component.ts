import { Component, Input } from '@angular/core';
import * as $ from 'jquery';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  @Input()
  src: string;
  safeSrc: SafeResourceUrl;

  show: boolean = true;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(){
    this.safeSrc = this.sanitizeUrl(this.src);
  }

  handleClick() {
    const v = $('video')[0];
    this.show ? v.play() : v.pause();
    this.show = !this.show;
  }

  sanitizeUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
 }

}
