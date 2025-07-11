"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputExtraShowCursorCenter = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class InputExtraShowCursorCenter {
  static RegisterExtraRefreshData(t, e) {
    InputExtraShowCursorCenter.Hk1.set(t, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "注册额外的显示鼠标数据", ["Tag", t]);
    }
  }
  static UnRegisterExtraRefreshData(t) {
    InputExtraShowCursorCenter.Hk1.delete(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "注销额外的显示鼠标数据", ["Tag", t]);
    }
  }
  static CheckShowCursorData() {
    for (const t of InputExtraShowCursorCenter.Hk1.values()) {
      if (t.IsShowCursor()) {
        return true;
      }
    }
    return false;
  }
  static HasExtraShowCursorData() {
    return InputExtraShowCursorCenter.Hk1.size > 0;
  }
}
(exports.InputExtraShowCursorCenter = InputExtraShowCursorCenter).Hk1 = new Map();
//# sourceMappingURL=InputExtraShowCursorCenter.js.map