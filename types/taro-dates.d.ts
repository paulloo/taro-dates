
import { CommonEventFunction, BaseEventOrig } from "@tarojs/components/types/common"
import { Dayjs } from 'dayjs'
import AtComponent from './base'

declare type InputFunction<T extends string | number, U = any, R = void> = (
  value: T,
  event?: BaseEventOrig<U>
) => R

declare type InputBaseEventDetail = {
  /** 输入值 */
  value: string | number
}

export interface TaroDateProps extends AtComponent {

    /**
     * 出发日期
     */
    startDate: Dayjs;
    /**
     * 到达日期
     */
    endDate: Dayjs | null;
    block: boolean;
    cycle: string;
    firstDayOfWeek: number;
    weekDayFormat: string;
    fromTop: string;
    minimumNights: number;
    numberOfMonths: number;
    keepOpenOnDateSelect: boolean;
    disabled: boolean;
    orientation: string;
    phrases: any;
    enableOutsideDays: boolean;
    isOutsideDay: boolean;

    isSingle: boolean;
    focusedInput: string;
    getMinNightsForHoverDate: any;
    isDayHighlighted: any;
    isReserveOfDay: any;
    onBlur: InputFunction<string | number, BlurEventDetail>;
    onClose: any;
    onFocusChange: any;
    onDatesChange: any;
    isDayBlocked: any;
    isOutsideRange: any;
    startDateOffset?: any;
    endDateOffset?: any;
    initialVisibleMonth?: any;
}

export interface TaroDateState {
  endDateState: any;
  months: any;
  hoverDate: any;
  visibleDays: any;
  currentMonth: any;
  intoView: string;
  phrasesState: any;
  dateOffset: any;
}


export declare type BlurEventDetail = InputBaseEventDetail
