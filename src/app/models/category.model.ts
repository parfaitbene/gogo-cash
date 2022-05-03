export class Category{
    id: number;
    name: string;
    flow: string;
    icon: string;

    constructor(name, flow, icon){
        this.name = name;
        this.flow = flow;
        this.icon = icon;
    }
}