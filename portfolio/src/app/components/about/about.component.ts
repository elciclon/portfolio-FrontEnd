import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/Person';
import { AboutService } from 'src/app/services/about.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  persons: any;
  isLogged = false;
  formAbout: FormGroup;

  constructor(
    private aboutService: AboutService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.formAbout = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      location: ['', [Validators.required]],
      job: ['', [Validators.required]],
      aboutMe: ['', [Validators.required]],
      profileImage: [
        '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else this.isLogged = false;
    this.aboutService.getPerson().subscribe((personFromApi: any) => {
      this.persons = personFromApi;
    });
  }

  saveAboutMe() {
    if (this.formAbout.valid) {
      this.formAbout.reset();
      document.getElementById('closeAboutMeModal')?.click();
    } else {
      alert('Hay errores!');
      this.formAbout.markAllAsTouched();
    }
  }

  getAboutMe() {
    this.formAbout.get('fullName')?.setValue(this.persons.fullName);
    this.formAbout.get('location')?.setValue(this.persons.location);
    this.formAbout.get('job')?.setValue(this.persons.job);
    this.formAbout.get('aboutMe')?.setValue(this.persons.aboutMe);
    this.formAbout.get('profileImage')?.setValue(this.persons.profileImage);
  }

  updateAboutMe() {
    if (this.formAbout.valid) {
      let fullName = this.formAbout.controls['fullName'].value;
      let location = this.formAbout.controls['location'].value;
      let job = this.formAbout.controls['job'].value;
      let aboutMe = this.formAbout.controls['aboutMe'].value;
      let profileImage = this.formAbout.controls['profileImage'].value;
      let personAboutMe = new Person(
        fullName,
        '',
        '',
        '',
        aboutMe,
        job,
        '',
        profileImage,
        location
      );
      this.aboutService.updatePerson(personAboutMe).subscribe(
        (data) => {
          this.persons = personAboutMe;
          this.formAbout.reset();
          document.getElementById('closeAboutMeModal')?.click();
        },
        (error) => {
          alert('Error al actualizar');
        }
      );
    }
  }

  get fullName() {
    return this.formAbout.get('fullName');
  }

  get location() {
    return this.formAbout.get('location');
  }

  get job() {
    return this.formAbout.get('job');
  }

  get aboutMe() {
    return this.formAbout.get('aboutMe');
  }

  get profileImage() {
    return this.formAbout.get('profileImage');
  }
}
