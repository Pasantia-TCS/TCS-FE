import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Profile } from '../../interfaces/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ultimatix: string = '';

  currentUser: User = {
    id_numero_Ultimatix: '',
    clave: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    rol: ''
  };

  profile: Profile = {
    id_ultimatix: 0,
    sobreMi: '',
    habilidades: [],
    nivel_habilidad: [],
    usuario_red: '',
    asignacion_usuario: 0,
    nombres_completos: ''
  };

  savedSkills: boolean = true;
  savedAboutMe: boolean = true;

  // Skills
  skillsList: string[] = [];
  tempSkillsList: string[] = [];

  knowledgeLevelList: string[] = ['Alto', 'Medio', 'Bajo'];
  tempKnowledgeLevelList: string[] = [];

  userInfoForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern(''), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('')]],
      netuser: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^@.*')]]
    }
  );

  aboutMeForm: FormGroup = this.fb.group(
    {
      aboutMe: ['', Validators.required]
    }
  );

  skillsForm: FormGroup = this.fb.group(
    {
      skills: ['', Validators.required],
      levels: ['', Validators.required]
    }
  );

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Load ultimatix
    this.ultimatix = this.userService.getUltimatix()!;
    this.currentUser = this.userService.getUserData();

    // Load profile info
    this.profileService.getProfile(this.ultimatix)
      .subscribe(
        {
          next: resp => {
            this.profile = resp;
            this.tempSkillsList = [...this.profile.habilidades];
            this.tempKnowledgeLevelList = [...this.profile.nivel_habilidad]
          }
        }
      );

    // Load skills list
    this.profileService.getSkills()
      .subscribe(
        {
          next: skills => skills.forEach((element) => this.skillsList.push(element.nombre))
        }
      );
  }

  get phone() {
    return this.userInfoForm.get('phone');
  }

  get email() {
    return this.userInfoForm.get('email');
  }

  get netuser() {
    return this.userInfoForm.get('netuser');
  }

  addSkill() {
    if (this.skillsForm.value.skills === "") {
      Swal.fire('¡Advertencia!', 'Por favor seleccione una habilidad', 'warning');
    } else if (this.tempSkillsList.includes(this.skillsForm.value.skills)) {
      Swal.fire('¡Advertencia!', 'Por favor seleccione una habilidad diferente', 'warning');
    } else if (this.skillsForm.value.levels === "") {
      Swal.fire('¡Advertencia!', 'Por favor seleccione un nivel de conocimiento', 'warning');
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

  loadSkills() {
    this.profileService.updateMySkills(this.ultimatix, this.tempSkillsList, this.tempKnowledgeLevelList)
      .subscribe(
        {
          next: () => {
            this.profile.habilidades = [...this.tempSkillsList];
            this.profile.nivel_habilidad = [...this.tempKnowledgeLevelList];
            Swal.fire('¡Éxito!', 'Habilidad ingresada con éxito.', 'info');
          }
        }
      )
    this.savedSkills = true;
  }

  loadAboutMe() {
    this.profile.sobreMi = this.aboutMeForm.value.aboutMe;
    this.profileService.updateAboutMe(this.ultimatix, this.profile.sobreMi)
      .subscribe(
        {
          next: resp => {
            this.profile.sobreMi = resp.sobreMi;
            Swal.fire('¡Éxito!', 'La información se ha actualizado con éxito.', 'success');
          }
        }
      );
  }

  loadUserInfo() {
    this.userInfoForm.patchValue(
      {
        email: this.currentUser.correo,
        phone: this.currentUser.telefono
      }
    );
  }

  updateUserInfo() {
    if (this.userInfoForm.invalid) {
      this.userInfoForm.markAllAsTouched();
    } else {
      const { email, phone, netuser } = this.userInfoForm.value;
      this.userService.updateUserProfile(this.ultimatix, phone, email)
        .subscribe(
          {
            next: resp => {
              this.currentUser = { ...resp };
              Swal.fire('¡Éxito!', 'La información de usuario se ha actualizado con éxito.', 'success');
            }
          }
        );

      this.userService.updateNetuser(this.ultimatix, netuser)
        .subscribe(
          {
            next: resp => this.profile.usuario_red = resp.usuario_red
          }
        );
    }
  }

}
