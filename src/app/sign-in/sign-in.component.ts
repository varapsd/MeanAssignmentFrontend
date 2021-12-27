import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ValidationsService } from '../validations.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authServer: AuthenticationService,private validationsService: ValidationsService, private router: Router, private formBuilder: FormBuilder) { }
  loginForm = this.formBuilder.group({
    email:"",
    password:""
  });
  invalidEmailMessage = "";
  invalidPasswordMessage = "";
  ngOnInit(): void {
    if(this.authServer.isLogged()){
      this.router.navigate(['/user']);
    }
  }

  validateEmail(){
    var result = this.validationsService.isValidEmail(this.loginForm.value.email);
    if(!result){
      this.invalidEmailMessage = "invalid email address"
    } else {
      this.invalidEmailMessage = "";
    }
    return result;
  }

  validatePassword(){
    var result = this.validationsService.isValidPassword(this.loginForm.value.password);
    if(!result){
      this.invalidPasswordMessage = "invalid Password";
    } else {
      this.invalidPasswordMessage = "";
    }
    return result;
  }
  login(){
    var validEmail = this.validateEmail();
    var validPassword = this.validatePassword();
    if(validEmail && validPassword){
      this.authServer.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data =>{
        if(data.isSuccess){
          localStorage.setItem("userId",data.data);
          this.router.navigate(['/user']);
        } else {
          alert(data.data)
        }
      });
    } 
    //this.validationsService.isValidEmail(this.loginForm.value.email);
    // var res = this.authServer.login("vara","prasad");
    // if(res){
    //   this.router.navigate(['/user']);
    // } else {
    //   alert('invalid credentials');
    // }
  }

}
