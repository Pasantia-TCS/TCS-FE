import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    ultimatix: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  valid_field(field_name: string) {
    return this.myForm.controls[field_name].errors && this.myForm.controls[field_name].touched;
  }

  login() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else {
      // out: {ultimatix: '', password: ''}
      console.log(this.myForm.value);
      console.log(this.myForm.valid);
      this.router.navigateByUrl('/pages/selection');
      this.myForm.reset();
    }
  }

}
