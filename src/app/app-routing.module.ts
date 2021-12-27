import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';

const routes: Routes = [
  { path: '', component:SignInComponent},
  { path: "signup", component:SignUpComponent},
  { path: "user", component:UserHomePageComponent},
  { path: "createCandidate", component: CreateCandidateComponent},
  { path: "editCandidate/:id", component: CreateCandidateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
