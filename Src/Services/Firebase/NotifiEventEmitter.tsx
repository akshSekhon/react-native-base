import { EventEmitter } from 'events';
import { NotificationDataType, Notifi_CAllingData } from './notification.types';

// const notifiEventEm = new EventEmitter()

interface EventPayloads {
    newNotificationReceive: NotificationDataType;
    // AnotherEvent: string; // Example of another event
}


// Extend EventEmitter to create a typed emitter
class TypedEventEmitter<T> extends EventEmitter {
    emit<K extends keyof T>(event: K, payload: T[K]): boolean {
        return super.emit(event as string, payload);
    }

    on<K extends keyof T>(event: K, listener: (payload: T[K]) => void): this {
        return super.on(event as string, listener);
    }

    off<K extends keyof T>(event: K, listener: (payload: T[K]) => void): this {
        return super.off(event as string, listener);
    }
    removeListener<K extends keyof T>(event: K, listener: (payload: T[K]) => void): this {
        return super.removeListener(event as string, listener);
    }
    
}
export const notifiEventEmitter = new TypedEventEmitter<EventPayloads>();

// export default notifiEventEmitter;