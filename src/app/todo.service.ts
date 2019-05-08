import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url =  'http://localhost:3000/api/v1';
  private toDoList = [];
  constructor(private http : HttpClient) { }

  getToDoList() : Observable<any>{
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
  return this.http.get(`${this.url}/lists/view/all`, {params: params});
  }

  addToDoList(listItem) : Observable<any>{
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('listName', Cookie.get('listName'))
    .set('listItems', listItem)
  return this.http.post(`${this.url}/lists/addItem`, params);
  }

  getSingleToDoList(listName) : Observable<any>{
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('name', listName)
  return this.http.get(`${this.url}/lists/${listName}`, {params: params});
  }

  createList(listName) : Observable<any>{
    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'))
      .set('name', listName);
    console.log(params);
  return this.http.post(`${this.url}/lists/createList`, params);
  }


  addTitle(title: string) {
    this.toDoList.push({
      title: title,
      isChecked: false
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean) {
    //this.toDoList.update($key, { isChecked: flag });
  }

  removeTitle($key: string) {
   // this.toDoList.remove($key);
  }

}


