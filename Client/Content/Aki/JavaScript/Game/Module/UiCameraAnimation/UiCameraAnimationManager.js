"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraAnimationManager = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Stack_1 = require("../../../Core/Container/Stack");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../Camera/CameraController");
const CameraUtility_1 = require("../../Camera/CameraUtility");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SkeletalObserverManager_1 = require("../SkeletalObserver/SkeletalObserverManager");
const UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraSequenceComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraSequenceComponent");
const UiCameraDebugTool_1 = require("../UiCamera/UiCameraDebugTool");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraSpringStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraSpringStructure");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const UiCameraAnimation_1 = require("./UiCameraAnimation");
const UiCameraAnimationDefine_1 = require("./UiCameraAnimationDefine");
const UiCameraAnimationHandle_1 = require("./UiCameraAnimationHandle");
const UiCameraHandleData_1 = require("./UiCameraContext/UiCameraHandleData");
const UiCameraMappingData_1 = require("./UiCameraContext/UiCameraMappingData");
class UiCameraAnimationManager {
  static Initialize() {
    this.LoadingViewCameraAnimationLength = CommonParamById_1.configCommonParamById.GetIntConfig("LoadingViewCameraAnimationLength");
    this.LoadingViewManualFocusDistance = CommonParamById_1.configCommonParamById.GetFloatConfig("LoadingViewManualFocusDistance");
    this.LoadingViewAperture = CommonParamById_1.configCommonParamById.GetFloatConfig("LoadingViewAperture");
    this.nPo();
  }
  static Clear() {
    this.ClearDisplay();
    this.sPo();
  }
  static nPo() {
    for (const t of ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetAllUiCameraMappingConfig()) {
      var a = new UiCameraMappingData_1.UiCameraMappingData(t, false);
      this.aPo.set(t.ViewName, a);
    }
    for (const i of ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetAllChildUiCameraMappingConfig()) {
      var e = new UiCameraMappingData_1.UiCameraMappingData(i, true);
      this.aPo.set(i.ViewName, e);
    }
  }
  static SetDynamicDisablePushCamera(a, e) {
    if (e) {
      if (!this.SAl.has(a)) {
        this.SAl.add(a);
      }
    } else if (this.SAl.has(a)) {
      this.SAl.delete(a);
    }
  }
  static GetCameraMappingData(a) {
    if (!this.SAl.has(a)) {
      return this.aPo.get(a);
    }
  }
  static sPo() {
    this.aPo.clear();
  }
  static hPo(a) {
    this.lPo.Push(a);
  }
  static _Po(a) {
    let e = this.lPo.Peek();
    for (var t = a.UniqueId; e && e.UniqueId !== t;) {
      this.lPo.Pop();
      e = this.lPo.Peek();
    }
    this.lPo.Pop();
    return this.GetLastHandleData();
  }
  static cPo(a) {
    var e = this.mPo(a);
    if (!e) {
      return false;
    }
    var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(e.ViewName);
    var i = [];
    let r = false;
    for (const n of this.lPo) {
      if (n.UniqueId === a) {
        i.push(n);
        r = true;
      } else if (r) {
        if (!this.dPo(t, n.ViewName) && e.ViewName !== n.ViewName) {
          break;
        }
        i.push(n);
      }
    }
    for (const o of i) {
      this.lPo.Delete(o);
    }
    return true;
  }
  static dPo(a, e) {
    for (const t of a) {
      if (t.ChildViewName === e) {
        return true;
      }
    }
    return false;
  }
  static mPo(a) {
    for (const e of this.lPo) {
      if (e.UniqueId === a) {
        return e;
      }
    }
  }
  static GetLastHandleData() {
    return this.lPo.Peek();
  }
  static CPo() {
    var a = new UiCameraAnimationHandle_1.UiCameraAnimationHandle();
    a.Initialize();
    return a;
  }
  static ActivateCameraHandle(a, e = true, t = true) {
    if (this.CurrentCameraHandle) {
      this.CurrentCameraHandle.Deactivate();
    } else {
      this.CurrentCameraHandle = this.CPo();
    }
    this.CurrentCameraHandle.Activate(a, e, t);
  }
  static fPo(e, t = true, i = true) {
    if (this.IsPlayingAnimation()) {
      this.pPo.WaitCameraAnimationFinished().then(a => {
        if (a.FinishType === 0) {
          this.ActivateCameraHandle(e, t, i);
        }
      }, () => {});
    } else {
      this.ActivateCameraHandle(e, t, i);
    }
  }
  static PushCameraHandleByOpenView(e, t, i = true) {
    if (UiCameraAnimationManager.CanPushCameraHandle(e)) {
      var r = UiCameraAnimationManager.GetLastHandleData();
      if (!r || r.ViewName !== e && r.UniqueId !== t) {
        if (t) {
          var n = this.mPo(t);
          if (n) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CameraAnimation", 58, "此界面已经入栈,直接返回", ["PushHandleData", n.ToString()]);
            }
            return;
          }
        }
        n = UiCameraHandleData_1.UiCameraHandleData.NewByView(e, t);
        let a = undefined;
        var o = r?.ViewName;
        if (o) {
          a = this.GetBlendName(o, e);
        }
        this.PushCameraHandle(n, i, true, a, true);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "此界面已经在栈顶", ["PushHandleData", r?.ToString()], ["viewId", t]);
      }
    }
  }
  static PushCameraHandleByHandleName(a, e = true, t = true, i = UiCameraAnimationDefine_1.DEFAULT_BLEND_NAME, r = false, n = undefined, o) {
    var s;
    if (!StringUtils_1.StringUtils.IsBlank(a)) {
      o = UiCameraHandleData_1.UiCameraHandleData.NewByHandleName(a, o);
      if (s = this.GetLastHandleData()) {
        s = s.ViewName;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "手动播放镜头动画，将镜头数据的ViewName设置为栈顶的数据", ["HandleName", a], ["ViewName", s]);
        }
        o.ViewName = s;
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("CameraAnimation", 58, "手动播放镜头动画时，当前没有播放任何Ui镜头状态", ["HandleName", a]);
      }
      this.PushCameraHandle(o, e, t, i, r, n);
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CameraAnimation", 58, "镜头动画的HandleName为空，镜头动画异常");
    }
  }
  static PushCameraHandle(a, e = true, t = true, i, r = false, n = undefined) {
    var o = UiCameraAnimationManager.GetLastHandleData();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------入栈", ["PushHandleData", a.ToString()], ["LastTopHandleData", o?.ToString()]);
    }
    if (r && this.vPo(a)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------新的镜头状态和旧的镜头状态一致，不会再次播放推入镜头状态表现", ["CurrentHandleData", this.CurrentCameraHandle?.GetHandleData().ToString()], ["NewHandleData", a.ToString()]);
      }
    } else {
      this.hPo(a);
      this.StopUiCameraAnimation();
      this.MPo(a, o, e, t, i, n);
    }
  }
  static PopCameraHandleByCloseView(a, e, t, i = true) {
    if (UiCameraAnimationManager.CanPushCameraHandle(a)) {
      if (i) {
        i = this.GetBlendName(a, e);
        e = this.mPo(t);
        this.PopCameraHandle(e, i);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "仅删除镜头状态，不做任何表现", ["closeViewName", a], ["closeViewId", t]);
        }
        this.cPo(t);
      }
    }
  }
  static PopCameraHandle(a, e) {
    var t;
    var i;
    if (a) {
      t = this.GetLastHandleData();
      i = this._Po(a);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------出栈", ["popHandleData", a.ToString()], ["TopHandleData", i?.ToString()], ["blendName", e]);
      }
      this.n__(i);
      this.StopUiCameraAnimation();
      this.MPo(i, t, e !== undefined, true, e);
    } else {
      this.ClearDisplay();
    }
  }
  static n__(a) {
    var e;
    var t;
    if (a) {
      e = a.ViewName;
      if (!StringUtils_1.StringUtils.IsEmpty(e)) {
        t = (e = UiCameraAnimationManager.GetCameraMappingData(e))?.GetUiCameraMappingConfig();
        if (e && t?.BodyTargetType !== 0) {
          a.HandleName = e.GetSourceHandleName();
          a.Refresh();
        }
      }
    }
  }
  static vPo(a) {
    var e;
    return !!this.CurrentCameraHandle && !!(e = this.lPo.Peek()) && !!this.UiCamera?.GetIsEntered() && !!e.IsEqual(a) && !(this.CurrentCameraHandle.SetHandleData(a), 0);
  }
  static MPo(a, e, t = true, i = true, r, n = undefined) {
    var o;
    this.UiCamera = UiCameraManager_1.UiCameraManager.Get();
    this.UiCameraPostEffectComponent = this.UiCamera.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent);
    this.UiCameraSequenceComponent = this.UiCamera.GetUiCameraComponent(UiCameraSequenceComponent_1.UiCameraSequenceComponent);
    if (this.EPo) {
      this.EPo.StopSequence();
      this.EPo = undefined;
      this.UiCamera.Exit();
    }
    if (a) {
      a.Refresh();
      this.SPo(a);
      if (StringUtils_1.StringUtils.IsEmpty(r)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------入栈是BlendName为空，直接激活镜头状态", ["PushHandleData", a.ToString()], ["blendName", r]);
        }
        this.fPo(a, t, i);
        return 3;
      } else if (e) {
        if (t) {
          if (!(o = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(r)) || o.Time <= 0) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CameraAnimation", 58, "没有混合配置或播放界面摄像机动画时间<=0，直接激活镜头", ["blendName", r]);
            }
            this.ActivateCameraHandle(a, false, false);
            return 3;
          } else {
            UiCameraAnimationManager.AsyncPlayCameraAnimation(e, a, r).then(a => {
              this.j3t(a, n);
            }, () => {});
            return 1;
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------不需要播放镜头动画，直接激活镜头状态", ["LastHandleData", e.ToString()], ["PushHandleData", a.ToString()]);
          }
          this.ActivateCameraHandle(a, false, false);
          return 3;
        }
      } else {
        this.fPo(a, t, i);
        return 3;
      }
    } else {
      if (o = this.GetCurrentCameraHandle()) {
        (this.EPo = o).Revert(true, () => {
          this.ClearDisplay();
        });
      } else {
        this.ClearDisplay();
      }
      return 2;
    }
  }
  static SPo(a) {
    if (!this.UiCameraSpringStructure?.IsValid() && !a.IsEmptyState) {
      this.UiCameraSpringStructure = this.UiCamera.PushStructure(UiCameraSpringStructure_1.UiCameraSpringStructure);
    }
  }
  static j3t(a, e = undefined) {
    var t = a.FromHandleData;
    var i = a.ToHandleData;
    if (a.FinishType === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------入栈动画结束", ["LastHandleData", t.ToString()], ["PushHandleData", i.ToString()], ["FinishType", a.FinishType]);
      }
      this.ActivateCameraHandle(i, false, false);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------入栈动画被停止", ["LastHandleData", t.ToString()], ["PushHandleData", i.ToString()], ["FinishType", a.FinishType]);
    }
    if (e) {
      e(a);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayCameraAnimationFinish, a);
  }
  static CanPushCameraHandle(a) {
    a = this.GetCameraMappingData(a);
    return !!a && a.CanPushCameraHandle();
  }
  static ReactivateCameraHandle(a = false, e = false) {
    var t;
    var i;
    if (this.CurrentCameraHandle && !this.CurrentCameraHandle.GetIsPendingRevert() && (t = this.CurrentCameraHandle.GetHandleData())) {
      i = t.ViewName;
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        if (i = UiCameraAnimationManager.GetCameraMappingData(i)) {
          t.HandleName = i.GetSourceHandleName();
          t.Refresh();
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "重新激活镜头状态", ["handleData", t.ToString()]);
      }
      this.CurrentCameraHandle.Activate(t, a, e);
    }
  }
  static DeactivateCurrentCameraHandle() {
    if (this.CurrentCameraHandle) {
      this.CurrentCameraHandle.Deactivate();
    }
  }
  static GetCurrentCameraHandle() {
    return this.CurrentCameraHandle;
  }
  static GetBlendName(a, e) {
    a = this.GetCameraMappingData(a);
    if (a) {
      return a.GetToBlendName(e);
    }
  }
  static IsPlayingAnimation() {
    return !!this.pPo && this.pPo.IsPlaying();
  }
  static IsPlayingBlendInSequence() {
    return !!this.CurrentCameraHandle && this.CurrentCameraHandle.GetIsPlayingBlendInSequence();
  }
  static ClearDisplay() {
    this.StopUiCameraAnimation();
    this.yPo();
    UiCameraManager_1.UiCameraManager.Destroy();
    for (const a of this.lPo) {
      a.Reset();
    }
    this.lPo.Clear();
    this.CurrentCameraHandle?.Reset();
    this.UiCamera = undefined;
    this.UiCameraSpringStructure = undefined;
    this.UiCameraPostEffectComponent = undefined;
    this.CurrentCameraHandle = undefined;
    this.EPo = undefined;
    this.IPo.clear();
    this.TPo.clear();
  }
  static GenerateHandleDataUniqueId() {
    return this.LPo++;
  }
  static async AsyncPlayCameraAnimation(a, e, t) {
    if (this.pPo) {
      this.pPo.StopUiCameraAnimation();
    } else {
      this.pPo = new UiCameraAnimation_1.UiCameraAnimation();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayCameraAnimationStart, a, e, t);
    return this.pPo.AsyncPlayUiCameraAnimation(a, e, t);
  }
  static PlayCameraAnimationFromCurrent(a, e) {
    var t = this.GetLastHandleData();
    this.PushCameraHandleByHandleName(a, true, true, e);
    return t;
  }
  static PlayBackCurrent(a = UiCameraAnimationDefine_1.DEFAULT_BLEND_NAME) {
    const e = this.CurrentCameraHandle?.GetHandleData();
    var t;
    if (e) {
      if (!(t = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(a)) || t.Time <= 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "没有混合配置或播放界面摄像机动画时间<=0，直接激活镜头", ["blendName", a]);
        }
        this.ActivateCameraHandle(e, false, false);
      } else {
        this.AsyncPlayCameraAnimation(e, e, a).then(a => {
          if (a.FinishType === 0) {
            this.ActivateCameraHandle(e);
          }
        }, () => {});
      }
    }
  }
  static StopUiCameraAnimation() {
    if (this.pPo) {
      this.pPo.StopUiCameraAnimation();
      this.pPo = undefined;
    }
  }
  static Tick(a) {
    a *= Time_1.Time.InverseSelfCenteredTimeDilation ?? 1;
    if (this.pPo) {
      this.pPo.Tick(a);
    }
    if (this.CurrentCameraHandle) {
      this.CurrentCameraHandle.Tick(a);
    }
  }
  static BroadUiCameraSequenceEvent(a) {
    UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraSequenceComponent_1.UiCameraSequenceComponent).ExecuteUiCameraSequenceEvent(a);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, a);
  }
  static IsActivate() {
    return this.lPo.Size > 0;
  }
  static GetHandleDataStack() {
    return this.lPo;
  }
  static GetTargetActor(a) {
    switch (a) {
      case 2:
        return ModelManager_1.ModelManager.InteractionModel.CurrentInteractUeActor;
      case 1:
        return ControllerHolder_1.ControllerHolder.CharacterController.GetActor(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
      case 3:
        return UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      case 4:
        return SkeletalObserverManager_1.SkeletalObserverManager.GetLastSkeletalObserver()?.Model?.CheckGetComponent(1)?.Actor;
      case 5:
        return UiSceneManager_1.UiSceneManager.GetHandBookCaseActor();
      case 6:
        return UiSceneManager_1.UiSceneManager.GetGliderSkeletalHandle()?.Model?.CheckGetComponent(1)?.Actor;
      default:
        return;
    }
  }
  static GetTargetBodyKey(a) {
    switch (a) {
      case 1:
        return this.o51();
      case 3:
        return this.n51();
      case 2:
        return this.s51();
      case 7:
        return this.a51();
      default:
        return;
    }
  }
  static o51() {
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (a) {
      a = a.GetConfigId;
      a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a);
      if (a) {
        return a.RoleBody;
      }
    }
  }
  static n51() {
    var a = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (a) {
      var e = a.Model?.GetComponent(15);
      if (e) {
        e = e.GetCurrentMorphData();
        if (e) {
          return e.RoleBody;
        }
      }
      e = a.Model?.CheckGetComponent(13);
      a = e.RoleConfigId;
      e = e.RoleSkinId;
      a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a);
      if (a) {
        if (e < 0) {
          return a.RoleBody;
        } else {
          return ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(e).GetRoleBody();
        }
      }
    }
  }
  static s51() {
    var a = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    var a = EntitySystem_1.EntitySystem.Get(a);
    if (a?.Valid) {
      switch (a.GetComponent(0).GetModelConfig().体型类型) {
        case 0:
          return;
        case 6:
          return "FemaleM";
        case 5:
          return "FemaleMS";
        case 4:
          return "FemaleS";
        case 7:
          return "FemaleXL";
        case 2:
          return "MaleM";
        case 1:
          return "MaleS";
        case 3:
          return "MaleXL";
        case 8:
          return "ShopHand";
        case 9:
          return "ShopStore";
        case 10:
          return "ShopDoll";
        case 11:
          return "ShopPhonograph";
        case 12:
          return "ShopPicture";
        default:
          return;
      }
    }
  }
  static a51() {
    var a = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(ModelManager_1.ModelManager.FishingModel.DockId)?.SailingPoint;
    if (a) {
      switch (a) {
        case 1:
          return "FishingShipOne";
        case 2:
          return "FishingShipTwo";
        case 3:
          return "FishingShipThree";
        case 4:
          return "FishingShipFour";
        default:
          return;
      }
    }
  }
  static GetTargetActorSkeletalMesh(a, e = 0) {
    switch (a) {
      case 2:
        var t = ModelManager_1.ModelManager.InteractionModel.CurrentInteractUeActor;
        if (t) {
          return t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
        } else {
          return undefined;
        }
      case 1:
        t = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
        if (t) {
          return t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
        } else {
          return undefined;
        }
      case 3:
        t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
        if (t) {
          return t.Model?.CheckGetComponent(1)?.MainMeshComponent;
        } else {
          return undefined;
        }
      case 4:
        return SkeletalObserverManager_1.SkeletalObserverManager.GetLastSkeletalObserver()?.Model?.CheckGetComponent(1)?.MainMeshComponent;
      case 5:
        t = UiSceneManager_1.UiSceneManager.GetHandBookVision();
        if (t) {
          return t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
        } else {
          return undefined;
        }
      case 6:
        return UiSceneManager_1.UiSceneManager.GetGliderSkeletalHandle()?.Model?.CheckGetComponent(1)?.MainMeshComponent;
      default:
        return;
    }
  }
  static yPo() {
    this.EnablePlayerActor();
    this.EnableCustomCreatureActor();
    Global_1.Global.BaseCharacter?.SetDitherEffect(1, 2);
  }
  static DisablePlayerActor() {
    var a;
    var e;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid) {
      if ((t = t.Entity)?.Valid) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "Ui镜头隐藏玩家Actor");
        }
        if (a = t.GetComponent(1)) {
          e = t.Id;
          if (this.IPo.has(e)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CameraAnimation", 58, "已经隐藏过对应的玩家Actor", ["entityId", e], ["PlayerActorDisableHandleIdMap", this.IPo]);
            }
          } else {
            e = a.DisableActor("Ui镜头Sequence中隐藏角色");
            this.IPo.set(t.Id, e);
          }
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "Ui镜头隐藏玩家Actor-失败，因为找不到当前玩家Entity");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "Ui镜头隐藏玩家Actor-失败，因为找不到当前玩家EntityHandle");
    }
  }
  static IsDisablePlayer() {
    return this.IsActivate() && this.IPo.size > 0;
  }
  static EnablePlayerActor() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "Ui镜头在清理表现时显示玩家Actor", ["DisableHandleId", this.IPo]);
    }
    for (var [a, e] of this.IPo) {
      var t = EntitySystem_1.EntitySystem.Get(a);
      if (!t?.Valid) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "Ui镜头在清理表现时显示玩家Actor-失败，因为找不到当前玩家Entity", ["EntityId", a]);
        }
        return;
      }
      t = t.GetComponent(1);
      if (t) {
        t.EnableActor(e);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "Ui镜头在清理表现时显示玩家Actor-失败，因为当前玩家实体找不到BaseActorComponent", ["EntityId", a]);
      }
    }
    this.IPo.clear();
  }
  static DisableCustomCreatureActor(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid) {
      var i = t.Entity.GetComponent(0);
      if (i) {
        i = i.CustomServerEntityIds;
        if (!(e > i.length) && e !== 0) {
          var t = t.Entity.Id;
          var r = i[e - 1];
          var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
          if (r?.Valid) {
            var n = r.Entity.GetComponent(1);
            if (n) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 4, "隐藏伴生物", ["customServerEntityIds", i], ["customEntity", r.Id]);
              }
              let a = this.TPo.get(t);
              if (!a) {
                a = new Map();
                this.TPo.set(t, a);
              }
              if (!a.has(e)) {
                i = n.DisableActor("Ui镜头Sequence中隐藏角色伴生物");
                a.set(e, i);
              }
            }
          }
        }
      }
    }
  }
  static EnableCustomCreatureActor() {
    for (var [a, e] of this.TPo) {
      a = EntitySystem_1.EntitySystem.Get(a).GetComponent(0);
      if (!a) {
        return;
      }
      var t;
      var i;
      var r = a.CustomServerEntityIds;
      for ([t, i] of e) {
        var n = r[t - 1];
        var n = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
        if (!n) {
          return;
        }
        var o = n.Entity.GetComponent(1);
        if (!o) {
          return;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 4, "显示伴生物", ["customServerEntityIds", r], ["customEntity", n.Id]);
        }
        o.EnableActor(i);
      }
    }
    this.TPo.clear();
  }
  static ResetFightCameraRotation() {
    var a;
    if (!!Global_1.Global.BaseCharacter && !(a = CameraController_1.CameraController.FightCamera.LogicComponent).CameraGuideController?.IsLockCameraInput()) {
      a.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator());
      a.ResetFightCameraLogic(false);
    }
  }
}
(exports.UiCameraAnimationManager = UiCameraAnimationManager).LPo = 0;
UiCameraAnimationManager.aPo = new Map();
UiCameraAnimationManager.SAl = new Set();
UiCameraAnimationManager.lPo = new Stack_1.Stack();
UiCameraAnimationManager.CurrentCameraHandle = undefined;
UiCameraAnimationManager.pPo = undefined;
UiCameraAnimationManager.EPo = undefined;
UiCameraAnimationManager.LoadingViewCameraAnimationLength = 0;
UiCameraAnimationManager.LoadingViewManualFocusDistance = 0;
UiCameraAnimationManager.LoadingViewAperture = undefined;
UiCameraAnimationManager.IPo = new Map();
UiCameraAnimationManager.TPo = new Map();
UiCameraAnimationManager.UiCamera = undefined;
UiCameraAnimationManager.UiCameraSpringStructure = undefined;
UiCameraAnimationManager.UiCameraPostEffectComponent = undefined;
UiCameraAnimationManager.UiCameraSequenceComponent = undefined;
UiCameraAnimationManager.UiCameraDebugTool = undefined; //# sourceMappingURL=UiCameraAnimationManager.js.map