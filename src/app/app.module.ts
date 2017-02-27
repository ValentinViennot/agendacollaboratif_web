import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AccordionModule} from "../components/accordion/accordion";
import {BreadcrumbModule} from "../components/breadcrumb/breadcrumb";
import {ButtonModule} from "../components/button/button";
import {CalendarModule} from "../components/calendar/calendar";
import {CheckboxModule} from "../components/checkbox/checkbox";
import {WebPushService} from "./services/push-web.service";
import {PushService} from "./services/push.service";
import {NotificationService} from "./services/notification.service";
import {SharedModule} from "../components/common/shared";
import {DataGridModule} from "../components/datagrid/datagrid";
import {DataListModule} from "../components/datalist/datalist";
import {DialogModule} from "../components/dialog/dialog";
import {ConfirmationService} from "../components/common/api";
import {CanActivateIsLogged} from "./services/islogged.canactivate";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {SyncService} from "./services/sync.service";
import {LoginComponent} from "./pages/login.component";
import {UserComponent} from "./pages/user.component";
import {GroupesComponent} from "./pages/groupes.component";
import {NouveauComponent} from "./pages/nouveau.component";
import {CdtComponent} from "./pages/cdt.component";
import {MenuAgdModule} from "./pages/menu.module";
import {TooltipModule} from "../components/tooltip/tooltip";
import {ToolbarModule} from "../components/toolbar/toolbar";
import {ToggleButtonModule} from "../components/togglebutton/togglebutton";
import {AppRoutes} from "./app.routes";
import {DataScrollerModule} from "../components/datascroller/datascroller";
import {DataTableModule} from "../components/datatable/datatable";
import {ConfirmDialogModule} from "../components/confirmdialog/confirmdialog";
import {DropdownModule} from "../components/dropdown/dropdown";
import {FieldsetModule} from "../components/fieldset/fieldset";
import {FileUploadModule} from "../components/fileupload/fileupload";
import {GrowlModule} from "../components/growl/growl";
import {InputMaskModule} from "../components/inputmask/inputmask";
import {InputSwitchModule} from "../components/inputswitch/inputswitch";
import {InputTextModule} from "../components/inputtext/inputtext";
import {InputTextareaModule} from "../components/inputtextarea/inputtextarea";
import {ListboxModule} from "../components/listbox/listbox";
import {MessagesModule} from "../components/messages/messages";
import {OverlayPanelModule} from "../components/overlaypanel/overlaypanel";
import {PanelModule} from "../components/panel/panel";
import {PanelMenuModule} from "../components/panelmenu/panelmenu";
import {ProgressBarModule} from "../components/progressbar/progressbar";
import {RadioButtonModule} from "../components/radiobutton/radiobutton";
import {SelectButtonModule} from "../components/selectbutton/selectbutton";

export function pushFactory(_notif: NotificationService): PushService {
  return new WebPushService(_notif);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes,
    HttpModule,
    AccordionModule,
    //AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    //CarouselModule,
    //ChartModule,
    CheckboxModule,
    //CodeHighlighterModule,
    SharedModule,
    //ContextMenuModule,
    DataGridModule,
    DataListModule,
    DataScrollerModule,
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    //DragDropModule,
    DropdownModule,
    //EditorModule,
    FieldsetModule,
    FileUploadModule,
    //GalleriaModule,
    //GMapModule,
    GrowlModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    //LightboxModule,
    ListboxModule,
    //MegaMenuModule,
    //MenuModule,
    //MenubarModule,
    MessagesModule,
    //MultiSelectModule,
    //OrderListModule,
    OverlayPanelModule,
    //PaginatorModule,
    PanelModule,
    PanelMenuModule,
    //PasswordModule,
    //PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    //RatingModule,
    //ScheduleModule,
    SelectButtonModule,
    //SlideMenuModule,
    //SliderModule,
    //SpinnerModule,
    //SplitButtonModule,
    //TabMenuModule,
    //TabViewModule,
    //TerminalModule,
    //TieredMenuModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    //TreeModule,
    //TreeTableModule,
    //TriStateCheckboxModule,
    MenuAgdModule
    // modules à ajouter ici !
  ],
  declarations: [
    AppComponent,
    CdtComponent,
    NouveauComponent,
    GroupesComponent,
    UserComponent,
    LoginComponent
    // components à ajouter ici !
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ConfirmationService,
    {provide: 'CanActivateIsLogged', useClass: CanActivateIsLogged},
    CanActivateIsLogged,
    SyncService,
    NotificationService,
    {
      provide: PushService,
      useFactory: pushFactory,
      deps: [NotificationService]
    }
    // services à ajouter ici pour dispo partout : notifs, sync
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
