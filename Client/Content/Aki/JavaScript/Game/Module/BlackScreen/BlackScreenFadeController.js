"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackScreenFadeController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiConfig_1 = require("../../Ui/Define/UiConfig");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const BlackScreenFadeView_1 = require("./BlackScreenFadeView");
class BlackScreenFadeController extends UiControllerBase_1.UiControllerBase {
  static set NeedGuarantee(e) {
    this.pu1 = e;
  }
  static get NeedGuarantee() {
    return this.pu1;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, this.n0t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiManagerInit, this.n0t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s);
  }
  static AddFadeBlackScreen(e, r, t, a, i) {
    ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise = new CustomPromise_1.CustomPromise();
    var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(n, 1) === 2) {
      LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BlackScreen", 45, "因复活界面打开,黑幕关闭");
      }
    } else if (a === undefined || ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(a)) {
      BlackScreenFadeController.NeedInputDis = true;
      ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag();
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("BlackScreen");
      if (r) {
        UiManager_1.UiManager.ResetToBattleView();
      }
      if (t) {
        UiManager_1.UiManager.AddOpenViewCheckFunction("All", this.CheckCanOpen, "黑幕期间禁止打开部分界面");
      }
      this.a0t(true);
      this.h0t(e);
      this.r0t.ShowItem();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BlackScreen", 45, "开始显示黑幕", ["标签", i]);
      }
    } else {
      LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BlackScreen", 45, "此玩法已经被销毁，不执行进入黑幕：", ["treeId", a]);
      }
    }
  }
  static RemoveFadeBlackScreen(e, r) {
    if (this.r0t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BlackScreen", 45, "触发结束黑屏", ["标签", r]);
      }
      this.a0t(false);
      this.h0t(e);
      this.r0t.HideItem();
    }
  }
  static OnClear() {
    if (this.r0t) {
      this.r0t.Destroy();
      this.r0t = undefined;
    }
    return true;
  }
  static ChangeColor(e) {
    if (this.r0t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BlackScreen", 45, "尝试改变黑幕的颜色", ["颜色", e]);
      }
      this.r0t.UpdateScreenColor(e);
    }
  }
  static ChangeColorByForce(e) {
    if (this.r0t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BlackScreen", 45, "尝试在已有黑幕的情况下改变黑幕的颜色", ["颜色", e]);
      }
      this.r0t.UpdateScreenColorAndChangeVisible(e);
    }
  }
  static ChangeAspect(e, r) {
    return !!this.r0t && this.r0t.ChangeAspect(e, r);
  }
  static h0t(e) {
    if (this.r0t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BlackScreen", 45, "改变黑幕的FadeTime");
      }
      this.r0t.SetFadeTime(e);
    }
  }
  static a0t(e) {
    if (this.r0t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BlackScreen", 45, "改变Fade变量");
      }
      this.r0t.SetIsFadeIn(e);
    }
  }
  static GetIsFadeIn() {
    return this.r0t?.GetActive() ?? false;
  }
  static GetNowReason() {
    return this.IZc;
  }
  static SetNowReason(e) {
    this.IZc = e;
  }
  static CheckIfInCommon() {
    return this.GetNowReason() === 0;
  }
}
exports.BlackScreenFadeController = BlackScreenFadeController;
(_a = BlackScreenFadeController).r0t = undefined;
BlackScreenFadeController.NeedInputDis = false;
BlackScreenFadeController.IZc = 20;
BlackScreenFadeController.l0t = new Set(["GuideTutorialView", "GuideTutorialPopView"]);
BlackScreenFadeController.pu1 = true;
BlackScreenFadeController.n0t = () => {
  if (!_a.r0t) {
    _a.r0t = new BlackScreenFadeView_1.BlackScreenFadeView();
    _a.r0t.CreateByResourceIdAsync("UiView_BlackFadeScreen_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Loading), true);
  }
};
BlackScreenFadeController.t$s = (e, r, t) => {
  if (e && r === 1 && t === 2 && (LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading(), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("BlackScreen", 45, "OnAllDead关闭黑幕");
  }
};
BlackScreenFadeController.CheckCanOpen = e => {
  var r = UiConfig_1.UiConfig.TryGetViewInfo(e);
  return !!r && (r.Type !== UiLayerType_1.ELayerType.Normal || !_a.l0t.has(e));
}; //# sourceMappingURL=BlackScreenFadeController.js.map