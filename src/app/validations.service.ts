import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }
  isValidEmail(email:string): boolean{
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  isValidPassword(password:string): boolean{
    let regex = /^[a-zA-Z0-9]{8}/;
    return regex.test(password);
  }

  isValidPhone(phone:any): boolean{
    if(phone && phone.toString().length == 10){
      return true;
    } else {
      return false;
    }
  }

  
}
