"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationScrollbar = undefined;
const NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationScrollbar extends NavigationSelectableBase_1.NavigationSelectableBase {
  OnHandlePointerSelect(e) {
    return false;
  }
}
exports.NavigationScrollbar = NavigationScrollbar;
//# sourceMappingURL=NavigationScrollbar.js.map