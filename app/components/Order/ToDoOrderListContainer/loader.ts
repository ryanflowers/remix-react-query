import { queryStatusOrder } from "~/services/queries/statusOrder"
import { Status } from "~/services/queries/useFetchOrderStatus"

export const loader = async ({ queryClient }: any) => {

    return queryClient.prefetchQuery({
        queryKey: [Status.TO_DO],
        queryFn: () => queryStatusOrder(Status.TO_DO),
    })
}