"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectRewardItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class CollectRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Jkt = -1;
    this.RewardType = 0;
    this.CallbackClickReward = undefined;
    this.hoc = () => {
      var t;
      if (this.CallbackClickReward) {
        t = this.GetButton(0).RootUIComp;
        this.CallbackClickReward(this.Jkt, t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIText]];
    this.BtnBindInfo = [[0, this.hoc]];
  }
  Refresh(t, s, e) {
    this.Jkt = t;
    let i = 1;
    let r = 0;
    if (this.RewardType === 0) {
      i = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardStateById(this.Jkt);
      r = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardNeedCountById(this.Jkt);
    } else if (this.RewardType === 1) {
      i = ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardStateById(this.Jkt);
      r = ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardNeedCountById(this.Jkt);
    }
    this.GetSprite(1)?.SetUIActive(true);
    this.GetSprite(2)?.SetUIActive(i === 2);
    this.GetSprite(3)?.SetUIActive(i === 3);
    this.GetSprite(4)?.SetUIActive(i === 2);
    this.GetSprite(5)?.SetUIActive(i === 1);
    this.GetSprite(6)?.SetUIActive(i === 3);
    this.GetSprite(7)?.SetUIActive(true);
    this.GetSprite(8)?.SetUIActive(i !== 1);
    this.GetText(9).SetText(r.toString());
  }
}
exports.CollectRewardItem = CollectRewardItem;
//# sourceMappingURL=CollectRewardItem.js.map