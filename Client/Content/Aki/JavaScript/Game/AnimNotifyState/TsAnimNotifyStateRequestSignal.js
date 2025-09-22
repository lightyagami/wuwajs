"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyStateRequestSignal extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Signal = 0;
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId);
    var a = e?.Entity?.GetComponent(300);
    var o = e?.Entity?.GetComponent(298);
    if (!a || !o) {
      return false;
    }
    a = o.GetHoldingHandsOtherEntity();
    o = a?.GetComponent(0);
    a = a?.GetComponent(300);
    if (!a || !o) {
      return false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BasePerform", 50, "[InteractivePerform] 尝试请求交互表现", ["Source", e.PbDataId], ["Target", o.GetPbDataId()], ["Signal", this.Signal], ["Context", r?.GetName()]);
    }
    o = {
      Signal: this.Signal,
      Source: e.Entity
    };
    a.AddRequestSignal(o);
    return true;
  }
  K2_NotifyEnd(e, r) {
    var t;
    var e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && (t = (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId))?.Entity?.GetComponent(300), e = e?.Entity?.GetComponent(298), !!t && !!e && !!(t = e.GetHoldingHandsOtherEntity()?.GetComponent(300)) && !(t.RemoveRequestSignal(this.Signal), 0));
  }
  GetNotifyName() {
    return "请求交互动作";
  }
}
exports.default = TsAnimNotifyStateRequestSignal;
//# sourceMappingURL=TsAnimNotifyStateRequestSignal.js.map