import API from '@/axios/axios';

class Api {
    static getSong(id: string) {
        return API.get(`/stream/download/${id}`, {
            
        });
    }

    static ping() {
        return API.get('/pinging', {
            headers: {
                Range: 'bytes=0-0'
            }
        });
    }
}

export default Api;