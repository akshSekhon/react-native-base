import { networking } from "../../.."
import { isFalsy } from "../../../Utils"
import socket, { socketInstances } from "./socket"

export const connectSocket = (_id: string) => {
    console.log('Splash screen useEffect socketInstance :---', socketInstances?.NODE?.connected)
    console.log('Splash screen useEffect userData:---', _id)

    if (!isFalsy(_id)) {
        const socketUri = `${networking.BaseUrl_Socket_NODE}?access_token=${_id}`
        console.log('Splash screen useEffect socketUri:---', socketUri)
        console.log('socketUri :---', socketUri);
        if (!socketInstances.NODE?.connected) {
            socket.initializeSocket(socketUri)
        }
        if (!socketInstances.AI?.connected) {
            socket.initializeSocket(networking.BaseUrl_Socket_AI, 'AI')
        }
        // setTimeout(() => {
        // }, 100);
    }
}