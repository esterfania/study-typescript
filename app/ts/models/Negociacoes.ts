import { Negociacao } from './Negociacao';
import { logarTempoExecucao } from '../helpers/decorators/index';
import { Intefaces } from './index';

export class Negociacoes implements Intefaces<Negociacoes> {

    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }


    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    texto(): void {
        console.log(this)
    }

    ehIgual(objeto: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) === JSON.stringify(objeto.paraArray());
    }
}