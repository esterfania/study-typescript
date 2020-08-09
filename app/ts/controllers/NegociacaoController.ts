import { Negociacao, Negociacoes } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController {

    @domInject("#data")
    private _inputData: JQuery;

    @domInject("#quantidade")
    private _inputQuantidade: JQuery;

    @domInject("#valor")
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView", true);
    private _mensagemView = new MensagemView("#mensagemView");
    private _service = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona(): void {

        let data = new Date(this._inputData.val().replace("/-/g", ","))
        if (!this._validaDiaUtil(data)) {
            this._mensagemView.update("Negociações apenas em dias úteis!")
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        imprime(this._negociacoes, negociacao)
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }

    private _validaDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo

    }

    @throttle()
    async importaDados() {
        try {
            const negociacoesParaImportar = await this._service.obterNegociacoes(
                response => {
                    if (response.ok) {
                        return response;
                    }
                    else {
                        throw new Error(response.statusText)
                    }
                }) as Negociacao[];

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar.filter(negociacao =>
                !negociacoesJaImportadas.some(jaImportada =>
                    negociacao.ehIgual(jaImportada)))
                .forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao));
            this._negociacoesView.update(this._negociacoes);
        }
        catch (err) {
            this._mensagemView.update(err.message)
        }

    }
}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terça,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}

