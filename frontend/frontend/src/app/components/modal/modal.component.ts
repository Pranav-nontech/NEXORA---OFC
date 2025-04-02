import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;        // Controls modal visibility
  @Input() title: string = 'Modal Title';  // Modal title
  @Output() close = new EventEmitter<void>(); // Emits when modal is closed

  closeModal(): void {
    this.isOpen = false;
    this.close.emit(); // Notify parent component of closure
  }
}