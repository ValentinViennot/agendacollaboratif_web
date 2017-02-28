import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {CanActivateIsLogged} from "./services/islogged.canactivate";
import {CdtComponent} from "./pages/cdt.component";
import {NouveauComponent} from "./pages/nouveau.component";
import {GroupesComponent} from "./pages/groupes.component";
import {UserComponent} from "./pages/user.component";
import {LoginComponent} from "./pages/login.component";

export const routes: Routes = [
  {
    path: '',
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
