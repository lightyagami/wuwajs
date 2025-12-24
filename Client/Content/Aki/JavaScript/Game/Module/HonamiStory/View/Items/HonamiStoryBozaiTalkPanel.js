"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBozaiTalkPanel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const Time_1 = require("../../../../../Core/Common/Time");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
class HonamiStoryBozaiTalkPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.kom = new Map();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetTalkInfoTextAndPlayAudio(i) {
    if (i) {
      let e = this.kom.get(i.Type);
      e = e || 0;
      var t = Time_1.Time.ServerTimeStamp / 1000;
      if (!(Math.abs(t - e) < i.Interval)) {
        this.kom.set(i.Type, Time_1.Time.ServerTimeStamp);
        if (!StringUtils_1.StringUtils.IsBlank(i.Desc)) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.Desc);
        }
        AudioSystem_1.AudioSystem.PostEvent(i.AudioEvent);
      }
    }
  }
}
exports.HonamiStoryBozaiTalkPanel = HonamiStoryBozaiTalkPanel;
//# sourceMappingURL=HonamiStoryBozaiTalkPanel.js.map