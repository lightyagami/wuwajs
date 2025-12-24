"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritOccupiedByPlayerState = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SunSpiritCrowdPerform_1 = require("../SunSpiritPerform/SunSpiritCrowdPerform");
const SunSpiritBaseState_1 = require("./SunSpiritBaseState");
class SunSpiritOccupiedByPlayerState extends SunSpiritBaseState_1.SunSpiritBaseState {
  constructor(r) {
    super(4, r);
  }
  OnEnter() {
    var r = this.SunSpiritData.GetSunSpiritPerform();
    if (r instanceof SunSpiritCrowdPerform_1.SunSpiritCrowdPerform) {
      r.UpdateCtrlByCrowdAi(true);
    } else {
      r = Transform_1.Transform.Create();
      this.Q9f(r);
      this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritCrowdPerform_1.SunSpiritCrowdPerform(this.SunSpiritData, r, true));
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged);
    return true;
  }
  OnExit() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged);
  }
  K9f(r) {
    var e;
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    return !!t && !!r && !r.GetLocation().IsZero() && !!Global_1.Global.BaseCharacter?.CharacterActorComponent && !!(e = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem) && !e.QueryUsablePositionForBoid(r.GetLocation().ToUeVectorOld(), 0, t.AroundPlayerPosQueryBoidRadius, t.AroundPlayerPosQueryMaxTryCount).IsZero();
  }
  Q9f(r) {
    var e = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    if (!e) {
      return false;
    }
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!t) {
      return false;
    }
    var i = this.SunSpiritData.Transform;
    if (i && this.K9f(i)) {
      r.Set(i.GetLocation(), i.GetRotation(), i.GetScale3D());
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.GetInitTransform 当前位置不合法，重新查询角色附近的可用位置", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
      }
      if ((i = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem) && !(i = i.QueryUsablePositionForBoid(t.ActorLocationProxy.ToUeVectorOld(), e.AroundPlayerPosQueryRadius, e.AroundPlayerPosQueryBoidRadius, e.AroundPlayerPosQueryMaxTryCount)).IsZero()) {
        r.SetLocation(i);
        r.SetRotation(t.ActorQuatProxy);
      }
      if (r.GetLocation().IsZero()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.GetInitTransform 查找角色附近的可用位置失败，使用角色位置替代", ["SpiritConfigId", this.SunSpiritData.ConfigId], ["TargetLocation", t.ActorLocationProxy]);
        }
        r.SetLocation(t.ActorLocationProxy);
        r.SetRotation(t.ActorQuatProxy);
      }
    }
    let n = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfigByConfigId(this.SunSpiritData.InstId, this.SunSpiritData.ConfigId)?.SunSpiritScale ?? 1;
    if (n === 0) {
      n = 1;
    }
    r.GetScale3D().Set(n, n, n);
    return true;
  }
}
exports.SunSpiritOccupiedByPlayerState = SunSpiritOccupiedByPlayerState;
//# sourceMappingURL=SunSpiritOccupiedByPlayerState.js.map