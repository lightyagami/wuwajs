"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssBattleTreasureItem = exports.DangoAbyssBattleTreasureRoot = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DangoAbyssBattleTreasureRoot extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.GFc = undefined;
    this.FFc = undefined;
    this.sOe = [];
    this.NFc = [];
  }
  InitItem(s, t) {
    this.GFc = s;
    this.FFc = t;
  }
  async Init(s, t) {
    var e;
    var i = [];
    var r = this.GFc.Width;
    let a = -1;
    this.NFc.forEach(s => {
      s.GetRootItem().SetUIActive(false);
    });
    for ([e] of s) {
      a++;
      var o;
      var h;
      var n = 1 - (t - e) / t;
      if (this.NFc.length > a) {
        this.NFc[a].RewardId = e;
        this.NFc[a].NeedPercentage = n * 100;
        o = n * r;
        this.NFc[a].GetRootItem().SetAnchorOffsetX(o);
        this.NFc[a].GetRootItem().SetUIActive(true);
      } else {
        o = LguiUtil_1.LguiUtil.CopyItem(this.FFc, this.GFc);
        this.sOe.push(o);
        h = new DangoAbyssBattleTreasureItem();
        this.NFc.push(h);
        h.NeedPercentage = n * 100;
        h.RewardId = e;
        n = n * r;
        o.SetAnchorOffsetX(n);
        i.push(h.CreateThenShowByActorAsync(o.GetOwner()));
      }
    }
    this.FFc.SetUIActive(false);
    await Promise.all(i);
  }
  RefreshRewardItem(s) {
    for (const t of this.NFc) {
      t.RefreshByCurrentPercentage(s);
    }
  }
}
exports.DangoAbyssBattleTreasureRoot = DangoAbyssBattleTreasureRoot;
class DangoAbyssBattleTreasureItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.NeedPercentage = 0;
    this.RewardId = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  RefreshByCurrentPercentage(s) {
    this.GetSprite(0)?.SetUIActive(this.NeedPercentage <= s);
  }
}
exports.DangoAbyssBattleTreasureItem = DangoAbyssBattleTreasureItem;
//# sourceMappingURL=DangoAbyssBattleTreasureItem.js.map