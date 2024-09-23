import {EventEmitter, Injectable, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {AuthGuard} from '../guards/auth.guard';
import {LocalesPublicDataSource} from '../datasources/locales-public.datasource';


@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  public cookieName = 'defaultLanguage';

  public languages: any;

  public currentLanguage: any;
  public currentLanguageCode: string;

  public inactiveLanguages: any;

  @Output() public languagesReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public languageSetEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public languageChangedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public translateService: TranslateService,
              public localesPublicDataSource: LocalesPublicDataSource,
              public authGuard: AuthGuard) {

    const cookieLanguage = localStorage.getItem(this.cookieName);

    this.languagesReceivedEvent.subscribe(() => {

      let language: any;

      if (cookieLanguage) {
        language = this.getLanguage(cookieLanguage);

        if (!language) {
          language = this.getLanguage('en');
        }

        this.setLanguage(language);
      } else {
        const browserLang = translateService.getBrowserLang();
        language = this.getLanguage(browserLang);

        if (!language) {
          language = this.getDefaultLanguage();
        }

        this.changeLanguage(language);
      }
    });

    if (cookieLanguage) {
      this.translateService.setDefaultLang(cookieLanguage);
      this.translateService.use(cookieLanguage);
    } else {
      const browserLang = translateService.getBrowserLang();
      this.translateService.setDefaultLang(browserLang);
      this.translateService.use(browserLang);
    }

    this.getLanguages();
  }

  getLanguages() {
    this.localesPublicDataSource.getLocales()
      .pipe(first())
      .subscribe(
        data => {
          this.languages = data;
          this.languagesReceivedEvent.emit();
        });
  }

  getLanguage(languageCode: string) {
    const languages = this.languages;

    return languages.find(function (language: any) {
      return language.code === languageCode;
    });
  }

  getDefaultLanguage() {
    const languages = this.languages;

    return languages.find(function (language: any) {
      return language.default === true;
    });
  }

  getInactiveLanguages(currentLanguageCode: string) {
    const languages = this.languages;

    return languages.filter(function (language: any) {
      return language.code !== currentLanguageCode;
    });
  }

  setLanguage(language: any) {
    const languageCode = language.code;

    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);

    localStorage.setItem(this.cookieName, languageCode);

    this.currentLanguage = language;
    this.currentLanguageCode = language.code;
    this.inactiveLanguages = this.getInactiveLanguages(languageCode);

    this.languageSetEvent.emit(language.code);
  }

  changeLanguage(language: any) {
    this.setLanguage(language);
    this.languageChangedEvent.emit(language.code);
  }

  getCurrentLanguage() {
    return this.translateService.currentLang;
  }
}
