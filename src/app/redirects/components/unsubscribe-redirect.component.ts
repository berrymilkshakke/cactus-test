import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {first} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {SubscriptionsPublicDataSource} from '../../_core/datasources/subscriptions-public.datasource';


@Component({
  template: '',
})
export class UnsubscribeRedirectComponent implements OnInit {

  public groupId: string = '';
  public login: string = '';

  constructor(public showModalService: ShowModalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public subscriptionsPublicDataSource: SubscriptionsPublicDataSource,
              public notifierService: NotifierService) {
    this.login = activatedRoute.snapshot.params['login'];
    this.groupId = activatedRoute.snapshot.params['groupId'];
  }

  ngOnInit() {

    this.router.navigate(['/']).then(() => {
      this.subscriptionsPublicDataSource.unsubscribe(this.groupId, this.login)
        .pipe(first())
        .subscribe(
          (data: any) => {
            if (data.type === 'modal') {
              this.showModalService.openModalMessage(data.message);
            } else {
              this.notifierService.notify('success', data.message);
            }

          },
          (errors: any) => {
            this.notifierService.notify('danger', errors.message);
          });
    });
  }

}
