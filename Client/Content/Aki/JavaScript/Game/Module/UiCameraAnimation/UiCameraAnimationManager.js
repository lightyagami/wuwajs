"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraAnimationManager = undefined;
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
const ModelManager_1 = require("../../Manager/ModelManager");
const UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraSequenceComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraSequenceComponent");
const UiCameraDebugTool_1 = require("../UiCamera/UiCameraDebugTool");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraSpringStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraSpringStructure");
const UiCameraAnimation_1 = require("./UiCameraAnimation");
const UiCameraAnimationDefine_1 = require("./UiCameraAnimationDefine");
const UiCameraAnimationHandle_1 = require("./UiCameraAnimationHandle");
const UiCameraHandleData_1 = require("./UiCameraContext/UiCameraHandleData");
const UiCameraMappingData_1 = require("./UiCameraContext/UiCameraMappingData");
const UiCameraTargetTypeNpc_1 = require("./UiCameraTargetType/UiCameraTargetTypeNpc");
const UiCameraTargetTypePlayer_1 = require("./UiCameraTargetType/UiCameraTargetTypePlayer");
const UiCameraTargetTypeSailDock_1 = require("./UiCameraTargetType/UiCameraTargetTypeSailDock");
const UiCameraTargetTypeUiGlider_1 = require("./UiCameraTargetType/UiCameraTargetTypeUiGlider");
const UiCameraTargetTypeUiSceneRole_1 = require("./UiCameraTargetType/UiCameraTargetTypeUiSceneRole");
const UiCameraTargetTypeUiSceneSkeletal_1 = require("./UiCameraTargetType/UiCameraTargetTypeUiSceneSkeletal");
const UiCameraTargetTypeUiVisionHandBook_1 = require("./UiCameraTargetType/UiCameraTargetTypeUiVisionHandBook");
const UiCameraTargetTypeUiSceneHulu_1 = require("./UiCameraTargetType/UiCameraTargetTypeUiSceneHulu");
class UiCameraAnimationManager {
  static Initialize() {
    this.LoadingViewCameraAnimationLength = CommonParamById_1.configCommonParamById.GetIntConfig("LoadingViewCameraAnimationLength");
    this.LoadingViewManualFocusDistance = CommonParamById_1.configCommonParamById.GetFloatConfig("LoadingViewManualFocusDistance");
    this.LoadingViewAperture = CommonParamById_1.configCommonParamById.GetFloatConfig("LoadingViewAperture");
    this.nPo();
    this.Sxd();
  }
  static Clear() {
    this.ClearDisplay();
    this.sPo();
    this.Mxd.clear();
  }
  static nPo() {
    for (const i of ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetAllUiCameraMappingConfig()) {
      var a = new UiCameraMappingData_1.UiCameraMappingData(i, false);
      this.aPo.set(i.ViewName, a);
    }
    for (const t of ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetAllChildUiCameraMappingConfig()) {
      var e = new UiCameraMappingData_1.UiCameraMappingData(t, true);
      this.aPo.set(t.ViewName, e);
    }
  }
  static Sxd() {
    this.Mxd.set(1, new UiCameraTargetTypePlayer_1.UiCameraTargetTypePlayer());
    this.Mxd.set(2, new UiCameraTargetTypeNpc_1.UiCameraTargetTypeNpc());
    this.Mxd.set(3, new UiCameraTargetTypeUiSceneRole_1.UiCameraTargetTypeUiSceneRole());
    this.Mxd.set(4, new UiCameraTargetTypeUiSceneSkeletal_1.UiCameraTargetTypeUiSceneSkeletal());
    this.Mxd.set(5, new UiCameraTargetTypeUiVisionHandBook_1.UiCameraTargetTypeUiVisionHandBook());
    this.Mxd.set(6, new UiCameraTargetTypeUiGlider_1.UiCameraTargetTypeUiGlider());
    this.Mxd.set(7, new UiCameraTargetTypeSailDock_1.UiCameraTargetTypeSailDock());
    this.Mxd.set(8, new UiCameraTargetTypeUiSceneHulu_1.UiCameraTargetTypeUiSceneHulu());
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
    for (var i = a.UniqueId; e && e.UniqueId !== i;) {
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
    var i = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(e.ViewName);
    var t = [];
    let r = false;
    for (const n of this.lPo) {
      if (n.UniqueId === a) {
        t.push(n);
        r = true;
      } else if (r) {
        if (!this.dPo(i, n.ViewName) && e.ViewName !== n.ViewName) {
          break;
        }
        t.push(n);
      }
    }
    for (const o of t) {
      this.lPo.Delete(o);
    }
    return true;
  }
  static dPo(a, e) {
    for (const i of a) {
      if (i.ChildViewName === e) {
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
  static ActivateCameraHandle(a, e = true, i = true) {
    if (this.CurrentCameraHandle) {
      this.CurrentCameraHandle.Deactivate();
    } else {
      this.CurrentCameraHandle = this.CPo();
    }
    this.CurrentCameraHandle.Activate(a, e, i);
  }
  static fPo(e, i = true, t = true) {
    if (this.IsPlayingAnimation()) {
      this.pPo.WaitCameraAnimationFinished().then(a => {
        if (a.FinishType === 0) {
          this.ActivateCameraHandle(e, i, t);
        }
      }, () => {});
    } else {
      this.ActivateCameraHandle(e, i, t);
    }
  }
  static PushCameraHandleByOpenView(e, i, t = true) {
    if (UiCameraAnimationManager.CanPushCameraHandle(e)) {
      var r = UiCameraAnimationManager.GetLastHandleData();
      if (!r || r.ViewName !== e && r.UniqueId !== i) {
        if (i) {
          var n = this.mPo(i);
          if (n) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CameraAnimation", 58, "此界面已经入栈,直接返回", ["PushHandleData", n.ToString()]);
            }
            return;
          }
        }
        n = UiCameraHandleData_1.UiCameraHandleData.NewByView(e, i);
        let a = undefined;
        var o = r?.ViewName;
        if (o) {
          a = this.GetBlendName(o, e);
        }
        this.PushCameraHandle(n, t, true, a, true);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "此界面已经在栈顶", ["PushHandleData", r?.ToString()], ["viewId", i]);
      }
    }
  }
  static PushCameraHandleByHandleName(a, e = true, i = true, t = UiCameraAnimationDefine_1.DEFAULT_BLEND_NAME, r = false, n = undefined, o) {
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
      this.PushCameraHandle(o, e, i, t, r, n);
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CameraAnimation", 58, "镜头动画的HandleName为空，镜头动画异常");
    }
  }
  static PushCameraHandle(a, e = true, i = true, t, r = false, n = undefined) {
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
      this.MPo(a, o, e, i, t, n);
    }
  }
  static PopCameraHandleByCloseView(a, e, i, t = true) {
    if (UiCameraAnimationManager.CanPushCameraHandle(a)) {
      if (t) {
        t = this.GetBlendName(a, e);
        e = this.mPo(i);
        this.PopCameraHandle(e, t);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "仅删除镜头状态，不做任何表现", ["closeViewName", a], ["closeViewId", i]);
        }
        this.cPo(i);
      }
    }
  }
  static PopCameraHandle(a, e) {
    var i;
    var t;
    if (a) {
      i = this.GetLastHandleData();
      t = this._Po(a);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------出栈", ["popHandleData", a.ToString()], ["TopHandleData", t?.ToString()], ["blendName", e]);
      }
      this.n__(t);
      this.StopUiCameraAnimation();
      this.MPo(t, i, e !== undefined, true, e);
    } else {
      this.ClearDisplay();
    }
  }
  static n__(a) {
    var e;
    var i;
    if (a) {
      e = a.ViewName;
      if (!StringUtils_1.StringUtils.IsEmpty(e)) {
        i = (e = UiCameraAnimationManager.GetCameraMappingData(e))?.GetUiCameraMappingConfig();
        if (e && i?.BodyTargetType !== 0) {
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
  static MPo(a, e, i = true, t = true, r, n = undefined) {
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
        this.fPo(a, i, t);
        return 3;
      } else if (e) {
        if (i) {
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
        this.fPo(a, i, t);
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
    var i = a.FromHandleData;
    var t = a.ToHandleData;
    if (a.FinishType === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------入栈动画结束", ["LastHandleData", i.ToString()], ["PushHandleData", t.ToString()], ["FinishType", a.FinishType]);
      }
      this.ActivateCameraHandle(t, false, false);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "镜头状态数据------入栈动画被停止", ["LastHandleData", i.ToString()], ["PushHandleData", t.ToString()], ["FinishType", a.FinishType]);
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
    var i;
    var t;
    if (this.CurrentCameraHandle && !this.CurrentCameraHandle.GetIsPendingRevert() && (i = this.CurrentCameraHandle.GetHandleData())) {
      t = i.ViewName;
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        if (t = UiCameraAnimationManager.GetCameraMappingData(t)) {
          i.HandleName = t.GetSourceHandleName();
          i.Refresh();
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "重新激活镜头状态", ["handleData", i.ToString()]);
      }
      this.CurrentCameraHandle.Activate(i, a, e);
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
  static async AsyncPlayCameraAnimation(a, e, i) {
    if (this.pPo) {
      this.pPo.StopUiCameraAnimation();
    } else {
      this.pPo = new UiCameraAnimation_1.UiCameraAnimation();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayCameraAnimationStart, a, e, i);
    return this.pPo.AsyncPlayUiCameraAnimation(a, e, i);
  }
  static PlayCameraAnimationFromCurrent(a, e) {
    var i = this.GetLastHandleData();
    this.PushCameraHandleByHandleName(a, true, true, e);
    return i;
  }
  static PlayBackCurrent(a = UiCameraAnimationDefine_1.DEFAULT_BLEND_NAME) {
    const e = this.CurrentCameraHandle?.GetHandleData();
    var i;
    if (e) {
      if (!(i = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(a)) || i.Time <= 0) {
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
    a = this.Mxd.get(a);
    if (a) {
      return a.GetTargetActor();
    }
  }
  static GetTargetBodyKey(a) {
    a = this.Mxd.get(a);
    if (a) {
      return a.GetTargetBodyKey();
    }
  }
  static GetTargetActorSkeletalMesh(a, e = 0) {
    a = this.Mxd.get(a);
    if (a) {
      return a.GetTargetSkeletalMesh();
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
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (i?.Valid) {
      if ((i = i.Entity)?.Valid) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "Ui镜头隐藏玩家Actor");
        }
        if (a = i.GetComponent(1)) {
          e = i.Id;
          if (this.IPo.has(e)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CameraAnimation", 58, "已经隐藏过对应的玩家Actor", ["entityId", e], ["PlayerActorDisableHandleIdMap", this.IPo]);
            }
          } else {
            e = a.DisableActor("Ui镜头Sequence中隐藏角色");
            this.IPo.set(i.Id, e);
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
      var i = EntitySystem_1.EntitySystem.Get(a);
      if (!i?.Valid) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "Ui镜头在清理表现时显示玩家Actor-失败，因为找不到当前玩家Entity", ["EntityId", a]);
        }
        return;
      }
      i = i.GetComponent(1);
      if (i) {
        i.EnableActor(e);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "Ui镜头在清理表现时显示玩家Actor-失败，因为当前玩家实体找不到BaseActorComponent", ["EntityId", a]);
      }
    }
    this.IPo.clear();
  }
  static DisableCustomCreatureActor(e) {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (i?.Valid) {
      var t = i.Entity.GetComponent(0);
      if (t) {
        t = t.CustomServerEntityIds;
        if (!(e > t.length) && e !== 0) {
          var i = i.Entity.Id;
          var r = t[e - 1];
          var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
          if (r?.Valid) {
            var n = r.Entity.GetComponent(1);
            if (n) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 4, "隐藏伴生物", ["customServerEntityIds", t], ["customEntity", r.Id]);
              }
              let a = this.TPo.get(i);
              if (!a) {
                a = new Map();
                this.TPo.set(i, a);
              }
              if (!a.has(e)) {
                t = n.DisableActor("Ui镜头Sequence中隐藏角色伴生物");
                a.set(e, t);
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
      var i;
      var t;
      var r = a.CustomServerEntityIds;
      for ([i, t] of e) {
        var n = r[i - 1];
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
        o.EnableActor(t);
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
UiCameraAnimationManager.UiCameraDebugTool = undefined;
UiCameraAnimationManager.Mxd = new Map(); //# sourceMappingURL=UiCameraAnimationManager.js.map