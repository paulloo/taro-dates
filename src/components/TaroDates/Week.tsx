import Taro from '@tarojs/taro';

import { View } from '@tarojs/components';
import classnames from 'classnames';
import AtComponent from '../../common/component';

interface WeekProps {
}

interface WeekState {
}

export default class Week extends AtComponent<WeekProps, WeekState> {
    constructor(props: WeekProps) {
        super(props);
        this.state = {
        };
    }

    public render(): JSX.Element {
        const { children } = this.props;
        return (
            <View className={classnames(
                'cal-week'
            )}
            >
                {children}
            </View>
        );
    }
}

