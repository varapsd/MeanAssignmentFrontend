import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ValidationsService } from '../validations.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthenticationService,private validationsService: ValidationsService, private router: Router, private formBuilder: FormBuilder) { }
  
  signupForm = this.formBuilder.group({
    email:"",
    password:"",
    phone:""
  })
  invalidEmailMessage:any = "";
  invalidPhoneMessage:any = "";
  invalidPasswordMessage:any = "";
  ngOnInit(): void {
    if(this.authService.isLogged()){
      this.router.navigate(['/user']);
    }
  }

  validateEmail(){
    var result = this.validationsService.isValidEmail(this.signupForm.value.email);
    if(!result){
      this.invalidEmailMessage = "invalid email address"
    } else {
      this.invalidEmailMessage = "";
    }
    return result;
  }

  validatePassword(){
    var result = this.validationsService.isValidPassword(this.signupForm.value.password);
    if(!result){
      this.invalidPasswordMessage = "invalid Password";
    } else {
      this.invalidPasswordMessage = "";
    }
    return result;
  }

  validatePhone(){
    var result = this.validationsService.isValidPhone(this.signupForm.value.phone);
    if(!result){
      this.invalidPhoneMessage = "10 digit phone number"
    } else {
      this.invalidPhoneMessage = "";
    }
    return result;
  }
  signup(){
    var validEmail = this.validateEmail();
    var validPhone = this.validatePhone();
    var validPassword = this.validatePassword();
    if( validEmail && validPhone && validPassword){
      this.authService.signup(this.signupForm.value.email, this.signupForm.value.phone, this.signupForm.value.password).subscribe( data =>{
        if(data.isSuccess){
          alert(data.message)
          this.router.navigate(['/']);
        } else {
          alert(data.message);
        }
      })
    }
  }
}
