import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, VNodeChild, VNode, JSXComponent, PropType, Ref, ComputedRef, nextTick } from 'vue';

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

interface LoaderSlotProps {
    color: string | undefined;
    isActive: boolean;
}

type IconValue = string | (string | [path: string, opacity: number])[] | JSXComponent;
declare const IconValue: PropType<IconValue>;

interface DefaultInputSlot {
    isActive: Ref<boolean>;
    isFocused: Ref<boolean>;
    controlRef: Ref<HTMLElement | undefined>;
    focus: () => void;
    blur: () => void;
}
interface VFieldSlot extends DefaultInputSlot {
    props: Record<string, unknown>;
}
type VFieldSlots = {
    clear: never;
    'prepend-inner': DefaultInputSlot;
    'append-inner': DefaultInputSlot;
    label: DefaultInputSlot & {
        label: string | undefined;
        props: Record<string, any>;
    };
    loader: LoaderSlotProps;
    default: VFieldSlot;
};

type Density = null | 'default' | 'comfortable' | 'compact';

type ValidationResult = string | boolean;
type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>);

type VMessageSlot = {
    message: string;
};

interface VInputSlot {
    id: ComputedRef<string>;
    messagesId: ComputedRef<string>;
    isDirty: ComputedRef<boolean>;
    isDisabled: ComputedRef<boolean>;
    isReadonly: ComputedRef<boolean>;
    isPristine: Ref<boolean>;
    isValid: ComputedRef<boolean | null>;
    isValidating: Ref<boolean>;
    reset: () => void;
    resetValidation: () => void;
    validate: () => void;
}
type VInputSlots = {
    default: VInputSlot;
    prepend: VInputSlot;
    append: VInputSlot;
    details: VInputSlot;
    message: VMessageSlot;
};

type VCounterSlot = {
    counter: string;
    max: string | number | undefined;
    value: string | number | undefined;
};

declare const VTextField: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        type: string;
        error: boolean;
        active: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        clearIcon: IconValue;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        hideSpinButtons: boolean;
        persistentHint: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
        persistentPlaceholder: boolean;
        persistentCounter: boolean;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        label?: string | undefined;
        prefix?: string | undefined;
        role?: string | undefined;
        class?: any;
        placeholder?: string | undefined;
        theme?: string | undefined;
        counter?: string | number | boolean | undefined;
        rounded?: string | number | boolean | undefined;
        modelValue?: any;
        bgColor?: string | undefined;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        baseColor?: string | undefined;
        appendInnerIcon?: IconValue | undefined;
        prependInnerIcon?: IconValue | undefined;
        'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
        validationValue?: any;
        centerAffix?: boolean | undefined;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        suffix?: string | undefined;
        counterValue?: number | ((value: any) => number) | undefined;
        modelModifiers?: Record<string, boolean> | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            message?: ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
            clear?: (() => vue.VNodeChild) | undefined;
            details?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
            append?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            default?: (() => vue.VNodeChild) | undefined;
            counter?: ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            message?: false | ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
            clear?: false | (() => vue.VNodeChild) | undefined;
            details?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
            append?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            default?: false | (() => vue.VNodeChild) | undefined;
            counter?: false | ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:message"?: false | ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((arg: DefaultInputSlot & {
            label: string | undefined;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:counter"?: false | ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: string) => any) | undefined;
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        "onClick:control"?: ((e: MouseEvent) => any) | undefined;
        "onMousedown:control"?: ((e: MouseEvent) => any) | undefined;
    }, HTMLInputElement & Omit<Omit<{
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
        }> & Omit<{
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
            id?: string | undefined;
            name?: string | undefined;
            label?: string | undefined;
            class?: any;
            prependIcon?: IconValue | undefined;
            appendIcon?: IconValue | undefined;
            'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
            validationValue?: any;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            label?: string | undefined;
            class?: any;
            prependIcon?: IconValue | undefined;
            appendIcon?: IconValue | undefined;
            'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
            validationValue?: any;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        } & {}, "error" | "direction" | "style" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules" | "centerAffix" | "hideSpinButtons" | "persistentHint">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            default?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            prepend?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            append?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            details?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            message?: ((arg: VMessageSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            label?: string | undefined;
            class?: any;
            prependIcon?: IconValue | undefined;
            appendIcon?: IconValue | undefined;
            'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
            validationValue?: any;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        } & {}, {
            reset: () => void;
            resetValidation: () => void;
            validate: (silent?: boolean) => Promise<string[]>;
            isValid: vue.ComputedRef<boolean | null>;
            errorMessages: vue.ComputedRef<string[]>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (value: any) => true;
        }, "$children" | "v-slot:default" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:message" | "v-slot:details">, string, {
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            default: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            prepend: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            append: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            details: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            message: (arg: VMessageSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Omit<{
        error: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        disabled: boolean | null;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        class?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
        validationValue?: any;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    } & {}, "reset" | "validate" | "resetValidation" | "isValid" | "errorMessages"> & vue.ShallowUnwrapRef<{
        reset: () => void;
        resetValidation: () => void;
        validate: (silent?: boolean) => Promise<string[]>;
        isValid: vue.ComputedRef<boolean | null>;
        errorMessages: vue.ComputedRef<string[]>;
    }> & {} & vue.ComponentCustomProperties & {} & GenericProps<{
        modelValue?: unknown;
        'onUpdate:modelValue'?: ((value: unknown) => void) | undefined;
    }, VInputSlots>, "key" | "id" | "name" | "label" | "class" | "ref" | "$children" | "v-slot:default" | "v-slots" | "ref_for" | "ref_key" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "prependIcon" | "appendIcon" | "onClick:append" | "onClick:prepend" | "v-slot:message" | "onUpdate:focused" | "validateOn" | "validationValue" | "hint" | "hideDetails" | "v-slot:details" | ("error" | "direction" | "style" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules" | "centerAffix" | "hideSpinButtons" | "persistentHint")>, `$${any}`> & Omit<Omit<{
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            rounded: string | number | boolean;
            clearIcon: IconValue;
            focused: boolean;
            centerAffix: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        }> & Omit<{
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            clearIcon: IconValue;
            focused: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            id?: string | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            label?: string | undefined;
            class?: any;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
            baseColor?: string | undefined;
            appendInnerIcon?: IconValue | undefined;
            prependInnerIcon?: IconValue | undefined;
            'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: (((args_0: boolean) => void) & ((focused: boolean) => any)) | undefined;
            centerAffix?: boolean | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            clearIcon: IconValue;
            focused: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        } & {
            id?: string | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            label?: string | undefined;
            class?: any;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
            baseColor?: string | undefined;
            appendInnerIcon?: IconValue | undefined;
            prependInnerIcon?: IconValue | undefined;
            'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            centerAffix?: boolean | undefined;
        } & {
            "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        }, "flat" | "reverse" | "variant" | "error" | "active" | "style" | "disabled" | "rounded" | "clearIcon" | "focused" | "centerAffix" | "clearable" | "dirty" | "persistentClear" | "singleLine">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            clear?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'prepend-inner'?: ((arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'append-inner'?: ((arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            label?: ((arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loader?: ((arg: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            default?: ((arg: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: "update:focused", focused: boolean) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            clearIcon: IconValue;
            focused: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        } & {
            id?: string | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            label?: string | undefined;
            class?: any;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
            baseColor?: string | undefined;
            appendInnerIcon?: IconValue | undefined;
            prependInnerIcon?: IconValue | undefined;
            'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            centerAffix?: boolean | undefined;
        } & {
            "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        }, {
            controlRef: vue.Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:focused': (focused: boolean) => true;
            'update:modelValue': (value: any) => true;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:label" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner">, string, {
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            rounded: string | number | boolean;
            clearIcon: IconValue;
            focused: boolean;
            centerAffix: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            clear: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'prepend-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'append-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            label: (arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loader: (arg: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            default: (arg: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Omit<{
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        error: boolean;
        active: boolean;
        style: vue.StyleValue;
        disabled: boolean;
        clearIcon: IconValue;
        focused: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
    } & {
        id?: string | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        label?: string | undefined;
        class?: any;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
        baseColor?: string | undefined;
        appendInnerIcon?: IconValue | undefined;
        prependInnerIcon?: IconValue | undefined;
        'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        centerAffix?: boolean | undefined;
    } & {
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    }, "controlRef"> & vue.ShallowUnwrapRef<{
        controlRef: vue.Ref<HTMLElement | undefined>;
    }> & {} & vue.ComponentCustomProperties & {} & GenericProps<{
        modelValue?: unknown;
        'onUpdate:modelValue'?: ((value: unknown) => void) | undefined;
    }, VFieldSlots>, "key" | "id" | "color" | "loading" | "label" | "class" | "ref" | "$children" | "theme" | "v-slot:default" | "v-slots" | "ref_for" | "ref_key" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "modelValue" | "onUpdate:modelValue" | "bgColor" | "v-slot:loader" | "baseColor" | "v-slot:label" | "appendInnerIcon" | "prependInnerIcon" | "onClick:clear" | "onClick:appendInner" | "onClick:prependInner" | "onUpdate:focused" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | ("flat" | "reverse" | "variant" | "error" | "active" | "style" | "disabled" | "rounded" | "clearIcon" | "focused" | "centerAffix" | "clearable" | "dirty" | "persistentClear" | "singleLine")>, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
        'click:control': (e: MouseEvent) => true;
        'mousedown:control': (e: MouseEvent) => true;
        'update:focused': (focused: boolean) => true;
        'update:modelValue': (val: string) => true;
    }, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        type: string;
        error: boolean;
        active: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        clearIcon: IconValue;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        hideSpinButtons: boolean;
        persistentHint: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
        persistentPlaceholder: boolean;
        persistentCounter: boolean;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        label?: string | undefined;
        prefix?: string | undefined;
        role?: string | undefined;
        class?: any;
        placeholder?: string | undefined;
        theme?: string | undefined;
        counter?: string | number | boolean | undefined;
        rounded?: string | number | boolean | undefined;
        modelValue?: any;
        bgColor?: string | undefined;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        baseColor?: string | undefined;
        appendInnerIcon?: IconValue | undefined;
        prependInnerIcon?: IconValue | undefined;
        'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
        validationValue?: any;
        centerAffix?: boolean | undefined;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        suffix?: string | undefined;
        counterValue?: number | ((value: any) => number) | undefined;
        modelModifiers?: Record<string, boolean> | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            message?: ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
            clear?: (() => vue.VNodeChild) | undefined;
            details?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
            append?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            default?: (() => vue.VNodeChild) | undefined;
            counter?: ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            message?: false | ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
            clear?: false | (() => vue.VNodeChild) | undefined;
            details?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
            append?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            default?: false | (() => vue.VNodeChild) | undefined;
            counter?: false | ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:message"?: false | ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((arg: DefaultInputSlot & {
            label: string | undefined;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:counter"?: false | ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: string) => any) | undefined;
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        "onClick:control"?: ((e: MouseEvent) => any) | undefined;
        "onMousedown:control"?: ((e: MouseEvent) => any) | undefined;
    }, {
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        type: string;
        error: boolean;
        active: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        readonly: boolean | null;
        messages: string | readonly string[];
        rounded: string | number | boolean;
        density: Density;
        clearIcon: IconValue;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
        persistentPlaceholder: boolean;
        persistentCounter: boolean;
    }, true, {}, vue.SlotsType<Partial<{
        message: (arg: VMessageSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        clear: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        details: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        label: (arg: DefaultInputSlot & {
            label: string | undefined;
            props: Record<string, any>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        append: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        prepend: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        loader: (arg: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        'prepend-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        'append-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        counter: (arg: VCounterSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        type: string;
        error: boolean;
        active: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        clearIcon: IconValue;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        hideSpinButtons: boolean;
        persistentHint: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
        persistentPlaceholder: boolean;
        persistentCounter: boolean;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        label?: string | undefined;
        prefix?: string | undefined;
        role?: string | undefined;
        class?: any;
        placeholder?: string | undefined;
        theme?: string | undefined;
        counter?: string | number | boolean | undefined;
        rounded?: string | number | boolean | undefined;
        modelValue?: any;
        bgColor?: string | undefined;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        baseColor?: string | undefined;
        appendInnerIcon?: IconValue | undefined;
        prependInnerIcon?: IconValue | undefined;
        'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
        validationValue?: any;
        centerAffix?: boolean | undefined;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
        suffix?: string | undefined;
        counterValue?: number | ((value: any) => number) | undefined;
        modelModifiers?: Record<string, boolean> | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            message?: ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
            clear?: (() => vue.VNodeChild) | undefined;
            details?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
            append?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            default?: (() => vue.VNodeChild) | undefined;
            counter?: ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            message?: false | ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
            clear?: false | (() => vue.VNodeChild) | undefined;
            details?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
            append?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
            default?: false | (() => vue.VNodeChild) | undefined;
            counter?: false | ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:message"?: false | ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((arg: DefaultInputSlot & {
            label: string | undefined;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:counter"?: false | ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
    } & {
        "onUpdate:modelValue"?: ((val: string) => any) | undefined;
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        "onClick:control"?: ((e: MouseEvent) => any) | undefined;
        "onMousedown:control"?: ((e: MouseEvent) => any) | undefined;
    }, HTMLInputElement & Omit<Omit<{
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
        }> & Omit<{
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
            id?: string | undefined;
            name?: string | undefined;
            label?: string | undefined;
            class?: any;
            prependIcon?: IconValue | undefined;
            appendIcon?: IconValue | undefined;
            'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
            validationValue?: any;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            label?: string | undefined;
            class?: any;
            prependIcon?: IconValue | undefined;
            appendIcon?: IconValue | undefined;
            'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
            validationValue?: any;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        } & {}, "error" | "direction" | "style" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules" | "centerAffix" | "hideSpinButtons" | "persistentHint">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            default?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            prepend?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            append?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            details?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            message?: ((arg: VMessageSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            label?: string | undefined;
            class?: any;
            prependIcon?: IconValue | undefined;
            appendIcon?: IconValue | undefined;
            'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
            validationValue?: any;
            hint?: string | undefined;
            hideDetails?: boolean | "auto" | undefined;
        } & {}, {
            reset: () => void;
            resetValidation: () => void;
            validate: (silent?: boolean) => Promise<string[]>;
            isValid: vue.ComputedRef<boolean | null>;
            errorMessages: vue.ComputedRef<string[]>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:modelValue': (value: any) => true;
        }, "$children" | "v-slot:default" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:message" | "v-slot:details">, string, {
            error: boolean;
            direction: "horizontal" | "vertical";
            style: vue.StyleValue;
            disabled: boolean | null;
            readonly: boolean | null;
            messages: string | readonly string[];
            density: Density;
            focused: boolean;
            errorMessages: string | readonly string[] | null;
            maxErrors: string | number;
            rules: readonly ValidationRule[];
            centerAffix: boolean;
            hideSpinButtons: boolean;
            persistentHint: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            default: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            prepend: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            append: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            details: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            message: (arg: VMessageSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Omit<{
        error: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        disabled: boolean | null;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        class?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
        validationValue?: any;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    } & {}, "reset" | "validate" | "resetValidation" | "isValid" | "errorMessages"> & vue.ShallowUnwrapRef<{
        reset: () => void;
        resetValidation: () => void;
        validate: (silent?: boolean) => Promise<string[]>;
        isValid: vue.ComputedRef<boolean | null>;
        errorMessages: vue.ComputedRef<string[]>;
    }> & {} & vue.ComponentCustomProperties & {} & GenericProps<{
        modelValue?: unknown;
        'onUpdate:modelValue'?: ((value: unknown) => void) | undefined;
    }, VInputSlots>, "key" | "id" | "name" | "label" | "class" | "ref" | "$children" | "v-slot:default" | "v-slots" | "ref_for" | "ref_key" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "prependIcon" | "appendIcon" | "onClick:append" | "onClick:prepend" | "v-slot:message" | "onUpdate:focused" | "validateOn" | "validationValue" | "hint" | "hideDetails" | "v-slot:details" | ("error" | "direction" | "style" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules" | "centerAffix" | "hideSpinButtons" | "persistentHint")>, `$${any}`> & Omit<Omit<{
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            rounded: string | number | boolean;
            clearIcon: IconValue;
            focused: boolean;
            centerAffix: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        }> & Omit<{
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            clearIcon: IconValue;
            focused: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            id?: string | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            label?: string | undefined;
            class?: any;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
            baseColor?: string | undefined;
            appendInnerIcon?: IconValue | undefined;
            prependInnerIcon?: IconValue | undefined;
            'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: (((args_0: boolean) => void) & ((focused: boolean) => any)) | undefined;
            centerAffix?: boolean | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            clearIcon: IconValue;
            focused: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        } & {
            id?: string | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            label?: string | undefined;
            class?: any;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
            baseColor?: string | undefined;
            appendInnerIcon?: IconValue | undefined;
            prependInnerIcon?: IconValue | undefined;
            'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            centerAffix?: boolean | undefined;
        } & {
            "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        }, "flat" | "reverse" | "variant" | "error" | "active" | "style" | "disabled" | "rounded" | "clearIcon" | "focused" | "centerAffix" | "clearable" | "dirty" | "persistentClear" | "singleLine">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            clear?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'prepend-inner'?: ((arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'append-inner'?: ((arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            label?: ((arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loader?: ((arg: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            default?: ((arg: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: "update:focused", focused: boolean) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            clearIcon: IconValue;
            focused: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        } & {
            id?: string | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            label?: string | undefined;
            class?: any;
            theme?: string | undefined;
            rounded?: string | number | boolean | undefined;
            bgColor?: string | undefined;
            baseColor?: string | undefined;
            appendInnerIcon?: IconValue | undefined;
            prependInnerIcon?: IconValue | undefined;
            'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
            'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
            centerAffix?: boolean | undefined;
        } & {
            "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
        }, {
            controlRef: vue.Ref<HTMLElement | undefined>;
        }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:focused': (focused: boolean) => true;
            'update:modelValue': (value: any) => true;
        }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:label" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner">, string, {
            flat: boolean;
            reverse: boolean;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
            error: boolean;
            active: boolean;
            style: vue.StyleValue;
            disabled: boolean;
            rounded: string | number | boolean;
            clearIcon: IconValue;
            focused: boolean;
            centerAffix: boolean;
            clearable: boolean;
            dirty: boolean;
            persistentClear: boolean;
            singleLine: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            clear: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'prepend-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'append-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            label: (arg: DefaultInputSlot & {
                label: string | undefined;
                props: Record<string, any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loader: (arg: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            default: (arg: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Omit<{
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        error: boolean;
        active: boolean;
        style: vue.StyleValue;
        disabled: boolean;
        clearIcon: IconValue;
        focused: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
    } & {
        id?: string | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        label?: string | undefined;
        class?: any;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
        baseColor?: string | undefined;
        appendInnerIcon?: IconValue | undefined;
        prependInnerIcon?: IconValue | undefined;
        'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        centerAffix?: boolean | undefined;
    } & {
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    }, "controlRef"> & vue.ShallowUnwrapRef<{
        controlRef: vue.Ref<HTMLElement | undefined>;
    }> & {} & vue.ComponentCustomProperties & {} & GenericProps<{
        modelValue?: unknown;
        'onUpdate:modelValue'?: ((value: unknown) => void) | undefined;
    }, VFieldSlots>, "key" | "id" | "color" | "loading" | "label" | "class" | "ref" | "$children" | "theme" | "v-slot:default" | "v-slots" | "ref_for" | "ref_key" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "modelValue" | "onUpdate:modelValue" | "bgColor" | "v-slot:loader" | "baseColor" | "v-slot:label" | "appendInnerIcon" | "prependInnerIcon" | "onClick:clear" | "onClick:appendInner" | "onClick:prependInner" | "onUpdate:focused" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | ("flat" | "reverse" | "variant" | "error" | "active" | "style" | "disabled" | "rounded" | "clearIcon" | "focused" | "centerAffix" | "clearable" | "dirty" | "persistentClear" | "singleLine")>, `$${any}`>, {}, {}, {}, {
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        type: string;
        error: boolean;
        active: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        autofocus: boolean;
        disabled: boolean;
        readonly: boolean | null;
        messages: string | readonly string[];
        rounded: string | number | boolean;
        density: Density;
        clearIcon: IconValue;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
        persistentPlaceholder: boolean;
        persistentCounter: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    flat: boolean;
    reverse: boolean;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    style: vue.StyleValue;
    autofocus: boolean;
    disabled: boolean;
    readonly: boolean | null;
    messages: string | readonly string[];
    density: Density;
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | readonly string[] | null;
    maxErrors: string | number;
    rules: readonly ValidationRule[];
    hideSpinButtons: boolean;
    persistentHint: boolean;
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    label?: string | undefined;
    prefix?: string | undefined;
    role?: string | undefined;
    class?: any;
    placeholder?: string | undefined;
    theme?: string | undefined;
    counter?: string | number | boolean | undefined;
    rounded?: string | number | boolean | undefined;
    modelValue?: any;
    bgColor?: string | undefined;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    baseColor?: string | undefined;
    appendInnerIcon?: IconValue | undefined;
    prependInnerIcon?: IconValue | undefined;
    'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
    'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
    'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
    'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
    'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
    'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
    validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
    validationValue?: any;
    centerAffix?: boolean | undefined;
    hint?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
    suffix?: string | undefined;
    counterValue?: number | ((value: any) => number) | undefined;
    modelModifiers?: Record<string, boolean> | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        message?: ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
        clear?: (() => vue.VNodeChild) | undefined;
        details?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        label?: ((arg: DefaultInputSlot & {
            label: string | undefined;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        append?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        default?: (() => vue.VNodeChild) | undefined;
        counter?: ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        message?: false | ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
        clear?: false | (() => vue.VNodeChild) | undefined;
        details?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        label?: false | ((arg: DefaultInputSlot & {
            label: string | undefined;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
        append?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        prepend?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
        loader?: false | ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'prepend-inner'?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        'append-inner'?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
        default?: false | (() => vue.VNodeChild) | undefined;
        counter?: false | ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:message"?: false | ((arg: VMessageSlot) => vue.VNodeChild) | undefined;
    "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:details"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:label"?: false | ((arg: DefaultInputSlot & {
        label: string | undefined;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:append"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:prepend"?: false | ((arg: VInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((arg: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:prepend-inner"?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:append-inner"?: false | ((arg: DefaultInputSlot) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:counter"?: false | ((arg: VCounterSlot) => vue.VNodeChild) | undefined;
} & {
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    "onClick:control"?: ((e: MouseEvent) => any) | undefined;
    "onMousedown:control"?: ((e: MouseEvent) => any) | undefined;
}, HTMLInputElement & Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        error: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        disabled: boolean | null;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
    }> & Omit<{
        error: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        disabled: boolean | null;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        class?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
        validationValue?: any;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        error: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        disabled: boolean | null;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        class?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
        validationValue?: any;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    } & {}, "error" | "direction" | "style" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules" | "centerAffix" | "hideSpinButtons" | "persistentHint">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        default?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        prepend?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        append?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        details?: ((arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        message?: ((arg: VMessageSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
    $emit: (event: string, ...args: any[]) => void;
    $el: any;
    $options: vue.ComponentOptionsBase<{
        error: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        disabled: boolean | null;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        label?: string | undefined;
        class?: any;
        prependIcon?: IconValue | undefined;
        appendIcon?: IconValue | undefined;
        'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
        validationValue?: any;
        hint?: string | undefined;
        hideDetails?: boolean | "auto" | undefined;
    } & {}, {
        reset: () => void;
        resetValidation: () => void;
        validate: (silent?: boolean) => Promise<string[]>;
        isValid: vue.ComputedRef<boolean | null>;
        errorMessages: vue.ComputedRef<string[]>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
        'update:modelValue': (value: any) => true;
    }, "$children" | "v-slot:default" | "v-slots" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "update:modelValue" | "v-slot:message" | "v-slot:details">, string, {
        error: boolean;
        direction: "horizontal" | "vertical";
        style: vue.StyleValue;
        disabled: boolean | null;
        readonly: boolean | null;
        messages: string | readonly string[];
        density: Density;
        focused: boolean;
        errorMessages: string | readonly string[] | null;
        maxErrors: string | number;
        rules: readonly ValidationRule[];
        centerAffix: boolean;
        hideSpinButtons: boolean;
        persistentHint: boolean;
    }, {}, string, vue.SlotsType<Partial<{
        default: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        prepend: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        append: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        details: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        message: (arg: VMessageSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }>>> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & Omit<{
    error: boolean;
    direction: "horizontal" | "vertical";
    style: vue.StyleValue;
    disabled: boolean | null;
    readonly: boolean | null;
    messages: string | readonly string[];
    density: Density;
    focused: boolean;
    errorMessages: string | readonly string[] | null;
    maxErrors: string | number;
    rules: readonly ValidationRule[];
    centerAffix: boolean;
    hideSpinButtons: boolean;
    persistentHint: boolean;
} & {
    id?: string | undefined;
    name?: string | undefined;
    label?: string | undefined;
    class?: any;
    prependIcon?: IconValue | undefined;
    appendIcon?: IconValue | undefined;
    'onClick:append'?: ((args_0: MouseEvent) => void) | undefined;
    'onClick:prepend'?: ((args_0: MouseEvent) => void) | undefined;
    'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
    validateOn?: "lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined;
    validationValue?: any;
    hint?: string | undefined;
    hideDetails?: boolean | "auto" | undefined;
} & {}, "reset" | "validate" | "resetValidation" | "isValid" | "errorMessages"> & vue.ShallowUnwrapRef<{
    reset: () => void;
    resetValidation: () => void;
    validate: (silent?: boolean) => Promise<string[]>;
    isValid: vue.ComputedRef<boolean | null>;
    errorMessages: vue.ComputedRef<string[]>;
}> & {} & vue.ComponentCustomProperties & {} & GenericProps<{
    modelValue?: unknown;
    'onUpdate:modelValue'?: ((value: unknown) => void) | undefined;
}, VInputSlots>, "key" | "id" | "name" | "label" | "class" | "ref" | "$children" | "v-slot:default" | "v-slots" | "ref_for" | "ref_key" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "v-slot:append" | "v-slot:prepend" | "modelValue" | "onUpdate:modelValue" | "prependIcon" | "appendIcon" | "onClick:append" | "onClick:prepend" | "v-slot:message" | "onUpdate:focused" | "validateOn" | "validationValue" | "hint" | "hideDetails" | "v-slot:details" | ("error" | "direction" | "style" | "disabled" | "readonly" | "messages" | "density" | "focused" | "errorMessages" | "maxErrors" | "rules" | "centerAffix" | "hideSpinButtons" | "persistentHint")>, `$${any}`> & Omit<Omit<{
    $: vue.ComponentInternalInstance;
    $data: {};
    $props: Partial<{
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        error: boolean;
        active: boolean;
        style: vue.StyleValue;
        disabled: boolean;
        rounded: string | number | boolean;
        clearIcon: IconValue;
        focused: boolean;
        centerAffix: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
    }> & Omit<{
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        error: boolean;
        active: boolean;
        style: vue.StyleValue;
        disabled: boolean;
        clearIcon: IconValue;
        focused: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
        id?: string | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        label?: string | undefined;
        class?: any;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
        baseColor?: string | undefined;
        appendInnerIcon?: IconValue | undefined;
        prependInnerIcon?: IconValue | undefined;
        'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: (((args_0: boolean) => void) & ((focused: boolean) => any)) | undefined;
        centerAffix?: boolean | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        error: boolean;
        active: boolean;
        style: vue.StyleValue;
        disabled: boolean;
        clearIcon: IconValue;
        focused: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
    } & {
        id?: string | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        label?: string | undefined;
        class?: any;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
        baseColor?: string | undefined;
        appendInnerIcon?: IconValue | undefined;
        prependInnerIcon?: IconValue | undefined;
        'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        centerAffix?: boolean | undefined;
    } & {
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    }, "flat" | "reverse" | "variant" | "error" | "active" | "style" | "disabled" | "rounded" | "clearIcon" | "focused" | "centerAffix" | "clearable" | "dirty" | "persistentClear" | "singleLine">;
    $attrs: {
        [x: string]: unknown;
    };
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        clear?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        'prepend-inner'?: ((arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        'append-inner'?: ((arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        label?: ((arg: DefaultInputSlot & {
            label: string | undefined;
            props: Record<string, any>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        loader?: ((arg: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
        default?: ((arg: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[]) | undefined;
    }>;
    $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
    $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
    $emit: (event: "update:focused", focused: boolean) => void;
    $el: any;
    $options: vue.ComponentOptionsBase<{
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        error: boolean;
        active: boolean;
        style: vue.StyleValue;
        disabled: boolean;
        clearIcon: IconValue;
        focused: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
    } & {
        id?: string | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        label?: string | undefined;
        class?: any;
        theme?: string | undefined;
        rounded?: string | number | boolean | undefined;
        bgColor?: string | undefined;
        baseColor?: string | undefined;
        appendInnerIcon?: IconValue | undefined;
        prependInnerIcon?: IconValue | undefined;
        'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
        'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
        centerAffix?: boolean | undefined;
    } & {
        "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
    }, {
        controlRef: vue.Ref<HTMLElement | undefined>;
    }, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
        'update:focused': (focused: boolean) => true;
        'update:modelValue': (value: any) => true;
    }, "$children" | "v-slot:default" | "v-slots" | "modelValue" | "update:modelValue" | "v-slot:loader" | "v-slot:label" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner">, string, {
        flat: boolean;
        reverse: boolean;
        variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
        error: boolean;
        active: boolean;
        style: vue.StyleValue;
        disabled: boolean;
        rounded: string | number | boolean;
        clearIcon: IconValue;
        focused: boolean;
        centerAffix: boolean;
        clearable: boolean;
        dirty: boolean;
        persistentClear: boolean;
        singleLine: boolean;
    }, {}, string, vue.SlotsType<Partial<{
        clear: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        'prepend-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        'append-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        label: (arg: DefaultInputSlot & {
            label: string | undefined;
            props: Record<string, any>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        loader: (arg: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        default: (arg: VFieldSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }>>> & {
        beforeCreate?: ((() => void) | (() => void)[]) | undefined;
        created?: ((() => void) | (() => void)[]) | undefined;
        beforeMount?: ((() => void) | (() => void)[]) | undefined;
        mounted?: ((() => void) | (() => void)[]) | undefined;
        beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
        updated?: ((() => void) | (() => void)[]) | undefined;
        activated?: ((() => void) | (() => void)[]) | undefined;
        deactivated?: ((() => void) | (() => void)[]) | undefined;
        beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
        beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
        destroyed?: ((() => void) | (() => void)[]) | undefined;
        unmounted?: ((() => void) | (() => void)[]) | undefined;
        renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
        errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
    };
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
} & Omit<{
    flat: boolean;
    reverse: boolean;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
    error: boolean;
    active: boolean;
    style: vue.StyleValue;
    disabled: boolean;
    clearIcon: IconValue;
    focused: boolean;
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
} & {
    id?: string | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    label?: string | undefined;
    class?: any;
    theme?: string | undefined;
    rounded?: string | number | boolean | undefined;
    bgColor?: string | undefined;
    baseColor?: string | undefined;
    appendInnerIcon?: IconValue | undefined;
    prependInnerIcon?: IconValue | undefined;
    'onClick:clear'?: ((args_0: MouseEvent) => void) | undefined;
    'onClick:appendInner'?: ((args_0: MouseEvent) => void) | undefined;
    'onClick:prependInner'?: ((args_0: MouseEvent) => void) | undefined;
    'onUpdate:focused'?: ((args_0: boolean) => void) | undefined;
    centerAffix?: boolean | undefined;
} & {
    "onUpdate:focused"?: ((focused: boolean) => any) | undefined;
}, "controlRef"> & vue.ShallowUnwrapRef<{
    controlRef: vue.Ref<HTMLElement | undefined>;
}> & {} & vue.ComponentCustomProperties & {} & GenericProps<{
    modelValue?: unknown;
    'onUpdate:modelValue'?: ((value: unknown) => void) | undefined;
}, VFieldSlots>, "key" | "id" | "color" | "loading" | "label" | "class" | "ref" | "$children" | "theme" | "v-slot:default" | "v-slots" | "ref_for" | "ref_key" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "modelValue" | "onUpdate:modelValue" | "bgColor" | "v-slot:loader" | "baseColor" | "v-slot:label" | "appendInnerIcon" | "prependInnerIcon" | "onClick:clear" | "onClick:appendInner" | "onClick:prependInner" | "onUpdate:focused" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | ("flat" | "reverse" | "variant" | "error" | "active" | "style" | "disabled" | "rounded" | "clearIcon" | "focused" | "centerAffix" | "clearable" | "dirty" | "persistentClear" | "singleLine")>, `$${any}`>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'click:control': (e: MouseEvent) => true;
    'mousedown:control': (e: MouseEvent) => true;
    'update:focused': (focused: boolean) => true;
    'update:modelValue': (val: string) => true;
}, string, {
    flat: boolean;
    reverse: boolean;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled";
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    style: vue.StyleValue;
    autofocus: boolean;
    disabled: boolean;
    readonly: boolean | null;
    messages: string | readonly string[];
    rounded: string | number | boolean;
    density: Density;
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | readonly string[] | null;
    maxErrors: string | number;
    rules: readonly ValidationRule[];
    centerAffix: boolean;
    hideSpinButtons: boolean;
    persistentHint: boolean;
    clearable: boolean;
    dirty: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
}, {}, string, vue.SlotsType<Partial<{
    message: (arg: VMessageSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    clear: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    details: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    label: (arg: DefaultInputSlot & {
        label: string | undefined;
        props: Record<string, any>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    append: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    prepend: (arg: VInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loader: (arg: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'prepend-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'append-inner': (arg: DefaultInputSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    counter: (arg: VCounterSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    loading: (StringConstructor | BooleanConstructor)[];
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    appendInnerIcon: PropType<IconValue>;
    bgColor: StringConstructor;
    clearable: BooleanConstructor;
    clearIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    active: BooleanConstructor;
    centerAffix: {
        type: BooleanConstructor;
        default: undefined;
    };
    color: StringConstructor;
    baseColor: StringConstructor;
    dirty: BooleanConstructor;
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    error: BooleanConstructor;
    flat: BooleanConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: PropType<IconValue>;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        default: string;
        validator: (v: any) => boolean;
    };
    'onClick:clear': PropType<(args_0: MouseEvent) => void>;
    'onClick:appendInner': PropType<(args_0: MouseEvent) => void>;
    'onClick:prependInner': PropType<(args_0: MouseEvent) => void>;
    focused: BooleanConstructor;
    'onUpdate:focused': PropType<(args_0: boolean) => void>;
    errorMessages: {
        type: PropType<string | readonly string[] | null>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    name: StringConstructor;
    readonly: {
        type: PropType<boolean | null>;
        default: null;
    };
    rules: {
        type: PropType<readonly ValidationRule[]>;
        default: () => never[];
    };
    modelValue: null;
    validateOn: PropType<"lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined>;
    validationValue: null;
    density: {
        type: PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    id: StringConstructor;
    appendIcon: PropType<IconValue>;
    prependIcon: PropType<IconValue>;
    hideDetails: PropType<boolean | "auto">;
    hideSpinButtons: BooleanConstructor;
    hint: StringConstructor;
    persistentHint: BooleanConstructor;
    messages: {
        type: PropType<string | readonly string[]>;
        default: () => never[];
    };
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    'onClick:prepend': PropType<(args_0: MouseEvent) => void>;
    'onClick:append': PropType<(args_0: MouseEvent) => void>;
    autofocus: BooleanConstructor;
    counter: (StringConstructor | BooleanConstructor | NumberConstructor)[];
    counterValue: PropType<number | ((value: any) => number)>;
    prefix: StringConstructor;
    placeholder: StringConstructor;
    persistentPlaceholder: BooleanConstructor;
    persistentCounter: BooleanConstructor;
    suffix: StringConstructor;
    role: StringConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    modelModifiers: PropType<Record<string, boolean>>;
}, vue.ExtractPropTypes<{
    theme: StringConstructor;
    rounded: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: undefined;
    };
    loading: (StringConstructor | BooleanConstructor)[];
    class: PropType<any>;
    style: {
        type: PropType<vue.StyleValue>;
        default: null;
    };
    appendInnerIcon: PropType<IconValue>;
    bgColor: StringConstructor;
    clearable: BooleanConstructor;
    clearIcon: {
        type: PropType<IconValue>;
        default: string;
    };
    active: BooleanConstructor;
    centerAffix: {
        type: BooleanConstructor;
        default: undefined;
    };
    color: StringConstructor;
    baseColor: StringConstructor;
    dirty: BooleanConstructor;
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    error: BooleanConstructor;
    flat: BooleanConstructor;
    label: StringConstructor;
    persistentClear: BooleanConstructor;
    prependInnerIcon: PropType<IconValue>;
    reverse: BooleanConstructor;
    singleLine: BooleanConstructor;
    variant: {
        type: PropType<"filled" | "outlined" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled">;
        default: string;
        validator: (v: any) => boolean;
    };
    'onClick:clear': PropType<(args_0: MouseEvent) => void>;
    'onClick:appendInner': PropType<(args_0: MouseEvent) => void>;
    'onClick:prependInner': PropType<(args_0: MouseEvent) => void>;
    focused: BooleanConstructor;
    'onUpdate:focused': PropType<(args_0: boolean) => void>;
    errorMessages: {
        type: PropType<string | readonly string[] | null>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    name: StringConstructor;
    readonly: {
        type: PropType<boolean | null>;
        default: null;
    };
    rules: {
        type: PropType<readonly ValidationRule[]>;
        default: () => never[];
    };
    modelValue: null;
    validateOn: PropType<"lazy" | ("input" | "blur" | "submit") | "input lazy" | "blur lazy" | "submit lazy" | "lazy input" | "lazy blur" | "lazy submit" | undefined>;
    validationValue: null;
    density: {
        type: PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    id: StringConstructor;
    appendIcon: PropType<IconValue>;
    prependIcon: PropType<IconValue>;
    hideDetails: PropType<boolean | "auto">;
    hideSpinButtons: BooleanConstructor;
    hint: StringConstructor;
    persistentHint: BooleanConstructor;
    messages: {
        type: PropType<string | readonly string[]>;
        default: () => never[];
    };
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    'onClick:prepend': PropType<(args_0: MouseEvent) => void>;
    'onClick:append': PropType<(args_0: MouseEvent) => void>;
    autofocus: BooleanConstructor;
    counter: (StringConstructor | BooleanConstructor | NumberConstructor)[];
    counterValue: PropType<number | ((value: any) => number)>;
    prefix: StringConstructor;
    placeholder: StringConstructor;
    persistentPlaceholder: BooleanConstructor;
    persistentCounter: BooleanConstructor;
    suffix: StringConstructor;
    role: StringConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    modelModifiers: PropType<Record<string, boolean>>;
}>>;
type VTextField = InstanceType<typeof VTextField>;

export { VTextField };
