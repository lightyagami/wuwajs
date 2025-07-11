"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraAnimationController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiCameraAnimationManager_1 = require("./UiCameraAnimationManager");
class UiCameraAnimationController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenTabView, this.GAo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnViewLoadCompleted, this.NAo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetModuleAfterResetToBattleView, this.Vya);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles, this.kAo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectedRoleChanged, this.Y2e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleMorphTypeChanged, this.r51);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiSceneLoaded, this.FAo);
    UiCameraAnimationManager_1.UiCameraAnimationManager.Initialize();
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenTabView, this.GAo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnViewLoadCompleted, this.NAo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetModuleAfterResetToBattleView, this.Vya);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles, this.kAo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectedRoleChanged, this.Y2e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleMorphTypeChanged, this.r51);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiSceneLoaded, this.FAo);
    this.VAo();
    UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
    return true;
  }
  static OnLeaveLevel() {
    this.VAo();
    UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
    return true;
  }
  static HAo(e, a, n) {
    if (UiCameraAnimationManager_1.UiCameraAnimationManager.CanPushCameraHandle(a)) {
      this.VAo();
      this.jAo = a;
      this.WAo = n;
      this.KAo = TimerSystem_1.GameplayTimerSystem.Delay(this.QAo, e);
    }
  }
  static VAo() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.KAo)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.KAo);
      this.jAo = undefined;
      this.WAo = undefined;
      this.KAo = undefined;
    }
  }
}
exports.UiCameraAnimationController = UiCameraAnimationController;
(_a = UiCameraAnimationController).jAo = "";
UiCameraAnimationController.WAo = undefined;
UiCameraAnimationController.KAo = undefined;
UiCameraAnimationController.PushCameraHandle = (e, a, n = true) => {
  if (e === "BattleView") {
    if (UiCameraAnimationManager_1.UiCameraAnimationManager.IsActivate()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CameraAnimation", 58, "当打开主界面时，Ui镜头栈有未抛出的数据，检查是否没有关闭界面，或手动播放了Ui镜头但没有手动抛出");
      }
      for (const t of UiCameraAnimationManager_1.UiCameraAnimationManager.GetHandleDataStack()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CameraAnimation", 58, "未抛出的Ui镜头数据", ["HandleName", t.HandleName], ["ViewName", t.ViewName]);
        }
      }
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
    }
  } else {
    var i = UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(e);
    if (i) {
      i = i.GetUiCameraDelayTime();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "当打开界面时", ["viewName", e], ["delayTime", i]);
      }
      if (i > 0) {
        UiCameraAnimationController.HAo(i, e, a);
      } else {
        UiCameraAnimationController.VAo();
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(e, a, n);
      }
    }
  }
};
UiCameraAnimationController.GAo = e => {
  var a = UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(e);
  if (a) {
    a = a.GetUiCameraDelayTime();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "当打开页签界面时", ["tabViewName", e], ["delayTime", a]);
    }
    if (a > 0) {
      UiCameraAnimationController.HAo(a, e);
    } else {
      UiCameraAnimationController.VAo();
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(e);
    }
  }
};
UiCameraAnimationController.PopCameraHandle = (e, a, n, i = true) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CameraAnimation", 58, "当隐藏界面时", ["viewName", e]);
  }
  UiCameraAnimationController.VAo();
  UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandleByCloseView(e, a?.Name, n, i);
};
UiCameraAnimationController.EnterUiCameraMode = () => {
  var e = UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera?.GetStructure();
  if (e) {
    e.Activate();
  }
  var e = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData();
  if (e) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.ActivateCameraHandle(e, false, false);
  }
};
UiCameraAnimationController.ExitUiCameraMode = () => {
  var e = UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera?.GetStructure();
  if (e) {
    e.Deactivate();
  }
  CameraController_1.CameraController.ExitCameraMode(2);
};
UiCameraAnimationController.DeepCopyCamera = e => {
  var a = UiCameraAnimationManager_1.UiCameraAnimationManager.GetCurrentCameraHandle();
  if (a) {
    a.DeepCopyCameraInfo(e);
  }
};
UiCameraAnimationController.NAo = e => {
  var a = UiCameraAnimationManager_1.UiCameraAnimationManager.GetCurrentCameraHandle();
  if (a && a.GetHandleData() && a.GetIsActivate() && a.GetViewName() === e && a.IsViewInLoading) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "当界面加载完成时,重新激活镜头状态");
    }
    UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle(false, true);
  }
};
UiCameraAnimationController.QAo = () => {
  UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(UiCameraAnimationController.jAo, _a.WAo);
  UiCameraAnimationController.VAo();
};
UiCameraAnimationController.SYi = () => {
  UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
};
UiCameraAnimationController.Vya = () => {
  UiCameraAnimationController.VAo();
  UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
  CameraController_1.CameraController.ExitCameraMode(2);
};
UiCameraAnimationController.JDe = () => {
  UiCameraAnimationController.VAo();
};
UiCameraAnimationController.kAo = () => {
  UiCameraAnimationController.VAo();
  UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
  CameraController_1.CameraController.ExitCameraMode(2);
};
UiCameraAnimationController.zpe = (e, a) => {
  var n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (n && a.Id === n.Id) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DeactivateCurrentCameraHandle();
  }
};
UiCameraAnimationController.GUe = (e, a, n) => {
  var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (i && a.Id === i.Id) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "当玩家角色添加实体时,重新激活镜头状态");
    }
    UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle();
  }
};
UiCameraAnimationController.Y2e = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CameraAnimation", 58, "当角色系统切换角色时,尝试重新激活镜头状态");
  }
  UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle();
};
UiCameraAnimationController.r51 = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CameraAnimation", 78, "当角色形态改变时,尝试重新激活镜头状态");
  }
  UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle();
};
UiCameraAnimationController.FAo = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CameraAnimation", 58, "当Ui场景加载完成时,尝试重新激活镜头状态");
  }
  UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle();
}; //# sourceMappingURL=UiCameraAnimationController.js.map