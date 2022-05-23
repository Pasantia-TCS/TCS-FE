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
    usuario_red: '',
    asignacion_usuario: 0,
    nombres_completos: ''
  };

  savedSkills: boolean = true;
  savedAboutMe: boolean = true;


  // Skills
  skillsList: string[] = [];
  tempSkillsList: string[] = [];

  userInfoForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern('')]],
      phone: ['', [Validators.required, Validators.pattern('')]],
      netuser: ['', [Validators.required]]
    }
  );

  aboutMeForm: FormGroup = this.fb.group(
    {
      aboutMe: ['', Validators.required]
    }
  );

  skillsForm: FormGroup = this.fb.group(
    {
      skills: ['', Validators.required]
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

  addSkill() {
    if (this.skillsForm.value.skills === "") {
      Swal.fire('¡Advertencia!', 'Por favor seleccione una habilidad', 'warning');
    } else if (this.tempSkillsList.includes(this.skillsForm.value.skills)) {
      Swal.fire('¡Advertencia!', 'Por favor seleccione una habilidad diferente', 'warning');
    } else {
      this.tempSkillsList.push(this.skillsForm.value.skills);
      this.savedSkills = false;
    }
  }

  deleteSkill(index: number) {
    this.tempSkillsList.splice(index, 1);
    this.savedSkills = false;
  }

  loadSkills() {
    this.profileService.updateMySkills(this.ultimatix, this.tempSkillsList)
      .subscribe(
        {
          next: () => this.profile.habilidades = [...this.tempSkillsList]
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
