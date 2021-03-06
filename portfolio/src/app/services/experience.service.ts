import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Experience } from '../Experience';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiUrl =
    'https://portfolio-adrianfernandezfazio.herokuapp.com/api/person';

  constructor(private http: HttpClient) {}

  getAllExperiences() {
    return this.http.get(this.apiUrl + '/1/experiences');
  }

  updateExperience(experience: Experience): Observable<any> {
    return this.http.put(
      this.apiUrl + '/experiences/' + experience.id,
      experience
    );
  }

  createExperience(experience: Experience): Observable<any> {
    return this.http.post(this.apiUrl + '/1/experiences', experience);
  }

  deleteExperience(experienceId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/experiences/' + experienceId);
  }
}
