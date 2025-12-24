"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymLoadingView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const LoadingViewBase_1 = require("../../Loading/View/LoadingViewBase");
const LordGymDefine_1 = require("../LordGymDefine");
class LordGymLoadingView extends LoadingViewBase_1.LoadingViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText]];
  }
  OnStart() {
    super.OnStart();
    AudioSystem_1.AudioSystem.PostEvent(LordGymDefine_1.LORD_GYM_THIRD_AUDIO_LOAD);
  }
  UpdateProgressRate(e) {}
  UpdateProgressValue(e) {
    this.SetTextProgressValue(0, e);
  }
  SetTextProgressValue(e, i) {
    i = Math.round(i);
    this.GetArtText(e).SetText(i.toString());
  }
}
exports.LordGymLoadingView = LordGymLoadingView;
//# sourceMappingURL=LordGymLoadingView.js.map