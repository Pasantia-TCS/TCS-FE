import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    lastname: ['', [Validators.required, , Validators.maxLength(30)]],
    phone: ['', [Validators.required], Validators.minLength(10), Validators.maxLength(10)],
    email: ['', [Validators.required], Validators.email],
    ultimatix: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.myForm.value);
    console.log(this.myForm.valid);

    this.router.navigateByUrl('/pages/selection');
  }
}
