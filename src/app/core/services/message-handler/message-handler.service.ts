import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageHandlerService {
  constructor(private messageService: MessageService) {}
  errorHandler(errorTitle: string, error: any): void {
    this.messageService.add({
      summary: errorTitle,
      detail: error,
      severity: 'error',
    });
  }
  errorHandler2(errorTitle: string): void {
    this.messageService.add({
      detail: errorTitle,
      severity: 'error',
    });
  }
  successHandler(message: string): void {
    this.messageService.add({
      detail: message,
      severity: 'success',
    });
  }
  clear() {
    this.messageService.clear();
  }
}
