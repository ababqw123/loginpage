const moment = require('moment');


export class LoginContext {
    id : string;
    password : string;
    constructor(id : string, password : string){
        this.id = id,
        this.password = password;
    }
}

export class LoginObject{
    id : string;
    password : string;
    permission : Array<string>
    admin : boolean;
    company_code : string;
    register_date : string;
    visit_date : string;

    constructor(user : any){
        this.id = user.id,
        this.password = user.password;
        this.permission = user.permission;
        this.admin = user.admin;
        this.company_code = user.company_code;
        this.register_date = user.register_date;
        this.visit_date = user.visit_date;
    }
}

export class add_register{
    id : string;
    password : string;
    company_code : string;
    admin : boolean;
    permission : Array<string>;
    register_date : string;
    visit_date : string;

    constructor(id : string, password : string, company_code : string,admin : boolean,permission : Array<string>){
        this.id = id,
        this.password = password;
        this.company_code = company_code;
        this.permission = permission;
        this.admin = admin;
        this.register_date =  moment().format("yyyy/MM/DD");
        this.visit_date = '';
    }
}