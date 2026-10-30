import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  standalone: false,
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.css',
})
export class ModalComponent {
@Input() type: 'success' | 'error' | 'confirm' = 'confirm';
@Input() title:string='';
@Input() isOpen:boolean=false;
@Input() message: string = '';

@Output() close = new EventEmitter<void>();
@Output() confirm = new EventEmitter<void>();

onClose(){
  this.close.emit();
}
onConfirm()
{
this.confirm.emit();
}
}
