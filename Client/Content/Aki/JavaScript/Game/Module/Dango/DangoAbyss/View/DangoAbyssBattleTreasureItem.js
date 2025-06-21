"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssBattleTreasureItem = exports.DangoAbyssBattleTreasureRoot = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DangoAbyssBattleTreasureRoot extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.GFc = void 0, this.FFc = void 0, this.sOe = [], this.NFc = []
  }
  InitItem(s, t) {
    this.GFc = s, this.FFc = t
  }
  async Init(s, t) {
    var e, i = [],
      r = this.GFc.Width;
    let a = -1;
    this.NFc.forEach(s => {
      s.GetRootItem().SetUIActive(!1)
    });
    for ([e] of s) {
      a++;
      var o, h, n = 1 - (t - e) / t;
      this.NFc.length > a ? (this.NFc[a].RewardId = e, this.NFc[a].NeedPercentage = 100 * n, o = n * r, this.NFc[a].GetRootItem().SetAnchorOffsetX(o), this.NFc[a].GetRootItem().SetUIActive(!0)) : (o = LguiUtil_1.LguiUtil.CopyItem(this.FFc, this.GFc), h = (this.sOe.push(o), new DangoAbyssBattleTreasureItem), n = (this.NFc.push(h), h.NeedPercentage = 100 * n, h.RewardId = e, n * r), o.SetAnchorOffsetX(n), i.push(h.CreateThenShowByActorAsync(o.GetOwner())))
    }
    this.FFc.SetUIActive(!1), await Promise.all(i)
  }
  RefreshRewardItem(s) {
    for (const t of this.NFc) t.RefreshByCurrentPercentage(s)
  }
}
exports.DangoAbyssBattleTreasureRoot = DangoAbyssBattleTreasureRoot;
class DangoAbyssBattleTreasureItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.NeedPercentage = 0, this.RewardId = 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite]
    ]
  }
  RefreshByCurrentPercentage(s) {
    this.GetSprite(0)?.SetUIActive(this.NeedPercentage <= s)
  }
}
exports.DangoAbyssBattleTreasureItem = DangoAbyssBattleTreasureItem;
//# sourceMappingURL=DangoAbyssBattleTreasureItem.js.map