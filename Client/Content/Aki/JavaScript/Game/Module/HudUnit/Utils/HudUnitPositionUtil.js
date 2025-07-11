"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HudUnitPositionUtil = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
class HudUnitPositionUtil {
  constructor() {
    this.S$e = (0, puerts_1.$ref)(undefined);
  }
  ProjectWorldToScreen(e, o) {
    return !!UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, e, this.S$e) && (e = (0, puerts_1.$unref)(this.S$e), o.Set(e.X, e.Y), e = ModelManager_1.ModelManager.BattleUiModel, o.MultiplyEqual(e.ScreenPositionScale).AdditionEqual(e.ScreenPositionOffset), o.Y = -o.Y, true);
  }
  LogViewPortInfo() {
    var e = UiLayer_1.UiLayer.UiRootItem;
    if (e && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "UiRootItem大小", ["W", e.GetWidth()], ["H", e.GetHeight()]);
    }
    var e = ModelManager_1.ModelManager.BattleUiModel;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "缓存的ViewPortSize", ["", e.ViewportSize]);
    }
    e.UpdateViewPortSize();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "更新后的ViewPortSize", ["", e.ViewportSize]);
    }
  }
}
exports.HudUnitPositionUtil = HudUnitPositionUtil;
//# sourceMappingURL=HudUnitPositionUtil.js.map