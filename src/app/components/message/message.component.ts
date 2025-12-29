import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  private readonly messageService = inject(MessageService);
  readonly message = this.messageService.message;

  // local input text signal bound to the textbox
  inputText = signal('');

  submit() {
    const text = this.inputText();
    if (text && text.trim().length > 0) {
      // show message for 5 seconds
      this.messageService.show(text.trim(), 5000);
      this.inputText.set('');
    }
  }

  clear() {
    this.messageService.clear();
  }
}
