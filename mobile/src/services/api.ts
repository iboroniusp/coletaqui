import axios from 'axios';

const IPAddress = '192.168.15.49';

const api = axios.create({
    baseURL: `http://${IPAddress}:3333` // endereço pegado do expo que é o nosso ip 
});

export default api