import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/Pages/Home/Home.component';
import { StartWelcomeComponent } from '../Components/Pages/Start/Start-Welcome/Start-Welcome.component';
import { StartFirstPageComponent } from '../Components/Pages/Start/Start-FirstPage/Start-FirstPage.component';

export const routes: Routes = [{
    component: HomeComponent,
    path: ""
},
{
    component: StartWelcomeComponent,
    path: "start",
    data: {
        animation: "StartPage"
    }
},
{
    component: StartFirstPageComponent,
    path: "start/first",
    data: {
        animation: "StartFirstPage"
    }
}
];
