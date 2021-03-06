import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  ngOnInit() {
  }

  public password : String;
  public confirmPassword : String;


  constructor(private activatedRoute : ActivatedRoute, 
              private router: Router,
              private appService : AppService,
              private toastr: ToastrService ) { }


  public resetPassword: any = () => {
    if(!this.password || !this.confirmPassword) {
      this.toastr.warning("Please enter password in both the fields")
    }
    else if(this.password !== this.confirmPassword) {
      this.toastr.warning("Passwords in both the fields should match");
    }
    else if(this.password.length < 6 || this.confirmPassword.length < 6) {
      this.toastr.warning("Passwords should be of minimum length of 6");
    }
    else {
    let data = {
      password: this.password,
      confirmPassword: this.confirmPassword,
      token: this.activatedRoute.snapshot.params["token"]
    }

    this.appService.resetPassword(data)
    .subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        this.toastr.success(apiResponse.message);
        this.router.navigate(['/login']);


      } else {

        this.toastr.error(apiResponse.message);
      

      }

    }, (err) => {
      this.toastr.error('some error occured');

    });

    } // end condition
  }
} 

