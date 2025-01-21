import ImageHelper from "../Assets/Gallery/ImageHelper";
import strings from "../Assets/Languages";
import { RouteParamList } from "../Navigations/routes.type";
import { Socket_Event } from "../Services/Networking/SocketHandler/Types";

export interface SettingListItem { _id: number, label: string, icon: SVGComponent, icon_Selected: SVGComponent, navDesti?: keyof RouteParamList }

export interface ChatOptionsItem {
    _id: number,
    label: string,
    icon: SVGComponent,
    soket_event_key: keyof Socket_Event | undefined,
    optionsArr?: any,
    selectedOption?: { _id: number, title: string }
    //    icon_Selected: SVGComponent,
}

export const getSettingListArr = (lang: typeof strings): SettingListItem[] => {
    return [
    ];

}

export default { getSettingListArr }