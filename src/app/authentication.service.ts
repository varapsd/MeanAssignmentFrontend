import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = "http://localhost:8080/";
  constructor(private httpClient: HttpClient) { }
  login(email:any, password:any){
    return this.httpClient.post<any>(this.apiUrl+"signIn",{email:email, password:password});
  };

  signup(email:any, phone:number, password:any){
    return this.httpClient.post<any>(this.apiUrl+"signUP",{email:email, password:password, phone:phone});
  }

  getCandidatesById(){
    var userId = this.getUserId();
    return this.httpClient.get<any>(this.apiUrl+"users/"+userId);
  }

  addCandidate(req:any){
    var userId = this.getUserId();
    var reqObj = {
      id: userId,
      name: req.name,
      email: req.email,
      DOB: req.DOB,
      state: req.state,
      age: req.age,
      pincode: req.pincode,
    }
    return this.httpClient.post<any>(this.apiUrl+"addUser",reqObj);
  }

  updateCandidate(req:any){
    var reqObj = {
      _id : req._id,
      name: req.name,
      email: req.email,
      DOB: req.DOB,
      state: req.state,
      age: req.age,
      pincode: req.pincode,
    }
    return this.httpClient.post<any>(this.apiUrl+"updateCandidate",reqObj);
  }
  getCandidate(id:any){
    return this.httpClient.get<any>(this.apiUrl+"getCandidate/"+id);
  }
  deleteCandidate(id:any){
    var reqObj = {
      id: id
    }
    return this.httpClient.post<any>(this.apiUrl+"deleteCandidate",reqObj);
  }
  getUserId(){
    return localStorage.getItem("userId");
  }

  isLogged(){
    if (localStorage.getItem("userId")) {
      return true
    } else {
      return false
    }
  }
  logout(){
    localStorage.removeItem("userId");
  }
}
