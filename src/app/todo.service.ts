import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url =  'http://apidailytaskexecutor.tk/api/v1';
  private userInfo: any;
  private result: any;

  constructor(private http : HttpClient) {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let result = this.userInfo.friends.map(a => a.email);
    result.push(this.userInfo.email);
    localStorage.setItem("listAcessUsers", JSON.stringify(result));

  }

  

  getToDoList() : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('users', JSON.stringify(this.result));
 
  return this.http.post(`${this.url}/lists/view/all`,  params);
  }

  addToDoList(listItem) : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('listName', Cookie.get('listName'))
    .set('listItems',listItem)
    .set('user', this.userInfo.email );
  return this.http.post(`${this.url}/lists/addItem`, params);
  }

  removeToDoList(listItem) : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('listName', Cookie.get('listName'))
    .set('listItems', listItem)
    .set('user', this.userInfo.email );
  return this.http.post(`${this.url}/lists/deleteItem`, params);
  }

  doneItemToDoList(listItem) : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('listName', Cookie.get('listName'))
    .set('listItems', listItem)
    .set('user', this.userInfo.email );
  return this.http.post(`${this.url}/lists/doneItem`, params);
  }

  clearAll() : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('listName', Cookie.get('listName'))
    .set('user', this.userInfo.email );
  return this.http.post(`${this.url}/lists/clearAll`, params);
  }

  clearDoneItems() : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('listName', Cookie.get('listName'))
    .set('user', this.userInfo.email );
  return this.http.post(`${this.url}/lists/clearDoneItems`, params);
  }

  clearActiveItems() : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('listName', Cookie.get('listName'))
    .set('user', this.userInfo.email );
  return this.http.post(`${this.url}/lists/clearActiveItems`, params);
  }

  editListItem(oldValue, newValue) : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('name', Cookie.get('listName'))
    .set('oldValue', oldValue)
    .set('newValue', newValue)
    .set('user', this.userInfo.email );
  return this.http.post(`${this.url}/lists/editItem`, params);
  }

  getSingleToDoList(listName) : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))
    .set('name', listName)
    .set('users', JSON.stringify(this.result) )
  return this.http.post(`${this.url}/lists/${listName}`, params);
  }

  createList(listName) : Observable<any>{
    this.result = JSON.parse(localStorage.getItem("listAcessUsers"));
    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'))
      .set('name', listName)
      .set('users', JSON.stringify(this.result));
  return this.http.post(`${this.url}/lists/createList`, params);
  } 

}


