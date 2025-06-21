"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.InputExtraShowCursorCenter = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class InputExtraShowCursorCenter {
  static RegisterExtraRefreshData(t, e) {
    InputExtraShowCursorCenter.dk1.set(t, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor), Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "注册额外的显示鼠标数据", ["Tag", t])
  }
  static UnRegisterExtraRefreshData(t) {
    InputExtraShowCursorCenter.dk1.delete(t), Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "注销额外的显示鼠标数据", ["Tag", t])
  }
  static CheckShowCursorData() {
    for (const t of InputExtraShowCursorCenter.dk1.values())
      if (t.IsShowCursor()) return !0;
    return !1
  }
  static HasExtraShowCursorData() {
    return 0 < InputExtraShowCursorCenter.dk1.size
  }
}(exports.InputExtraShowCursorCenter = InputExtraShowCursorCenter).dk1 = new Map;
//# sourceMappingURL=InputExtraShowCursorCenter.js.map