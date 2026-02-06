"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuantumDiffusionConditionListener = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CustomConditionListener_1 = require("./CustomConditionListener");
class QuantumDiffusionConditionListener extends CustomConditionListener_1.CustomConditionListener {
  constructor() {
    super(...arguments);
    this.xrh = () => {
      this.OnConditionChange?.(this.CheckCondition());
    };
  }
  CheckCondition() {
    var e;
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.GetComponent(237);
    return !!t && !!(e = t.GetFollower())?.IsInit && !!t.IsFollowerEnable() && (e.Entity.GetComponent(217)?.HasTag(-377889495) ?? false);
  }
  SetListenerEnable(e) {
    if (e) {
      this.Ore();
    } else {
      this.kre();
    }
  }
  Ore() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
    }
  }
  kre() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
    }
  }
}
exports.QuantumDiffusionConditionListener = QuantumDiffusionConditionListener;
//# sourceMappingURL=QuantumDiffusionConditionListener.js.map