import Taro from '@tarojs/taro'
import './style/taro-dates.scss'
Taro.initPxTransform({ designWidth: 750, deviceRatio: {} })

export { default as TaroDates } from './components/TaroDates'