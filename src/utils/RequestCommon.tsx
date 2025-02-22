import { axios_instance } from "../connection/client";

export const requestCommon = async (data: any, request: string, rq_type: string, params: any, content_type: string | null) => {
    const headers = {
        "Content-Type": content_type === null ? 'application/json' : content_type,
        'Authorization': `Bearer ${localStorage.getItem('token')}`

    }
    if (rq_type === 'POST') {
        return await axios_instance.post(request, data,
            { headers }
        )
            .then((res) => {
                return res.data
            });
    }
    if (rq_type === 'GET') {
        console.log("ASDUASHDIUASDYUIS")
        return await axios_instance.get(request, {
            params: params,
            headers
        })
            .then((res) => {

                return res.data;
            });
    }
    if (rq_type === 'DELETE') {
        return await axios_instance.delete(request, { headers })
            .then((res) => {
                return res.data;
            });
    }
    if (rq_type === 'PUT') {
        return await axios_instance.put(request,
            data,
            { headers }
        )
            .then((res) => {
                return res.data;
            });
    }
};