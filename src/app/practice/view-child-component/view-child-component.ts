import { Component, ElementRef, ViewChild,ViewChildren,QueryList,AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-child-component',
  standalone: false,
  templateUrl: './view-child-component.html',
  styleUrl: './view-child-component.css',
})
export class ViewChildComponent {
// ✅ 1️⃣ Access Single Input (ViewChild)
  @ViewChild('nameInput') nameInput!: ElementRef;

  // ✅ 2️⃣ Access Form
  @ViewChild('employeeForm') employeeForm!: NgForm;

  // ✅ 3️⃣ Access Multiple Elements (ViewChildren)
  @ViewChildren('salaryBox') salaryBoxes!: QueryList<ElementRef>;

  employees = [
    { id: 1, name: 'Amit', salary: 8000 },
    { id: 2, name: 'Rahul', salary: 15000 },
    { id: 3, name: 'Priya', salary: 22000 }
  ];

  ngAfterViewInit(): void {

    // ✅ Focus input automatically after load
    this.nameInput.nativeElement.focus();

    // ✅ Access multiple elements
    this.salaryBoxes.forEach(box => {
      console.log('Salary Value:', box.nativeElement.innerText);
    });
  }

  // ✅ Call this to highlight high salary dynamically
  highlightHighSalary() {
    this.salaryBoxes.forEach(box => {
      const salary = Number(box.nativeElement.innerText);

      if (salary > 10000) {
        box.nativeElement.style.color = 'green';
        box.nativeElement.style.fontWeight = 'bold';
      }
    });
  }

  // ✅ Form manipulation
  setDefaultValue() {
    this.employeeForm.setValue({
      name: 'Default User'
    });
  }

  submit(form: NgForm) {
    console.log('Form Submitted:', form.value);
  }
}
