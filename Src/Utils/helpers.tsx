import parsePhoneNumberFromString from 'libphonenumber-js';
import { useRef } from 'react';
import { Clipboard, Platform } from 'react-native';
import RNReactNativeHapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback';
// import Toast from 'react-native-simple-toast';
// import { StylesIOS } from 'react-native-simple-toast/lib/typescript/NativeSimpleToast';
import LightMode from '../Assets/Colors/LightMode';
import { toast, ToastOptions } from '@baronha/ting';
import ImageHelper from '../Assets/Gallery/ImageHelper';

export const showToastMessage = (props: ToastOptions) => {
    const saticOptions: ToastOptions = {
        title: props?.title,
        message: props?.message,
        // backgroundColor: LightMode.txt_black,
        // icon: props?.icon ?? { uri: ImageHelper.pngs.AppLogo },
        ...props
    }
    toast(saticOptions)
    // if (Platform.OS === 'ios') {
    //     Toast.show(message, duration, { backgroundColor: `#F5F5F5`, textColor: LightMode.txt_black, tapToDismissEnabled: true })
    // } else {
    //     Toast.show(message, duration, options);
    // }
}

export function isFalsy($false: any) {
    if ($false != null) {
        if (typeof $false == "string") $false = $false.trim();
        if (typeof $false == "object" && Object.keys($false).length === 0) $false = undefined;
    }
    let falsyvalues: any = ['', 0, '0', false, null, 'null', undefined, 'undefined'];
    return falsyvalues.includes($false);
}

export const normalizePhoneNumber = (phone: string): string | null => {
    const parsed = parsePhoneNumberFromString(phone);
    return parsed ? parsed.nationalNumber : null;
};

export const copyText = async (text: string, cb?: () => {}) => {
    Clipboard.setString(text);
    triggerVibretion()
    if (!!cb) {
        cb()
    }
    if (text && Platform.OS === 'ios') {
        const showTest = text?.length >= 100 ? `${text?.slice(0, 100)}...` : text
        Toast.show(`Copy to Clipboard\n ${showTest}`, Toast.SHORT, { backgroundColor: `#F5F5F5`, textColor: LightMode.black2, tapToDismissEnabled: true })
    }
};


export const triggerVibretion = (vibImpct: keyof typeof HapticFeedbackTypes = 'impactHeavy') => {
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };
    RNReactNativeHapticFeedback.trigger(vibImpct, options);
}



export function debounce(func: Function, delay: number) {
    const timeoutId = useRef<any>(null);

    return function (...args: any[]) {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
export function delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Function to get "time ago" format
export function timeAgo(date: Date) {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    if (secondsAgo < 60) return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minute${Math.floor(secondsAgo / 60) !== 1 ? 's' : ''} ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hour${Math.floor(secondsAgo / 3600) !== 1 ? 's' : ''} ago`;
    return `${Math.floor(secondsAgo / 86400)} day${Math.floor(secondsAgo / 86400) !== 1 ? 's' : ''} ago`;
}

export type GetDateTypes = 'today' | 'thisWeek' | 'thisMonth' | 'previousMonth' | 'thisyear' | 'lastYear' | ''

export function getStartDateByDays(filterType: GetDateTypes) {
    const now = new Date();

    switch (filterType) {
        case "today":
            // Start of the current week
            // const today = new Date(now.getDate());

            return now;

        case "thisWeek":
            // Start of the current week
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
            return startOfWeek;

        case "thisMonth":
            // Start of the current month
            return new Date(now.getFullYear(), now.getMonth(), 1);

        case "previousMonth":
            // Start of the previous month
            const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            return previousMonth;

        case "thisyear":
            // Start of the current year
            return new Date(now.getFullYear(), 0, 1);

        case "lastYear":
            // Start of the last year
            return new Date(now.getFullYear() - 1, 0, 1);

        default:
            return ''

        // throw new Error("Invalid filter type. Use 'week', 'month', 'year', 'previousMonth', or 'lastYear'.");
    }
}

const formatText = (text: string, includePoint: boolean) => {
    // Replace non-numeric characters and format as number
    if (includePoint) {
        return text.replace(/[^0-9.]/g, "");
    } else {


    }
};

export const formatForNumber = (text: string, removePoints: boolean = false, maxLength: number = 15, pointsuffix: number = 4) => {
    if (!text) {
        return;
    }

    if (removePoints) {
        // Remove all non-numeric characters
        let formattedText = text.replace(/[^0-9]/g, "");

        // Limit the length of the formattedText
        if (formattedText.length > maxLength) {
            formattedText = formattedText.slice(0, maxLength); // Truncate if length exceeds maxLength
        }

        return formattedText;
    } else {
        // Replace any character that's not a digit or a decimal point
        let formattedText = text.replace(/[^0-9.]/g, "");

        // Ensure only one decimal point is allowed
        if ((formattedText.match(/\./g) || []).length > 1) {
            formattedText = formattedText.replace(/\.+$/, ""); // Remove extra decimal points
        }

        // Limit to the specified number of digits after the decimal point
        const parts = formattedText.split(".");
        if (parts[1]) {
            parts[1] = parts[1].slice(0, pointsuffix); // Limit digits after the decimal point
            formattedText = parts.join(".");
        }

        // Limit the total length of the string
        if (formattedText.length > maxLength) {
            formattedText = formattedText.slice(0, maxLength); // Truncate if length exceeds maxLength
        }

        return formattedText;
    }
};
export function formatToCamelCase(text: string): string {
    if (typeof text !== 'string' || !text?.trim()) {
        console.log('Invalid input: Please provide a non-empty string.');
        return '';
    }

    return text
        .toLowerCase() // Convert the string to lowercase
        .split(' ') // Split the string into words
        .map((word, index) =>
            index === 0
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize each word except the first
        )
        .join(''); // Join the words without spaces
}