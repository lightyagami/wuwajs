"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueGainEntry = undefined;
const AffixEntry_1 = require("./AffixEntry");
const RoguelikeDefine_1 = require("./RoguelikeDefine");
class RogueGainEntry {
  constructor(i, t = undefined) {
    this.RoguelikeGainDataType = undefined;
    this.ConfigId = undefined;
    this.ElementDict = undefined;
    this.AffixEntryList = undefined;
    this.OriginalPrice = 0;
    this.CurrentPrice = 0;
    this.Index = undefined;
    this.ShopItemCoinId = 0;
    this.IsSell = undefined;
    this.IsSelect = false;
    this.IsNew = false;
    this.Discounted = 0;
    this.Cost = 0;
    this.BindId = 0;
    this.RestCount = 0;
    this.IsValid = false;
    this.BindId = t;
    this.RoguelikeGainDataType = i.h5n;
    this.ConfigId = i.v9n ?? undefined;
    this.Index = i.c5n ?? undefined;
    this.IsSell = i.O2s ?? undefined;
    this.ElementDict = new Map();
    this.IsSelect = i.k2s;
    this.IsNew = i.dws;
    this.Cost = i.N2s;
    this.RestCount = i.F2s;
    this.IsValid = i.TTs;
    for (const e of Object.keys(i.x2s ?? {})) {
      var s = i.x2s[e] ?? 0;
      if (s) {
        this.ElementDict.set(Number(e), s);
      }
    }
    if (i.q2s) {
      this.AffixEntryList = new Array();
      for (const h of i.q2s) {
        this.AffixEntryList.push(new AffixEntry_1.AffixEntry(h));
      }
      if (i.G2s) {
        for (const o of Object.keys(i.G2s.b2s ?? {})) {
          this.ShopItemCoinId = Number(o);
          this.OriginalPrice = i.G2s.b2s[o];
        }
        this.CurrentPrice = this.OriginalPrice - Math.floor(this.OriginalPrice * i.G2s.B2s * 0.01);
        this.Discounted = i.G2s.B2s;
      }
    }
  }
  GetSortElementInfoArrayByCount(i = false) {
    var t;
    var s;
    var e = new Array();
    for ([t, s] of this.ElementDict) {
      if (!i || t !== 9) {
        e.push(new RoguelikeDefine_1.ElementInfo(t, s));
      }
    }
    e.sort((i, t) => t.Count - i.Count);
    return e;
  }
  IsDiscounted() {
    return this.CurrentPrice !== this.OriginalPrice;
  }
}
exports.RogueGainEntry = RogueGainEntry;
//# sourceMappingURL=RogueGainEntry.js.map