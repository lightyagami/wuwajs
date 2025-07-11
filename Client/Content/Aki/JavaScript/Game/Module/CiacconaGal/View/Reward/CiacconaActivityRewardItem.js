"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaActivityRewardItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class CiacconaActivityRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.cqc = undefined;
    this.Qs_ = undefined;
    this.Pe = undefined;
    this.Bqe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.uqc = () => {
      var t = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id;
      ControllerHolder_1.ControllerHolder.CiacconaGalController.RequestGetActivityProgressReward(t, this.Pe.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent]];
  }
  async OnBeforeStartAsync() {
    this.cqc = new ButtonItem_1.ButtonItem();
    this.Qs_ = new ButtonItem_1.ButtonItem();
    this.Qs_.SetFunction(this.uqc);
    var t = [];
    t.push(this.cqc.CreateByActorAsync(this.GetItem(0).GetOwner()));
    t.push(this.Qs_.CreateByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.Bqe);
  }
  Refresh(t, e, i) {
    this.Pe = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.Title);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.Desc);
    this.Qs_.SetActive(t.CanReceive && !t.IsReceived);
    this.Qs_.SetRedDotVisible(t.CanReceive && !t.IsReceived);
    this.cqc.SetActive(false);
    this.GetText(2).SetUIActive(!t.CanReceive);
    this.GetItem(3).SetUIActive(t.IsReceived);
    this.xqe.RefreshByData(t.RewardItemDataList);
  }
}
exports.CiacconaActivityRewardItem = CiacconaActivityRewardItem;
//# sourceMappingURL=CiacconaActivityRewardItem.js.map