import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

const { GOOGLE_TRANSLATE_API } = process.env;

export { GOOGLE_TRANSLATE_API };
