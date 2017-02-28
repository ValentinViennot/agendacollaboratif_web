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
/**
 * Created by Valentin on 17/07/2016.
 */
import {Injectable} from "@angular/core";
import {Message, ConfirmationService} from "../../components/common/api";

@Injectable()
export class NotificationService {

  constructor(private confirmationService: ConfirmationService) {
  }

  public msgs: Message[] = [];

  public add(level: number, titre: string, message: string): void {
    let levels = ["info", "warn", "error"];
    this.msgs.push({severity: levels[level], summary: titre, detail: message});
  }

  public ask(titre: string, message: string, confirmer: string, annuler: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.confirmationService.confirm({
          message: message,
          header: titre,
          accept: () => resolve(),
          reject: () => reject()
        });
      }
    );
  }
}
