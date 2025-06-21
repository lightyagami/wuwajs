"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CollectRewardItem = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class CollectRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Jkt = -1, this.RewardType = 0, this.CallbackClickReward = void 0, this.hoc = () => {
      var t;
      this.CallbackClickReward && (t = this.GetButton(0).RootUIComp, this.CallbackClickReward(this.Jkt, t))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.hoc]
    ]
  }
  Refresh(t, s, e) {
    this.Jkt = t;
    let i = 1,
      r = 0;
    0 === this.RewardType ? (i = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardStateById(this.Jkt), r = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardNeedCountById(this.Jkt)) : 1 === this.RewardType && (i = ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardStateById(this.Jkt), r = ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardNeedCountById(this.Jkt)), this.GetSprite(1)?.SetUIActive(!0), this.GetSprite(2)?.SetUIActive(2 === i), this.GetSprite(3)?.SetUIActive(3 === i), this.GetSprite(4)?.SetUIActive(2 === i), this.GetSprite(5)?.SetUIActive(1 === i), this.GetSprite(6)?.SetUIActive(3 === i), this.GetSprite(7)?.SetUIActive(!0), this.GetSprite(8)?.SetUIActive(1 !== i), this.GetText(9).SetText(r.toString())
  }
}
exports.CollectRewardItem = CollectRewardItem;
//# sourceMappingURL=CollectRewardItem.js.map