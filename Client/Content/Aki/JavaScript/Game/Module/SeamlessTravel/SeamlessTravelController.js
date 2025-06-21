"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SeamlessTravelController = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CustomMovementDefine_1 = require("../../NewWorld/Character/Common/Component/Move/CustomMovementDefine"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  SeamlessTravelKeepKite_1 = require("./SeamlessTravelKeepKite"),
  SeamlessTravelKeepMovementMode_1 = require("./SeamlessTravelKeepMovementMode"),
  SeamlessTravelPostProcess_1 = require("./SeamlessTravelPostProcess"),
  SeamlessTravelSceneEffect_1 = require("./SeamlessTravelSceneEffect"),
  SeamlessTravelScreenEffect_1 = require("./SeamlessTravelScreenEffect"),
  SeamlessTravelTreadmill_1 = require("./SeamlessTravelTreadmill");
class SeamlessTravelController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterTransitionMap, this.qea), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EndTravelMap, this.Gea), this.PauseTick(), !0
  }
  static OnClear() {
    return EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterTransitionMap, this.qea), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EndTravelMap, this.Gea), !0
  }
  static OnTick(e) {
    ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelTreadmill && ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelTreadmill.Tick(e), ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelKeepKite && ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelKeepKite.Tick(e), ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelKeepMovementMode && ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelKeepMovementMode.Tick(e), ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelPostProcess && ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelPostProcess.Tick(e)
  }
  static StartTravel(e) {
    var a;
    return ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel ? (a = ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessTravelController)?.IsValid() ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:开始]"), ResourceSystem_1.ResourceSystem.SetForceLoadModeInGame(GlobalData_1.GlobalData.World, !0), ModelManager_1.ModelManager.SeamlessTravelModel.InSeamlessTraveling = !0, ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle && (TimerSystem_1.TimerSystem.Remove(ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle), ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle = void 0), WorldGlobal_1.WorldGlobal.PlayerClientTravel(a, e), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 29, "[无缝加载:失败]PlayerController无效"), !1) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("SeamlessTravel", 29, "[无缝加载:失败]未开启无缝加载模式"), !1)
  }
  static EnableSeamlessTravel(e, a = !1) {
    var r = Global_1.Global.CharacterController;
    if (!r?.IsValid()) return Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 29, "[开启无缝加载:失败]PlayerController无效"), !1;
    const o = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (a) o.HasPreEnableSeamlessTravel = !0;
    else if (o.HasPreEnableSeamlessTravel) return !0;
    o.Config = e, o.CreatePromise(), o.IsSeamlessTravel = !0, o.SeamlessTravelPlayerEntityHandle = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      this.HMl(i);
      var l = i.Entity.GetComponent(0),
        s = ModelManager_1.ModelManager.CreatureModel.GetEntity(l.VisionSkillServerEntityId),
        s = (s && this.HMl(s), l.CustomServerEntityIds);
      0 < s.length && s.forEach(e => {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
        e && this.HMl(e)
      }), l.VisionControlCreatureDataId && (s = ModelManager_1.ModelManager.CreatureModel.GetEntity(l.VisionControlCreatureDataId)) && this.HMl(s)
    }
    o.SeamlessTravelController = r;
    var a = CameraController_1.CameraController.FightCamera.LogicComponent.CameraActor,
      r = (r.bUseSeamlessCameraActor = !0, r.SeamlessCameraActor = a, SeamlessTravelController.AddSeamlessTravelActor(a), o.SeamlessTravelCamera = a, o.SeamlessTravelInputDistributeTags.length = 0, ModelManager_1.ModelManager.InputDistributeModel?.IsAllowFightMoveInput()),
      a = ModelManager_1.ModelManager.InputDistributeModel?.IsAllowFightCameraRotationInput(),
      t = ModelManager_1.ModelManager.InputDistributeModel?.IsAllowFightCameraZoomInput(),
      r = (r || a || t ? (r && o.SeamlessTravelInputDistributeTags.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag), a && o.SeamlessTravelInputDistributeTags.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraRotationTag), t && o.SeamlessTravelInputDistributeTags.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraZoomTag)) : o.SeamlessTravelInputDistributeTags.push(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag), o.SeamlessTravelPlayerEntityHandle.Entity);
    o.UseTreadmill = !0, o.UseKeepKite = !1, o.UseKeepMovementMode = !1;
    let _ = void 0,
      n = void 0;
    return e.KeepMovementStateFeatures?.KeepKite && (a = r?.GetComponent(99))?.GetIsHooking() && "KiteHook" === a.GetCurrentTarget()?.GetHookInteractType() && (o.UseTreadmill = !1, o.UseKeepKite = !0, o.UseKeepMovementMode = !0, _ = 6, n = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE), o.UseKeepMovementMode || (t = SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode.GetCurrentKeepableMovementMode(e)) && (o.UseTreadmill = !1, o.UseKeepMovementMode = !0, _ = t[0], n = t[1]), o.UseTreadmill && (o.SeamlessTravelTreadmill = new SeamlessTravelTreadmill_1.SeamlessTravelTreadmill, o.SeamlessTravelTreadmill.Init(e, e => {
      o.MeshAssetLoadedPromise?.SetResult(e)
    })), o.UseKeepMovementMode && (o.SeamlessTravelKeepMovementMode = new SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode, o.SeamlessTravelKeepMovementMode.SetInitDataWithTargetMode(_, n), o.SeamlessTravelKeepMovementMode?.Init(e, e => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:保持运动状态开始]"), o.SeamlessTravelKeepMovementMode?.AppearEffect()
    })), o.UseKeepKite && (a = r.GetComponent(99).GetCurrentTargetEntity().Entity, o.SeamlessTravelKeepKite = new SeamlessTravelKeepKite_1.SeamlessTravelKeepKite, o.SeamlessTravelKeepKite.SetInitData(a, r), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:风筝资产加载(开始)]"), o.SeamlessTravelKeepKite.Init(e, e => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:风筝资产加载(完成)]");
      var a = [];
      o.SeamlessTravelKeepKite.GetSeamlessTravelActors(a);
      for (const l of a) SeamlessTravelController.AddSeamlessTravelActor(l);
      var a = o.SeamlessTravelPlayerEntityHandle.Entity,
        r = a?.GetComponent(99);
      r?.GetIsHooking() && "KiteHook" === r.GetCurrentTarget()?.GetHookInteractType() && (r.GetCurrentTargetEntity().Entity?.Disable("[无缝加载]隐藏风筝声骸"), r.SetIsHookEndByInterrupt(!0), (a?.GetComponent(40))?.EndSkill(210130, "[无缝加载]停止勾风筝技能")), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:伪风筝显形]"), o.SeamlessTravelKeepKite?.AppearEffect(), o.KiteInitPromise?.SetResult(e)
    })), e?.EffectPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:屏幕特效资产加载(开始)]"), o.SeamlessTravelScreenEffect = new SeamlessTravelScreenEffect_1.SeamlessTravelScreenEffect, o.SeamlessTravelScreenEffect.Init(e, e => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:屏幕特效资产加载(完成)]"), o.EffectAssetLoadedPromise?.SetResult(e)
    })), o.Config?.TransitionWeatherDaPath && (o.SeamlessTravelPostProcess = new SeamlessTravelPostProcess_1.SeamlessTravelPostProcess, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:后处理资产加载(开始)]"), o.SeamlessTravelPostProcess.Init(o.Config, e => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:后处理资产加载(完成)]");
      var a = [];
      o.SeamlessTravelPostProcess.GetSeamlessTravelActors(a);
      for (const r of a) SeamlessTravelController.AddSeamlessTravelActor(r);
      o.PostProcessAssetLoadedPromise?.SetResult(e)
    })), o.Config?.SceneEffectDaPath && (o.SeamlessTravelSceneEffect = new SeamlessTravelSceneEffect_1.SeamlessTravelSceneEffect, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效资产加载(开始)]"), o.SeamlessTravelSceneEffect.Init(o.Config, e => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效资产加载(完成)]"), o.SceneEffectAssetLoadedPromise?.SetResult(e)
    })), ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(4, [12, 23]), this.ResumeTick(), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:开启无缝加载模式]"), !0
  }
  static HMl(e) {
    var a = ModelManager_1.ModelManager.SeamlessTravelModel,
      r = e.Entity.GetComponent(1);
    if (r?.Owner && !ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravelActor(r.Owner)) {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 4, "[无缝加载:添加保留实体", ["EntityId", e.Id]), SeamlessTravelController.AddSeamlessTravelActor(r.Owner), a.SeamlessTravelPlayerTeamHandles.push(e);
      var l = r.Owner.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass()),
        o = l.Num();
      for (let e = 0; e < o; ++e) {
        var s = l.Get(e);
        s instanceof UE.SkeletalMeshComponent && (s.PrimaryComponentTick.bStartWithTickEnabled = !1)
      }
      var r = r?.CreatureData.GetEntityType();
      r !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem && (r === Protocol_1.Aki.Protocol.kks.Proto_Monster ? (r = e.Entity.GetComponent(47), a.SeamlessTravelTeamDefaultController.push(r.TsAiController), SeamlessTravelController.AddSeamlessTravelActor(r.TsAiController)) : (r = e.Entity.GetComponent(3), a.SeamlessTravelTeamDefaultController.push(r.DefaultController), SeamlessTravelController.AddSeamlessTravelActor(r.DefaultController)))
    }
  }
  static AddSeamlessTravelActor(e) {
    ModelManager_1.ModelManager.SeamlessTravelModel.AddSeamlessTravelActor(e)
  }
  static async PreLeaveLevel() {
    if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
      const r = ModelManager_1.ModelManager.SeamlessTravelModel;
      var e, a;
      r?.IsSeamlessTravel && (r.Config?.EffectPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待屏幕特效资产加载(开始)]"), await r.EffectAssetLoadedPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待屏幕特效资产加载(完成)]"), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:屏幕特效展开(开始)]"), r.SeamlessTravelScreenEffect?.AppearEffect(e => {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:屏幕特效展开(完成)]"), r.ScreenEffectStartedPromise?.SetResult(e)
      })), r.Config?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待后处理资产加载(开始)]"), await r.PostProcessAssetLoadedPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待后处理资产加载(完成)]"), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:后处理混入(开始)]"), r.SeamlessTravelPostProcess?.AppearEffect(e => {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:后处理混入(完成)]"), r.PostProcessBlendedInPromise?.SetResult(e)
      })), r.UseTreadmill && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待地板资产加载(开始)]"), await r.MeshAssetLoadedPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待地板资产加载(完成)]"), SeamlessTravelController.AddSeamlessTravelActor(r.SeamlessTravelTreadmill.GetFloorActor()), e = r.SeamlessTravelPlayerEntityHandle.Entity.GetComponent(3), (a = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(e.ActorLocationProxy), a.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT, r.SeamlessTravelTreadmill.ResetLockOnLocation(a), e.TeleportAndFindStandLocation(a), CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(!1, !0), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板显形(开始)]"), r.SeamlessTravelTreadmill.AppearEffect(() => {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板显形(完成)]"), r.TransitionFloorLoadedPromise.SetResult(!0)
      })), r.UseKeepKite && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待风筝初始化(开始)]"), await r.KiteInitPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待风筝初始化(完成)]"), e = r.SeamlessTravelPlayerEntityHandle.Entity.GetComponent(3), (a = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(e.ActorLocationProxy), a.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT, e?.SetActorLocation(a.ToUeVector(), "[无缝加载]中间传送")), r.Config?.SceneEffectDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待场景特效资产加载(开始)]"), await r.SceneEffectAssetLoadedPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待场景特效资产加载(完成)]"), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效Start(开始)]"), r.SeamlessTravelSceneEffect?.AppearEffect(e => {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效Start(完成)]"), r.SceneEffectStartedPromise?.SetResult(e)
      })), await this.PreLeaveLevelWaitEnd(), Log_1.Log.CheckInfo()) && Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:PreLeaveLevel完成]")
    }
  }
  static async PreLeaveLevelWaitEnd() {
    if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
      var e = ModelManager_1.ModelManager.SeamlessTravelModel;
      if (e?.IsSeamlessTravel) {
        if (e.Config?.EffectPath) {
          Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待屏幕特效展开(开始)]"), await e.ScreenEffectStartedPromise.Promise;
          var a = [];
          e.SeamlessTravelScreenEffect.GetSeamlessTravelActors(a);
          for (const r of a) SeamlessTravelController.AddSeamlessTravelActor(r);
          Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待屏幕特效展开(完成)]")
        }
        if (e.Config?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待后处理混入(开始)]"), await e.PostProcessBlendedInPromise.Promise, Log_1.Log.CheckInfo()) && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待后处理混入(完成)]"), e.UseTreadmill && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待地板显形(开始)]"), await e.TransitionFloorLoadedPromise.Promise, Log_1.Log.CheckInfo()) && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待地板显形(完成)]"), e.Config?.SceneEffectDaPath) {
          Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待场景特效Start(开始)]"), await e.SceneEffectStartedPromise?.Promise;
          a = [];
          e.SeamlessTravelSceneEffect.GetSeamlessTravelActors(a);
          for (const l of a) SeamlessTravelController.AddSeamlessTravelActor(l);
          Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待场景特效Start(完成)]")
        }
      }
    }
  }
  static PostLeaveLevel() {
    ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel && Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:PostLeaveLevel完成]")
  }
  static PreOpenLevel() {
    return !0
  }
  static async PostOpenLevel() {
    var e = ModelManager_1.ModelManager.SeamlessTravelModel;
    return !!e.IsSeamlessTravel && (0 < e.Config.LeastTime && GlobalData_1.GlobalData.World.SetSeamlessTravelMidpointPause(!0), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:进入过渡场景(开始)]"), await e.EnterTransitionMapPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:进入过渡场景(完成)]"), 0 < e.Config.LeastTime && TimerSystem_1.TimerSystem.Delay(() => {
      GlobalData_1.GlobalData.World.SetSeamlessTravelMidpointPause(!1)
    }, e.Config.LeastTime * MathUtils_1.MathUtils.SecondToMillisecond), !0)
  }
  static PostLoadedLevel() {
    ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel && Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:PostLoadedLevel完成]")
  }
  static SetCurrentEntityAction(e) {
    var a, r, l;
    return !!ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel && !!Global_1.Global.BaseCharacter?.CharacterActorComponent && (r = Global_1.Global.BaseCharacter.CharacterActorComponent, (l = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(r.CreatureData.GetLocation()), a = (e = Rotator_1.Rotator.Create(e.BornRotation[0], e.BornRotation[2], e.BornRotation[1])).Yaw - r.ActorRotationProxy.Yaw, r.SetInputRotator(e), ModelManager_1.ModelManager.SeamlessTravelModel?.UseKeepMovementMode ? r.TeleportTo(l.ToUeVector(), e.ToUeRotator(), "[无缝加载SetCurrentEntityAction:传送玩家(不贴地修正)]") : (r.TeleportAndFindStandLocation(l), r.SetActorRotation(e.ToUeRotator(), "[无缝加载SetCurrentEntityAction:修正朝向]", !1)), l = Vector_1.Vector.Create(), Rotator_1.Rotator.Create(0, a, 0).Quaternion().RotateVector(r.ActorVelocityProxy, l), r.MoveComp.SetForceSpeed(l), e = CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation, r = MathUtils_1.MathUtils.WrapAngle(e.Yaw + a), l = new UE.Rotator(e.Pitch, r, e.Roll), CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(l), CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(!1, !0), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:修正到目标位置和朝向]"), !0)
  }
  static async EndSeamlessTravel() {
    const a = ModelManager_1.ModelManager.SeamlessTravelModel;
    a?.SeamlessTravelPlayerTeamHandles?.length ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:开始结束]"), ResourceSystem_1.ResourceSystem.SetForceLoadModeInGame(GlobalData_1.GlobalData.World, !1), a.Config?.EffectPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]屏幕特效结束(开始)"), a.SeamlessTravelScreenEffect?.DisappearEffect(e => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("SeamlessTravel", 50, "[无缝加载]屏幕特效结束(完成)"), a.ScreenEffectEndedPromise?.SetResult(!0)
    })), a.Config?.TransitionWeatherDaPath && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("SeamlessTravel", 39, "[无缝加载:后处理混出(开始)]"), a.SeamlessTravelPostProcess?.DisappearEffect(e => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("SeamlessTravel", 39, "[无缝加载:后处理混出(完成)]"), a.PostProcessBlendedOutPromise?.SetResult(e)
    })), a.Config?.SceneEffectDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效End(开始)]"), a.SeamlessTravelSceneEffect?.DisappearEffect(e => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效End(完成)]"), a.SceneEffectEndedPromise?.SetResult(e)
    })), await this.EndSeamlessTravelWaitEnd(), a.UseKeepKite && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("SeamlessTravel", 39, "[无缝加载:关闭风筝表现]"), a.SeamlessTravelKeepKite?.DisappearEffect()), a.UseKeepMovementMode && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("SeamlessTravel", 39, "[无缝加载:关闭运动模式保持]"), a.SeamlessTravelKeepMovementMode?.DisappearEffect()), this.FinishSeamlessTravel()) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("WorldLevel", 50, "[无缝加载]Finish找不到PlayerActor")
  }
  static async EndSeamlessTravelWaitEnd() {
    var e = ModelManager_1.ModelManager.SeamlessTravelModel;
    e.Config?.EffectPath && await e.ScreenEffectEndedPromise?.Promise, e.Config?.TransitionWeatherDaPath && await e.PostProcessBlendedOutPromise?.Promise, e.Config?.SceneEffectDaPath && await e.SceneEffectEndedPromise?.Promise
  }
  static FinishSeamlessTravel() {
    var e = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (e?.SeamlessTravelPlayerTeamHandles?.length) {
      for (const o of e.SeamlessTravelPlayerTeamHandles) {
        var a = (o.Entity?.GetComponent(3).Actor).K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass()),
          r = a.Num();
        for (let e = 0; e < r; ++e) {
          var l = a.Get(e);
          l instanceof UE.SkeletalMeshComponent && (l.PrimaryComponentTick.bStartWithTickEnabled = !0)
        }
      }
      e.SeamlessEndHandle = void 0, e.SeamlessTravelPlayerTeamHandles.length = 0, e.SeamlessTravelController.bUseSeamlessCameraActor = !1, e.SeamlessTravelController.SeamlessCameraActor = void 0, e.SeamlessTravelController = void 0, e.SeamlessTravelTeamDefaultController.length = 0, e.SeamlessTravelCamera = void 0, e.SeamlessTravelScreenEffect?.Destroy(), e.SeamlessTravelScreenEffect = void 0, e.SeamlessTravelTreadmill?.Destroy(), e.SeamlessTravelTreadmill = void 0, e.SeamlessTravelKeepKite?.Destroy(), e.SeamlessTravelKeepKite = void 0, e.SeamlessTravelKeepMovementMode?.Destroy(), e.SeamlessTravelKeepMovementMode = void 0, e.SeamlessTravelPostProcess?.Destroy(), e.SeamlessTravelPostProcess = void 0, e.SeamlessTravelSceneEffect?.Destroy(), e.SeamlessTravelSceneEffect = void 0, this.PauseTick(), e.Config = void 0, e.HasPreEnableSeamlessTravel = !1, e.ClearPromise(), e.ClearSeamlessTravelActor(), e.SeamlessTravelInputDistributeTags.length = 0, e.InSeamlessTraveling = !1, e.IsSeamlessTravel = !1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI), ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(4), InputDistributeController_1.InputDistributeController.RefreshInputTag(), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:完成]")
    } else Log_1.Log.CheckDebug() && Log_1.Log.Debug("WorldLevel", 50, "[无缝加载]Finish找不到PlayerActor")
  }
  static WasRoleEntityInSeamlessTraveling(e) {
    return !!e && !!ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel && !!(e = e.GetComponent(0)) && this.WasRoleInSeamlessTraveling(e.GetCreatureDataId())
  }
  static WasRoleInSeamlessTraveling(e) {
    var a = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (a?.IsSeamlessTravel)
      for (const r of a.SeamlessTravelPlayerTeamHandles)
        if (r.Valid) {
          if (r.Entity.GetComponent(0).GetCreatureDataId() === e) return !0
        } else Log_1.Log.CheckError() && Log_1.Log.Error("SeamlessTravel", 4, "[无缝加载:需要保留的实体被删除！]", ["EntityId", r.Id]);
    return !1
  }
}(exports.SeamlessTravelController = SeamlessTravelController).qea = () => {
  var e = ModelManager_1.ModelManager.SeamlessTravelModel;
  e.IsSeamlessTravel && e.EnterTransitionMapPromise?.SetResult(!0)
}, SeamlessTravelController.Gea = () => {
  const e = ModelManager_1.ModelManager.SeamlessTravelModel;
  var a, r;
  e.IsSeamlessTravel && (e.EnterDestinationMapPromise?.SetResult(!0), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]进入目标地图并重新设置位置"), a = Global_1.Global.BaseCharacter?.CharacterActorComponent) && e.UseTreadmill && ((r = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(a.CreatureData.GetLocation()), r.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT, e.SeamlessTravelTreadmill.ResetLockOnLocation(r), a.TeleportAndFindStandLocation(MathUtils_1.MathUtils.CommonTempVector), CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(!1, !0), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板隐形(开始)]"), e.SeamlessTravelTreadmill.DisappearEffect(() => {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板隐形(完成)]"), e.TransitionFloorUnloadedPromise.SetResult(!0)
  }))
};
//# sourceMappingURL=SeamlessTravelController.js.map