import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShowModalService} from '../../modals/_services/show-modal.service';


@Component({
  template: '',
})
export class RegisterModalRedirectComponent implements OnInit {

  constructor(public showModalService: ShowModalService,
              public router: Router) {
  }

  ngOnInit() {

    const showModalService = this.showModalService;

    this.router.navigate(['/']).then(() => {
      showModalService.openModalRegistration();
    });
  }

}
