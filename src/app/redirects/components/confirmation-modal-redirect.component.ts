import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthenticationService} from '../../_core/services/authentication.service';


@Component({
  template: '',
})
export class ConfirmationModalRedirectComponent implements OnInit {

  public token: string = '';
  public path: string = '/';

  constructor(public showModalService: ShowModalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public authenticationService: AuthenticationService) {

    this.token = activatedRoute.snapshot.params['token'];

    this.activatedRoute.queryParams.subscribe((params: any) => {
      const path = params['path'];

      if (path) {
        this.path = path;
      }
    });
  }

  ngOnInit() {

    const token = this.token;
    this.router.navigate(['/']).then(() => {

      setTimeout(() => {
        this.authenticationService.confirmation(token)
          .pipe(first())
          .subscribe(
            (data: any) => {
              this.router.navigate([this.path]);
            }, (errors: any) => {
              this.router.navigate([this.path]);
            });
      }, 3 * 1000);

    });

  }

}
