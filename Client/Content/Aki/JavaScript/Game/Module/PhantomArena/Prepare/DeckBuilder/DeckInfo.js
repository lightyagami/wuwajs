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
    this.yFm = undefined;
    this.tP1 = [];
    this.iP1 = new Map();
    this.kV1 = new Map();
    this.Mbu = new Map();
    this.rP1 = [];
    this.JTu = undefined;
    this.pYm = undefined;
    this.Sbu = new Map();
    this.ZTu = 0;
    this.SFm = 0;
    this.vYm = 0;
    this.sP1 = 0;
    this.aP1 = 0;
    this.OV1 = 0;
    this.ebu = 0;
    this.MFm = 0;
    this.yYm = 0;
    this.GV1 = 0;
    this.tbu = false;
    this.SYm = 0;
    this.MYm = 0;
  }
  DeepCopy() {
    var t;
    var i;
    var s = new DeckInfo();
    s.L81 = this.L81;
    s.w81 = this.w81;
    s.eP1 = this.eP1;
    s.BV1 = this.BV1;
    s.yFm = this.yFm;
    s.OV1 = this.OV1;
    s.ebu = this.ebu;
    s.MFm = this.MFm;
    s.yYm = this.yYm;
    s.GV1 = this.GV1;
    s.tbu = this.tbu;
    s.zTu = this.zTu;
    for ([t, i] of this.Sbu) {
      s.Sbu.set(t, i);
    }
    for (const r of this.tP1) {
      var e = s.AddCard({
        CardId: r.CardId,
        Cost: r.Cost,
        Element: r.Element,
        MaxCount: r.Count,
        AddCount: r.Count,
        CardType: r.CardType
      });
      if (e !== 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "卡组信息深拷贝失败", ["Result", e], ["CardId", r.CardId]);
      }
    }
    return s;
  }
  CheckCanAddCard(t) {
    var i;
    var s;
    var e = t.AddCount;
    if (e === 0) {
      return 11;
    } else if ((s = t.Cost === this.zTu) && this.tbu) {
      return 1;
    } else if (s && e + this.ZTu > this.ebu) {
      return 2;
    } else if ((i = t.CardType === 3) && e + this.SFm > this.MFm) {
      return 3;
    } else if (t.CardType === 2 && e + this.vYm > this.yYm) {
      return 4;
    } else if (!s && !i && e + this.sP1 > this.OV1) {
      return 6;
    } else if (this.CheckCanAddElement(t.Element)) {
      i = (i = this.iP1.get(t.CardId)) ? i.Count : 0;
      if (t.MaxCount < i + e) {
        if (s) {
          return 5;
        } else {
          return 7;
        }
      } else {
        i = this.GetCardMaxLimitByCost(t.Cost);
        s = this.GetCardCountByCost(t.Cost);
        if (i > 0 && i < s + e) {
          if (t.Cost === 3) {
            return 9;
          } else {
            return 10;
          }
        } else {
          return 0;
        }
      }
    } else {
      return 8;
    }
  }
  AddCard(i) {
    var t = this.CheckCanAddCard(i);
    if (t === 0) {
      var s;
      var e = i.AddCount;
      var r = i.Cost === this.zTu;
      var h = i.CardType === 3;
      var o = i.CardType === 2;
      let t = this.iP1.get(i.CardId);
      if (t) {
        t.Count += e;
      } else {
        s = i.CardId;
        t = {
          CardId: s,
          Cost: i.Cost,
          Count: e,
          Element: i.Element,
          CardType: i.CardType
        };
        this.iP1.set(s, t);
        this.tP1.push(t);
        if (r) {
          this.JTu = t;
        } else if (h) {
          this.pYm = t;
        } else {
          this.rP1.push(t);
        }
        if (i.Element !== 0) {
          (s = this.kV1.get(i.Element) ?? []).push(t);
          this.kV1.set(i.Element, s);
        }
      }
      if (r) {
        this.ZTu += e;
      } else if (h) {
        this.SFm += e;
      } else {
        if (o) {
          this.vYm += e;
        }
        this.sP1 += e;
      }
      this.Mbu.set(i.Cost, (this.Mbu.get(i.Cost) ?? 0) + e);
      this.aP1 += e;
    }
    return t;
  }
  RemoveCard(t) {
    var i;
    var s;
    var e;
    var r;
    var h = t.CardId;
    var t = t.RemoveCount;
    var o = this.iP1.get(h);
    return !!o && !(o.Count < t) && !(i = o.Cost === this.zTu, s = o.CardType === 3, e = o.CardType === 2, o.Count -= t, o.Count === 0 && (this.iP1.delete(h), this.tP1.splice(this.tP1.indexOf(o), 1), i ? this.JTu = undefined : s ? this.pYm = undefined : this.rP1.splice(this.rP1.indexOf(o), 1), h = o.Element, r = this.kV1.get(h)) && (r.splice(r.indexOf(o), 1), r.length === 0) && this.kV1.delete(h), i ? this.ZTu -= t : s ? this.SFm -= t : (e && (this.vYm -= t), this.sP1 -= t), this.Mbu.set(o.Cost, this.Mbu.get(o.Cost) - t), this.aP1 -= t, 0);
  }
  RemoveAllCard() {
    return this.aP1 !== 0 && (this.iP1.clear(), this.tP1.length = 0, this.kV1.clear(), this.rP1.length = 0, this.JTu = undefined, this.pYm = undefined, this.ZTu = 0, this.SFm = 0, this.vYm = 0, this.sP1 = 0, this.aP1 = 0, this.Mbu.clear(), true);
  }
  RemoveCardByElements(t) {
    var i;
    var s = [];
    for (const r of this.tP1) {
      if (t.has(r.Element)) {
        i = {
          CardId: r.CardId,
          RemoveCount: r.Count
        };
        s.push(i);
      }
    }
    let e = s.length > 0;
    for (const h of s) {
      e = e && this.RemoveCard(h);
    }
    return e;
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
  GetFieldCardSlot() {
    return this.pYm;
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
    return this.OV1 + this.ebu + this.MFm;
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
  SetFieldCardCountLimit(t) {
    if (!(t < this.SFm)) {
      this.MFm = t;
    }
  }
  GetFieldCardCountLimit() {
    return this.MFm;
  }
  SetItemCardCountLimit(t) {
    if (!(t < this.vYm)) {
      this.yYm = t;
    }
  }
  GetItemCardCountLimit() {
    return this.yYm;
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
    for (var [i, s] of t) {
      this.Sbu.set(i, s);
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
  GetFieldCardCount() {
    return this.SFm;
  }
  GetNormalCardCount() {
    return this.sP1;
  }
  GetElementList() {
    var t;
    var i;
    var s = [];
    for ([t, i] of this.kV1) {
      if (i.length > 0) {
        s.push(t);
      }
    }
    return s;
  }
  GetElementSetWithPhysical() {
    var t = new Set();
    for (const i of this.tP1) {
      t.add(i.Element);
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
  SetFieldCardSkillUnlockInfo(t) {
    this.yFm = t;
  }
  GetFieldCardSkillUnlockInfo() {
    return this.yFm;
  }
  CoverToCardIdList() {
    var i = [];
    for (const s of this.tP1) {
      for (let t = 0; t < s.Count; t++) {
        i.push(s.CardId);
      }
    }
    return i;
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
    for (const i of this.tP1) {
      t.set(i.CardId, i.Count);
    }
    return {
      CardMap: t
    };
  }
  CheckDeckDifferent(t) {
    if (this.tP1.length !== t.CardMap.size) {
      return true;
    }
    for (const i of this.tP1) {
      if ((t.CardMap.get(i.CardId) ?? 0) !== i.Count) {
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
  GetCardIdList() {
    var i = [];
    for (const s of this.iP1.values()) {
      for (let t = 0; t < s.Count; t++) {
        i.push(s.CardId);
      }
    }
    return i;
  }
  SetFieldCardConditionProgress(t, i) {
    this.SYm = t;
    this.MYm = i;
  }
  GetFieldCardConditionCurNum() {
    return this.SYm;
  }
  GetFieldCardConditionTargetNum() {
    return this.MYm;
  }
}
exports.DeckInfo = DeckInfo;
//# sourceMappingURL=DeckInfo.js.map