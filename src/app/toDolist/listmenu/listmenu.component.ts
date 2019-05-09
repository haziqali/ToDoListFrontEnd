import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'list-menu',
  templateUrl: './listmenu.component.html',
  styles: [],
  providers : [TodoService]
})
export class ListMenuComponent implements OnInit {
  
  newTodo: any[] = [];
  todos: any;
  todoObj: any;
  editable: boolean = false;

  constructor(private todoService: TodoService, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getSingleToDoList();
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
    if (apiResponse.status === 200) {
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
      this.getSingleToDoList();
    } else {

      this.toastr.error(apiResponse.message)
    }
  }, (err) => {
    this.toastr.error('some error occured')
  });
}


addtoList(value) {
  console.log(value);
   this.todoService.addToDoList(value)
   .subscribe((apiResponse) => {
    if (apiResponse.status === 200) {
      this.toastr.success(apiResponse.message)
      this.todos.listItems.push( {text:value, edit: false});
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
        console.log(apiResponse);
        this.toastr.success(apiResponse.message);
        this.todos.listItems.splice(index, 1);
      } else {
  
        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')
    });
   
  }

}