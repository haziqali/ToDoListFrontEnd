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
  providers: []
})
export class FriendListComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;
  public name: any;

  constructor(
    private AppService: AppService,
    private SocketService: SocketService,
    private router: Router,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit() {
    this.verifyUserConfirmation();

    this.authToken = Cookie.get("authtoken");

    this.getUserInfo();

    this.getOnlineUserList();

    this.newUserOnline();

    this.friendRequestSent();

    this.friendRequestAcceptedResp();

    this.userOffline();



  }
  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {
        this.disconnectedSocket = false;
  
        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList();
  
      });
    }

  getUserInfo() {
    this.AppService.getSingleUser(this.AppService.getUserInfoFromLocalstorage().email)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.AppService.setUserInfoInLocalStorage(apiResponse.data)
        this.userInfo = apiResponse.data;
      } else {
        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')
    });
  }

sendFriendRequest() {
    let data = {
      senderMail : this.userInfo.email,
      senderFirstName: this.userInfo.firstName,
      senderLastname: this.userInfo.lastName,
      receiverMail: this.receiverName.email,

    }
    const foundReq = this.userInfo.friendRequests.some(el => el.email === data.receiverMail);
    const foundFr = this.userInfo.friends.some(el => el.email === data.receiverMail);
    if(foundReq) {
      this.toastr.error("Friend Request already sent")
    }
    else if(foundFr) {
      this.toastr.error("User is already in your friend list")
    }
    else{
    this.SocketService.sendFriendRequest(data, this.authToken);
    }
  }

  acceptFriendRequest(reciever) {
    let data = {
      senderMail : this.userInfo.email,
      senderFirstName: this.userInfo.firstName,
      senderLastname: this.userInfo.lastName,
      receiverMail: reciever.email,
      receiverFirstName: reciever.firstName,
      receiverLastname: reciever.lastName,

    }
    this.SocketService.friendRequestAccepted(data);
    this.getUserInfo();
  }

  public friendRequestSent: any = () => {

    this.SocketService.friendRequestSent()
      .subscribe((msg) => {
        this.toastr.success(msg);
        this.receiverName = "";

      });
    }
   

public friendRequestAcceptedResp: any = () => {

  this.SocketService.friendRequestAcceptedResponse()
    .subscribe((msg) => {
      this.toastr.success(msg);
      this.getUserInfo();
      this.AppService.setUserInfoInLocalStorage(this.userInfo)
    });
  }


searchFriend(form: NgForm) {
  
  this.AppService.getSingleUser(this.name)
  .subscribe((apiResponse) => {

    if (apiResponse.status === 200) {
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




    

  public newUserOnline: any = () => {
    this.SocketService.newUserOnline()
      .subscribe((data) => {
        this.toastr.success(data);
      })
  }
  
  public getOnlineUserList: any =()=>{
    this.SocketService.onlineUserList()
      .subscribe((userList) => {
        this.userList = userList;         
      })
    }

  public userOffline: any =()=>{
    this.SocketService.disconnectedSocket()
      .subscribe((message) => {
        this.toastr.error(message);
        })
    }
}
        
        

       // end online-user-list
  
 
