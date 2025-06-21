"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FarmGoldScoreItem = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BaseScoreItem_1 = require("./BaseScoreItem");
class FarmGoldScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments), this.pWl = !1, this.vWl = 0, this.yWl = [], this.SWl = []
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText]
    ]
  }
  OnStart() {
    super.OnStart(), this.IWl(this.yWl);
    for (var [e, t] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) 0 < t && this.IsValidScore(e) && this.OnBattleScoreChanged(e, t)
  }
  IsValidScore(e) {
    e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(e);
    return !(!e || 0 !== e.Type)
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy()
  }
  OnTick(e) {
    this.pWl && (this.TWl(this.vWl, this.yWl), this.bWl(this.vWl, this.yWl), this.pWl = !this.EWl(this.vWl, this.yWl, this.SWl), this.pWl || (this.yWl = this.SWl.slice()), this.IWl(this.yWl))
  }
  IWl(e) {
    let t = "";
    for (const r of e) t += r.toString();
    t = "" === t ? "0" : t, this.GetArtText(0)?.SetText(t.toString())
  }
  TWl(t, r) {
    var s = r.length;
    for (let e = t + 1; e < s; e++) r[e] += 1, 9 < r[e] && (r[e] = 0)
  }
  bWl(e, t) {
    let r = e;
    for (; 0 <= r && (t[r] += 1, 9 < t[r]);) t[r] = 0, r--
  }
  EWl(t, r, s) {
    for (let e = 0; e <= t; e++)
      if (r[e] !== s[e]) return !1;
    return !0
  }
  MWl(t) {
    var r = t.length;
    let s = 0;
    for (let e = 0; e < r; e++) s += t[e] * Math.pow(10, r - e - 1);
    return s
  }
  OnBattleScoreChanged(e, t) {
    var r = this.SWl.slice(),
      s = t.toString(),
      i = s.length;
    0 === i && (this.SWl.length = 0);
    for (let e = this.SWl.length = 0; e < i; e++) this.SWl.push(parseInt(s[e]));
    var h = this.MWl(this.yWl);
    if (this.yWl.length = 0, t < h) this.yWl = this.SWl.slice(), this.pWl = !1;
    else {
      this.yWl = r.slice();
      for (let e = 0; e < i - r.length; e++) this.yWl.unshift(0);
      this.vWl = 0 <= i - 2 ? i - 2 : 0, this.pWl = !this.EWl(this.vWl, this.yWl, this.SWl)
    }
    this.IWl(this.yWl)
  }
}
exports.FarmGoldScoreItem = FarmGoldScoreItem;
//# sourceMappingURL=FarmGoldScoreItem.js.map