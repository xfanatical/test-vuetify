import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, VNodeChild, VNode, JSXComponent, PropType, Ref, CSSProperties, WritableComputedRef } from 'vue';

type SlotsToProps<U extends RawSlots, T = MakeInternalSlots<U>> = {
    $children?: (VNodeChild | (T extends {
        default: infer V;
    } ? V : {}) | {
        [K in keyof T]?: T[K];
    });
    'v-slots'?: {
        [K in keyof T]?: T[K] | false;
    };
} & {
    [K in keyof T as `v-slot:${K & string}`]?: T[K] | false;
};
type RawSlots = Record<string, unknown>;
type Slot<T> = [T] extends [never] ? () => VNodeChild : (arg: T) => VNodeChild;
type VueSlot<T> = [T] extends [never] ? () => VNode[] : (arg: T) => VNode[];
type MakeInternalSlots<T extends RawSlots> = {
    [K in keyof T]: Slot<T[K]>;
};
type MakeSlots<T extends RawSlots> = {
    [K in keyof T]: VueSlot<T[K]>;
};
type GenericProps<Props, Slots extends Record<string, unknown>> = {
    $props: Props & SlotsToProps<Slots>;
    $slots: MakeSlots<Slots>;
};
interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

declare function deepEqual(a: any, b: any): boolean;

type Density = null | 'default' | 'comfortable' | 'compact';

type IconValue = string | (string | [path: string, opacity: number])[] | JSXComponent;
declare const IconValue: PropType<IconValue>;

type SelectionControlSlot = {
    model: WritableComputedRef<boolean>;
    textColorClasses: Ref<string[]>;
    textColorStyles: Ref<CSSProperties>;
    backgroundColorClasses: Ref<string[]>;
    backgroundColorStyles: Ref<CSSProperties>;
    inputNode: VNode;
    icon: IconValue | undefined;
    props: {
        onBlur: (e: Event) => void;
        onFocus: (e: FocusEvent) => void;
        id: string;
    };
};
type VSelectionControlSlots = {
    default: {
        backgroundColorClasses: Ref<string[]>;
        backgroundColorStyles: Ref<CSSProperties>;
    };
    label: {
        label: string | undefined;
        props: Record<string, unknown>;
    };
    input: SelectionControlSlot;
};
declare const VSelectionControl: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        inline: boolean;
        error: boolean;
        style: vue.StyleValue;
        disabled: boolean | null;
        multiple: boolean | null;
        readonly: boolean | null;
        density: Density;
        ripple: boolean;
        valueComparator: typeof deepEqual;
    } & {
        type?: string | undefined;
        id?: string | undefined;
        name?: string | undefined;
        color?: string | undefined;
        value?: any;
        label?: string | undefined;
        class?: any;
        theme?: string | undefined;
        defaultsTarget?: string | undefined;
        falseIcon?: IconValue | undefined;
        trueIcon?: IconValue | undefined;
        baseColor?: string | undefined;
        trueValue?: any;
        falseValue?: any;
    } & {}, {
        isFocused: vue.ShallowRef<boolean>;
        input: Ref<HTMLInputElement | undefined>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
        'update:modelValue': (value: any) => boolean;
    }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:input" | "v-slot:label">, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        inline: boolean;
        error: boolean;
        style: vue.StyleValue;
        disabled: boolean | null;
        multiple: boolean | null;
        readonly: boolean | null;
        density: Density;
        ripple: boolean;
        valueComparator: typeof deepEqual;
    } & {
        type?: string | undefined;
        id?: string | undefined;
        name?: string | undefined;
        color?: string | undefined;
        value?: any;
        label?: string | undefined;
        class?: any;
        theme?: string | undefined;
        defaultsTarget?: string | undefined;
        falseIcon?: IconValue | undefined;
        trueIcon?: IconValue | undefined;
        baseColor?: string | undefined;
        trueValue?: any;
        falseValue?: any;
    } & {}, {
        inline: boolean;
        error: boolean;
        style: vue.StyleValue;
        disabled: boolean | null;
        multiple: boolean | null;
        readonly: boolean | null;
        density: Density;
        ripple: boolean;
        valueComparator: typeof deepEqual;
    }, true, {}, vue.SlotsType<Partial<{
        default: (arg: {
            backgroundColorClasses: Ref<string[]>;
            backgroundColorStyles: Ref<CSSProperties>;
        }) => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        label: (arg: {
            label: string | undefined;
            props: Record<string, unknown>;
        }) => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        input: (arg: SelectionControlSlot) => VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }>>, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, {
        inline: boolean;
        error: boolean;
        style: vue.StyleValue;
        disabled: boolean | null;
        multiple: boolean | null;
        readonly: boolean | null;
        density: Density;
        ripple: boolean;
        valueComparator: typeof deepEqual;
    } & {
        type?: string | undefined;
        id?: string | undefined;
        name?: string | undefined;
        color?: string | undefined;
        value?: any;
        label?: string | undefined;
        class?: any;
        theme?: string | undefined;
        defaultsTarget?: string | undefined;
        falseIcon?: IconValue | undefined;
        trueIcon?: IconValue | undefined;
        baseColor?: string | undefined;
        trueValue?: any;
        falseValue?: any;
    } & {}, {
        isFocused: vue.ShallowRef<boolean>;
        input: Ref<HTMLInputElement | undefined>;
    }, {}, {}, {}, {
        inline: boolean;
        error: boolean;
        style: vue.StyleValue;
        disabled: boolean | null;
        multiple: boolean | null;
        readonly: boolean | null;
        density: Density;
        ripple: boolean;
        valueComparator: typeof deepEqual;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    inline: boolean;
    error: boolean;
    style: vue.StyleValue;
    disabled: boolean | null;
    multiple: boolean | null;
    readonly: boolean | null;
    density: Density;
    ripple: boolean;
    valueComparator: typeof deepEqual;
} & {
    type?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    value?: any;
    label?: string | undefined;
    class?: any;
    theme?: string | undefined;
    defaultsTarget?: string | undefined;
    falseIcon?: IconValue | undefined;
    trueIcon?: IconValue | undefined;
    baseColor?: string | undefined;
    trueValue?: any;
    falseValue?: any;
} & {}, {
    isFocused: vue.ShallowRef<boolean>;
    input: Ref<HTMLInputElement | undefined>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:modelValue': (value: any) => boolean;
}, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:input" | "v-slot:label">, string, {
    inline: boolean;
    error: boolean;
    style: vue.StyleValue;
    disabled: boolean | null;
    multiple: boolean | null;
    readonly: boolean | null;
    density: Density;
    ripple: boolean;
    valueComparator: typeof deepEqual;
}, {}, string, vue.SlotsType<Partial<{
    default: (arg: {
        backgroundColorClasses: Ref<string[]>;
        backgroundColorStyles: Ref<CSSProperties>;
    }) => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    label: (arg: {
        label: string | undefined;
        props: Record<string, unknown>;
    }) => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    input: (arg: SelectionControlSlot) => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T>(props: {
    modelValue?: T | undefined;
    'onUpdate:modelValue'?: ((value: T) => void) | undefined;
}, slots: VSelectionControlSlots) => GenericProps<{
    modelValue?: T | undefined;
    'onUpdate:modelValue'?: ((value: T) => void) | undefined;
}, VSelectionControlSlots>) & FilterPropsOptions<{
    theme: StringConstructor;
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    color: StringConstructor;
    disabled: {
        type: vue.PropType<boolean | null>;
        default: null;
    };
    defaultsTarget: StringConstructor;
    error: BooleanConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    falseIcon: vue.PropType<IconValue>;
    trueIcon: vue.PropType<IconValue>;
    ripple: {
        type: BooleanConstructor;
        default: boolean;
    };
    multiple: {
        type: vue.PropType<boolean | null>;
        default: null;
    };
    name: StringConstructor;
    readonly: {
        type: vue.PropType<boolean | null>;
        default: null;
    };
    modelValue: null;
    type: StringConstructor;
    valueComparator: {
        type: vue.PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
    label: StringConstructor;
    baseColor: StringConstructor;
    trueValue: null;
    falseValue: null;
    value: null;
}, ExtractPropTypes<{
    theme: StringConstructor;
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    color: StringConstructor;
    disabled: {
        type: vue.PropType<boolean | null>;
        default: null;
    };
    defaultsTarget: StringConstructor;
    error: BooleanConstructor;
    id: StringConstructor;
    inline: BooleanConstructor;
    falseIcon: vue.PropType<IconValue>;
    trueIcon: vue.PropType<IconValue>;
    ripple: {
        type: BooleanConstructor;
        default: boolean;
    };
    multiple: {
        type: vue.PropType<boolean | null>;
        default: null;
    };
    name: StringConstructor;
    readonly: {
        type: vue.PropType<boolean | null>;
        default: null;
    };
    modelValue: null;
    type: StringConstructor;
    valueComparator: {
        type: vue.PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
    label: StringConstructor;
    baseColor: StringConstructor;
    trueValue: null;
    falseValue: null;
    value: null;
}>>;
type VSelectionControl = InstanceType<typeof VSelectionControl>;

export { VSelectionControl };
