import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Profile } from '../../interfaces/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styles: []
})
export class EditSkillsComponent implements OnInit {

  profile!: Profile;
  tempSkillsList: string[] = [];
  tempKnowledgeLevelList: string[] = [];
  skillsList: string[] = [];
  knowledgeLevelList: string[] = ['Alto', 'Medio', 'Bajo'];
  savedSkills: boolean = true;

  skillsForm: FormGroup = this.fb.group({
    skills: ['Java', Validators.required],
    levels: [this.knowledgeLevelList[0], Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Profile,
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<EditSkillsComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Load skills list
    this.profileService.getSkills()
      .subscribe({
        next: skills => skills.forEach(element => this.skillsList.push(element.nombre))
      });

    this.profile = this.data;
    this.tempSkillsList = [...this.profile.habilidades!];
    this.tempKnowledgeLevelList = [...this.profile.nivel_habilidad!]
  }

  get level() {
    return this.skillsForm.get('levels');
  }

  get skill() {
    return this.skillsForm.get('skills');
  }

  addSkill() {
    if (this.skillsForm.value.skills === "") {
      Swal.fire('¡Advertencia!', 'Por favor seleccione una habilidad.', 'warning');
    } else if (this.tempSkillsList.includes(this.skillsForm.value.skills)) {
      Swal.fire('¡Advertencia!', 'Por favor seleccione una habilidad diferente.', 'warning');
    } else if (this.skillsForm.value.levels === "") {
      Swal.fire('¡Advertencia!', 'Por favor seleccione un nivel de conocimiento.', 'warning');
    } else {
      this.tempSkillsList.push(this.skillsForm.value.skills);
      this.tempKnowledgeLevelList.push(this.skillsForm.value.levels);
      this.savedSkills = false;
    }
  }

  deleteSkill(index: number) {
    this.tempSkillsList.splice(index, 1);
    this.tempKnowledgeLevelList.splice(index, 1);
    this.savedSkills = false;
  }

  updateSkills() {
    if (this.skillsForm.invalid) {
      this.skillsForm.markAllAsTouched();
    } else {
      this.profileService
        .updateMySkills(this.profile.id_ultimatix?.toString()!, this.tempSkillsList, this.tempKnowledgeLevelList)
        .subscribe(
          {
            next: () => {
              this.profile.habilidades = [...this.tempSkillsList];
              this.profile.nivel_habilidad = [...this.tempKnowledgeLevelList];
              this.dialogRef.close();
              Swal.fire('¡Éxito!', 'Habilidades técnicas registradas con éxito.', 'success');
            }
          }
        )
      this.savedSkills = true;
    }
  }

  exit() {
    this.dialogRef.close();
  }

}
