import Taro from '@tarojs/taro';

import { View } from '@tarojs/components';
import dayjs from 'dayjs';
import classnames from 'classnames';
import getCalendarMonthWeeks from './utils/getCalendarMonthWeeks';
import toISODateString from './utils/toISODateString';
import Week from './Week';
import Day from './Day';
import AtComponent from '../../common/component';

interface MonthProps {
    month: any;
    isSingle: boolean;
    onDayMouseEnter: any;
    onDayMouseLeave: any;
    onDayClick: any;
    modifiers: any;
    initialVisibleMonth: any;
    firstDayOfWeek: number;
    phrases: any;
}

interface MonthState {
}

export default class Month extends AtComponent<MonthProps, MonthState> {
    constructor(props: MonthProps) {
        super(props);

    }

    public render(): JSX.Element {
      
        const {
            onDayMouseEnter,
            onDayMouseLeave,
            onDayClick,
            modifiers,
            phrases,
            month,
            isSingle,
            firstDayOfWeek
        } = this.props;
        const dayString = day => {
            return toISODateString(day, '') || ''
        };
        let weeks = []
        if(month) {
            weeks = getCalendarMonthWeeks(
                month,
                false,
                firstDayOfWeek == null ? dayjs().startOf('week').day() : firstDayOfWeek,
            )
        }

        return (
            <View className={classnames(
                'cal-month'
            )}
            >
                {
                    weeks && weeks.length && weeks.map((week, i) => {
                        return (
                            <Week key={week}>
                                {week && week.length && week.map((day, dayOfWeek) => {
                                    return (
                                        <Day
                                          key={day}
                                          day={day}
                                          isSingle={isSingle}
                                          isOutsideDay={!day || day.month() !== month.month()}
                                          phrases={phrases}
                                          modifiers={modifiers[dayString(day)]}
                                          onDayMouseEnter={onDayMouseEnter}
                                          onDayMouseLeave={onDayMouseLeave}
                                          onDayClick={onDayClick}
                                        ></Day>
                                    )
                                })}
                            </Week>
                        )
                    })
                }

            </View>
        );
    }
}

