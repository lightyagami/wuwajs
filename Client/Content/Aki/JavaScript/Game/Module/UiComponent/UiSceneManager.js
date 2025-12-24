"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSceneManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stack_1 = require("../../../Core/Container/Stack");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const WorldController_1 = require("../../World/Controller/WorldController");
const DangoAbyssActorManager_1 = require("../Dango/DangoAbyss/DangoAbyssActorManager");
const SkeletalObserverManager_1 = require("../SkeletalObserver/SkeletalObserverManager");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const TsUiSceneDangoActor_1 = require("./TsUiSceneDangoActor");
const UiSceneDangoActorManager_1 = require("./UiSceneDangoActorManager");
const UiSceneRoleActorManager_1 = require("./UiSceneRoleActorManager");
class UiSceneManager {
  static Initialize() {
    GlobalData_1.GlobalData.SetUiState(0);
    UiSceneManager.CurUiSceneName = "";
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetModuleAfterResetToBattleView, UiSceneManager.fWi);
  }
  static OpenUiScene(e, a, r) {
    if (UiSceneManager.GetUiSceneLoadingState() === 1) {
      return false;
    }
    if (!GlobalData_1.GlobalData.World) {
      return false;
    }
    if (UiSceneManager.CurUiSceneName === e) {
      r?.();
    } else {
      if (UiSceneManager.CurUiSceneName !== "") {
        UiSceneManager.ForceCloseUiScene();
      }
      UiSceneManager.CurUiSceneName = e;
      UiSceneManager.CurSubUiSceneNameList = a ?? [];
      if (RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow) {
        var n = UE.KuroUiSceneSystem.GetKuroUiSceneSystem(GlobalData_1.GlobalData.World.GetWorld());
        var t = RenderModuleController_1.RenderModuleController.GetKuroUiSceneLoadOffset();
        if (n.GetUiSceneLoadingState(e) === 0) {
          n.PreloadUiScene(e, t.op_ToVector());
          RenderModuleController_1.RenderModuleController.UiSceneOffsetTransform.SetLocation(t);
          RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset = t;
          RenderModuleController_1.RenderModuleController.DebugInUiSceneRendering = true;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiSceneManager", 10, "进入3d ui 失败");
        }
        for (const i of a ?? []) {
          if (n.GetUiSceneLoadingState(i) === 0) {
            n.PreloadUiScene(i, t.op_ToVector());
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiSceneManager", 86, "进入3d ui 失败（子场景）");
          }
        }
        this.LoadSuccessFunction = r;
        GlobalData_1.GlobalData.SetUiState(1);
      } else {
        if (!UE.KuroGISystem.GetKuroGISystem(GlobalData_1.GlobalData.World.GetWorld()).Start3DUISceneRendering(e)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiSceneManager", 10, "进入3d ui 失败");
          }
        }
        this.LoadSuccessFunction = r;
        GlobalData_1.GlobalData.SetUiState(UiSceneManager.GetUiSceneLoadingState());
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiSceneStartLoad);
    }
    return true;
  }
  static CloseUiScene() {
    UiSceneManager.ForceCloseUiScene();
  }
  static ForceCloseUiScene() {
    this.gxo();
  }
  static ForceCloseUiSceneImmediately() {
    this.gxo();
  }
  static gxo() {
    if (!StringUtils_1.StringUtils.IsEmpty(UiSceneManager.CurUiSceneName)) {
      UiSceneManager.CurUiSceneName = "";
      if (RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow) {
        if (GlobalData_1.GlobalData.World) {
          RenderModuleController_1.RenderModuleController.DebugInUiSceneRendering = false;
          var e = UE.KuroUiSceneSystem.GetKuroUiSceneSystem(GlobalData_1.GlobalData.World.GetWorld());
          for (const r of UiSceneManager.CurSubUiSceneNameList ?? []) {
            if (!e.UnloadUiScene(r)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("UiSceneManager", 86, "退出3d ui 失败（子场景）");
              }
            }
          }
          UiSceneManager.CurSubUiSceneNameList.length = 0;
          var a = e.GetCurrentUiSceneRenderingSceneName();
          if (!e.UnloadUiScene(a)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiSceneManager", 10, "退出3d ui 失败");
            }
          }
          GlobalData_1.GlobalData.SetUiState(0);
        }
      } else if (GlobalData_1.GlobalData.World) {
        if (!UE.KuroGISystem.GetKuroGISystem(GlobalData_1.GlobalData.World.GetWorld()).End3DUISceneRendering()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiSceneManager", 10, "退出3d ui 失败");
          }
        }
        GlobalData_1.GlobalData.SetUiState(UiSceneManager.GetUiSceneLoadingState());
      }
      this.LoadSuccessFunction = undefined;
      if (!Info_1.Info.IsPcOrGamepadPlatform()) {
        GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.MOBILERESOLUTION);
        UE.LGUIBPLibrary.FreeUnusedResourcesInRenderTargetPool();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiSceneManager", 16, "退出UI场景时，还原r.ScreenPercentage为初始值，并调用FreeUnusedResourcesInRenderTargetPool清理RT");
        }
      }
    }
  }
  static GetUiSceneLoadingState() {
    if (GlobalData_1.GlobalData.World) {
      return UE.KuroGISystem.GetKuroGISystem(GlobalData_1.GlobalData.World.GetWorld()).GetUISceneRenderingState();
    } else {
      return 0;
    }
  }
  static Tick() {
    if (GlobalData_1.GlobalData.IsUiSceneLoading) {
      if (RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow) {
        var a = UE.KuroUiSceneSystem.GetKuroUiSceneSystem(GlobalData_1.GlobalData.World.GetWorld());
        var r = UiSceneManager.CurUiSceneName;
        let e = true;
        for (const o of UiSceneManager.CurSubUiSceneNameList) {
          var n;
          var t = a.GetUiSceneLoadingState(o);
          if (t === 2 && (n = a.AllStreamingLevelInfo.Get(o))) {
            n.SetLevelVisible(true);
          }
          if (t !== 3) {
            e = false;
            break;
          }
        }
        if (e) {
          if ((i = a.GetUiSceneLoadingState(r)) !== 2 || RenderModuleController_1.RenderModuleController.DebugStartShowingUiSceneRendering) {
            if (i === 3) {
              GlobalData_1.GlobalData.SetUiState(2);
              if (this.LoadSuccessFunction) {
                this.LoadSuccessFunction();
                if (!Info_1.Info.IsPcOrGamepadPlatform()) {
                  UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.TemporalAA.Sharpness 1.0");
                  if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformLow()) {
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 80");
                  } else {
                    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage 100");
                  }
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("UiSceneManager", 16, "进入UI场景时，将r.ScreenPercentage设置为100");
                  }
                }
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiSceneLoaded);
              RenderModuleController_1.RenderModuleController.DebugStartShowingUiSceneRendering = false;
            } else {
              GlobalData_1.GlobalData.SetUiState(1);
            }
          } else {
            a.StartUiSceneRendering(r);
            RenderModuleController_1.RenderModuleController.DebugStartShowingUiSceneRendering = true;
          }
        } else {
          GlobalData_1.GlobalData.SetUiState(1);
        }
      } else {
        var i = UiSceneManager.GetUiSceneLoadingState();
        if (i === 2) {
          GlobalData_1.GlobalData.SetUiState(2);
          if (this.LoadSuccessFunction) {
            this.LoadSuccessFunction();
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiSceneLoaded);
        } else {
          GlobalData_1.GlobalData.SetUiState(i);
        }
      }
    }
  }
  static fxo(e) {
    if (GlobalData_1.GlobalData.World) {
      return SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(e);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiSceneManager", 16, "SpawnSkeletalObserverHandle failed, GlobalData.World is null");
    }
  }
  static InitWeaponObserver(e = false) {
    e = e ? 4 : 3;
    e = UiSceneManager.fxo(e);
    this.pxo.Push(e);
    return e;
  }
  static GetWeaponObserver() {
    if (!this.pxo.Empty) {
      return this.pxo.Peek();
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 16, "[WeaponObserverStack]为空");
    }
  }
  static DestroyWeaponObserver(e) {
    if (!this.pxo.Empty) {
      this.pxo.Delete(e);
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(e);
    }
  }
  static DestroyAllWeaponObserver() {
    while (!this.pxo.Empty) {
      var e = this.pxo.Pop();
      this.DestroyWeaponObserver(e);
    }
  }
  static InitWeaponScabbardObserver() {
    var e = UiSceneManager.fxo(3);
    this.vxo.Push(e);
    return e;
  }
  static GetWeaponScabbardObserver() {
    if (!this.vxo.Empty) {
      return this.vxo.Peek();
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 16, "[WeaponScabbardStack]为空");
    }
  }
  static DestroyWeaponScabbardObserver(e) {
    if (!this.vxo.Empty) {
      this.vxo.Delete(e);
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(e);
    }
  }
  static DestroyAllWeaponScabbardObserver() {
    while (!this.vxo.Empty) {
      var e = this.vxo.Pop();
      this.DestroyWeaponScabbardObserver(e);
    }
  }
  static InitPhantomObserver() {
    if (UiSceneManager.Mxo !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiSceneManager", 16, "[PhantomObserver]重复初始化");
      }
    } else {
      UiSceneManager.Mxo = UiSceneManager.fxo(8);
    }
  }
  static GetPhantomObserver() {
    if (UiSceneManager.Mxo) {
      return UiSceneManager.Mxo;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 16, "[PhantomObserver]未初始化");
    }
  }
  static DestroyPhantomObserver() {
    if (UiSceneManager.Mxo) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.Mxo);
      UiSceneManager.Mxo = undefined;
    }
  }
  static InitHuluObserver() {
    UiSceneManager.VBd = UiSceneManager.fxo(6);
    return UiSceneManager.VBd;
  }
  static GetHuluObserver() {
    if (UiSceneManager.VBd) {
      return UiSceneManager.VBd;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 16, "[HuluObserver]未初始化");
    }
  }
  static DestroyHuluObserver() {
    if (UiSceneManager.VBd) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.VBd);
      UiSceneManager.VBd = undefined;
    }
  }
  static InitHandBookObserver() {
    if (UiSceneManager.Exo !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiSceneManager", 16, "[HandBookObserver]重复初始化");
      }
    } else {
      UiSceneManager.Exo = UiSceneManager.fxo(8);
    }
  }
  static GetHandBookObserver() {
    if (UiSceneManager.Exo) {
      return UiSceneManager.Exo;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 16, "[HandBookObserver]未初始化");
    }
  }
  static DestroyHandBookObserver() {
    if (UiSceneManager.Exo) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.Exo);
      UiSceneManager.Exo = undefined;
    }
  }
  static InitRoleSystemRoleActor(e) {
    var a = this.Sxo.Peek();
    if (a) {
      a.SetMoveOutActor();
    }
    var a = UiSceneRoleActorManager_1.UiSceneRoleActorManager.CreateUiSceneRoleActor(e);
    this.Sxo.Push(a);
    return a;
  }
  static GetRoleSystemRoleActor() {
    if (!this.Sxo.Empty) {
      return UiSceneManager.Sxo.Peek();
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 16, "[RoleSystemActorStack]为空");
    }
  }
  static HasRoleSystemRoleActor() {
    return !this.Sxo.Empty;
  }
  static HideRoleSystemRoleActor() {
    var e;
    if (!this.Sxo.Empty) {
      e = UiSceneManager.Sxo.Peek().Model;
      UiModelUtil_1.UiModelUtil.SetVisible(e, false);
    }
  }
  static ShowRoleSystemRoleActor() {
    var e;
    if (!this.Sxo.Empty) {
      e = UiSceneManager.Sxo.Peek().Model;
      UiModelUtil_1.UiModelUtil.SetVisible(e, true);
    }
  }
  static DestroyRoleSystemRoleActor(e) {
    let a = false;
    let r = false;
    if (!this.Sxo.Empty) {
      r = this.Sxo.Peek() === e;
      UiSceneManager.Sxo.Delete(e);
      e = e.GetRoleActorIndex();
      a = UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(e);
    }
    if (!this.Sxo.Empty && r) {
      const e = UiSceneManager.Sxo.Peek();
      e.SetMoveInActor();
    }
    return a;
  }
  static DestroyAllRoleSystemRoleActor() {
    while (!this.Sxo.Empty) {
      var e = this.Sxo.Pop().GetRoleActorIndex();
      UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(e);
    }
  }
  static InitGachaItemObserver() {
    if (UiSceneManager.MKt !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiSceneManager", 16, "[GachaItemObserver]重复初始化");
      }
    } else {
      UiSceneManager.MKt = UiSceneManager.fxo(3);
    }
  }
  static GetGachaItemObserver() {
    var e = UiSceneManager.MKt;
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 16, "[GachaItemObserver]未初始化");
    }
  }
  static DestroyGachaItemObserver() {
    if (UiSceneManager.MKt) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.MKt);
      UiSceneManager.MKt = undefined;
    }
  }
  static InitDreamLinkRoleSkeletalHandle() {
    if (UiSceneManager.deh !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("DreamLink", 34, "[DreamLinkRoleSkeletalHandle]重复初始化");
      }
    } else {
      UiSceneManager.deh = UiSceneManager.fxo(10);
    }
  }
  static GetDreamLinkRoleSkeletalHandle() {
    if (UiSceneManager.deh) {
      return UiSceneManager.deh;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 34, "[DreamLinkRoleSkeletalHandle]未初始化");
    }
  }
  static HasDreamLinkRoleSkeletalHandle() {
    return UiSceneManager.deh !== undefined;
  }
  static DestroyDreamLinkRoleSkeletalHandle() {
    if (UiSceneManager.deh) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.deh);
      UiSceneManager.deh = undefined;
    }
  }
  static InitDreamLinkWeaponSkeletalHandle() {
    var e = UiSceneManager.fxo(11);
    UiSceneManager.Hil.push(e);
    return e;
  }
  static HasDreamLinkWeaponSkeletalHandle() {
    return UiSceneManager.Hil.length > 0;
  }
  static DestroyAllDreamLinkWeaponSkeletalHandle() {
    for (const e of UiSceneManager.Hil) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(e);
    }
    UiSceneManager.Hil.length = 0;
  }
  static CreateHandBookVision(e) {
    var e = ActorSystem_1.ActorSystem.Get(e, new UE.TransformDouble(), undefined);
    var a = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"), 1);
    var r = e?.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    if (r) {
      for (let e = 0; e < r.Num(); e++) {
        r.Get(e).SetTickableWhenPaused(true);
      }
    }
    var n = e?.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
    if (n) {
      for (let e = 0; e < n.Num(); e++) {
        n.Get(e).SetTickableWhenPaused(true);
      }
    }
    var t = a.D_K2_GetActorLocation();
    var a = a.K2_GetActorRotation();
    e.D_K2_SetActorLocationAndRotation(t, a, false, undefined, false);
    if (this.yxo) {
      this.DestroyHandBookVision();
    }
    this.yxo = e;
  }
  static GetHandBookVision() {
    return this.yxo;
  }
  static GetHandBookCaseActor() {
    return UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"), 1);
  }
  static DestroyHandBookVision() {
    if (this.yxo) {
      this.yxo.PlayEnd();
      ActorSystem_1.ActorSystem.Put("UiSceneManager.DestroyHandBookVision", this.yxo);
      this.yxo = undefined;
    }
  }
  static InitVisionSkeletalHandle() {
    if (UiSceneManager.tHi !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Phantom", 16, "[VisionSkeletalHandle]重复初始化");
      }
    } else {
      UiSceneManager.tHi = UiSceneManager.fxo(8);
    }
  }
  static HasVisionSkeletalHandle() {
    return UiSceneManager.tHi !== undefined;
  }
  static GetVisionSkeletalHandle() {
    var e = UiSceneManager.tHi;
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 16, "[VisionSkeletalHandle]未初始化");
    }
  }
  static DestroyVisionSkeletalHandle() {
    if (UiSceneManager.tHi) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.tHi);
      UiSceneManager.tHi = undefined;
    }
  }
  static InitAbyssDangoObserver() {
    if (UiSceneManager.xwc !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiSceneManager", 27, "[AbyssDangoObserver]重复初始化");
      }
    } else {
      UiSceneManager.xwc = UiSceneManager.fxo(16);
    }
  }
  static GetAbyssDangoObserver() {
    var e = UiSceneManager.xwc;
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 27, "[AbyssDangoObserver]未初始化");
    }
  }
  static DestroyAbyssDangoObserver() {
    if (UiSceneManager.xwc) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.xwc);
      UiSceneManager.xwc = undefined;
    }
  }
  static InitLordSkeletalHandle() {
    if (UiSceneManager.oPl !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiSceneManager", 43, "[VisionSkeletalHandle]重复初始化");
      }
    } else {
      UiSceneManager.oPl = UiSceneManager.fxo(13);
    }
  }
  static HasLordSkeletalHandle() {
    return UiSceneManager.oPl !== undefined;
  }
  static GetLordSkeletalHandle() {
    var e = UiSceneManager.oPl;
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 43, "[LordSkeletalHandle]未初始化");
    }
  }
  static DestroyLordSkeletalHandle() {
    if (UiSceneManager.oPl) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.oPl);
      UiSceneManager.oPl = undefined;
    }
  }
  static InitDangoActor(e) {
    return UiSceneDangoActorManager_1.UiSceneDangoActorManager.CreateUiSceneDangoActor(e);
  }
  static DestroyDangoActor(e) {
    UiSceneDangoActorManager_1.UiSceneDangoActorManager.DestroyUiSceneDangoActor(e.GetActorIndex());
  }
  static RayTraceDangoActor(e) {
    var a = Global_1.Global.CharacterController;
    if (a) {
      var r = (0, puerts_1.$ref)(this.QTc);
      var n = (0, puerts_1.$ref)(this.KTc);
      this.AYe.Set(e.X, e.Y);
      var e = UE.GameplayStatics.DeprojectScreenToWorld(a, this.AYe, r, n);
      if (e) {
        var e = (0, puerts_1.$unref)(r);
        var r = (0, puerts_1.$unref)(n);
        this.PBa.DeepCopy(a.GetViewTarget().K2_GetActorLocation());
        ControllerHolder_1.ControllerHolder.CameraController.CameraLocation.Subtraction(this.PBa, this.PBa);
        var n = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
        n.DeepCopy(e);
        n.Addition(this.PBa, n);
        var a = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
        a.DeepCopy(e.op_Addition(r.op_Multiply(5000)));
        a.Addition(this.PBa, a);
        var e = ModelManager_1.ModelManager.TraceElementModel.GetLineTrace();
        e.WorldContextObject = GlobalData_1.GlobalData.World;
        e.ActorsToIgnore.Empty();
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, n);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, a);
        var r = TraceElementCommon_1.TraceElementCommon.LineTrace(e, "RayTraceDangoActor");
        if (r) {
          if ((n = e.HitResult.Actors.Get(0)) instanceof TsUiSceneDangoActor_1.default) {
            return n;
          } else {
            return undefined;
          }
        }
        e.ClearCacheData();
      }
    }
  }
  static async LoadDangoActorList(e, a) {
    if (e.length <= 0) {
      return [];
    }
    var r = [];
    const n = new CustomPromise_1.CustomPromise();
    const t = [];
    t.length = e.length;
    for (const c of e) {
      var i = UiSceneManager.InitDangoActor(c.UiModelUseWay);
      r.push(i);
      var o = i.Model.CheckGetComponent(1);
      var l = i.Model.CheckGetComponent(24);
      o?.SetTransformByTag(c.DangoPointCase);
      l?.LoadModelByDangoId(c.DangoId, true, () => {
        t.length--;
        if (t.length <= 0) {
          n.SetResult(undefined);
        }
      });
      a?.(i);
    }
    await n.Promise;
    return r;
  }
  static InitGliderSkeletalHandle() {
    if (UiSceneManager.Jkc !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiSceneManager", 43, "[GliderSkeletalHandle]重复初始化");
      }
    } else {
      UiSceneManager.Jkc = UiSceneManager.fxo(17);
    }
  }
  static HasGliderSkeletalHandle() {
    return UiSceneManager.Jkc !== undefined;
  }
  static GetGliderSkeletalHandle() {
    var e = UiSceneManager.Jkc;
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 43, "[GliderSkeletalHandle]未初始化");
    }
  }
  static DestroyGliderSkeletalHandle() {
    if (UiSceneManager.Jkc) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.Jkc);
      UiSceneManager.Jkc = undefined;
    }
  }
  static InitMotorSkeletalHandle() {
    if (UiSceneManager.$jm !== undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiSceneManager", 43, "[MotorSkeletalHandle]重复初始化");
      }
    } else {
      UiSceneManager.$jm = UiSceneManager.fxo(18);
    }
  }
  static GetMotorSkeletalHandle() {
    var e = UiSceneManager.$jm;
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiSceneManager", 43, "[LordSkeletalHandle]未初始化");
    }
  }
  static DestroyMotorSkeletalHandle() {
    if (UiSceneManager.$jm) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(UiSceneManager.$jm);
      UiSceneManager.$jm = undefined;
    }
  }
  static AddUiShowRoomShowActor(e, a) {
    var r = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BP_UIShowRoom"), 1);
    if (r) {
      e = (0, puerts_1.$ref)(e);
      r.AddShowActor(e, a);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiSceneManager", 10, "当前场景找不到反射地板蓝图类BP_UIShowRoom");
    }
  }
  static async LoadScene(e, a, r) {
    await WorldController_1.WorldController.StartWorldOriginInUiMode();
    const n = new CustomPromise_1.CustomPromise();
    if (!UiSceneManager.OpenUiScene(e, a, () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Role", 43, "3D UI场景加载成功！");
      }
      this.Ixo();
      r();
      n.SetResult(undefined);
    })) {
      r();
      n.SetResult(undefined);
    }
    await n.Promise;
    this.SetSceneFloorReflection(true, true);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.EnableKuroTranslucentPrePassStencilClear 1");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiSceneLastStepInLoadScene);
  }
  static async ExitScene() {
    await WorldController_1.WorldController.EndWorldOriginInUiMode();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.ForceUpdateCSMOnce 1");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.EnableKuroTranslucentPrePassStencilClear 0");
    this.SetSceneFloorReflection(false, false);
    UiSceneManager.CloseUiScene();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiSceneLastStepInExitScene);
  }
  static SetSceneFloorReflection(e, a) {
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsQualcommGpu() && Info_1.Info.IsPcPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.EnablePlanarReflection 0");
    } else if (this.Jeh !== e || !!a) {
      if (this.Jeh = e) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.EnablePlanarReflection 1");
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.EnablePlanarReflection 0");
      }
    }
  }
  static Ixo() {
    if (GlobalData_1.GlobalData.World) {
      ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(2, 0, 2, 0);
      ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(2, 0, 2, 0);
    }
  }
  static SetUiStartSequenceFrame(e) {
    if (this.Txo === 0) {
      this.Txo = e;
    }
  }
  static SetUiEndSequenceFrame(e) {
    if (this.Lxo === 0) {
      this.Lxo = e;
    }
  }
  static ClearUiSequenceFrame() {
    this.Txo = 0;
    this.Lxo = 0;
  }
  static GetUiStartSequenceFrame() {
    return this.Txo;
  }
  static GetUiEndSequenceFrame() {
    return this.Lxo;
  }
  static HideObserver(e, a) {
    if (e && (e = e.Model, UiModelUtil_1.UiModelUtil.SetVisible(e, false))) {
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, a);
    }
  }
  static HideObserverWithCallback(e, a, r) {
    var n;
    if (e && (n = e.Model, UiModelUtil_1.UiModelUtil.SetVisible(n, false))) {
      UiModelUtil_1.UiModelUtil.PlayEffectOnRootWithCallback(n, a, () => {
        r(e);
      });
    }
  }
  static GetActorByTag(e) {
    return UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e), 1);
  }
  static Clear() {
    SkeletalObserverManager_1.SkeletalObserverManager.ClearAllSkeletalObserver();
    UiSceneRoleActorManager_1.UiSceneRoleActorManager.ClearAllUiSceneRoleActor();
    UiSceneDangoActorManager_1.UiSceneDangoActorManager.ClearAllUiSceneDangoActor();
    DangoAbyssActorManager_1.DangoAbyssActorManager.ClearAllDangoSkeletalObserverHandle();
    UiSceneManager.DestroyGachaItemObserver();
    UiSceneManager.DestroyHandBookObserver();
    UiSceneManager.DestroyHandBookVision();
    UiSceneManager.DestroyPhantomObserver();
    UiSceneManager.DestroyAllRoleSystemRoleActor();
    UiSceneManager.DestroyAllWeaponObserver();
    UiSceneManager.DestroyAllWeaponScabbardObserver();
    UiSceneManager.DestroyHuluObserver();
  }
}
(exports.UiSceneManager = UiSceneManager).CurUiSceneName = "";
UiSceneManager.CurSubUiSceneNameList = [];
UiSceneManager.LoadSuccessFunction = undefined;
UiSceneManager.fWi = () => {
  UiSceneManager.ForceCloseUiSceneImmediately();
};
UiSceneManager.pxo = new Stack_1.Stack();
UiSceneManager.vxo = new Stack_1.Stack();
UiSceneManager.Mxo = undefined;
UiSceneManager.VBd = undefined;
UiSceneManager.Exo = undefined;
UiSceneManager.Sxo = new Stack_1.Stack();
UiSceneManager.MKt = undefined;
UiSceneManager.deh = undefined;
UiSceneManager.Hil = [];
UiSceneManager.yxo = undefined;
UiSceneManager.tHi = undefined;
UiSceneManager.xwc = undefined;
UiSceneManager.oPl = undefined;
UiSceneManager.QTc = new UE.Vector();
UiSceneManager.KTc = new UE.Vector();
UiSceneManager.PBa = Vector_1.Vector.Create();
UiSceneManager.AYe = new UE.Vector2D();
UiSceneManager.Jkc = undefined;
UiSceneManager.$jm = undefined;
UiSceneManager.Jeh = true;
UiSceneManager.Txo = 0;
UiSceneManager.Lxo = 0; //# sourceMappingURL=UiSceneManager.js.map