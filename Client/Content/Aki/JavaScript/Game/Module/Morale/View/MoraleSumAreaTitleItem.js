"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleSumAreaTitleItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class MoraleSumAreaTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AreaData = undefined;
    this.Sequence = undefined;
  }
  async Init(e, t) {
    this.AreaData = t;
    await this.CreateThenShowByActorAsync(e.GetOwner());
    this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {}
  OnBeforeShow() {}
  UpdateData() {
    var e = this.GetText(4);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Morale_title_4");
    var e = this.AreaData.GetUiActiveFlagNum();
    var t = this.AreaData.GetUiTotalFlagNum();
    var i = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Morale_title_16", e, t);
    var i = this.AreaData.IsAllUiFlagActive();
    this.SetAreaActiveState(i);
    var e = this.IsShowBoxProgress();
    this.SetBoxProgressActive(e);
    if (e) {
      t = this.AreaData.GetAllBoxReceivedCount() + "/" + this.AreaData.GetAllBoxTotalCount();
      this.GetText(8)?.SetText(t);
    }
    var i = this.AreaData.IsExistFlagRewardCanGet();
    this.GetItem(9)?.SetUIActive(i);
    var e = this.AreaData.IsPlayerInArea();
    this.GetSprite(7)?.SetUIActive(e);
    this.CheckHighFlagNewActiveBefore();
  }
  IsShowBoxProgress() {
    return !!this.AreaData.IsExistBox() && this.AreaData.HighDifficultyFlagSomeActive();
  }
  async CheckPlayHighMonsterKillEffect() {
    if (this.AreaData.HighDifficultyFlagSomeNewActive() && this.AreaData.IsAllUiFlagActive()) {
      this.SetAreaActiveState(true);
      this.SetBoxProgressActive(true);
      await this.Sequence?.PlaySequenceAsync("Finish", new CustomPromise_1.CustomPromise());
    }
  }
  SetAreaActiveState(e) {
    this.GetSprite(1)?.SetUIActive(e);
    this.GetSprite(5)?.SetUIActive(e);
  }
  SetBoxProgressActive(e) {
    this.GetItem(6)?.SetUIActive(e);
  }
  CheckHighFlagNewActiveBefore() {
    if (this.AreaData.HighDifficultyFlagSomeNewActive()) {
      this.SetAreaActiveState(false);
      this.SetBoxProgressActive(false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length <= 0) && e[0] === "FirstFinishedAreaBox" && (e = this.GetItem(6))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.MoraleSumAreaTitleItem = MoraleSumAreaTitleItem;
//# sourceMappingURL=MoraleSumAreaTitleItem.js.map