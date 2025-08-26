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
    this.zTu = 0;
    this.tP1 = [];
    this.iP1 = new Map();
    this.kV1 = new Map();
    this.Mbu = new Map();
    this.rP1 = [];
    this.JTu = undefined;
    this.Sbu = new Map();
    this.ZTu = 0;
    this.sP1 = 0;
    this.aP1 = 0;
    this.OV1 = 0;
    this.ebu = 0;
    this.GV1 = 0;
    this.tbu = false;
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
    i.ebu = this.ebu;
    i.GV1 = this.GV1;
    i.tbu = this.tbu;
    i.zTu = this.zTu;
    for ([t, e] of this.Sbu) {
      i.Sbu.set(t, e);
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
    } else if ((i = t.Cost === this.zTu) && this.tbu) {
      return 1;
    } else if (i && s + this.ZTu > this.ebu) {
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
      var r = e.Cost === this.zTu;
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
          this.JTu = t;
        } else {
          this.rP1.push(t);
        }
        if (e.Element !== 0) {
          (i = this.kV1.get(e.Element) ?? []).push(t);
          this.kV1.set(e.Element, i);
        }
      }
      if (r) {
        this.ZTu += s;
      } else {
        this.sP1 += s;
      }
      this.Mbu.set(e.Cost, (this.Mbu.get(e.Cost) ?? 0) + s);
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
    return !!r && !(r.Count < t) && !(e = r.Cost === this.zTu, r.Count -= t, r.Count === 0 && (this.iP1.delete(s), this.tP1.splice(this.tP1.indexOf(r), 1), e ? this.JTu = undefined : this.rP1.splice(this.rP1.indexOf(r), 1), s = r.Element, i = this.kV1.get(s)) && (i.splice(i.indexOf(r), 1), i.length === 0) && this.kV1.delete(s), e ? this.ZTu -= t : this.sP1 -= t, this.Mbu.set(r.Cost, this.Mbu.get(r.Cost) - t), this.aP1 -= t, 0);
  }
  RemoveAllCard() {
    return this.aP1 !== 0 && (this.iP1.clear(), this.tP1.length = 0, this.kV1.clear(), this.rP1.length = 0, this.JTu = undefined, this.ZTu = 0, this.sP1 = 0, this.aP1 = 0, this.Mbu.clear(), true);
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
    return this.JTu;
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
    return this.OV1 + this.ebu;
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
    if (!(t < this.ZTu)) {
      this.ebu = t;
    }
  }
  GetCoreCardCountLimit() {
    return this.ebu;
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
    this.tbu = t;
  }
  IsCoreCardSlotLocked() {
    return this.tbu;
  }
  SetCostToMaxCardLimitMap(t) {
    for (var [e, i] of t) {
      this.Sbu.set(e, i);
    }
  }
  GetCostToMaxCardLimitMap() {
    return this.Sbu;
  }
  GetCardMaxLimitByCost(t) {
    return this.Sbu.get(t) ?? 0;
  }
  GetCardSlotList() {
    return this.tP1;
  }
  GetTotalCardCount() {
    return this.aP1;
  }
  GetCoreCardCount() {
    return this.ZTu;
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
    if (this.JTu && this.JTu.Element !== 0) {
      t.push(this.JTu.Element);
    }
    return t;
  }
  CanDeckBeUsed() {
    return this.IsDeckFull() && this.BV1;
  }
  IsDeckFull() {
    return this.tbu && this.sP1 === this.OV1 || !this.tbu && this.aP1 === this.GetTotalCardCountLimit();
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
    return this.zTu;
  }
  SetCoreCost(t) {
    this.zTu = t;
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
    if (this.JTu) {
      return this.JTu.CardId;
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
    return this.Mbu.get(t) ?? 0;
  }
}
exports.DeckInfo = DeckInfo;
//# sourceMappingURL=DeckInfo.js.map