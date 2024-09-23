import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class TournamentsDataSource {

  constructor(public http: HttpClient) {
  }

  getTournamentsActive() {
    return this.http.get<any>(`${DomainsConfig.domain}/tournaments/get-tournaments-active`);
  }

  getTournamentsFinished() {
    return this.http.get<any>(`${DomainsConfig.domain}/tournaments/get-tournaments-finished`);
  }

  getTournament(tournamentId: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/tournaments/get-tournament/${tournamentId}`);
  }

}
