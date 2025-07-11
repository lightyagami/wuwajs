"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnUiTabViewShow = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnUiTabViewShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s, ...a) {
    return a[0] === e?.LimitParams?.get("TabViewName");
  }
}
exports.LevelConditionOnUiTabViewShow = LevelConditionOnUiTabViewShow;
//# sourceMappingURL=LevelConditionOnUiTabViewShow.js.map