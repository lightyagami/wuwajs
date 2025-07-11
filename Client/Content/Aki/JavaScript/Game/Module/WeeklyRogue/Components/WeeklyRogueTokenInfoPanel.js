"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueTokenInfoPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const WeeklyRogueTokenGrid_1 = require("./WeeklyRogueTokenGrid");
const WeeklyRogueTokenItem_1 = require("./WeeklyRogueTokenItem");
class WeeklyRogueTokenInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TokenLayout = undefined;
    this.TokenItem = undefined;
    this.eV_ = (e, o) => {
      this.TokenLayout?.SelectGridProxy(e, false);
      this.TokenItem?.UpdateByConfigId(o);
      this.TokenItem?.SetActive(true);
    };
    this.tV_ = () => {
      var e = new WeeklyRogueTokenGrid_1.WeeklyRogueTokenInfoGrid();
      e.OnSelectedChange = this.eV_;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.TokenItem = new WeeklyRogueTokenItem_1.WeeklyRogueTokenItem();
    await this.TokenItem.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.TokenLayout = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.tV_);
    await this.TokenLayout.RefreshByDataAsync(ModelManager_1.ModelManager.WeeklyRogueModel.BuffList);
    this.GetItem(3).SetUIActive(ModelManager_1.ModelManager.WeeklyRogueModel.BuffList.length === 0);
    if (ModelManager_1.ModelManager.WeeklyRogueModel.BuffList.length > 0) {
      this.TokenLayout.SelectGridProxy(0, true);
    }
  }
}
exports.WeeklyRogueTokenInfoPanel = WeeklyRogueTokenInfoPanel;
//# sourceMappingURL=WeeklyRogueTokenInfoPanel.js.map