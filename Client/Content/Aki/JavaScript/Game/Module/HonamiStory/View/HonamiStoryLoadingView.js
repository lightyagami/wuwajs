"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLoadingView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LoadingViewBase_1 = require("../../Loading/View/LoadingViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class HonamiStoryLoadingView extends LoadingViewBase_1.LoadingViewBase {
  constructor() {
    super(...arguments);
    this.BGc = undefined;
    this._9m = () => {
      if (this.BGc && this.BGc.StartAudioEvent !== "") {
        AudioSystem_1.AudioSystem.PostEvent(this.BGc.StartAudioEvent);
      }
    };
    this.u9m = () => {
      if (this.BGc && this.BGc.EndAudioEvent !== "") {
        AudioSystem_1.AudioSystem.PostEvent(this.BGc.EndAudioEvent);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    var i;
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetCurLoadingData();
    if (e) {
      if ((e = e).LoadingId && e.LoadingId > 0) {
        this.BGc = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLoadingPerformConfigById(e.LoadingId);
      } else if (e.Timing && e.Timing > 0) {
        if (e.BtId && e.BtId > 0) {
          this.BGc = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLoadingPerformConfigByBtAndTime(e.BtId, e.Timing);
        } else {
          i = (e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLoadingPerformConfigListByTiming(e.Timing)).length;
          i = Math.floor(Math.random() * i);
          this.BGc = e[i];
        }
      }
      this.UiViewSequence.AddSequenceStartEvent("Start", this._9m);
      this.UiViewSequence.AddSequenceStartEvent("Close", this.u9m);
      this.upm();
    }
  }
  UpdateProgressRate(i) {}
  UpdateProgressValue(i) {
    this.SetTextProgressValue(1, i);
  }
  upm() {
    if (this.BGc) {
      var i = this.BGc;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Title);
      var e = !StringUtils_1.StringUtils.IsBlank(i.Tips);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Tips);
      }
      this.GetText(3).SetUIActive(e);
      this.GetItem(4).SetUIActive(false);
      this.GetItem(5).SetUIActive(false);
      this.GetItem(6).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
      switch (i.PerformType) {
        case 1:
          this.GetItem(4).SetUIActive(true);
          break;
        case 2:
          this.GetItem(5).SetUIActive(true);
          break;
        case 3:
          this.GetItem(7).SetUIActive(true);
          break;
        case 4:
          this.GetItem(6).SetUIActive(true);
      }
      ModelManager_1.ModelManager.HonamiStoryModel.ClearCurLoadingData();
    }
  }
  OnLevelSequencePlayerBandStateChange(i) {
    this.PlaySequence("Start");
  }
}
exports.HonamiStoryLoadingView = HonamiStoryLoadingView;
//# sourceMappingURL=HonamiStoryLoadingView.js.map