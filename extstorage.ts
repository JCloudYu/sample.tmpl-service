import type os from "os";

declare global {
	interface ExtendedSharedStorage {
		(scope:'demo'):{
			message:string;
		}
	}
}
