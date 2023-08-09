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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskListComponent,
    LogoComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
