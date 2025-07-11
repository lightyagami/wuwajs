"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewTipsView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class QuestReviewTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.xJ1 = undefined;
    this.UJ1 = 0;
    this.DJ1 = false;
    this.eTt = () => {
      if (this.xJ1) {
        ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReview(this.xJ1.Id);
        this.UiViewSequence.PlaySequence("CloseTips", true);
      }
    };
    this.BJ1 = () => {
      this.UiViewSequence.PlaySequence("StartAtOnce");
      this.DJ1 = true;
    };
    this.kJ1 = () => {
      this.DJ1 = false;
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIButtonComponent], [3, UE.UISprite], [4, UE.UIText]];
    this.BtnBindInfo = [[2, this.eTt]];
  }
  async OnBeforeStartAsync() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_BookColorIcon");
    await this.SetSpriteAsync(i, this.GetSprite(1), false);
  }
  OnStart() {
    var i = this.OpenParam.EntryId;
    this.xJ1 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewEntryDataById(i);
    this.UJ1 = 0;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "StoryReview_Tips_Content");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "StoryReview_Tips_Title");
    this.UiViewSequence.AddSequenceFinishEvent("StartTips", this.BJ1);
    this.UiViewSequence.AddSequenceFinishEvent("CloseTips", this.kJ1);
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("StartTips");
  }
  OnTick(i) {
    var t;
    if (this.xJ1 && this.DJ1) {
      if (this.UJ1 >= this.xJ1.TimerDurationMs) {
        this.UiViewSequence.PlaySequence("CloseTips", true);
        this.DJ1 = false;
      } else {
        t = this.GetSprite(3);
        this.UJ1 += i;
        i = Math.max(this.xJ1.TimerDurationMs - this.UJ1, 0);
        t?.SetFillAmount(i / this.xJ1.TimerDurationMs);
      }
    }
  }
}
exports.QuestReviewTipsView = QuestReviewTipsView;
//# sourceMappingURL=QuestReviewTipsView.js.map