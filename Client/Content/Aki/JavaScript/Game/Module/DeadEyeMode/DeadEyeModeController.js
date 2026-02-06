"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadEyeModeController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const MotorEffectById_1 = require("../../../Core/Define/ConfigQuery/MotorEffectById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FollowShooterDrone_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/FollowShooterDrone");
const FollowUtils_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/FollowUtils");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
class DeadEyeModeController extends ControllerBase_1.ControllerBase {
  static Init() {
    var e = super.Init();
    this.sCe();
    return e;
  }
  static Clear() {
    this.aCe();
    return super.Clear();
  }
  static OnLeaveLevel() {
    if (TimerSystem_1.GameplayTimerSystem.Has(DeadEyeModeController.vwm)) {
      TimerSystem_1.GameplayTimerSystem.Remove(DeadEyeModeController.vwm);
    }
    return true;
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDeadEyeModeStageChange, DeadEyeModeController.Mcm);
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDeadEyeModeStageChange, DeadEyeModeController.Mcm);
  }
  static async EnterDeadEyeJumpPlatform(e, o) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    var r = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(r);
    if (r) {
      ControllerHolder_1.ControllerHolder.LevelPlayController.LogReportMotorcycleLevelPlay(r, 5, true);
    }
    var r = ModelManager_1.ModelManager.DeadEyeModeModel;
    if (!r.HighlightDataLockedAsset && e.EffectConfig?.TargetLockedMaterialDa) {
      r.HighlightDataLockedAsset = await this.IIf(e.EffectConfig?.TargetLockedMaterialDa);
    }
    if (!r.HighlightDataNotLockAsset && e.EffectConfig?.TargetIdleMaterialDa) {
      r.HighlightDataNotLockAsset = await this.IIf(e.EffectConfig?.TargetIdleMaterialDa);
    }
    var t = await DeadEyeModeController.jnf(10001017);
    this.Wnf = new CustomPromise_1.CustomPromise();
    EventSystem_1.EventSystem.OnceWithCondition(EventDefine_1.EEventName.OnDeadEyeModeTrigger, DeadEyeModeController.Qnf, t);
    await this.Wnf.Promise;
    var t = e.DefaultLookAt?.TransitionTime ?? 0.4;
    var a = e.TimeScaleTransitionTime ?? 0.4;
    let l = e.EnergyConfig?.MaxEnergy ?? 0;
    if (ModelManager_1.ModelManager.MotorcycleDevelopModel.IsLinkTimeNodeActivated() && (i = MotorEffectById_1.configMotorEffectById.GetConfig(100010))) {
      l += Number(i.Param1);
    }
    r.StartDeadEyeMode(0, e.EnergyConfig, l, a, o, e.TimeScale ?? 0.02, e.DefaultLookAt?.SubLensTag, e.EffectConfig, e.FinishSendSelfEvent);
    var i = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (i) {
      for (const n of i) {
        this.Tcm(n, e.FocusRadius, e.FocusOnTags);
      }
    }
    if (r.GetFocusEntities().length) {
      r.EnterNextStage();
      if (r.FilterEffectPath) {
        DeadEyeModeController.Lod = ControllerHolder_1.ControllerHolder.DeadEyeModeController.PlayFilterEffect(r.FilterEffectPath);
      }
      UiManager_1.UiManager.OpenViewAsync("DeadEyeJumpRampView").then(() => {
        ModelManager_1.ModelManager.DeadEyeModeModel.EnterNextStage();
      });
      EffectSystem_1.EffectSystem.SetAdditionTimeScaleEnable(16, true);
      DeadEyeModeController.vwm = TimerSystem_1.GameplayTimerSystem.Forever(DeadEyeModeController.ywm, TimerSystem_1.MIN_TIME);
      o = Vector_1.Vector.Create();
      i = e.DefaultLookAt?.LookAtPointId;
      if (DeadEyeModeController.dA1(i, o)) {
        DeadEyeModeController.Knf(o, t, r.SubCameraTag);
      }
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        if (TimerSystem_1.GameplayTimerSystem.Has(DeadEyeModeController.vwm)) {
          TimerSystem_1.GameplayTimerSystem.Remove(DeadEyeModeController.vwm);
        }
      }, a * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  static async EnterDeadEyeModeWithoutEntity(e) {
    var o = e.DefaultLookAt?.TransitionTime ?? 0.4;
    var r = e.TimeScaleTransitionTime ?? 0.4;
    var t = ModelManager_1.ModelManager.DeadEyeModeModel;
    t.HideFollowShooterWhenFinish = false;
    let a = e.EnergyConfig?.MaxEnergy ?? 0;
    if (ModelManager_1.ModelManager.MotorcycleDevelopModel.IsLinkTimeNodeActivated() && (i = MotorEffectById_1.configMotorEffectById.GetConfig(100010))) {
      a += Number(i.Param1);
    }
    t.StartDeadEyeMode(1, e.EnergyConfig, a, r, -1, e.TimeScale ?? 0.02, e.DefaultLookAt?.SubLensTag ?? 0);
    t.EnterNextStage();
    for (const _ of e.FocusPositions) {
      var l = Vector_1.Vector.Create(_.X ?? 0, _.Y ?? 0, _.Z ?? 0);
      ModelManager_1.ModelManager.DeadEyeModeModel.AddTargetLocation(l);
    }
    EffectSystem_1.EffectSystem.SetAdditionTimeScaleEnable(16, true);
    ModelManager_1.ModelManager.CharacterModel.AddExtraEntityToEnterSelfCenteredState(this.KFf());
    DeadEyeModeController.vwm = TimerSystem_1.GameplayTimerSystem.Forever(DeadEyeModeController.ywm, TimerSystem_1.MIN_TIME);
    var i = e.DefaultLookAt?.LookAtPosition;
    if (i) {
      i = Vector_1.Vector.Create(i?.X ?? 0, i?.Y ?? 0, i?.Z ?? 0);
      DeadEyeModeController.Knf(i, o, t.SubCameraTag);
    }
    const n = new CustomPromise_1.CustomPromise();
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      n.SetResult();
    }, r * TimeUtil_1.TimeUtil.InverseMillisecond);
    await n.Promise;
    if (TimerSystem_1.GameplayTimerSystem.Has(DeadEyeModeController.vwm)) {
      TimerSystem_1.GameplayTimerSystem.Remove(DeadEyeModeController.vwm);
    }
    if (e.FollowShooterConfig) {
      ModelManager_1.ModelManager.DeadEyeModeModel.DeadEyeFollowShooterConfig = await this.tPm(e.FollowShooterConfig.DeadeyeShooterDa);
    }
    await UiManager_1.UiManager.OpenViewAsync("DeadEyeFloaterShooterView");
    ModelManager_1.ModelManager.DeadEyeModeModel.EnterNextStage();
  }
  static EnableSingleEntityHighlight(e, o) {
    var r = ModelManager_1.ModelManager.DeadEyeModeModel;
    let t = undefined;
    let a = false;
    switch (o) {
      case 2:
        t = r.HighlightDataLockedAsset;
        break;
      case 1:
        t = r.HighlightDataNotLockAsset;
        a = true;
    }
    o = e.Entity?.GetComponent(1);
    if (o && o.Owner?.IsValid()) {
      var l = UE.LGUIBPLibrary.GetComponentsInChildren(o.Owner, UE.StaticMeshComponent.StaticClass(), false);
      var i = t?.ReplaceMaterial;
      for (let e = 0; e < l.Num(); e++) {
        var n = l.Get(e);
        if (n && n.IsValid()) {
          var _ = n.GetNumMaterials();
          if (i) {
            let o = undefined;
            if (a) {
              o = new Map();
              r.RevertMaterialComponentsMaps.set(n, o);
            }
            var s = n.GetMaterials();
            for (let e = 0; e < _; e++) {
              o?.set(e, s.Get(e));
              n.SetMaterial(e, i);
            }
          } else {
            var d = r.RevertMaterialComponentsMaps?.get(n);
            for (let e = 0; e < _; e++) {
              n.SetMaterial(e, d?.get(e));
            }
          }
        }
      }
      var M = UE.LGUIBPLibrary.GetComponentsInChildren(o.Owner, UE.SkeletalMeshComponent.StaticClass(), true);
      if (M.Num()) {
        if (t) {
          if (r.CharRenderingComponents.size) {
            for (var [y, m] of r.CharRenderingComponents) {
              y.RemoveMaterialControllerData(m);
            }
            r.CharRenderingComponents.clear();
          }
          for (let e = 0; e < M.Num(); e++) {
            var E = M.Get(e);
            var C = E?.GetOwner();
            if (C && C.IsValid()) {
              let e = C.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
              (e = e || C.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)).Init(2);
              e.AddComponentByCase(0, E);
              C = e.AddMaterialControllerData(t);
              r.CharRenderingComponents.set(e, C);
            }
          }
        } else if (r.CharRenderingComponents.size) {
          for (var [c, f] of r.CharRenderingComponents) {
            c.RemoveMaterialControllerData(f);
          }
          r.CharRenderingComponents.clear();
        }
      }
    }
  }
  static async ZLm() {
    var e;
    var o = ModelManager_1.ModelManager.DeadEyeModeModel;
    var r = o.SubCameraTag;
    if (r) {
      DeadEyeModeController.Ecm(r, false);
    }
    var t = [];
    var r = o.GetLockedEntities();
    if (r.length > 0) {
      for (const i of r) {
        if (i.Valid && i.Entity?.IsInit && (e = i.Entity.GetComponent(1))) {
          t.push(e.ActorLocationProxy);
        }
      }
    }
    var a = o.GetTargetLocations();
    if (a.length > 0) {
      t.push(...a);
    }
    if (o.Type !== 0) {
      await DeadEyeModeController.ePm(t);
    }
    if (r.length > 0) {
      var l = [];
      for (const n of r) {
        l.push(n.CreatureDataId);
      }
      DeadEyeModeController.fPm(l);
    }
  }
  static async tPm(e) {
    const o = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_FollowShooterDeadEyeConfig_C", () => {
      o.SetResult();
    });
    await o.Promise;
    if (ResourceSystem_1.ResourceSystem.GetLoadedType("BP_FollowShooterDeadEyeConfig_C")) {
      const r = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.BP_FollowShooterDeadEyeConfig_C, (e, o) => {
        r.SetResult(e);
      });
      return await r.Promise;
    }
  }
  static async IIf(e) {
    const o = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("PD_CharacterControllerData_C", () => {
      o.SetResult();
    });
    await o.Promise;
    if (ResourceSystem_1.ResourceSystem.GetLoadedType("PD_CharacterControllerData_C")) {
      const r = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PD_CharacterControllerData_C, (e, o) => {
        r.SetResult(e);
      });
      return await r.Promise;
    }
  }
  static async jnf(e) {
    var o;
    var r = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
    if (r) {
      if ((r = r.GetComponent(242)) && r.VehicleEntity) {
        if (o = r.VehicleEntity.GetComponent(44)) {
          await o.BeginSkillAsync(e);
          return r.VehicleEntity.Id;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("DeadEye", 18, "PlayMotorSkill.找不到vehicleSkillComponent");
          }
          return 0;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("DeadEye", 18, "PlayMotorSkill.找不到载具实体");
        }
        return 0;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("DeadEye", 18, "PlayMotorSkill.找不到玩家实体");
      }
      return 0;
    }
  }
  static Knf(e, o, r) {
    if (r) {
      DeadEyeModeController.Ecm(r, true);
    }
    if (e) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.PlayCameraRotatorWithCurveSustaining(e, o - 0.1, 0.1, false);
    }
  }
  static Ecm(e, o) {
    var r = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(217);
    if (r) {
      if (o) {
        r.AddTag(e);
      } else {
        r.RemoveTag(e);
      }
    }
  }
  static dA1(e, o) {
    if (e) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
      if (r?.Valid) {
        var t = r.Entity.GetComponent(1);
        if (t?.Valid) {
          o.DeepCopy(t.ActorLocationProxy);
          return true;
        }
        t = r.Entity.GetComponent(0);
        if (t?.Valid) {
          o.DeepCopy(t.GetLocation());
          return true;
        }
      } else {
        r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);
        if (!r) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("DeadEye", 57, "[CameraLookAt]覆盖实体不存在", ["pbDataId", e]);
          }
          return false;
        }
        t = r.Transform;
        if (t) {
          o.Set(t.Pos?.X ?? 0, t.Pos?.Y ?? 0, t.Pos?.Z ?? 0);
          return true;
        }
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("DeadEye", 18, "[DeadEyeModeController.GetEntityPosition]覆盖实体无法获取有效位置", ["pbDataId", e]);
      }
    }
    return false;
  }
  static Tcm(e, o, r) {
    if (e?.Valid) {
      var t = e.Entity;
      if (t?.IsInit) {
        var a = t.GetComponent(208);
        if (a && !a.HasTag(-662723379)) {
          t = t.GetComponent(1)?.ActorLocationProxy;
          if (t) {
            var l = ModelManager_1.ModelManager.CreatureModel.GetEntity(ModelManager_1.ModelManager.DeadEyeModeModel.TriggerEntityCreatureDataId);
            if (l && l.Entity && l.Entity.Valid) {
              l = l.Entity.GetComponent(1)?.ActorLocationProxy;
              if (l) {
                if (Vector_1.Vector.Dist(t, l) <= o) {
                  for (const n of r) {
                    var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n);
                    if (i && a.ContainsTag(i)) {
                      ModelManager_1.ModelManager.DeadEyeModeModel.AddFocusEntity(e);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  static bIf(e) {
    for (const o of ModelManager_1.ModelManager.DeadEyeModeModel.GetFocusEntities()) {
      DeadEyeModeController.EnableSingleEntityHighlight(o, e);
    }
  }
  static KFf() {
    return FollowUtils_1.FollowUtils.GetPlayerFollowShooter(ModelManager_1.ModelManager.CreatureModel.GetPlayerId());
  }
  static async ePm(e) {
    var o;
    var r = ModelManager_1.ModelManager.DeadEyeModeModel;
    var t = this.KFf();
    if (t?.Valid && t.Entity?.Valid && (o = t.Entity.CheckGetComponent(235)) && o.FollowShooterConfig) {
      await FollowShooterDrone_1.FollowShooterDrone.AsyncStartShootAtTargets(t.Entity.Id, o.FollowShooterConfig, e, r.DeadEyeFollowShooterConfig, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      r.DeadEyeFollowShooterConfig = undefined;
    }
  }
  static fPm(e) {
    e = Protocol_1.Aki.Protocol.eLm.create({
      r6n: ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      PSs: e
    });
    Net_1.Net.Call(21252, e, e => {
      if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 16774);
      }
    });
  }
  static PlayFilterEffect(e, o) {
    e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, Global_1.Global.BaseCharacter?.D_GetTransform(), e, "[DeadEyeMode]", undefined, 3, undefined, o);
    EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(e, () => ModelManager_1.ModelManager.DeadEyeModeModel.IsInDeadEyeMode);
    return e;
  }
}
exports.DeadEyeModeController = DeadEyeModeController;
(_a = DeadEyeModeController).vwm = undefined;
DeadEyeModeController.Wnf = undefined;
DeadEyeModeController.Lod = 0;
DeadEyeModeController.Qnf = () => {
  _a.Wnf?.SetResult();
};
DeadEyeModeController.Mcm = () => {
  const e = ModelManager_1.ModelManager.DeadEyeModeModel;
  var o = "DeadMode";
  switch (e.CurDeadEyeModeStage) {
    case 1:
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Normal, false);
      InputManager_1.InputManager.RegisterLockShortcutKeyReason(o);
      break;
    case 2:
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Normal, true);
      InputManager_1.InputManager.RemoveLockShortcutKeyReason(o);
      ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag();
      if (e.Type === 0) {
        DeadEyeModeController.bIf(1);
      }
      break;
    case 3:
      ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag();
      if (EffectSystem_1.EffectSystem.IsValid(_a.Lod) && (EffectSystem_1.EffectSystem.StopEffectById(_a.Lod, "[DeadEyeModeController.停止特效]", false), _a.Lod = 0, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("DeadEye", 18, "DeadEyeModeController.关闭ScreenEffect");
      }
      DeadEyeModeController.bIf(0);
      EffectSystem_1.EffectSystem.SetAdditionTimeScaleEnable(16, false);
      ControllerHolder_1.ControllerHolder.CharacterController.ExitSelfCenteredMode(2);
      ModelManager_1.ModelManager.CharacterModel.ClearExtraEntitiesToEnterSelfCenteredState();
      if (e.HideFollowShooterWhenFinish) {
        DeadEyeModeController.jnf(100010102);
      }
      break;
    case 4:
      _a.ZLm().then(() => {
        if (e.FinishEvent) {
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(e.TriggerEntityCreatureDataId, e.FinishEvent);
        }
        e.EndDeadEyeMode();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDeadEyeModeFinish);
      });
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("DeadEye", 18, "死眼玩法：状态改变", ["curStage", e.CurDeadEyeModeStage]);
  }
};
DeadEyeModeController.OnDeadEyeModeShowShooter = () => {
  DeadEyeModeController.jnf(100010101);
};
DeadEyeModeController.ywm = e => {
  var o = ModelManager_1.ModelManager.DeadEyeModeModel;
  o.LerpElapsedTime += e;
  var e = MathCommon_1.MathCommon.Clamp(o.LerpElapsedTime / o.TimeScaleTransitionTime, 0, 1);
  var o = MathCommon_1.MathCommon.Lerp(1, o.TimeScale, e);
  ControllerHolder_1.ControllerHolder.CharacterController.EnterSelfCenteredMode(2, o);
  var e = ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
  EffectSystem_1.EffectSystem.SetAdditionTimeScale(16, DeadEyeModeController.Lod, e);
}; //# sourceMappingURL=DeadEyeModeController.js.map