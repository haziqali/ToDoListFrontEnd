import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../socket.service';
import { AppService } from '../../../app.service';

import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
  providers: [SocketService]
})
export class FriendListComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;
  public name: any;
  constructor(
    public AppService: AppService,
    public SocketService: SocketService,
    public router: Router,
    private toastr: ToastrService,
  ) {

  }



  ngOnInit() {


    this.userInfo = this.AppService.getUserInfoFromLocalstorage();

    this.verifyUserConfirmation();

    this.getOnlineUserList();

    this.newUserOnline();



  }

sendFriendRequest() {
    let data = {
      senderEmail : this.userInfo.email,
      receiverEmail: this.receiverName.email
    }
    console.log(data);
  }



searchFriend(form: NgForm) {
  
  this.AppService.getSingleUser(this.name)
  .subscribe((apiResponse) => {

    if (apiResponse.status === 200) {
      console.log(apiResponse.data);
      if(apiResponse.data.email!==this.userInfo.email) {
      this.receiverName = apiResponse.data;
      }

    } else {

      this.toastr.error(apiResponse.message) 
    }
  }, (err) => {
    this.toastr.error('some error occured')

  });
  this.name = "";
  this.receiverName = "";
  form.reset();
} // end condition





  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;
  
        this.SocketService.setUser(Cookie.get("authtoken"));
        this.getOnlineUserList();

      });
    }

    public newUserOnline: any = () => {
      this.SocketService.newUserOnline()
        .subscribe((data) => {
          this.toastr.success(data);
          console.log(data);
        })
    }
  
  public getOnlineUserList :any =()=>{

    this.SocketService.onlineUserList()
      .subscribe((userList) => {

        this.userList = [];

        for (let x in userList) {

          let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };

          this.userList.push(temp);          

        }
        
        console.log(this.userList);

      }); // end online-user-list
  }


    







  }
