import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard } from '../guards/auth.guard';
import { ListMenuComponent } from './listmenu/listmenu.component';
import { FormsModule } from '@angular/forms';
import { CreateListComponent } from './create-list/create-list.component';
import { FriendListComponent } from './friends/friend-list/friend-list.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([ 
  
      { path: 'createList', component: CreateListComponent, canActivate: [AuthGuard] },
      { path: 'list-detail/:listName', component: ListMenuComponent, canActivate: [AuthGuard] },
      { path: 'friends', component: FriendListComponent, canActivate: [AuthGuard] },
    ])
  ],
  declarations: [ListMenuComponent, CreateListComponent, FriendListComponent]
})
export class ChatModule { }
