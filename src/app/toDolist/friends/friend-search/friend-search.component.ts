import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/user/user.model';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-friend-search',
  templateUrl: './friend-search.component.html',
  styleUrls: ['./friend-search.component.css']
})
export class FriendSearchComponent implements OnInit {

  @Output() userSelected: EventEmitter<String> = new EventEmitter<String>();
  
  friends$: Observable<User[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private appService: AppService) {}
 

  ngOnInit() {
    this.initFriends();
  }

  search(term: string): void{
    this.searchTerms.next(term);
  }
  getUser(email){
    this.userSelected.emit(email);
    this.clearSearch();

  }
 
  initFriends() {
    this.friends$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.appService.searchFriends(term)),
    );
  }

  

  clearSearch() {
    this.initFriends();
  }
}