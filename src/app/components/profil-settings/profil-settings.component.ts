import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/files.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'profil-settings',
  templateUrl: './profil-settings.component.html',
  styleUrls: ['./profil-settings.component.scss']
})
export class ProfilSettingsComponent implements OnInit {

  colors: {main_color: string, second_color: string} = {main_color: '', second_color: ''};

  constructor(private fsProvider: FileService, private userProvider: AuthService) { }

  ngOnInit() {
    this.fsProvider.getColors().subscribe(colors => {
      this.colors = colors;
    });
  }

  changePassword(oldPassword: string, newPassword: string) {
    this.userProvider.changePassword(oldPassword, newPassword).subscribe();
  }

  changeMainColor(color: string) {
    this.fsProvider.setMainColor(color).subscribe(res => {
      this.colors.main_color = color;
    });
  }

  changeSecondColor(color: string) {
    this.fsProvider.setSecondColor(color).subscribe(res => {
      this.colors.second_color = color;
    });
  }

}
