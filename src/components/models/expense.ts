class Expense {
	id: string;
    eid: string;
	title: string;
	date: Date;
	type: string;
	cost: string;
	userId: string;

	constructor(
		title: string,
		date: Date,
		type: string,
		cost: string,
		userId: string,
	) {
        this.id = "exp-"+date.toISOString().replaceAll('.', "").replaceAll(':', "");
        this.eid = "";
		this.title = title;
		this.date = date;
		this.type = type;
		this.cost = cost;
		this.userId = userId;
	}
}

export default Expense;
