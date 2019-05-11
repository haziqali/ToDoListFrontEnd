import { Injectable } from '@angular/core';


import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SocketService {

  private url = 'http://localhost:3000';

  private socket;


  constructor(public http: HttpClient, public appService: AppService) {
    // connection is being created.
    // that handshake
    this.socket = io(this.url);
    
  }
  
  
  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  } // end verifyUser

  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on("online-user-list", (userList) => {
        observer.next(userList);
      }); // end Socket
    }); // end Observable
  } // end onlineUserList


  public newUserOnline = () => {
    return Observable.create((observer) => {
      this.socket.on("new-user-online", (message) => {
        observer.next(message);
      });
    });
  }

  public friendRequestSent = () => {
    return Observable.create((observer) => {
      this.socket.on(`${this.appService.getUserInfoFromLocalstorage().email}-friend-request-sent`, (message) => {
        observer.next(message);
      });
    });
  }

  public friendRequestAcceptedResponse = () => {
    return Observable.create((observer) => {
      this.socket.on(`${this.appService.getUserInfoFromLocalstorage().email}-friend-request-accepted-db`, (message) => {
        observer.next(message);
      });
    });
  }


  public disconnectedSocket = () => {

    return Observable.create((observer) => {

      this.socket.on("disconnect", () => {

        observer.next();

      }); // end Socket

    }); // end Observable



  }

  public exitSocket = () =>{
    this.socket.disconnect();
  }

  public setUser = (authToken) => {
    console.log(authToken)
    this.socket.emit("set-user", authToken);
  } // end setUser

  // events to be emitted
  public sendFriendRequest = (data, authToken) => {
    this.socket.emit("friend-request", data, authToken);

  }

  public addListItem = (data) => {
    this.socket.emit("add-list-item", data);

  }
  
  public listItemAdded = () => {
    return Observable.create((observer) => {
      this.socket.on("list-item-added", (message) => {
        observer.next(message);
      }); 
    }); // end Observable
  }

  public deleteListItem = (data) => {
    this.socket.emit("delete-list-item", data);

  }
  public listItemDeleted = () => {
    return Observable.create((observer) => {
      this.socket.on("list-item-deleted", (message) => {
        observer.next(message);
      }); 
    }); // end Observable
  }

  public editListItem = (data) => {
    this.socket.emit("edit-list-item", data);

  }
  public listItemedited = () => {
    return Observable.create((observer) => {
      this.socket.on("list-item-edited", (message) => {
        observer.next(message);
      }); 
    }); // end Observable
  }

  public doneListItem = (data) => {
    this.socket.emit("done-list-item", data);

  }
  public listItemCompleted = () => {
    return Observable.create((observer) => {
      this.socket.on("list-item-completed", (message) => {
        observer.next(message);
      }); 
    }); // end Observable
  }

  public clearListItem = (data) => {
    this.socket.emit("clear-list-item", data);

  }
  public listItemCleared = () => {
    return Observable.create((observer) => {
      this.socket.on("list-item-cleared", (message) => {
        observer.next(message);
      }); 
    }); // end Observable
  }
 

  public friendRequestAccepted = (data) => {
    this.socket.emit("friend-request-accepted", data);

  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}
