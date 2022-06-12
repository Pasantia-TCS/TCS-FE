import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Profile } from '../../interfaces/profile';
import { ProfileService } from '../../services/profile.service';
import { EditFuncSkillsComponent } from '../edit-func-skills/edit-func-skills.component';

@Component({
  selector: 'app-edit-apps',
  templateUrl: './edit-apps.component.html',
  styles: []
})
export class EditAppsComponent implements OnInit {

  profile!: Profile;
  tempSkillsList: string[] = [];
  tempKnowledgeLevelList: string[] = [];
  skillsList: string[] = [];
  knowledgeLevelList: string[] = ['Alto', 'Medio', 'Bajo'];
  savedSkills: boolean = true;

  appsForm: FormGroup = this.fb.group({
    skills: ['Spring Tools', Validators.required],
    levels: [this.knowledgeLevelList[0], Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Profile,
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<EditFuncSkillsComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profileService.getApps()
      .subscribe({
        next: skills => skills.forEach(element => this.skillsList.push(element.nombre))
      });

    this.profile = this.data;
    this.tempSkillsList = [...this.profile.aplicaciones!];
    this.tempKnowledgeLevelList = [...this.profile.nivel_aplicaciones!];
  }

  get level() {
    return this.appsForm.get('levels');
  }

  get skill() {
    return this.appsForm.get('skills');
  }

  addSkill() {
    if (this.appsForm.value.skills === "") {
      Swal.fire('¡Advertencia!', 'Por favor selecciona una aplicación.', 'warning');
    } else if (this.tempSkillsList.includes(this.appsForm.value.skills)) {
      Swal.fire('¡Advertencia!', 'Por favor selecciona una aplicación diferente.', 'warning');
    } else if (this.appsForm.value.levels === "") {
      Swal.fire('¡Advertencia!', 'Por favor selecciona un nivel de conocimiento.', 'warning');
    } else {
      this.tempSkillsList.push(this.appsForm.value.skills);
      this.tempKnowledgeLevelList.push(this.appsForm.value.levels);
      this.savedSkills = false;
    }
  }

  deleteSkill(index: number) {
    this.tempSkillsList.splice(index, 1);
    this.tempKnowledgeLevelList.splice(index, 1);
    this.savedSkills = false;
  }

  updateSkills() {
    if (this.appsForm.invalid) {
      this.appsForm.markAllAsTouched();
    } else {
      this.profileService
        .updateMyApps(this.profile.id_ultimatix?.toString()!, this.tempSkillsList, this.tempKnowledgeLevelList)
        .subscribe({
          next: () => {
            this.profile.aplicaciones = [...this.tempSkillsList];
            this.profile.nivel_aplicaciones = [...this.tempKnowledgeLevelList];
            this.dialogRef.close();
            Swal.fire('¡Éxito!', 'Aplicaciones registradas con éxito.', 'success');
          }
        });
      this.savedSkills = true;
    }
  }

  exit() {
    this.dialogRef.close();
  }

}
