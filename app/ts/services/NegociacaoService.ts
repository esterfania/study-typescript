import { Negociacao, NegociacaoParcial } from "../models/index";


export class NegociacaoService {

    obterNegociacoes(handler: HandlerFunction): Promise<void | Negociacao[]> {

        return fetch('http://localhost:8080/dados')
            .then(response => handler(response))
            .then(response => response.json())
            .then((dados: NegociacaoParcial[]) => dados
                .map(dado => new Negociacao(new Date(), dado.vezes, parseFloat((dado.montante / dado.vezes).toFixed(2))))
            )
            .catch(err => {
                console.log(err)
                throw new Error("Não foi possível importar os dados!");
            });

    }
}

export interface HandlerFunction {
    (res: Response): Response;
}