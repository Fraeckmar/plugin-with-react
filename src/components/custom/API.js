import axios from "axios"
const location = window.location

const BASE_API_URL = location.origin+location.pathname.replace('wp-admin/admin.php', '')+'wp-json';
axios.defaults.baseURL = BASE_API_URL

export default axios