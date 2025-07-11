"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonSolarSpeedPanelItem = undefined;
const ue_1 = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonSolarSpeedPanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.hih = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleOnClickRewardInActivitySubView();
    };
    this.O6_ = () => {
      this.RefreshItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIButtonComponent], [1, ue_1.UIText], [2, ue_1.UIItem], [3, ue_1.UIText]];
    this.BtnBindInfo = [[0, this.hih]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), "BossRushCollectReward");
    if (this.Uth?.HaveRefresh) {
      this.RefreshItem();
    }
  }
  async OnBeforeStartAsync() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SolarSpeedRewarded, this.O6_);
    return Promise.resolve();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SolarSpeedRewarded, this.O6_);
  }
  RefreshItem() {
    var e;
    if (this.InAsyncLoading()) {
      this.Uth = {
        HaveRefresh: true
      };
    } else {
      e = ModelManager_1.ModelManager.SolarSpeedModel;
      this.GetItem(2).SetUIActive(e.HasRewardRedDot);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(3), "parkour_award_2_1", e.CurrentCompletedCount, e.TotalRewardCount);
    }
  }
}
exports.InstanceDungeonSolarSpeedPanelItem = InstanceDungeonSolarSpeedPanelItem;
//# sourceMappingURL=InstanceDungeonSolarSpeedPanelItem.js.map