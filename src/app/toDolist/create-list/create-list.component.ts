import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  public todos: any;

  constructor(private toDoService : TodoService,
              private toastr: ToastrService   
    ) { }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.toDoService.getToDoList()
    .subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        console.log(apiResponse)
        this.todos = apiResponse.data;
      } 

    }, (err) => {
      this.toastr.error('some error occured')

    });

} // end condition

createList(newListName): void {
  console.log(newListName);
  this.toDoService.createList(newListName)
  .subscribe((apiResponse) => {

    if (apiResponse.status === 200) {
      this.toastr.success(apiResponse.message);
      this.getList();
      
    } else {
      this.toastr.error(apiResponse.message)
    }

  }, (err) => {
    this.toastr.error('some error occured')

  });

} 

}
  

