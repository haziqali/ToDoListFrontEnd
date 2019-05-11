import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'list-menu',
  templateUrl: './listmenu.component.html',
  styles: [],
  providers : [TodoService]
})
export class ListMenuComponent implements OnInit {
  
  private newTodo: any[] = [];
  private todos: any;
  private todoObj: any;
  private editable: boolean = false;
  private result: any;
  private user: any;

  constructor(private todoService: TodoService, private route: ActivatedRoute, private toastr: ToastrService, private socketService: SocketService) {
  }

  ngOnInit(): void {
    
    this.getSingleToDoList();
    this.listItemAdded();
    this.listItemDeleted();
    this.listItemEdited();
    this.listItemCompleted();
    this.listItemCleared();
}

checkListPermission() {
  this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
  this.user = JSON.parse(localStorage.getItem("userInfo")).email;
  if(this.result.includes(this.user)) {
    return true;
  }
  return false;
}
g() {
  console.log(1)
}
public listItemAdded: any = () => {
  
  if(this.checkListPermission()) {
  this.socketService.listItemAdded()
    .subscribe((msg) => {
      this.toastr.success(msg);
      this.getSingleToDoList();
    });
  }
}

  public listItemDeleted: any = () => {
    if(this.checkListPermission()) {
    this.socketService.listItemDeleted()
      .subscribe((msg) => {
        this.toastr.success(msg);
        this.getSingleToDoList();
      });
    }
  }

    public listItemEdited: any = () => {
      if(this.checkListPermission()) {
      this.socketService.listItemedited()
        .subscribe((msg) => {
          this.toastr.success(msg);
          this.getSingleToDoList();
        });
      }
    }

      public listItemCompleted: any = () => {
        if(this.checkListPermission()) {
        this.socketService.listItemCompleted()
          .subscribe((msg) => {
            this.toastr.success(msg);
            this.getSingleToDoList();
          });
        }
      }
        public listItemCleared: any = () => {
          if(this.checkListPermission()) {
          this.socketService.listItemCleared()
            .subscribe((msg) => {
              this.toastr.success(msg);
              this.getSingleToDoList();
            });
          }
        }
 
getSingleToDoList() {
  this.todos =  this.todoService.getSingleToDoList(this.route.snapshot.params["listName"])
  .subscribe((apiResponse) => {
    if (apiResponse.status === 200) {
      console.log(apiResponse)
      this.todos = apiResponse.data;
      this.newTodo = this.todos.doneListItems;
      Cookie.set("listName", this.todos.name);
    } else {

      this.toastr.error(apiResponse.message)
    }
  }, (err) => {
    this.toastr.error('some error occured')
  });
}

clearAll() {
  this.todoService.clearAll()
  .subscribe((apiResponse) => {
    console.log(apiResponse)
    if (apiResponse.status === 200) {
      let data = {
        senderName: Cookie.get('receiverName'),
        listName: this.todos.name
      }
      this.socketService.clearListItem(data);
      this.getSingleToDoList();
    } else {

      this.toastr.error(apiResponse.message)
    }
  }, (err) => {
    this.toastr.error('some error occured')
  });
}

clearActiveItems() {
  this.todoService.clearActiveItems()
  .subscribe((apiResponse) => {
    if (apiResponse.status === 200) {
      let data = {
        senderName: Cookie.get('receiverName'),
        listName: this.todos.name
      }
      this.socketService.clearListItem(data);
      this.getSingleToDoList();
    } else {

      this.toastr.error(apiResponse.message)
    }
  }, (err) => {
    this.toastr.error('some error occured')
  });
}

clearDoneItems() {
  this.todoService.clearDoneItems()
  .subscribe((apiResponse) => {
    if (apiResponse.status === 200) {
      let data = {
        senderName: Cookie.get('receiverName'),
        listName: this.todos.name
      }
      this.socketService.clearListItem(data);
      this.getSingleToDoList();
    } else {

      this.toastr.error(apiResponse.message)
    }
  }, (err) => {
    this.toastr.error('some error occured')
  });
}


addtoList(value) {
   this.todoService.addToDoList(value)
   .subscribe((apiResponse) => {
    if (apiResponse.status === 200) {
      this.toastr.success(apiResponse.message)
      this.todos.listItems.push( {text:value, edit: false});
      let data = {
        listItem: value,
        senderName: Cookie.get('receiverName'),
        listName: this.todos.name
      }
      this.socketService.addListItem(data);
    } else {

      this.toastr.error(apiResponse.message)
    }
  }, (err) => {
    this.toastr.error('some error occured')
  });
}

itemDone(index) {
  const value = this.todos.listItems[index].text;
  this.todoService.doneItemToDoList(value)
  .subscribe((apiResponse) => {
    if (apiResponse.status === 200) {
      let data = {
        listItem: value,
        senderName: Cookie.get('receiverName'),
        listName: this.todos.name
      }
      this.socketService.doneListItem(data);
      this.toastr.success(apiResponse.message);
      this.getSingleToDoList();
    } else {
      this.toastr.error(apiResponse.message)
    }
  }, (err) => {
    this.toastr.error('some error occured')
  });
 
}
  

editList(index) {

  this.todos.listItems[index].edit = !this.todos.listItems[index].edit;
  if(this.todos.listItems[index].edit  === true) {
    return;
  }
  else{
    const oldValue= this.todos.listItems[index].text;
    const newValue = (<HTMLInputElement>document.getElementById("editText"+index)).value;
    console.log(newValue);
    console.log(oldValue);
    this.todoService.editListItem(oldValue, newValue)
    .subscribe((apiResponse) => {
      console.log(apiResponse)
      if (apiResponse.status === 200) {
        let data = {
          listItem: oldValue,
          newListItem: newValue,
          senderName: Cookie.get('receiverName'),
          listName: this.todos.name
        }
        this.socketService.editListItem(data);
       this.getSingleToDoList();
        this.toastr.success(apiResponse.message);  
      } else {
        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')
    });
  }
}

  deleteItem(index, listItem) {
    this.todoService.removeToDoList(listItem)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {

        this.toastr.success(apiResponse.message);
        let data = {
          listItem: listItem,
          senderName: Cookie.get('receiverName'),
          listName: this.todos.name
        }
        this.todos.listItems.splice(index, 1);
        this.socketService.deleteListItem(data);
      } else {
  
        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')
    });
   
  }

}