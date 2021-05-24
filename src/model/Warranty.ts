
export class Warranty {
    public war_id: string;
    public prod_model: string;
    public war_period: number;  //	Warranty period, in month.
    public war_start: string;	// Warranty start date
    public war_end:	string;     // Warranty end date
    public customer_id:	string;	// Customer id where the product is registered to

    constructor(war_id: string, prod_model: string, war_period: number,
        war_start: string, war_end: string, customer_id: string)    {
        this.war_id = war_id;
        this.prod_model = prod_model;
        this.war_period = war_period;
        this.war_start = war_start;
        this.war_end = war_end;
        this.customer_id = customer_id;
    }

}
