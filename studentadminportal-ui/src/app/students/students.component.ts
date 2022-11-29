import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  private students: Student[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'mobile',
    'gender',
    'edit'
  ];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  public filterString = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    //Fetch students
    this.studentService.getStudents().subscribe({
      next: (res) => {
        (this.students = res),
          (this.dataSource = new MatTableDataSource<Student>(this.students));
          if(this.matPaginator){
            this.dataSource.paginator = this.matPaginator
          };
          if(this.matSort){
            this.dataSource.sort = this.matSort
          }
      },
      error: (err) => console.error(err),
    });
  }

  filterStudent(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
