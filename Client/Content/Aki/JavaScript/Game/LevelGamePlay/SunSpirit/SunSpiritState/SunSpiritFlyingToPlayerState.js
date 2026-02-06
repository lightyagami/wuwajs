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
    this.meg = 0;
    this.FlyingTargetGetter = (t, i) => {
      if (!this.kYf()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.FlyingTargetGetter缓存的目标位置已过时，重新查询可用位置", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        this.feg();
      }
      if (this.cqf && this.dqf) {
        t.DeepCopy(this.cqf);
        i.DeepCopy(this.dqf);
        return true;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.FlyingTargetGetter缓存的目标位置为空", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        return false;
      }
    };
    this.cqf = undefined;
    this.dqf = undefined;
    this.FlyingFinishCallback = n;
    this.FlyingInterruptCallback = n;
  }
  kYf() {
    if (!this.cqf || !this.dqf) {
      return false;
    }
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!t) {
      return false;
    }
    if (this.cqf.IsZero() || t.ActorLocationProxy.IsZero()) {
      return false;
    }
    if (MathUtils_1.MathUtils.VectorDistanceSquared(this.cqf, t.ActorLocationProxy) > this.meg) {
      return false;
    }
    var t = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
    var i = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    if (t && i && t.QueryUsablePositionForBoid(this.cqf.ToUeVectorOld(), 0, i.AroundPlayerPosQueryBoidRadius, 1).IsZero()) {
      return false;
    }
    return true;
  }
  feg() {
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig();
    if (t) {
      var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
      if (i) {
        var r = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
        if (r) {
          r = r.QueryUsablePositionForBoid(i.ActorLocationProxy.ToUeVectorOld(), t.AroundPlayerPosQueryRadius, t.AroundPlayerPosQueryBoidRadius, t.AroundPlayerPosQueryMaxTryCount);
          if (!r.IsZero()) {
            if (!this.cqf || !this.dqf) {
              this.cqf = Vector_1.Vector.Create();
              this.dqf = Quat_1.Quat.Create();
            }
            this.cqf.DeepCopy(r);
            this.dqf.FromUeQuat(i.ActorQuatProxy);
            return;
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.UpdateFlyingTargetCache 查找角色附近的可用位置失败", ["SpiritConfigId", this.SunSpiritData.ConfigId], ["TargetLocation", i.ActorLocationProxy]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.UpdateFlyingTargetCache 更新目标位置失败，找不到目标角色", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.UpdateFlyingTargetCache 更新目标位置失败，配置获取失败", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
    }
    this.cqf = undefined;
    this.dqf = undefined;
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
    this.meg = t.FlyFromGearToPlayerMaxOffsetForReQueryTargetLoc * t.FlyFromGearToPlayerMaxOffsetForReQueryTargetLoc;
    if (!this.SunSpiritData.Transform || this.SunSpiritData.Transform.GetLocation().IsZero()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritFlyingToPlayerState.OnEnter 找不到已有位置，重设飞行起点", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
      }
      var t = Vector_1.Vector.Create();
      var i = Quat_1.Quat.Create();
      if (!ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.GearConfigId)?.Entity?.GetComponent(336)?.GetSunSpiritSocketLocAndRot(this.GearSocketIndex, t, i)) {
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