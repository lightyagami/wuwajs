"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckInfo = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class DeckInfo {
  constructor() {
    this.L81 = PhantomArenaDefine_1.DECK_ID_NONE;
    this.w81 = PhantomArenaDefine_1.DECK_ID_NONE;
    this.eP1 = "";
    this.BV1 = false;
    this.PTu = 0;
    this.tP1 = [];
    this.iP1 = new Map();
    this.kV1 = new Map();
    this.ibu = new Map();
    this.rP1 = [];
    this.xTu = undefined;
    this.tbu = new Map();
    this.UTu = 0;
    this.sP1 = 0;
    this.aP1 = 0;
    this.OV1 = 0;
    this.DTu = 0;
    this.GV1 = 0;
    this.BTu = false;
  }
  DeepCopy() {
    var t;
    var e;
    var i = new DeckInfo();
    i.L81 = this.L81;
    i.w81 = this.w81;
    i.eP1 = this.eP1;
    i.BV1 = this.BV1;
    i.OV1 = this.OV1;
    i.DTu = this.DTu;
    i.GV1 = this.GV1;
    i.BTu = this.BTu;
    i.PTu = this.PTu;
    for ([t, e] of this.tbu) {
      i.tbu.set(t, e);
    }
    for (const r of this.tP1) {
      var s = i.AddCard({
        CardId: r.CardId,
        Cost: r.Cost,
        Element: r.Element,
        MaxCount: r.Count,
        AddCount: r.Count
      });
      if (s !== 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "卡组信息深拷贝失败", ["Result", s], ["CardId", r.CardId]);
      }
    }
    return i;
  }
  CheckCanAddCard(t) {
    var e;
    var i;
    var s = t.AddCount;
    if (s === 0) {
      return 9;
    } else if ((i = t.Cost === this.PTu) && this.BTu) {
      return 1;
    } else if (i && s + this.UTu > this.DTu) {
      return 2;
    } else if (!i && s + this.sP1 > this.OV1) {
      return 4;
    } else if (this.CheckCanAddElement(t.Element)) {
      e = (e = this.iP1.get(t.CardId)) ? e.Count : 0;
      if (t.MaxCount < e + s) {
        if (i) {
          return 3;
        } else {
          return 5;
        }
      } else {
        e = this.GetCardMaxLimitByCost(t.Cost);
        i = this.GetCardCountByCost(t.Cost);
        if (e > 0 && e < i + s) {
          if (t.Cost === 3) {
            return 7;
          } else {
            return 8;
          }
        } else {
          return 0;
        }
      }
    } else {
      return 6;
    }
  }
  AddCard(e) {
    var t = this.CheckCanAddCard(e);
    if (t === 0) {
      var i;
      var s = e.AddCount;
      var r = e.Cost === this.PTu;
      let t = this.iP1.get(e.CardId);
      if (t) {
        t.Count += s;
      } else {
        i = e.CardId;
        t = {
          CardId: i,
          Cost: e.Cost,
          Count: s,
          Element: e.Element
        };
        this.iP1.set(i, t);
        this.tP1.push(t);
        if (r) {
          this.xTu = t;
        } else {
          this.rP1.push(t);
        }
        if (e.Element !== 0) {
          (i = this.kV1.get(e.Element) ?? []).push(t);
          this.kV1.set(e.Element, i);
        }
      }
      if (r) {
        this.UTu += s;
      } else {
        this.sP1 += s;
      }
      this.ibu.set(e.Cost, (this.ibu.get(e.Cost) ?? 0) + s);
      this.aP1 += s;
    }
    return t;
  }
  RemoveCard(t) {
    var e;
    var i;
    var s = t.CardId;
    var t = t.RemoveCount;
    var r = this.iP1.get(s);
    return !!r && !(r.Count < t) && !(e = r.Cost === this.PTu, r.Count -= t, r.Count === 0 && (this.iP1.delete(s), this.tP1.splice(this.tP1.indexOf(r), 1), e ? this.xTu = undefined : this.rP1.splice(this.rP1.indexOf(r), 1), s = r.Element, i = this.kV1.get(s)) && (i.splice(i.indexOf(r), 1), i.length === 0) && this.kV1.delete(s), e ? this.UTu -= t : this.sP1 -= t, this.ibu.set(r.Cost, this.ibu.get(r.Cost) - t), this.aP1 -= t, 0);
  }
  RemoveAllCard() {
    return this.aP1 !== 0 && (this.iP1.clear(), this.tP1.length = 0, this.kV1.clear(), this.rP1.length = 0, this.xTu = undefined, this.UTu = 0, this.sP1 = 0, this.aP1 = 0, this.ibu.clear(), true);
  }
  RemoveCardByElements(t) {
    var e;
    var i = [];
    for (const r of this.tP1) {
      if (t.has(r.Element)) {
        e = {
          CardId: r.CardId,
          RemoveCount: r.Count
        };
        i.push(e);
      }
    }
    let s = i.length > 0;
    for (const h of i) {
      s = s && this.RemoveCard(h);
    }
    return s;
  }
  GetCardCount(t) {
    t = this.iP1.get(t);
    if (t) {
      return t.Count;
    } else {
      return 0;
    }
  }
  GetCoreCardSlot() {
    return this.xTu;
  }
  GetNormalCardSlotList() {
    return this.rP1;
  }
  SetName(t) {
    this.eP1 = t;
  }
  GetName() {
    return this.eP1;
  }
  GetTotalCardCountLimit() {
    return this.OV1 + this.DTu;
  }
  SetNormalCardCountLimit(t) {
    if (!(t < this.sP1)) {
      this.OV1 = t;
    }
  }
  GetNormalCardCountLimit() {
    return this.OV1;
  }
  SetCoreCardCountLimit(t) {
    if (!(t < this.UTu)) {
      this.DTu = t;
    }
  }
  GetCoreCardCountLimit() {
    return this.DTu;
  }
  SetElementCountLimit(t) {
    if (!(t < this.GV1)) {
      this.GV1 = t;
    }
  }
  GetElementCountLimit() {
    return this.GV1;
  }
  SetIsCoreCardSlotLocked(t) {
    this.BTu = t;
  }
  IsCoreCardSlotLocked() {
    return this.BTu;
  }
  SetCostToMaxCardLimitMap(t) {
    for (var [e, i] of t) {
      this.tbu.set(e, i);
    }
  }
  GetCostToMaxCardLimitMap() {
    return this.tbu;
  }
  GetCardMaxLimitByCost(t) {
    return this.tbu.get(t) ?? 0;
  }
  GetCardSlotList() {
    return this.tP1;
  }
  GetTotalCardCount() {
    return this.aP1;
  }
  GetCoreCardCount() {
    return this.UTu;
  }
  GetNormalCardCount() {
    return this.sP1;
  }
  GetElementList() {
    var t;
    var e;
    var i = [];
    for ([t, e] of this.kV1) {
      if (e.length > 0) {
        i.push(t);
      }
    }
    return i;
  }
  GetElementSetWithPhysical() {
    var t = new Set();
    for (const e of this.tP1) {
      t.add(e.Element);
    }
    return t;
  }
  GetCoreElementList() {
    var t = [];
    if (this.xTu && this.xTu.Element !== 0) {
      t.push(this.xTu.Element);
    }
    return t;
  }
  CanDeckBeUsed() {
    return this.IsDeckFull() && this.BV1;
  }
  IsDeckFull() {
    return this.BTu && this.sP1 === this.OV1 || !this.BTu && this.aP1 === this.GetTotalCardCountLimit();
  }
  GetDeckName() {
    return this.eP1;
  }
  SetDeckName(t) {
    this.eP1 = t;
  }
  GetCanUse() {
    return this.BV1;
  }
  SetCanUse(t) {
    this.BV1 = t;
  }
  GetCoreCost() {
    return this.PTu;
  }
  SetCoreCost(t) {
    this.PTu = t;
  }
  SetDeckServerId(t) {
    this.L81 = t;
  }
  GetDeckServerId() {
    return this.L81;
  }
  SetDeckConfigId(t) {
    this.w81 = t;
  }
  GetDeckConfigId() {
    return this.w81;
  }
  CoverToCardIdList() {
    var e = [];
    for (const i of this.tP1) {
      for (let t = 0; t < i.Count; t++) {
        e.push(i.CardId);
      }
    }
    return e;
  }
  GetDeckFaceCardId() {
    if (this.xTu) {
      return this.xTu.CardId;
    } else if (this.rP1.length > 0) {
      this.rP1.sort(PhantomArenaDefine_1.cardSlotDefaultSortFunc);
      return this.rP1[0].CardId;
    } else {
      return 0;
    }
  }
  Record() {
    var t = new Map();
    for (const e of this.tP1) {
      t.set(e.CardId, e.Count);
    }
    return {
      CardMap: t
    };
  }
  CheckDeckDifferent(t) {
    if (this.tP1.length !== t.CardMap.size) {
      return true;
    }
    for (const e of this.tP1) {
      if ((t.CardMap.get(e.CardId) ?? 0) !== e.Count) {
        return true;
      }
    }
    return false;
  }
  CheckCanAddElement(t) {
    return t === 0 || !!this.kV1.has(t) || this.kV1.size < this.GV1;
  }
  IsElementFull() {
    return this.kV1.size >= this.GV1;
  }
  GetCardCountByCost(t) {
    return this.ibu.get(t) ?? 0;
  }
}
exports.DeckInfo = DeckInfo;
//# sourceMappingURL=DeckInfo.js.map