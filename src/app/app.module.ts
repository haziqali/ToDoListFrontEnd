import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//routing 
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { FriendsModule } from './toDolist/friends.module';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { TodoService } from './todo.service';
import { SocketService } from './socket.service';




@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FriendsModule,
    UserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [AppService, AuthGuard, TodoService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
