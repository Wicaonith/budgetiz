export class Users {
    private id: number;
    private login: string;
    private password: string;
    private isLogged: boolean;

    public constructor(id:number, login: string, password:string, isLogged:boolean){
        this.id = id;
        this.login = login;
        this.password = password;
        this.isLogged = isLogged;
    }
}
