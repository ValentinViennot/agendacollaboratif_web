/*
 "l'Agenda Collaboratif"
 Copyright (C)  2016  Valentin VIENNOT
 Contact : vviennot@orange.fr

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 You have to put a copy of this program's license into your project.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
 */
import {NgModule, Component, OnInit, OnDestroy} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SyncService} from "../services/sync.service";
import {DateService} from "../services/date.service";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {ParseService} from "../services/parse.service";
import {Devoir} from "../concepts/devoir";
import {Section} from "../concepts/section";
import {TooltipModule} from "../../components/tooltip/tooltip";

@Component({
  moduleId: module.id,
  selector: 'agd-menu',
  templateUrl: './menu.module.html',
  providers: [
    DateService,
    ParseService
  ]
})
export class Menu implements OnInit, OnDestroy {

  private interval: any;
  public sections: Section[];

  constructor(public _sync: SyncService,
              private _date: DateService,
              private _parse: ParseService) {
    this.sections = [];
  }

  ngOnInit(): void {
    this.sync();
    this.interval = IntervalObservable.create(60000).subscribe((t) => this.sync());
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  private sync(): void {
    console.log("Mise à jour du semainier...");
    let sections = Section.getSections(this.getDevoirs(), this._date).sections;
    this.sections = this.transformSections(sections);
  }

  private getDevoirs(): Devoir[] {
    // Récupère les devoirs depuis le localStorage
    return this._parse.parse("devoirs");
  }

  private transformSections(sections: Section[]): Section[] {
    let today: number = (new Date()).getDate();
    let date: Date = new Date();
    let retour: Section[] = [];
    let j = 0;
    for (let i: number = today; i < today + 9; i++) {
      if (sections[j].titre === date.getDate().toString()) {
        retour.push(sections[j]);
        j++;
      } else {
        retour.push({
          titre: date.getDate().toString(),
          sous_titre: this._date.getDayTiny(date),
          devoirs: [],
          mois: null
        });
      }
      date.setDate(date.getDate() + 1);
    }
    return retour;
  }

}

@NgModule({
  imports: [CommonModule, RouterModule, TooltipModule],
  exports: [Menu],
  declarations: [Menu]
})
export class MenuAgdModule {
}
