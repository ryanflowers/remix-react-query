import { Status } from "./useFetchOrderStatus";

export const queryStatusOrder = async (status: Status): Promise<any> => {
    console.log("GET", status)
    const response = await fetch(
        `http://localhost:3001/order?statusOrder=${status}`
    );

    return response.json();
};