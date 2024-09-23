import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowModalService} from '../../modals/_services/show-modal.service';


@Component({
  template: '',
})
export class ChangePasswordModalRedirectComponent implements OnInit {

  public token: string = '';

  constructor(public showModalService: ShowModalService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {
    this.token = activatedRoute.snapshot.params['token'];
  }

  ngOnInit() {

    const showModalService = this.showModalService;
    const token = this.token;

    this.router.navigate(['/']).then(() => {
      showModalService.openModalChangePassword(token);
    });
  }


}
