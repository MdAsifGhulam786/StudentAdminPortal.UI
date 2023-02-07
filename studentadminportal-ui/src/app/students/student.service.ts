import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentRequest } from '../models/api-models/student-request-add.model';
import { UpdateStudentRequest } from '../models/api-models/student-request-update.model';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrlApi = environment.baseUrlApi;

  constructor(private httpClient : HttpClient) { }

  getStudents():Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseUrlApi + "/student")
  };

  getStudent(studentId:string):Observable<Student>{
    return this.httpClient.get<Student>(this.baseUrlApi + "/student/" + studentId)
  };

  updateStudent(studentId:String,studentRequest:Student):Observable<Student>{
    const updateStudentRequest: UpdateStudentRequest = {
      firstName : studentRequest.firstName,
      lastName : studentRequest.lastName,
      dateOfBirth : studentRequest.dateOfBirth,
      email : studentRequest.email,
      mobile : studentRequest.mobile,
      genderId : studentRequest.genderId,
      physicalAddress : studentRequest.address.physicalAddress,
      postalAddress : studentRequest.address.postalAddress,
    }

    return this.httpClient.put<Student>(this.baseUrlApi + "/student/" + studentId,updateStudentRequest)
  };

  deleteStudent(studentId:String):Observable<Student>{
    return this.httpClient.delete<Student>(this.baseUrlApi + "/student/" + studentId)
  };

  AddStudent(studentRequest:Student):Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName : studentRequest.firstName,
      lastName : studentRequest.lastName,
      dateOfBirth : studentRequest.dateOfBirth,
      email : studentRequest.email,
      mobile : studentRequest.mobile,
      genderId : studentRequest.genderId,
      physicalAddress : studentRequest.address.physicalAddress,
      postalAddress : studentRequest.address.postalAddress,
    }

    return this.httpClient.post<Student>(this.baseUrlApi + '/student/Add',addStudentRequest);
  }
}
