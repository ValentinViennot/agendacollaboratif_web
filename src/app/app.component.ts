import {Component, OnInit} from "@angular/core";
import {NotificationService} from "./services/notification.service";
import {PushService} from "./services/push.service";

@Component({
  moduleId: module.id,
  selector: 'agendapp',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(public _notif: NotificationService,
              public _push: PushService) {
  }

  ngOnInit(): void {
    this._push.initPush();
  }

  public getToken(): string {
    return window.localStorage.getItem("token");
  }
}
