import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagBankService {
  private pagBankApiUrl = 'https://api.pagbank.com';

  constructor(private http: HttpClient) { }

  criarLinkPagamento(valor: number): Promise<string> {
    const chaveAcesso = 'SUA_CHAVE_DE_ACESSO';
    const chaveAfilicao = 'SUA_CHAVE_DE_AFILIACAO';

    const payload = {
      valor: valor,
      chaveAcesso: chaveAcesso,
      chaveAfilicao: chaveAfilicao
      // Outros parâmetros necessários para a criação do link de pagamento
    };

    return this.http.post<any>(`${this.pagBankApiUrl}/link_pagamento`, payload)
      .toPromise()
      .then(response => response.linkPagamento as string)
      .catch(error => {
        console.error('Erro ao criar link de pagamento:', error);
        throw error;
      });
  }
}