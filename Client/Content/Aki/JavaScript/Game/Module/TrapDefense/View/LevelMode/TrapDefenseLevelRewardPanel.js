"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelRewardPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const TrapDefenseLevelRewardItem_1 = require("./TrapDefenseLevelRewardItem");
class TrapDefenseLevelRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelData = undefined;
    this.LayoutReward = undefined;
    this.CreateItemReward = () => new TrapDefenseLevelRewardItem_1.TrapDefenseLevelRewardItem();
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILayoutBase], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(1);
    var t = this.GetItem(2)?.GetOwner();
    this.LayoutReward = new GenericLayout_1.GenericLayout(e, this.CreateItemReward, t);
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateData(e) {
    e = (this.LevelData = e).GetRewardShowList();
    this.LayoutReward.RefreshByData(e);
    this.SetActive(e.length > 0);
  }
}
exports.TrapDefenseLevelRewardPanel = TrapDefenseLevelRewardPanel;
//# sourceMappingURL=TrapDefenseLevelRewardPanel.js.map