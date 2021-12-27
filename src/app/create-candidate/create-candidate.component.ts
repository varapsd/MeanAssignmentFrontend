import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ValidationsService } from '../validations.service';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})
export class CreateCandidateComponent implements OnInit {

  @Input() id! : String;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,private validationsService: ValidationsService, private router: Router, private route: ActivatedRoute) { }

  stateList = {
    1: "Andaman and Nicobar Islands",
    2: "Andhra Pradesh",
    3: "Arunachal Pradesh",
    4: "Assam",
    5: "Bihar",
    6: "Chandigarh",
    7: "Chhattisgarh",
    8: "Dadra and Nagar Haveli",
    9: "Daman and Diu",
    10: "Delhi",
    11: "Goa",
    12: "Gujarat",
    13: "Haryana",
    14: "Himachal Pradesh",
    15: "Jammu and Kashmir",
    16: "Jharkhand",
    17: "Karnataka",
    18: "Kerala",
    19: "Lakshadweep",
    20: "Madhya Pradesh",
    21: "Maharashtra",
    22: "Manipur",
    23: "Meghalaya",
    24: "Mizoram",
    25: "Nagaland",
    26: "Odisha",
    27: "Puducherry",
    28: "Punjab",
    29: "Rajasthan",
    30: "Sikkim",
    31: "Tamil Nadu",
    32: "Telangana",
    33: "Tripura",
    34: "Uttar Pradesh",
    35: "Uttarakhand",
    36: "West Bengal"
  }
  candidateForm = this.formBuilder.group({
    name:"",
    email:"",
    age : "",
    state: "",
    DOB : "",
    pincode:0
  })
  invalidNameMessage:any;
  invalidEmailMessage:any;
  invalidAgeMessage:any;
  invalidStateMessage:any;
  invalidDOBMessage:any;
  invalidPincodeMessage:any;
  age : any;
  routeCandidateId : any;
  isEdit:boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.routeCandidateId = params['id']);
    if(this.routeCandidateId){
      this.isEdit = true;
      this.getCandidateData();
    } else {
      this.isEdit = false;
    }
  }

  getCandidateData(){
    this.authService.getCandidate(this.routeCandidateId).subscribe( data=> {
      var year = (data.DOB.split(':')[0]).split("-")[0];
      var month = (data.DOB.split(":")[0].split("-"))[1];
      var day = (data.DOB.split(":")[0].split("-"))[2].substring(0,2);
      this.candidateForm.setValue({
        name: data.name,
        email: data.email,
        age: data.age,
        DOB : year+"-"+month+"-"+day,
        state : data.state.toString(),
        pincode: data.pincode
      })
    })
  }
  validateDOB(){
    var curYear = this.candidateForm.value.DOB.split("-")[0];
    if(!this.setAge(curYear)){
      this.invalidDOBMessage = "invalid DOB";
      return false;
    } else {
      this.invalidDOBMessage = "";
      return true
    }
  }
  setAge(year:number){
    var curAge = new Date().getFullYear() - year;
    if(curAge <= 0 || curAge > 100){
      this.age = "";
      this.invalidAgeMessage = "age must be between 1 - 100, auto update with date of birth";
      return false;
    } else {
      this.candidateForm.value.age = curAge;
      this.age = curAge;
      this.invalidAgeMessage = ""
      return true;
    }
  }

  validatePincode(){
    if(this.candidateForm.value.pincode && this.candidateForm.value.pincode.toString().length == 6){
      this.invalidPincodeMessage = ""
      return true;
    }
    else{
      this.invalidPincodeMessage = "6 digit pincode required"
      return false;
    }
  }

  validateName(){
    if(this.candidateForm.value.name.length >= 3 && this.candidateForm.value.name != ""){
      this.invalidNameMessage = ""
      return true;
    } else {
      this.invalidNameMessage = "name with minimum 3 characters required ";
      return false;
    }
  }

  
  validateState(){
    if(this.candidateForm.value.state == ""){
      this.invalidStateMessage = "select a state";
      return false;
    } else {
      this.invalidStateMessage = "";
      this.candidateForm.value.state = +this.candidateForm.value.state;
      return true;
    }
  }

  validateEmail(){
    var result = this.validationsService.isValidEmail(this.candidateForm.value.email);
    if(!result){
      this.invalidEmailMessage = "invalid email address"
    } else {
      this.invalidEmailMessage = "";
    }
    return result;
  }

  addCandidate(){
    var validName = this.validateName();
    var validAddress = this.validateEmail();
    var validDOB = this.validateDOB();
    var validateState = this.validateState();
    var validPincode = this.validatePincode();
    if( validName && validAddress && validDOB && validateState && validPincode){
      if(this.isEdit){
        var reqobj = this.candidateForm.value;
        reqobj._id = this.routeCandidateId;
        this.authService.updateCandidate(reqobj).subscribe( data =>{
          if(data.isSuccess){
            alert("Updated Successfully !!")
            this.router.navigate(['/user']);
          } else {
            alert(data.data);
          }
        })
      } else {
        this.authService.addCandidate(this.candidateForm.value).subscribe( data =>{
          console.log(data);
          if(data.status == 200){
            alert("Added Successfully !!") 
            this.router.navigate(['/user']);
          } else {
            alert(data.data);
          }
        })
      }
      
    }
  }

}
