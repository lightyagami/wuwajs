"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckInfo = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class DeckInfo {
  constructor() {
    this.Q51 = PhantomArenaDefine_1.DECK_ID_NONE, this.K51 = PhantomArenaDefine_1.DECK_ID_NONE, this.bA1 = "", this.oV1 = !1, this.Ycu = 0, this.RA1 = [], this.LA1 = new Map, this.nV1 = new Map, this.adu = new Map, this.wA1 = [], this.zcu = void 0, this.sdu = new Map, this.Jcu = 0, this.xA1 = 0, this.DA1 = 0, this.sV1 = 0, this.Zcu = 0, this.hV1 = 0, this.edu = !1
  }
  DeepCopy() {
    var t, e, i = new DeckInfo;
    i.Q51 = this.Q51, i.K51 = this.K51, i.bA1 = this.bA1, i.oV1 = this.oV1, i.sV1 = this.sV1, i.Zcu = this.Zcu, i.hV1 = this.hV1, i.edu = this.edu, i.Ycu = this.Ycu;
    for ([t, e] of this.sdu) i.sdu.set(t, e);
    for (const r of this.RA1) {
      var s = i.AddCard({
        CardId: r.CardId,
        Cost: r.Cost,
        Element: r.Element,
        MaxCount: r.Count,
        AddCount: r.Count
      });
      0 !== s && Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "卡组信息深拷贝失败", ["Result", s], ["CardId", r.CardId])
    }
    return i
  }
  CheckCanAddCard(t) {
    var e, i, s = t.AddCount;
    return 0 === s ? 9 : (i = t.Cost === this.Ycu) && this.edu ? 1 : i && s + this.Jcu > this.Zcu ? 2 : !i && s + this.xA1 > this.sV1 ? 4 : this.CheckCanAddElement(t.Element) ? (e = (e = this.LA1.get(t.CardId)) ? e.Count : 0, t.MaxCount < e + s ? i ? 3 : 5 : (e = this.GetCardMaxLimitByCost(t.Cost), i = this.GetCardCountByCost(t.Cost), 0 < e && e < i + s ? 3 === t.Cost ? 7 : 8 : 0)) : 6
  }
  AddCard(e) {
    var t = this.CheckCanAddCard(e);
    if (0 === t) {
      var i, s = e.AddCount,
        r = e.Cost === this.Ycu;
      let t = this.LA1.get(e.CardId);
      t ? t.Count += s : (i = e.CardId, t = {
        CardId: i,
        Cost: e.Cost,
        Count: s,
        Element: e.Element
      }, this.LA1.set(i, t), this.RA1.push(t), r ? this.zcu = t : this.wA1.push(t), 0 !== e.Element && ((i = this.nV1.get(e.Element) ?? []).push(t), this.nV1.set(e.Element, i))), r ? this.Jcu += s : this.xA1 += s, this.adu.set(e.Cost, (this.adu.get(e.Cost) ?? 0) + s), this.DA1 += s
    }
    return t
  }
  RemoveCard(t) {
    var e, i, s = t.CardId,
      t = t.RemoveCount,
      r = this.LA1.get(s);
    return !(!r || r.Count < t || (e = r.Cost === this.Ycu, r.Count -= t, 0 === r.Count && (this.LA1.delete(s), this.RA1.splice(this.RA1.indexOf(r), 1), e ? this.zcu = void 0 : this.wA1.splice(this.wA1.indexOf(r), 1), s = r.Element, i = this.nV1.get(s)) && (i.splice(i.indexOf(r), 1), 0 === i.length) && this.nV1.delete(s), e ? this.Jcu -= t : this.xA1 -= t, this.adu.set(r.Cost, this.adu.get(r.Cost) - t), this.DA1 -= t, 0))
  }
  RemoveAllCard() {
    return 0 !== this.DA1 && (this.LA1.clear(), this.RA1.length = 0, this.nV1.clear(), this.wA1.length = 0, this.zcu = void 0, this.Jcu = 0, this.xA1 = 0, this.DA1 = 0, this.adu.clear(), !0)
  }
  RemoveCardByElements(t) {
    var e, i = [];
    for (const r of this.RA1) t.has(r.Element) && (e = {
      CardId: r.CardId,
      RemoveCount: r.Count
    }, i.push(e));
    let s = 0 < i.length;
    for (const h of i) s = s && this.RemoveCard(h);
    return s
  }
  GetCardCount(t) {
    t = this.LA1.get(t);
    return t ? t.Count : 0
  }
  GetCoreCardSlot() {
    return this.zcu
  }
  GetNormalCardSlotList() {
    return this.wA1
  }
  SetName(t) {
    this.bA1 = t
  }
  GetName() {
    return this.bA1
  }
  GetTotalCardCountLimit() {
    return this.sV1 + this.Zcu
  }
  SetNormalCardCountLimit(t) {
    t < this.xA1 || (this.sV1 = t)
  }
  GetNormalCardCountLimit() {
    return this.sV1
  }
  SetCoreCardCountLimit(t) {
    t < this.Jcu || (this.Zcu = t)
  }
  GetCoreCardCountLimit() {
    return this.Zcu
  }
  SetElementCountLimit(t) {
    t < this.hV1 || (this.hV1 = t)
  }
  GetElementCountLimit() {
    return this.hV1
  }
  SetIsCoreCardSlotLocked(t) {
    this.edu = t
  }
  IsCoreCardSlotLocked() {
    return this.edu
  }
  SetCostToMaxCardLimitMap(t) {
    for (var [e, i] of t) this.sdu.set(e, i)
  }
  GetCostToMaxCardLimitMap() {
    return this.sdu
  }
  GetCardMaxLimitByCost(t) {
    return this.sdu.get(t) ?? 0
  }
  GetCardSlotList() {
    return this.RA1
  }
  GetTotalCardCount() {
    return this.DA1
  }
  GetCoreCardCount() {
    return this.Jcu
  }
  GetNormalCardCount() {
    return this.xA1
  }
  GetElementList() {
    var t, e, i = [];
    for ([t, e] of this.nV1) 0 < e.length && i.push(t);
    return i
  }
  GetElementSetWithPhysical() {
    var t = new Set;
    for (const e of this.RA1) t.add(e.Element);
    return t
  }
  GetCoreElementList() {
    var t = [];
    return this.zcu && 0 !== this.zcu.Element && t.push(this.zcu.Element), t
  }
  CanDeckBeUsed() {
    return this.IsDeckFull() && this.oV1
  }
  IsDeckFull() {
    return this.edu && this.xA1 === this.sV1 || !this.edu && this.DA1 === this.GetTotalCardCountLimit()
  }
  GetDeckName() {
    return this.bA1
  }
  SetDeckName(t) {
    this.bA1 = t
  }
  GetCanUse() {
    return this.oV1
  }
  SetCanUse(t) {
    this.oV1 = t
  }
  GetCoreCost() {
    return this.Ycu
  }
  SetCoreCost(t) {
    this.Ycu = t
  }
  SetDeckServerId(t) {
    this.Q51 = t
  }
  GetDeckServerId() {
    return this.Q51
  }
  SetDeckConfigId(t) {
    this.K51 = t
  }
  GetDeckConfigId() {
    return this.K51
  }
  CoverToCardIdList() {
    var e = [];
    for (const i of this.RA1)
      for (let t = 0; t < i.Count; t++) e.push(i.CardId);
    return e
  }
  GetDeckFaceCardId() {
    return this.zcu ? this.zcu.CardId : 0 < this.wA1.length ? (this.wA1.sort(PhantomArenaDefine_1.cardSlotDefaultSortFunc), this.wA1[0].CardId) : 0
  }
  Record() {
    var t = new Map;
    for (const e of this.RA1) t.set(e.CardId, e.Count);
    return {
      CardMap: t
    }
  }
  CheckDeckDifferent(t) {
    if (this.RA1.length !== t.CardMap.size) return !0;
    for (const e of this.RA1)
      if ((t.CardMap.get(e.CardId) ?? 0) !== e.Count) return !0;
    return !1
  }
  CheckCanAddElement(t) {
    return 0 === t || !!this.nV1.has(t) || this.nV1.size < this.hV1
  }
  IsElementFull() {
    return this.nV1.size >= this.hV1
  }
  GetCardCountByCost(t) {
    return this.adu.get(t) ?? 0
  }
}
exports.DeckInfo = DeckInfo;
//# sourceMappingURL=DeckInfo.js.map