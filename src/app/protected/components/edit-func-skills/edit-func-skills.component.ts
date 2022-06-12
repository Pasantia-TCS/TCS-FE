import { Component, Inject, OnInit } from '@angular/core';
import { Profile } from "../../interfaces/profile";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProfileService } from "../../services/profile.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-func-skills',
  templateUrl: './edit-func-skills.component.html',
  styles: []
})
export class EditFuncSkillsComponent implements OnInit {

  profile!: Profile;
  tempSkillsList: string[] = [];
  tempKnowledgeLevelList: string[] = [];
  skillsList: string[] = [];
  knowledgeLevelList: string[] = ['Alto', 'Medio', 'Bajo'];
  savedSkills: boolean = true;

  funcSkillsForm: FormGroup = this.fb.group({
    skills: ['Cartera', Validators.required],
    levels: [this.knowledgeLevelList[0], Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Profile,
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<EditFuncSkillsComponent>,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.profileService.getFuncSkills()
      .subscribe({
        next: skills => skills.forEach(element => this.skillsList.push(element.nombre))
      });

    this.profile = this.data;
    this.tempSkillsList = [...this.profile.habilidades_funcionales!];
    this.tempKnowledgeLevelList = [...this.profile.nivel_habilidad_funcional!];
  }

  get level() {
    return this.funcSkillsForm.get('levels');
  }

  get skill() {
    return this.funcSkillsForm.get('skills');
  }

  addSkill() {
    if (this.funcSkillsForm.value.skills === "") {
      Swal.fire('¡Advertencia!', 'Por favor selecciona una habilidad funcional.', 'warning');
    } else if (this.tempSkillsList.includes(this.funcSkillsForm.value.skills)) {
      Swal.fire('¡Advertencia!', 'Por favor selecciona una habilidad funcional diferente.', 'warning');
    } else if (this.funcSkillsForm.value.levels === "") {
      Swal.fire('¡Advertencia!', 'Por favor selecciona un nivel de conocimiento.', 'warning');
    } else {
      this.tempSkillsList.push(this.funcSkillsForm.value.skills);
      this.tempKnowledgeLevelList.push(this.funcSkillsForm.value.levels);
      this.savedSkills = false;
    }
  }

  deleteSkill(index: number) {
    this.tempSkillsList.splice(index, 1);
    this.tempKnowledgeLevelList.splice(index, 1);
    this.savedSkills = false;
  }

  updateSkills() {
    if (this.funcSkillsForm.invalid) {
      this.funcSkillsForm.markAllAsTouched();
    } else {
      this.profileService
        .updateMyFuncSkills(this.profile.id_ultimatix?.toString()!, this.tempSkillsList, this.tempKnowledgeLevelList)
        .subscribe({
          next: () => {
            this.profile.habilidades_funcionales = [...this.tempSkillsList];
            this.profile.nivel_habilidad_funcional = [...this.tempKnowledgeLevelList];
            this.dialogRef.close();
            Swal.fire('¡Éxito!', 'Habilidades funcionales registradas con éxito.', 'success');
          }
        });
      this.savedSkills = true;
    }
  }

  exit() {
    this.dialogRef.close();
  }

}
