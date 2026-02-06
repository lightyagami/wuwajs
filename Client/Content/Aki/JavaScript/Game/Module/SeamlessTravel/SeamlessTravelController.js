"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const LoadModeManager_1 = require("../../../Core/Performance/LoadMode/LoadModeManager");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const CustomMovementDefine_1 = require("../../NewWorld/Character/Common/Component/Move/CustomMovementDefine");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const WorldGlobal_1 = require("../../World/WorldGlobal");
const SeamlessTravelKeepKite_1 = require("./SeamlessTravelKeepKite");
const SeamlessTravelKeepMovementMode_1 = require("./SeamlessTravelKeepMovementMode");
const SeamlessTravelPostProcess_1 = require("./SeamlessTravelPostProcess");
const SeamlessTravelSceneEffect_1 = require("./SeamlessTravelSceneEffect");
const SeamlessTravelScreenEffect_1 = require("./SeamlessTravelScreenEffect");
const SeamlessTravelTreadmill_1 = require("./SeamlessTravelTreadmill");
class SeamlessTravelController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterTransitionMap, this.qea);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EndTravelMap, this.Gea);
    this.PauseTick();
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterTransitionMap, this.qea);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EndTravelMap, this.Gea);
    return true;
  }
  static OnTick(e) {
    if (ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelTreadmill) {
      ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelTreadmill.Tick(e);
    }
    if (ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelKeepKite) {
      ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelKeepKite.Tick(e);
    }
    if (ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelKeepMovementMode) {
      ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelKeepMovementMode.Tick(e);
    }
    if (ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelPostProcess) {
      ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelPostProcess.Tick(e);
    }
  }
  static StartTravel(e) {
    var a;
    if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
      if ((a = ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessTravelController)?.IsValid()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:开始]");
        }
        LoadModeManager_1.LoadModeManager.SetLoadModeByReason("ForceInGame", "SeamlessTravel");
        ModelManager_1.ModelManager.SeamlessTravelModel.InSeamlessTraveling = true;
        if (ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle) {
          TimerSystem_1.TimerSystem.Remove(ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle);
          ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle = undefined;
        }
        WorldGlobal_1.WorldGlobal.PlayerClientTravel(a, e);
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SeamlessTravel", 29, "[无缝加载:失败]PlayerController无效");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SeamlessTravel", 29, "[无缝加载:失败]未开启无缝加载模式");
      }
      return false;
    }
  }
  static async EnableSeamlessTravel(e, a = false) {
    var r = Global_1.Global.CharacterController;
    if (!r?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SeamlessTravel", 29, "[开启无缝加载:失败]PlayerController无效");
      }
      return false;
    }
    if (ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待当前正在加载的编队(开始)]"), await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待当前正在加载的编队(完成)]");
    }
    const l = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (a) {
      l.HasPreEnableSeamlessTravel = true;
    } else if (l.HasPreEnableSeamlessTravel) {
      return true;
    }
    l.Config = e;
    l.CreatePromise();
    l.IsSeamlessTravel = true;
    l.SeamlessTravelPlayerEntityHandle = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      this.HMl(i);
      var o = i.Entity.GetComponent(0);
      o.VisionServerEntityIds.forEach(e => {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
        if (e) {
          this.HMl(e);
        }
      });
      var s = o.CustomServerEntityIds;
      if (s.length > 0) {
        s.forEach(e => {
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
          if (e) {
            this.HMl(e);
          }
        });
      }
      if (o.VisionControlCreatureDataId && (s = ModelManager_1.ModelManager.CreatureModel.GetEntity(o.VisionControlCreatureDataId))) {
        this.HMl(s);
      }
    }
    l.SeamlessTravelController = r;
    var a = CameraController_1.CameraController.FightCamera.LogicComponent.CameraActor;
    r.bUseSeamlessCameraActor = true;
    r.SeamlessCameraActor = a;
    SeamlessTravelController.AddSeamlessTravelActor(a);
    l.SeamlessTravelCamera = a;
    l.SeamlessTravelInputDistributeTags.length = 0;
    var r = ModelManager_1.ModelManager.InputDistributeModel?.IsAllowFightMoveInput();
    var a = ModelManager_1.ModelManager.InputDistributeModel?.IsAllowFightCameraRotationInput();
    var t = ModelManager_1.ModelManager.InputDistributeModel?.IsAllowFightCameraZoomInput();
    if (r || a || t) {
      if (r) {
        l.SeamlessTravelInputDistributeTags.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag);
      }
      if (a) {
        l.SeamlessTravelInputDistributeTags.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraRotationTag);
      }
      if (t) {
        l.SeamlessTravelInputDistributeTags.push(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraZoomTag);
      }
    } else {
      l.SeamlessTravelInputDistributeTags.push(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag);
    }
    var r = l.SeamlessTravelPlayerEntityHandle?.Entity;
    l.UseTreadmill = false;
    l.UseKeepKite = false;
    l.UseKeepMovementMode = false;
    let _ = undefined;
    let n = undefined;
    if (r?.Valid) {
      if (e.KeepMovementStateFeatures?.KeepKite && (a = r?.GetComponent(107))?.GetIsHooking() && a.GetCurrentTarget()?.GetHookInteractType() === "KiteHook") {
        l.UseKeepKite = true;
      }
      if (l.UseKeepKite) {
        l.UseKeepMovementMode = true;
        _ = 6;
        n = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE;
      } else if (e.KeepMovementStateFeatures && (t = SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode.GetCurrentKeepableMovementMode(e))) {
        l.UseKeepMovementMode = true;
        _ = t[0];
        n = t[1];
      }
      if (l.UseKeepMovementMode) {
        l.UseTreadmill = false;
      } else {
        l.UseTreadmill = true;
      }
    }
    if (l.UseTreadmill) {
      l.SeamlessTravelTreadmill = new SeamlessTravelTreadmill_1.SeamlessTravelTreadmill();
      l.SeamlessTravelTreadmill.Init(e, e => {
        l.MeshAssetLoadedPromise?.SetResult(e);
      });
    }
    if (l.UseKeepMovementMode) {
      l.SeamlessTravelKeepMovementMode = new SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode();
      l.SeamlessTravelKeepMovementMode.SetInitDataWithTargetMode(_, n);
      l.SeamlessTravelKeepMovementMode?.Init(e, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:保持运动状态开始]");
        }
        l.SeamlessTravelKeepMovementMode?.AppearEffect();
      });
    }
    if (l.UseKeepKite) {
      if ((a = r?.GetComponent(107)?.GetCurrentTargetEntity()?.Entity)?.Valid && r?.Valid) {
        l.SeamlessTravelKeepKite = new SeamlessTravelKeepKite_1.SeamlessTravelKeepKite();
        l.SeamlessTravelKeepKite.SetInitData(a, r);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:风筝资产加载(开始)]");
        }
        l.SeamlessTravelKeepKite.Init(e, e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:风筝资产加载(完成)]");
          }
          var a = [];
          l.SeamlessTravelKeepKite.GetSeamlessTravelActors(a);
          for (const r of a) {
            SeamlessTravelController.AddSeamlessTravelActor(r);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]伪风筝显形");
          }
          l.SeamlessTravelKeepKite?.AppearEffect();
          l.SeamlessTravelKeepMovementMode?.CheckAndKeepMoveState();
          l.KiteInitPromise?.SetResult(e);
        });
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "风筝表现失败，关联实体出错", ["HookTargetEntityValid", !!a?.Valid], ["TargetEntityValid", !!r?.Valid]);
        }
        l.UseKeepKite = false;
      }
    }
    if (e?.EffectPath) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:屏幕特效资产加载(开始)]");
      }
      l.SeamlessTravelScreenEffect = new SeamlessTravelScreenEffect_1.SeamlessTravelScreenEffect();
      l.SeamlessTravelScreenEffect.Init(e, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:屏幕特效资产加载(完成)]");
        }
        l.EffectAssetLoadedPromise?.SetResult(e);
      });
    }
    if (l.Config?.TransitionWeatherDaPath) {
      l.SeamlessTravelPostProcess = new SeamlessTravelPostProcess_1.SeamlessTravelPostProcess();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:后处理资产加载(开始)]");
      }
      l.SeamlessTravelPostProcess.Init(l.Config, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:后处理资产加载(完成)]");
        }
        var a = [];
        l.SeamlessTravelPostProcess.GetSeamlessTravelActors(a);
        for (const r of a) {
          SeamlessTravelController.AddSeamlessTravelActor(r);
        }
        l.PostProcessAssetLoadedPromise?.SetResult(e);
      });
    }
    if (l.Config?.SceneEffectDaPath) {
      l.SeamlessTravelSceneEffect = new SeamlessTravelSceneEffect_1.SeamlessTravelSceneEffect();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效资产加载(开始)]");
      }
      l.SeamlessTravelSceneEffect.Init(l.Config, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效资产加载(完成)]");
        }
        l.SceneEffectAssetLoadedPromise?.SetResult(e);
      });
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(4, [12, 23]);
    this.ResumeTick();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:开启无缝加载模式]");
    }
    return true;
  }
  static HMl(e) {
    var a = ModelManager_1.ModelManager.SeamlessTravelModel;
    var r = e.Entity.GetComponent(1);
    if (r?.Owner && !ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravelActor(r.Owner)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 4, "[无缝加载:添加保留实体", ["EntityId", e.Id]);
      }
      SeamlessTravelController.AddSeamlessTravelActor(r.Owner);
      a.SeamlessTravelPlayerTeamHandles.push(e);
      var l = r.Owner.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      var o = l.Num();
      for (let e = 0; e < o; ++e) {
        var s = l.Get(e);
        if (s instanceof UE.SkeletalMeshComponent) {
          s.PrimaryComponentTick.bStartWithTickEnabled = false;
        }
      }
      var r = r?.CreatureData.GetEntityType();
      if (r !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
        if (r === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
          r = e.Entity.GetComponent(50);
          a.SeamlessTravelTeamDefaultController.push(r.TsAiController);
          SeamlessTravelController.AddSeamlessTravelActor(r.TsAiController);
        } else {
          r = e.Entity.GetComponent(3);
          a.SeamlessTravelTeamDefaultController.push(r.DefaultController);
          SeamlessTravelController.AddSeamlessTravelActor(r.DefaultController);
        }
      }
    }
  }
  static AddSeamlessTravelActor(e) {
    ModelManager_1.ModelManager.SeamlessTravelModel.AddSeamlessTravelActor(e);
  }
  static async PreLeaveLevel() {
    const a = ModelManager_1.ModelManager.SeamlessTravelModel;
    var e;
    var r;
    if (a?.IsSeamlessTravel && (a.Config?.EffectPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待屏幕特效资产加载(开始)]"), await a.EffectAssetLoadedPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待屏幕特效资产加载(完成)]"), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:屏幕特效展开(开始)]"), a.SeamlessTravelScreenEffect?.AppearEffect(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:屏幕特效展开(完成)]");
      }
      a.ScreenEffectStartedPromise?.SetResult(e);
    })), a.Config?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待后处理资产加载(开始)]"), await a.PostProcessAssetLoadedPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待后处理资产加载(完成)]"), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:后处理混入(开始)]"), a.SeamlessTravelPostProcess?.AppearEffect(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:后处理混入(完成)]");
      }
      a.PostProcessBlendedInPromise?.SetResult(e);
    })), a.UseTreadmill && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待地板资产加载(开始)]"), await a.MeshAssetLoadedPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待地板资产加载(完成)]"), SeamlessTravelController.AddSeamlessTravelActor(a.SeamlessTravelTreadmill.GetFloorActor()), e = a.SeamlessTravelPlayerEntityHandle.Entity.GetComponent(3), (r = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(e.ActorLocationProxy), a.Config?.IsTeleportInPlace || (r.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT), a.SeamlessTravelTreadmill.ResetLockOnLocation(r), e.TeleportAndFindStandLocation(r), CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(false, true), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板显形(开始)]"), a.SeamlessTravelTreadmill.AppearEffect(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板显形(完成)]");
      }
      a.TransitionFloorLoadedPromise.SetResult(true);
    })), a.UseKeepKite && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待风筝初始化(开始)]"), await a.KiteInitPromise.Promise, Log_1.Log.CheckInfo()) && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待风筝初始化(完成)]"), a.Config?.SceneEffectDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待场景特效资产加载(开始)]"), await a.SceneEffectAssetLoadedPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待场景特效资产加载(完成)]"), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效Start(开始)]"), a.SeamlessTravelSceneEffect?.AppearEffect(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效Start(完成)]");
      }
      a.SceneEffectStartedPromise?.SetResult(e);
    })), await this.PreLeaveLevelWaitEnd(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:PreLeaveLevel完成]");
    }
  }
  static async PreLeaveLevelWaitEnd() {
    if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
      var e = ModelManager_1.ModelManager.SeamlessTravelModel;
      if (e?.IsSeamlessTravel) {
        if (e.Config?.EffectPath) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待屏幕特效展开(开始)]");
          }
          await e.ScreenEffectStartedPromise.Promise;
          var a = [];
          e.SeamlessTravelScreenEffect.GetSeamlessTravelActors(a);
          for (const r of a) {
            SeamlessTravelController.AddSeamlessTravelActor(r);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待屏幕特效展开(完成)]");
          }
        }
        if (e.Config?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待后处理混入(开始)]"), await e.PostProcessBlendedInPromise.Promise, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:等待后处理混入(完成)]");
        }
        if (e.UseTreadmill && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待地板显形(开始)]"), await e.TransitionFloorLoadedPromise.Promise, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待地板显形(完成)]");
        }
        if (e.Config?.SceneEffectDaPath) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待场景特效Start(开始)]");
          }
          await e.SceneEffectStartedPromise?.Promise;
          a = [];
          e.SeamlessTravelSceneEffect.GetSeamlessTravelActors(a);
          for (const l of a) {
            SeamlessTravelController.AddSeamlessTravelActor(l);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:等待场景特效Start(完成)]");
          }
        }
      }
    }
  }
  static PostLeaveLevel() {
    if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:PostLeaveLevel完成]");
    }
  }
  static PreOpenLevel() {
    return true;
  }
  static async PostOpenLevel() {
    var e = ModelManager_1.ModelManager.SeamlessTravelModel;
    return !!e.IsSeamlessTravel && (e.Config.LeastTime > 0 && GlobalData_1.GlobalData.World.SetSeamlessTravelMidpointPause(true), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:进入过渡场景(开始)]"), await e.EnterTransitionMapPromise.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:进入过渡场景(完成)]"), e.Config.LeastTime > 0 && TimerSystem_1.TimerSystem.Delay(() => {
      GlobalData_1.GlobalData.World.SetSeamlessTravelMidpointPause(false);
    }, e.Config.LeastTime * MathUtils_1.MathUtils.SecondToMillisecond), true);
  }
  static PostLoadedLevel() {
    if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:PostLoadedLevel完成]");
    }
  }
  static SetCurrentEntityAction(e) {
    var a;
    var r;
    var l;
    return !!ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel && !!Global_1.Global.BaseCharacter?.CharacterActorComponent && (r = Global_1.Global.BaseCharacter.CharacterActorComponent, (l = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(r.CreatureData.GetLocation()), a = (e = Rotator_1.Rotator.Create(e.BornRotation[0], e.BornRotation[2], e.BornRotation[1])).Yaw - r.ActorRotationProxy.Yaw, r.SetInputRotator(e), ModelManager_1.ModelManager.SeamlessTravelModel?.UseKeepMovementMode ? r.TeleportTo(l.ToUeVector(), e.ToUeRotator(), "[无缝加载SetCurrentEntityAction:传送玩家(不贴地修正)]") : (r.TeleportAndFindStandLocation(l), r.SetActorRotation(e.ToUeRotator(), "[无缝加载SetCurrentEntityAction:修正朝向]", false)), l = Vector_1.Vector.Create(), Rotator_1.Rotator.Create(0, a, 0).Quaternion().RotateVector(r.ActorVelocityProxy, l), r.MoveComp.SetForceSpeed(l), e = CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation, r = MathUtils_1.MathUtils.WrapAngle(e.Yaw + a), l = new UE.Rotator(e.Pitch, r, e.Roll), CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(l), CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(false, true), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:修正到目标位置和朝向]"), true);
  }
  static async EndSeamlessTravel() {
    const a = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (a?.SeamlessTravelPlayerTeamHandles?.length) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:开始结束]");
      }
      LoadModeManager_1.LoadModeManager.ResetLoadModeByReason("SeamlessTravel");
      if (a.Config?.EffectPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]屏幕特效结束(开始)");
        }
        a.SeamlessTravelScreenEffect?.DisappearEffect(e => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SeamlessTravel", 50, "[无缝加载]屏幕特效结束(完成)");
          }
          a.ScreenEffectEndedPromise?.SetResult(true);
        });
      }
      if (a.Config?.TransitionWeatherDaPath) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SeamlessTravel", 39, "[无缝加载:后处理混出(开始)]");
        }
        a.SeamlessTravelPostProcess?.DisappearEffect(e => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SeamlessTravel", 39, "[无缝加载:后处理混出(完成)]");
          }
          a.PostProcessBlendedOutPromise?.SetResult(e);
        });
      }
      if (a.Config?.SceneEffectDaPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效End(开始)]");
        }
        a.SeamlessTravelSceneEffect?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 39, "[无缝加载:场景特效End(完成)]");
          }
          a.SceneEffectEndedPromise?.SetResult(e);
        });
      }
      await this.EndSeamlessTravelWaitEnd();
      if (a.UseKeepKite) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SeamlessTravel", 39, "[无缝加载:关闭风筝表现]");
        }
        a.SeamlessTravelKeepKite?.DisappearEffect();
      }
      if (a.UseKeepMovementMode) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SeamlessTravel", 39, "[无缝加载:关闭运动模式保持]");
        }
        a.SeamlessTravelKeepMovementMode?.DisappearEffect();
      }
      this.FinishSeamlessTravel();
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("WorldLevel", 50, "[无缝加载]Finish找不到PlayerActor");
    }
  }
  static async EndSeamlessTravelWaitEnd() {
    var e = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (e.Config?.EffectPath) {
      await e.ScreenEffectEndedPromise?.Promise;
    }
    if (e.Config?.TransitionWeatherDaPath) {
      await e.PostProcessBlendedOutPromise?.Promise;
    }
    if (e.Config?.SceneEffectDaPath) {
      await e.SceneEffectEndedPromise?.Promise;
    }
  }
  static FinishSeamlessTravel() {
    var e = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (e?.SeamlessTravelPlayerTeamHandles?.length) {
      for (const o of e.SeamlessTravelPlayerTeamHandles) {
        var a = (o.Entity?.GetComponent(3).Actor).K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
        var r = a.Num();
        for (let e = 0; e < r; ++e) {
          var l = a.Get(e);
          if (l instanceof UE.SkeletalMeshComponent) {
            l.PrimaryComponentTick.bStartWithTickEnabled = true;
          }
        }
      }
      e.SeamlessEndHandle = undefined;
      e.SeamlessTravelPlayerTeamHandles.length = 0;
      e.SeamlessTravelController.bUseSeamlessCameraActor = false;
      e.SeamlessTravelController.SeamlessCameraActor = undefined;
      e.SeamlessTravelController = undefined;
      e.SeamlessTravelTeamDefaultController.length = 0;
      e.SeamlessTravelCamera = undefined;
      e.SeamlessTravelScreenEffect?.Destroy();
      e.SeamlessTravelScreenEffect = undefined;
      e.SeamlessTravelTreadmill?.Destroy();
      e.SeamlessTravelTreadmill = undefined;
      e.SeamlessTravelKeepKite?.Destroy();
      e.SeamlessTravelKeepKite = undefined;
      e.SeamlessTravelKeepMovementMode?.Destroy();
      e.SeamlessTravelKeepMovementMode = undefined;
      e.SeamlessTravelPostProcess?.Destroy();
      e.SeamlessTravelPostProcess = undefined;
      e.SeamlessTravelSceneEffect?.Destroy();
      e.SeamlessTravelSceneEffect = undefined;
      this.PauseTick();
      e.Config = undefined;
      e.HasPreEnableSeamlessTravel = false;
      e.ClearPromise();
      e.ClearSeamlessTravelActor();
      e.SeamlessTravelInputDistributeTags.length = 0;
      e.InSeamlessTraveling = false;
      e.IsSeamlessTravel = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeamlessTravelUIRefresh);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(4);
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:完成]");
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("WorldLevel", 50, "[无缝加载]Finish找不到PlayerActor");
    }
  }
  static WasRoleEntityInSeamlessTraveling(e) {
    return !!e && !!ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel && !!(e = e.GetComponent(0)) && this.WasRoleInSeamlessTraveling(e.GetCreatureDataId());
  }
  static WasRoleInSeamlessTraveling(e) {
    var a = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (a?.IsSeamlessTravel) {
      for (const r of a.SeamlessTravelPlayerTeamHandles) {
        if (r.Valid) {
          if (r.Entity.GetComponent(0).GetCreatureDataId() === e) {
            return true;
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SeamlessTravel", 4, "[无缝加载:需要保留的实体被删除！]", ["EntityId", r.Id]);
        }
      }
    }
    return false;
  }
  static SeamlessTravelingRefreshData(e) {
    e.GetComponent(184)?.SeamlessTravelingRefresh();
    e.GetComponent(222)?.SeamlessTravelingRefresh();
  }
}
(exports.SeamlessTravelController = SeamlessTravelController).qea = () => {
  var e = ModelManager_1.ModelManager.SeamlessTravelModel;
  if (e.IsSeamlessTravel) {
    e.EnterTransitionMapPromise?.SetResult(true);
  }
};
SeamlessTravelController.Gea = () => {
  const e = ModelManager_1.ModelManager.SeamlessTravelModel;
  var a;
  var r;
  if (e.IsSeamlessTravel && (e.EnterDestinationMapPromise?.SetResult(true), Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]进入目标地图并重新设置位置"), a = Global_1.Global.BaseCharacter?.CharacterActorComponent) && e.UseTreadmill) {
    (r = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(a.CreatureData.GetLocation());
    if (!e.Config?.IsTeleportInPlace) {
      r.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT;
    }
    e.SeamlessTravelTreadmill.ResetLockOnLocation(r);
    a.TeleportAndFindStandLocation(MathUtils_1.MathUtils.CommonTempVector);
    CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(false, true);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板隐形(开始)]");
    }
    e.SeamlessTravelTreadmill.DisappearEffect(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板隐形(完成)]");
      }
      e.TransitionFloorUnloadedPromise.SetResult(true);
    });
  }
}; //# sourceMappingURL=SeamlessTravelController.js.map