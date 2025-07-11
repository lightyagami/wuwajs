"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputLayerUnit = exports.InputLayer = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
class InputLayer {
  constructor() {
    this.UnitId = 0;
  }
  Clear() {}
  GetLayerType() {
    return 0;
  }
  static GetSwallowCommand() {
    InputLayer.SwallowCommand ||= new UE.SInputCommand(11, 0, undefined);
    return InputLayer.SwallowCommand;
  }
  HandlePress(t, e) {}
  HandleRelease(t, e) {}
  HandleHold(t, e) {}
  DispatchPressEvent(t, e) {}
  DispatchReleaseEvent(t, e) {}
}
(exports.InputLayer = InputLayer).IsTestMode = false;
InputLayer.SwallowCommand = undefined;
class InputLayerUnit {
  constructor() {
    this.LayerMap = new Map();
    this.Phh = [];
  }
  Add(t) {
    var e = t.GetLayerType();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 67, "[InputLayerUnit]添加InputLayer", ["LayerType", e]);
    }
    var r = this.LayerMap.get(e);
    if (r && (r.Clear(), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("Input", 67, "[InputLayerUnit]添加的InputLayer类型已存在", ["LayerType", e]);
    }
    this.LayerMap.set(e, t);
    this.Sort();
  }
  Remove(t) {
    t = t.GetLayerType();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 67, "[InputLayerUnit]移除InputLayer", ["LayerType", t]);
    }
    if (this.LayerMap.has(t)) {
      this.LayerMap.delete(t);
      this.Sort();
    }
  }
  Sort() {
    this.Phh = [...this.LayerMap.values()];
    this.Phh.sort((t, e) => e.GetLayerType() - t.GetLayerType());
  }
  Clear() {
    for (const t of this.LayerMap.values()) {
      t.Clear();
    }
    this.LayerMap.clear();
  }
  GetLayerList() {
    return this.Phh;
  }
}
exports.InputLayerUnit = InputLayerUnit;
//# sourceMappingURL=InputLayer.js.map