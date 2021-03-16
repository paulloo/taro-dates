import React, { Component } from 'react';
import Taro, { Config, getCurrentInstance } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import _difference from 'lodash/difference';
import _fill from 'lodash/fill';
import _omit from 'lodash/omit';
import dayjs from 'dayjs';
// import TaroDates from '../../components/TaroDate';
// import TaroDates from '../../components/TaroDate';
import TaroDate from '../../components/TaroDates'
import { DayPickerPhrases } from '../../components/TaroDates/utils/defaultPhrases';
import isInclusivelyAfterDay from '../../components/TaroDates/utils/isInclusivelyAfterDay';
import isAfterDay from '../../components/TaroDates/utils/isAfterDay';
import isBeforeDay from '../../components/TaroDates/utils/isBeforeDay';

import './index.scss'

interface IndexProps {
  dispatch: any;
  lineInfo: any;
  selectedDate: any;
}

const START_DATE = 'startDate';
// const END_DATE = 'endDate';
const WEEK_DAY = 'dd';
interface IndexState {
  focusedInput: any;
  startDate: any;
  endDate: any;
  cycle: any;
  stateDateWrapper: any;
  isDateRangePickerInputFocused: boolean;
  isDayPickerFocused: boolean;
  hoverDate: any;
  visibleDays: any;
  saleDays: number;
  isSingle: boolean;
  datePickType: String;
  topNoticeForCal: String;
  reserveDays: number;

}
export default class Index extends Component<IndexProps, IndexState> {
    $instance = getCurrentInstance();



    constructor(props: IndexProps) {
      super(props);
      const params = this.$instance.router.params;
      console.log("params: ", params)
      this.state = {
        isSingle: !(params.round && params.round === '1'),
        // isSingle: false,s
        datePickType: params.picktype || 'start',
        hoverDate: null,
        visibleDays: null,
        focusedInput: START_DATE,
        startDate: params.start? dayjs(params.start): dayjs(),
        endDate: null,
        cycle: params.cycle || '0',
        saleDays: params.saleDays? Number(params.saleDays): 0,
        reserveDays: params.reserveDays? Number(params.reserveDays): 0,
        stateDateWrapper: date => date,
        isDateRangePickerInputFocused: false,
        isDayPickerFocused: false,

        topNoticeForCal: '测试顶部公告栏....'
      }
    }

    componentWillMount () { }

    componentDidMount () { 
      
     }

    componentWillUnmount () { }

    /**
      * 指定config的类型声明为: Taro.Config
      *
      * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
      * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
      * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
      */
    config: Config = {
      navigationBarTitleText: '首页'
    }

    componentDidShow () { }

    componentDidHide () { }

    onFocusChange(focusedInput) {
        this.setState({
            focusedInput: !focusedInput ? START_DATE : focusedInput,
        });

    }

    onDatesChange({ startDate, endDate }) {
        // console.group(startDate, endDate)
        const { stateDateWrapper } = this.state;

        this.setState({
            startDate: startDate && stateDateWrapper(startDate),
            endDate: endDate && stateDateWrapper(endDate),
        });
    }

    onDayPickerBlur(day) {
      const { startDate, endDate } = day
        console.log("onDayPickerBlur: ", startDate && startDate.format('YYYY-MM-DD'))
        console.log("onDayPickerBlur: ", endDate && endDate.format('YYYY-MM-DD'))
        this.setState({
            isDateRangePickerInputFocused: true,
            isDayPickerFocused: false,
            // showKeyboardShortcuts: false,
        });
    }

    onDayClose(day) {
        const { lineInfo, selectedDate } = this.props;
        const { isSingle, datePickType } = this.state;
        if(selectedDate && datePickType === 'end') {
            if(isBeforeDay(day.startDate, selectedDate.startDate)) {
                return;
            }
            day.endDate = day.startDate
            day.startDate = selectedDate.startDate
        }
        // debugger
        // setTimeout(() => {
        //   Taro.pageScrollTo({
        //     // selector: '.cal-week-monthes',
        //     scrollTop: 100,
        //     duration: 3000
        //   })
        // }, 100)
        // 两种情况   一、不是往返票  二、是往返票但没选择返程日期
        // if(lineInfo && datePickType === 'start' && !day.endDate) {
        //     day.endDate = null;
        //     let from = lineInfo.departureCity
        //     let to = lineInfo.arriveCity
        //     Taro.redirectTo({
        //         url: `/Views/List/Index?start=${day.startDate && day.startDate.format('YYYY-MM-DD')}&end=${day.endDate && day.endDate.format('YYYY-MM-DD') || ''}&from=${from}&to=${to}`
        //     })
        // } else {
        //     Taro.navigateBack();
        // }
        console.log(day)
        // this.props.dispatch({type: 'Calendar/setState', payload: {selectedDate: day}})
        
    }

    /**
     * 禁用指定日期
     * @param day 
     */
    outSideRangeHandler(day) {
   
        const { cycle, saleDays } = this.state;
        let _cycle = [1,2,3,4,5,6,7];
        var _cycleFormat = cycle
        if(cycle !== '0') {
            if(cycle.length === 1) {
                _cycleFormat = [parseInt(cycle)]
            } else if(cycle.indexOf(';') > -1) {
                _cycleFormat = cycle.split(';')
            }
            _cycleFormat = _cycleFormat.map(item => parseInt(item))
            _cycle = _difference(_cycle, _cycleFormat)
        } else {
            _cycle = []
        }
     

        if(_cycle.indexOf(7) > -1) {
            _cycle = _fill(_cycle, 0, _cycle.indexOf(7))
        }
        return !isInclusivelyAfterDay(day, dayjs()) || isAfterDay(day, dayjs().add(saleDays - 1, 'day')) || _cycle.includes(day.day())

    }

    /**
     * 指定日期高亮
     * @param day 
     */
    dayHighLightedHandler(day) {
        // if(!day) return false;
        // if(day.format("YYYY-MM-DD") === '2019-09-02') {
        //     return true;
        // }
        return false

    }

    dayBlockedHandler(day) {
        if(!day) return false;
        
        const { lineInfo, selectedDate } = this.props;
        const { isSingle, datePickType } = this.state;
        if(selectedDate && datePickType === 'end' && isBeforeDay(day, selectedDate.startDate)) {
            return true
        }
        if(day.format("YYYY-MM-DD") === '2020-10-10') {
            return true
        }

        return false
    }

    reserveOfDayHandler(day) {
      const { saleDays, reserveDays } = this.state
      return isAfterDay(day, dayjs().add(saleDays - reserveDays, 'day')) && isBeforeDay(day, dayjs().add(saleDays + 1, 'day'))
    }

    // ?start=2020-03-30&end=&from=烟台&to=大连&round=1&cycle=0&saleDays=32&reserveDays=12&picktype=start
    render () {
      const {
        isSingle,
        focusedInput,
        startDate,
        endDate,
        cycle,
        topNoticeForCal,
        // isDateRangePickerInputFocused
        saleDays
      } = this.state;
      const props = _omit(this.props, [
          'autoFocus',
          'autoFocusEndDate',
          'initialStartDate',
          'initialEndDate',
      ]);

      const {
      } = this.props;
      const numOfMonth = Math.ceil((saleDays + dayjs().date()) / 30);
      return (
        <View className='index-wrp'>
          <TaroDate
            block
            fromTop={Taro.pxTransform(0)}
            isSingle={isSingle}
            startDate={startDate}
            endDate={endDate}
            cycle='1;3;5;'
            disabled={false}
            firstDayOfWeek={0}
            weekDayFormat={WEEK_DAY}

            numberOfMonths={numOfMonth}

            // 至少要选择几天区间 不连当天
            minimumNights={0}
            getMinNightsForHoverDate={() => 0}
            orientation='verticalScrollable'
            keepOpenOnDateSelect={false}
            phrases={DayPickerPhrases}
            // isFocused={isDateRangePickerInputFocused}

            enableOutsideDays={false}

            isOutsideDay={false}

            focusedInput={focusedInput}
            isOutsideRange={this.outSideRangeHandler.bind(this)}
            isDayHighlighted={this.dayHighLightedHandler.bind(this)}
            isDayBlocked={this.dayBlockedHandler.bind(this)}
            isReserveOfDay={this.reserveOfDayHandler.bind(this)}
            onDatesChange={this.onDatesChange.bind(this)}
            onFocusChange={this.onFocusChange.bind(this)}
            onBlur={this.onDayPickerBlur.bind(this)}
            onClose={this.onDayClose.bind(this)}
          ></TaroDate>
        </View>
      )
    }
}
