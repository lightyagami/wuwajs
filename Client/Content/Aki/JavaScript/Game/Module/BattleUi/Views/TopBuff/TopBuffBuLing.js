"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopBuffBuLing = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const TopBuffContainer_1 = require("./TopBuffContainer");
const TopBuffItemBuLing_1 = require("./TopBuffItemBuLing");
const tagIds = [-684077214, 1503565066, -2131570346, -1330179523, 1362022063, -963438012, -1745025559, 498792026];
class TopBuffBuLing extends TopBuffContainer_1.TopBuffContainer {
  constructor() {
    super(...arguments);
    this.HYc = false;
    this.x5e = [];
    this.pTm = 0;
    this.Zmt = (t, s) => {
      this.HYc = true;
    };
  }
  async OnInitAsync() {
    var s = [];
    for (let t = 0; t < 4; t++) {
      var i = new TopBuffItemBuLing_1.TopBuffItemBuLing();
      s.push(i.CreateByResourceIdAsync("UiItem_BuffItemBuLing", this.ParentItem));
      this.x5e.push(i);
    }
    await Promise.all(s);
    this.Ore();
    this.qYt(true);
  }
  SetVisible(t) {
    for (const s of this.x5e) {
      s.SetVisible(0, t);
    }
  }
  Ore() {
    for (const t of tagIds) {
      this.ListenForTagAddOrRemoveChanged(t, this.Zmt);
    }
  }
  kre() {}
  Tick(t) {
    super.Tick(t);
    if (this.HYc) {
      this.qYt();
      this.HYc = false;
    }
    for (const s of this.x5e) {
      s.TickHiding(t);
    }
  }
  qYt(e = false) {
    var o = this.RoleData?.GameplayTagComponent;
    if (o) {
      var t;
      var r = this.x5e.length;
      var f = [0, 0, 0, 0];
      for (let t = 0; t < tagIds.length; t++) {
        var h = tagIds[t];
        if (o.HasTag(h)) {
          f[t % 4] = t < 4 ? 1 : 2;
        }
      }
      let i = 0;
      for (const n of f) {
        if (n > 0) {
          i++;
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "卜灵能量条图标变化", ["", f]);
      }
      if (this.pTm === 4 && i === 4) {
        t = this.x5e.shift();
        this.x5e.push(t);
        t.GetRootItem().SetHierarchyIndex(this.x5e[2].GetRootItem().GetHierarchyIndex());
      }
      let s = -1;
      if (this.pTm - i == 2) {
        s = i;
      }
      this.pTm = i;
      for (let s = 0; s < i; s++) {
        let t = 0;
        if (i === 0) {
          t = 0;
        } else if (i === 1) {
          t = 2;
        } else if (i - s <= 2) {
          t = 1;
        }
        this.x5e[s].Refresh(f[s], t, 0, !e);
      }
      for (let t = i; t < r; t++) {
        if (s !== -1) {
          if (t === s) {
            this.x5e[t].Refresh(0, 0, 1, !e);
          } else if (t === s + 1) {
            this.x5e[t].Refresh(0, 0, 2, !e);
          } else {
            this.x5e[t].Refresh(0, 0, 0, !e);
          }
        } else {
          this.x5e[t].Refresh(0, 0, 0, !e);
        }
      }
    } else {
      for (const s of this.x5e) {
        s.Refresh(0, 0, 0, !e);
      }
    }
  }
  OnDestroy() {
    this.kre();
    for (const t of this.x5e) {
      t.Destroy();
    }
  }
}
exports.TopBuffBuLing = TopBuffBuLing;
//# sourceMappingURL=TopBuffBuLing.js.map