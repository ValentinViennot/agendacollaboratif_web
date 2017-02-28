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
import {Component, OnInit} from "@angular/core";
import {NotificationService} from "../services/notification.service";
import {SyncService} from "../services/sync.service";
import {ParseService} from "../services/parse.service";
import {User} from "../concepts/user";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {PushService} from "../services/push.service";

@Component({
  moduleId: module.id,
  templateUrl: './user.component.html',
  providers: [ParseService]
})
export class UserComponent implements OnInit {

  user: User;
  fr: any;

  // Observer les changements
  changed: boolean;
  userForm: FormGroup;

  push: boolean;
  push_value: string;

  hours: number[]; // heures de rappel

  constructor(private _notif: NotificationService,
              public _sync: SyncService,
              private _push: PushService,
              private _parse: ParseService) {
    this.hours = Array.from(Array(24).keys());
    this.user = this._parse.parse("user");
  }

  ngOnInit(): void {
    this.init(false);
    this.userForm = new FormGroup({
      'prenom': new FormControl({value: this.user.prenom, disabled: !this.user.fake_identity}, Validators.required),
      'nom': new FormControl({value: this.user.nom, disabled: !this.user.fake_identity}, Validators.required),
      'email': new FormControl(this.user.email, [Validators.required, Validators.pattern("([a-zA-Z0-9_.]{1}[a-zA-Z0-9_.]*)((@[a-zA-Z]{2}[a-zA-Z]*)[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))")]),
      'mdp1': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'mdp2': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'mail': new FormControl(this.user.mail),
      'notifs': new FormControl(this.user.notifs),
      'rappels': new FormControl(this.user.rappels),
      'push': new FormControl(this.push)
    });
    this.userForm.valueChanges
      .subscribe(form => this.changed = true);
  }

  private init(sync: boolean): void {
    if (sync) this._notif.add(0, 'Modifications enregistrées', '');
    else console.log("init user");
    this.push = this._push.isActivated();
    this._push.getPushToken().then(
      (token) => this.push_value = token
    );
    let th: any = this;
    this.changed = false;
    this._sync.syncUser().then(
      function () {
        th.user = th._parse.parse("user");
        th.userForm = new FormGroup({
          'prenom': new FormControl({value: th.user.prenom, disabled: !th.user.fake_identity}, Validators.required),
          'nom': new FormControl({value: th.user.nom, disabled: !th.user.fake_identity}, Validators.required),
          'email': new FormControl(th.user.email, [Validators.required, Validators.pattern("([a-zA-Z0-9_.-]{1}[a-zA-Z0-9_.-]*)((@[a-zA-Z-]{2}[a-zA-Z-]*)[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))")]),
          'mdp1': new FormControl('', [Validators.required, Validators.minLength(6)]),
          'mdp2': new FormControl('', [Validators.required, Validators.minLength(6)]),
          'mail': new FormControl(th.user.mail),
          'notifs': new FormControl(th.user.notifs),
          'rappels': new FormControl(th.user.rappels),
          'push': new FormControl(th.push)
        });
        th.userForm.valueChanges
          .subscribe(form => th.changed = true);
      },
      erreur => th._notif.add(
        2, 'Problème de synchronisation',
        'Impossible de récupérer les données (' + erreur + ')')
    );
  }

  public save(): void {
    if (this.userForm.value.mdp1 == this.userForm.value.mdp2) {
      let infos: any = this.userForm.value;
      infos.push = this.push_value;
      console.log(infos);//TODO enlever
      this._sync.saveUser(infos).then(
        result => this.init(true),
        erreur => this._notif.add(2, 'Erreur', erreur)
      );
    } else {
      this._notif.add(1, 'Les mots de passe ne correspondent pas', '');
    }
  }

  public setPush(): void {
    // ne pas prendre en compte l'initialisation auto
    if (this.changed) {
      console.log("Trying to set Push");
      if (!this.push) this._notif.add(1, "Notifications Push", "Le choix effectué n'est valable que pour cette session, sur cet appareil.");
      else this._notif.add(0, "Désactivation des notifications push...", "");
      this._push.registerPush().then(
        (token) => this._sync.saveUser({"push": this._push.isActivated() ? token : ""}).then(
          () => this.init(false)
        ).catch(() => this._notif.add(0, "Pense à enregistrer tes modifications ! ;)", ""))
      ).catch(
        (erreur) => this._notif.add(2, "Erreur", erreur)
      );
    }
  }
}
