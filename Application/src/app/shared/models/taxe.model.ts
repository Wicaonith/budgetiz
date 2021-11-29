import { Entity } from "../services/firestoreCrud.service";

export class Taxe implements Entity {

    id: string;

    idUser: string;

    year: number;

    netTaxable: number;

    datas: Map<string, number>;

    isDeleted: boolean

    public constructor(id: string, idUser: string, year: number, netTaxable: number, datas: Map<string, number>, isDeleted: boolean) {
        this.id = id;
        this.idUser = idUser;
        this.year = year;
        this.netTaxable = netTaxable;
        this.datas = datas;
        this.isDeleted = isDeleted;
    }
}