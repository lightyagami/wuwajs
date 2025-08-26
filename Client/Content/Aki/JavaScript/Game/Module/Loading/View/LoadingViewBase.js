"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingViewBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController");
const HotFixSceneManager_1 = require("../../../../Launcher/Ui/HotFix/HotFixSceneManager");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputManager_1 = require("../../../Ui/Input/InputManager");
const UiManager_1 = require("../../../Ui/UiManager");
const BackToGameDefine_1 = require("../../Login/BackToGameDefine");
const LoadingShowData_1 = require("../Data/LoadingShowData");
class LoadingViewBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Uvi = 0;
    this.zJc = 0;
    this.ShowData = undefined;
    this.wvi = false;
    this.fla = undefined;
    this.eu1 = e => {
      this.OnLevelSequencePlayerBandStateChange(e);
    };
  }
  OnBeforeCreate() {
    ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelSequencePlayerBandStateChange, this.eu1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelSequencePlayerBandStateChange, this.eu1);
  }
  OnStartImplementImplement() {
    InputManager_1.InputManager.SetShowCursor(true);
  }
  PPc() {
    this.ShowData = new LoadingShowData_1.LoadingShowData();
    this.ShowData.Initialize();
    let e = ConfigManager_1.ConfigManager.LoadingConfig.GetBroadcastImageConfig(this.ShowData.GetImageId()).Image;
    if (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()) {
      e = "/Game/Aki/UI/UIResources/Common/Image/BgCg/T_Bgloadin10_UI.T_Bgloadin10_UI";
    }
    if (ModelManager_1.ModelManager.LoadingModel.LoadingTexturePathOverride) {
      e = ModelManager_1.ModelManager.LoadingModel.LoadingTexturePathOverride;
    }
    ModelManager_1.ModelManager.LoadingModel.SetLoadingTexturePath(e);
    this.UpdateBgUi(e);
  }
  UpdateBgUi(e) {}
  OnStart() {
    var e;
    HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm();
    this.PPc();
    this.Nvi();
    this.ChangeShowTips();
    if (ModelManager_1.ModelManager.LoginModel.HasBackToGameData()) {
      e = ModelManager_1.ModelManager.LoginModel.GetBackToGameData();
      this.fla = new BackToGameDefine_1.BackToGameLoadingViewData();
      this.fla.LoadingWidget = e.LoadingWidget;
      this.fla.RebootFinished();
      ModelManager_1.ModelManager.LoginModel.RemoveBackToGameData();
    }
  }
  ChangeShowTips() {
    this.Uvi = 0;
    var e = this.ShowData.GetNextTip();
    if (e) {
      ModelManager_1.ModelManager.LoadingModel.SetLoadingTitle(e.Title);
      ModelManager_1.ModelManager.LoadingModel.SetLoadingTips(e.TipsText);
      this.UpdateShowTipsUi(e.Title, e.TipsText);
    }
  }
  UpdateShowTipsUi(e, i) {}
  OnAfterShow() {
    if (this.fla) {
      this.GetRootItem().SetUIActive(false);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LoadingViewOnAfterShow);
  }
  OnTick(e) {
    e /= TimeUtil_1.TimeUtil.InverseMillisecond;
    this.zJc += e;
    this.kvi(e);
    this.Uvi += e;
    if (this.Uvi >= ModelManager_1.ModelManager.LoadingModel.TipTime) {
      this.ChangeShowTips();
    }
  }
  kvi(e) {
    if (!this.wvi) {
      var i = ModelManager_1.ModelManager.LoadingModel;
      var t = MathCommon_1.MathCommon.ProgressTotalValue;
      var e = i.CurrentProgress + i.Speed * i.SpeedRate * e;
      var a = Math.min(e, i.NextProgress);
      var e = a / t;
      i.CurrentProgress = a;
      this.cEo(e, a);
      while (i.ReachHandleQueue.Size) {
        var n = i.ReachHandleQueue.Front;
        if (n[0] > a) {
          break;
        }
        i.ReachHandleQueue.Pop();
        n[1]();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Loading", 16, "TickProgress", ["progress", a]);
        }
      }
      e = this.ShowData.GetDuringTime();
      if (!this.wvi && t <= a && this.zJc >= e) {
        this.wvi = true;
        UiManager_1.UiManager.CloseView(this.Info.Name);
        this.fla?.Close();
        this.fla = undefined;
      }
    }
  }
  Nvi() {
    var e = ModelManager_1.ModelManager.LoadingModel.CurrentProgress;
    var i = e / MathCommon_1.MathCommon.ProgressTotalValue;
    this.cEo(i, e);
  }
  cEo(e, i) {
    this.fla?.SetProgress(e);
    this.UpdateProgressRate(e);
    this.UpdateProgressValue(i);
  }
  OnLevelSequencePlayerBandStateChange(e) {}
  OnBeforeDestroyImplement() {
    var e = ModelManager_1.ModelManager.LoadingModel;
    if (e) {
      e.SetIsLoadingView(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
      while (e.ReachHandleQueue.Size) {
        e.ReachHandleQueue.Pop()[1]();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Loading", 16, "OnBeforeDestroyImplement", ["loadingModel.ReachHandleQueue.Size", e.ReachHandleQueue.Size]);
        }
      }
    }
  }
  OnAfterDestroy() {
    this.fla?.Close();
  }
  SetTextProgressValue(e, i, t = "") {
    i = Math.round(i);
    this.GetText(e).SetText("" + i + t);
  }
  SetTextureProgressRate(e, i) {
    this.GetTexture(e).SetFillAmount(i);
  }
}
exports.LoadingViewBase = LoadingViewBase;
//# sourceMappingURL=LoadingViewBase.js.map