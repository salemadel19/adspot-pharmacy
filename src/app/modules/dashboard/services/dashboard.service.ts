import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { IDashboard } from '../../../core/models/typings.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apiService: ApiService) {}
  public fetchDashboard(client_id: string, periode: string) {
    return this.apiService.get<IDashboard>(
      `/home?client_id=${client_id}&periode=${periode}`
    );
  }
}
