"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ELoadingPhase_1 = require("../../World/Define/ELoadingPhase");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const UiLoginSceneManager_1 = require("../UiComponent/UiLoginSceneManager");
const NormalLoadingViewGlobalData_1 = require("./Data/NormalLoadingViewGlobalData");
class LoadingController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    ModelManager_1.ModelManager.LoadingModel.Speed = ELoadingPhase_1.BASE_SPEED;
    return true;
  }
  static OnClear() {
    UE.NavigationSystemV1.SetGameLoadingFlag(GlobalData_1.GlobalData.GameInstance, false);
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(113, LoadingController.Svi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(113);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, LoadingController.SYi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, LoadingController.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, LoadingController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, LoadingController.yvi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, LoadingController.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, LoadingController.Ilt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, LoadingController.jUc);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, LoadingController.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, LoadingController.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, LoadingController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, LoadingController.yvi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, LoadingController.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, LoadingController.Ilt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, LoadingController.jUc);
  }
  static Eea() {
    UE.NavigationSystemV1.SetGameLoadingFlag(GlobalData_1.GlobalData.GameInstance, true);
  }
  static yea() {
    UE.NavigationSystemV1.SetGameLoadingFlag(GlobalData_1.GlobalData.GameInstance, false);
    ModelManager_1.ModelManager.LoadingModel.LastInstanceId = 0;
  }
  static UpdateUidViewShow() {
    var e = ModelManager_1.ModelManager.LoadingModel.IsShowUidView;
    if (UiManager_1.UiManager.IsViewOpen("UidView") !== e) {
      if (e) {
        UiManager_1.UiManager.OpenView("UidView");
      } else {
        UiManager_1.UiManager.CloseView("UidView");
      }
    }
    if ((!cpp_1.KuroApplication.IsBuildShipping() || cpp_1.KuroApplication.GetAppReleaseType() !== "Product") && UE.KuroLauncherLibrary.GetAppInternalUseType() !== "Marketing") {
      if (!UiManager_1.UiManager.IsViewOpen("MView")) {
        UiManager_1.UiManager.OpenView("MView");
      }
      if (!UiManager_1.UiManager.IsViewOpen("BcView") && BaseConfigController_1.BaseConfigController.GetRptIsOpen()) {
        UiManager_1.UiManager.OpenView("BcView");
      }
    }
  }
  static async Ivi() {
    var e;
    var a;
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities();
    for (const n of o) {
      if (n.Valid && (e = n.Entity.GetComponent(174))) {
        e.AddBuff(CharacterBuffIds_1.buffId.Invisible, {
          InstigatorId: e.CreatureDataId,
          Reason: "HandleRoleBuffChangeInLoading"
        });
      }
    }
    await NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.FinishPromise?.Promise;
    for (const r of o) {
      if (r.Valid && (a = r.Entity.GetComponent(174))) {
        a.RemoveBuff(CharacterBuffIds_1.buffId.Invisible, -1, "HandleRoleBuffChangeInLoading");
      }
    }
  }
  static async GameModeOpenLoading(e) {
    var a;
    if (NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.FirstProgressPromise) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 8, "Loading界面正在打开中");
      }
    } else {
      a = ModelManager_1.ModelManager.LoadingModel.GetIsLoginToWorld();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Loading", 8, "打开Loading界面", ["从登录界面进入大世界", a]);
      }
      if (a) {
        UiLoginSceneManager_1.UiLoginSceneManager.Destroy();
        await this.RequestLoadingConfigAsync();
      }
      LoadingController.OpenLoadingView(undefined, e);
    }
    await NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.FirstProgressPromise.Promise;
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "LeaveScene");
  }
  static async GameModeCloseLoading() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Loading", 8, "关闭Loading界面");
    }
    await LoadingController.CloseLoadingView();
    ModelManager_1.ModelManager.LoginModel.CleanCreateData();
  }
  static OpenLoadingView(a, o) {
    NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.CreateFirstProgressPromise();
    NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.CreateFinishPromisePromise();
    LoadingController.SetProgress(ELoadingPhase_1.OPENLOADING_END_PROGRESS, undefined, 1, true, false);
    ModelManager_1.ModelManager.LoadingModel.SetIsLoading(true);
    var e = ModelManager_1.ModelManager.LoadingModel.GetOpenLoadingViewName();
    UiManager_1.UiManager.OpenView(e, undefined, e => {
      a?.(e);
      LoadingController.SetProgress(ELoadingPhase_1.OPENLOADING_END_PROGRESS, () => {
        NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.FinishFirstProgressPromise();
        o?.(true);
      }, 1, false, false);
    });
  }
  static async CloseLoadingView() {
    this.SetProgress(ELoadingPhase_1.LOAD_FINISHED_PROGRESS, () => {
      NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.FinishEndPromise();
    }, ELoadingPhase_1.LOADED_SPEED_RATE);
    await NormalLoadingViewGlobalData_1.NormalLoadingViewGlobalData.FinishPromise?.Promise;
    ModelManager_1.ModelManager.LoadingModel.SetIsLoading(false);
  }
  static OpenFadeLoadingView(e) {
    UiManager_1.UiManager.OpenView("FadeLoadingView", undefined, e);
  }
  static CloseFadeLoadingView(e) {
    UiManager_1.UiManager.CloseView("FadeLoadingView", e);
  }
  static OpenVideoCenterView(e, a) {
    UiManager_1.UiManager.OpenView("PlotTransitionView", a, e);
  }
  static CloseVideoCenterView(e) {
    UiManager_1.UiManager.CloseView("PlotTransitionView", e);
  }
  static SetProgress(e, a = undefined, o = 1, n = false, r = true) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Loading", 16, "SetProgress", ["progress", e]);
    }
    var t = ModelManager_1.ModelManager.LoadingModel;
    if (a) {
      t.ReachHandleQueue.Push([e, a]);
    }
    if (n) {
      t.CurrentProgress = 0;
      t.ReachHandleQueue.Clear();
    }
    t.SpeedRate = o;
    t.NextProgress = e;
    t.NextProgress = Math.min(t.NextProgress, MathCommon_1.MathCommon.ProgressTotalValue);
    if (!r) {
      t.CurrentProgress = e;
    }
  }
  static AddProgress(e, a) {
    var o = ModelManager_1.ModelManager.LoadingModel;
    o.NextProgress = Math.min(o.NextProgress + e, a);
    o.NextProgress = Math.min(o.NextProgress, MathCommon_1.MathCommon.ProgressTotalValue);
    while (o.ReachHandleQueue.Size) {
      var n = o.ReachHandleQueue.Front;
      if (n[0] > o.CurrentProgress) {
        break;
      }
      o.ReachHandleQueue.Pop();
      n[1]();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 16, "AddProgress", ["progress", e], ["maxProgress", a]);
      }
    }
  }
  static async RequestLoadingConfigAsync() {
    var e = new Protocol_1.Aki.Protocol.oqc();
    var e = await Net_1.Net.CallAsync(21332, e);
    return !!e && (ModelManager_1.ModelManager.LoadingModel?.SetLoadingConfig(e.sqc), true);
  }
}
exports.LoadingController = LoadingController;
(_a = LoadingController).Svi = e => {
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLoadingNetDataDone);
};
LoadingController.nye = () => {
  _a.UpdateUidViewShow();
};
LoadingController.FWe = () => {
  LoadingController.yea();
};
LoadingController.SYi = () => {
  LoadingController.Eea();
};
LoadingController.bpr = () => {
  LoadingController.Eea();
};
LoadingController.Ilt = () => {
  LoadingController.yea();
};
LoadingController.jUc = e => {
  ModelManager_1.ModelManager.LoadingModel.LastInstanceId = e;
};
LoadingController.yvi = () => {
  if (ModelManager_1.ModelManager.LoadingModel.IsLoadingView) {
    _a.Ivi();
  }
}; //# sourceMappingURL=LoadingController.js.map