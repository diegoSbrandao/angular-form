import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form-component.html',
  styleUrls: ['./address-form-component.css'],
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;
  isCepValid = true;
  showError = false; // Variável de controle para exibir/ocultar a mensagem de erro
  showSuccess = false;
  errorMessage = '';
  isFormComplete = false;
  isLogradouroEnabled = false;
  isBairroEnabled = false;
  isCidadeEnabled = false;
  isEstadoEnabled = false;
  logradouroField!: AbstractControl<any, any> | null;
  bairroField!: AbstractControl<any, any> | null;
  cidadeField!: AbstractControl<any, any> | null;
  estadoField!: AbstractControl<any, any> | null;

  private successMessageTimer: any; // Timer para controlar o tempo de exibição da mensagem de sucesso

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      cep: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      showError: [false],
    });

    // Inscreva-se para receber as mudanças do formulário
    this.addressForm.valueChanges.subscribe(() => {
      this.isFormComplete = this.areAllFieldsFilled();
    });
    this.logradouroField = this.addressForm.get('logradouro');
    this.bairroField = this.addressForm.get('bairro');
    this.cidadeField = this.addressForm.get('cidade');
    this.estadoField = this.addressForm.get('estado');

  }

  searchAddress() {
    const cep = this.addressForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.validateCepFromBackend(cep)
        .pipe(
          switchMap((response: any) => {
            this.isCepValid = response.valid;
            if (this.isCepValid) {
              return this.getAddress(cep);
            } else {
              this.showError = true;
              this.errorMessage = 'CEP não encontrado';
              this.clearAddressFields();
              return new Observable();
            }
          })
        )
        .subscribe(
          (address: any) => {
            if (address) {
              this.addressForm.patchValue({
                logradouro: address.logradouro,
                bairro: address.bairro,
                cidade: address.localidade,
                estado: address.uf,
              });
            }
            this.updateFieldsAccessibility(); // Atualiza o estado de acessibilidade dos campos
          },
          (error: any) => {
            this.showError = true;
            this.errorMessage = 'Erro ao buscar o CEP';
            this.clearAddressFields();
          }
        );
    } else {
      this.isCepValid = false;
      this.showError = false;
      this.clearAddressFields();
      this.updateFieldsAccessibility(); // Atualiza o estado de acessibilidade dos campos
    }
  }

  updateFieldsAccessibility() {
    const logradouroField = this.addressForm.get('logradouro');
    const bairroField = this.addressForm.get('bairro');
    const cidadeField = this.addressForm.get('cidade');
    const estadoField = this.addressForm.get('estado');

    if (logradouroField && bairroField && cidadeField && estadoField) {
      if (this.isCepValid && !logradouroField.value) {
        logradouroField.enable();
        this.isLogradouroEnabled = true;
        bairroField.enable();
        this.isBairroEnabled = true;
        cidadeField.enable();
        this.isCidadeEnabled = true;
        estadoField.enable();
        this.isEstadoEnabled = true;
      } else {
        logradouroField.disable();
        this.isLogradouroEnabled = false;
        bairroField.disable();
        this.isBairroEnabled = false;
        cidadeField.disable();
        this.isCidadeEnabled = false;
        estadoField.disable();
        this.isEstadoEnabled = false;
      }
    }
  }

  validateCepFromBackend(cep: string) {
    const url = `http://localhost:8080/employee/validation/cep/${cep}`;
    return this.http.get(url, {}).pipe(
      switchMap((response: any) => {
        return new Observable((observer: Observer<any>) => {
          observer.next(response);
          observer.complete();
        });
      })
    );
  }

  getAddress(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url).pipe();
  }

  clearAddressFields() {
    this.addressForm.patchValue({
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
  }

  submitForm() {
    if (this.addressForm.valid && this.isCepValid) {
      // Envie o formulário ou realize outras ações necessárias

      // Exiba a mensagem de envio com sucesso
      this.showSuccess = true;

      // Inicie o timer para ocultar a mensagem após 3 segundos
      this.successMessageTimer = setTimeout(() => {
        this.hideSuccessMessage();
      }, 3000);
    }
  }

  areAllFieldsFilled(): boolean {
    for (const controlName in this.addressForm.controls) {
      if (this.addressForm.controls.hasOwnProperty(controlName)) {
        const control = this.addressForm.controls[controlName];
        if (control.invalid || control.value === '') {
          return false;
        }
      }
    }
    return true;
  }

  hideSuccessMessage() {
    // Oculte a mensagem de sucesso e limpe o timer
    this.showSuccess = false;
    clearTimeout(this.successMessageTimer);
  }

  ngOnDestroy() {
    // Certifique-se de limpar o timer quando o componente for destruído
    clearTimeout(this.successMessageTimer);
  }
}
