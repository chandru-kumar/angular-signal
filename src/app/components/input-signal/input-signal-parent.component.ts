import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSignalChildComponent } from './input-signal-child.component';
import type { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-input-signal-parent',
  standalone: true,
  imports: [CommonModule, InputSignalChildComponent],
  templateUrl: './input-signal-parent.component.html',
  styleUrls: ['./input-signal-parent.component.css']
})
export class InputSignalParentComponent {
  // employees array and current selected employee (non-null)
  employees = signal<Employee[]>([
    { id: 1, firstName: 'Ada', lastName: 'Lovelace', role: 'Engineer' },
    { id: 2, firstName: 'Grace', lastName: 'Hopper', role: 'Admiral' }
  ]);

  // current selected employee signal (always an Employee)
  current = signal<Employee>(this.employees()[0]);

  // label derived from current
  label = computed(() => {
    const e = this.current();
    return `${e.firstName} ${e.lastName}`;
  });

  // initials derived from current
  initials = computed(() => {
    const e = this.current();
    return `${e.firstName.charAt(0)}${e.lastName.charAt(0)}`.toUpperCase();
  });

  // toggle: add a new random employee and select it
  toggle() {
    const id = Math.floor(Math.random() * 10000) + 3;
    const firstNames = ['Linus', 'Margaret', 'Ken', 'Sophie', 'Alan'];
    const lastNames = ['Torvalds', 'Hamilton', 'Thompson', 'Klein', 'Turing'];
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = ['Engineer', 'Designer', 'Manager', 'CTO'][Math.floor(Math.random() * 4)];
    const newEmp: Employee = { id, firstName: fn, lastName: ln, role };
    this.employees.update(prev => [...prev, newEmp]);
    this.current.set(newEmp);
  }
}
