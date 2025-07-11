"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleScoreProgressRewardItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleScoreProgressRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.RewardItem = undefined;
    this.ClickCallBack = undefined;
    this.hoc = () => {
      this.ClickCallBack?.(this.ItemData);
    };
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.RewardItem = new SmallItemGrid_1.SmallItemGrid();
    this.RewardItem.Initialize(this.GetItem(1).GetOwner());
    this.RewardItem.BindOnExtendToggleClicked(this.hoc);
    this.RewardItem.BindOnCanExecuteChange(() => false);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  Refresh(t) {
    this.ItemData = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, this.constructor.name, ["", this.ItemData]);
    }
    t = {
      Data: this.ItemData,
      Type: 4,
      ItemConfigId: this.ItemData.ItemId,
      IsRedDotVisible: this.ItemData.IsCanReceived,
      IsReceivedVisible: this.ItemData.IsReceived,
      IsReceivableVisible: this.ItemData.IsCanReceived,
      BottomText: this.GetCountStr()
    };
    this.RewardItem.Apply(t);
  }
  GetCountStr() {
    if (this.ItemData.ItemNum > 0) {
      return this.ItemData.ItemNum.toString();
    } else {
      return "";
    }
  }
}
exports.MoraleScoreProgressRewardItem = MoraleScoreProgressRewardItem;
//# sourceMappingURL=MoraleScoreProgressRewardItem.js.map