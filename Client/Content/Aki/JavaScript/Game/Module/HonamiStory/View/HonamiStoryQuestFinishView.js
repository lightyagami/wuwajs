"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryQuestFinishView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
class HonamiStoryQuestFinishView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.MMm = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    this.MMm = this.OpenParam;
    this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        this.CloseMe();
      });
    });
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    var i = this.MMm;
    if (i) {
      var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.GetNameKey());
      var r = this.GetText(1);
      var i = i.Config;
      let e = "";
      e = i.TaskType !== 1 ? (r?.SetRichText(false), t) : (r?.SetRichText(true), StringUtils_1.StringUtils.Format(HonamiStoryDefine_1.RICHTXT_QUEST, t));
      r?.SetText(e);
    }
  }
}
exports.HonamiStoryQuestFinishView = HonamiStoryQuestFinishView;
//# sourceMappingURL=HonamiStoryQuestFinishView.js.map