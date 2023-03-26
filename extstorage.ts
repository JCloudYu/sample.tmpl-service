import "os";

declare global {
	interface ExtendedSharedStorage {
		(scope:'demo'):{
			message:string;
		}
	}
}