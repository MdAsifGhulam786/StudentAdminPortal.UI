import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null = '';
  student: Student ={
    id : '',
    firstName : '',
    lastName : '',
    email : '',
    dateOfBirth : '',
    mobile : 0,
    profileImageUrl : '',
    genderId : '',
    gender:{
      id : '',
      description : ''
    },
    address:{
      id : '',
      physicalAddress : '',
      postalAddress : ''
    }
  }

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');

      if (this.studentId) {
        this.studentService
          .getStudent(this.studentId)
          .subscribe((successResponse) => {
            this.student = successResponse;
          });
      }
    });
  }
}
