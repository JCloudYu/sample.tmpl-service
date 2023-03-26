import "extes";
import $ from "shared-storage";

import reroot from "reroot";
reroot.search_root = `${reroot.project_root}/_dist`;

import Config from "/config.default.js";


Promise.chain(async()=>{
	$('demo').message = 'World!';

	console.log(`Hello, ${$('demo').message}`);
})
.catch((e)=>{
	console.error("Received unexpected error!", e);
	process.exit(1);
});