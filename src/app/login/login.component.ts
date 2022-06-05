import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router:Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  
  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.router.navigate(['request',this.isLoggedIn])
        //this.roles = this.tokenStorage.getUser().roles;
        
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
 confirmationLogic():void{
  // public String processReturnRequest(ReturnRequestPayload returnRequestPayload, HttpSession session) {
  //   try {
  //       log.info(returnRequestPayload.toString());
  //       AuthResponsePayload authResponse = portalService.checkTokenInSession(session);
  //       returnResponsePayload = returnFeignClient.createReturnRequest(authResponse.getToken(), returnRequestPayload);
  //       return "redirect:/confirmation";
  //   } catch (Exception e) {
  //       log.error(e.getMessage());
  //       return "redirect:/?retry=true";
  //   }
  
 }
  reloadPage(): void {
    window.location.reload();
  }

}
