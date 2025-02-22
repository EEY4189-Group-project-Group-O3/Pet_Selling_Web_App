import { axios_instance } from "../../../connection/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { requestCommon } from "../../../utils/RequestCommon";

export const useGetNotifications = (params: any) => {
    return useQuery<any[], Error>({
        queryKey: ["get-user-notifications", params.page],
        queryFn: () => requestCommon(null, '/notification/', 'GET', params, null),
    })
}

export const useCheckNotification = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: number) => requestCommon(
            null, 
            `/notification/${id}/mark-as-read/`, 
            'POST', 
            {}, 
            null
        ),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ['get-user-notifications'],
                exact: false,
            });
        },
    });
};