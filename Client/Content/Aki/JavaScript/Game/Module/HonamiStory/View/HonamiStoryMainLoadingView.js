"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMainLoadingView = undefined;
const UE = require("ue");
const LoadingViewBase_1 = require("../../Loading/View/LoadingViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class HonamiStoryMainLoadingView extends LoadingViewBase_1.LoadingViewBase {
  constructor() {
    super(...arguments);
    this.BGc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    super.OnStart();
    this.GetText(2)?.SetUIActive(false);
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetCurLoadingData();
    if (e) {
      if ((e = e).LoadingId && e.LoadingId > 0) {
        this.BGc = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLoadingPerformConfigById(e.LoadingId);
      }
      this.Adm();
    }
  }
  UpdateProgressRate(e) {}
  UpdateProgressValue(e) {
    this.SetTextProgressValue(0, e);
  }
  Adm() {
    var e;
    if (this.BGc) {
      e = this.BGc;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Tips);
      ModelManager_1.ModelManager.HonamiStoryModel.ClearCurLoadingData();
    }
  }
  OnLevelSequencePlayerBandStateChange(e) {
    this.PlaySequence("Start");
  }
}
exports.HonamiStoryMainLoadingView = HonamiStoryMainLoadingView;
//# sourceMappingURL=HonamiStoryMainLoadingView.js.map