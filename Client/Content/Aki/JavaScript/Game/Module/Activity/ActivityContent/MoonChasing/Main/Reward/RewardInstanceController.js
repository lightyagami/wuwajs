"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardInstanceController = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
class RewardInstanceController {
  constructor() {
    this.uOn = undefined;
    this.TabDataList = [];
    this.Cua = 0;
  }
  RegisterMainView(t) {
    this.uOn = t;
  }
  async InitMainView() {
    this.uOn.InitTabViewComponent();
    await Promise.all([this.uOn.InitTabComponent(), this.uOn.InitCaption(), this.uOn.InitGrandItem()]);
  }
  RefreshTabList() {
    this.TabDataList = ModelManager_1.ModelManager.MoonChasingModel.GetRewardTabList();
    this.uOn.SetTabState(0, true, true);
  }
  TabItemToggleClick(t) {
    if (t !== this.Cua) {
      this.uOn.SetTabState(this.Cua, false, true);
    }
    this.Cua = t;
    var s = this.TabDataList[t];
    this.uOn.SwitchTabView(s, t);
  }
}
exports.RewardInstanceController = RewardInstanceController;
//# sourceMappingURL=RewardInstanceController.js.map