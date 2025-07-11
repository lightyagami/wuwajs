"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropItemProxy = undefined;
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class SelectablePropItemProxy extends GridProxyAbstract_1.GridProxyAbstract {
  InstanceOfSelectableProp(e) {
    return e.IsSelectableProp === true;
  }
}
exports.SelectablePropItemProxy = SelectablePropItemProxy;
//# sourceMappingURL=SelectablePropItemProxy.js.map