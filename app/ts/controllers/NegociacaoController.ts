import { Negociacao, Negociacoes } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoParcialService } from '../services/index';

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
    private _negociacaoParcialService = new NegociacaoParcialService();
    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event): void {
        event.preventDefault();

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
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }

    private _validaDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo

    }

    @throttle()
    importaDados() {

        function isOk(res: Response) {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText)
            }
        }
        // fetch('http://localhost:8080/dados')
        // .then(res => isOk(res))
        // .then(res => res.json())
        // .then((
        //     dados: NegociacaoParcial[]) => {
        //     dados
        //         .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
        //         .forEach(negociacao => this._negociacoes.adiciona(negociacao));
        //     this._negociacoesView.update(this._negociacoes);
        // })
        // .catch(err => console.log(err.message));       

        this._negociacaoParcialService
            .negociacoesParciais
            .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            .forEach(negociacao => this._negociacoes.adiciona(negociacao));
        this._negociacoesView.update(this._negociacoes);

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

