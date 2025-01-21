
export interface SocketRespons<T> {
    status: number;
    message?: string,
    error?: string,
    data?: T
}

export type MediaTypes = {
    message: 1
    image: 2,
    video: 3,
    audio: 4,
}

export interface EmitNewMessage {
    toUserId: string
}



export type Socket_Event = {
    private_message: {
        request?: EmitNewMessage;
        response?: SocketRespons<any>;
    }

};