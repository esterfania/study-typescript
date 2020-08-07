export class NegociacaoParcialService {

    readonly _negociacoesParciais = [
        { "montante": 200.5, "vezes": 2 },
        { "montante": 100.2, "vezes": 5 },
        { "montante": 50.5, "vezes": 1 },
        { "montante": 70.5, "vezes": 2 }];

    get negociacoesParciais() {
        return this._negociacoesParciais as NegociacaoParcial[];
    }
}