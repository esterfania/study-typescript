export abstract class View<T> {
    private _elemento: JQuery;
    private _escape: boolean;
    constructor(seletor: string, escape?: boolean) {
        this._elemento = $(seletor);
        this._escape = escape;
    }

    update(model: T) {
        let template = this.template(model);
        if(this._escape)
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '')
        this._elemento.html(template);
    }

    abstract template(model: T): string;
}
