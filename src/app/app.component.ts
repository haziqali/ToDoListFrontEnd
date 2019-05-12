import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {

 
  title = 'app';
  public showHead: any;

  constructor(
    
    public router: Router,
    private appService: AppService,
    )  {
      // on route change to '/login', set the variable showHead to false
        router.events.forEach((event) => {
          if (event instanceof NavigationStart) {
            if (event['url'] === '/sign-up' || event['url'] ==="/login" || event['url'] ==="/") {
              this.showHead = false;
            } else {
              this.showHead = true;
            }
          }
        });
      }

  ngOnInit(): void {
  }
  

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);
  }
}
