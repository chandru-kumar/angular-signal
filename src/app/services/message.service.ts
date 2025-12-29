import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  // internal writable signal
  private readonly _message = signal<string | null>(null);

  // expose readonly view of the message
  readonly message = this._message.asReadonly();

  // show a message; optional auto-clear after durationMs
  show(text: string, durationMs?: number) {
    this._message.set(text);
    if (durationMs && durationMs > 0) {
      setTimeout(() => this.clear(), durationMs);
    }
  }

  // clear the current message
  clear() {
    this._message.set(null);
  }
}

