"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonTimeCountAndCostItem = undefined;
const ue_1 = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonTimeCountAndCostItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UITexture], [1, ue_1.UIText], [2, ue_1.UIText]];
  }
  RefreshItem(e, n) {
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(n).RewardId;
    var n = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(n)?.SharedId;
    if (n) {
      a = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(n);
      n = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(n);
      if ((n = (n = (a = a.MaxCount) - n) >= 0 ? n : 0) == 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "InstanceCanRewardTimesDepleted", n, a);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "InstanceCanRewardTimes", n + "/" + a);
      }
    }
    var n = e[0]?.ItemId === ItemDefines_1.EItemId.Power && !ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e[1]);
    var a = this.GetText(2);
    a?.SetText("x" + e[1]);
    a?.SetChangeColor(n, a.changeColor);
    this.SetItemIcon(this.GetTexture(0), e[0]?.ItemId);
  }
}
exports.InstanceDungeonTimeCountAndCostItem = InstanceDungeonTimeCountAndCostItem;
//# sourceMappingURL=InstanceDungeonTimeCountAndCostItem.js.map