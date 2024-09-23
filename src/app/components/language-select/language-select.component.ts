import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {LanguagesService} from '../../_core/services/languages.service';
import {AuthGuard} from '../../_core/guards/auth.guard';


@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageSelectComponent {

  @ViewChild('languageDropdown', {static: true}) languageDropdown;

  constructor(public languagesService: LanguagesService,
              public authGuard: AuthGuard) { }

  getCurrentLanguage() {
    return this.languagesService.currentLanguage;
  }

  getCurrentLanguageCode() {
    return this.languagesService.currentLanguage.code;
  }

  getInactiveLanguages() {
    return this.languagesService.inactiveLanguages;
  }

  changeLanguage(language: any) {
    this.languageDropdown.close();
    this.languagesService.changeLanguage(language);
  }
}
