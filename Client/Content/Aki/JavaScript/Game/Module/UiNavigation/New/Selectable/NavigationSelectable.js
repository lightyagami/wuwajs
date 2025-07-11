"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationSelectable = undefined;
const NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationSelectable extends NavigationSelectableBase_1.NavigationSelectableBase {
  OnHandlePointerSelect(e) {
    return false;
  }
}
exports.NavigationSelectable = NavigationSelectable;
//# sourceMappingURL=NavigationSelectable.js.map