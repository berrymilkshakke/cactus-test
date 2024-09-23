import {Injectable} from '@angular/core';
import {PlayerService} from '../../_core/services/player.service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {ActivatedRoute, DefaultUrlSerializer, Router} from '@angular/router';
import {EmailPublicDataSource} from '../../_core/datasources/emails-public.datasource';
import {first} from 'rxjs/operators';
import {AuthGuard} from '../../_core/guards/auth.guard';


@Injectable({
  providedIn: 'root'
})
export class RedirectsService {

  public profilePatch = '/profile/info';
  public bonusesPatch = '/bonuses/available';

  public keyRedirectPatch = 'redirectPatch';

  constructor(public playerService: PlayerService,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public router: Router,
              public emailPublicDataSource: EmailPublicDataSource,
              public authenticationService: AuthenticationService,
              public activatedRoute: ActivatedRoute,
              public authGuard: AuthGuard) {

    authenticationService.registrationAndAuthorizationEvent.subscribe(() => {
      this.router.navigate([this.profilePatch]);
    });

    authenticationService.confirmationEvent.subscribe(() => {
      if (playerService.player) {
        if (!playerService.player.profile_filled) {
          this.router.navigate([this.profilePatch]);
        } else {
          this.router.navigate([this.bonusesPatch]);
        }
      }
    });

    authenticationService.registrationEvent.subscribe(() => {
      const redirectPatch = localStorage.getItem(this.keyRedirectPatch);
      if (redirectPatch) {
        this.router.navigate([redirectPatch]);
        localStorage.removeItem(this.keyRedirectPatch);
      }
    });

    authenticationService.authorizationEvent.subscribe(() => {
      const redirectPatch = localStorage.getItem(this.keyRedirectPatch);
      if (redirectPatch) {
        this.router.navigate([redirectPatch]);
        localStorage.removeItem(this.keyRedirectPatch);
      }
    });

    authenticationService.logoutEvent.subscribe(() => {
      this.router.navigate(['/']);
    });

    authGuard.routeCanNotBeActivated.subscribe(() => {

      const redirectPatch = localStorage.getItem(this.keyRedirectPatch);

      if (redirectPatch) {

        const urlObj = new DefaultUrlSerializer();
        const parsed = urlObj.parse(redirectPatch);

        const queryParams = parsed.queryParams;

        if (queryParams.emailUuid) {
          this.setClicked(queryParams.emailUuid);
        }

        delete queryParams.emailUuid;

        const serialized = urlObj.serialize(parsed);

        localStorage.setItem(this.keyRedirectPatch, serialized);
      }

      this.router.navigate(['/']);
    });

    this.activatedRoute.queryParams.subscribe((params: any)=> {

      const emailUuid = params['emailUuid'];

      if (emailUuid) {
        this.setClicked(emailUuid);
      }
    });
  }

  setClicked(emailUuid: any) {
    this.emailPublicDataSource
      .setClicked(emailUuid)
      .pipe(first())
      .subscribe(
        (data: any) => {
        });
  }
}
