import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/ui-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseUrlApi = "https://localhost:7257/api"

  constructor(private httpClient: HttpClient) { }

  getGenderList():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseUrlApi + "/Gender")
  }
}
