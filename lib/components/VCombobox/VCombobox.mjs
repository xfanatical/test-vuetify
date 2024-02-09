import { createTextVNode as _createTextVNode, mergeProps as _mergeProps, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VCombobox.css";

// Components
import { VAvatar } from "../VAvatar/index.mjs";
import { VCheckboxBtn } from "../VCheckbox/index.mjs";
import { VChip } from "../VChip/index.mjs";
import { VDefaultsProvider } from "../VDefaultsProvider/index.mjs";
import { VIcon } from "../VIcon/index.mjs";
import { VList, VListItem } from "../VList/index.mjs";
import { VMenu } from "../VMenu/index.mjs";
import { makeSelectProps } from "../VSelect/VSelect.mjs";
import { VTextField } from "../VTextField/index.mjs";
import { makeVTextFieldProps } from "../VTextField/VTextField.mjs";
import { VVirtualScroll } from "../VVirtualScroll/index.mjs"; // Composables
import { useScrolling } from "../VSelect/useScrolling.mjs";
import { useTextColor } from "../../composables/color.mjs";
import { makeFilterProps, useFilter } from "../../composables/filter.mjs";
import { useForm } from "../../composables/form.mjs";
import { forwardRefs } from "../../composables/forwardRefs.mjs";
import { transformItem, useItems } from "../../composables/list-items.mjs";
import { useLocale } from "../../composables/locale.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { makeTransitionProps } from "../../composables/transition.mjs"; // Utilities
import { computed, mergeProps, nextTick, ref, shallowRef, watch } from 'vue';
import { ensureValidVNode, genericComponent, IN_BROWSER, isComposingIgnoreKey, noop, omit, propsFactory, useRender, wrapInArray } from "../../util/index.mjs"; // Types
function highlightResult(text, matches, length) {
  if (matches == null) return text;
  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented');
  return typeof matches === 'number' && ~matches ? _createVNode(_Fragment, null, [_createVNode("span", {
    "class": "v-combobox__unmask"
  }, [text.substr(0, matches)]), _createVNode("span", {
    "class": "v-combobox__mask"
  }, [text.substr(matches, length)]), _createVNode("span", {
    "class": "v-combobox__unmask"
  }, [text.substr(matches + length)])]) : text;
}
export const makeVComboboxProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: {
    type: Boolean,
    default: true
  },
  showSelectionSlot: {
    type: Boolean,
    default: false,
  },
  delimiters: Array,
  ...makeFilterProps({
    filterKeys: ['title']
  }),
  ...makeSelectProps({
    hideNoData: true,
    returnObject: true
  }),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox'
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({
    transition: false
  })
}, 'VCombobox');
export const VCombobox = genericComponent()({
  name: 'VCombobox',
  props: makeVComboboxProps(),
  emits: {
    'update:focused': focused => true,
    'update:modelValue': value => true,
    'update:search': value => true,
    'update:menu': value => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = shallowRef(false);
    const isPristine = shallowRef(true);
    const listHasFocus = shallowRef(false);
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const _menu = useProxiedModel(props, 'menu');
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return;
        _menu.value = v;
      }
    });
    const selectionIndex = shallowRef(-1);
    let cleared = false;
    const color = computed(() => vTextFieldRef.value?.color);
    const label = computed(() => menu.value ? props.closeText : props.openText);
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const form = useForm();
    const _search = shallowRef(!props.multiple && !props.showSelectionSlot ? model.value[0]?.title ?? '' : '');
    const search = computed({
      get: () => {
        return _search.value;
      },
      set: val => {
        _search.value = val ?? '';
        if (!props.multiple && !props.showSelectionSlot) {
          model.value = [transformItem(props, val)];
        }
        if (val && props.multiple && props.delimiters?.length) {
          const values = val.split(new RegExp(`(?:${props.delimiters.join('|')})+`));
          if (values.length > 1) {
            values.forEach(v => {
              v = v.trim();
              if (v) select(transformItem(props, v));
            });
            _search.value = '';
          }
        }
        if (!val) selectionIndex.value = -1;
        isPristine.value = !val;
      }
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : props.multiple ? model.value.length : search.value.length;
    });
    watch(_search, value => {
      if (cleared) {
        // wait for clear to finish, VTextField sets _search to null
        // then search computed triggers and updates _search to ''
        nextTick(() => cleared = false);
      } else if (isFocused.value && !menu.value) {
        menu.value = true;
      }
      emit('update:search', value);
    });
    watch(model, value => {
      if (!props.multiple && !props.showSelectionSlot) {
        _search.value = value[0]?.title ?? ''
      }
    });
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, () => isPristine.value ? '' : search.value);
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });
    const selectedValues = computed(() => model.value.map(selection => selection.value));
    const highlightFirst = computed(() => {
      const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title;
      return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || form?.isReadonly.value);
    const listRef = ref();
    const {
      onListScroll,
      onListKeydown
    } = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      cleared = true;
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = true;
    }
    function onMousedownMenuIcon(e) {
      if (menuDisabled.value) return;
      if (isFocused.value) {
        e.preventDefault();
        e.stopPropagation();
      }
      menu.value = !menu.value;
    }
    function onKeydown(e) {
      if (isComposingIgnoreKey(e) || props.readonly || form?.isReadonly.value) return;
      const selectionStart = vTextFieldRef.value.selectionStart;
      const length = model.value.length;
      if (selectionIndex.value > -1 || ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
      }
      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true;
      }
      if (['Escape'].includes(e.key)) {
        menu.value = false;
      }
      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        if (highlightFirst.value && ['Enter', 'Tab'].includes(e.key)) {
          select(filteredItems.value[0]);
        }
        isPristine.value = true;
      }
      if (e.key === 'ArrowDown' && highlightFirst.value) {
        listRef.value?.focus('next');
      }
      if (!props.multiple && !props.showSelectionSlot) return
      if (['Backspace', 'Delete'].includes(e.key)) {
        if (selectionIndex.value < 0) {
          if (e.key === 'Backspace' && !search.value) {
            selectionIndex.value = length - 1;
          }
          return;
        }
        const originalSelectionIndex = selectionIndex.value;
        const selectedItem = model.value[selectionIndex.value];
        if (selectedItem && !selectedItem.props.disabled) select(selectedItem, false);
        selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
      }
      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && selectionStart > 0) return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (model.value[prev]) {
          selectionIndex.value = prev;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(search.value.length, search.value.length);
        }
      }
      if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return;
        const next = selectionIndex.value + 1;
        if (model.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(0, 0);
        }
      }
      if (e.key === 'Enter' && search.value) {
        select(transformItem(props, search.value));
        search.value = '';
      }
    }
    function onAfterLeave() {
      if (isFocused.value) {
        isPristine.value = true;
        vTextFieldRef.value?.focus();
      }
    }
    /** @param set - null means toggle */
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (props.multiple) {
        const index = model.value.findIndex(selection => props.valueComparator(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
        if (props.clearOnSelect) {
          search.value = '';
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        if (!props.showSelectionSlot) {
          _search.value = add ? item.title : ''
        } else {
          search.value = ''
        }

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
      setTimeout(() => {
        listHasFocus.value = true;
      });
    }
    function onFocusout(e) {
      listHasFocus.value = false;
    }
    function onUpdateModelValue(v) {
      if (v == null || v === '' && !props.multiple) model.value = [];
    }
    watch(isFocused, (val, oldVal) => {
      if (val || val === oldVal) return;
      selectionIndex.value = -1;
      menu.value = false;
      if (highlightFirst.value && !listHasFocus.value && !model.value.some(_ref2 => {
        let {
          value
        } = _ref2;
        return value === displayItems.value[0].value;
      })) {
        select(displayItems.value[0]);
      } else if (props.multiple && search.value) {
        select(transformItem(props, search.value));
      } else if (!props.multiple && props.showSelectionSlot && search.value) {
        select(transformItem(props, search.value))
        _search.value = ''
      }
    });
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex(item => model.value.some(s => props.valueComparator(s.value, item.value)));
        IN_BROWSER && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
        });
      }
    });
    watch(displayItems, (val, oldVal) => {
      if (!isFocused.value) return;
      if (!val.length && props.hideNoData) {
        menu.value = false;
      }
      if (!oldVal.length && val.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots['prepend-item'] || slots['append-item'] || slots['no-data']);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      return _createVNode(VTextField, _mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": [$event => search.value = $event, onUpdateModelValue],
        "focused": isFocused.value,
        "onUpdate:focused": $event => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ['v-combobox', {
          'v-combobox--active-menu': menu.value,
          'v-combobox--chips': !!props.chips,
          'v-combobox--selection-slot': !!slots.selection,
          'v-combobox--selecting-index': selectionIndex.value > -1,
          [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: !props.showSelectionSlot,
        }, props.class],
        "style": props.style,
        "readonly": props.readonly,
        "placeholder": isDirty ? undefined : props.placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => _createVNode(_Fragment, null, [_createVNode(VMenu, _mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": $event => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-combobox__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, props.menuProps), {
          default: () => [hasList && _createVNode(VList, _mergeProps({
            "ref": listRef,
            "selected": selectedValues.value,
            "selectStrategy": props.multiple ? 'independent' : 'single-independent',
            "onMousedown": e => e.preventDefault(),
            "onKeydown": onListKeydown,
            "onFocusin": onFocusin,
            "onFocusout": onFocusout,
            "onScrollPassive": onListScroll,
            "tabindex": "-1",
            "aria-live": "polite",
            "color": props.itemColor ?? props.color
          }, props.listProps), {
            default: () => [slots['prepend-item']?.(), !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? _createVNode(VListItem, {
              "title": t(props.noDataText)
            }, null)), _createVNode(VVirtualScroll, {
              "ref": vVirtualScrollRef,
              "renderless": true,
              "items": displayItems.value
            }, {
              default: _ref3 => {
                let {
                  item,
                  index,
                  itemRef
                } = _ref3;
                const itemProps = mergeProps(item.props, {
                  ref: itemRef,
                  key: index,
                  active: highlightFirst.value && index === 0 ? true : undefined,
                  onClick: () => select(item, null)
                });
                return slots.item?.({
                  item,
                  index,
                  props: itemProps
                }) ?? _createVNode(VListItem, itemProps, {
                  prepend: _ref4 => {
                    let {
                      isSelected
                    } = _ref4;
                    return _createVNode(_Fragment, null, [props.multiple && !props.hideSelected ? _createVNode(VCheckboxBtn, {
                      "key": item.value,
                      "modelValue": isSelected,
                      "ripple": false,
                      "tabindex": "-1"
                    }, null) : undefined, item.props.prependAvatar && _createVNode(VAvatar, {
                      "image": item.props.prependAvatar
                    }, null), item.props.prependIcon && _createVNode(VIcon, {
                      "icon": item.props.prependIcon
                    }, null)]);
                  },
                  title: () => {
                    return isPristine.value ? item.title : highlightResult(item.title, getMatches(item)?.title, search.value?.length ?? 0);
                  }
                });
              }
            }), slots['append-item']?.()]
          })]
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            'onClick:close': onChipClose,
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            'onUpdate:modelValue': undefined
          };
          const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : undefined;
          if (hasSlot && !slotContent) return undefined;
          return _createVNode("div", {
            "key": item.value,
            "class": ['v-combobox__selection', index === selectionIndex.value && ['v-combobox__selection--selected', textColorClasses.value]],
            "style": index === selectionIndex.value ? textColorStyles.value : {}
          }, [hasChips ? !slots.chip ? _createVNode(VChip, _mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : _createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: 'small',
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? _createVNode("span", {
            "class": "v-combobox__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && _createVNode("span", {
            "class": "v-combobox__selection-comma"
          }, [_createTextVNode(",")])])]);
        })]),
        'append-inner': function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return _createVNode(_Fragment, null, [slots['append-inner']?.(...args), (!props.hideNoData || props.items.length) && props.menuIcon ? _createVNode(VIcon, {
            "class": "v-combobox__menu-icon",
            "icon": props.menuIcon,
            "onMousedown": onMousedownMenuIcon,
            "onClick": noop,
            "aria-label": t(label.value),
            "title": t(label.value)
          }, null) : undefined]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      selectionIndex,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
//# sourceMappingURL=VCombobox.mjs.map