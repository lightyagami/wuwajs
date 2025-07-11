"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MethodPruner = exports.NOT_EDITOR_ENVIRONMENT = exports.NOT_SHIPPING_ENVIRONMENT = undefined;
const puerts_1 = require("puerts");
function methodPrunerDecorator(e, r, t) {
  if (typeof e.constructor != "function" || typeof t.value != "function") {
    puerts_1.logger.error(`该装饰器只能用在类成员方法上 target: ${e.constructor.name} property: ${String(r)}`);
  } else {
    puerts_1.logger.info(`该方法可能会被裁剪 target: ${e.constructor.name} property: ${String(r)}`);
  }
}
function methodPruner(e, r, t) {
  if (typeof e != "object" || !r || !t) {
    return methodPrunerDecorator;
  }
  methodPrunerDecorator(e, r, t);
}
exports.NOT_SHIPPING_ENVIRONMENT = true;
exports.NOT_EDITOR_ENVIRONMENT = true;
exports.MethodPruner = methodPruner; //# sourceMappingURL=Macro.js.map