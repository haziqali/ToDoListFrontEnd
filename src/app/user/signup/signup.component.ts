import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as countryJson from 'src/assets/country.json';
import * as phoneJson from 'src/assets/phone.json';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public countries: any;
  public phones: any
  public countrySelectedCode: any
  public countrySelected: any

  constructor(  
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
   ) {
     }

  ngOnInit() {
  
    this.countries = countryJson["default"];
    let mapped = Object.keys(this.countries).map(key => ({code: key, country: this.countries[key]}));
    this.countries = mapped;
    this.phones = phoneJson["default"];
    let mapped1 = Object.keys( this.phones).map(key => ({code: key, phone:  this.phones[key]}));
    this.phones = mapped1;
  }

  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn

  onChange(countryCode) { 
    let found = this.phones.find(element => element.code === countryCode);
    this.countrySelectedCode = "+"+found.phone;
}

  public signupFunction: any = () => {
    if (!this.firstName) {
      this.toastr.warning('enter first name')
     

    } else if (!this.lastName) {
      this.toastr.warning('enter last name')

    } else if (!this.mobile) {
      this.toastr.warning('enter mobile')

    } else if (!this.email) {
      this.toastr.warning('enter email')

    } else if (!this.password) {
      this.toastr.warning('enter password')

    } else {

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.countrySelectedCode + this.mobile ,
        email: this.email,
        password: this.password,
      }

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Signup successful');

            setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('some error occured');

        });

    } // end condition

  } // end signupFunction

}
