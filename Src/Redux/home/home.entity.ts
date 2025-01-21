import { string } from "yup";
import { UserDetailEntity, UserState } from "../user/user.entity";

export interface BuyTicketParams {
    potId: string;
    ticketCount: number;
}


export interface GetReqResponseBase {
    NumberOfItems?: number;
    // pageNumber?: string;
    // pageSize?: string;
}

export interface GetRequestParamsBase {
    search?: string
    pageNumber?: number
    pageLimit?: number
}
export type TransactionType = "deposit" | 'withdraw' | 'ticketBuy' | 'ticketWithdraw' | ''

export type TransactionStatus = 'Pending' | 'Success' | 'Failed' | ''
// export type OrderStatus = 'complete' | 'active'
export type WinnerResultType = 'manual' | 'automatic' | ''
export type PotStatus = 'completed' | 'active';

export type ForYouType = 'lastChance'| 'sizzlingHot'| 'grandWins'| 'inAction' | ''
export interface GetActivePotsParams extends GetRequestParamsBase {
    status?: PotStatus
    winner_result?: WinnerResultType
    forYouType?: ForYouType | undefined
    fromDate?: Date | string
    toDate?: Date | string
    minTicketsAvailable?: number | undefined 
    maxTicketsAvailable?: number | undefined 
    minPriceRange?: number | undefined
    maxPriceRange?: number | undefined 
    isStarted?: boolean | undefined
}
export interface GetTransactionParams extends GetRequestParamsBase {
    status?: TransactionStatus
    fromDate?: Date | string
    toDate?: Date | string
    transactionType?: TransactionType | undefined
    
}

export interface OrderHistoryParams extends GetRequestParamsBase {
    status?: PotStatus | undefined
    fromDate?: Date | string
    toDate?: Date | string
    minPriceRange?: number | undefined
    maxPriceRange?: number | undefined 

}
// MARK:-- Actice Chat List Modals

export interface HomeResponse {
    bannerImage?: string;
    activePots?: ActivePot[];
    activeTickets?: OngoingPotItem[];
    specials?: SpecialsItem[]
}
export interface SpecialsItem{
    _id?:string
    title?:string,
    image?: string,
}
export interface PotDetailRespons {
    pot?: ActivePot
    transactions?: Array<TransactionItem>
}
export interface ActivePot {
    _id?: string;
    name?: string;
    description?: string;
    total_tickets?: number;
    remaining_tickets?: number;
    user_ticket_limit?: boolean;
    ticket_limit_per_user?: number;
    winner_result?: string;
    total_time?: number;
    min_tickets_before_start?: number;
    winner_percentage?: number;
    status?: PotStatus;
    buy_time?: string;
    total_amount: number;
    amount_per_ticket: number;
    locked_tickets: number;
    createdAt?: Date;
    start_time?: Date;
    updatedAt?: Date;
    winner_id?: string;
    winnerInfo?: UserDetailEntity
    withdraw_status: TransactionStatus;
    __v?: number;
}
export interface TicketItem{
    _id: string
    potId: string,
    price_per_ticket:number|undefined
    purchaseTime:string| Date
}
export interface OngoingPotItem{
    _id: string
    potInfo?: ActivePot,
    tickets?: Array<TicketItem>
}
export interface TransactionItem extends CointPaymentData {
    _id: string,
    potId: string,
    userId: string,
    txnType: TransactionType,
    total_amount: number
    number_of_tickets: number
    status: TransactionStatus,
    createdAt: string,
    potInfo?:Array<ActivePot>

}
export interface MyOrderHistoryList extends GetReqResponseBase {
    historyTickets: Array<OngoingPotItem>,
}

export interface TransactionList extends GetReqResponseBase {
    transactions: Array<TransactionItem>,
}
export interface ActivePotList extends GetReqResponseBase {
    pots: Array<TransactionItem>,

}
export interface CointPaymentData {
    transactionStatus:TransactionStatus
    checkout_url?: string;
    status_url?: string;
    qrcode_url?: string;
    timeout: number
    confirms_needed: string
    address: string
    txn_id: string
    amount:string
}
export interface DepositFunds {
    amount:string
    txn_id:string
    address:string
    confirms_needed:string
    timeout:number
    checkout_url:string
    status_url:string
    qrcode_url:string
}

export interface BuyTicketRespons extends CointPaymentData {
    amount?: string;
    txn_id?: string;
    address?: string;
    confirms_needed?: string;
    timeout?: number;
}


