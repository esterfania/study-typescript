import { Intefaces } from "./index";

export class Negociacao implements Intefaces<Negociacao> {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {
    }

    get volume() {
        return this.quantidade * this.valor;
    }

    texto(): void {
        console.log("Impressão")
        console.log(this)
    }
    ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear()
    }
}