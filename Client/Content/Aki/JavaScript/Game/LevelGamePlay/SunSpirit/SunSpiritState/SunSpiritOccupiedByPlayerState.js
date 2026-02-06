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
      r.UpdateForceSpawn(false);
    } else {
      r = Transform_1.Transform.Create();
      this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritCrowdPerform_1.SunSpiritCrowdPerform(this.SunSpiritData, this.geg(r) ? r : undefined, true, false));
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged);
    return true;
  }
  OnExit() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged);
  }
  Ceg(r) {
    var e;
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    return !!t && !!r && !r.GetLocation().IsZero() && !!Global_1.Global.BaseCharacter?.CharacterActorComponent && !!(e = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem) && !e.QueryUsablePositionForBoid(r.GetLocation().ToUeVectorOld(), 0, t.AroundPlayerPosQueryBoidRadius, t.AroundPlayerPosQueryMaxTryCount).IsZero();
  }
  geg(e) {
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    if (!t) {
      return false;
    }
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!i) {
      return false;
    }
    var n = this.SunSpiritData.Transform;
    if (n && this.Ceg(n)) {
      e.Set(n.GetLocation(), n.GetRotation(), n.GetScale3D());
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.GetInitTransform 当前位置不合法，重新查询角色附近的可用位置", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
      }
      let r = false;
      var n = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
      if (!!n && !(n = n.QueryUsablePositionForBoid(i.ActorLocationProxy.ToUeVectorOld(), t.AroundPlayerPosQueryRadius, t.AroundPlayerPosQueryBoidRadius, t.AroundPlayerPosQueryMaxTryCount)).IsZero()) {
        e.SetLocation(n);
        e.SetRotation(i.ActorQuatProxy);
        r = true;
      }
      if (!r) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.GetInitTransform 查找角色附近的可用位置失败", ["SpiritConfigId", this.SunSpiritData.ConfigId], ["TargetLocation", i.ActorLocationProxy]);
        }
        return false;
      }
    }
    let r = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfigByConfigId(this.SunSpiritData.InstId, this.SunSpiritData.ConfigId)?.SunSpiritScale ?? 1;
    if (r === 0) {
      r = 1;
    }
    e.GetScale3D().Set(r, r, r);
    return true;
  }
}
exports.SunSpiritOccupiedByPlayerState = SunSpiritOccupiedByPlayerState;
//# sourceMappingURL=SunSpiritOccupiedByPlayerState.js.map