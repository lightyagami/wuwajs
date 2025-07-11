"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReputationRewardsView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
const InfluenceRewardItem_1 = require("../Item/InfluenceRewardItem");
class ReputationRewardsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.Bsi = undefined;
    this.sGe = (e, i, r) => {
      var i = new InfluenceRewardItem_1.InfluenceRewardItem(i);
      var t = this.Bsi.RewardIndex >= r;
      i.UpdateItem(e, t);
      return {
        Key: r,
        Value: i
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnBeforeCreate() {
    var e = this.OpenParam;
    this.Bsi = ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(e);
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.sGe);
  }
  OnAfterShow() {
    this.xqe.RefreshByData(this.Bsi.GetReward());
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren();
    this.xqe = undefined;
  }
}
exports.ReputationRewardsView = ReputationRewardsView;
//# sourceMappingURL=ReputationRewardsView.js.map