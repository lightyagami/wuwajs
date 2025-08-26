"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueRewardPreviewView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class WeeklyRogueRewardPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ItemLayout = undefined;
    this.emu = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.ItemLayout = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.emu);
    var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityDataNew;
    if (e) {
      this.ItemLayout.RefreshByData(ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(e.GetCycleConfig().BlackFlowerAward, e.WorldLevel));
    }
  }
}
exports.WeeklyRogueRewardPreviewView = WeeklyRogueRewardPreviewView;
//# sourceMappingURL=WeeklyRogueRewardPreviewView.js.map