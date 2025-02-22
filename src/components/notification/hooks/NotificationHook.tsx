import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestCommon } from "../../../utils/RequestCommon";
import { NotificationInterface } from "../../../types";
export const useGetNotifications = (params: any) => {
  return useQuery<NotificationInterface[], Error>({
    queryKey: ["get-user-notifications", params.page],
    queryFn: () => requestCommon(null, "/notification/", "GET", params, null),
  });
};

export const useCheckNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      requestCommon(
        null,
        `/notification/${id}/mark-as-read/`,
        "POST",
        {},
        null
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-notifications"],
        exact: false,
      });
    },
  });
};
