"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonTowerDefensePanelItem = undefined;
const ue_1 = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonTowerDefensePanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.hih = () => {
      var e = TowerDefenceController_1.TowerDefenseController.BuildPreviewRewardData();
      if (e) {
        UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", e, (e, n) => {
          if (e && UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView")) {
            UiManager_1.UiManager.GetViewByName("InstanceDungeonEntranceView")?.AddChildViewById(n);
          }
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIButtonComponent], [1, ue_1.UIText], [2, ue_1.UIItem], [3, ue_1.UIText]];
    this.BtnBindInfo = [[0, this.hih]];
  }
  OnStart() {
    if (this.Uth?.HaveRefresh) {
      this.RefreshItem();
    }
  }
  RefreshItem() {
    var e;
    if (this.InAsyncLoading()) {
      this.Uth = {
        HaveRefresh: true
      };
    } else {
      this.GetItem(2).SetUIActive(TowerDefenceController_1.TowerDefenseController.CheckHasReward());
      e = TowerDefenceController_1.TowerDefenseController.BuildTotalScoreContent();
      this.GetText(1).SetText("" + e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "TowerDefence_PintDesc");
    }
  }
}
exports.InstanceDungeonTowerDefensePanelItem = InstanceDungeonTowerDefensePanelItem;
//# sourceMappingURL=InstanceDungeonTowerDefensePanelItem.js.map