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
    this.oZ1 = undefined;
    this.nZ1 = 0;
    this.sZ1 = false;
    this.eTt = () => {
      if (this.oZ1) {
        ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReview(this.oZ1.Id);
        this.UiViewSequence.PlaySequence("CloseTips", true);
      }
    };
    this.aZ1 = () => {
      this.UiViewSequence.PlaySequence("StartAtOnce");
      this.sZ1 = true;
    };
    this.hZ1 = () => {
      this.sZ1 = false;
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
    this.oZ1 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewEntryDataById(i);
    this.nZ1 = 0;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "StoryReview_Tips_Content");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "StoryReview_Tips_Title");
    this.UiViewSequence.AddSequenceFinishEvent("StartTips", this.aZ1);
    this.UiViewSequence.AddSequenceFinishEvent("CloseTips", this.hZ1);
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("StartTips");
  }
  OnTick(i) {
    var t;
    if (this.oZ1 && this.sZ1) {
      if (this.nZ1 >= this.oZ1.TimerDurationMs) {
        this.UiViewSequence.PlaySequence("CloseTips", true);
        this.sZ1 = false;
      } else {
        t = this.GetSprite(3);
        this.nZ1 += i;
        i = Math.max(this.oZ1.TimerDurationMs - this.nZ1, 0);
        t?.SetFillAmount(i / this.oZ1.TimerDurationMs);
      }
    }
  }
}
exports.QuestReviewTipsView = QuestReviewTipsView;
//# sourceMappingURL=QuestReviewTipsView.js.map