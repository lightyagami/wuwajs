"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const TimeUtil_1 = require("../Common/TimeUtil");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CombatMessage_1 = require("../Module/CombatMessage/CombatMessage");
const CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
const CombatLog_1 = require("../Utils/CombatLog");
class TsAnimNotifyStateAbsoluteTimeStop extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.副本计时停止 = false;
    this.角色战斗机制停止 = true;
    this.怪物战斗机制停止 = true;
    this.是否冻结移动效果 = true;
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      return false;
    }
    var o = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(e.CharacterActorComponent?.Entity);
    if (!o || !o.Valid || !o.Entity) {
      return false;
    }
    if (!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(o)) {
      return false;
    }
    var a = o.Entity.GetComponent(0);
    var s = o.Entity.GetComponent(3);
    if (!a?.IsRole() && s?.CreatureData.GetBaseInfo()?.Category.MonsterMatchType !== 4) {
      CombatLog_1.CombatLog.Error("Actor", o.Entity, "只有角色才能使用动画和子弹冻结功能");
      return false;
    }
    ControllerHolder_1.ControllerHolder.TimeController.AddLock(o, this.是否冻结移动效果);
    a = Protocol_1.Aki.Protocol.Qe_.create();
    a.o5n = true;
    a.n5n = t * TimeUtil_1.TimeUtil.InverseMillisecond;
    CombatMessage_1.CombatNet.Send(26343, e.CharacterActorComponent.Entity, a);
    return true;
  }
  K2_NotifyEnd(e, r) {
    var t;
    var e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && ((t = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(e.CharacterActorComponent?.Entity))?.Valid && ControllerHolder_1.ControllerHolder.TimeController.RemoveLock(t), (t = Protocol_1.Aki.Protocol.Qe_.create()).o5n = false, t.n5n = 0, CombatMessage_1.CombatNet.Send(26343, e.CharacterActorComponent.Entity, t), true);
  }
  GetNotifyName() {
    return "动画和子弹冻结";
  }
}
exports.default = TsAnimNotifyStateAbsoluteTimeStop;
//# sourceMappingURL=TsAnimNotifyStateAbsoluteTimeStop.js.map