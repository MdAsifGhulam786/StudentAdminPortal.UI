import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
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
  genderList:Gender[] = [];
  isNewStudent:boolean = false;
  header:string = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private genderService: GenderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      if(this.studentId?.toLowerCase()==='Add'.toLowerCase())
      {
        //new student Functionality
        this.isNewStudent = true;
        this.header = 'Add New Student'
      }
      else{
        //Existing student Functionality
        this.isNewStudent = false;
        this.header = 'View Student';
        if (this.studentId) {
          this.studentService
            .getStudent(this.studentId)
            .subscribe((successResponse) => {
              this.student = successResponse;
            });
        }
        this.genderService.getGenderList()
        .subscribe((successResponse)=>{
          this.genderList = successResponse;
        })
      }
    });
  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (successResponse)=>{
        this.snackBar.open("Student updated successfully",undefined,{
          duration: 2000
        })
      }
    )
  }

  onDelete():void{
    this.studentService.deleteStudent(this.student.id)
    .subscribe(
      (successResponse) =>{
        this.snackBar.open('Student deleted successfully',undefined,{
          duration:2000
        });
        setTimeout(()=>{
          this.router.navigateByUrl('students');
        },2000)
      }
    )
  }

  onAdd():void {
    this.studentService.AddStudent(this.student)
    .subscribe((successResponse)=>{
      this.snackBar.open('Student added successfully',undefined,{
        duration: 2000
      });
      setTimeout(()=>{
        this.router.navigateByUrl(`students/${successResponse.id}`);
      },2000)
    });
  }
}
