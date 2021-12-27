import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ValidationsService } from '../validations.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss']
})
export class UserHomePageComponent implements OnInit {

  candidateCount : number = 0;
  userId : any = 0;
  candidatesList :any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLogged()){
      this.userId = this.authService.getUserId();
    } else {
      this.router.navigate(['/']);
    }
    
    this.authService.getCandidatesById().subscribe(data =>{
      this.candidatesList = data;
      this.candidateCount = this.candidatesList.length;
    })
  }

  convertToDate(date:string){
    var year = (date.split(':')[0]).split("-")[0];
    var month = (date.split(":")[0].split("-"))[1];
    var day = (date.split(":")[0].split("-"))[2].substring(0,2);
    return day+"/"+month+"/"+year;
  }

  removeCandidate(id:any){
    this.authService.deleteCandidate(id).subscribe( data =>{
      if(data.isSuccess){
        alert(data.message);
        this.ngOnInit();
      } else {
        alert(data.message);
        this.ngOnInit();
      }
    })
  }

  editCandidate(id:any){
    this.router.navigate(['/editCandidate',id])
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
