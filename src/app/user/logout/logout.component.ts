import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.removeUserInfoFromLocalstorage();
    this.appService.logout();
  }

}
