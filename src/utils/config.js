import {
    environment
} from "./constant.js"

const dev_config = {
    BASIC_URL: 'https://dev.anetalk.com/8764/api/',
    DATA_BASE_ENV: 'dev-d2c27a',
    UPLOAD_URL: 'https://media.ananlab.com'
};

const prod_config = {
    BASIC_URL: 'https://api.ananlab.com/',
    DATA_BASE_ENV: 'prod-d2c27a',
    UPLOAD_URL: 'https://media.ananlab.com'
};

const ENV_CONFIG = environment === 'DEV' ? dev_config : environment === 'PROD' ? prod_config : null;

export default ENV_CONFIG;