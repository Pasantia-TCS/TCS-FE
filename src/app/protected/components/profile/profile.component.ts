import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  ultimatix: string = '4444444';

  // Personal info

  // About me
  aboutMe: string = '';

  // Skills
  skillsList: string[] = [];
  mySkillsList: string[] = [];
  tempSkillsList: string[] = [];

  skillsForm: FormGroup = this.fb.group({
    skills: ['', Validators.required]
  });


  constructor(private fb: FormBuilder, private activosService: ActivosService) {
    this.getSkillsList();
    this.getMySkills();
  }

  getSkillsList() {
    // this.activosService.getSkills().subscribe({
    //   next: resp => this.skillsList = resp
    // });
    this.skillsList = ['Python', 'Java', 'Angular', 'HTML', 'CSS3'];
  }

  getMySkills() {
    // this.activosService.getMySkills(this.ultimatix).subscribe({
    //   next: resp => this.mySkillsList = resp
    // })
    this.mySkillsList = ['Python'];
    this.tempSkillsList = [...this.mySkillsList];
  }

  addSkill() {
    if (this.skillsForm.value.skills === "") {
      Swal.fire('¡Advertencia!', 'Por favor seleccione una habilidad', 'warning');
      return;
    } else if (this.tempSkillsList.includes(this.skillsForm.value.skills)) {
      Swal.fire('¡Advertencia!', 'Por favor seleccione una habilidad diferente', 'warning');
      return;
    } else {
      this.tempSkillsList.push(this.skillsForm.value.skills);
      console.log(this.tempSkillsList);
    }
  }

  deleteSkill(index: number) {
    this.tempSkillsList.splice(index, 1);
  }

  updateSkills() {
    this.mySkillsList = [...this.tempSkillsList];
  }

  updateAboutMe() {

  }

}
