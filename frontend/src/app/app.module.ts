import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Formularios Reactivos
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//Páginas
import { HomeComponent } from './pages/home/home.component';

//Componentes
import { TaskListComponent } from './components/task-list/task-list.component';
import { LogoComponent } from './components/logo/logo.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

//Modulos de interfaz
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskListComponent,
    LogoComponent,
    TaskFormComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
