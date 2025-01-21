import io, { Socket } from 'socket.io-client';
import { Socket_Event } from './Types';
// import { setLastSeenOfUsersIntoRedux, setOnlineUsersIntoRedux } from '../../../Redux/chats/chats.action';
import { isFalsy } from '../../../Utils';


export type SocketType = 'AI' | 'NODE'


// export let socketInstance: Socket | null = null;

// export let socketInstances: { [key in SocketType]?: Socket | null } = {};
export let socketInstances: { [key in SocketType]?: Socket | null } = {};

class SocketManager<T extends Record<string, any>> {
  private socket: Socket | null = null;

  initializeSocket = (socketUrl: string, socketType: SocketType = 'NODE'): void => {
    try {

      console.log(`Initializing socket for ${socketType}`, this.socket);
      // Check if a socket already exists for the provided socketUrl
      if (!isFalsy(socketInstances[socketType])) {
        console.log(`Socket already initialized for ${socketType} at ${socketUrl}`);
        return;
      }

      this.socket = io(socketUrl);
      console.log(`Initialized socket ${socketType} socket`, this.socket);

      socketInstances[socketType] = this.socket;

      this.socket.on('connect', () => {
        console.log(`===== Socket connected to ${socketType} ===== socketid is ${this.socket?.id}`);

      });

      this.socket.on('disconnect', () => {
        console.log(`===== Socket disconnected from ${socketType} ===== socketid is ${this.socket?.id} =====`, this.socket);
      });

      this.socket.on('destroy', () => {
        console.log(`===== Socket destroyed for ${socketType} ===== socketid is ${this.socket?.id} =====`, this.socket);
      });

      this.socket.on('socketError', (err: Error) => {
        console.log(`===== Socket connection error for ${socketType} socketid is ${this.socket?.id}: ===== `, err);
      });

      this.socket.on('parameterError', (err: Error) => {
        console.log(`===== Socket parameter error for ${socketType} socketid is ${this.socket?.id} : ===== `, err);
      });

      this.socket.on('error', (error: Error) => {
        console.log(`===== Socket error for ${socketType} socketid is ${this.socket?.id} : ===== `, error);
      });
      // Add your listeners and emitters for specific events as needed
      this.socket.on('active_users', (res) => {
        // setOnlineUsersIntoRedux(res as OnlineUserItem);
      });

      this.socket.emit('active_users', undefined, (res) => {
        console.log(`===== emit active_users callback from ${socketType} socketid is ${this.socket?.id} ===== `, res);
        // setOnlineUsersIntoRedux(res as OnlineUserItem);
      });


      // MARK: -- Users becomes online on platform Listener
      this.socket.on(`active_users`, (res) => {
        console.log(`===== active_users listener from ${socketType} socketid is ${this.socket?.id} ===== `, res);
        // setOnlineUsersIntoRedux(res as OnlineUserItem)
      })

      // MARK: -- Users becomes online on platform Emitter
      this.socket.emit('active_users', undefined, (res) => {
        console.log(`===== emit active_users  callback from ${socketType} ===== socketid is ${this.socket?.id} ====== `, res);
        // setOnlineUsersIntoRedux(res as OnlineUserItem)
      })

      // MARK: -- Last Seen of Users Listener
      this.socket.on(`inactive_users`, (res) => {
        console.log(`===== inactive_users usersfrom ${socketType} ===== socketid is ${this.socket?.id} ====== `, res);
        // setLastSeenOfUsersIntoRedux(res as OnlineUserItem)
      })


    } catch (error) {
      console.log(`===== Error initializing socket for ${socketType}: ===== ${this.socket?.id} ====== `, error);
    }
  };

  emit<K extends keyof T>(
    event: K,
    data: T[K]['request'],
    socketType: SocketType = 'NODE',
  ): void {
    const socket = socketInstances[socketType];
    if (socket) {
      socket.emit(event as string, data);
    }
  }
  emitWithCB<K extends keyof T>(
    event: K,
    data: T[K]['request'],
    cb?: (response: T[K]['response']) => void,
    socketType: SocketType = 'NODE',
  ): void {
    const socket = socketInstances[socketType];
    if (socket) {
      socket.emit(event as string, data, cb);
    }
  }

  on<K extends keyof T>(
    event: K,
    cb: (data: T[K]['response']) => void,
    socketType: SocketType = 'NODE',
  ): void {
    const socket = socketInstances[socketType];
    socket?.on(event as string, cb);
  }

  off<K extends keyof T>(listenerName: K, socketType: SocketType): void {
    const socket = socketInstances[socketType];
    socket?.off(listenerName as string);
  }

  removeListener<K extends keyof T>(listenerName: K, socketType: SocketType = 'NODE'): void {
    const socket = socketInstances[socketType];
    socket?.removeListener(listenerName as string);
  }

  removeAllListeners(socketType: SocketType = 'NODE'): void {
    const socket = socketInstances[socketType];
    socket?.removeAllListeners();
  }

  disconnectSocket(socketType: SocketType = 'NODE'): void {
    const socket = socketInstances[socketType];
    socket?.removeAllListeners();
    socket?.disconnect();
    delete socketInstances[socketType];
  }

  destroySocket(socketType: SocketType = 'NODE'): void {
    const socket = socketInstances[socketType];
    socket?.close(); // close is preferred over destroy
    socketInstances[socketType] = null;
  }

  hasListeners<K extends keyof T>(event: K, socketType: SocketType = 'NODE'): boolean {
    const socket = socketInstances[socketType];
    return socket?.hasListeners(event as string) || false;
  }
}
const socket = new SocketManager<Socket_Event>();

export default socket