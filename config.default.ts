import path from "path";
import fs from "fs";


// Type to the configurable fiels
export interface ConfigFormat {
	
}

// The default values
const config:Required<ConfigFormat> = {
	
};
export default config;









// #region [ Overwrites default configurations ]
{
	const GLOBAL_PATHS = (process.env['DYNCONF_SEARCH_PATHS']||'').split(',').map(v=>v.trim()).filter((v)=>v.trim()!=='');
	const CONFIG_PATHS:string[] = [ ...GLOBAL_PATHS, './config.js' ];
	for(const candidate of CONFIG_PATHS) {
		const script_path = path.resolve(__dirname, candidate)
		try {
			fs.accessSync(script_path, fs.constants.F_OK|fs.constants.R_OK);
		}
		catch(e:any) {
			const error:NodeJS.ErrnoException = e;
			if ( error.code === 'ENOENT' ) {
				console.log(`No configuration file found at ${script_path}! Skipping...`);
				continue;
			}
			throw e;
		}

		// Modify following line if absolute path has be rewritten!
		const overwritten = require('file://' + script_path);
		if ( Array.isArray(overwritten) || Object(overwritten) !== overwritten ) {
			console.error(`File "${script_path}" contains none-object configurations! Skipping...`);
			continue;
		}

		// Following comment is to prevent unexpected error if merge doesn't exist
		// @ts-ignore
		(Object.merge||Object.assign)(config, overwritten);
	}
}
// #endregion
