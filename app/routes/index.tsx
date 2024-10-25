import {json, LoaderFunction, useLoaderData} from 'remix';
import OrderList from '~/components/Order/OrderList';
import useFetchOrderStatus, {Status, OrderDataProps} from '~/services/queries/useFetchOrderStatus';
import useUpdateOrder from '~/services/mutations/useUpdateOrder';
import { dehydrate, QueryClient } from 'react-query';
import { queryStatusOrder } from '~/services/queries/statusOrder';

export const loader: LoaderFunction = async ({params}) => {
  const queryClient = new QueryClient()

  const todo = queryClient.prefetchQuery({
    queryKey: ['statusOrder', Status.TO_DO],
    queryFn: () => queryStatusOrder(Status.TO_DO),
  })

  const inProgress =  queryClient.prefetchQuery({
    queryKey: ['statusOrder', Status.IN_PROGRESS],
    queryFn: () => queryStatusOrder(Status.IN_PROGRESS),
  })

  const done = queryClient.prefetchQuery({
    queryKey: ['statusOrder', Status.DONE],
    queryFn: () => queryStatusOrder(Status.DONE),
  })

  // Block the render until the queries are done to allow for SSR as remix does not stream components.
  // TODO: This is not ideal on the client side we need to find a way to only block the server side
  await Promise.all([todo, inProgress, done])

  return json({ dehydratedState: dehydrate(queryClient) })
}

export default function Index() {

  const {data: dataTodo} = useFetchOrderStatus(Status.TO_DO);
  const {data: dataInProgress} = useFetchOrderStatus(Status.IN_PROGRESS);
  const {data: dataDone} = useFetchOrderStatus(Status.DONE);
  const {mutate} = useUpdateOrder();

  const onAccept = (data: OrderDataProps) => {
    let statusOrder = Status.DONE;
    if (data?.statusOrder === Status.TO_DO) {
      statusOrder = Status.IN_PROGRESS;
    } else if (data?.statusOrder === Status.IN_PROGRESS) {
      statusOrder = Status.DONE;
    } else {
      alert("DONE");
      return;
    }
    if (data?.id) {
      mutate({
        id: data?.id,
        statusOrder,
      });
    } else {
      alert("FAILED")
    }
  }

  return (
    <div className="flex flex-row justify-between bg-gray-300">
      <div className="flex-1">
        {dataTodo ? <OrderList title="TO DO" data={dataTodo} onClick={(index: number) => onAccept(dataTodo[index])} /> : "NOT FOUND"}
      </div>
      <div className="flex-1">
        {dataInProgress ? <OrderList title="IN PROGRESS" data={dataInProgress} onClick={(index: number) => onAccept(dataInProgress[index])} /> : "NOT FOUND"}
      </div>
      <div className="flex-1">
        {dataDone ? <OrderList title="DONE" data={dataDone} onClick={(index: number) => onAccept(dataDone[index])} /> : "NOT FOUND"}
      </div>
    </div>
  );
}
