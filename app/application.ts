import {NgModule, Component, enableProdMode} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {AppRoutes} from "./app.routes";
import {AccordionModule} from "../components/accordion/accordion";
import {BreadcrumbModule} from "../components/breadcrumb/breadcrumb";
import {ButtonModule} from "../components/button/button";
import {CalendarModule} from "../components/calendar/calendar";
import {CheckboxModule} from "../components/checkbox/checkbox";
import {SharedModule} from "../components/common/shared";
import {ConfirmDialogModule} from "../components/confirmdialog/confirmdialog";
import {DataGridModule} from "../components/datagrid/datagrid";
import {DataListModule} from "../components/datalist/datalist";
import {DataScrollerModule} from "../components/datascroller/datascroller";
import {DataTableModule} from "../components/datatable/datatable";
import {DialogModule} from "../components/dialog/dialog";
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
import {ToggleButtonModule} from "../components/togglebutton/togglebutton";
import {ToolbarModule} from "../components/toolbar/toolbar";
import {TooltipModule} from "../components/tooltip/tooltip";
import {NotificationService} from "./services/notification.service";
import {SyncService} from "./services/sync.service";
import {CdtComponent} from "./components/cdt.component";
import {ConfirmationService} from "../components/common/api";
import {MenuAgdModule} from "./components/menu.module";
import {NouveauComponent} from "./components/nouveau.component";
import {GroupesComponent} from "./components/groupes.component";
import {UserComponent} from "./components/user.component";
import {LoginComponent} from "./components/login.component";
import {CanActivateIsLogged} from "./services/islogged.canactivate";

@Component({
    selector: 'agendapp',
    templateUrl: 'app/app.component.html',
    providers: [
        NotificationService
    ]
})
export class AppComponent {
    constructor(
        private _notif:NotificationService,
        private _sync:SyncService
    ) {
        // Date.prototype.toJSON = function(){ return this.toISOString(); };
    }

    public getToken():string {
        return window.localStorage.getItem("token");
    }
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
        SyncService
        // services à ajouter ici pour dispo partout : notifs, sync
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

// TODO enable/disable
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);