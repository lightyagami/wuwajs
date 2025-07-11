"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Time_1 = require("../../Core/Common/Time");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const TimeUtil_1 = require("../Common/TimeUtil");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CombatMessage_1 = require("../Module/CombatMessage/CombatMessage");
const CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
const CombatLog_1 = require("../Utils/CombatLog");
class TsAnimNotifyStateTimeStopRequest extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, r, o) {
    e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      return false;
    }
    if (Time_1.Time.FlowTimeDilation === 0) {
      const t = e.CharacterActorComponent?.Entity;
      CombatLog_1.CombatLog.Error("Animation", t, "重复进入副本时停，将不做处理", ["animation", r?.GetName()]);
      return false;
    }
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId);
    if (r?.Valid && !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(r)) {
      return false;
    }
    Time_1.Time.SetFlowTimeDilation(0);
    for (const n of ModelManager_1.ModelManager.CreatureModel?.GetAllEntities() ?? []) {
      if (n.IsInit) {
        n.Entity?.GetComponent(174)?.AddPauseLock("ANS AbsoluteTimeStop");
        ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet.add(n);
      }
    }
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddPauseLock("ANS AbsoluteTimeStop");
    ControllerHolder_1.ControllerHolder.SkillCdController.Pause(0, true);
    const t = e.CharacterActorComponent?.Entity;
    if (t) {
      (r = Protocol_1.Aki.Protocol.Fe_.create()).o5n = true;
      r.n5n = o * TimeUtil_1.TimeUtil.InverseMillisecond;
      CombatMessage_1.CombatNet.Send(15160, t, r);
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbsoluteTimeStop, true);
    }
    return true;
  }
  K2_NotifyEnd(e, r) {
    var o;
    var e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    Time_1.Time.SetFlowTimeDilation(ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
    for (const t of ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet) {
      t.Entity?.GetComponent(174)?.RemovePauseLock("ANS AbsoluteTimeStop");
    }
    ControllerHolder_1.ControllerHolder.TimeController.TimeStopBuffEntitySet.clear();
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemovePauseLock("ANS AbsoluteTimeStop");
    ControllerHolder_1.ControllerHolder.SkillCdController.Pause(0, false);
    if (e.CharacterActorComponent?.Entity) {
      (o = Protocol_1.Aki.Protocol.Fe_.create()).o5n = false;
      o.n5n = 0;
      CombatMessage_1.CombatNet.Send(15160, e.CharacterActorComponent.Entity, o);
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbsoluteTimeStop, false);
    }
    return true;
  }
  GetNotifyName() {
    return "副本计时和所有战斗单位buff、技能冷却冻结";
  }
}
exports.default = TsAnimNotifyStateTimeStopRequest;
//# sourceMappingURL=TsAnimNotifyStateTimeStopRequest.js.map