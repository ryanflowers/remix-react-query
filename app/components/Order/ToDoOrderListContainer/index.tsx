import useFetchOrderStatus, { Status } from "~/services/queries/useFetchOrderStatus";
import OrderList from "../OrderList";

const ToDoOrderListContainer = ({onAccept}: {onAccept: (data: any) => unknown} ) => {
    const {data: dataTodo} = useFetchOrderStatus(Status.TO_DO);

    return   <div className="flex-1">
        {dataTodo ? <OrderList title="TO DO" data={dataTodo} onClick={(index: number) => onAccept(dataTodo[index])} /> : "NOT FOUND"}
      </div>

}

export { ToDoOrderListContainer }