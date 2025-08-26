"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopData = undefined;
const TrapDefenseShopItemData_1 = require("./TrapDefenseShopItemData");
class TrapDefenseShopData {
  constructor() {
    this.ItemGoodsMap = new Map();
    this.BuffGoodsMap = new Map();
    this.ServerDataCache = undefined;
    this.TotalRefreshCount = 0;
    this.RemainingRefreshCount = 0;
    this.RefreshCost = 0;
    this.SortGoods = (t, e) => {
      var s;
      var a;
      if (t.Disable !== e.Disable) {
        if (t.Disable) {
          return 1;
        } else {
          return -1;
        }
      } else if ((s = (t.CurrentPrice || 1) / (t.OriginalPrice || 1)) != (a = (e.CurrentPrice || 1) / (e.OriginalPrice || 1))) {
        return s - a;
      } else if (t.QualityId !== e.QualityId) {
        return e.QualityId - t.QualityId;
      } else {
        return t.Id - e.Id;
      }
    };
  }
  get ItemGoodsList() {
    return Array.from(this.ItemGoodsMap.values());
  }
  get BuffGoodsList() {
    return Array.from(this.BuffGoodsMap.values());
  }
  static Create() {
    var t = new TrapDefenseShopData();
    t.AU();
    return t;
  }
  UpdateByServerData(t) {
    this.ServerDataCache = t;
    this.TryUpdateData();
  }
  TryUpdateData() {
    if (this.ServerDataCache) {
      var t;
      var e;
      var s;
      var a = this.ServerDataCache;
      this.TotalRefreshCount = a.P7u;
      this.RemainingRefreshCount = a.A7u;
      this.RefreshCost = a.fm1;
      var i = new Map();
      var r = new Map();
      for (const h of a.Z7u) {
        if (h.iju) {
          if (this.ItemGoodsMap.has(h.iju.oju)) {
            this.ItemGoodsMap.get(h.iju.oju).Update(h);
          } else {
            t = TrapDefenseShopItemData_1.TrapDefenseShopItemData.Create(h);
            this.ItemGoodsMap.set(t.Id, t);
          }
          i.set(h.iju.oju, true);
        } else if (h.rju) {
          if (this.BuffGoodsMap.has(h.rju.sju)) {
            this.BuffGoodsMap.get(h.rju.sju).Update(h);
          } else {
            t = TrapDefenseShopItemData_1.TrapDefenseShopBuffData.Create(h);
            this.BuffGoodsMap.set(t.Id, t);
          }
          r.set(h.rju.sju, true);
        }
      }
      for ([e] of this.ItemGoodsMap) {
        if (!i.has(e)) {
          this.ItemGoodsMap.delete(e);
        }
      }
      for ([s] of this.BuffGoodsMap) {
        if (!r.has(s)) {
          this.BuffGoodsMap.delete(s);
        }
      }
      this.ServerDataCache = undefined;
    }
  }
  AU() {}
}
exports.TrapDefenseShopData = TrapDefenseShopData;
//# sourceMappingURL=TrapDefenseShopData.js.map