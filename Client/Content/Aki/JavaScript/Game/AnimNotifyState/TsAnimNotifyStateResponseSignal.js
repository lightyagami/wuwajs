"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyStateResponseSignal extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Signal = 0;
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    var a;
    var s;
    var e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && (a = (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId))?.Entity?.GetComponent(304), s = e?.Entity?.GetComponent(302), !!a && !!s && !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 50, "[InteractivePerform] 尝试响应交互表现", ["Source", e.PbDataId], ["Signal", this.Signal], ["Context", r?.GetName()]), a.AddResponseSignal(this.Signal), 0));
  }
  K2_NotifyEnd(e, r) {
    var t;
    var e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && (t = (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId))?.Entity?.GetComponent(304), e = e?.Entity?.GetComponent(302), !!t && !!e && !(t.RemoveResponseSignal(this.Signal), 0));
  }
  GetNotifyName() {
    return "响应交互动作";
  }
}
exports.default = TsAnimNotifyStateResponseSignal;
//# sourceMappingURL=TsAnimNotifyStateResponseSignal.js.map