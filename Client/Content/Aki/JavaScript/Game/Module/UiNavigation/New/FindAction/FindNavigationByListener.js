"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindNavigationByListener = undefined;
const FindActionBase_1 = require("./FindActionBase");
class FindNavigationByListener extends FindActionBase_1.FindActionBase {
  FindNavigation(i) {
    var e = this.Params[0];
    this.PanelConfig.CommonFindNavigationByListener(i, e, true);
  }
}
exports.FindNavigationByListener = FindNavigationByListener;
//# sourceMappingURL=FindNavigationByListener.js.map