"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritCrowdPerform = undefined;
const puerts_1 = require("puerts");
const Log_1 = require("../../../../Core/Common/Log");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../../UniverseEditor/Interface/IEntity");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SunSpiritBasePerform_1 = require("./SunSpiritBasePerform");
class SunSpiritCrowdPerform extends SunSpiritBasePerform_1.SunSpiritBasePerform {
  constructor(r, o, i = true) {
    super(r);
    this.O0f = i;
    this.pMn = Transform_1.Transform.Create();
    this.Mme = Transform_1.Transform.Create();
    this.FightWithPlayer = false;
    this.O$m = 0;
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r.ConfigId);
    if (i && (r = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(i.BlueprintType)) && (i = (0, IEntity_1.decompressEntityData)(i, r), r = (0, IComponent_1.getComponent)(i.ComponentsData, "SunSpiritCollectComponent"))) {
      this.FightWithPlayer = !!r.PlayerBattleConfig;
      this.pMn.Set(o.GetLocation(), o.GetRotation(), o.GetScale3D());
    }
  }
  GetCrowdAiBoidId() {
    return this.O$m;
  }
  OnInit() {
    return this.G$m();
  }
  OnDestroy() {
    this.F$m();
  }
  GetTransform(r) {
    var o;
    return !!ModelManager_1.ModelManager.SunSpiritModel?.GetIsSunSpiritEnable() && !!ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.O$m) && !!(o = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem) && !(r.FromUeTransform(o.GetBoidTransform(this.O$m)), 0);
  }
  GetTransformData(r, o, i) {
    return !!this.GetTransform(this.Mme) && (r?.DeepCopy(this.Mme.GetLocation()), o instanceof Quat_1.Quat ? o.DeepCopy(this.Mme.GetRotation()) : o instanceof Rotator_1.Rotator && this.Mme.GetRotation().Rotator(o), i?.DeepCopy(this.Mme.GetScale3D()), true);
  }
  SetTransform(r) {
    return false;
  }
  SetTransformData(r, o, i) {
    return false;
  }
  UpdateCtrlByCrowdAi(r) {
    this.O0f = r;
    r = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
    if (ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.O$m) && r?.IsValid()) {
      r.SetBoidControlledByCrowdAi(this.O$m, this.O0f);
    }
  }
  G$m(r = true) {
    var o;
    var i;
    var t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid");
    }
    if (ModelManager_1.ModelManager.SunSpiritModel?.GetIsSunSpiritEnable()) {
      o = ModelManager_1.ModelManager.SunSpiritModel.GetSunSpiritConfig();
      if ((i = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem)?.IsValid()) {
        if (ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.O$m)) {
          ControllerHolder_1.ControllerHolder.CrowdAiController.DestroyCrowdAiBoid(this.O$m);
        }
        if (this.pMn.GetLocation().IsZero()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid时，初始位置为0，重新查询附近的可用位置", ["InitLocation", this.pMn.GetLocation()]);
          }
          t = i.QueryUsablePositionForBoid(this.pMn.GetLocation().ToUeVectorOld(), o.AroundPlayerPosQueryRadius, o.AroundPlayerPosQueryBoidRadius, o.AroundPlayerPosQueryMaxTryCount);
          MathUtils_1.MathUtils.CommonTempVector.FromUeVector(t);
          if (MathUtils_1.MathUtils.CommonTempVector.IsZero()) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid时，查询不到指定出生位置附近的可用位置", ["InitLocation", this.pMn.GetLocation()]);
            }
          } else {
            this.pMn.SetLocation(MathUtils_1.MathUtils.CommonTempVector);
          }
        }
        this.O$m = ControllerHolder_1.ControllerHolder.CrowdAiController.SpawnCrowdAiBoid(o.CrowdAiSystemIndex, this.pMn, r);
        if (this.O$m === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 内部错误");
          }
          return false;
        } else {
          t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritAppearanceInfoByConfigId(this.SunSpiritData.InstId, this.SunSpiritData.ConfigId);
          if (i && t) {
            i.SetBoidAppearanceInfo(this.O$m, (0, puerts_1.$ref)(t));
            i.SetBoidControlledByCrowdAi(this.O$m, this.O0f);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid完成", ["CrowdAiBoidId", this.O$m]);
            }
            return true;
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 设置日灵外观失败");
            }
            return false;
          }
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, KuroCrowdAiSubsystem未初始化");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 日灵未启用");
      }
      return false;
    }
  }
  zQf() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid");
    }
    if (!ModelManager_1.ModelManager.SunSpiritModel?.GetIsSunSpiritEnable()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 日灵未启用");
      }
      return false;
    }
    var r = ModelManager_1.ModelManager.SunSpiritModel.GetSunSpiritConfig();
    var o = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
    if (!o?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, KuroCrowdAiSubsystem未初始化");
      }
      return false;
    }
    if (ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.O$m)) {
      ControllerHolder_1.ControllerHolder.CrowdAiController.DestroyCrowdAiBoid(this.O$m);
    }
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    MathUtils_1.MathUtils.CommonTempVector.FromUeVector(i?.ActorLocationProxy ?? this.pMn.GetLocation());
    var i = o.QueryUsablePositionForBoid(MathUtils_1.MathUtils.CommonTempVector.ToUeVectorOld(), r.AroundPlayerPosQueryRadius, r.AroundPlayerPosQueryBoidRadius, r.AroundPlayerPosQueryMaxTryCount);
    if (!i.IsZero()) {
      MathUtils_1.MathUtils.CommonTempVector.FromUeVector(i);
    }
    this.pMn.SetLocation(MathUtils_1.MathUtils.CommonTempVector);
    this.O$m = ControllerHolder_1.ControllerHolder.CrowdAiController.SpawnCrowdAiBoid(r.CrowdAiSystemIndex, this.pMn, false);
    if (this.O$m === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 内部错误");
      }
      return false;
    } else {
      i = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritAppearanceInfoByConfigId(this.SunSpiritData.InstId, this.SunSpiritData.ConfigId);
      if (o && i) {
        o.SetBoidAppearanceInfo(this.O$m, (0, puerts_1.$ref)(i));
        o.SetBoidControlledByCrowdAi(this.O$m, this.O0f);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid完成", ["CrowdAiBoidId", this.O$m]);
        }
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 设置日灵外观失败");
        }
        return false;
      }
    }
  }
  F$m() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform销毁CrowdAiBoid", ["CrowdAiBoidId", this.O$m]);
    }
    if (ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.O$m)) {
      ControllerHolder_1.ControllerHolder.CrowdAiController.DestroyCrowdAiBoid(this.O$m);
    }
    this.O$m = 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform销毁CrowdAiBoid完成");
    }
  }
  OnBattleStateChanged(r) {
    if (this.FightWithPlayer) {
      ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem?.EnableBoidIdlePerform(this.O$m, !r);
    } else if (r && this.O$m) {
      this.F$m();
    } else if (!r && !this.O$m) {
      this.zQf();
    }
  }
}
exports.SunSpiritCrowdPerform = SunSpiritCrowdPerform;
//# sourceMappingURL=SunSpiritCrowdPerform.js.map