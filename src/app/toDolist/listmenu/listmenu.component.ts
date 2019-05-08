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
  
   

  ngOnInit(): void {
    this.todos =  this.todoService.getSingleToDoList(this.route.snapshot.params["listName"])
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.todos = apiResponse.data;
        console.log(this.todos);
        Cookie.set("listName", this.todos.name);
      } else {

        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')
    });
}

  newTodo: any[] = [];
    todos: any;
    todoObj: any;
    editable: boolean = false;

  constructor(private todoService: TodoService, private route: ActivatedRoute, private toastr: ToastrService) {
} // end condition

  

addtoList(value) {
  console.log(value);
   this.todoService.addToDoList(value)
   .subscribe((apiResponse) => {
    if (apiResponse.status === 200) {
      this.toastr.success(apiResponse.message)
      this.todos.listItems.push({text: value});
    } else {

      this.toastr.error(apiResponse.message)
    }
  }, (err) => {
    this.toastr.error('some error occured')
  });
}

itemDone(index) {
  const value = this.todos.listItems[index].text;
    var lists = this.todos.listItems.filter(x => {
      return x.text == value;
    });
    this.newTodo.push(lists);
    this.deleteItem(index);
 
}

editList(index) {

  this.editable = !this.editable;
  if(this.editable == true) {
    return;
  }
  else{
    this.todos.listItems[index].text = (<HTMLInputElement>document.getElementById("editText"+index)).value;
  }
}

  deleteItem(index) {
    console.log(index);
    this.todos.listItems.splice(index, 1);
  }

}