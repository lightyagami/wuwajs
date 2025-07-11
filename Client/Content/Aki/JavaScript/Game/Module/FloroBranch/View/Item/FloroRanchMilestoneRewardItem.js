"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchMilestoneRewardItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FloroRanchMilestoneRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.gOe = undefined;
    this.qsi = undefined;
    this.OnClickToGet = undefined;
    this.hJs = () => {
      if (this.Pe.IsFinished && !this.Pe.IsReceive) {
        this.OnClickToGet?.();
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.qsi[0].ItemId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStart() {
    this.gOe = new SmallItemGrid_1.SmallItemGrid();
    this.gOe.Initialize(this.GetItem(2).GetOwner());
    this.gOe.BindOnCanExecuteChange(() => false);
    this.gOe.BindOnExtendToggleClicked(this.hJs);
  }
  Refresh(t, i, e) {
    this.Pe = t;
    this.GetText(1).SetText(t.Goal.toString());
    this.GetSprite(0).SetUIActive(t.IsFinished);
    this.qsi = t.RewardList[0];
    this.cNe();
  }
  cNe() {
    var t = !this.Pe.IsFinished;
    var i = this.Pe.IsFinished && !this.Pe.IsReceive;
    var e = this.Pe.IsReceive;
    var e = {
      Data: this.Pe,
      Type: 4,
      ItemConfigId: this.qsi[0].ItemId,
      BottomText: this.qsi[1].toString(),
      IsReceivableVisible: i,
      IsReceivedVisible: e,
      IsRedDotVisible: i
    };
    this.gOe.Apply(e);
    this.gOe.SetLockBlackVisible(t);
  }
}
exports.FloroRanchMilestoneRewardItem = FloroRanchMilestoneRewardItem;
//# sourceMappingURL=FloroRanchMilestoneRewardItem.js.map