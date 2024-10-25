import {json, LoaderFunction} from 'remix';
import {Status, OrderDataProps} from '~/services/queries/useFetchOrderStatus';
import useUpdateOrder from '~/services/mutations/useUpdateOrder';
import { dehydrate, QueryClient } from 'react-query';
import { ToDoOrderListContainer } from '~/components/Order/ToDoOrderListContainer';
import { ProgressOrderListContainer } from '~/components/Order/ProgressOrderListContainer';
import { DoneOrderListContainer } from '~/components/Order/DoneOrderListContainer';
import { loader as toDoLoader } from '~/components/Order/ToDoOrderListContainer/loader';
import { loader as progressDoLoader } from '~/components/Order/ProgressOrderListContainer/loader';
import { loader as doneLoader } from '~/components/Order/DoneOrderListContainer/loader';

export const loader: LoaderFunction = async ({params}) => {
  const queryClient = new QueryClient()

  // Block the render until the queries are done to allow for SSR as remix does not stream components.
  // TODO: This is not ideal on the client side we need to find a way to only block the server side
  await Promise.all([
    toDoLoader({queryClient}), 
    progressDoLoader({queryClient}), 
    doneLoader({queryClient})
  ])

  return json({ dehydratedState: dehydrate(queryClient) })
}

export default function Index() {
  
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
      <ToDoOrderListContainer onAccept={onAccept}/>
      <ProgressOrderListContainer onAccept={onAccept}/>
      <DoneOrderListContainer onAccept={onAccept}/>
    </div>
  );
}
