"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographController = exports.ENTITYCAMERA = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const FormationDataController_1 = require("../Abilities/FormationDataController");
const ActivityControllerHolder_1 = require("../Activity/ActivityControllerHolder");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const EntityPhotoBehaviorNode_1 = require("../GeneralLogicTree/BehaviorNode/ChildQuestNode/EntityPhotoBehaviorNode");
const TakePicturesWithTimeScaleChildQuestNode_1 = require("../GeneralLogicTree/BehaviorNode/ChildQuestNode/TakePicturesWithTimeScaleChildQuestNode");
const SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const SeamlessTravelController_1 = require("../SeamlessTravel/SeamlessTravelController");
const SeamlessTravelDefine_1 = require("../SeamlessTravel/SeamlessTravelDefine");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const RangeCheck_1 = require("../Util/RangeCheck");
const PhotographDefine_1 = require("./PhotographDefine");
const TsPhotographer_1 = require("./TsPhotographer");
exports.ENTITYCAMERA = 70140001;
class PhotoMission {
  constructor(t, e, o, i, r, a) {
    this.Node = undefined;
    this.ItsMissionType = undefined;
    this.IsFinished = false;
    this.EntityId = undefined;
    this.Description = "";
    this.IsOptional = false;
    this.IsOptionalFinished = undefined;
    this.Node = t;
    this.ItsMissionType = e;
    this.IsFinished = o;
    this.EntityId = i;
    this.Description = r;
    this.IsOptional = a;
    if (this.IsOptional) {
      this.IsOptionalFinished = false;
    }
  }
}
class PhotoThing {
  constructor(t, e, o) {
    this.BehaviorNode = undefined;
    this.PhotoMissions = undefined;
    this.Type = undefined;
    this.BehaviorNode = t;
    this.PhotoMissions = e;
    this.Type = o;
  }
}
class PhotographController extends UiControllerBase_1.UiControllerBase {
  static GetIsLineTraceBlock() {
    return this.tdu;
  }
  static SetIsLineTraceBlock(t) {
    this.tdu = t;
  }
  static HFa(t) {
    if (this.b1n = t) {
      this.URe(661863530);
    } else {
      this.ARe(661863530);
    }
  }
  static jFa(t) {
    if (this.WFa = t) {
      this.URe(-119194461);
    } else {
      this.ARe(-119194461);
    }
  }
  static Init() {
    var t = super.Init();
    this.uWi = new RangeCheck_1.RangeCheck();
    this.CameraCaptureType = 0;
    this.Missions = new Array();
    this.IsLastChecked = false;
    this.AMa = false;
    this.XTn = false;
    this.cWi = false;
    if (!this.mWi) {
      this.mWi = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.mWi.bIsSingle = false;
      this.mWi.bIgnoreSelf = true;
      this.mWi.bIsProfile = false;
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
      this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PhysicsBody);
      this.mWi.SetDrawDebugTrace(0);
      this.mWi.SetTraceColor(1, 0, 0, 1);
      this.mWi.SetTraceHitColor(0, 1, 0, 1);
    }
    this.MinFov = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("Photo.EntityCameraFovRangeMin");
    this.MaxFov = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("Photo.EntityCameraFovRangeMax");
    this.SetIsLineTraceBlock(false);
    return t;
  }
  static Clear() {
    this.ResetPhotograph();
    this.Missions = undefined;
    this.IsLastChecked = false;
    this.AMa = false;
    this.cWi = false;
    this.XTn = false;
    this.mWi = undefined;
    this.uWi?.OnClear();
    this.uWi = undefined;
    this.UMa = false;
    this.PhotoMissionFinishMap.clear();
    this.xMa.clear();
    this.wh1 = undefined;
    this.SetIsLineTraceBlock(false);
    return super.Clear();
  }
  static OnLeaveLevel() {
    this.ResetPhotograph();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.$Ct);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.Gre);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck, this.CWi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, this.gWi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSpecialItemNotAllow, this.pWi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpawnPlayer, this.QFa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.nye);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveForward, this.vWi);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.MWi);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.$Ct);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck, this.CWi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.Gre);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, this.gWi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSpecialItemNotAllow, this.pWi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SpawnPlayer, this.QFa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.nye);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveForward, this.vWi);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.MWi);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
    this.m$e();
  }
  static OnTick(t) {
    if (this.cWi) {
      if (this.PMa()) {
        this.AMa = SpecialItemController_1.SpecialItemController.EquipSpecialItem(exports.ENTITYCAMERA, true);
      }
      this.jFa(ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn && ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() === exports.ENTITYCAMERA && this.b1n);
    }
    var o = ModelManager_1.ModelManager.PhotographModel;
    var e = o.GetPhotographerStructure();
    if (e && this.EWi) {
      var i = o.RightValue;
      if (i !== 0) {
        e.MoveRight(i);
      }
      var i = o.UpValue;
      if (i !== 0) {
        e.MoveUp(i);
      }
      if (UiManager_1.UiManager.IsViewShow("PhotographView") && this.XTn && this.CameraCaptureType === 1) {
        o = this.GetNowBehaviorNodes();
        if (o && !(o.length <= 0)) {
          let e = 0;
          o.forEach(t => {
            if (t) {
              if (this.wMa(t)) {
                e++;
                if (!this.PhotoMissionFinishMap.get(t.TakePlace.RangeEntity)) {
                  this.PhotoMissionFinishMap.set(t.TakePlace.RangeEntity, true);
                  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityCameraSearchGreat);
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("Photo", 45, "拍照:实体相机拍摄所有检查条件都符合", ["id", t.TakePlace?.RangeEntity]);
                  }
                }
                this.IsLastChecked = true;
              } else if (t.TakePlace?.RangeEntity) {
                this.PhotoMissionFinishMap.set(t.TakePlace?.RangeEntity, false);
              }
            }
          });
          if (e === 0) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityCameraMissTarget);
            this.IsLastChecked = false;
          }
        }
      }
    }
  }
  static V01() {
    if (this.NMa()) {
      this.AMa = false;
      this.cWi = true;
      this.UMa = true;
    } else {
      this.UMa = false;
      this.cWi = false;
      this.HFa(false);
      this.jFa(false);
    }
  }
  static PhotographFastScreenShot(t = 0) {
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid) {
      this.CameraCaptureType = t;
      this.ScreenShot({
        ScreenShot: true,
        PrepareFullScreenShot: false,
        IsHiddenBattleView: true,
        HandBookPhotoData: undefined,
        GachaData: undefined,
        FragmentMemory: undefined,
        RoleSkinData: undefined
      });
    }
  }
  static CouldRequestPhotoPermission() {
    return TimeUtil_1.TimeUtil.GetServerTime() > LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.RequestPhotoPermissionMinTime, 0);
  }
  static TryOpenPhotograph(t) {
    return !!this.$ha(t) && (t === 3 ? this.Qyd(t) : this.c7t(t), true);
  }
  static async TryOpenTogetherPhotograph() {
    return !!this.$ha(2) && (await this.c7t(2), true);
  }
  static $ha(t) {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !!e?.Valid && !(ModelManager_1.ModelManager.PlotModel.IsInPlot ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:在剧情中"), 1) : t !== 3 && !this.mKa() || (t !== 1 || UiManager_1.UiManager.IsViewOpen(UiModel_1.UiModel.MainViewName) ? UiManager_1.UiManager.IsViewOpen("PhotographView") ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:已经在拍照界面"), 1) : ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:在声骸编队"), 1) : !e.Entity.GetComponent(178)?.MainAnimInstance && (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:实体状态机找不到"), 1) : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:不在BattleView中"), 1)));
  }
  static mKa() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(206);
    return !!t && !(t.HasTag(40422668) ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:在空中"), 1) : t.HasTag(855966206) ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:在水中"), 1) : t.HasTag(504239013) ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:在攀爬"), 1) : t.HasTag(1996802261) ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:在战斗中"), 1) : t.HasTag(-1371021686) ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:在技能中"), 1) : t.HasTag(525255941) && (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "无法拍照:在驾驶载具"), 1));
  }
  static BMa(t, e, o) {
    return e.GetDungeonId() === ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id && (this.GMa(t) ? (this.xMa.has(t) ? this.xMa.get(t)?.BehaviorNode !== e && (this.xMa.set(t, new PhotoThing(e, this.SWi(e), o)), this.PhotoMissionFinishMap.set(t, false), Log_1.Log.CheckInfo()) && Log_1.Log.Info("Photo", 45, "拍照:重进了拍照范围", ["OldBehaviorTree", this.xMa.get(t)?.BehaviorNode?.NodeId], ["NewBehaviorTree", e?.NodeId]) : (this.xMa.set(t, new PhotoThing(e, this.SWi(e), o)), this.PhotoMissionFinishMap.set(t, false)), true) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "拍照:UpdateNewRangeCheckById失败"), false));
  }
  static qMa(o, i) {
    let r = 0;
    this.xMa.forEach((t, e) => {
      if (t.Type === i && !o.includes(e)) {
        r = e;
      }
    });
    if (r !== 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Photo", 45, "拍照:RemovePhotoEntityThings", ["id", r]);
      }
      this.xMa.delete(r);
      this.PhotoMissionFinishMap.delete(r);
      this.uWi?.Remove(r);
    }
  }
  static InitPhotographRelativeContent() {
    var t;
    var e;
    var o;
    var i;
    this.EWi = this.yWi();
    if (this.EWi && (this.IWi = this.GetFightCameraActor(), this.IWi)) {
      this.TWi = this.LWi();
      (t = this.DWi()).SetIsDitherEffectEnable(false);
      (e = Global_1.Global.BaseCharacter)?.SetDitherEffect(1, 1);
      e = e?.Mesh.D_GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName("CameraPosition"));
      i = ModelManager_1.ModelManager.PhotographModel;
      o = this.IWi.D_GetTransform();
      i = i.SpawnPhotographerStructure(e, o.GetRotation(), o.GetScale3D(), o.GetLocation());
      if (this.CheckIfInFightPhotographCamera()) {
        i.SetCameraInitializeFov(t.Fov);
        this.SetTargetActorAndSkeletalMesh();
        this.InitFightPhotoTask();
      }
      this.TWi.FocusSettings.ManualFocusDistance = PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE;
      i?.SetPlayerSourceLocation(e);
      i?.SetCameraInitializeTransform(o);
      if (this.CameraCaptureType === 2) {
        i?.ResetCamera();
      }
      UiCameraManager_1.UiCameraManager.Get().Enter(0.5);
      this.InitializeDefaultPhotographOption();
    }
  }
  static async c7t(t) {
    const e = new CustomPromise_1.CustomPromise();
    const o = t => {
      e.SetResult(t);
    };
    this.EWi = this.yWi();
    if (this.EWi) {
      this.IWi = this.GetFightCameraActor();
      if (this.IWi) {
        this.js1();
        this.c$e();
        ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph = true;
        this.CameraCaptureType = t;
        this.SetIsLineTraceBlock(false);
        await this.OMa();
        UiManager_1.UiManager.OpenView("PhotographView", undefined, t => {
          if (t) {
            o(true);
          } else {
            o(false);
          }
        });
      } else {
        o(false);
      }
    } else {
      o(false);
    }
    return e.Promise;
  }
  static Qyd(t) {
    this.EWi = this.yWi();
    if (this.EWi && (this.IWi = this.GetFightCameraActor(), this.IWi)) {
      this.js1();
      this.c$e();
      ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph = true;
      this.CameraCaptureType = t;
      this.SetIsLineTraceBlock(false);
      if (t === 3) {
        UiManager_1.UiManager.OpenView("FightPhotographView");
      } else {
        UiManager_1.UiManager.OpenView("PhotographView");
      }
    }
  }
  static js1() {
    if (Global_1.Global.BaseCharacter) {
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(62)?.InterruptAutoMoving("打开拍照界面");
    }
  }
  static async OMa() {
    this.XTn = false;
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(11, 3, 0.5);
    await this.AsyncLoadIgnoreBp();
  }
  static async CloseBlackScreen() {
    await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(11, 0.5);
    LevelLoadingController_1.LevelLoadingController.CloseLoading(0);
    this.XTn = true;
  }
  static async AsyncLoadIgnoreBp() {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("NinjaLive_C", () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Photo", 45, "拍照:NinjaLive_C加载完成");
      }
      t.SetResult();
    });
    await t.Promise;
  }
  static PMa() {
    var t;
    return !!ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid && (!(t = this.uWi?.MapCheckReached()) || t.length <= 0 ? (this.HFa(false), this.AMa = false) : (!this.AMa || !this.Ah1(t, this.Ph1)) && !(this.Ph1 = t, this.xh1(), this.HFa(true), this.UpdatePhotoWindow(t), Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 45, "拍照:成功检测在范围里"), 0));
  }
  static UpdatePhotoWindow(t) {
    if (this.Missions) {
      while (this.Missions.length > 0) {
        this.Missions.pop();
      }
      t.forEach(t => {
        t = this.xMa.get(t)?.PhotoMissions;
        if (!!t && !(t.length <= 0)) {
          t.forEach(t => {
            this.Missions.push(t);
          });
        }
      });
    }
  }
  static NMa() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return this.cWi = false;
    }
    let t = undefined;
    let e = false;
    var o = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNodes();
    var i = ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNodes();
    var r = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNodes();
    var a = new Array();
    if (o) {
      for (const s of o) {
        if (s instanceof EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode && (t = s) && t.TakePlace && this.BMa(t.TakePlace.RangeEntity, t, 0)) {
          e = true;
          a.push(t.TakePlace.RangeEntity);
        }
      }
      this.qMa(a, 0);
    }
    if (i) {
      for (const n of i) {
        if (n instanceof EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode && (t = n) && t.TakePlace && this.BMa(t.TakePlace.RangeEntity, t, 1)) {
          e = true;
          a.push(t.TakePlace.RangeEntity);
        }
      }
      this.qMa(a, 1);
    }
    if (r) {
      for (const h of r) {
        if (h instanceof EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode && (t = h) && t.TakePlace && this.BMa(t.TakePlace.RangeEntity, t, 2)) {
          e = true;
          a.push(t.TakePlace.RangeEntity);
        }
      }
      this.qMa(a, 2);
    }
    return e;
  }
  static CheckIfInMission() {
    return this.CameraCaptureType === 1 && this.UMa;
  }
  static async ReturnPhotograph() {
    this.x5_();
    await this.OMa();
    this.U5_();
    await this.CloseBlackScreen();
  }
  static ResetPhotograph() {
    this.x5_();
    this.U5_();
  }
  static async ClosePhotograph(t = false) {
    var e = ModelManager_1.ModelManager.PhotographModel;
    if (e.IsOpenPhotograph) {
      if (!t) {
        this.x5_();
      }
      await this.OMa();
      if (t) {
        ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph = false;
        this.UpdateMissionOptionToFinished(true);
      } else {
        this.U5_();
      }
      e.MontageId = 0;
      if (UiManager_1.UiManager.IsViewOpen("PhotographSetupView")) {
        UiManager_1.UiManager.CloseView("PhotographSetupView");
      }
      if (UiManager_1.UiManager.IsViewOpen("PhotoSaveView")) {
        UiManager_1.UiManager.CloseView("PhotoSaveView");
      }
      if (ModelManager_1.ModelManager.PlotModel.IsInPlot) {
        UiManager_1.UiManager.NormalResetToView(UiModel_1.UiModel.MainViewName);
        this.CloseBlackScreen();
      } else if (UiManager_1.UiManager.GetViewByName("ReviveView")) {
        this.CloseBlackScreen();
      } else {
        UiManager_1.UiManager.NormalResetToView(UiModel_1.UiModel.MainViewName, () => {
          this.CloseBlackScreen();
        });
      }
    }
  }
  static x5_() {
    this.CameraCaptureType = 0;
    this.IWi = undefined;
    this.EWi = undefined;
    this.TWi = undefined;
  }
  static U5_() {
    ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph = false;
    var t = ModelManager_1.ModelManager.PhotographModel;
    this.ResetPhotoMontage();
    t.ClearPhotographFilter();
    t.DestroyUiCamera();
    t.ResetEntityEnable();
    t.ClearPhotographOption();
    this.m$e();
    this.DWi().SetIsDitherEffectEnable(true);
    t = Global_1.Global.BaseCharacter;
    if (t !== undefined && !SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(t.CharacterActorComponent?.Entity)) {
      t?.SetDitherEffect(0, 1);
    }
    this.SetNpcFocusPhotograph(false);
    this.IsLastChecked = false;
    this.SetIsLineTraceBlock(false);
  }
  static Dh1(t) {
    this.uWi?.Remove(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Photo", 45, "拍照:EndEntityPhotographMission", ["delete", t]);
    }
    this.xMa.delete(t);
    this.PhotoMissionFinishMap.delete(t);
    this.AMa = false;
    this.Ph1 = undefined;
    this.SetIsLineTraceBlock(false);
    this.xh1();
  }
  static ScreenShot(t) {
    var e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
    var o = ModelManager_1.ModelManager.PhotographModel;
    var i = ModelManager_1.ModelManager.SceneTeamModel;
    var r = ModelManager_1.ModelManager.AreaModel;
    var i = i.GetCurrentEntity.Entity.GetComponent(0).GetRoleId();
    var a = o.GetPhotographOption(0);
    var s = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName, true);
    var n = o.GetPhotographOption(3);
    var h = o.GetPhotographFilter();
    var l = new LogReportDefine_1.PhotographerLogData();
    l.event_id = "1009";
    l.i_area_id = r.AreaInfo.AreaId;
    l.i_father_area_id = r.AreaInfo.Father;
    l.f_pos_x = e.X;
    l.f_pos_y = e.Y;
    l.f_pos_z = e.Z;
    l.i_motion = o.MontageId;
    l.i_expression = 0;
    l.i_role_id = i;
    l.i_shot_option = o.GetPhotographOption(2);
    l.i_self_option = a ? 0 : 1;
    l.i_info_option = s ? 0 : 1;
    l.i_dof_option = n ? 1 : 0;
    l.i_filter_id = h;
    LogReportController_1.LogReportController.LogReport(l);
    if (this.CheckIfInFightPhotographCamera()) {
      UiManager_1.UiManager.OpenView("FightPhotoSaveView");
    } else {
      UiManager_1.UiManager.OpenView("PhotoSaveView", t, () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnScreenShotDone);
        if (this.CameraCaptureType === 1) {
          if (this.IsLastChecked) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityCameraFinished, true);
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityCameraFinished, false);
          }
        }
      });
    }
  }
  static FightPhotoLogReport() {
    var t = new LogReportDefine_1.FightPhotoTakePhotoLogEvent();
    var e = ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.GetActivityData().GetCurrentLevelData();
    t.inst_id = e.InstanceId;
    t.inst_diff = e.IsDifficulty ? 1 : 0;
    t.trace_id = ModelManager_1.ModelManager.CreatureModel.GetSceneTraceId().toString();
    t.filter_id = ModelManager_1.ModelManager.PhotographModel.SelectedFightPhotoOptionId;
    if (this.CurrentBtNode) {
      t.photo_num = this.rwd ? this.owd.length : this.owd.length + 1;
    } else {
      t.photo_num = 0;
    }
    t.photo_status = this.IsSatisfyAllConditions() ? 1 : 0;
    LogReportController_1.LogReportController.LogReport(t);
  }
  static c$e() {
    this.RWi(1996802261, this.UWi);
    this.RWi(40422668, this.UWi);
    this.RWi(855966206, this.UWi);
  }
  static m$e() {
    for (const t of this.AWi) {
      t.EndTask();
    }
    this.AWi.length = 0;
  }
  static RWi(t, e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (o?.Valid && o.Entity?.Valid) {
      o = o.Entity.GetComponent(206).ListenForTagAddOrRemove(t, e);
      this.AWi.push(o);
    }
  }
  static URe(t) {
    var e;
    if (t && (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), FormationDataController_1.FormationDataController.IsPlayerExist(e)) && !FormationDataController_1.FormationDataController.HasPlayerTag(e, t)) {
      FormationDataController_1.FormationDataController.AddPlayerTag(e, t);
    }
  }
  static ARe(t) {
    var e;
    if (t && (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), FormationDataController_1.FormationDataController.IsPlayerExist(e)) && FormationDataController_1.FormationDataController.HasPlayerTag(e, t)) {
      FormationDataController_1.FormationDataController.RemovePlayerTag(e, t);
    }
  }
  static yWi() {
    var t = CameraController_1.CameraController.WidgetCamera;
    if (t) {
      t = t.GetComponent(12);
      if (t.Valid) {
        return t.CineCamera;
      }
    }
  }
  static LWi() {
    var t = this.EWi;
    if (t?.IsValid()) {
      return t.GetCineCameraComponent();
    }
  }
  static GetFightCameraActor() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) {
      t = t.GetComponent(4);
      if (t.Valid) {
        return t.CameraActor;
      }
    }
  }
  static DWi() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) {
      return t.GetComponent(5);
    }
  }
  static SetFov(t) {
    var e = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    if (e) {
      e.SetFov(t);
    }
  }
  static GetFov() {
    var t = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    if (t) {
      return t.GetFov();
    } else {
      return 0;
    }
  }
  static GetCameraInitialFov() {
    var t = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    if (t) {
      return t.GetCameraInitialFov();
    } else {
      return 0;
    }
  }
  static ResetCamera() {
    var t = ModelManager_1.ModelManager.PhotographModel;
    var e = t.GetPhotographerStructure();
    if (e && (this.PWi(t.PlayMontageEntity), e.ResetCamera(), ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnResetPhotographCamera);
    }
  }
  static PlayPhotoMontage(e, t) {
    var o = ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfig(t);
    if (o) {
      var i = o.MontagePath;
      const r = o.IsLoop;
      o = ModelManager_1.ModelManager.PhotographModel;
      this.PWi(o.PlayMontageEntity);
      o.PlayMontageEntity = e;
      o.MontageId = t;
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimMontage, o => {
        if (e.Valid) {
          const i = e.Entity;
          var t = i.GetComponent(29);
          if (t.IsSitDown) {
            t.PreLeaveSitDownAction();
            this.RWi(-2104691392, (t, e) => {
              if (!e) {
                e = i.GetComponent(178).MainAnimInstance;
                if (r) {
                  e.OnMontageEnded.Add(this.Kue);
                }
                e.Montage_Play(o);
              }
            });
          } else {
            t = i.GetComponent(178).MainAnimInstance;
            if (r) {
              t.OnMontageEnded.Add(this.Kue);
            }
            t.Montage_Play(o);
          }
        }
      });
    }
  }
  static PWi(t) {
    if (ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure() && t?.Valid) {
      t.Entity.GetComponent(178).MainAnimInstance?.Montage_Stop(0);
      ModelManager_1.ModelManager.PhotographModel.MontageId = 0;
    }
  }
  static ResetPhotoMontage() {
    var t = ModelManager_1.ModelManager.PhotographModel;
    this.PWi(t.PlayMontageEntity);
    t.PlayMontageEntity = undefined;
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id;
    if (t && (t = EntitySystem_1.EntitySystem.Get(t))?.Valid && this.GetRoleMainAnimInstanceType() === 0) {
      t.GetComponent(178).MainAnimInstance.设置头部转向状态(1);
    }
  }
  static InitializeDefaultPhotographOption() {
    for (const o of ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig()) {
      let t = -1;
      var e = o.Type;
      if (e === 0) {
        t = o.DefaultOptionIndex;
      } else if (e === 1) {
        t = o.ValueRange[2];
      }
      this.SetPhotographOption(o.ValueType, t, true);
    }
    if (this.CameraCaptureType === 2) {
      this.SetNpcFocusPhotograph(true);
    }
  }
  static SetPhotographOption(t, e, o = false) {
    var i = ModelManager_1.ModelManager.PhotographModel;
    i.SetPhotographOption(t, e);
    switch (t) {
      case 3:
        if (e === 1) {
          r = i.GetPhotographOption(4);
          a = i.GetPhotographOption(5);
          this.TWi.FocusSettings.ManualFocusDistance = r;
          this.TWi.CurrentAperture = a;
        } else {
          this.TWi.FocusSettings.ManualFocusDistance = PhotographDefine_1.DEFAULT_FOCAL_LENTGH;
          this.TWi.CurrentAperture = PhotographDefine_1.DEFAULT_APERTURE;
        }
        break;
      case 4:
        if (i.GetPhotographOption(3) === 1) {
          this.TWi.FocusSettings.ManualFocusDistance = e;
        } else if (!o) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Photo", 71, "焦距选项未打开，尝试设置焦距失败");
          }
        }
        break;
      case 5:
        if (i.GetPhotographOption(3) === 1) {
          this.TWi.CurrentAperture = e;
        } else if (!o) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Photo", 71, "光圈选项未打开，尝试设置光圈失败");
          }
        }
        break;
      case 0:
        var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (e === 1) {
          i.SetEntityEnable(r, true);
        } else {
          i.SetEntityEnable(r, false);
        }
        break;
      case 2:
        var a = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id;
        if (!a) {
          return;
        }
        r = EntitySystem_1.EntitySystem.Get(a);
        if (!r?.Valid) {
          return;
        }
        if (this.GetRoleMainAnimInstanceType() !== 0) {
          return;
        }
        r.GetComponent(178).MainAnimInstance.设置头部转向状态(1);
    }
  }
  static IsPlayerLookAtCamera() {
    return ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(2) === 1;
  }
  static SetNpcFocusPhotograph(t) {
    if (this.PhotoTargets && !(this.PhotoTargets.length <= 0)) {
      for (const o of this.PhotoTargets) {
        var e = o;
        if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(e), (e = EntitySystem_1.EntitySystem.Get(e))?.Valid) && (e = e.GetComponent(188))) {
          e.NeedLookAtCamera = t;
        }
      }
    }
  }
  static IsOpenPhotograph() {
    return ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph || UiManager_1.UiManager.IsViewOpen("FilterSettingView");
  }
  static GetAllCheckPoints(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (e) {
      t = (0, IComponent_1.getComponent)(e.ComponentsData, "PhotoTargetComponent");
      if (t) {
        var o = new Array();
        for (const i of t.RequiredPoints) {
          o.push(Vector_1.Vector.Create((i.X ?? 0) + e.Transform.Pos.X ?? 0, (i.Y ?? 0) + e.Transform.Pos.Y ?? 0, (i.Z ?? 0) + e.Transform.Pos.Z ?? 0));
        }
        return o;
      }
    }
  }
  static GetCheckEntityPosition(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t) {
      return Vector_1.Vector.Create(t.Transform?.Pos.X ?? 0, t.Transform?.Pos.Y ?? 0, t.Transform?.Pos.Z ?? 0);
    }
  }
  static xWi(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t) {
      var e = (0, IComponent_1.getComponent)(t.ComponentsData, "PhotoTargetComponent");
      if (e && e.RayCastIgnoreEntities) {
        var o = new Array();
        for (let t = 0; t < e.RayCastIgnoreEntities.length; t++) {
          var i = e.RayCastIgnoreEntities[t];
          o.push(i);
        }
        return o;
      }
    }
  }
  static wWi(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(t);
    if (t) {
      return t;
    }
  }
  static GetPointType(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "PhotoTargetComponent");
      if (t && t.TargetCapturePromptUi) {
        return t.TargetCapturePromptUi;
      }
    }
  }
  static GMa(t) {
    this.uWi ||= new RangeCheck_1.RangeCheck();
    return this.uWi.GetOrAdd(t) !== undefined;
  }
  static CheckInUi(t) {
    var e = this.BWi();
    return !!e && !!t && !!this.FMa(t, e);
  }
  static CheckInUi2D(t) {
    var e = this.BWi();
    return !!e && !!t && !!this.VMa(t, e);
  }
  static FMa(t, e) {
    var o = Global_1.Global.CharacterController;
    var i = (0, puerts_1.$ref)(undefined);
    return !!UE.GameplayStatics.D_ProjectWorldToScreen(o, t.ToUeVector(), i, false) && (o = (0, puerts_1.$unref)(i), this.VMa(o, e));
  }
  static HMa(t, e) {
    return Math.pow(Math.pow(t.X - e.X, 2) + Math.pow(t.Y - e.Y, 2), 0.5);
  }
  static VMa(t, e) {
    return this.HMa(t, this.jMa()) <= e;
  }
  static wMa(e) {
    let o = 0;
    var t;
    var i = e.TakeTime;
    if (i && i.TimeRange) {
      if ((t = this.bWi(e)) !== undefined && this.qWi(Math.floor(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour), Math.floor(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute - Math.floor(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour) * 60), i.TimeRange.Start.Hour, i.TimeRange.Start.Min, i.TimeRange.End.Hour, i.TimeRange.End.Min, t)) {
        this.GWi(e, 0, undefined, true);
      } else {
        this.GWi(e, 0, undefined, false);
        o--;
      }
    } else {
      this.GWi(e, 0, undefined, false);
    }
    var r = e.TakeTargetArray;
    if (r) {
      for (const s of r) {
        var a = this.GetAllCheckPoints(s.EntityId);
        if (!a || a.length === 0) {
          o--;
          break;
        }
        let t = true;
        for (const n of a) {
          if (!this.CheckInUi(n) || !this.CheckLineTrace(n.ToUeVectorOld(), r)) {
            this.GWi(e, 1, s.EntityId, false);
            t = false;
            if (!this.Ihl(s.EntityId)) {
              o--;
            }
            break;
          }
        }
        if (t) {
          this.GWi(e, 1, s.EntityId, true);
        }
      }
    } else {
      o--;
    }
    return o === 0;
  }
  static jMa() {
    var t = Global_1.Global.CharacterController;
    var e = (0, puerts_1.$ref)(undefined);
    var o = (0, puerts_1.$ref)(undefined);
    t.GetViewportSize(e, o);
    var t = (0, puerts_1.$unref)(e);
    var e = (0, puerts_1.$unref)(o);
    return new UE.Vector2D(t / 2, e / 2);
  }
  static BWi() {
    var t;
    var e;
    var o;
    var i = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("Photo.TargetFinderFrameSize");
    if (i) {
      t = Global_1.Global.CharacterController;
      i = parseFloat(i.Value);
      e = (0, puerts_1.$ref)(undefined);
      o = (0, puerts_1.$ref)(undefined);
      t.GetViewportSize(e, o);
      return (0, puerts_1.$unref)(o) * i / 2;
    }
  }
  static SWi(e) {
    var t;
    var o = new Array();
    if (e && (e.TakeTime && (t = new PhotoMission(e, 0, false, undefined, e.TakeTime.TidDescription, false), o.push(t)), e.TakeTargetArray)) {
      for (let t = 0; t < e.TakeTargetArray.length; t++) {
        var i = new PhotoMission(e, 1, false, e.TakeTargetArray[t].EntityId, e.TakeTargetArray[t].TidDescription, e.TakeTargetArray[t].IsOptionalTarget ?? false);
        o.push(i);
      }
    }
    return o;
  }
  static GWi(e, o, i, r) {
    var a = this.Missions.length;
    for (let t = 0; t < a; t++) {
      if (this.Missions[t].ItsMissionType === o && e === this.Missions[t].Node) {
        if (o !== 1) {
          this.Missions[t].IsFinished = r;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityCameraOneSituationChanged, this.Missions[t].Description, r, this.Missions[t].IsOptional);
          return;
        }
        if (this.Missions[t].EntityId === i && !this.Missions[t].IsOptionalFinished && e === this.Missions[t].Node) {
          this.Missions[t].IsFinished = r;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityCameraOneSituationChanged, this.Missions[t].Description, r, this.Missions[t].IsOptional);
          return;
        }
      }
    }
  }
  static Ihl(e) {
    var o = this.Missions.length;
    for (let t = 0; t < o; t++) {
      if (this.Missions[t].EntityId === e && this.Missions[t].IsOptional) {
        return true;
      }
    }
    return false;
  }
  static UpdateMissionOptionToFinished(o = false) {
    if (this.GetNowBehaviorNodes()) {
      if (this.Missions) {
        const i = [];
        var e = this.Missions.length;
        for (let t = 0; t < e; t++) {
          if (this.Missions[t].IsOptional && this.Missions[t].IsFinished && !this.Missions[t].IsOptionalFinished) {
            i.push(this.Missions[t].EntityId);
          }
        }
        this.PhotographShotRequest(i, t => {
          if (t) {
            if (this.Missions) {
              var e = this.Missions.length;
              for (let t = 0; t < e; t++) {
                if (i.includes(this.Missions[t].EntityId)) {
                  this.Missions[t].IsOptionalFinished = true;
                  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityCameraOptionalSituationChanged, this.Missions[t].Description);
                }
              }
            }
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Photo", 45, "拍照:UpdateMissionOptionToFinished失败：");
          }
          this.SubmitQuest(o);
        });
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Photo", 45, "拍照:UpdateMissionOptionToFinished Mission为空");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Photo", 45, "拍照:没找到要提交的BehaviorNode");
    }
  }
  static bWi(t) {
    if (t?.TakeTime) {
      switch (t.TakeTime.Compare) {
        case "Eq":
          return true;
        case "Ne":
          return false;
      }
    }
  }
  static qWi(t, e, o, i, r, a, s) {
    if (r < o) {
      if (o <= t) {
        if (t !== o || i <= e) {
          return s;
        } else {
          return !s;
        }
      } else if (t <= r && (t !== r || e <= a)) {
        return s;
      } else {
        return !s;
      }
    }
    if (o < r) {
      if (o <= t && t <= r) {
        if (t === o) {
          if (i <= e) {
            return s;
          } else {
            return !s;
          }
        } else if (t !== r || e <= a) {
          return s;
        } else {
          return !s;
        }
      }
    } else if (t === o) {
      if (i <= e && e <= a) {
        return s;
      } else {
        return !s;
      }
    }
    return !s;
  }
  static CheckLineTrace(t, e) {
    if (!t) {
      return false;
    }
    let o = true;
    var i;
    if (this.mWi) {
      this.mWi.WorldContextObject = GlobalData_1.GlobalData.World;
      i = this.EWi.D_K2_GetActorLocation();
      this.mWi.StartX = i.X;
      this.mWi.StartY = i.Y;
      this.mWi.StartZ = i.Z;
      this.mWi.EndX = t.X;
      this.mWi.EndY = t.Y;
      this.mWi.EndZ = t.Z;
      o = TraceElementCommon_1.TraceElementCommon.LineTrace(this.mWi, "PhotographCheck");
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Photo", 45, "拍照:射线检测失败：");
    }
    if (o) {
      for (let t = 0; t < this.mWi.HitResult.Actors.Num(); t++) {
        var r = this.mWi.HitResult.Actors.Get(t);
        if (r && !(r instanceof TsPhotographer_1.default) && !(r instanceof UE.AkReverbVolume) && !(r instanceof UE.NinjaLive_C)) {
          if (r instanceof UE.BP_BaseVision_C) {
            var a = this.mWi.HitResult.Components.Get(t);
            if (a && a.ComponentTags?.Contains(this.NWi)) {
              if (!this.GetIsLineTraceBlock()) {
                if (Log_1.Log.CheckWarn()) {
                  Log_1.Log.Warn("Photo", 45, "拍照:被声骸遮挡", ["名称：", r.GetName()]);
                }
                this.SetIsLineTraceBlock(true);
              }
              continue;
            }
          }
          if (UE.KuroStaticLibrary.IsImplementInterface(r.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
            a = r.GetEntityId();
            if (this.WMa(a, e, true)) {
              continue;
            }
          }
          var s = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(r);
          if (!s || !this.WMa(s.PbDataId, e, false)) {
            if (!this.GetIsLineTraceBlock()) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Photo", 45, "拍照:视野中有物品遮挡：", ["名称：", r.GetName()]);
              }
              this.SetIsLineTraceBlock(true);
            }
            return false;
          }
        }
      }
    }
    return true;
  }
  static SubmitQuest(t = false) {
    var e;
    if (this.IsLastChecked && (e = this.PhotoMissionFinishMap) && e.size > 0) {
      e.forEach((t, e) => {
        var o = this.xMa.get(e);
        if (o && t) {
          o.BehaviorNode?.UseSubmitNode();
          this.Dh1(e);
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Photo", 45, "拍照:提交请求但并没有完成：", ["其中第一个任务的名称：", o?.PhotoMissions ? o.PhotoMissions[0]?.Description : undefined]);
        }
      });
    }
    if (t) {
      this.ResetPhotograph();
    }
  }
  static GetPosition2D(t) {
    var e = Global_1.Global.CharacterController;
    var o = (0, puerts_1.$ref)(undefined);
    if (UE.GameplayStatics.D_ProjectWorldToScreen(e, t.ToUeVector(), o, false)) {
      return (0, puerts_1.$unref)(o);
    }
  }
  static WMa(t, e, o) {
    if (e) {
      for (const a of e) {
        var i = this.xWi(a.EntityId);
        if (!i) {
          return false;
        }
        for (const s of i) {
          if (o) {
            var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
            if (r) {
              if (this.wWi(s) === t) {
                return true;
              }
            }
          } else if (s === t) {
            return true;
          }
        }
      }
    }
    return false;
  }
  static CheckHasSpecifiedFeatureForSave() {
    return FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check();
  }
  static GetEntityFinishSituation(t) {
    if (this.Missions) {
      for (const e of this.Missions) {
        if (e.EntityId === t) {
          return !!e.IsOptionalFinished || e.IsFinished;
        }
      }
    }
    return false;
  }
  static GetEntityOptionalFinished(t) {
    if (this.Missions) {
      for (const e of this.Missions) {
        if (e.EntityId === t) {
          return e.IsOptionalFinished ?? false;
        }
      }
    }
    return false;
  }
  static GetPhotoMissionById(t) {
    if (this.Missions) {
      for (const e of this.Missions) {
        if (e.EntityId === t) {
          return e;
        }
      }
    }
  }
  static xh1() {
    const e = new Array();
    if (!this.Ph1 || this.Ph1.length <= 0) {
      this.wh1 = undefined;
    } else {
      this.Ph1.forEach(t => {
        t = this.xMa.get(t)?.BehaviorNode;
        if (t) {
          e.push(t);
        }
      });
      if (!((this.wh1 = e).length > 0)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Photo", 45, "拍照:GetNowBehaviorNodes为空");
        }
      }
    }
  }
  static GetNowBehaviorNodes() {
    return this.wh1;
  }
  static PhotographShotRequest(o, i) {
    var t = this.GetNowBehaviorNodes();
    if (!!t && !(t.length <= 0)) {
      t.forEach(t => {
        var e;
        if (t) {
          (e = Protocol_1.Aki.Protocol.ng_.create()).d9n = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(t?.TreeIncId);
          e.C9n = MathUtils_1.MathUtils.BigIntToLong(t?.TreeIncId);
          e.b5n = t?.NodeId;
          e.PSs = o;
          Net_1.Net.Call(28936, e, t => {
            if (!t || t.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
              if (i) {
                i(false);
              }
            } else if (i) {
              i(true);
            }
          });
        }
      });
    }
  }
  static GetPointToFinishTask() {
    var e = this.GetNowBehaviorNodes();
    if (e && !(e.length <= 0)) {
      e = e[0]?.TakeTargetArray;
      if (e) {
        let t = new UE.Vector(0, 0, 0);
        for (const r of e) {
          var o = this.GetAllCheckPoints(r.EntityId);
          if (o && o.length !== 0) {
            for (const a of o) {
              var i = a.ToUeVectorOld();
              t = t.IsZero() ? i : t.op_Addition(i).op_Division(2);
            }
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Photo", 45, "拍照:GetPointToFinishTask", ["finalPoint:", t]);
        }
        if (!t.IsZero()) {
          return t;
        }
      }
    }
  }
  static GetRoleMainAnimInstanceType() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid && (t = t.Entity.GetComponent(178)?.MainAnimInstance, UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE))) {
      return 0;
    } else {
      return 1;
    }
  }
  static SetCameraLUT(t) {
    var e = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    if (e) {
      e.SetCameraLUT(t);
    }
  }
  static InitPostProcessVolBlendWeight(o = PhotographDefine_1.DEFAULT_FILTER_CONFIGID) {
    const i = ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoFilterConfigById(o)?.PPVName;
    ModelManager_1.ModelManager.PhotographModel.GetFilterPostProcessVolumeMap().forEach((t, e) => {
      if (t.IsValid()) {
        if (e === i) {
          e = ModelManager_1.ModelManager.PhotographModel.GetFilterStrengthByFilterId(o);
          t.BlendWeight = e;
        } else {
          t.BlendWeight = 0;
        }
      }
    });
  }
  static SetSingleFilterStrength(t, e) {
    ModelManager_1.ModelManager.PhotographModel.SetFilterStrength(t, e);
    var t = ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoFilterConfigById(t);
    if (t && (t = t.PPVName, t = ModelManager_1.ModelManager.PhotographModel.GetFilterPostProcessVolumeMap().get(t))) {
      t.BlendWeight = e;
    }
  }
  static SetTargetActorAndSkeletalMesh() {
    this.FPo = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
    if (this.FPo) {
      this.VPo = this.FPo.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    }
  }
  static PushCameraPlayerAsTarget(t) {
    var e;
    var o;
    var i = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    if (i) {
      t = ConfigManager_1.ConfigManager.PhotographConfig.GetUiCameraFightPhotographConfig(t.toString());
      e = this.Kyd(t.Location);
      o = this.Xyd(t.Rotation);
      if (e && o) {
        i.SetActorRotation(o);
        i.SetCameraArmTargetOffset(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeFovByOption, t.Fov);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Photo", 71, "切换界面镜头时，找不到对应位置或旋转，可能是对应目标无法找到");
      }
    }
  }
  static Kyd(t) {
    if (this.VPo) {
      var e = this.VPo.D_K2_GetComponentToWorld();
      if (e) {
        if (this.FPo?.IsValid()) {
          return UE.KismetMathLibrary.D_TransformLocation(e, t);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Photo", 71, "无法获得对应的Actor骨骼");
      }
    }
  }
  static Xyd(t) {
    var e;
    if (this.FPo) {
      e = this.FPo.D_GetTransform();
      return UE.KismetMathLibrary.D_TransformRotation(e, t);
    } else {
      return t;
    }
  }
  static CloseFightPhotographMode() {
    this.ResetCamera();
    ModelManager_1.ModelManager.PhotographModel.SelectedFightPhotoOptionId = 0;
    this.rwd = false;
    TimerSystem_1.TimerSystem.Delay(() => {
      var t = new SeamlessTravelDefine_1.SeamlessTravelContext();
      ControllerHolder_1.ControllerHolder.SeamlessTravelController.EnableSeamlessTravel(t, true);
      this.ResetPhotograph();
      if (UiManager_1.UiManager.IsViewOpen("FightPhotoResultView")) {
        UiManager_1.UiManager.CloseView("FightPhotoResultView");
      }
      UiManager_1.UiManager.CloseView("FightPhotographView", () => {
        ControllerHolder_1.ControllerHolder.SeamlessTravelController.EndSeamlessTravel();
      });
    }, 200);
  }
  static InitFightPhotoTask() {
    this.CurrentBtNode = undefined;
    var t = ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNodes();
    if (t) {
      for (const e of t) {
        if (e instanceof TakePicturesWithTimeScaleChildQuestNode_1.TakePicturesWithTimeScaleChildQuestNode) {
          this.CurrentBtNode = e;
          return;
        }
      }
    }
    t = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNodes();
    if (t) {
      for (const o of t) {
        if (o instanceof TakePicturesWithTimeScaleChildQuestNode_1.TakePicturesWithTimeScaleChildQuestNode) {
          this.CurrentBtNode = o;
          return;
        }
      }
    }
  }
  static TrySaveFightPhoto(t, e, o) {
    if (this.CheckIfInFightPhotographCamera() && !this.rwd && this.IsSatisfyAllConditions()) {
      if (t = UE.LGUIBPLibrary.CreateTexture2DFromColors(t, e, o)) {
        this.owd.push(t);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("FightPhotograph", 71, "保存战斗拍照截图成功", ["任务", this.owd.length]);
        }
        this.rwd = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBtFightPhotoTaskFinish);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FightPhotograph", 71, "战斗拍照截图生成texture失败");
      }
    }
  }
  static IsSatisfyAllConditions() {
    return !!this.CurrentBtNode && (!!this.IsIgnoreAllCondition || !!this.CurrentBtNode.CheckRoleInCamera() && !!this.CurrentBtNode.CheckCameraCondition() && !!this.CurrentBtNode.CheckPhotographCondition());
  }
  static IsFinishCurrentBtNode() {
    return !!this.CheckIfInFightPhotographCamera() && this.rwd;
  }
  static GetSavedFightPhotos() {
    return this.owd;
  }
  static ClearAllSavedFightPhotos() {
    this.owd = [];
  }
  static IsFightPhotoCanSettle() {
    return !!this.CheckIfInFightPhotographCamera() && this.owd.length === 3;
  }
  static Ah1(t, e) {
    if (!t || !e) {
      return false;
    }
    if (t.length !== e.length) {
      return false;
    }
    let o = true;
    t.forEach(t => {
      if (!e.includes(t)) {
        o = false;
      }
    });
    return o;
  }
  static CheckIfInNormalCamera() {
    return this.CameraCaptureType === 0;
  }
  static CheckIfInEntityCamera() {
    return this.CameraCaptureType === 1;
  }
  static CheckIfInTogetherCamera() {
    return this.CameraCaptureType === 2;
  }
  static CheckIfInFightPhotographCamera() {
    return this.CameraCaptureType === 3;
  }
}
exports.PhotographController = PhotographController;
(_a = PhotographController).AWi = [];
PhotographController.EWi = undefined;
PhotographController.TWi = undefined;
PhotographController.IWi = undefined;
PhotographController.CameraCaptureType = 0;
PhotographController.uWi = undefined;
PhotographController.xMa = new Map();
PhotographController.PhotoMissionFinishMap = new Map();
PhotographController.Missions = undefined;
PhotographController.wh1 = undefined;
PhotographController.IsLastChecked = false;
PhotographController.AMa = false;
PhotographController.cWi = false;
PhotographController.XTn = false;
PhotographController.mWi = undefined;
PhotographController.Ph1 = undefined;
PhotographController.MaxFov = undefined;
PhotographController.MinFov = undefined;
PhotographController.UMa = false;
PhotographController.b1n = false;
PhotographController.tdu = false;
PhotographController.WFa = false;
PhotographController.NWi = new UE.FName("EntityPhotoIgnore");
PhotographController.PhotoTargets = undefined;
PhotographController.$Ct = () => {
  _a.V01();
};
PhotographController.Gre = () => {
  _a.V01();
};
PhotographController.CWi = () => {
  _a.V01();
};
PhotographController.gWi = () => {
  _a.V01();
};
PhotographController.pWi = () => {
  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotAllowOpenPhotograph");
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Photo", 45, "无法拍照:不在使用范围内");
  }
};
PhotographController.xie = (t, e) => {
  _a.ClosePhotograph();
};
PhotographController.Jze = t => {
  _a.ClosePhotograph();
};
PhotographController.vWi = (t, e) => {
  var o;
  if (e !== 0 && !!(o = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) && (_a.CameraCaptureType !== 0 || !UiManager_1.UiManager.IsViewShow("PhotographSetupView")) && !UiManager_1.UiManager.IsViewShow("PhotoSaveView") && (_a.CameraCaptureType !== 1 || !UiManager_1.UiManager.IsViewShow("PhotoSaveView"))) {
    if (_a.CameraCaptureType === 1) {
      o.AddCameraArmPitchInput(e);
    } else {
      o.MoveUp(e);
    }
  }
};
PhotographController.MWi = (t, e) => {
  var o;
  if (e !== 0 && !!(o = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) && (_a.CameraCaptureType !== 0 || !UiManager_1.UiManager.IsViewShow("PhotographSetupView")) && !UiManager_1.UiManager.IsViewShow("PhotoSaveView") && (_a.CameraCaptureType !== 1 || !UiManager_1.UiManager.IsViewShow("PhotoSaveView"))) {
    if (_a.CameraCaptureType === 1) {
      o.AddCameraArmYawInput(e);
    } else {
      o.MoveRight(e);
    }
  }
};
PhotographController.q8i = (t, e) => {
  var o;
  if (e !== 0 && !!(o = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) && !!Info_1.Info.IsInGamepad() && (_a.CameraCaptureType !== 0 || !UiManager_1.UiManager.IsViewShow("PhotographSetupView")) && !UiManager_1.UiManager.IsViewShow("PhotoSaveView") && (_a.CameraCaptureType !== 1 || !UiManager_1.UiManager.IsViewShow("PhotoSaveView"))) {
    o.AddCameraArmPitchInput(-e);
  }
};
PhotographController.G8i = (t, e) => {
  var o;
  if (e !== 0 && !!(o = ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) && !!Info_1.Info.IsInGamepad() && (_a.CameraCaptureType !== 0 || !UiManager_1.UiManager.IsViewShow("PhotographSetupView")) && !UiManager_1.UiManager.IsViewShow("PhotoSaveView") && (_a.CameraCaptureType !== 1 || !UiManager_1.UiManager.IsViewShow("PhotoSaveView"))) {
    o.AddCameraArmYawInput(e);
  }
};
PhotographController.QFa = (t, e) => {
  _a.HFa(_a.b1n);
  _a.jFa(_a.WFa);
};
PhotographController.nye = () => {
  _a.V01();
};
PhotographController.UWi = (t, e) => {
  if (e) {
    _a.ClosePhotograph();
  }
};
PhotographController.Kue = (t, e) => {
  if (!e) {
    if ((e = ModelManager_1.ModelManager.PhotographModel.PlayMontageEntity)?.Valid) {
      e.Entity.GetComponent(178).MainAnimInstance.Montage_Play(t);
    }
  }
};
PhotographController.FPo = undefined;
PhotographController.VPo = undefined;
PhotographController.owd = [];
PhotographController.rwd = false;
PhotographController.CurrentBtNode = undefined;
PhotographController.IsIgnoreAllCondition = false; //# sourceMappingURL=PhotographController.js.map