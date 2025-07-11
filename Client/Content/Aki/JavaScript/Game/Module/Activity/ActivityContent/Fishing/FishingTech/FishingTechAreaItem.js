"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingTechAreaItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const FishingTechNodeItem_1 = require("./FishingTechNodeItem");
const FishingTechSecondaryNodeItem_1 = require("./FishingTechSecondaryNodeItem");
class FishingTechAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.lh_ = [];
    this._h_ = [];
    this.OnClickToggleBack = undefined;
    this.kqe = (e, i) => {
      this.OnClickToggleBack?.(e, i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [13, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var i = new FishingTechNodeItem_1.FishingTechNodeItem();
    e.push(i.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    var s = new FishingTechNodeItem_1.FishingTechNodeItem();
    e.push(s.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    var t = new FishingTechNodeItem_1.FishingTechNodeItem();
    e.push(t.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    var h = new FishingTechNodeItem_1.FishingTechNodeItem();
    e.push(h.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    var o = new FishingTechSecondaryNodeItem_1.FishingTechSecondaryNodeItem();
    e.push(o.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    var n = new FishingTechSecondaryNodeItem_1.FishingTechSecondaryNodeItem();
    e.push(n.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(e);
    this.lh_.push(i);
    this.lh_.push(s);
    this.lh_.push(t);
    this.lh_.push(h);
    this._h_.push(o);
    this._h_.push(n);
  }
  RefreshNodeList(e) {
    let i = 0;
    let s = 0;
    for (const t of e) {
      if (t.NodeType === 3) {
        this._h_[s++].RefreshNode(t);
      } else {
        this.lh_[i++].RefreshNode(t);
      }
    }
    for (const h of this.lh_) {
      h.OnClickToggleBack = this.kqe;
    }
    for (const o of this._h_) {
      o.OnClickToggleBack = this.kqe;
    }
  }
  FindAndSelectNode(e) {
    for (const i of this.lh_) {
      if (i.CurrentNode === e) {
        i.SelectNode();
        return;
      }
    }
    for (const s of this._h_) {
      if (s.CurrentNode === e) {
        s.SelectNode();
        return;
      }
    }
  }
}
exports.FishingTechAreaItem = FishingTechAreaItem;
//# sourceMappingURL=FishingTechAreaItem.js.map