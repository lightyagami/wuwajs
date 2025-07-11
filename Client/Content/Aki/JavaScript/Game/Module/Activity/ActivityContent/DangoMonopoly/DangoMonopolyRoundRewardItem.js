"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyRoundRewardItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoMonopolyRoundRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.RewardItem = undefined;
    this.ClickCallBack = undefined;
    this.hoc = () => {
      this.ClickCallBack?.(this.fGt);
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
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIText], [3, UE.UISprite]];
  }
  Refresh(t) {
    this.fGt = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "DangoRoundRewardItem", ["", this.fGt]);
    }
    var t = this.fGt.IsReceived;
    this.GetSprite(0)?.SetUIActive(false);
    this.GetSprite(3)?.SetUIActive(t);
    var i = this.GetText(2);
    i.SetText(this.fGt.Position.toString());
    i.SetChangeColor(t, i.changeColor);
    var t = {
      Data: this.fGt,
      Type: 4,
      ItemConfigId: this.fGt.ItemId,
      IsRedDotVisible: this.fGt.IsCanReceived,
      IsReceivedVisible: this.fGt.IsReceived,
      IsReceivableVisible: this.fGt.IsCanReceived,
      BottomText: this.GetCountStr()
    };
    this.RewardItem.Apply(t);
  }
  GetCountStr() {
    if (this.fGt.Count > 0) {
      return "x " + this.fGt.Count;
    } else {
      return "";
    }
  }
}
exports.DangoMonopolyRoundRewardItem = DangoMonopolyRoundRewardItem;
//# sourceMappingURL=DangoMonopolyRoundRewardItem.js.map