"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FlowActionStopUiScreenEffect = void 0;
const ModelManager_1 = require("../../../Manager/ModelManager"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionStopUiScreenEffect extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffectByPath(e.EffectDaPath)
  }
}
exports.FlowActionStopUiScreenEffect = FlowActionStopUiScreenEffect;
//# sourceMappingURL=FlowActionStopUiScreenEffect.js.map