import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
// Styles
import "./VCalendar.css";

// Components
import { makeVCalendarDayProps, VCalendarDay } from "./VCalendarDay.mjs";
import { makeVCalendarHeaderProps, VCalendarHeader } from "./VCalendarHeader.mjs";
import { VCalendarMonthDay } from "./VCalendarMonthDay.mjs"; // Composables
import { makeCalendarProps, useCalendar } from "../../composables/calendar.mjs";
import { useDate } from "../../composables/date/date.mjs"; // Utilities
import { computed } from 'vue';
import { chunkArray, genericComponent, propsFactory, useRender } from "../../util/index.mjs";
export const makeVCalendarProps = propsFactory({
  hideHeader: Boolean,
  hideWeekNumber: Boolean,
  ...makeCalendarProps(),
  ...makeVCalendarDayProps(),
  ...makeVCalendarHeaderProps()
}, 'VCalender');
export const VCalendar = genericComponent()({
  name: 'VCalendar',
  props: makeVCalendarProps(),
  emits: {
    next: null,
    prev: null,
    'update:modelValue': null
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const {
      daysInMonth,
      daysInWeek,
      genDays,
      model,
      weekNumbers
    } = useCalendar(props);
    const dayNames = adapter.getWeekdays();
    function onClickNext() {
      if (props.viewMode === 'month') {
        model.value = [adapter.addMonths(model.value[0], 1)];
      }
      if (props.viewMode === 'week') {
        model.value = [adapter.addDays(model.value[0], 7)];
      }
      if (props.viewMode === 'day') {
        model.value = [adapter.addDays(model.value[0], 1)];
      }
    }
    function onClickPrev() {
      if (props.viewMode === 'month') {
        model.value = [adapter.addMonths(model.value[0], -1)];
      }
      if (props.viewMode === 'week') {
        model.value = [adapter.addDays(model.value[0], -7)];
      }
      if (props.viewMode === 'day') {
        model.value = [adapter.addDays(model.value[0], -1)];
      }
    }
    function onClickToday() {
      model.value = [new Date()];
    }
    const title = computed(() => {
      return adapter.format(model.value[0], 'monthAndYear');
    });
    useRender(() => {
      const calendarDayProps = VCalendarDay.filterProps(props);
      const calendarHeaderProps = VCalendarHeader.filterProps(props);
      return _createVNode("div", {
        "class": ['v-calendar', {
          'v-calendar-monthly': props.viewMode === 'month',
          'v-calendar-weekly': props.viewMode === 'week',
          'v-calendar-day': props.viewMode === 'day'
        }]
      }, [_createVNode("div", null, [!props.hideHeader && (!slots.header ? _createVNode(VCalendarHeader, _mergeProps({
        "key": "calendar-header"
      }, calendarHeaderProps, {
        "title": title.value,
        "onClick:next": onClickNext,
        "onClick:prev": onClickPrev,
        "onClick:toToday": onClickToday
      }), null) : slots.header({
        title: title.value
      }))]), _createVNode("div", {
        "class": ['v-calendar__container', `days__${props.weekdays.length}`]
      }, [props.viewMode === 'month' && !props.hideDayHeader && _createVNode("div", {
        "class": ['v-calendar-weekly__head', `days__${props.weekdays.length}`, ...(!props.hideWeekNumber ? ['v-calendar-weekly__head-weeknumbers'] : [])],
        "key": "calenderWeeklyHead"
      }, [!props.hideWeekNumber ? _createVNode("div", {
        "key": "weekNumber0",
        "class": "v-calendar-weekly__head-weeknumber"
      }, null) : '', props.weekdays.sort((a, b) => a - b).map(weekday => _createVNode("div", {
        "class": `v-calendar-weekly__head-weekday${!props.hideWeekNumber ? '-with-weeknumber' : ''}`
      }, [dayNames[weekday]]))]), props.viewMode === 'month' && _createVNode("div", {
        "key": "VCalendarMonth",
        "class": ['v-calendar-month__days', `days${!props.hideWeekNumber ? '-with-weeknumbers' : ''}__${props.weekdays.length}`, ...(!props.hideWeekNumber ? ['v-calendar-month__weeknumbers'] : [])]
      }, [chunkArray(daysInMonth.value, props.weekdays.length).map((week, wi) => [!props.hideWeekNumber ? _createVNode("div", {
        "class": "v-calendar-month__weeknumber"
      }, [weekNumbers.value[wi]]) : '', week.map(day => _createVNode(VCalendarMonthDay, {
        "color": adapter.isSameDay(new Date(), day.date) ? 'primary' : undefined,
        "day": day,
        "title": day ? adapter.format(day.date, 'dayOfMonth') : 'NaN',
        "events": props.events?.filter(e => adapter.isSameDay(day.date, e.start) || adapter.isSameDay(day.date, e.end))
      }, null))])]), props.viewMode === 'week' && daysInWeek.value.map((day, i) => _createVNode(VCalendarDay, _mergeProps(calendarDayProps, {
        "day": day,
        "dayIndex": i,
        "events": props.events?.filter(e => adapter.isSameDay(e.start, day.date) || adapter.isSameDay(e.end, day.date))
      }), null)), props.viewMode === 'day' && _createVNode(VCalendarDay, _mergeProps(calendarDayProps, {
        "day": genDays([model.value[0]], adapter.date())[0],
        "events": props.events?.filter(e => adapter.isSameDay(e.start, genDays([model.value[0]], adapter.date())[0].date) || adapter.isSameDay(e.end, genDays([model.value[0]], adapter.date())[0].date))
      }), null)])]);
    });
    return {
      daysInMonth,
      daysInWeek,
      genDays
    };
  }
});
//# sourceMappingURL=VCalendar.mjs.map