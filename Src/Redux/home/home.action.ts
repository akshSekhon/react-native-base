import * as Api from '../../Services/Networking';
import { isFalsy } from '../../Utils';
import { ActivePot, ActivePotList, BuyTicketParams, BuyTicketRespons, DepositFunds, GetActivePotsParams, GetTransactionParams, HomeResponse, MyOrderHistoryList, OngoingPotItem, OrderHistoryParams, PotDetailRespons, TransactionItem, TransactionList } from './home.entity';


export const apiReqFetchHomeData = async () => {
    try {
        const result = await Api.apiRequest<HomeResponse>('GET', Api.authUrl.home)
        // const result = await Api.apiRequest<ActiveChatResponse>('GET', Api.clientUrl.active_Chat_listing + `?search=${prm?.search ?? ''}&phoneNumbers=${prm?.phoneNumbers ?? []}&pageNumber=${prm?.pageNumber ?? 1}&pageSize=${prm?.pageSize ?? 20}`);
        console.log('apiReqFetchHomeData result :--', JSON.stringify(result));
        if (result.success) {
            return result
        } else {
            return result
        }

    } catch (error: any) {
        console.log('eroorr apiReqFetchHomeData error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}

export const apiReqFetchActivePots = async (prm?: GetActivePotsParams) => {
    const forYouType = `&forYouType=${prm?.forYouType ?? ''}`
    try {
        const result = await Api.apiRequest<ActivePotList>('GET', Api.authUrl.pots + `?search=${prm?.search ?? ''}&winner_result=${prm?.winner_result ?? ''}&status=${prm?.status ?? ''}&fromDate=${prm?.fromDate ?? ''}&toDate=${prm?.toDate ?? ''}&minTicketsAvailable=${prm?.minTicketsAvailable ?? ''}&maxTicketsAvailable=${prm?.maxTicketsAvailable ?? ''}&minPriceRange=${prm?.minPriceRange ?? ''}&minPriceRange=${prm?.minPriceRange ?? ''}&pageNumber=${prm?.pageNumber ?? 1}&pageLimit=${prm?.pageLimit ?? 10}` + forYouType)
        // const result = await Api.apiRequest<ActiveChatResponse>('GET', Api.clientUrl.active_Chat_listing + `?search=${prm?.search ?? ''}&phoneNumbers=${prm?.phoneNumbers ?? []}&pageNumber=${prm?.pageNumber ?? 1}&pageSize=${prm?.pageSize ?? 20}`);
        console.log('apiReqFetchActivePots result :--', result);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqFetchActivePots error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}

export const apiReqFetchPotDetail = async (id:string) => {
    try {
        const result = await Api.apiRequest<PotDetailRespons>('GET', `${Api.authUrl.pots}/${id}`)
        // const result = await Api.apiRequest<ActiveChatResponse>('GET', Api.clientUrl.active_Chat_listing + `?search=${prm?.search ?? ''}&phoneNumbers=${prm?.phoneNumbers ?? []}&pageNumber=${prm?.pageNumber ?? 1}&pageSize=${prm?.pageSize ?? 20}`);
        console.log('apiReqFetchPotDetail result :--', result);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqFetchPotDetail error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}


export const apiReqBuyTicket = async (parmas:BuyTicketParams) => {
    try {
        const result = await Api.apiRequest<Array<BuyTicketRespons>>('POST', Api.authUrl.buyTickets, parmas)
        // const result = await Api.apiRequest<ActiveChatResponse>('GET', Api.clientUrl.active_Chat_listing + `?search=${prm?.search ?? ''}&phoneNumbers=${prm?.phoneNumbers ?? []}&pageNumber=${prm?.pageNumber ?? 1}&pageSize=${prm?.pageSize ?? 20}`);
        console.log('apiReqBuyTicket result :--', result);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqBuyTicket error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}

export const apiReqFetchPotTransactions = async (id: string) => {
    try {
        const result = await Api.apiRequest<ActivePot>('GET', `${Api.authUrl.getAllRransactions}/${id ?? ''}`)
        // const result = await Api.apiRequest<ActiveChatResponse>('GET', Api.clientUrl.active_Chat_listing + `?search=${prm?.search ?? ''}&phoneNumbers=${prm?.phoneNumbers ?? []}&pageNumber=${prm?.pageNumber ?? 1}&pageSize=${prm?.pageSize ?? 20}`);
        console.log('apiReqFetchPotTransactions result :--', result);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqFetchPotTransactions error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}

export const apiReqFetchAllTransactions = async <T>(prm?: GetTransactionParams) => {
    
    try {
        const result = await Api.apiRequest<TransactionList>('GET', Api.authUrl.getAllRransactions + `?search=${prm?.search ?? ''}&transactionType=${prm?.transactionType ?? ''}&status=${prm?.status ?? ''}&fromDate=${prm?.fromDate ?? ''}&toDate=${prm?.toDate ?? ''}&pageNumber=${prm?.pageNumber ?? 1}&pageLimit=${prm?.pageLimit ?? 10}`)
        // const result = await Api.apiRequest<ActiveChatResponse>('GET', Api.clientUrl.active_Chat_listing + `?search=${prm?.search ?? ''}&phoneNumbers=${prm?.phoneNumbers ?? []}&pageNumber=${prm?.pageNumber ?? 1}&pageSize=${prm?.pageSize ?? 20}`);
        console.log('apiReqFetchAllTransactions result :--', JSON.stringify(result));
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqFetchAllTransactions error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}

export const apiReqFetchTransactionDetail = async <T>(id?: string) => {
    try {
        const result = await Api.apiRequest<T>('GET', `${Api.authUrl.getAllRransactions}/${id ?? ''}`)
        // const result = await Api.apiRequest<ActiveChatResponse>('GET', Api.clientUrl.active_Chat_listing + `?search=${prm?.search ?? ''}&phoneNumbers=${prm?.phoneNumbers ?? []}&pageNumber=${prm?.pageNumber ?? 1}&pageSize=${prm?.pageSize ?? 20}`);
        console.log('apiReqFetchTransactionDetail result :--', result);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqFetchTransactionDetail error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}
export const apiReqFetchAllOrders = async <T>(prm?: OrderHistoryParams) => {

    try {
        const result = await Api.apiRequest<MyOrderHistoryList>('GET', Api.authUrl.myorders + `?search=${prm?.search ?? ''}&status=${prm?.status ?? ''}&fromDate=${prm?.fromDate ?? ''}&toDate=${prm?.toDate ?? ''}&minPriceRange=${prm?.minPriceRange ?? ''}&maxPriceRange=${prm?.maxPriceRange ?? ''}&pageNumber=${prm?.pageNumber ?? 1}&pageLimit=${prm?.pageLimit ?? 10}`)
        // const result = await Api.apiRequest<ActiveChatResponse>('GET', Api.clientUrl.active_Chat_listing + `?search=${prm?.search ?? ''}&phoneNumbers=${prm?.phoneNumbers ?? []}&pageNumber=${prm?.pageNumber ?? 1}&pageSize=${prm?.pageSize ?? 20}`);
        console.log('apiReqFetchPotDetail result :--', result);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqFetchPotDetail error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}


export const apiReqDepositFunds = async (parmas: { amountToBePaid:number}) => {
    try {
        const result = await Api.apiRequest<DepositFunds>('POST', Api.authUrl.depositFunds, parmas)
        console.log('apiReqDepositFunds result :--', result);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqDepositFunds error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}

export const apiReqWithdrawFunds = async (parmas: { amountToBePaid: number, walletAddress:string }) => {
    try {
        const result = await Api.apiRequest<DepositFunds>('POST', Api.authUrl.withdrawFunds, parmas)
        console.log('apiReqWithdrawFunds result :--', result);
        if (result.success) {
            return result
        } else {
            return result
        }
    } catch (error: any) {
        console.log('eroorr apiReqWithdrawFunds error :--[', JSON.stringify(error));
        throw new Error(error);
    }
}