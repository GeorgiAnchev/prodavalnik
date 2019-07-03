import axios from 'axios';

export const authHeader = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}
export default axios.create({
    baseURL: 'http://localhost:3001'
});
