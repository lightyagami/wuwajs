"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementProgressItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  RefreshGroupState(e) {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    if (e.GetFinishState() === 2) {
      this.GetItem(0).SetUIActive(true);
      this.GetText(2).SetUIActive(true);
      this.GetText(2).SetText(TimeUtil_1.TimeUtil.DateFormat4(new Date(e.GetFinishTime() * TimeUtil_1.TimeUtil.InverseMillisecond)));
    } else if (e.GetFinishState() === 0) {
      this.GetItem(1).SetUIActive(true);
    }
  }
  RefreshState(e) {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    if (e.GetFinishState() === 2) {
      this.GetItem(0).SetUIActive(true);
      this.GetText(2).SetUIActive(true);
    } else if (e.GetFinishState() === 0) {
      this.GetItem(1).SetUIActive(true);
    }
  }
}
exports.AchievementProgressItem = AchievementProgressItem;
//# sourceMappingURL=AchievementProgressItem.js.map