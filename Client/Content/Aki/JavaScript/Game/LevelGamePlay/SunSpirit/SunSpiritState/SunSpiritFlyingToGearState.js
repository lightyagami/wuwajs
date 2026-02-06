"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritFlyingToGearState = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SunSpiritFlyingEffectState_1 = require("./SunSpiritFlyingEffectState");
const SunSpiritOccupiedByGearState_1 = require("./SunSpiritOccupiedByGearState");
class SunSpiritFlyingToGearState extends SunSpiritFlyingEffectState_1.SunSpiritFlyingEffectState {
  constructor(t, i, e, r, n, S) {
    super(1, t, i, e);
    this.GearConfigId = r;
    this.GearSocketIndex = n;
    this.FlyingTargetGetter = (t, i) => {
      return ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.GearConfigId)?.Entity?.GetComponent(336)?.GetSunSpiritSocketLocAndRot(this.GearSocketIndex, t, i) ?? false;
    };
    this.FlyingFinishCallback = S;
    this.FlyingInterruptCallback = S;
  }
  IsSameState(t) {
    return super.IsSameState(t) && t instanceof SunSpiritFlyingToGearState && this.GearConfigId === t.GearConfigId && this.GearSocketIndex === t.GearSocketIndex;
  }
  OnSunSpiritFlyToTargetEnd(t = false, i = false) {
    super.OnSunSpiritFlyToTargetEnd(t, i);
    this.SunSpiritData.StopAllAndSetNextSunSpiritState(new SunSpiritOccupiedByGearState_1.SunSpiritOccupiedByGearState(this.SunSpiritData, this.GearConfigId, this.GearSocketIndex));
  }
  OnEnter() {
    super.OnEnter();
    if (!this.SunSpiritData.Transform || this.SunSpiritData.Transform.GetLocation().IsZero()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToGearState.OnEnter 找不到已有位置，重设飞行起点", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
      }
      var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
      if (!t) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToGearState.OnEnter 重设飞行起点位置失败", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        return false;
      }
      this.SunSpiritData.SetLocationAndRotation(t.ActorLocationProxy, t.ActorRotationProxy);
    }
    return true;
  }
}
exports.SunSpiritFlyingToGearState = SunSpiritFlyingToGearState;
//# sourceMappingURL=SunSpiritFlyingToGearState.js.map