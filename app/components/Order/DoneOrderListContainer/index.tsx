import useFetchOrderStatus, { Status } from "~/services/queries/useFetchOrderStatus";
import OrderList from "../OrderList";

const DoneOrderListContainer = ({onAccept}: {onAccept: (data: any) => unknown} ) => {
  const {data: dataDone} = useFetchOrderStatus(Status.DONE);

  return  <div className="flex-1">
    {dataDone ? <OrderList title="DONE" data={dataDone} onClick={(index: number) => onAccept(dataDone[index])} /> : "NOT FOUND"}
  </div>

}

export { DoneOrderListContainer }