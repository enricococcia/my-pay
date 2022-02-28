class User {
	uid: string;
	id: string;
	name: string;
	userName: string;
	email: string;
	budget: string;


	constructor(
		uid: string,
		id: string,
		name: string,
		userName: string,
		email: string,
        budget: string,
	) {
		this.uid = uid;
		this.id = id;
		this.name = name;
		this.userName = userName;
		this.email = email;
		this.budget = budget;
	}
}

export default User;
