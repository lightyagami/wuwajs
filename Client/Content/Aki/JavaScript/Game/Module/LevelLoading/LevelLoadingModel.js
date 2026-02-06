"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelLoadingModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LoadModeManager_1 = require("../../../Core/Performance/LoadMode/LoadModeManager");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class LevelLoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CameraFadeShowPromise = undefined;
    this.CameraFadeHidePromise = undefined;
    this.Epi = undefined;
    this.Spi = undefined;
    this.ypi = false;
  }
  get IsLoading() {
    return this.ypi;
  }
  OnInit() {
    this.Epi = new Map();
    this.Spi = new Map();
    return true;
  }
  OnClear() {
    this.Epi?.clear();
    this.Epi = undefined;
    this.Spi?.clear();
    return !(this.Spi = undefined);
  }
  SetLoadingState(e) {
    if (this.ypi !== e) {
      if (this.ypi = e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Loading", 7, "LevelLoading:LoadingModeEnable");
        }
        LoadModeManager_1.LoadModeManager.SetLoadModeByReason("Loading", "LevelLoading");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddLevelLoadingTimeDilationTag);
      } else {
        this.Ipi();
        this.ClearLoadingPerforms();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Loading", 7, "LevelLoading:LoadingModeDisable");
        }
        if (LoadModeManager_1.LoadModeManager.IsReasonTargetNotDefault("LevelLoading")) {
          LoadModeManager_1.LoadModeManager.ResetLoadModeByReason("LevelLoading");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveLevelLoadingTimeDilationTag);
      }
    }
  }
  AddLoadingReason(e, o) {
    this.Epi.set(e, o);
    this.AddLoadingPerform(o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Loading", 18, "LevelLoading:AddLoadingReason", ["reason", e]);
    }
  }
  RemoveLoadingReason(e) {
    var o = this.GetPerformByReason(e);
    this.Epi.delete(e);
    this.RemoveLoadingPerform(o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Loading", 18, "LevelLoading:RemoveLoadingReason", ["reason", e]);
    }
  }
  AddLoadingPerform(e) {
    var o = this.Spi.get(e) ?? 0;
    this.Spi.set(e, ++o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Loading", 18, "LevelLoading:AddLoadingPerform", ["perform", e], ["count", o]);
    }
  }
  RemoveLoadingPerform(e) {
    var o = this.Spi.get(e);
    if (o && (this.Spi.set(e, --o), o <= 0) && (this.Spi.delete(e), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Loading", 18, "LevelLoading:RemoveLoadingPerform", ["perform", e]);
    }
  }
  GetPerformByReason(e) {
    return this.Epi.get(e);
  }
  Ipi() {
    this.Epi.clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Loading", 18, "LevelLoading:ClearLoadingReason");
    }
  }
  ClearLoadingPerforms() {
    this.Spi.clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Loading", 18, "LevelLoading:ClearLoadingPerforms");
    }
  }
  CheckLoadingPerformsEmpty() {
    return this.Spi.size === 0;
  }
  CheckLoadingPerformExist(e) {
    return !!this.IsLoading && !!this.Spi.get(e);
  }
  FinishCameraShowPromise() {
    this.CameraFadeShowPromise?.SetResult();
    this.CameraFadeShowPromise = undefined;
  }
  FinishCameraHidePromise() {
    this.CameraFadeHidePromise?.SetResult();
    this.CameraFadeHidePromise = undefined;
  }
}
exports.LevelLoadingModel = LevelLoadingModel;
//# sourceMappingURL=LevelLoadingModel.js.map