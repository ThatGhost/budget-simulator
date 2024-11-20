import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/Pages/Home/Home.component';
import { StartWelcomeComponent } from '../Components/Pages/Start/Start-Welcome/Start-Welcome.component';

export const routes: Routes = [{
    component: HomeComponent,
    path: ""
},
{
    component: StartWelcomeComponent,
    path: "start"
}
];
