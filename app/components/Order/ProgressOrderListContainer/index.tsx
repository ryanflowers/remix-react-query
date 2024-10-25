import useFetchOrderStatus, { Status } from "~/services/queries/useFetchOrderStatus";
import OrderList from "../OrderList";

const ProgressOrderListContainer = ({onAccept}: {onAccept: (data: any) => unknown} ) => {
  const {data: dataInProgress} = useFetchOrderStatus(Status.IN_PROGRESS);

    return  <div className="flex-1">
    {dataInProgress ? <OrderList title="IN PROGRESS" data={dataInProgress} onClick={(index: number) => onAccept(dataInProgress[index])} /> : "NOT FOUND"}
  </div>

}

export { ProgressOrderListContainer }