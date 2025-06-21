"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleScoreProgressRewardItem = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleScoreProgressRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.ItemData = void 0, this.RewardItem = void 0, this.ClickCallBack = void 0, this.hoc = () => {
      this.ClickCallBack?.(this.ItemData)
    }
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.RewardItem = new SmallItemGrid_1.SmallItemGrid, this.RewardItem.Initialize(this.GetItem(1).GetOwner()), this.RewardItem.BindOnExtendToggleClicked(this.hoc), this.RewardItem.BindOnCanExecuteChange(() => !1)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem]
    ]
  }
  Refresh(t) {
    this.ItemData = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, this.constructor.name, ["", this.ItemData]);
    t = {
      Data: this.ItemData,
      Type: 4,
      ItemConfigId: this.ItemData.ItemId,
      IsRedDotVisible: this.ItemData.IsCanReceived,
      IsReceivedVisible: this.ItemData.IsReceived,
      IsReceivableVisible: this.ItemData.IsCanReceived,
      BottomText: this.GetCountStr()
    };
    this.RewardItem.Apply(t)
  }
  GetCountStr() {
    return 0 < this.ItemData.ItemNum ? this.ItemData.ItemNum.toString() : ""
  }
}
exports.MoraleScoreProgressRewardItem = MoraleScoreProgressRewardItem;
//# sourceMappingURL=MoraleScoreProgressRewardItem.js.map