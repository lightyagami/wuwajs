"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleSumAreaTitleItem = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class MoraleSumAreaTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.AreaData = void 0, this.Sequence = void 0
  }
  async Init(e, t) {
    this.AreaData = t, await this.CreateThenShowByActorAsync(e.GetOwner()), this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIText],
      [9, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync()
  }
  OnStart() {}
  OnBeforeShow() {}
  UpdateData() {
    var e = this.GetText(4),
      e = (LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Morale_title_4"), this.AreaData.GetUiActiveFlagNum()),
      t = this.AreaData.GetUiTotalFlagNum(),
      i = this.GetText(3),
      i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Morale_title_16", e, t), this.AreaData.IsAllUiFlagActive()),
      e = (this.SetAreaActiveState(i), this.IsShowBoxProgress()),
      i = (this.SetBoxProgressActive(e), e && (t = this.AreaData.GetAllBoxReceivedCount() + "/" + this.AreaData.GetAllBoxTotalCount(), this.GetText(8)?.SetText(t)), this.AreaData.IsExistFlagRewardCanGet()),
      e = (this.GetItem(9)?.SetUIActive(i), this.AreaData.IsPlayerInArea());
    this.GetSprite(7)?.SetUIActive(e), this.CheckHighFlagNewActiveBefore()
  }
  IsShowBoxProgress() {
    return !!this.AreaData.IsExistBox() && this.AreaData.HighDifficultyFlagSomeActive()
  }
  async CheckPlayHighMonsterKillEffect() {
    this.AreaData.HighDifficultyFlagSomeNewActive() && this.AreaData.IsAllUiFlagActive() && (this.SetAreaActiveState(!0), this.SetBoxProgressActive(!0), await this.Sequence?.PlaySequenceAsync("Finish", new CustomPromise_1.CustomPromise))
  }
  SetAreaActiveState(e) {
    this.GetSprite(1)?.SetUIActive(e), this.GetSprite(5)?.SetUIActive(e)
  }
  SetBoxProgressActive(e) {
    this.GetItem(6)?.SetUIActive(e)
  }
  CheckHighFlagNewActiveBefore() {
    this.AreaData.HighDifficultyFlagSomeNewActive() && (this.SetAreaActiveState(!1), this.SetBoxProgressActive(!1))
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return e && !(e.length <= 0) && "FirstFinishedAreaBox" === e[0] && (e = this.GetItem(6)) ? [e, e] : void 0
  }
}
exports.MoraleSumAreaTitleItem = MoraleSumAreaTitleItem;
//# sourceMappingURL=MoraleSumAreaTitleItem.js.map