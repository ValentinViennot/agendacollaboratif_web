import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {CdtComponent} from "./components/cdt.component";
import {NouveauComponent} from "./components/nouveau.component";
import {GroupesComponent} from "./components/groupes.component";
import {UserComponent} from "./components/user.component";
import {LoginComponent} from "./components/login.component";
import {CanActivateIsLogged} from "./services/islogged.canactivate";

export const routes: Routes = [
    {path: '',
        component: CdtComponent,
        canActivate: [
            'CanActivateIsLogged',
            CanActivateIsLogged
        ]
    },
    {
        path: 'devoirs/:type',
        component: CdtComponent,
        canActivate: [
            'CanActivateIsLogged',
            CanActivateIsLogged
        ]
    },
    {
        path: 'nouveau',
        component: NouveauComponent,
        canActivate: [
            'CanActivateIsLogged',
            CanActivateIsLogged
        ]
    },
    {
        path: 'groupes',
        component: GroupesComponent,
        canActivate: [
            'CanActivateIsLogged',
            CanActivateIsLogged
        ]
    },
    {
        path: 'profil',
        component: UserComponent,
        canActivate: [
            'CanActivateIsLogged',
            CanActivateIsLogged
        ]
    },
    {
        path: 'connexion',
        component: LoginComponent
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);