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
  constructor(r, i, o = true, t = false) {
    super(r);
    this.Svf = o;
    this.yNg = t;
    this.pMn = Transform_1.Transform.Create();
    this.Mme = Transform_1.Transform.Create();
    this.FightWithPlayer = false;
    this.BQm = 0;
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r.ConfigId);
    if (o && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(o.BlueprintType)) && (r = (0, IEntity_1.decompressEntityData)(o, t), o = (0, IComponent_1.getComponent)(r.ComponentsData, "SunSpiritCollectComponent")) && (this.FightWithPlayer = !!o.PlayerBattleConfig, i)) {
      this.pMn.Set(i.GetLocation(), i.GetRotation(), i.GetScale3D());
    }
  }
  GetCrowdAiBoidId() {
    return this.BQm;
  }
  OnInit() {
    return this.kQm();
  }
  OnDestroy() {
    this.qQm();
  }
  GetTransform(r) {
    var i;
    return !!ModelManager_1.ModelManager.SunSpiritModel?.GetIsSunSpiritEnable() && !!ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.BQm) && !!(i = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem) && !(r.FromUeTransform(i.GetBoidTransform(this.BQm)), 0);
  }
  GetTransformData(r, i, o) {
    return !!this.GetTransform(this.Mme) && (r?.DeepCopy(this.Mme.GetLocation()), i instanceof Quat_1.Quat ? i.DeepCopy(this.Mme.GetRotation()) : i instanceof Rotator_1.Rotator && this.Mme.GetRotation().Rotator(i), o?.DeepCopy(this.Mme.GetScale3D()), true);
  }
  SetTransform(r) {
    return false;
  }
  SetTransformData(r, i, o) {
    return false;
  }
  UpdateForceSpawn(r) {
    if (this.yNg !== r) {
      this.yNg = r;
      if (this.GetTransform(this.Mme)) {
        this.pMn.Set(this.Mme.GetLocation(), this.Mme.GetRotation(), this.Mme.GetScale3D());
      } else {
        this.pMn.Reset();
      }
      this.qQm();
      this.kQm();
    }
  }
  UpdateCtrlByCrowdAi(r) {
    this.Svf = r;
    var i;
    var r = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
    if (ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.BQm) && r?.IsValid() && (r.WasBoidControlledByCrowdAi(this.BQm) !== this.Svf && r.SetBoidControlledByCrowdAi(this.BQm, this.Svf), this.Svf) && Global_1.Global.BaseCharacter?.IsValid() && (i = Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(335)?.BoidComponent?.BoidId ?? 0)) {
      r.SetWatchingBoidAndJoinGroup(this.BQm, i);
    }
  }
  GetCtrlByCrowdAi(r = false) {
    if (r && (r = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem, ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.BQm)) && r?.IsValid()) {
      this.Svf = r.WasBoidControlledByCrowdAi(this.BQm);
    }
    return this.Svf;
  }
  kQm() {
    var r;
    var i;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid");
    }
    if (ModelManager_1.ModelManager.SunSpiritModel?.GetIsSunSpiritEnable()) {
      i = ModelManager_1.ModelManager.SunSpiritModel.GetSunSpiritConfig();
      if ((r = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem)?.IsValid()) {
        if (ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.BQm)) {
          ControllerHolder_1.ControllerHolder.CrowdAiController.DestroyCrowdAiBoid(this.BQm);
        }
        if (this.pMn.GetLocation().IsZero() && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid时，初始位置为0，生成的日灵可能不显示", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        this.BQm = ControllerHolder_1.ControllerHolder.CrowdAiController.SpawnCrowdAiBoid(i.CrowdAiSystemIndex, this.pMn, this.yNg);
        if (this.BQm === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 内部错误");
          }
          return false;
        } else {
          i = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritAppearanceInfoByConfigId(this.SunSpiritData.InstId, this.SunSpiritData.ConfigId);
          if (r && i) {
            r.SetBoidAppearanceInfo(this.BQm, (0, puerts_1.$ref)(i));
            r.SetBoidControlledByCrowdAi(this.BQm, this.Svf);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid完成", ["CrowdAiBoidId", this.BQm]);
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
          Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, KuroCrowdAiSubsystem未初始化", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 日灵未启用", ["SpiritConfigId", this.SunSpiritData.ConfigId]);
      }
      return false;
    }
  }
  Qag() {
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
    var i = ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem;
    if (!i?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, KuroCrowdAiSubsystem未初始化");
      }
      return false;
    }
    if (ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.BQm)) {
      ControllerHolder_1.ControllerHolder.CrowdAiController.DestroyCrowdAiBoid(this.BQm);
    }
    var o = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    MathUtils_1.MathUtils.CommonTempVector.FromUeVector(o?.ActorLocationProxy ?? this.pMn.GetLocation());
    var o = i.QueryUsablePositionForBoid(MathUtils_1.MathUtils.CommonTempVector.ToUeVectorOld(), r.AroundPlayerPosQueryRadius, r.AroundPlayerPosQueryBoidRadius, r.AroundPlayerPosQueryMaxTryCount);
    if (!o.IsZero()) {
      MathUtils_1.MathUtils.CommonTempVector.FromUeVector(o);
    }
    this.pMn.SetLocation(MathUtils_1.MathUtils.CommonTempVector);
    this.BQm = ControllerHolder_1.ControllerHolder.CrowdAiController.SpawnCrowdAiBoid(r.CrowdAiSystemIndex, this.pMn, false);
    if (this.BQm === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid失败, 内部错误");
      }
      return false;
    } else {
      o = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritAppearanceInfoByConfigId(this.SunSpiritData.InstId, this.SunSpiritData.ConfigId);
      if (i && o) {
        i.SetBoidAppearanceInfo(this.BQm, (0, puerts_1.$ref)(o));
        i.SetBoidControlledByCrowdAi(this.BQm, this.Svf);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform生成CrowdAiBoid完成", ["CrowdAiBoidId", this.BQm]);
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
  qQm() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform销毁CrowdAiBoid", ["CrowdAiBoidId", this.BQm]);
    }
    if (ControllerHolder_1.ControllerHolder.CrowdAiController.HasCrowdAiBoid(this.BQm)) {
      ControllerHolder_1.ControllerHolder.CrowdAiController.DestroyCrowdAiBoid(this.BQm);
    }
    this.BQm = 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: SunSpiritCrowdPerform销毁CrowdAiBoid完成");
    }
  }
  OnBattleStateChanged(r) {
    if (this.FightWithPlayer) {
      ControllerHolder_1.ControllerHolder.CrowdAiController.CrowdAiSubsystem?.EnableBoidIdlePerform(this.BQm, !r);
    } else if (r && this.BQm) {
      this.qQm();
    } else if (!r && !this.BQm) {
      this.Qag();
    }
  }
}
exports.SunSpiritCrowdPerform = SunSpiritCrowdPerform;
//# sourceMappingURL=SunSpiritCrowdPerform.js.map