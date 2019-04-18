(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./.storybook/config.js":
/*!******************************!*\
  !*** ./.storybook/config.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stoplight_storybook_config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stoplight/storybook-config/config */ "./node_modules/@stoplight/storybook-config/config.js");
/* harmony import */ var _stoplight_storybook_config_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stoplight_storybook_config_config__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./.storybook/theme.js":
/*!*****************************!*\
  !*** ./.storybook/theme.js ***!
  \*****************************/
/*! exports provided: useTheme, ThemeProvider, ThemeZone, themes, zones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTheme", function() { return useTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeZone", function() { return ThemeZone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "themes", function() { return themes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zones", function() { return zones; });
/* harmony import */ var _stoplight_ui_kit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
/* harmony import */ var _stoplight_ui_kit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stoplight_ui_kit__WEBPACK_IMPORTED_MODULE_0__);
var _createThemedModule=Object(_stoplight_ui_kit__WEBPACK_IMPORTED_MODULE_0__["createThemedModule"])(),useTheme=_createThemedModule.useTheme,ThemeProvider=_createThemedModule.ThemeProvider,ThemeZone=_createThemedModule.ThemeZone;var themes=["dark","light"];var zones={formtron:function formtron(_ref){var base=_ref.base;return"dark"===base?{canvas:{bg:"#111",fg:"#fff",valid:"#009000",invalid:"#ff253a"}}:{canvas:{bg:"#fff",fg:"#111",valid:"#009000",invalid:"#c6211f"}}}};

/***/ }),

/***/ "./src/Formtron.tsx":
/*!**************************!*\
  !*** ./src/Formtron.tsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const DraftValue_1 = __webpack_require__(/*! ./components/utils/DraftValue */ "./src/components/utils/DraftValue.tsx");
const computeOps_1 = __webpack_require__(/*! ./computeOps */ "./src/computeOps.ts");
const deriveFormData_1 = __webpack_require__(/*! ./deriveFormData */ "./src/deriveFormData.ts");
exports.Formtron = ({ value, themeName = 'formtron', schema, selection, onChange, fieldComponents, onInternalChange, disabled = false, layout, resolver, }) => (React.createElement(ui_kit_1.ThemeZone, { name: themeName },
    React.createElement(DraftValue_1.DraftValue, { value: deriveFormData_1.deriveFormData(schema, value, selection, resolver), onChange: v => {
            const ops = computeOps_1.computeOps(schema, value, selection, v, resolver);
            onChange(ops);
            if (onInternalChange)
                onInternalChange(v);
        } }, ({ value, onChange }) => {
        const Widget = fieldComponents[schema.type];
        return (React.createElement(Widget, { value: value, schema: schema, onChange: onChange, path: selection.split('.'), fieldComponents: fieldComponents, disabled: disabled, layout: layout }));
    })));


/***/ }),

/***/ "./src/__stories__/ArrayInput.tsx":
/*!****************************************!*\
  !*** ./src/__stories__/ArrayInput.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const Box_1 = __webpack_require__(/*! @stoplight/ui-kit/Box */ "./node_modules/@stoplight/ui-kit/Box.js");
const components_1 = __webpack_require__(/*! ../components */ "./src/components/index.ts");
const ArrayInput_1 = __webpack_require__(/*! ../components/ArrayInput */ "./src/components/ArrayInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('ArrayInput', () => {
    return (React.createElement(Box_1.Box, { width: "300px" },
        React.createElement(ArrayInput_1.ArrayInput, { value: [42, 23, 97], path: [], schema: {
                type: 'array',
                title: 'Array',
                items: {
                    type: 'integer',
                    title: 'Number',
                },
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: components_1.fieldComponents, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/CheckboxInput.tsx":
/*!*******************************************!*\
  !*** ./src/__stories__/CheckboxInput.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const Box_1 = __webpack_require__(/*! @stoplight/ui-kit/Box */ "./node_modules/@stoplight/ui-kit/Box.js");
const CheckboxInput_1 = __webpack_require__(/*! ../components/CheckboxInput */ "./src/components/CheckboxInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('CheckboxInput', () => {
    return (React.createElement(Box_1.Box, { width: "300px" },
        React.createElement(CheckboxInput_1.CheckboxInput, { value: react_2.boolean('value', true), path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                required: react_2.boolean('schema.required', false),
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: {}, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Form.tsx":
/*!**********************************!*\
  !*** ./src/__stories__/Form.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const Form_1 = __webpack_require__(/*! ../components/Form */ "./src/components/Form.tsx");
const StringInput_1 = __webpack_require__(/*! ../components/StringInput */ "./src/components/StringInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('Form', () => {
    return (React.createElement(ui_kit_1.Box, { width: "300px" },
        React.createElement(Form_1.Form, { value: {
                key: 'value',
            }, path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                required: react_2.boolean('schema.required', false),
                fields: {
                    key: {
                        type: 'string',
                    },
                },
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: { string: StringInput_1.StringInput }, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/FormtronDebugger.tsx":
/*!**********************************************!*\
  !*** ./src/__stories__/FormtronDebugger.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ObjectInspector = __webpack_require__(/*! react-object-inspector */ "./node_modules/react-object-inspector/lib/ObjectInspector.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const __1 = __webpack_require__(/*! ../ */ "./src/index.ts");
const components_1 = __webpack_require__(/*! ../components */ "./src/components/index.ts");
const autocompletionSources_1 = __webpack_require__(/*! ./autocompletionSources */ "./src/__stories__/autocompletionSources.ts");
const customWidgets_1 = __webpack_require__(/*! ./customWidgets */ "./src/__stories__/customWidgets.tsx");
const resolver = path => (path.join('.').startsWith('magic.portal') ? 'MAGIC' : undefined);
class FormtronDebugger extends React.Component {
    constructor(props) {
        super(props);
        const { input, schema, selection } = props;
        const initialForm = __1.deriveFormData(schema, input, selection);
        const initialOutput = __1.applyOps(input, []);
        this.state = {
            initialForm,
            selection,
            form: initialForm,
            ops: [],
            data: input,
            previewOutput: initialOutput,
        };
    }
    render() {
        return (React.createElement(components_1.AutocompletionContext.Provider, { value: autocompletionSources_1.autocompletionSources },
            React.createElement("div", { className: "App" },
                React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' } },
                    React.createElement("section", { style: {
                            gridArea: '1 / 1 / 2 / 2',
                            border: '1px solid black',
                            borderRadius: 5,
                        } },
                        React.createElement("legend", null, "Input"),
                        React.createElement("fieldset", null,
                            React.createElement("legend", null, "Source Data"),
                            React.createElement("label", null,
                                "Selection Path: ",
                                this.state.selection),
                            React.createElement(ObjectInspector, { data: this.state.data, name: "data", initialExpandedPaths: [
                                    'root',
                                    'root.info',
                                    'root.info.*',
                                    'root.schemes',
                                    'root.paths',
                                    'root.paths./todos',
                                    'root.paths./todos.put',
                                    'root.paths./todos.put.*',
                                    'root.200',
                                    'root.200.*',
                                ] })),
                        React.createElement("fieldset", null,
                            React.createElement("legend", null, "Form Schema"),
                            React.createElement(ObjectInspector, { data: this.props.schema, name: "schema", initialExpandedPaths: ['root', 'root.*'] }))),
                    React.createElement("section", { style: {
                            gridArea: '1 / 2/ 2 / 3',
                            border: '1px solid black',
                            borderRadius: 5,
                        } },
                        React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
                            React.createElement("fieldset", null,
                                React.createElement("legend", null, "Form Data In"),
                                React.createElement(ObjectInspector, { data: this.state.initialForm, name: "form", initialExpandedPaths: [] })),
                            React.createElement("fieldset", null,
                                React.createElement("legend", null, "Form Data Out"),
                                React.createElement(ObjectInspector, { data: this.state.form, name: "form", initialExpandedPaths: [] }))),
                        React.createElement("hr", { style: { borderTop: '1px dashed black' } }),
                        React.createElement(__1.Formtron, { fieldComponents: Object.assign({}, components_1.fieldComponents, customWidgets_1.customWidgets), value: this.state.data, schema: this.props.schema, selection: this.state.selection, onChange: ops => {
                                const previewOutput = __1.applyOps(this.state.data, ops);
                                this.setState(state => (Object.assign({}, state, { ops, previewOutput })));
                            }, onInternalChange: (form) => {
                                this.setState(state => (Object.assign({}, state, { form })));
                            }, disabled: react_1.boolean('disabled', false), layout: "default", resolver: resolver }),
                        React.createElement(ui_kit_1.Button, { type: "button", onClick: () => {
                                const warnings = __1.computeWarnings(this.state.data, this.state.ops);
                                if (warnings.length > 0) {
                                    for (const warning of warnings) {
                                        const parts = warning.op.path.split('.');
                                        if (parts.length === 3) {
                                            const res = window.confirm(`There is already a "${parts[2]}" response defined on "${parts[1]}", overwrite it?`);
                                            if (!res)
                                                return;
                                        }
                                        else if (parts.length === 2) {
                                            const res = window.confirm(`There is already a "${parts[1]}" route defined, overwrite it?`);
                                            if (!res)
                                                return;
                                        }
                                    }
                                }
                                const data = __1.applyOps(this.state.data, this.state.ops);
                                const selectOp = this.state.ops.find(x => x.op === 'select');
                                const selection = selectOp ? selectOp.path : this.state.selection;
                                this.setState(state => (Object.assign({}, state, { ops: [], data,
                                    selection })));
                            } }, "Apply")),
                    React.createElement("section", { style: {
                            gridArea: '1 / 3 / 2 / 4',
                            border: '1px solid black',
                            borderRadius: 5,
                        } },
                        React.createElement("legend", null, "Output"),
                        React.createElement("fieldset", null,
                            React.createElement("legend", null, "Result"),
                            React.createElement(ObjectInspector, { data: this.state.ops, name: "ops", initialExpandedPaths: ['root', 'root.0', 'root.1', 'root.2', 'root.3'] }),
                            React.createElement(ObjectInspector, { data: this.state.previewOutput, name: "output", initialExpandedPaths: [
                                    'root',
                                    'root.info',
                                    'root.info.*',
                                    'root.schemes',
                                    'root.paths',
                                    'root.paths.*',
                                    'root.paths.*.*',
                                    'root.paths.*.*.*',
                                    'root.200',
                                    'root.200.*',
                                ] })))))));
    }
}
exports.FormtronDebugger = FormtronDebugger;


/***/ }),

/***/ "./src/__stories__/IntegerInput.tsx":
/*!******************************************!*\
  !*** ./src/__stories__/IntegerInput.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const IntegerInput_1 = __webpack_require__(/*! ../components/IntegerInput */ "./src/components/IntegerInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('IntegerInput', () => {
    return (React.createElement(ui_kit_1.Box, { width: "300px" },
        React.createElement(IntegerInput_1.IntegerInput, { value: react_2.number('value', 42), path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                required: react_2.boolean('schema.required', false),
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: {}, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/JsonInput.tsx":
/*!***************************************!*\
  !*** ./src/__stories__/JsonInput.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const JsonInput_1 = __webpack_require__(/*! ../components/JsonInput */ "./src/components/JsonInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('JsonInput', () => {
    return (React.createElement(ui_kit_1.Box, { width: "300px" },
        React.createElement(JsonInput_1.JsonInput, { value: react_2.object('value', {
                _id: '5c1ae511f09121c5887e5a93',
                index: 0,
                guid: 'f5c7f172-8e61-4a92-b407-1d76f5dfa792',
                isActive: true,
                balance: '$3,944.87',
                picture: 'http://placehold.it/32x32',
                age: 39,
                eyeColor: 'green',
                name: {
                    first: 'Weeks',
                    last: 'Barton',
                },
            }), path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                required: react_2.boolean('schema.required', false),
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: {}, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Layouts.tsx":
/*!*************************************!*\
  !*** ./src/__stories__/Layouts.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const __1 = __webpack_require__(/*! .. */ "./src/index.ts");
const components_1 = __webpack_require__(/*! ../components */ "./src/components/index.ts");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
const data = __webpack_require__(/*! ./examples/layouts/data.json */ "./src/__stories__/examples/layouts/data.json");
const schema = __webpack_require__(/*! ./examples/layouts/schema.json */ "./src/__stories__/examples/layouts/schema.json");
const dataNested = __webpack_require__(/*! ./examples/nested-layouts/data.json */ "./src/__stories__/examples/nested-layouts/data.json");
const schemaNested = __webpack_require__(/*! ./examples/nested-layouts/schema.json */ "./src/__stories__/examples/nested-layouts/schema.json");
react_1.storiesOf('Layouts', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('examples', () => {
    return (React.createElement(ui_kit_1.Box, { width: "500px" },
        React.createElement(__1.Formtron, { fieldComponents: components_1.fieldComponents, value: data, schema: schema, selection: ".", onChange: addon_actions_1.action('onChange'), layout: react_2.select('layout', ['', '2-col', '3-col', 'hide-some', 'wild'], '') })));
})
    .add('nested layouts', () => {
    return (React.createElement(ui_kit_1.Box, { width: "500px" },
        React.createElement(__1.Formtron, { fieldComponents: components_1.fieldComponents, value: dataNested, schema: schemaNested, selection: ".", onChange: addon_actions_1.action('onChange'), layout: react_2.select('layout', ['2-col', '4-col'], '2-col') })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/MarkdownInput.tsx":
/*!*******************************************!*\
  !*** ./src/__stories__/MarkdownInput.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const Box_1 = __webpack_require__(/*! @stoplight/ui-kit/Box */ "./node_modules/@stoplight/ui-kit/Box.js");
const MarkdownInput_1 = __webpack_require__(/*! ../components/MarkdownInput */ "./src/components/MarkdownInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('MarkdownInput', () => {
    return (React.createElement(Box_1.Box, { width: "500px" },
        React.createElement(MarkdownInput_1.MarkdownInput, { value: react_2.text('value', `# What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

# Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`), path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                required: react_2.boolean('schema.required', false),
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: {}, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Messages.tsx":
/*!**************************************!*\
  !*** ./src/__stories__/Messages.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const IntegerInput_1 = __webpack_require__(/*! ../components/IntegerInput */ "./src/components/IntegerInput.tsx");
const Messages_1 = __webpack_require__(/*! ../components/Messages */ "./src/components/Messages.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('Messages', () => {
    return (React.createElement(ui_kit_1.Flex, { flexDirection: "column", width: "300px", m: 11 },
        React.createElement(Messages_1.Messages, { path: [] },
            React.createElement(IntegerInput_1.IntegerInput, { value: 42, path: [], schema: {
                    title: 'Title',
                    required: false,
                }, onChange: () => void 0, fieldComponents: {}, disabled: false })),
        React.createElement(Messages_1.Messages, { path: [] },
            React.createElement(IntegerInput_1.IntegerInput, { value: 42, path: [], schema: {
                    title: 'Title',
                    required: false,
                }, onChange: () => void 0, fieldComponents: {}, disabled: false }))));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/MultiselectInput.tsx":
/*!**********************************************!*\
  !*** ./src/__stories__/MultiselectInput.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const SelectInput_1 = __webpack_require__(/*! ../components/SelectInput */ "./src/components/SelectInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('MultiselectInput', () => {
    const options = ['choice a', 'choice b', 'choice c'];
    return (React.createElement(ui_kit_1.Box, { width: "300px" },
        React.createElement(SelectInput_1.MultiselectInput, { value: react_2.array('value', ['choice a']), path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                options,
                required: react_2.boolean('schema.required', false),
                strict: react_2.boolean('schema.strict', false),
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: {}, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/ObjectInput.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/ObjectInput.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const components_1 = __webpack_require__(/*! ../components */ "./src/components/index.ts");
const ObjectInput_1 = __webpack_require__(/*! ../components/ObjectInput */ "./src/components/ObjectInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('ObjectInput', () => {
    return (React.createElement(ui_kit_1.Box, { width: "300px" },
        React.createElement(ObjectInput_1.ObjectInput, { value: { first: 42, second: 23, third: 97 }, path: [], schema: {
                type: 'object',
                title: 'Object',
                keys: {
                    type: 'string',
                    title: 'Name',
                },
                values: {
                    type: 'integer',
                    title: 'Number',
                },
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: components_1.fieldComponents, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/SelectInput.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/SelectInput.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const Box_1 = __webpack_require__(/*! @stoplight/ui-kit/Box */ "./node_modules/@stoplight/ui-kit/Box.js");
const SelectInput_1 = __webpack_require__(/*! ../components/SelectInput */ "./src/components/SelectInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('SelectInput', () => {
    const options = ['choice a', 'choice b', 'choice c'];
    return (React.createElement(Box_1.Box, { width: "300px" },
        React.createElement(SelectInput_1.SelectInput, { value: react_2.select('value', options, 'choice a'), path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                options,
                required: react_2.boolean('schema.required', false),
                strict: react_2.boolean('schema.strict', false),
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: {}, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/StringInput.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/StringInput.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const Box_1 = __webpack_require__(/*! @stoplight/ui-kit/Box */ "./node_modules/@stoplight/ui-kit/Box.js");
const StringInput_1 = __webpack_require__(/*! ../components/StringInput */ "./src/components/StringInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('StringInput', () => {
    return (React.createElement(Box_1.Box, { width: "300px", m: 11 },
        React.createElement(StringInput_1.StringInput, { value: react_2.text('value', 'some text'), path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                required: react_2.boolean('schema.required', false),
                minLength: react_2.text('schema.minLength', null),
                maxLength: react_2.text('schema.maxLength', null),
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: {}, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/ToggleInput.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/ToggleInput.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_2 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const Box_1 = __webpack_require__(/*! @stoplight/ui-kit/Box */ "./node_modules/@stoplight/ui-kit/Box.js");
const ToggleInput_1 = __webpack_require__(/*! ../components/ToggleInput */ "./src/components/ToggleInput.tsx");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
react_1.storiesOf('Inputs', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.Theme)
    .addDecorator(decorators_1.Tooltips)
    .add('ToggleInput', () => {
    return (React.createElement(Box_1.Box, { width: "300px" },
        React.createElement(ToggleInput_1.ToggleInput, { value: react_2.boolean('value', true), path: [], schema: {
                title: react_2.text('schema.title', 'Title'),
                required: react_2.boolean('schema.required', false),
            }, onChange: addon_actions_1.action('onChange'), fieldComponents: {}, disabled: react_2.boolean('disabled', false) })));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/autocompletionSources.ts":
/*!**************************************************!*\
  !*** ./src/__stories__/autocompletionSources.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
function sleep(ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
    });
}
function genericAsyncResults(defaults) {
    return (inputValue) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield sleep(1000);
        if (!inputValue) {
            return [
                {
                    value: null,
                    label: 'Showing first 2 results. Enter search keyword for more.',
                },
                ...defaults.map(v => ({ value: v, label: v })),
            ];
        }
        else {
            return [
                {
                    value: inputValue,
                    label: inputValue,
                },
                {
                    value: `alt_${inputValue}`,
                    label: `alt_${inputValue}`,
                },
                {
                    value: `${inputValue}-v2`,
                    label: `${inputValue}-v2`,
                },
                {
                    value: `${inputValue}-v3`,
                    label: `${inputValue}-v3`,
                },
            ];
        }
    });
}
exports.autocompletionSources = {
    tags: genericAsyncResults(['Todos', 'Admin']),
    models: genericAsyncResults(['TodoItem', 'TodoStatus']),
};


/***/ }),

/***/ "./src/__stories__/customWidgets.tsx":
/*!*******************************************!*\
  !*** ./src/__stories__/customWidgets.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
exports.customWidgets = {
    randomNumber: (props) => (React.createElement(ui_kit_1.Button, { type: "button", ml: 7, fontSize: 4, disabled: props.disabled, onClick: () => props.onChange(String(Math.floor(Math.random() * 500))) }, "\uD83C\uDFB2")),
    randomOption: (props) => (React.createElement(ui_kit_1.Button, { ml: 7, fontSize: 4, type: "button", disabled: props.disabled, onClick: () => props.onChange(props.schema.options[Math.floor(Math.random() * props.schema.options.length)]) }, "\uD83C\uDFB2")),
    addMoreAwesomeness: (props) => (React.createElement(ui_kit_1.Button, { title: "Add more awesomeness", ml: 7, fontSize: 4, type: "button", disabled: props.disabled, onClick: () => props.onChange([...props.value, 'awesome']) }, "\uD83D\uDD25")),
};


/***/ }),

/***/ "./src/__stories__/decorators.tsx":
/*!****************************************!*\
  !*** ./src/__stories__/decorators.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const theme_1 = __webpack_require__(/*! ../theme */ "./src/theme.ts");
const DiagnosticMessagesContext_1 = __webpack_require__(/*! ../components/DiagnosticMessagesContext */ "./src/components/DiagnosticMessagesContext.ts");
exports.Tooltips = (storyFn) => {
    const getMessages = path => {
        const summary = react_1.text('message', '');
        if (summary === '')
            return [];
        if (path.length > 0)
            return [];
        return [
            {
                message: react_1.text('message', ''),
                severity: react_1.select('severity', [0, 1, 2, 3], 1),
            },
        ];
    };
    return React.createElement(DiagnosticMessagesContext_1.DiagnosticMessagesContext.Provider, { value: getMessages }, storyFn());
};
exports.PathTooltips = (storyFn) => {
    const getMessages = path => {
        return react_1.boolean('show path tooltips', false)
            ? [
                {
                    message: path.join(' > '),
                    severity: react_1.select('severity', [0, 1, 2, 3], 1),
                },
            ]
            : [];
    };
    return React.createElement(DiagnosticMessagesContext_1.DiagnosticMessagesContext.Provider, { value: getMessages }, storyFn());
};
exports.Theme = (storyFn) => React.createElement(theme_1.ThemeZone, { name: "formtron" }, storyFn());


/***/ }),

/***/ "./src/__stories__/examples/array/data.json":
/*!**************************************************!*\
  !*** ./src/__stories__/examples/array/data.json ***!
  \**************************************************/
/*! exports provided: _selection, paths, default */
/***/ (function(module) {

module.exports = {"_selection":"paths./todos.get","paths":{"/todos":{"get":{"tags":["Todos"],"numbers":[42,23,17]}}}};

/***/ }),

/***/ "./src/__stories__/examples/array/schema.json":
/*!****************************************************!*\
  !*** ./src/__stories__/examples/array/schema.json ***!
  \****************************************************/
/*! exports provided: $schema, title, description, type, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","title":"Arrays","description":"Several types of arrays","type":"form","fields":{"paths.*.*.tags":{"type":"array","title":"Strings","default":"","items":{"title":"Tag name","type":"string"}},"paths.*.*.numbers":{"type":"array","title":"Integers","default":0,"items":{"title":"Number","type":"integer"}},"paths.*.*.schemes":{"type":"array","title":"Multiselects","default":[],"items":{"title":"Scheme","type":"multiselect","options":["http","https","ws","wss"]}}}};

/***/ }),

/***/ "./src/__stories__/examples/custom-widget/data.json":
/*!**********************************************************!*\
  !*** ./src/__stories__/examples/custom-widget/data.json ***!
  \**********************************************************/
/*! exports provided: _selection, paths, default */
/***/ (function(module) {

module.exports = {"_selection":"paths./todos.get","paths":{"/todos":{"get":{"tags":["Todos"]}}}};

/***/ }),

/***/ "./src/__stories__/examples/custom-widget/schema.json":
/*!************************************************************!*\
  !*** ./src/__stories__/examples/custom-widget/schema.json ***!
  \************************************************************/
/*! exports provided: $schema, title, description, type, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","title":"Form (OASv2 Operation Node)","description":"An HTTP operation.","type":"form","fields":{"paths.*.?":{"type":"select","options":["get","post","put","delete","options"],"title":"Method","custom":{"widget":"randomOption"}},"paths.?":{"type":"string","title":"path","required":true},"paths.*.*.tags":{"type":"multiselect","title":"Tag","custom":{"source":"tags","widget":"addMoreAwesomeness"}}}};

/***/ }),

/***/ "./src/__stories__/examples/enable/data.json":
/*!***************************************************!*\
  !*** ./src/__stories__/examples/enable/data.json ***!
  \***************************************************/
/*! exports provided: _selection, securityDefinitions, default */
/***/ (function(module) {

module.exports = {"_selection":"securityDefinitions.petstore_auth","securityDefinitions":{"petstore_auth":{"type":"oauth2","authorizationUrl":"https://petstore.swagger.io/oauth/dialog","flow":"implicit","scopes":{"write:pets":"modify pets in your account","read:pets":"read your pets"}},"api_key":{"type":"apiKey","name":"api_key","in":"header"}}};

/***/ }),

/***/ "./src/__stories__/examples/enable/schema.json":
/*!*****************************************************!*\
  !*** ./src/__stories__/examples/enable/schema.json ***!
  \*****************************************************/
/*! exports provided: $schema, type, title, description, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","title":"Security","description":"A shared security scheme definition","fields":{"securityDefinitions.?":{"type":"string","title":"securityId"},"securityDefinitions.*.type":{"type":"select","title":"Type","options":["basic","apiKey","oauth2"]},"securityDefinitions.*.description":{"type":"string","title":"Description"},"securityDefinitions.*.name":{"type":"string","title":"Name","enabled":"type === 'apiKey'"},"securityDefinitions.*.in":{"type":"select","title":"In","options":["query","header"],"enabled":"type === 'apiKey'"},"securityDefinitions.*.flow":{"type":"select","title":"Flow","options":["implicit","password","application","accessCode"],"enabled":"type === 'oauth2'"},"securityDefinitions.*.authorizationUrl":{"type":"string","title":"Authorization URL","enabled":"type === 'oauth2' && (flow === 'implicit' || flow === 'accessCode')"},"securityDefinitions.*.tokenUrl":{"type":"string","title":"Token URL","enabled":"type === 'oauth2' && (flow === 'password' || flow === 'application' || flow === 'accessCode')"},"securityDefinitions.*.scopes":{"type":"object","title":"Scopes","default":"","keys":{"type":"string","title":"Name"},"values":{"type":"string","title":"Description"},"enabled":"type === 'oauth2'"}}};

/***/ }),

/***/ "./src/__stories__/examples/evalOptions/data.json":
/*!********************************************************!*\
  !*** ./src/__stories__/examples/evalOptions/data.json ***!
  \********************************************************/
/*! exports provided: _selection, paths, default */
/***/ (function(module) {

module.exports = {"_selection":"paths.pets.get.parameters.nasino","paths":{"pets":{"get":{"parameters":{"nasino":{"name":"Nasino","in":"formData","type":"integer","format":"int32","allowEmptyValue":true}}}}}};

/***/ }),

/***/ "./src/__stories__/examples/evalOptions/schema.json":
/*!**********************************************************!*\
  !*** ./src/__stories__/examples/evalOptions/schema.json ***!
  \**********************************************************/
/*! exports provided: $schema, type, title, description, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","title":"Parameter","description":"Describes a single parameter","fields":{"paths.*.*.parameters.?":{"type":"string","title":"parameterId","required":true},"paths.*.*.parameters.*.name":{"type":"string","title":"Name","required":true},"paths.*.*.parameters.*.in":{"type":"select","title":"In","options":["query","header","path","formData","body"],"required":true},"paths.*.*.parameters.*.description":{"type":"string","title":"Description"},"paths.*.*.parameters.*.required":{"type":"checkbox","title":"Required"},"paths.*.*.parameters.*.schema":{"type":"string","title":"Schema","show":"in === 'body'"},"paths.*.*.parameters.*.type":{"type":"select","title":"Type","evalOptions":"in === 'formData' ? ['string','number','integer','boolean','array','file'] : ['string','number','integer','boolean','array']","show":"in !== 'body'"},"paths.*.*.parameters.*.format":{"type":"select","title":"Format","evalOptions":"type === 'integer' ? ['int32','int64'] : type === 'number' ? ['float','double'] : type === 'string' ? ['byte','binary','date','date-time','password'] : []","strict":false},"paths.*.*.parameters.*.allowEmptyValue":{"type":"checkbox","title":"Allow Empty","show":"in === 'query' || in === 'formData'"},"paths.*.*.parameters.*.default":{"type":"string","title":"Default"},"paths.*.*.parameters.*.items":{"type":"form","title":"Items","show":"type === 'array'","fields":{"type":{"type":"select","title":"Type","options":["string","number","integer","boolean","array"]}}}}};

/***/ }),

/***/ "./src/__stories__/examples/layouts/data.json":
/*!****************************************************!*\
  !*** ./src/__stories__/examples/layouts/data.json ***!
  \****************************************************/
/*! exports provided: _selection, a, b, c, d, e, f, default */
/***/ (function(module) {

module.exports = {"_selection":".","a":"show all","b":"Bravo","c":"Charlie\nCharlie\nCharlie\nCharlie\nCharlie","d":"Delta","e":"Echo","f":"Foxtrot\nFoxtrot\nFoxtrot\nFoxtrot\nFoxtrot"};

/***/ }),

/***/ "./src/__stories__/examples/layouts/schema.json":
/*!******************************************************!*\
  !*** ./src/__stories__/examples/layouts/schema.json ***!
  \******************************************************/
/*! exports provided: $schema, type, title, description, layouts, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","title":"Layout Examples","description":"Play with the layout prop in the knobs panel","layouts":{"2-col":["a b","e d","c f"],"3-col":["a b c","d e f"],"hide-some":["a b","d e"],"wild":["c c a","d b","f f f e"]},"fields":{"a":{"type":"select","title":"A","options":["show all","hide B","hide E and D"],"strict":true},"b":{"type":"string","title":"B","show":"a !== 'hide B'"},"c":{"type":"markdown","title":"C"},"d":{"type":"string","title":"D","show":"a !== 'hide E and D'"},"e":{"type":"string","title":"E","show":"a !== 'hide E and D'"},"f":{"type":"markdown","title":"F"}}};

/***/ }),

/***/ "./src/__stories__/examples/nested-layouts/data.json":
/*!***********************************************************!*\
  !*** ./src/__stories__/examples/nested-layouts/data.json ***!
  \***********************************************************/
/*! exports provided: _selection, a, b, c, d, e, j, default */
/***/ (function(module) {

module.exports = {"_selection":".","a":"Alpha","b":"Bravo","c":"Charlie","d":"Delta","e":{"f":"Foxtrot","g":"Golf","h":"Hotel","i":"India"},"j":{"k":{"f":"Foxtrot","g":"Golf","h":"Hotel","i":"India"},"l":{"f":"Foxtrot","g":"Golf","h":"Hotel","i":"India"},"m":{"f":"Foxtrot","g":"Golf","h":"Hotel","i":"India"},"n":{"f":"Foxtrot","g":"Golf","h":"Hotel","i":"India"}}};

/***/ }),

/***/ "./src/__stories__/examples/nested-layouts/schema.json":
/*!*************************************************************!*\
  !*** ./src/__stories__/examples/nested-layouts/schema.json ***!
  \*************************************************************/
/*! exports provided: $schema, type, title, description, layouts, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","title":"Layout Examples","description":"Play with the layout prop in the knobs panel","layouts":{"2-col":["a b","c d","e e","j j"],"4-col":["a b c d","e e e e","j j j j"]},"fields":{"a":{"type":"string","title":"A"},"b":{"type":"string","title":"B"},"c":{"type":"string","title":"C"},"d":{"type":"string","title":"D"},"e":{"type":"form","title":"E","layouts":{"2-col":["f g","h i"],"4-col":["f g h i"]},"fields":{"f":{"type":"string","title":"F"},"g":{"type":"string","title":"G"},"h":{"type":"string","title":"H"},"i":{"type":"string","title":"I"}}},"j":{"title":"J","type":"object","default":{"f":"","g":"","h":"","i":""},"keys":{"title":"key","type":"string"},"values":{"type":"form","title":"value","layouts":{"2-col":["f","g","h","i"],"4-col":["f g","h i"]},"fields":{"f":{"type":"string","title":"F"},"g":{"type":"string","title":"G"},"h":{"type":"string","title":"H"},"i":{"type":"string","title":"I"}}}}}};

/***/ }),

/***/ "./src/__stories__/examples/object/data.json":
/*!***************************************************!*\
  !*** ./src/__stories__/examples/object/data.json ***!
  \***************************************************/
/*! exports provided: _selection, paths, default */
/***/ (function(module) {

module.exports = {"_selection":"paths./todos.get","paths":{"/todos":{"get":{"strings":{"authorization":"Bearer TOKEN","content-type":"application/json","expires":"Tuesday"},"numbers":{"answer":42,"leet":1337,"there-can-be-only":1},"json":{"200":["foo","bar"],"404":{"foo":"bar"}},"select":{"post":201,"get":200,"delete":204},"security":{"basic":[],"oauth2":["read:repo","write:repo"]}}}}};

/***/ }),

/***/ "./src/__stories__/examples/object/schema.json":
/*!*****************************************************!*\
  !*** ./src/__stories__/examples/object/schema.json ***!
  \*****************************************************/
/*! exports provided: $schema, title, description, type, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","title":"Objects","description":"Several types of objects","type":"form","fields":{"paths.*.*.strings":{"type":"object","title":"Strings","keys":{"title":"Header","type":"string"},"values":{"title":"Value","type":"string"},"default":""},"paths.*.*.numbers":{"type":"object","title":"Integers","keys":{"title":"Name","type":"string"},"values":{"title":"Number","type":"integer"},"default":0},"paths.*.*.json":{"type":"object","title":"Examples","keys":{"title":"Status Code","type":"integer"},"values":{"title":"Response","type":"json"},"default":{}},"paths.*.*.select":{"type":"object","title":"Select","keys":{"title":"Method","type":"select","options":["get","post","put","delete","options"]},"values":{"title":"Status Code","type":"integer"},"default":100},"paths.*.*.security":{"title":"Security","type":"object","keys":{"title":"Security Scheme","type":"string"},"values":{"title":"OAuth2 Scopes","type":"multiselect"},"default":[]}}};

/***/ }),

/***/ "./src/__stories__/examples/resolver/data.json":
/*!*****************************************************!*\
  !*** ./src/__stories__/examples/resolver/data.json ***!
  \*****************************************************/
/*! exports provided: _selection, name, age, magic, default */
/***/ (function(module) {

module.exports = {"_selection":".","name":"Alice","age":1,"magic":{"portal":{"to":{"somewhere":"A real value"}}}};

/***/ }),

/***/ "./src/__stories__/examples/resolver/schema.json":
/*!*******************************************************!*\
  !*** ./src/__stories__/examples/resolver/schema.json ***!
  \*******************************************************/
/*! exports provided: $schema, type, title, description, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","title":"Simplest Ever Form","description":"A string, an integer, and a checkbox walk into a form","fields":{"name":{"type":"string","title":"Name"},"age":{"type":"integer","title":"Age","required":true},"checked":{"type":"checkbox","title":"Checked"},"magic.portal.to.somewhere":{"type":"string","title":"A path that exists","enabled":"false"},"magic.portal.to.nowhere":{"type":"string","title":"Non-existant path","enabled":"false"}}};

/***/ }),

/***/ "./src/__stories__/examples/show/data.json":
/*!*************************************************!*\
  !*** ./src/__stories__/examples/show/data.json ***!
  \*************************************************/
/*! exports provided: _selection, securityDefinitions, default */
/***/ (function(module) {

module.exports = {"_selection":"securityDefinitions.petstore_auth","securityDefinitions":{"petstore_auth":{"type":"oauth2","authorizationUrl":"https://petstore.swagger.io/oauth/dialog","flow":"implicit","scopes":{"write:pets":"modify pets in your account","read:pets":"read your pets"}},"api_key":{"type":"apiKey","name":"api_key","in":"header"}}};

/***/ }),

/***/ "./src/__stories__/examples/show/schema.json":
/*!***************************************************!*\
  !*** ./src/__stories__/examples/show/schema.json ***!
  \***************************************************/
/*! exports provided: $schema, type, title, description, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","title":"Security","description":"A shared security scheme definition","fields":{"securityDefinitions.?":{"type":"string","title":"securityId"},"securityDefinitions.*.type":{"type":"select","title":"Type","options":["basic","apiKey","oauth2"]},"securityDefinitions.*.description":{"type":"string","title":"Description"},"securityDefinitions.*.name":{"type":"string","title":"Name","show":"type === 'apiKey'"},"securityDefinitions.*.in":{"type":"select","title":"In","options":["query","header"],"show":"type === 'apiKey'"},"securityDefinitions.*.flow":{"type":"select","title":"Flow","options":["implicit","password","application","accessCode"],"show":"type === 'oauth2'"},"securityDefinitions.*.authorizationUrl":{"type":"string","title":"Authorization URL","show":"type === 'oauth2' && (flow === 'implicit' || flow === 'accessCode')"},"securityDefinitions.*.tokenUrl":{"type":"string","title":"Token URL","show":"type === 'oauth2' && (flow === 'password' || flow === 'application' || flow === 'accessCode')"},"securityDefinitions.*.scopes":{"type":"object","title":"Scopes","default":"","keys":{"type":"string","title":"Name"},"values":{"type":"string","title":"Description"},"show":"type === 'oauth2'"}}};

/***/ }),

/***/ "./src/__stories__/index.ts":
/*!**********************************!*\
  !*** ./src/__stories__/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./ArrayInput */ "./src/__stories__/ArrayInput.tsx");
__webpack_require__(/*! ./CheckboxInput */ "./src/__stories__/CheckboxInput.tsx");
__webpack_require__(/*! ./Form */ "./src/__stories__/Form.tsx");
__webpack_require__(/*! ./IntegerInput */ "./src/__stories__/IntegerInput.tsx");
__webpack_require__(/*! ./JsonInput */ "./src/__stories__/JsonInput.tsx");
__webpack_require__(/*! ./Layouts */ "./src/__stories__/Layouts.tsx");
__webpack_require__(/*! ./MarkdownInput */ "./src/__stories__/MarkdownInput.tsx");
__webpack_require__(/*! ./Messages */ "./src/__stories__/Messages.tsx");
__webpack_require__(/*! ./MultiselectInput */ "./src/__stories__/MultiselectInput.tsx");
__webpack_require__(/*! ./ObjectInput */ "./src/__stories__/ObjectInput.tsx");
__webpack_require__(/*! ./SelectInput */ "./src/__stories__/SelectInput.tsx");
__webpack_require__(/*! ./stories */ "./src/__stories__/stories.tsx");
__webpack_require__(/*! ./StringInput */ "./src/__stories__/StringInput.tsx");
__webpack_require__(/*! ./ToggleInput */ "./src/__stories__/ToggleInput.tsx");


/***/ }),

/***/ "./src/__stories__/stories.tsx":
/*!*************************************!*\
  !*** ./src/__stories__/stories.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const decorators_1 = __webpack_require__(/*! ./decorators */ "./src/__stories__/decorators.tsx");
const FormtronDebugger_1 = __webpack_require__(/*! ./FormtronDebugger */ "./src/__stories__/FormtronDebugger.tsx");
const simpleData = __webpack_require__(/*! ../__tests__/examples/simple/data.json */ "./src/__tests__/examples/simple/data.json");
const simpleSchema = __webpack_require__(/*! ../__tests__/examples/simple/schema.json */ "./src/__tests__/examples/simple/schema.json");
const variousData = __webpack_require__(/*! ../__tests__/examples/various-types/data.json */ "./src/__tests__/examples/various-types/data.json");
const variousSchema = __webpack_require__(/*! ../__tests__/examples/various-types/schema.json */ "./src/__tests__/examples/various-types/schema.json");
const wildcardData = __webpack_require__(/*! ../__tests__/examples/wildcards/data.json */ "./src/__tests__/examples/wildcards/data.json");
const wildcardSchema = __webpack_require__(/*! ../__tests__/examples/wildcards/schema.json */ "./src/__tests__/examples/wildcards/schema.json");
const complexData = __webpack_require__(/*! ../__tests__/examples/complex/data.json */ "./src/__tests__/examples/complex/data.json");
const complexSchema = __webpack_require__(/*! ../__tests__/examples/complex/schema.json */ "./src/__tests__/examples/complex/schema.json");
const dependentData = __webpack_require__(/*! ../__tests__/examples/dependent-variables/data.json */ "./src/__tests__/examples/dependent-variables/data.json");
const dependendSchema1 = __webpack_require__(/*! ../__tests__/examples/dependent-variables/schemaA.json */ "./src/__tests__/examples/dependent-variables/schemaA.json");
const dependentSchema2 = __webpack_require__(/*! ../__tests__/examples/dependent-variables/schemaB.json */ "./src/__tests__/examples/dependent-variables/schemaB.json");
const rootData = __webpack_require__(/*! ../__tests__/examples/root/data.json */ "./src/__tests__/examples/root/data.json");
const rootSchema = __webpack_require__(/*! ../__tests__/examples/root/schema.json */ "./src/__tests__/examples/root/schema.json");
const customWidgetData = __webpack_require__(/*! ./examples/custom-widget/data.json */ "./src/__stories__/examples/custom-widget/data.json");
const customWidgetSchema = __webpack_require__(/*! ./examples/custom-widget/schema.json */ "./src/__stories__/examples/custom-widget/schema.json");
const arrayData = __webpack_require__(/*! ./examples/array/data.json */ "./src/__stories__/examples/array/data.json");
const arraySchema = __webpack_require__(/*! ./examples/array/schema.json */ "./src/__stories__/examples/array/schema.json");
const objectData = __webpack_require__(/*! ./examples/object/data.json */ "./src/__stories__/examples/object/data.json");
const objectSchema = __webpack_require__(/*! ./examples/object/schema.json */ "./src/__stories__/examples/object/schema.json");
const showData = __webpack_require__(/*! ./examples/show/data.json */ "./src/__stories__/examples/show/data.json");
const showSchema = __webpack_require__(/*! ./examples/show/schema.json */ "./src/__stories__/examples/show/schema.json");
const enableData = __webpack_require__(/*! ./examples/enable/data.json */ "./src/__stories__/examples/enable/data.json");
const enableSchema = __webpack_require__(/*! ./examples/enable/schema.json */ "./src/__stories__/examples/enable/schema.json");
const evalOptionsData = __webpack_require__(/*! ./examples/evalOptions/data.json */ "./src/__stories__/examples/evalOptions/data.json");
const evalOptionsSchema = __webpack_require__(/*! ./examples/evalOptions/schema.json */ "./src/__stories__/examples/evalOptions/schema.json");
const resolverData = __webpack_require__(/*! ./examples/resolver/data.json */ "./src/__stories__/examples/resolver/data.json");
const resolverSchema = __webpack_require__(/*! ./examples/resolver/schema.json */ "./src/__stories__/examples/resolver/schema.json");
const free_solid_svg_icons_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
ui_kit_1.IconLibrary.add(free_solid_svg_icons_1.faCheck);
react_1.storiesOf('formtron', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(decorators_1.PathTooltips)
    .add('simple', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: simpleData, schema: simpleSchema, selection: simpleData._selection });
})
    .add('various types', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: variousData, schema: variousSchema, selection: variousData._selection });
})
    .add('wildcards', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: wildcardData, schema: wildcardSchema, selection: wildcardData._selection });
})
    .add('complex', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: complexData, schema: complexSchema, selection: complexData._selection });
})
    .add('dependent variables 1', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: dependentData, schema: dependendSchema1, selection: dependentData._selection });
})
    .add('dependent variables 2', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: dependentData, schema: dependentSchema2, selection: dependentData._selection });
})
    .add('custom widgets', () => {
    return (React.createElement(FormtronDebugger_1.FormtronDebugger, { input: customWidgetData, schema: customWidgetSchema, selection: customWidgetData._selection }));
})
    .add('array', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: arrayData, schema: arraySchema, selection: arrayData._selection });
})
    .add('object', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: objectData, schema: objectSchema, selection: objectData._selection });
})
    .add('show', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: showData, schema: showSchema, selection: showData._selection });
})
    .add('enable', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: enableData, schema: enableSchema, selection: enableData._selection });
})
    .add('evalOptions', () => {
    return (React.createElement(FormtronDebugger_1.FormtronDebugger, { input: evalOptionsData, schema: evalOptionsSchema, selection: evalOptionsData._selection }));
})
    .add('root data node', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: rootData, schema: rootSchema, selection: "title" });
})
    .add('custom resolver', () => {
    return React.createElement(FormtronDebugger_1.FormtronDebugger, { input: resolverData, schema: resolverSchema, selection: "title" });
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__tests__/examples/complex/data.json":
/*!**************************************************!*\
  !*** ./src/__tests__/examples/complex/data.json ***!
  \**************************************************/
/*! exports provided: _selection, tags, paths, default */
/***/ (function(module) {

module.exports = {"_selection":"paths./todos.get.responses.200","tags":[{"name":"Admin"},{"name":"Todos"}],"paths":{"/todos":{"get":{"tags":["Todos"],"description":"Foo","responses":{"200":{"description":"A successful response","foos":["hello","world"],"content":{"json":{"is":"arbitrary","data":null}},"headers":[{"name":"Authorization","type":"bug","format":"json","x-info":"custom-data","description":"cool","default":""}],"schema":[],"examples":{"application/json":[{"id":1,"name":"design the thingz","completed":true},{"id":2,"name":"mock the thingz","completed":true},{"id":3,"name":"code the thingz","completed":false}],"empty":[]}}}}}}};

/***/ }),

/***/ "./src/__tests__/examples/complex/schema.json":
/*!****************************************************!*\
  !*** ./src/__tests__/examples/complex/schema.json ***!
  \****************************************************/
/*! exports provided: $schema, type, title, description, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","title":"HTTP Response","description":"HTTP Response","fields":{"paths.*.*.responses.?":{"type":"integer","title":"Code","custom":{"widget":"randomNumber"}},"paths.*.*.responses.*.description":{"type":"markdown","title":"Description","minLength":4,"required":true},"paths.*.*.responses.*.content":{"type":"json","title":"Content"},"paths.*.*.responses.*.headers":{"type":"array","title":"Headers","default":{"name":"","type":"bug","format":"json","default":"","description":""},"items":{"title":"Header","type":"form","fields":{"name":{"type":"string","title":"Name","path":"name"},"type":{"type":"select","title":"Type","path":"type","options":["bug","hot","cold"]},"format":{"type":"select","title":"Format","path":"format","options":["json","hot","cold"]},"default":{"type":"string","title":"Default","path":"default"},"description":{"type":"string","title":"Description","path":"description"}}}},"paths.*.*.responses.*.schema":{"type":"multiselect","title":"Schema","custom":{"source":"models"}},"paths.*.*.responses.*.examples":{"type":"object","title":"Examples","default":{},"keys":{"type":"string","title":"Name"},"values":{"type":"json","title":"Content"}}}};

/***/ }),

/***/ "./src/__tests__/examples/dependent-variables/data.json":
/*!**************************************************************!*\
  !*** ./src/__tests__/examples/dependent-variables/data.json ***!
  \**************************************************************/
/*! exports provided: _selection, paths, default */
/***/ (function(module) {

module.exports = {"_selection":"paths./api.get","paths":{"/api":{"get":{"tags":"foo"}}}};

/***/ }),

/***/ "./src/__tests__/examples/dependent-variables/schemaA.json":
/*!*****************************************************************!*\
  !*** ./src/__tests__/examples/dependent-variables/schemaA.json ***!
  \*****************************************************************/
/*! exports provided: $schema, title, type, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","title":"$method listed before $path","type":"form","fields":{"paths.*.?":{"type":"string","title":"Method"},"paths.?.*":{"type":"string","title":"path","required":true},"paths.*.*.tags":{"type":"string","title":"Tag"}}};

/***/ }),

/***/ "./src/__tests__/examples/dependent-variables/schemaB.json":
/*!*****************************************************************!*\
  !*** ./src/__tests__/examples/dependent-variables/schemaB.json ***!
  \*****************************************************************/
/*! exports provided: $schema, title, type, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","title":"$path listed before $method","type":"form","fields":{"paths.*.*.tags":{"type":"string","title":"Tag"},"paths.?.*":{"type":"string","title":"path","required":true},"paths.*.?":{"type":"string","title":"Method"}}};

/***/ }),

/***/ "./src/__tests__/examples/root/data.json":
/*!***********************************************!*\
  !*** ./src/__tests__/examples/root/data.json ***!
  \***********************************************/
/*! exports provided: title, type, properties, required, default */
/***/ (function(module) {

module.exports = {"title":"User","type":"object","properties":{"name":{"type":"string","description":"The user's full name."},"age":{"type":"number","minimum":0,"maximum":150}},"required":["name","age"]};

/***/ }),

/***/ "./src/__tests__/examples/root/schema.json":
/*!*************************************************!*\
  !*** ./src/__tests__/examples/root/schema.json ***!
  \*************************************************/
/*! exports provided: $schema, type, custom, layouts, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","custom":{"title":"Model","description":"A single definition"},"layouts":{"default":["title","description","schema"]},"fields":{"":{"type":"json","title":"Schema","area":"schema"},"title":{"type":"string","title":"Title"},"description":{"type":"markdown","title":"Description"}}};

/***/ }),

/***/ "./src/__tests__/examples/simple/data.json":
/*!*************************************************!*\
  !*** ./src/__tests__/examples/simple/data.json ***!
  \*************************************************/
/*! exports provided: _selection, name, age, default */
/***/ (function(module) {

module.exports = {"_selection":".","name":"Alice","age":1};

/***/ }),

/***/ "./src/__tests__/examples/simple/schema.json":
/*!***************************************************!*\
  !*** ./src/__tests__/examples/simple/schema.json ***!
  \***************************************************/
/*! exports provided: $schema, type, title, description, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","type":"form","title":"Simplest Ever Form","description":"A string, an integer, and a checkbox walk into a form","fields":{"name":{"type":"string","title":"Name"},"age":{"type":"integer","title":"Age","required":true},"checked":{"type":"checkbox","title":"Checked"}}};

/***/ }),

/***/ "./src/__tests__/examples/various-types/data.json":
/*!********************************************************!*\
  !*** ./src/__tests__/examples/various-types/data.json ***!
  \********************************************************/
/*! exports provided: _selection, host, x-info, info, schemes, consumes, produces, colors, foo, default */
/***/ (function(module) {

module.exports = {"_selection":".","host":"todos.stoplight.io","x-info":"foobar","info":{"version":"1.0","title":"To-do Demo","x-info":"foobar","description":"Here is the markdown description.","contact":{"name":"Stoplight","url":"https://stoplight.io","x-info":"foobar"},"license":{"x-info":"foobar","name":"MIT"}},"schemes":["http"],"consumes":["application/json"],"produces":["application/json"],"colors":[],"foo":false};

/***/ }),

/***/ "./src/__tests__/examples/various-types/schema.json":
/*!**********************************************************!*\
  !*** ./src/__tests__/examples/various-types/schema.json ***!
  \**********************************************************/
/*! exports provided: $schema, title, description, type, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","title":"Form (OASv2 Root Node)","description":"Top-level properties of your OASv2 spec.","type":"form","fields":{"info.title":{"type":"string","title":"Title"},"info.version":{"type":"integer","title":"Version"},"host":{"type":"string","title":"Host","required":true},"info.description":{"type":"markdown","title":"Description"},"schemes":{"type":"multiselect","title":"Schemes","options":["http","https","ws","wss"]},"consumes":{"type":"multiselect","title":"Consumes","options":["application/json","xml","txt"]},"produces":{"type":"multiselect","title":"Produces","options":["application/json","xml","txt"]},"info.contact":{"type":"form","title":"Contact","description":"","fields":{"name":{"type":"string","title":"Name","required":true,"path":"name"},"url":{"type":"string","title":"URL","required":true,"path":"url"}}},"info.license.name":{"area":"license","type":"string","title":"License"},"foo":{"type":"checkbox","title":"Checkbox"}}};

/***/ }),

/***/ "./src/__tests__/examples/wildcards/data.json":
/*!****************************************************!*\
  !*** ./src/__tests__/examples/wildcards/data.json ***!
  \****************************************************/
/*! exports provided: _selection, tags, paths, default */
/***/ (function(module) {

module.exports = {"_selection":"paths./todos.get","tags":[{"name":"Admin"},{"name":"Todos"}],"paths":{"/todos":{"get":{"x-info":"foobar","tags":["Todos"],"taglist":[["Todos"]],"description":"Foo"},"put":{"x-info":"foobar","tags":["Admin"],"taglist":[["Admin"]],"description":"Bar"}},"/lists":{"post":{"x-info":"foobar","tags":["Todos"],"taglist":[["Todos"]],"description":"Foo"},"delete":{"x-info":"foobar","tags":["Admin"],"taglist":[["Admin"]],"description":"Bar"}}}};

/***/ }),

/***/ "./src/__tests__/examples/wildcards/schema.json":
/*!******************************************************!*\
  !*** ./src/__tests__/examples/wildcards/schema.json ***!
  \******************************************************/
/*! exports provided: $schema, title, description, type, fields, default */
/***/ (function(module) {

module.exports = {"$schema":"../../../../ui-schema.json","title":"Form (OASv2 Operation Node)","description":"An HTTP operation.","type":"form","fields":{"paths.*.?":{"type":"select","options":["get","post","put","delete","options"],"title":"Method"},"paths.?.*":{"type":"string","title":"path","required":true},"paths.*.*.tags":{"type":"multiselect","title":"Tag","custom":{"source":"tags"}},"paths.*.*.taglist":{"title":"List of Tags","type":"array","default":[],"items":{"type":"multiselect","title":"Tag","options":["Admin","Todos"]}},"paths.*.*.description":{"type":"markdown","title":"Description"}}};

/***/ }),

/***/ "./src/applyOps.ts":
/*!*************************!*\
  !*** ./src/applyOps.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const immer_1 = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.module.js");
const get = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
const set = __webpack_require__(/*! lodash/set */ "./node_modules/lodash/set.js");
const unset = __webpack_require__(/*! lodash/unset */ "./node_modules/lodash/unset.js");
const parentPath = (path) => path.slice(0, path.lastIndexOf('.'));
const childPath = (path) => path.slice(path.lastIndexOf('.') + 1);
exports.applyOps = (_data, ops) => immer_1.default(_data, data => {
    for (const op of ops) {
        switch (op.op) {
            case 'add': {
                if (op.path === '') {
                    for (const p in data) {
                        delete data[p];
                    }
                    Object.assign(data, op.value);
                }
                else {
                    set(data, op.path, op.value);
                }
                break;
            }
            case 'move': {
                if (parentPath(op.from) === parentPath(op.path)) {
                    const o = {};
                    const parent = parentPath(op.from);
                    const childFrom = childPath(op.from);
                    const childTo = childPath(op.path);
                    for (const [key, value] of Object.entries(get(data, parent))) {
                        if (key === childFrom) {
                            o[childTo] = value;
                        }
                        else {
                            o[key] = value;
                        }
                    }
                    set(data, parent, o);
                }
                else {
                    const node = get(data, op.from);
                    set(data, op.path, node);
                    unset(data, op.from);
                }
                break;
            }
        }
    }
});


/***/ }),

/***/ "./src/components/ArrayInput.tsx":
/*!***************************************!*\
  !*** ./src/components/ArrayInput.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const free_solid_svg_icons_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const FieldSet_1 = __webpack_require__(/*! ./FieldSet */ "./src/components/FieldSet.tsx");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const IconButton_1 = __webpack_require__(/*! ./IconButton */ "./src/components/IconButton.tsx");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
const EasyArray_1 = __webpack_require__(/*! ./utils/EasyArray */ "./src/components/utils/EasyArray.ts");
exports.ArrayInput = ({ id, value = [], schema, onChange, fieldComponents, disabled = false, path, layout, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    const easyArray = new EasyArray_1.EasyArray(value, schema.default);
    const Widget = fieldComponents[schema.items.type];
    return (React.createElement(Messages_1.Messages, { path: path },
        React.createElement(FieldSet_1.FieldSet, { position: "relative", variant: variant, legend: schema.title }, easyArray.items.length === 0 ? (React.createElement(ui_kit_1.Button, { fontWeight: 800, fontSize: "11px", my: 11, mx: 7, color: "rgb(118, 130, 143)", disabled: disabled, display: "inline-block", borderColor: "transparent", backgroundColor: "transparent", onClick: () => onChange(easyArray.append()) },
            React.createElement(ui_kit_1.Icon, { mr: 7, icon: free_solid_svg_icons_1.faPlus }),
            " Add Item")) : (easyArray.items.map((val, index) => {
            return (React.createElement(ui_kit_1.Flex, { my: 11, mx: 7, key: `${index}-${value.length}` },
                React.createElement(ui_kit_1.Box, { flex: 1, mr: "10px" },
                    React.createElement(Widget, { id: (id && `${id}-${index}`) || undefined, value: val, schema: schema.items, path: [...path, String(index)], fieldComponents: fieldComponents, onChange: _val => onChange(easyArray.update(index, _val)), disabled: disabled, layout: layout })),
                React.createElement(ui_kit_1.Flex, { flexDirection: "column", alignItems: "center", mx: "10px" },
                    React.createElement(Label_1.Label, { disabled: disabled }, "Add"),
                    React.createElement(ui_kit_1.Flex, { flex: 1, width: "100%", justifyContent: "center", alignItems: "center" },
                        React.createElement(IconButton_1.IconButton, { icon: free_solid_svg_icons_1.faPlus, onClick: () => onChange(easyArray.insert(index + 1)), disabled: disabled }))),
                React.createElement(ui_kit_1.Flex, { flexDirection: "column", alignItems: "center", ml: "10px" },
                    React.createElement(Label_1.Label, { disabled: disabled }, "Remove"),
                    React.createElement(ui_kit_1.Flex, { flex: 1, width: "100%", justifyContent: "center", alignItems: "center", disabled: disabled },
                        React.createElement(IconButton_1.IconButton, { icon: free_solid_svg_icons_1.faTrash, onClick: () => onChange(easyArray.remove(index)), disabled: disabled })))));
        })))));
};


/***/ }),

/***/ "./src/components/AutocompletionContext.ts":
/*!*************************************************!*\
  !*** ./src/components/AutocompletionContext.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.AutocompletionContext = React.createContext({});


/***/ }),

/***/ "./src/components/CheckboxInput.tsx":
/*!******************************************!*\
  !*** ./src/components/CheckboxInput.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
exports.CheckboxInput = ({ id, value, onChange, schema, path, disabled = false, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    return (React.createElement(ui_kit_1.Flex, { flexDirection: "column", width: "100%", height: "100%" },
        React.createElement(ui_kit_1.Box, null,
            React.createElement(Messages_1.Messages, { path: path },
                React.createElement(Label_1.Label, { htmlFor: id, variant: variant, disabled: disabled }, schema.title))),
        React.createElement(ui_kit_1.Flex, { alignItems: "center", flex: "1" },
            React.createElement(ui_kit_1.Checkbox, { mr: "auto", id: id, checked: value, onChange: onChange, variant: variant, disabled: disabled }))));
};


/***/ }),

/***/ "./src/components/DiagnosticMessagesContext.ts":
/*!*****************************************************!*\
  !*** ./src/components/DiagnosticMessagesContext.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.DiagnosticMessagesContext = React.createContext(() => []);


/***/ }),

/***/ "./src/components/FieldSet.tsx":
/*!*************************************!*\
  !*** ./src/components/FieldSet.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
exports.FieldSet = ({ legend, variant, children, disabled = false }) => {
    const borderColor = hooks_1.useBorder(variant) || 'currentColor';
    return (React.createElement(ui_kit_1.Box, { as: "fieldset", border: `1px solid ${borderColor}` },
        React.createElement(ui_kit_1.Box, { as: "legend", color: borderColor }, legend),
        children));
};


/***/ }),

/***/ "./src/components/Form.tsx":
/*!*********************************!*\
  !*** ./src/components/Form.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const evaluate_1 = __webpack_require__(/*! ./evaluate */ "./src/components/evaluate.ts");
const FieldSet_1 = __webpack_require__(/*! ./FieldSet */ "./src/components/FieldSet.tsx");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
const gridHelpers_1 = __webpack_require__(/*! ./utils/gridHelpers */ "./src/components/utils/gridHelpers.ts");
const replaceWildcards_1 = __webpack_require__(/*! ./utils/replaceWildcards */ "./src/components/utils/replaceWildcards.ts");
const shortName_1 = __webpack_require__(/*! ./utils/shortName */ "./src/components/utils/shortName.tsx");
exports.Form = ({ value = {}, schema, onChange, fieldComponents, path, disabled = false, layout, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    const { title, description, fields, layouts } = schema;
    const gridAreaToName = {};
    const shortValue = {};
    const fallbackRows = [];
    let contentElems = [];
    for (const fieldName in fields) {
        if (fields.hasOwnProperty(fieldName)) {
            const { area } = fields[fieldName];
            const gridArea = area || shortName_1.shortName(fieldName);
            gridAreaToName[gridArea] = fieldName;
            shortValue[gridArea] = value[fieldName];
            fallbackRows.push([gridArea]);
        }
    }
    const grid = layout && layouts && layouts[layout];
    const rows = grid ? gridHelpers_1.parseGridTemplateAreas(grid) : fallbackRows;
    for (const row of rows) {
        const cells = [];
        const flex = {};
        const cellNames = [];
        for (const gridArea of row) {
            if (flex[gridArea]) {
                flex[gridArea] += 1;
            }
            else {
                flex[gridArea] = 1;
                cellNames.push(gridArea);
            }
        }
        cellNames.forEach((gridArea, index) => {
            const name = gridAreaToName[gridArea];
            const formId = `${name}-${index}`;
            const propSchema = schema.fields[name];
            const { show, evalOptions, enabled, type } = propSchema;
            if (show && !evaluate_1.evaluate(show, shortValue, gridArea, true)) {
                return;
            }
            if (evalOptions) {
                propSchema.options = evaluate_1.evaluate(evalOptions, shortValue, gridArea, []);
            }
            const enableField = !enabled || evaluate_1.evaluate(enabled, shortValue, gridArea, true);
            const Widget = fieldComponents[type];
            if (Widget === undefined) {
                cells.push(React.createElement(ui_kit_1.Box, { flex: flex[gridArea] },
                    "No appropriate widget could be found for type \"",
                    type,
                    "\""));
            }
            else {
                cells.push(React.createElement(ui_kit_1.Box, { key: formId, flex: flex[gridArea], ml: index === 0 ? 0 : '10px', mr: index === cellNames.length - 1 ? 0 : '10px', my: "12px" },
                    React.createElement(Widget, { id: formId, value: value[name], schema: propSchema, path: replaceWildcards_1.replaceWildcards(name, path), onChange: (val) => {
                            const v = Object.assign({}, value, { [name]: val });
                            onChange(v);
                        }, fieldComponents: fieldComponents, disabled: disabled || !enableField, layout: layout })));
            }
        });
        if (cells.length > 0) {
            contentElems.push(React.createElement(ui_kit_1.Flex, null, cells));
        }
    }
    if (title) {
        contentElems = (React.createElement(FieldSet_1.FieldSet, { legend: title, variant: variant, disabled: disabled },
            React.createElement(Label_1.Label, { disabled: disabled },
                React.createElement("i", null, description)),
            contentElems));
    }
    return React.createElement(Messages_1.Messages, { path: path }, contentElems);
};


/***/ }),

/***/ "./src/components/IconButton.tsx":
/*!***************************************!*\
  !*** ./src/components/IconButton.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
exports.IconButton = ({ disabled = false, onClick, icon }) => {
    return (React.createElement(ui_kit_1.Button, { borderColor: "transparent", backgroundColor: "transparent", height: "100%", fontSize: "15px", px: 0, py: 0, onClick: onClick, disabled: disabled, color: "rgb(118, 130, 143)", css: {
            ':hover': {
                backgroundColor: 'transparent',
                color: '#1E2537',
            },
            ':active': {
                backgroundColor: 'transparent',
                fontSize: '17px',
            },
        } },
        React.createElement(ui_kit_1.Icon, { icon: icon })));
};


/***/ }),

/***/ "./src/components/IntegerInput.tsx":
/*!*****************************************!*\
  !*** ./src/components/IntegerInput.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
exports.IntegerInput = ({ id, value, schema, onChange, path, fieldComponents, disabled = false, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
    return (React.createElement(ui_kit_1.Box, null,
        React.createElement(ui_kit_1.Box, null,
            React.createElement(Messages_1.Messages, { path: path },
                React.createElement(Label_1.Label, { htmlFor: id, variant: variant, disabled: disabled }, schema.title))),
        React.createElement(ui_kit_1.Flex, null,
            React.createElement(ui_kit_1.Input, { flex: "1", type: "number", id: id, step: "1.0", value: value, onChange: (e) => onChange(Number(e.currentTarget.value)), variant: variant, disabled: disabled, width: "100%" }),
            CustomWidget && (React.createElement(CustomWidget, { value: value, schema: schema, onChange: onChange, path: path, fieldComponents: fieldComponents, disabled: disabled })))));
};


/***/ }),

/***/ "./src/components/JsonInput.tsx":
/*!**************************************!*\
  !*** ./src/components/JsonInput.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
const DraftValue_1 = __webpack_require__(/*! ./utils/DraftValue */ "./src/components/utils/DraftValue.tsx");
exports.JsonInput = ({ id, value, schema, onChange, path, disabled = false, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    return (React.createElement(DraftValue_1.DraftValue, { value: JSON.stringify(value, null, 2), onChange: draft => {
            try {
                onChange(JSON.parse(draft));
            }
            catch (err) {
            }
        } }, ({ value, onChange, nonDraftValue }) => {
        return (React.createElement(ui_kit_1.Box, null,
            React.createElement(ui_kit_1.Box, null,
                React.createElement(Messages_1.Messages, { path: path },
                    React.createElement(Label_1.Label, { htmlFor: id, variant: variant, disabled: disabled }, schema.title))),
            React.createElement(ui_kit_1.Box, null,
                React.createElement(ui_kit_1.Textarea, { flex: "1", autosize: true, color: nonDraftValue === value ? undefined : 'red', id: id, value: value, onChange: (e) => onChange(e.currentTarget.value), variant: variant, disabled: disabled, width: "100%" }))));
    }));
};


/***/ }),

/***/ "./src/components/Label.tsx":
/*!**********************************!*\
  !*** ./src/components/Label.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const toUpper = __webpack_require__(/*! lodash/toUpper */ "./node_modules/lodash/toUpper.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
exports.Label = ({ htmlFor, variant, children, disabled = false }) => {
    const disabledStyles = disabled
        ? {
            opacity: 0.6,
            cursor: 'not-allowed',
        }
        : null;
    return (React.createElement(ui_kit_1.Text, { fontWeight: 800, fontSize: "11px", mb: "6px", ml: "2px", as: "label", color: "rgb(118, 130, 143)", display: "block", htmlFor: htmlFor, css: Object.assign({}, disabledStyles) }, typeof children === 'string' ? toUpper(children) : children));
};


/***/ }),

/***/ "./src/components/MarkdownInput.tsx":
/*!******************************************!*\
  !*** ./src/components/MarkdownInput.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
const ThrottleValue_1 = __webpack_require__(/*! ./utils/ThrottleValue */ "./src/components/utils/ThrottleValue.tsx");
exports.MarkdownInput = ({ id, value, schema, onChange, path, disabled = false, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    return (React.createElement(ThrottleValue_1.ThrottleValue, { ms: 1000, value: value, onChange: onChange }, ({ value, onChange }) => (React.createElement(ui_kit_1.Box, null,
        React.createElement(ui_kit_1.Box, null,
            React.createElement(Messages_1.Messages, { path: path },
                React.createElement(Label_1.Label, { htmlFor: id, variant: variant, disabled: disabled }, schema.title))),
        React.createElement(ui_kit_1.Box, null,
            React.createElement(ui_kit_1.Textarea, { width: "100%", id: id, autosize: true, value: value, onChange: (e) => onChange(e.currentTarget.value), variant: variant, disabled: disabled }))))));
};


/***/ }),

/***/ "./src/components/Messages.tsx":
/*!*************************************!*\
  !*** ./src/components/Messages.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const Tooltip_1 = __webpack_require__(/*! @stoplight/ui-kit/Tooltip */ "./node_modules/@stoplight/ui-kit/Tooltip.js");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
exports.Messages = ({ path, children }) => {
    const { messages, variant } = hooks_1.useDiagnostics(path);
    const message = messages.map(m => m.summary || m.message).join(' | ');
    const showTooltip = message != null && message !== '';
    return (React.createElement(ui_kit_1.Popup, { posX: "left", posY: "top", padding: 3, renderContent: () => showTooltip && (React.createElement(Tooltip_1.Tooltip, { posX: "left", variant: variant }, message)), renderTrigger: () => React.createElement(ui_kit_1.Box, null, children) }));
};
exports.Messages.displayName = 'Messages';


/***/ }),

/***/ "./src/components/ObjectInput.tsx":
/*!****************************************!*\
  !*** ./src/components/ObjectInput.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const free_solid_svg_icons_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const FieldSet_1 = __webpack_require__(/*! ./FieldSet */ "./src/components/FieldSet.tsx");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const IconButton_1 = __webpack_require__(/*! ./IconButton */ "./src/components/IconButton.tsx");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
const DraftValue_1 = __webpack_require__(/*! ./utils/DraftValue */ "./src/components/utils/DraftValue.tsx");
const EasyObject_1 = __webpack_require__(/*! ./utils/EasyObject */ "./src/components/utils/EasyObject.ts");
exports.ObjectInput = ({ id, value = {}, schema, onChange, fieldComponents, path, disabled = false, layout, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    const easyObject = new EasyObject_1.EasyObject(value, schema.default);
    const KeyWidget = fieldComponents[schema.keys.type];
    const ValWidget = fieldComponents[schema.values.type];
    const noConflict = (key) => !(key in value);
    return (React.createElement(Messages_1.Messages, { path: path },
        React.createElement(FieldSet_1.FieldSet, { position: "relative", variant: variant, legend: schema.title }, easyObject.items.length === 0 ? (React.createElement(ui_kit_1.Button, { fontWeight: 800, fontSize: "11px", color: "rgb(118, 130, 143)", disabled: disabled, display: "inline-block", borderColor: "transparent", backgroundColor: "transparent", onClick: () => onChange(easyObject.append()) },
            React.createElement(ui_kit_1.Icon, { mr: 7, icon: free_solid_svg_icons_1.faPlus }),
            " Add Item")) : (easyObject.items.map((entry, index) => {
            const [key, val] = entry;
            return (React.createElement(ui_kit_1.Flex, { my: 11, mx: 7, key: `${index}-${easyObject.items.length}` },
                React.createElement(DraftValue_1.DraftValue, { value: key, onChange: _key => noConflict(_key) && onChange(easyObject.updateKey(index, _key)) }, ({ value, onChange }) => {
                    return (React.createElement(React.Fragment, null,
                        React.createElement(ui_kit_1.Box, { flex: 1, mr: "10px" },
                            React.createElement(KeyWidget, { id: (id && `${id}-${index}`) || undefined, value: value, schema: schema.keys, path: [...path, key], fieldComponents: fieldComponents, onChange: _key => onChange(_key), disabled: disabled, layout: layout }))));
                }),
                React.createElement(ui_kit_1.Box, { flex: 1, mx: "10px" },
                    React.createElement(ValWidget, { id: (id && `${id}-${index}`) || undefined, value: val, schema: schema.values, onChange: _val => onChange(easyObject.updateVal(index, _val)), path: [...path, key], fieldComponents: fieldComponents, disabled: disabled, layout: layout })),
                React.createElement(ui_kit_1.Flex, { flexDirection: "column", alignItems: "center", mx: "10px" },
                    React.createElement(Label_1.Label, { disabled: disabled }, "Add"),
                    React.createElement(ui_kit_1.Flex, { flex: 1, width: "100%", justifyContent: "center", alignItems: "center" },
                        React.createElement(IconButton_1.IconButton, { icon: free_solid_svg_icons_1.faPlus, onClick: () => onChange(easyObject.insert(index + 1)), disabled: disabled }))),
                React.createElement(ui_kit_1.Flex, { flexDirection: "column", alignItems: "center", ml: "10px" },
                    React.createElement(Label_1.Label, { disabled: disabled }, "Remove"),
                    React.createElement(ui_kit_1.Flex, { flex: 1, width: "100%", justifyContent: "center", alignItems: "center" },
                        React.createElement(IconButton_1.IconButton, { icon: free_solid_svg_icons_1.faTrash, onClick: () => onChange(easyObject.remove(index)), disabled: disabled })))));
        })))));
};


/***/ }),

/***/ "./src/components/SelectInput.tsx":
/*!****************************************!*\
  !*** ./src/components/SelectInput.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const Select_1 = __webpack_require__(/*! @stoplight/ui-kit/Select */ "./node_modules/@stoplight/ui-kit/Select.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const AutocompletionContext_1 = __webpack_require__(/*! ./AutocompletionContext */ "./src/components/AutocompletionContext.ts");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
const DraftValue_1 = __webpack_require__(/*! ./utils/DraftValue */ "./src/components/utils/DraftValue.tsx");
exports.SelectInput = ({ id, value, schema, onChange, path, fieldComponents, disabled = false, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    return (React.createElement(AutocompletionContext_1.AutocompletionContext.Consumer, null, autocompletionSources => {
        const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
        const loadOptions = schema.custom && schema.custom.source
            ? autocompletionSources[schema.custom.source]
            : schema.options
                ? () => tslib_1.__awaiter(this, void 0, void 0, function* () { return schema.options.map((o) => ({ value: o, label: o })); })
                : (search) => tslib_1.__awaiter(this, void 0, void 0, function* () { return [{ value: search, label: search }]; });
        return (React.createElement(ui_kit_1.Box, null,
            React.createElement(ui_kit_1.Box, null,
                React.createElement(Messages_1.Messages, { path: path },
                    React.createElement(Label_1.Label, { htmlFor: id, variant: variant, disabled: disabled }, schema.title))),
            React.createElement(ui_kit_1.Box, null,
                React.createElement(DraftValue_1.DraftValue, { value: value, onChange: onChange }, ({ value, onChange }) => (React.createElement(ui_kit_1.Flex, { width: "100%" },
                    React.createElement(ui_kit_1.Box, { flex: "1" },
                        React.createElement(Select_1.Select, Object.assign({ key: JSON.stringify(schema.options), value: { value, label: value }, defaultValue: { value, label: value }, defaultOptions: true, loadOptions: loadOptions, onChange: (value) => {
                                if (value === null) {
                                    onChange(value);
                                }
                                else {
                                    onChange(value.value);
                                }
                            }, menuPlacement: "auto", clearable: !schema.required, allowCreate: !schema.strict, variant: variant, disabled: disabled, searchable: false }, schema.custom && schema.custom.props))),
                    CustomWidget && (React.createElement(CustomWidget, { value: value, schema: schema, path: path, onChange: onChange, fieldComponents: fieldComponents, disabled: disabled }))))))));
    }));
};
exports.MultiselectInput = ({ id, value = [], schema, onChange, fieldComponents, path, disabled = false, }) => {
    if (!Array.isArray(value)) {
        throw new Error(`MultiSelect expects it's value prop to be an array but it was of type ${typeof value}`);
    }
    const { variant } = hooks_1.useDiagnostics(path);
    return (React.createElement(AutocompletionContext_1.AutocompletionContext.Consumer, null, autocompletionSources => {
        const CustomWidget = fieldComponents[schema.custom && schema.custom.widget];
        const loadOptions = schema.custom && schema.custom.source
            ? autocompletionSources[schema.custom.source]
            : schema.options
                ? () => tslib_1.__awaiter(this, void 0, void 0, function* () { return schema.options.map((o) => ({ value: o, label: o })); })
                : (search) => tslib_1.__awaiter(this, void 0, void 0, function* () { return [{ value: search, label: search }]; });
        return (React.createElement(ui_kit_1.Box, null,
            React.createElement(Messages_1.Messages, { path: path },
                React.createElement(Label_1.Label, { htmlFor: id, variant: variant, disabled: disabled }, schema.title)),
            React.createElement(ui_kit_1.Flex, null,
                React.createElement(ui_kit_1.Box, { flex: "1" },
                    React.createElement(Select_1.Select, Object.assign({ key: JSON.stringify(value) + JSON.stringify(schema.options), defaultValue: value.map(_value => ({ value: _value, label: _value })), isMulti: true, loadOptions: loadOptions, defaultOptions: true, onChange: (values) => values && Array.isArray(values)
                            ? onChange(values.map(v => v.value))
                            : values && onChange(values.value), menuPlacement: "auto", allowCreate: !schema.strict, variant: variant, disabled: disabled, clearable: false, searchable: false }, schema.custom && schema.custom.props))),
                CustomWidget && (React.createElement(CustomWidget, { value: value, schema: schema, path: path, onChange: onChange, fieldComponents: fieldComponents, disabled: disabled })))));
    }));
};


/***/ }),

/***/ "./src/components/StringInput.tsx":
/*!****************************************!*\
  !*** ./src/components/StringInput.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
exports.StringInput = ({ id, value = '', schema, onChange, path, disabled = false, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    return (React.createElement(ui_kit_1.Box, null,
        React.createElement(ui_kit_1.Box, null,
            React.createElement(Messages_1.Messages, { path: path },
                React.createElement(Label_1.Label, { htmlFor: id, variant: variant, disabled: disabled }, schema.title))),
        React.createElement(ui_kit_1.Box, null,
            React.createElement(ui_kit_1.Input, { type: "text", id: id, value: value, onChange: (e) => onChange(e.currentTarget.value), minLength: schema.minLength, maxLength: schema.maxLength, required: schema.required, flex: "1", variant: variant, disabled: disabled, width: "100%" }))));
};


/***/ }),

/***/ "./src/components/ToggleInput.tsx":
/*!****************************************!*\
  !*** ./src/components/ToggleInput.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const hooks_1 = __webpack_require__(/*! ./hooks */ "./src/components/hooks/index.ts");
const Label_1 = __webpack_require__(/*! ./Label */ "./src/components/Label.tsx");
const Messages_1 = __webpack_require__(/*! ./Messages */ "./src/components/Messages.tsx");
exports.ToggleInput = ({ id, value, onChange, schema, path, disabled = false, }) => {
    const { variant } = hooks_1.useDiagnostics(path);
    return (React.createElement(ui_kit_1.Flex, { flexDirection: "column", width: "100%", height: "100%" },
        React.createElement(ui_kit_1.Box, null,
            React.createElement(Messages_1.Messages, { path: path },
                React.createElement(Label_1.Label, { htmlFor: id, variant: variant, disabled: disabled }, schema.title))),
        React.createElement(ui_kit_1.Flex, { alignItems: "center", flex: "1" },
            React.createElement(ui_kit_1.Toggle, { mr: "auto", id: id, checked: value, onChange: onChange, variant: variant, disabled: disabled }))));
};


/***/ }),

/***/ "./src/components/evaluate.ts":
/*!************************************!*\
  !*** ./src/components/evaluate.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const expr = __webpack_require__(/*! expression-eval */ "./node_modules/expression-eval/index.js");
const memoize = __webpack_require__(/*! lodash/memoize */ "./node_modules/lodash/memoize.js");
const compile = memoize(expr.compile);
function evaluate(str, context, currentProp, fallbackValue, debug = false) {
    const _context = {};
    for (const prop in context) {
        if (prop === currentProp)
            break;
        _context[prop] = context[prop];
    }
    try {
        return compile(str)(_context);
    }
    catch (err) {
        if (debug) {
            console.log(err, str, _context);
        }
        return fallbackValue;
    }
}
exports.evaluate = evaluate;


/***/ }),

/***/ "./src/components/hooks/index.ts":
/*!***************************************!*\
  !*** ./src/components/hooks/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./useDiagnostics */ "./src/components/hooks/useDiagnostics.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./useTheme */ "./src/components/hooks/useTheme.ts"), exports);


/***/ }),

/***/ "./src/components/hooks/useDiagnostics.ts":
/*!************************************************!*\
  !*** ./src/components/hooks/useDiagnostics.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __webpack_require__(/*! @stoplight/types */ "./node_modules/@stoplight/types/index.js");
const types_2 = __webpack_require__(/*! @stoplight/ui-kit/types */ "./node_modules/@stoplight/ui-kit/types.js");
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const DiagnosticMessagesContext_1 = __webpack_require__(/*! ../DiagnosticMessagesContext */ "./src/components/DiagnosticMessagesContext.ts");
const variantsMap = {
    [types_1.DiagnosticSeverity.Hint]: types_2.Variant.Default,
    [types_1.DiagnosticSeverity.Information]: types_2.Variant.Default,
    [types_1.DiagnosticSeverity.Error]: types_2.Variant.Invalid,
    [types_1.DiagnosticSeverity.Warning]: types_2.Variant.Warning,
};
exports.useDiagnostics = path => {
    const getMessages = react_1.useContext(DiagnosticMessagesContext_1.DiagnosticMessagesContext);
    const messages = getMessages(path);
    const severity = Math.min(...messages.map(({ severity }) => severity));
    return { variant: variantsMap[severity], messages };
};


/***/ }),

/***/ "./src/components/hooks/useTheme.ts":
/*!******************************************!*\
  !*** ./src/components/hooks/useTheme.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const capitalize = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
const theme_1 = __webpack_require__(/*! ../../theme */ "./src/theme.ts");
const useProp = (prop) => (variant) => {
    const theme = theme_1.useTheme();
    const _prop = variant ? variant + capitalize(prop) : prop;
    if (!theme.input || !theme.input[_prop])
        return;
    return theme.input[_prop];
};
exports.useBorder = useProp('border');
exports.useFg = useProp('fg');
exports.useBg = useProp('bg');


/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const ArrayInput_1 = __webpack_require__(/*! ./ArrayInput */ "./src/components/ArrayInput.tsx");
const CheckboxInput_1 = __webpack_require__(/*! ./CheckboxInput */ "./src/components/CheckboxInput.tsx");
const Form_1 = __webpack_require__(/*! ./Form */ "./src/components/Form.tsx");
const IntegerInput_1 = __webpack_require__(/*! ./IntegerInput */ "./src/components/IntegerInput.tsx");
const JsonInput_1 = __webpack_require__(/*! ./JsonInput */ "./src/components/JsonInput.tsx");
const MarkdownInput_1 = __webpack_require__(/*! ./MarkdownInput */ "./src/components/MarkdownInput.tsx");
const ObjectInput_1 = __webpack_require__(/*! ./ObjectInput */ "./src/components/ObjectInput.tsx");
const SelectInput_1 = __webpack_require__(/*! ./SelectInput */ "./src/components/SelectInput.tsx");
const StringInput_1 = __webpack_require__(/*! ./StringInput */ "./src/components/StringInput.tsx");
const ToggleInput_1 = __webpack_require__(/*! ./ToggleInput */ "./src/components/ToggleInput.tsx");
exports.fieldComponents = {
    array: ArrayInput_1.ArrayInput,
    object: ObjectInput_1.ObjectInput,
    checkbox: CheckboxInput_1.CheckboxInput,
    form: Form_1.Form,
    integer: IntegerInput_1.IntegerInput,
    json: JsonInput_1.JsonInput,
    markdown: MarkdownInput_1.MarkdownInput,
    multiselect: SelectInput_1.MultiselectInput,
    select: SelectInput_1.SelectInput,
    string: StringInput_1.StringInput,
    toggle: ToggleInput_1.ToggleInput,
};
tslib_1.__exportStar(__webpack_require__(/*! ./AutocompletionContext */ "./src/components/AutocompletionContext.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./DiagnosticMessagesContext */ "./src/components/DiagnosticMessagesContext.ts"), exports);


/***/ }),

/***/ "./src/components/utils/DraftValue.tsx":
/*!*********************************************!*\
  !*** ./src/components/utils/DraftValue.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
class DraftValue extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            draft: this.props.value,
            value: this.props.value,
        };
        this.onChange = (value) => {
            this.setState({ draft: value, value: this.state.value });
            this.props.onChange(value);
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.value) {
            return {
                value: props.value,
                draft: props.value,
            };
        }
        return null;
    }
    render() {
        return this.props.children({
            value: this.state.draft,
            onChange: this.onChange,
            nonDraftValue: this.state.value,
        });
    }
}
exports.DraftValue = DraftValue;


/***/ }),

/***/ "./src/components/utils/EasyArray.ts":
/*!*******************************************!*\
  !*** ./src/components/utils/EasyArray.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EasyArray {
    constructor(items, defaultValue) {
        this.items = [...items];
        this.defaultValue = defaultValue;
    }
    update(index, val) {
        this.items.splice(index, 1, val);
        return this.items;
    }
    insert(index) {
        this.items.splice(index, 0, this.defaultValue);
        return this.items;
    }
    append() {
        this.items.splice(this.items.length, 0, this.defaultValue);
        return this.items;
    }
    remove(index) {
        this.items.splice(index, 1);
        return this.items;
    }
}
exports.EasyArray = EasyArray;


/***/ }),

/***/ "./src/components/utils/EasyObject.ts":
/*!********************************************!*\
  !*** ./src/components/utils/EasyObject.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fromPairs = __webpack_require__(/*! lodash/fromPairs */ "./node_modules/lodash/fromPairs.js");
class EasyObject {
    constructor(value, defaultValue) {
        this.items = [...Object.entries(value)];
        this.defaultValue = defaultValue;
    }
    update(index, val) {
        this.items.splice(index, 1, val);
        return fromPairs(this.items);
    }
    updateKey(index, key) {
        this.items.splice(index, 1, [key, this.items[index][1]]);
        return fromPairs(this.items);
    }
    updateVal(index, val) {
        this.items.splice(index, 1, [this.items[index][0], val]);
        return fromPairs(this.items);
    }
    insert(index) {
        this.items.splice(index, 0, ['', this.defaultValue]);
        return fromPairs(this.items);
    }
    append() {
        this.items.splice(this.items.length, 0, ['', this.defaultValue]);
        return fromPairs(this.items);
    }
    remove(index) {
        this.items.splice(index, 1);
        return fromPairs(this.items);
    }
}
exports.EasyObject = EasyObject;


/***/ }),

/***/ "./src/components/utils/ThrottleValue.tsx":
/*!************************************************!*\
  !*** ./src/components/utils/ThrottleValue.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const throttle = __webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js");
const DraftValue_1 = __webpack_require__(/*! ./DraftValue */ "./src/components/utils/DraftValue.tsx");
class ThrottleValue extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = throttle(draft => {
            this.props.onChange(draft);
        }, props.ms || 1000);
    }
    render() {
        return (React.createElement(DraftValue_1.DraftValue, { value: this.props.value, onChange: this.onChange }, ({ value, onChange }) => {
            return this.props.children({
                value,
                onChange,
            });
        }));
    }
}
exports.ThrottleValue = ThrottleValue;


/***/ }),

/***/ "./src/components/utils/gridHelpers.ts":
/*!*********************************************!*\
  !*** ./src/components/utils/gridHelpers.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function parseGridTemplateAreas(rows) {
    return rows.map(row => row.split(/\s+/).map(x => x.trim()));
}
exports.parseGridTemplateAreas = parseGridTemplateAreas;
function toGridTemplateAreas(rows) {
    return rows.map(x => `"${x}"`).join(' ');
}
exports.toGridTemplateAreas = toGridTemplateAreas;
function listAreas(rows) {
    const parsed = parseGridTemplateAreas(rows);
    const flatSet = new Set();
    for (const row of parsed) {
        for (const col of row) {
            flatSet.add(col);
        }
    }
    return flatSet;
}
exports.listAreas = listAreas;


/***/ }),

/***/ "./src/components/utils/replaceWildcards.ts":
/*!**************************************************!*\
  !*** ./src/components/utils/replaceWildcards.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceWildcards = (name, path) => {
    const _name = name.split('.');
    const newpath = [];
    for (let i = 0; i < _name.length; i++) {
        const part = _name[i];
        if (part === '*' || part === '?') {
            newpath.push(path[i]);
        }
        else {
            newpath.push(part);
        }
        if (part === '?')
            break;
    }
    return newpath;
};


/***/ }),

/***/ "./src/components/utils/shortName.tsx":
/*!********************************************!*\
  !*** ./src/components/utils/shortName.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function shortName(propertyPath) {
    return propertyPath.split('.').pop();
}
exports.shortName = shortName;


/***/ }),

/***/ "./src/computeOps.ts":
/*!***************************!*\
  !*** ./src/computeOps.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const deriveFormData_1 = __webpack_require__(/*! ./deriveFormData */ "./src/deriveFormData.ts");
const substitute = (key, path, selection, vars) => {
    const _selection = selection.split('.');
    const _path = path.split('.');
    return _path
        .map((part, index) => {
        if (part !== '*' && part !== '?')
            return part;
        if (index < _selection.length) {
            if (part === '?') {
                return vars[key];
            }
            return _selection[index];
        }
        else {
            throw new Error(`Cannot extract index "${index}" from selection path "${selection}"`);
        }
    })
        .join('.');
};
exports.computeOps = (schema, data, selection, newFormData, resolver) => {
    const ops = [];
    const oldFormData = deriveFormData_1.deriveFormData(schema, data, selection, resolver);
    const newVars = {};
    const oldVars = {};
    const values = [];
    const props = [];
    for (const key of Object.keys(schema.fields)) {
        if (key.includes(`?`)) {
            newVars[key] = newFormData[key];
            oldVars[key] = oldFormData[key];
        }
        if (JSON.stringify(oldFormData[key]) !== JSON.stringify(newFormData[key])) {
            if (key.includes('?')) {
                props.push(key);
            }
            else {
                values.push(key);
            }
        }
    }
    for (const key of values) {
        const rejoined = substitute(key, key, selection, oldVars);
        ops.push({
            op: 'add',
            path: rejoined,
            value: newFormData[key],
        });
    }
    const vars = Object.assign({}, oldVars);
    const oldSelection = selection;
    for (const key of props) {
        const oldPath = substitute(key, key, selection, vars);
        vars[key] = newVars[key];
        const newPath = substitute(key, key, selection, vars);
        if (oldPath !== newPath) {
            ops.push({
                op: 'move',
                from: oldPath,
                path: newPath,
            });
            if (selection.startsWith(oldPath)) {
                selection = selection.replace(oldPath, newPath);
            }
        }
    }
    const reducedOps = ops.reduce((acc, op) => {
        if (acc.length === 0)
            return [op];
        const prev = acc[acc.length - 1];
        if (prev.op === 'move' && op.op === 'move' && prev.path === op.from) {
            const newOp = {
                op: 'move',
                from: prev.from,
                path: op.path,
            };
            acc.pop();
            acc.push(newOp);
        }
        else {
            acc.push(op);
        }
        return acc;
    }, []);
    if (oldSelection !== selection) {
        reducedOps.push({
            op: 'select',
            from: oldSelection,
            path: selection,
        });
    }
    return reducedOps;
};


/***/ }),

/***/ "./src/computeWarnings.ts":
/*!********************************!*\
  !*** ./src/computeWarnings.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const get = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
exports.computeWarnings = (data, ops) => {
    const warnings = [];
    for (const op of ops) {
        switch (op.op) {
            case 'move': {
                const exists = get(data, op.path) !== undefined;
                if (exists) {
                    warnings.push({
                        type: 'overwrite_key',
                        op,
                    });
                }
                break;
            }
        }
    }
    return warnings;
};


/***/ }),

/***/ "./src/deriveFormData.ts":
/*!*******************************!*\
  !*** ./src/deriveFormData.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const get = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
const memoize_one_1 = __webpack_require__(/*! @stoplight/memoize-one */ "./node_modules/@stoplight/memoize-one/dist/memoize-one.esm.js");
const substituteVariables = (key, path, selection, vars) => {
    const _selection = selection.split('.').filter(x => x !== '');
    const _path = path.split('.');
    return _path
        .map((part, index) => {
        if (part === '*' || part === '?') {
            if (index < _selection.length) {
                if (part === '?') {
                    vars[key] = _selection[index];
                }
                return _selection[index];
            }
            else {
                throw new Error(`Cannot extract index "${index}" from selection path "${selection}"`);
            }
        }
        if (vars[part] !== undefined)
            return vars[part];
        return part;
    })
        .join('.');
};
exports.deriveFormData = memoize_one_1.default((schema, data, selection, resolver) => {
    const output = {};
    const vars = {};
    const keys = Object.keys(schema.fields);
    const unresolved = new Set(keys);
    let lastUnresolvedSize = Infinity;
    while (unresolved.size && unresolved.size < lastUnresolvedSize) {
        lastUnresolvedSize = unresolved.size;
        for (const key of unresolved) {
            const origPath = key;
            const path = substituteVariables(key, origPath, selection, vars);
            if (!path.includes('*') && !path.includes('?')) {
                if (origPath.includes('?')) {
                    output[key] = vars[key];
                }
                else {
                    output[key] = path === '' ? data : get(data, path);
                    if (output[key] === undefined && resolver) {
                        output[key] = resolver(path.split('.'));
                    }
                }
                unresolved.delete(key);
                break;
            }
        }
        if (unresolved.size === lastUnresolvedSize) {
            throw new Error(`Unable to resolve vars: ${JSON.stringify([...unresolved.keys()])}`);
        }
    }
    const orderedOutput = {};
    for (const key of keys) {
        orderedOutput[key] = output[key];
    }
    return orderedOutput;
});


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Formtron_1 = __webpack_require__(/*! ./Formtron */ "./src/Formtron.tsx");
exports.Formtron = Formtron_1.Formtron;
var applyOps_1 = __webpack_require__(/*! ./applyOps */ "./src/applyOps.ts");
exports.applyOps = applyOps_1.applyOps;
var computeOps_1 = __webpack_require__(/*! ./computeOps */ "./src/computeOps.ts");
exports.computeOps = computeOps_1.computeOps;
var computeWarnings_1 = __webpack_require__(/*! ./computeWarnings */ "./src/computeWarnings.ts");
exports.computeWarnings = computeWarnings_1.computeWarnings;
var deriveFormData_1 = __webpack_require__(/*! ./deriveFormData */ "./src/deriveFormData.ts");
exports.deriveFormData = deriveFormData_1.deriveFormData;


/***/ }),

/***/ "./src/theme.ts":
/*!**********************!*\
  !*** ./src/theme.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ui_kit_1 = __webpack_require__(/*! @stoplight/ui-kit */ "./node_modules/@stoplight/ui-kit/index.js");
_a = ui_kit_1.createThemedModule(), exports.useTheme = _a.useTheme, exports.ThemeZone = _a.ThemeZone;


/***/ }),

/***/ 0:
/*!*****************************************************************************************************************************************************************!*\
  !*** multi ./node_modules/@storybook/core/dist/server/common/polyfills.js ./node_modules/@storybook/core/dist/server/preview/globals.js ./.storybook/config.js ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/circleci/project/node_modules/@storybook/core/dist/server/common/polyfills.js */"./node_modules/@storybook/core/dist/server/common/polyfills.js");
__webpack_require__(/*! /home/circleci/project/node_modules/@storybook/core/dist/server/preview/globals.js */"./node_modules/@storybook/core/dist/server/preview/globals.js");
module.exports = __webpack_require__(/*! /home/circleci/project/.storybook/config.js */"./.storybook/config.js");


/***/ })

},[[0,"runtime~main","vendors~main"]]]);
//# sourceMappingURL=main.44d080c662916a5fdd0e.bundle.js.map