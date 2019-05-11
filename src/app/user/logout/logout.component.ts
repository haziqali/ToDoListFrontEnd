import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private appService: AppService, private toastr: ToastrService, private socketService: SocketService) { }

  ngOnInit() {
    localStorage.clear();
    this.appService.logout()
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        console.log(apiResponse)
        
          Cookie.deleteAll();
          Cookie.delete('io');
          this.socketService.exitSocket()
        
      

      } else {
        this.toastr.error(apiResponse.message)
      
      }

    }, (err) => {
      this.toastr.error('some error occured')

    });
  }

}
