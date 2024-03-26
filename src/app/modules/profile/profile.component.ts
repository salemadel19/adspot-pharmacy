import { Component, OnInit } from '@angular/core';
import { AppFacade } from '../../app-facade.service';
import { ProfileFacade } from './services/profile-facade.service';
import {
  IUserInfo,
  IContract,
  IInvoice,
} from './../../core/models/typings.model';
import { Subject, tap } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/services/message-handler/message-handler.service';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public destroy$ = new Subject<void>();
  public info!: IUserInfo;
  public isUserInfoLoading$ = this.profileFacade.isUserInfoLoading$;
  public screensCount$ = this.profileFacade.screensCount$;
  public maxBudget$ = this.profileFacade.maxBudget$;
  public totalScreens$ = this.profileFacade.totalScreens$;

  public userInfos$ = this.profileFacade.userInfos$.pipe(
    tap((userInfos) => {
      this.info = userInfos;
    })
  );
  public contracts!: IContract[];
  public userContracts$ = this.profileFacade.contracts$.pipe(
    tap((newContracts) => {
      const expirationStatusArray = newContracts.map((con, index) => {
        const isExpired = moment(con.contract_end_date).isBefore(moment());
        return {
          ...con,
          isExpired,
          contract_end_date: moment(con.contract_end_date)
            .format('YYYY/MM/DD')
            .toString(),
          contract_start_date: moment(con.contract_start_date)
            .format('YYYY/MM/DD')
            .toString(),
        };
      });
      this.contracts = expirationStatusArray;
    })
  );

  public invoices!: IInvoice[];
  public userInvoices$ = this.profileFacade.invoices$.pipe(
    tap((newInvoices) => {
      const expirationStatusArray = newInvoices.map((invoice, index) => {
        return {
          ...invoice,
          invoice_date: moment(invoice.invoice_date)
            .format('YYYY/MM/DD')
            .toString(),
          invoice_dead_line: moment(invoice.invoice_dead_line)
            .format('YYYY/MM/DD')
            .toString(),
        };
      });
      this.invoices = expirationStatusArray;
    })
  );
  public cols!: Column[];

  public clientForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private appFacade: AppFacade,
    private profileFacade: ProfileFacade,
    private messagehandler: MessageHandlerService,
  ) {}

  ngOnInit(): void {
    this.appFacade.setSidebarStatusToClose(false);
   
    this.profileFacade.loadUserInfo();
    this.clientForm = this.fb.group({
      client_name: [''],
      client_phone: [''],
      client_email: [''],
      old_pwd: [''],
      new_pwd: [''],
      new_pwd2: [''],
    });
    this.userInfos$.subscribe((data) => {
      this.clientForm.patchValue(data);
    });

    this.userContracts$.subscribe();
    this.userInvoices$.subscribe();

    this.cols = [
      { field: 'contract_id', header: 'ID Contract' },
      { field: 'contract_pack', header: 'Pack' },
      { field: 'max_budjet_ttc', header: 'Budget Maximal' },
      { field: 'contract_discount', header: 'Remise' },
      { field: 'video_length', header: 'Durée Vidéo' },
      { field: 'contract_start_date', header: 'Date Début' },
      { field: 'contract_end_date', header: 'Date Fin' },
    ];
  }

  updateProfile() {
    const old_pwd = this.oldPwdControl.value.trim();
    const new_pwd = this.newPwdControl.value.trim();
    const new_pwd2 = this.newPwd2Control.value.trim();
    if (this.clientForm.valid) {
      this.profileFacade.tryUpdateUserInfo({
        client_name: this.clientNameControl.value.trim(),
        client_email: this.clientEmailControl.value.trim(),
        client_phone: this.clientPhoneControl.value.trim(),
      });
      if (old_pwd != '' && new_pwd != '' && new_pwd2 != '') {
        if (new_pwd == new_pwd2) {
          this.profileFacade.tryUpdatePassword({
            old_password: old_pwd,
            new_password: new_pwd,
          });
          this.oldPwdControl.setValue('');
          this.newPwdControl.setValue('');
          this.newPwd2Control.setValue('');
        } else {
          this.messagehandler.errorHandler2(
            `Votre nouveau mot de passe doit etre identique `
          );
          this.oldPwdControl.setValue('');
          this.newPwdControl.setValue('');
          this.newPwd2Control.setValue('');
        }
      }
    }
  }
  public get clientNameControl() {
    return this.clientForm.get('client_name') as AbstractControl;
  }
  public get clientEmailControl() {
    return this.clientForm.get('client_email') as AbstractControl;
  }
  public get clientPhoneControl() {
    return this.clientForm.get('client_phone') as AbstractControl;
  }
  public get oldPwdControl() {
    return this.clientForm.get('old_pwd') as AbstractControl;
  }
  public get newPwdControl() {
    return this.clientForm.get('new_pwd') as AbstractControl;
  }
  public get newPwd2Control() {
    return this.clientForm.get('new_pwd2') as AbstractControl;
  }
}
