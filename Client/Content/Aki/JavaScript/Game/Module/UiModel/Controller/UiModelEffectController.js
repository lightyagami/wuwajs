"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelEffectController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
class UiModelEffectController extends ControllerBase_1.ControllerBase {
  static SetEffectAdditionTimeScaleEnable(e, t) {
    if (e) {
      this.yLm.add(t);
    } else {
      this.yLm.delete(t);
    }
    var o = this.yLm.size > 0;
    EffectSystem_1.EffectSystem.SetAdditionTimeScaleEnable(18, o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiModel", 43, "[UiModelSystem] 设置特效时间缩放是否生效: ", ["bEnable", e], ["modelId", t], ["allEnable", o]);
    }
  }
}
(exports.UiModelEffectController = UiModelEffectController).yLm = new Set();
//# sourceMappingURL=UiModelEffectController.js.map