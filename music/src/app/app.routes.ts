import { Routes } from '@angular/router';
import { AboutComponent } from '../news/about/about.component';
import { ContactComponent } from '../news/contact/contact.component';
import { ImpressumComponent } from '../news/impressum/impressum.component';
import { NewsComponent } from '../news/news.component';

export const routes: Routes = [
  {path: '', component: NewsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'impressum', component: ImpressumComponent}
];
