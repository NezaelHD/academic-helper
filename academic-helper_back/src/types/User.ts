export type User = {
	id: string;
	email: string;
	username: string;
	profileImage?: string;
	resetToken?: string;
	role: Roles;
	createdAt: Date;
	updatedAt: Date;
};

enum Roles {
	student = "student",
	professor = "professor",
	admin = "admin",
}
