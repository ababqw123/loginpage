const moment = require('moment');

export class CompanyContext {
    company_code : string;
    start_date : string;
    empire_date : string;
    constructor(company_code : string, start_date : string, empire_date : string){
        this.company_code = company_code,
        this.start_date = start_date;
        this.empire_date = empire_date
    }
}