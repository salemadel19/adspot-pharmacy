import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';
import { IContract, INotification } from '../../models/typings.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private apiService: ApiService) {}
  public fetchContracts(client_id: string) {
    return this.apiService.get<IContract[]>(
      `/client/contracts/all?client_id=${client_id}`
    );
  }
  public fetchNotifications(client_id: string) {
    return this.apiService.get<INotification[]>(
      `/client/notifications?client_id=${client_id}`
    );
  }
  public updateNotifications(notification_id: string) {
    return this.apiService.put<INotification[]>(
      `/client/notifications/update?notification_id=${notification_id}`
    );
  }
}
