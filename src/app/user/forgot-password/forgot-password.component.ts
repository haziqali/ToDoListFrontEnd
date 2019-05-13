import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email : String;

  constructor(private toastr: ToastrService, private appService: AppService) { }

  ngOnInit() {
  }


  public sendMail: any = () => {
    if(!this.email) {
      this.toastr.warning("Please enter a valid email");
    }
    else {
    let data = {
      email: this.email
    }
    this.appService.forgotPassword(data)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success(apiResponse.message);
      } else {
        this.toastr.error(apiResponse.message);
      }
    }, (err) => {
      this.toastr.error('some error occured');
    });
    } // end condition
  }
} 
