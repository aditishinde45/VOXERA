let IS_PROD=true;
const server= IS_PROD ?
"https://voxera-backend-rh5n.onrender.com":
    "http://localhost:3000";

export default server;