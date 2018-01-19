const _vux = {}

const isBrowser = typeof window !== 'undefined'
isBrowser && (window.vux = _vux)

import Style from '../styles/index.vue' // eslint-disable-line
import vuxActionsheet from 'src/components/actionsheet/index.vue'

_vux['vuxActionsheet'] = vuxActionsheet
import vuxAgree from 'src/components/agree/index.vue'

_vux['vuxAgree'] = vuxAgree
import vuxAjaxPlugin from 'src/plugins/ajax/index.js'

_vux['vuxAjaxPlugin'] = vuxAjaxPlugin
import vuxAlert from 'src/components/alert/index.vue'

_vux['vuxAlert'] = vuxAlert
import vuxAlertModule from 'src/plugins/alert/module'

_vux['vuxAlertModule'] = vuxAlertModule
import vuxAlertPlugin from 'src/plugins/alert/index.js'

_vux['vuxAlertPlugin'] = vuxAlertPlugin
import vuxAppPlugin from 'src/plugins/app/index.js'

_vux['vuxAppPlugin'] = vuxAppPlugin
import vuxArray2stringFilter from 'src/filters/array2String.js'

_vux['vuxArray2stringFilter'] = vuxArray2stringFilter
import vuxBadge from 'src/components/badge/index.vue'

_vux['vuxBadge'] = vuxBadge
import vuxbase64 from 'src/tools/base64/index.js'

_vux['vuxbase64'] = vuxbase64
import vuxBlur from 'src/components/blur/index.vue'

_vux['vuxBlur'] = vuxBlur
import vuxBox from 'src/components/box/index.vue'

_vux['vuxBox'] = vuxBox
import vuxBusPlugin from 'src/plugins/bus/index.js'

_vux['vuxBusPlugin'] = vuxBusPlugin
import vuxButtonTab from 'src/components/button-tab/button-tab.vue'

_vux['vuxButtonTab'] = vuxButtonTab
import vuxButtonTabItem from 'src/components/button-tab/button-tab-item.vue'

_vux['vuxButtonTabItem'] = vuxButtonTabItem
import vuxCalendar from 'src/components/calendar/index.vue'

_vux['vuxCalendar'] = vuxCalendar
import vuxCard from 'src/components/card/index.vue'

_vux['vuxCard'] = vuxCard
import vuxCell from 'src/components/cell/index.vue'

_vux['vuxCell'] = vuxCell
import vuxCellBox from 'src/components/cell-box/index.vue'

_vux['vuxCellBox'] = vuxCellBox
import vuxCellFormPreview from 'src/components/cell-form-preview/index.vue'

_vux['vuxCellFormPreview'] = vuxCellFormPreview
import vuxChecker from 'src/components/checker/checker.vue'

_vux['vuxChecker'] = vuxChecker
import vuxCheckerItem from 'src/components/checker/checker-item.vue'

_vux['vuxCheckerItem'] = vuxCheckerItem
import vuxCheckIcon from 'src/components/check-icon/index.vue'

_vux['vuxCheckIcon'] = vuxCheckIcon
import vuxChecklist from 'src/components/checklist/index.vue'

_vux['vuxChecklist'] = vuxChecklist
import vuxChinaAddressData from 'src/datas/china_address.json'

_vux['vuxChinaAddressData'] = vuxChinaAddressData
import vuxChinaAddressV2Data from 'src/datas/china_address_v2.json'

_vux['vuxChinaAddressV2Data'] = vuxChinaAddressV2Data
import vuxChinaAddressV3Data from 'src/datas/china_address_v3.json'

_vux['vuxChinaAddressV3Data'] = vuxChinaAddressV3Data
import vuxChinaAddressV4Data from 'src/datas/china_address_v4.json'

_vux['vuxChinaAddressV4Data'] = vuxChinaAddressV4Data
import vuxChinamobileTool from 'src/tools/validator/chinaMobile.js'

_vux['vuxChinamobileTool'] = vuxChinamobileTool
import vuxClickOutsideDirective from 'src/directives/click-outside/index.js'

_vux['vuxClickOutsideDirective'] = vuxClickOutsideDirective
import vuxClocker from 'src/components/clocker/index.vue'

_vux['vuxClocker'] = vuxClocker
import vuxCloseDialogsPlugin from 'src/plugins/close-dialogs/index.js'

_vux['vuxCloseDialogsPlugin'] = vuxCloseDialogsPlugin
import vuxColorPicker from 'src/components/color-picker/index.vue'

_vux['vuxColorPicker'] = vuxColorPicker
import vuxConfigPlugin from 'src/plugins/config/index.js'

_vux['vuxConfigPlugin'] = vuxConfigPlugin
import vuxConfirm from 'src/components/confirm/index.vue'

_vux['vuxConfirm'] = vuxConfirm
import vuxConfirmPlugin from 'src/plugins/confirm/index.js'

_vux['vuxConfirmPlugin'] = vuxConfirmPlugin
import vuxcookie from 'src/tools/cookie/index.js'

_vux['vuxcookie'] = vuxcookie
import vuxCountdown from 'src/components/countdown/index.vue'

_vux['vuxCountdown'] = vuxCountdown
import vuxCountup from 'src/components/countup/index.vue'

_vux['vuxCountup'] = vuxCountup
import vuxdateFormat from 'src/tools/date/format.js'

_vux['vuxdateFormat'] = vuxdateFormat
import vuxdateRange from 'src/tools/date/range.js'

_vux['vuxdateRange'] = vuxdateRange
import vuxDatetime from 'src/components/datetime/index.vue'

_vux['vuxDatetime'] = vuxDatetime
import vuxDatetimePlugin from 'src/plugins/datetime/index.js'

_vux['vuxDatetimePlugin'] = vuxDatetimePlugin
import vuxDatetimeRange from 'src/components/datetime-range/index.vue'

_vux['vuxDatetimeRange'] = vuxDatetimeRange
import vuxDatetimeView from 'src/components/datetime-view/index.vue'

_vux['vuxDatetimeView'] = vuxDatetimeView
import vuxdebounce from 'src/tools/debounce/index.js'

_vux['vuxdebounce'] = vuxdebounce
import vuxDemobasic from 'src/components/fullpage/DemoBasic.vue'

_vux['vuxDemobasic'] = vuxDemobasic
import vuxDemoindex from 'src/components/popover/DemoIndex.vue'

_vux['vuxDemoindex'] = vuxDemoindex
import vuxDevicePlugin from 'src/plugins/device/index.js'

_vux['vuxDevicePlugin'] = vuxDevicePlugin
import vuxDevTip from 'src/components/dev-tip/index.vue'

_vux['vuxDevTip'] = vuxDevTip
import vuxDivider from 'src/components/divider/index.vue'

_vux['vuxDivider'] = vuxDivider
import vuxDrawer from 'src/components/drawer/index.vue'

_vux['vuxDrawer'] = vuxDrawer
import vuxFlexbox from 'src/components/flexbox/flexbox.vue'

_vux['vuxFlexbox'] = vuxFlexbox
import vuxFlexboxItem from 'src/components/flexbox/flexbox-item.vue'

_vux['vuxFlexboxItem'] = vuxFlexboxItem
import vuxFlow from 'src/components/flow/flow.vue'

_vux['vuxFlow'] = vuxFlow
import vuxFlowLine from 'src/components/flow/flow-line.vue'

_vux['vuxFlowLine'] = vuxFlowLine
import vuxFlowState from 'src/components/flow/flow-state.vue'

_vux['vuxFlowState'] = vuxFlowState
import vuxFormatTimeFilter from 'src/filters/format-time.js'

_vux['vuxFormatTimeFilter'] = vuxFormatTimeFilter
import vuxFormPreview from 'src/components/form-preview/index.vue'

_vux['vuxFormPreview'] = vuxFormPreview
import vuxFriendlyTimeFilter from 'src/filters/friendly-time.js'

_vux['vuxFriendlyTimeFilter'] = vuxFriendlyTimeFilter
import vuxFullpage from 'src/components/fullpage/index.vue'

_vux['vuxFullpage'] = vuxFullpage
import vuxGrid from 'src/components/grid/grid.vue'

_vux['vuxGrid'] = vuxGrid
import vuxGridItem from 'src/components/grid/grid-item.vue'

_vux['vuxGridItem'] = vuxGridItem
import vuxGroup from 'src/components/group/index.vue'

_vux['vuxGroup'] = vuxGroup
import vuxGroupTitle from 'src/components/group-title/index.vue'

_vux['vuxGroupTitle'] = vuxGroupTitle
import vuxIcon from 'src/components/icon/index.vue'

_vux['vuxIcon'] = vuxIcon
import vuxInlineCalendar from 'src/components/inline-calendar/index.vue'

_vux['vuxInlineCalendar'] = vuxInlineCalendar
import vuxInlineDesc from 'src/components/inline-desc/index.vue'

_vux['vuxInlineDesc'] = vuxInlineDesc
import vuxInlineLoading from 'src/components/inline-loading/index.vue'

_vux['vuxInlineLoading'] = vuxInlineLoading
import vuxInlineXNumber from 'src/components/inline-x-number/index.vue'

_vux['vuxInlineXNumber'] = vuxInlineXNumber
import vuxInviewDirective from 'src/directives/inview/index.js'

_vux['vuxInviewDirective'] = vuxInviewDirective
import vuxLoading from 'src/components/loading/index.vue'

_vux['vuxLoading'] = vuxLoading
import vuxLoadingPlugin from 'src/plugins/loading/index.js'

_vux['vuxLoadingPlugin'] = vuxLoadingPlugin
import vuxLoadMore from 'src/components/load-more/index.vue'

_vux['vuxLoadMore'] = vuxLoadMore
import vuxLocalePlugin from 'src/plugins/locale/index.js'

_vux['vuxLocalePlugin'] = vuxLocalePlugin
import vuxMarquee from 'src/components/marquee/marquee.vue'

_vux['vuxMarquee'] = vuxMarquee
import vuxMarqueeItem from 'src/components/marquee/marquee-item.vue'

_vux['vuxMarqueeItem'] = vuxMarqueeItem
import vuxMasker from 'src/components/masker/index.vue'

_vux['vuxMasker'] = vuxMasker
import vuxmd5 from 'src/tools/md5/index.js'

_vux['vuxmd5'] = vuxmd5
import vuxMsg from 'src/components/msg/index.vue'

_vux['vuxMsg'] = vuxMsg
import vuxName2valueFilter from 'src/filters/name2value.js'

_vux['vuxName2valueFilter'] = vuxName2valueFilter
import vuxnumberComma from 'src/tools/number/comma.js'

_vux['vuxnumberComma'] = vuxnumberComma
import vuxnumberPad from 'src/tools/number/pad.js'

_vux['vuxnumberPad'] = vuxnumberPad
import vuxnumberRandom from 'src/tools/number/random.js'

_vux['vuxnumberRandom'] = vuxnumberRandom
import vuxnumberRange from 'src/tools/number/range.js'

_vux['vuxnumberRange'] = vuxnumberRange
import vuxNumberRoller from 'src/components/number-roller/index.vue'

_vux['vuxNumberRoller'] = vuxNumberRoller
import vuxPanel from 'src/components/panel/index.vue'

_vux['vuxPanel'] = vuxPanel
import vuxPicker from 'src/components/picker/index.vue'

_vux['vuxPicker'] = vuxPicker
import vuxPopover from 'src/components/popover/index.vue'

_vux['vuxPopover'] = vuxPopover
import vuxPopup from 'src/components/popup/index.vue'

_vux['vuxPopup'] = vuxPopup
import vuxPopupHeader from 'src/components/popup-header/index.vue'

_vux['vuxPopupHeader'] = vuxPopupHeader
import vuxPopupPicker from 'src/components/popup-picker/index.vue'

_vux['vuxPopupPicker'] = vuxPopupPicker
import vuxPopupRadio from 'src/components/popup-radio/index.vue'

_vux['vuxPopupRadio'] = vuxPopupRadio
import vuxPreviewer from 'src/components/previewer/index.vue'

_vux['vuxPreviewer'] = vuxPreviewer
import vuxQrcode from 'src/components/qrcode/index.vue'

_vux['vuxQrcode'] = vuxQrcode
import vuxquerystring from 'src/tools/querystring/index.js'

_vux['vuxquerystring'] = vuxquerystring
import vuxRadio from 'src/components/radio/index.vue'

_vux['vuxRadio'] = vuxRadio
import vuxRange from 'src/components/range/index.vue'

_vux['vuxRange'] = vuxRange
import vuxRater from 'src/components/rater/index.vue'

_vux['vuxRater'] = vuxRater
import vuxScroller from 'src/components/scroller/index.vue'

_vux['vuxScroller'] = vuxScroller
import vuxSearch from 'src/components/search/index.vue'

_vux['vuxSearch'] = vuxSearch
import vuxSelector from 'src/components/selector/index.vue'

_vux['vuxSelector'] = vuxSelector
import vuxShake from 'src/components/shake/index.vue'

_vux['vuxShake'] = vuxShake
import vuxSpinner from 'src/components/spinner/index.vue'

_vux['vuxSpinner'] = vuxSpinner
import vuxStep from 'src/components/step/step.vue'

_vux['vuxStep'] = vuxStep
import vuxStepItem from 'src/components/step/step-item.vue'

_vux['vuxStepItem'] = vuxStepItem
import vuxSticky from 'src/components/sticky/index.vue'

_vux['vuxSticky'] = vuxSticky
import vuxstringTrim from 'src/tools/string/trim.js'

_vux['vuxstringTrim'] = vuxstringTrim
import vuxSwipeout from 'src/components/swipeout/swipeout.vue'

_vux['vuxSwipeout'] = vuxSwipeout
import vuxSwipeoutButton from 'src/components/swipeout/swipeout-button.vue'

_vux['vuxSwipeoutButton'] = vuxSwipeoutButton
import vuxSwipeoutItem from 'src/components/swipeout/swipeout-item.vue'

_vux['vuxSwipeoutItem'] = vuxSwipeoutItem
import vuxSwiper from 'src/components/swiper/swiper.vue'

_vux['vuxSwiper'] = vuxSwiper
import vuxSwiperItem from 'src/components/swiper/swiper-item.vue'

_vux['vuxSwiperItem'] = vuxSwiperItem
import vuxTab from 'src/components/tab/tab.vue'

_vux['vuxTab'] = vuxTab
import vuxTabbar from 'src/components/tabbar/tabbar.vue'

_vux['vuxTabbar'] = vuxTabbar
import vuxTabbarItem from 'src/components/tabbar/tabbar-item.vue'

_vux['vuxTabbarItem'] = vuxTabbarItem
import vuxTabItem from 'src/components/tab/tab-item.vue'

_vux['vuxTabItem'] = vuxTabItem
import vuxthrottle from 'src/tools/throttle/index.js'

_vux['vuxthrottle'] = vuxthrottle
import vuxTimeline from 'src/components/timeline/timeline.vue'

_vux['vuxTimeline'] = vuxTimeline
import vuxTimelineItem from 'src/components/timeline/timeline-item.vue'

_vux['vuxTimelineItem'] = vuxTimelineItem
import vuxTip from 'src/components/tip/index.vue'

_vux['vuxTip'] = vuxTip
import vuxToast from 'src/components/toast/index.vue'

_vux['vuxToast'] = vuxToast
import vuxToastPlugin from 'src/plugins/toast/index.js'

_vux['vuxToastPlugin'] = vuxToastPlugin
import vuxTransferDom from 'src/directives/transfer-dom/index.js'

_vux['vuxTransferDom'] = vuxTransferDom
import vuxTransferDomDirective from 'src/directives/transfer-dom/index.js'

_vux['vuxTransferDomDirective'] = vuxTransferDomDirective
import vuxtrim from 'src/tools/string/trim'

_vux['vuxtrim'] = vuxtrim
import vuxValue2nameFilter from 'src/filters/value2name.js'

_vux['vuxValue2nameFilter'] = vuxValue2nameFilter
import vuxVideo from 'src/components/video/index.vue'

_vux['vuxVideo'] = vuxVideo
import vuxViewBox from 'src/components/view-box/index.vue'

_vux['vuxViewBox'] = vuxViewBox
import vuxVuxComponentListData from 'src/datas/vux_component_list.json'

_vux['vuxVuxComponentListData'] = vuxVuxComponentListData
import vuxWechatEmotion from 'src/components/wechat-emotion/index.vue'

_vux['vuxWechatEmotion'] = vuxWechatEmotion
import vuxWechatPlugin from 'src/plugins/wechat/index.js'

_vux['vuxWechatPlugin'] = vuxWechatPlugin
import vuxWeekCalendar from 'src/components/week-calendar/index.vue'

_vux['vuxWeekCalendar'] = vuxWeekCalendar
import vuxWepayInput from 'src/components/wepay-input/index.vue'

_vux['vuxWepayInput'] = vuxWepayInput
import vuxXAddress from 'src/components/x-address/index.vue'

_vux['vuxXAddress'] = vuxXAddress
import vuxXButton from 'src/components/x-button/index.vue'

_vux['vuxXButton'] = vuxXButton
import vuxXCircle from 'src/components/x-circle/index.vue'

_vux['vuxXCircle'] = vuxXCircle
import vuxXDialog from 'src/components/x-dialog/index.vue'

_vux['vuxXDialog'] = vuxXDialog
import vuxXHeader from 'src/components/x-header/index.vue'

_vux['vuxXHeader'] = vuxXHeader
import vuxXHr from 'src/components/x-hr/index.vue'

_vux['vuxXHr'] = vuxXHr
import vuxXImg from 'src/components/x-img/index.vue'

_vux['vuxXImg'] = vuxXImg
import vuxXInput from 'src/components/x-input/index.vue'

_vux['vuxXInput'] = vuxXInput
import vuxXNumber from 'src/components/x-number/index.vue'

_vux['vuxXNumber'] = vuxXNumber
import vuxXProgress from 'src/components/x-progress/index.vue'

_vux['vuxXProgress'] = vuxXProgress
import vuxXSwitch from 'src/components/x-switch/index.vue'

_vux['vuxXSwitch'] = vuxXSwitch
import vuxXTable from 'src/components/x-table/index.vue'

_vux['vuxXTable'] = vuxXTable
import vuxXTextarea from 'src/components/x-textarea/index.vue'

_vux['vuxXTextarea'] = vuxXTextarea

if (isBrowser) {
  for (let i in _vux) {
    window[i] = _vux[i]
  }
}
