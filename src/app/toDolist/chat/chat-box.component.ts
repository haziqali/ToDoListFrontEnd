import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { AppService } from '../../app.service';

import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})

export class ChatBoxComponent implements OnInit {


  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;


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
