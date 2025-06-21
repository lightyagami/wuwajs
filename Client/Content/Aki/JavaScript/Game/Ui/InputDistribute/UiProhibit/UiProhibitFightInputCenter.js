"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UiProhibitFightInputCenter = void 0;
const Log_1 = require("../../../../Core/Common/Log");
class UiProhibitFightInputCenter {
  static RegisterExtraRefreshData(t, e) {
    UiProhibitFightInputCenter.FB1.set(t, e), Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "注册禁止战斗输入额外的输入刷新数据", ["Tag", t])
  }
  static UnRegisterExtraRefreshData(t) {
    UiProhibitFightInputCenter.FB1.delete(t), Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "注销禁止战斗输入额外的输入刷新数据", ["Tag", t])
  }
  static CheckExtraRefreshData() {
    for (var [t, e] of UiProhibitFightInputCenter.FB1)
      if (e.CheckCondition()) return t;
    return ""
  }
  static GetExtraRefreshData(t) {
    return UiProhibitFightInputCenter.FB1.get(t)
  }
}(exports.UiProhibitFightInputCenter = UiProhibitFightInputCenter).FB1 = new Map;
//# sourceMappingURL=UiProhibitFightInputCenter.js.map