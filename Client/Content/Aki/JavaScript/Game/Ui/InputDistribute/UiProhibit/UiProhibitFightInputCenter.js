"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiProhibitFightInputCenter = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class UiProhibitFightInputCenter {
  static RegisterExtraRefreshData(t, e) {
    UiProhibitFightInputCenter.Ck1.set(t, e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "注册禁止战斗输入额外的输入刷新数据", ["Tag", t]);
    }
  }
  static UnRegisterExtraRefreshData(t) {
    UiProhibitFightInputCenter.Ck1.delete(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "注销禁止战斗输入额外的输入刷新数据", ["Tag", t]);
    }
  }
  static CheckExtraRefreshData() {
    for (var [t, e] of UiProhibitFightInputCenter.Ck1) {
      if (e.CheckCondition()) {
        return t;
      }
    }
    return "";
  }
  static GetExtraRefreshData(t) {
    return UiProhibitFightInputCenter.Ck1.get(t);
  }
}
(exports.UiProhibitFightInputCenter = UiProhibitFightInputCenter).Ck1 = new Map();
//# sourceMappingURL=UiProhibitFightInputCenter.js.map