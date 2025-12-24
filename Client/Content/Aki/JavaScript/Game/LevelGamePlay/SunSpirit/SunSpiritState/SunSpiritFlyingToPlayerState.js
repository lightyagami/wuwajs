"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritFlyingToPlayerState = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SunSpiritFlyingEffectState_1 = require("./SunSpiritFlyingEffectState");
const SunSpiritOccupiedByPlayerState_1 = require("./SunSpiritOccupiedByPlayerState");
class SunSpiritFlyingToPlayerState extends SunSpiritFlyingEffectState_1.SunSpiritFlyingEffectState {
  constructor(t, i, r, e, a, n) {
    super(2, t, i, r);
    this.GearConfigId = e;
    this.GearSocketIndex = a;
    this.$9f = 0;
    this.FlyingTargetGetter = (t, i) => {
      if (!this.b8f()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.FlyingTargetGetter缓存的目标位置已过时，重新查询可用位置", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        this.W9f();
      }
      if (this.xAf && this.BAf) {
        t.DeepCopy(this.xAf);
        i.DeepCopy(this.BAf);
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.FlyingTargetGetter缓存的目标位置为空", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        return false;
      }
    };
    this.xAf = undefined;
    this.BAf = undefined;
    this.FlyingFinishCallback = n;
    this.FlyingInterruptCallback = n;
  }
  b8f() {
    if (!this.xAf || !this.BAf) {
      return false;
    }
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!t) {
      return false;
    }
    if (this.xAf.IsZero() || t.ActorLocationProxy.IsZero()) {
      return false;
    }
    if (MathUtils_1.MathUtils.VectorDistanceSquared(this.xAf, t.ActorLocationProxy) > this.$9f) {
      return false;
    }
    var t = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
    var i = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    if (t && i && t.QueryUsablePositionForBoid(this.xAf.ToUeVectorOld(), 0, i.AroundPlayerPosQueryBoidRadius, 1).IsZero()) {
      return false;
    }
    return true;
  }
  W9f() {
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    if (t) {
      var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
      if (i) {
        if (!this.xAf || !this.BAf) {
          this.xAf = Vector_1.Vector.Create();
          this.BAf = Quat_1.Quat.Create();
        }
        var r = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
        if (r) {
          r = r.QueryUsablePositionForBoid(i.ActorLocationProxy.ToUeVectorOld(), t.AroundPlayerPosQueryRadius, t.AroundPlayerPosQueryBoidRadius, t.AroundPlayerPosQueryMaxTryCount);
          if (!r.IsZero()) {
            this.xAf.DeepCopy(r);
            this.BAf.FromUeQuat(i.ActorQuatProxy);
            return;
          }
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.UpdateFlyingTargetCache 查找角色附近的可用位置失败，使用角色位置替代", ["SpiritConfigId", this.SunSpiritData.ConfigId], ["TargetLocation", i.ActorLocationProxy]);
        }
        this.xAf.DeepCopy(i.ActorLocationProxy);
        this.BAf.FromUeQuat(i.ActorQuatProxy);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.UpdateFlyingTargetCache 更新目标位置失败，找不到目标角色", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.UpdateFlyingTargetCache 更新目标位置失败，配置获取失败", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
    }
  }
  OnSunSpiritFlyToTargetEnd(t = false, i = false) {
    super.OnSunSpiritFlyToTargetEnd(t, i);
    this.SunSpiritData.StopAllAndSetNextSunSpiritState(new SunSpiritOccupiedByPlayerState_1.SunSpiritOccupiedByPlayerState(this.SunSpiritData));
  }
  OnEnter() {
    super.OnEnter();
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    if (!t) {
      return false;
    }
    this.$9f = t.FlyFromGearToPlayerMaxOffsetForReQueryTargetLoc * t.FlyFromGearToPlayerMaxOffsetForReQueryTargetLoc;
    if (!this.SunSpiritData.Transform || this.SunSpiritData.Transform.GetLocation().IsZero()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.OnEnter 找不到已有位置，重设飞行起点", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
      }
      var t = Vector_1.Vector.Create();
      var i = Quat_1.Quat.Create();
      if (!ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.GearConfigId)?.Entity?.GetComponent(334)?.GetSunSpiritSocketLocAndRot(this.GearSocketIndex, t, i)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.OnEnter 重设飞行起点位置失败", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        return false;
      }
      this.SunSpiritData.SetLocationAndRotation(t, i);
    }
    return true;
  }
}
exports.SunSpiritFlyingToPlayerState = SunSpiritFlyingToPlayerState;
//# sourceMappingURL=SunSpiritFlyingToPlayerState.js.map