import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MoneyBonusesService} from '../../_core/services/money-bonuses.service';
import {FsBonusesService} from '../../_core/services/fs-bonuses.service';
import {PlayerService} from '../../_core/services/player.service';
import {AuthGuard} from '../../_core/guards/auth.guard';


@Component({
  selector: 'app-bonuses-list',
  templateUrl: './bonuses-list.component.html',
  styleUrls: ['./bonuses-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonusesListComponent implements OnInit {

  @Input() public categoryName: string;
  @Output() successEvent: any = new EventEmitter();

  public moneyBonuses: any;
  public fsBonuses: any;

  constructor(public moneyBonusesService: MoneyBonusesService,
              public fsBonusesService: FsBonusesService,
              public authGuard: AuthGuard,
              public playerService: PlayerService) {
  }

  ngOnInit() {
    this.moneyBonuses = this.moneyBonusesService.moneyBonuses;
    this.moneyBonusesService.moneyBonusesUpdatedEvent.subscribe((data: any) => {
      this.moneyBonuses = this.moneyBonusesService.moneyBonuses;
    });

    this.fsBonuses = this.fsBonusesService.fsBonuses;
    this.fsBonusesService.fsBonusesUpdatedEvent.subscribe((data: any) => {
      this.fsBonuses = this.fsBonusesService.fsBonuses;
    });
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  checkPlayerInGroup(groupName: string) {
    return this.playerService.isNameInPlayerGroups(groupName);
  }

  emitSuccessEvent() {
    this.successEvent.emit();
  }
}
