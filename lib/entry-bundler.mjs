/* eslint-disable local-rules/sort-imports */

// Styles
import "./styles/main.css";

// Components
import * as components from "./components/index.mjs";
import * as directives from "./directives/index.mjs";
import { createVuetify as _createVuetify } from "./framework.mjs"; // Types
export const createVuetify = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _createVuetify({
    components,
    directives,
    ...options
  });
};
export const version = "3.5.1";
createVuetify.version = version;
export { components, directives };
export * from "./composables/index.mjs";
//# sourceMappingURL=entry-bundler.mjs.map