"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewTipsView = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class QuestReviewTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.Fz1 = void 0, this.Nz1 = 0, this.Vz1 = !1, this.eTt = () => {
      this.Fz1 && (ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReview(this.Fz1.Id), this.UiViewSequence.PlaySequence("CloseTips", !0))
    }, this.jz1 = () => {
      this.UiViewSequence.PlaySequence("StartAtOnce"), this.Vz1 = !0
    }, this.Hz1 = () => {
      this.Vz1 = !1, this.CloseMe()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIButtonComponent],
      [3, UE.UISprite],
      [4, UE.UIText]
    ], this.BtnBindInfo = [
      [2, this.eTt]
    ]
  }
  async OnBeforeStartAsync() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_BookColorIcon");
    await this.SetSpriteAsync(i, this.GetSprite(1), !1)
  }
  OnStart() {
    var i = this.OpenParam.EntryId;
    this.Fz1 = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewEntryDataById(i), this.Nz1 = 0, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "StoryReview_Tips_Content"), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "StoryReview_Tips_Title"), this.UiViewSequence.AddSequenceFinishEvent("StartTips", this.jz1), this.UiViewSequence.AddSequenceFinishEvent("CloseTips", this.Hz1)
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("StartTips")
  }
  OnTick(i) {
    var t;
    this.Fz1 && this.Vz1 && (this.Nz1 >= this.Fz1.TimerDurationMs ? (this.UiViewSequence.PlaySequence("CloseTips", !0), this.Vz1 = !1) : (t = this.GetSprite(3), this.Nz1 += i, i = Math.max(this.Fz1.TimerDurationMs - this.Nz1, 0), t?.SetFillAmount(i / this.Fz1.TimerDurationMs)))
  }
}
exports.QuestReviewTipsView = QuestReviewTipsView;
//# sourceMappingURL=QuestReviewTipsView.js.map