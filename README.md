
app.scss
```
@import '~taro-dates/dist/style/taro-dates.scss';
```

```

import TaroDates from 'taro-dates'
import { DayPickerPhrases } from 'taro-dates/dist/weapp/components/TaroDates/utils/defaultPhrases';
import isInclusivelyAfterDay from 'taro-dates/dist/weapp/components/TaroDates/utils/isInclusivelyAfterDay';
import isAfterDay from 'taro-dates/dist/weapp/components/TaroDates/utils/isAfterDay';
import isBeforeDay from 'taro-dates/dist/weapp/components/TaroDates/utils/isBeforeDay';
```

```
<View className='index-wrp'>
    <TaroDates
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
    ></TaroDates>
</View>
```
