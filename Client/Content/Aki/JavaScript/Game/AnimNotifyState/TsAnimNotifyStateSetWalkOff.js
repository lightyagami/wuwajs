"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetWalkOff extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent?.Entity.GetComponent(178))?.Valid && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 6, "边缘保护：开，动画事件", ["玩家id:", e.Entity.Id], ["动作", t?.GetName()]), e.SetWalkOffLedgeRecord(false), true);
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent?.Entity.GetComponent(178))?.Valid && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 6, "边缘保护：关，动画事件", ["玩家id:", e.Entity.Id], ["动作", t?.GetName()]), e.SetWalkOffLedgeRecord(true), true);
  }
  GetNotifyName() {
    return "边缘保护";
  }
}
exports.default = TsAnimNotifyStateSetWalkOff;
//# sourceMappingURL=TsAnimNotifyStateSetWalkOff.js.map