import { resolveDirective as _resolveDirective, Fragment as _Fragment, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
// Components
import { VDataTableColumn } from "./VDataTableColumn.mjs";
import { VCheckboxBtn } from "../VCheckbox/index.mjs";
import { VIcon } from "../VIcon/index.mjs"; // Composables
import { useHeaders } from "./composables/headers.mjs";
import { useSelection } from "./composables/select.mjs";
import { useSort } from "./composables/sort.mjs";
import { useBackgroundColor } from "../../composables/color.mjs";
import { IconValue } from "../../composables/icons.mjs";
import { LoaderSlot, makeLoaderProps, useLoader } from "../../composables/loader.mjs"; // Utilities
import { computed, mergeProps } from 'vue';
import { convertToUnit, genericComponent, propsFactory, useRender } from "../../util/index.mjs"; // Types
export const makeVDataTableHeadersProps = propsFactory({
  color: String,
  sticky: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: IconValue,
    default: '$sortAsc'
  },
  sortDescIcon: {
    type: IconValue,
    default: '$sortDesc'
  },
  headerProps: {
    type: Object
  },
  ...makeLoaderProps()
}, 'VDataTableHeaders');
export const VDataTableHeaders = genericComponent()({
  name: 'VDataTableHeaders',
  props: makeVDataTableHeadersProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      someSelected,
      allSelected,
      selectAll,
      showSelectAll
    } = useSelection();
    const {
      columns,
      headers
    } = useHeaders();
    const {
      loaderClasses
    } = useLoader(props);
    function getFixedStyles(column, y) {
      if (!props.sticky && !column.fixed) return undefined;
      return {
        position: 'sticky',
        left: column.fixed ? convertToUnit(column.fixedOffset) : undefined,
        top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : undefined
      };
    }
    function getSortIcon(column) {
      const item = sortBy.value.find(item => item.key === column.key);
      if (!item) return props.sortAscIcon;
      return item.order === 'asc' ? props.sortAscIcon : props.sortDescIcon;
    }
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, 'color');
    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon
    }));
    const VDataTableHeaderCell = _ref2 => {
      let {
        column,
        x,
        y
      } = _ref2;
      const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand';
      const headerProps = mergeProps(props.headerProps ?? {}, column.headerProps ?? {});
      return _createVNode(VDataTableColumn, _mergeProps({
        "tag": "th",
        "align": column.align,
        "class": ['v-data-table__th', {
          'v-data-table__th--sortable': column.sortable,
          'v-data-table__th--sorted': isSorted(column),
          'v-data-table__th--fixed': column.fixed,
          'v-data-table__th--sticky': props.sticky
        }, loaderClasses.value],
        "style": {
          width: convertToUnit(column.width),
          minWidth: convertToUnit(column.minWidth),
          ...getFixedStyles(column, y)
        },
        "colspan": column.colspan,
        "rowspan": column.rowspan,
        "onClick": column.sortable ? () => toggleSort(column) : undefined,
        "fixed": column.fixed,
        "lastFixed": column.lastFixed,
        "noPadding": noPadding
      }, headerProps), {
        default: () => {
          const columnSlotName = `header.${column.key}`;
          const columnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon
          };
          if (slots[columnSlotName]) return slots[columnSlotName](columnSlotProps);
          if (column.key === 'data-table-select') {
            return slots['header.data-table-select']?.(columnSlotProps) ?? (showSelectAll && _createVNode(VCheckboxBtn, {
              "modelValue": allSelected.value,
              "indeterminate": someSelected.value && !allSelected.value,
              "onUpdate:modelValue": selectAll
            }, null));
          }
          return _createVNode("div", {
            "class": "v-data-table-header__content"
          }, [_createVNode("span", null, [column.title]), column.sortable && _createVNode(VIcon, {
            "key": "icon",
            "class": "v-data-table-header__sort-icon",
            "icon": getSortIcon(column)
          }, null), props.multiSort && isSorted(column) && _createVNode("div", {
            "key": "badge",
            "class": ['v-data-table-header__sort-badge', ...backgroundColorClasses.value],
            "style": backgroundColorStyles.value
          }, [sortBy.value.findIndex(x => x.key === column.key) + 1])]);
        }
      });
    };
    useRender(() => {
      return _createVNode(_Fragment, null, [slots.headers ? slots.headers(slotProps.value) : headers.value.map((row, y) => _createVNode("tr", null, [row.map((column, x) => _createVNode(VDataTableHeaderCell, {
        "column": column,
        "x": x,
        "y": y
      }, null))])), props.loading && _createVNode("tr", {
        "class": "v-data-table-progress"
      }, [_createVNode("th", {
        "colspan": columns.value.length
      }, [_createVNode(LoaderSlot, {
        "name": "v-data-table-progress",
        "absolute": true,
        "active": true,
        "color": typeof props.loading === 'boolean' ? undefined : props.loading,
        "indeterminate": true
      }, {
        default: slots.loader
      })])])]);
    });
  }
});
//# sourceMappingURL=VDataTableHeaders.mjs.map