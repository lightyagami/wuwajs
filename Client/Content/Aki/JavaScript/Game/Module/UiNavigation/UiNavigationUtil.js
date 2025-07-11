"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationUtil = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const GlobalData_1 = require("../../GlobalData");
class UiNavigationUtil {
  static GetFullPathOfActor(t) {
    var e;
    if (t) {
      e = (0, puerts_1.$ref)("");
      UE.LGUIBPLibrary.GetFullPathOfActor(GlobalData_1.GlobalData.World, t, e);
      return (0, puerts_1.$unref)(e);
    } else {
      return "null";
    }
  }
}
(exports.UiNavigationUtil = UiNavigationUtil).IncId = 0;
//# sourceMappingURL=UiNavigationUtil.js.map