class MotivationalQuote {
	id: string;
    mid: string;
	title: string;
	date: Date;
	userId: string;

	constructor(
		title: string,
		date: Date,
		userId: string,
	) {
        this.id = "mot-"+date.toISOString().replaceAll('.', "").replaceAll(':', "");
        this.mid = "";
		this.title = title;
		this.date = date;
		this.userId = userId;
	}
}

export default MotivationalQuote;
