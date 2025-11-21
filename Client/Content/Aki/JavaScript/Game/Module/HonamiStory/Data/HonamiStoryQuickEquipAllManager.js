"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryQuickEquipAllManager = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
class HonamiStoryQuickRoleData {
  constructor() {
    this.RoleId = 0;
    this.RoleData = undefined;
    this.SuitNeedList = [];
    this.SuitNeedMap = new Map();
    this.SlotUnlockCount = 0;
    this.xJd = [];
    this.BJd = new Map();
    this.BestResult = [];
    this.BestPower = 0;
    this.RealBestPower = 0;
    this.wRm = new HonamiSortOrderListClass();
    this.kJd = (t, i) => {
      var r = this.GetPower(i);
      var o = this.GetPower(t);
      if (r === o) {
        t = t;
        if (HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(this.RoleId, t.GetRoleId())) {
          return -1;
        } else {
          t = i;
          if (HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(this.RoleId, t.GetRoleId())) {
            return 1;
          } else {
            return 0;
          }
        }
      } else {
        return r - o;
      }
    };
    this.KCm = (t, i) => {
      return this.GetPower(i, false) - this.GetPower(t, false);
    };
  }
  Init(t) {
    this.Clear();
    this.RoleData = t;
    this.RoleId = this.RoleData.GetParentRoleId();
    this.qJd();
    this.SlotUnlockCount = this.RoleData.GetUnlockCounts();
    t = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponData(this.RoleData.GetWeaponId());
    if (t) {
      this.xJd = t.PluginTags;
    }
  }
  Clear() {
    this.BJd.clear();
    this.xJd.length = 0;
    this.SuitNeedList.length = 0;
    this.SuitNeedMap.clear();
  }
  qJd() {
    if (!(this.RoleData.GetParentRoleId() <= 0)) {
      var t = this.RoleData.GetWeaponId();
      if (!(t <= 0)) {
        t = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponData(t);
        if (t) {
          this.SuitNeedList = [...t.SuitId];
          for (const o of this.SuitNeedList) {
            var i = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponSuitData(o);
            var r = i.WeaponPluginType;
            if (!this.SuitNeedMap.has(r)) {
              this.SuitNeedMap.set(r, []);
            }
            this.SuitNeedMap.get(r).push(i.NeedNum);
          }
        }
      }
    }
  }
  GetMaxPower(t, i) {
    this.BestResult.length = 0;
    var r = [];
    for (let t = this.BestPower = 0; t < 3; t++) {
      r.push({
        SubType: t + 1,
        ItemList: []
      });
    }
    for (const h of t) {
      var o = h[0];
      if (!this.BJd.has(o)) {
        (s = [...h[1]]).sort(this.kJd);
        this.BJd.set(o, s);
      }
      var s = {
        SubType: o,
        ItemList: []
      };
      var e = this.BJd.get(o);
      s.ItemList = this.XCm(e, this.SlotUnlockCount * 2, i ?? new Set());
      r[o - 1] = s;
    }
    this.BestPower = this.OJd(r);
    this.RealBestPower = this.RoleData.GetPowerLevelByItemList(this.BestResult, true);
    return this.BestPower;
  }
  GetPower(t, i = true) {
    let r = t.GetBaseEnhance();
    if (i && (this.xJd.includes(t.GetWeaponTag()) && (r += t.GetWeaponEnhance()), HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(this.RoleId, t.GetRoleId()))) {
      r += t.GetRoleEnhance() + HonamiStoryDefine_1.HONAMI_ROLE_VIRTUAL_SCORE;
    }
    return r;
  }
  OJd(r) {
    let o = 0;
    for (const i of this.wRm.GetSortOrderList(3)) {
      var t = i[0];
      var s = i[1];
      var e = i[2];
      for (let i = 0; i <= this.SlotUnlockCount; i++) {
        var h = new Set();
        var a = [];
        [h, a] = this.LRm(r[t].ItemList, h, i);
        for (let t = 0; t <= this.SlotUnlockCount - i; t++) {
          var n = new Set(h);
          var l = [];
          [n, l] = this.LRm(r[s].ItemList, n, t);
          var f = [];
          [n, f] = this.LRm(r[e].ItemList, n, this.SlotUnlockCount - i - t);
          var n = a.concat(l).concat(f);
          var l = this.RoleData.GetPowerLevelByItemList(n, false);
          if (l > o) {
            this.BestResult = n;
            o = l;
          }
        }
      }
    }
    return o;
  }
  XCm(t, i, r) {
    let o = 0;
    var s = new Set();
    for (var e = [], h = []; o < t.length && e.length < i;) {
      var a;
      var n = t[o];
      if (r.has(n)) {
        o++;
      } else {
        if ((a = n.GetGroupId()) !== 0 && !s.has(a)) {
          e.push(n);
          s.add(a);
        } else {
          h.push(n);
        }
        o++;
      }
    }
    h.sort(this.KCm);
    return this.YCm(e, h, i);
  }
  YCm(t, i, r) {
    var o;
    var s = [];
    let e = 0;
    let h = 0;
    while ((e < t.length || h < i.length) && s.length < r) {
      if (e < t.length && h < i.length) {
        o = this.GetPower(t[e]) >= this.GetPower(i[h], false);
        s.push(o ? t[e] : i[h]);
        e += o ? 1 : 0;
        h += o ? 0 : 1;
      } else if (e >= t.length) {
        s.push(i[h]);
        h++;
      } else if (h >= i.length) {
        s.push(t[e]);
        e++;
      }
    }
    return s;
  }
  LRm(t, i, r) {
    var o = new Set(i);
    var s = [];
    var e = [];
    for (const h of t) {
      (h.GetRoleId() === this.RoleId && this.RoleId !== 0 ? o.has(h.GetGroupId()) ? e : (o.add(h.GetGroupId()), s) : s).push(h);
    }
    t = this.YCm(s, e, r);
    for (const a of t) {
      if (a.GetGroupId() !== 0) {
        i.add(a.GetGroupId());
      }
    }
    return [i, t];
  }
  ApplyQuickEquip(i, r, o, s) {
    var e = this.RoleData.GetHonamiStoryPluginPosition(0);
    var h = [];
    var a = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2) : undefined;
    for (let t = 0; t < this.BestResult.length; t++) {
      var n;
      var l = e + t;
      var f = this.BestResult[t];
      if (i.has(f) && l === f.GetPosition()) {
        i.delete(f);
      } else if (i.has(f)) {
        i.delete(f);
        n = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(f, l);
        r.B$d.push(n);
      } else {
        n = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(f);
        (a === undefined || a.GetItemDataByInstanceId(f.GetIncId(), false) !== undefined ? (h.push(f.GetPosition()), o) : s).B$d.push(n);
        f = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(f, l);
        r.B$d.push(f);
      }
    }
    return h;
  }
}
class HonamiSortOrderListClass {
  constructor() {
    this.aIm = [];
    this.hIm = [];
    this.lIm = [];
    this._Im = 0;
  }
  GetSortOrderList(i) {
    if (i !== this._Im) {
      this.lIm.length = 0;
      this.aIm.length = 0;
      for (let t = this.hIm.length = 0; t < i; t++) {
        this.hIm.push(false);
      }
      this.uIm();
      this._Im = i;
    }
    return this.lIm;
  }
  uIm() {
    if (this.aIm.length === this.hIm.length) {
      this.lIm.push(this.aIm.slice());
    } else {
      for (let t = 0; t < this.hIm.length; t++) {
        if (!this.hIm[t]) {
          this.hIm[t] = true;
          this.aIm.push(t);
          this.uIm();
          this.aIm.pop();
          this.hIm[t] = false;
        }
      }
    }
  }
}
class HonamiStoryQuickEquipAllManager {
  constructor() {
    this.CurPowerLevel = 0;
    this.CurRealPowerLevel = 0;
    this.GJd = 0;
    this.IsDirty = true;
    this.FJd = new Set();
    this.pXe = new Map();
    this.cIm = new HonamiSortOrderListClass();
  }
  Refresh(t) {
    if (!this.IsDirty && !t) {
      return false;
    }
    this.IsDirty = false;
    this.GJd = this.CurPowerLevel;
    this.CurPowerLevel = 0;
    this.CurRealPowerLevel = 0;
    this.FJd.clear();
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData().GetRoleEquipDataList();
    this.pXe.clear();
    for (let t = 0; t < i.length; t++) {
      var r = i[t];
      var o = new HonamiStoryQuickRoleData();
      o.Init(r);
      this.pXe.set(t, o);
    }
    var s = this.NJd(i);
    let e = 0;
    let h = [];
    var a;
    var t = this.cIm.GetSortOrderList(i.length);
    var n = new Map();
    for (let t = 0; t < this.pXe.size; t++) {
      var l = this.pXe.get(t);
      if (l.RoleId === 0) {
        n.set(t, []);
      } else {
        l = this.PRm(l.RoleId, s);
        n.set(t, l);
      }
    }
    for (const u of t) {
      var f;
      var _ = new Set();
      for ([, f] of n) {
        for (const m of f) {
          _.add(m);
        }
      }
      var v = [];
      for (const y of u) {
        for (const M of n.get(y)) {
          _.delete(M);
        }
        var c = this.pXe.get(y).GetMaxPower(s, _);
        v.push([y, c]);
        for (const H of this.pXe.get(y).BestResult) {
          _.add(H);
        }
      }
      let t = 0;
      for (const p of v) {
        t += p[1];
      }
      if (t > e) {
        e = t;
        h = u;
      }
    }
    if (e > 0) {
      for (var [, S] of n) {
        for (const d of S) {
          this.FJd.add(d);
        }
      }
      for (const w of h) {
        for (const g of n.get(w)) {
          this.FJd.delete(g);
        }
        this.pXe.get(w).GetMaxPower(s, this.FJd);
        for (const L of this.pXe.get(w).BestResult) {
          this.FJd.add(L);
        }
      }
    }
    for ([, a] of this.pXe) {
      this.CurPowerLevel += a.BestPower;
      this.CurRealPowerLevel += a.RealBestPower;
    }
    t = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().PowerLevel;
    return this.CurPowerLevel > this.GJd && this.CurPowerLevel > t;
  }
  GetCurPowerLevel() {
    return this.CurPowerLevel;
  }
  GetRealPowerLevel() {
    return this.CurRealPowerLevel;
  }
  ApplyQuickAll() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData().GetRoleEquipDataList();
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    var r = i ? 2 : 1;
    var o = new Set();
    for (const u of t) {
      for (const m of u.GetSlotList()) {
        var s = m.GetItemData();
        if (s) {
          o.add(s);
        }
      }
    }
    var e;
    var t = [];
    var h = new Protocol_1.Aki.Protocol.q$d();
    h.Qmd = 4;
    var a = new Protocol_1.Aki.Protocol.q$d();
    a.Qmd = r;
    var n = new Protocol_1.Aki.Protocol.q$d();
    n.Qmd = 3;
    let l = [];
    for ([, e] of this.pXe) {
      var f = e.ApplyQuickEquip(o, h, a, n);
      l = l.concat(f);
    }
    l.sort((t, i) => t - i);
    var _ = new Set();
    if (o.size > 0) {
      if (i && o.size > l.length && Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 77, "QuickAll Apply Error");
      }
      var v = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(r);
      for (const y of o) {
        var c = l.shift();
        if (c !== undefined && c < v.GetCapacity()) {
          var S = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(y);
          h.B$d.push(S);
          var S = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(y, c);
          a.B$d.push(S);
          _.add(c);
        } else {
          S = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(v.GetEmptyGridSet(), y, v.GetWidthCount(), _);
          if (S.Position === -1 || S.Position >= v.GetCapacity()) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoSpaceForQuickAll");
            return;
          }
          c = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(y);
          h.B$d.push(c);
          c = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(y, S.Position);
          a.B$d.push(c);
          _.add(S.Position);
        }
      }
    }
    if (h.B$d.length > 0) {
      t.push(h);
    }
    if (a.B$d.length > 0) {
      t.push(a);
    }
    if (n.B$d.length > 0) {
      t.push(n);
    }
    if (t.length > 0) {
      HonamiStoryController_1.HonamiStoryController.SendHonamiStoryBagOperateRequest(t);
    }
  }
  NJd(t) {
    var i;
    var r = new Map();
    for (const h of t) {
      for (const a of h.GetPluginList()) {
        if (a) {
          i = a.GetSubType();
          if (!r.has(i)) {
            r.set(i, []);
          }
          r.get(i).push(a);
        }
      }
    }
    var o;
    var s;
    var t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    var e = t ? 2 : 1;
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(e);
    if (e) {
      for (const n of e.GetItemDataList()) {
        if (n.GetItemType() === 1) {
          o = n.GetSubType();
          if (!r.has(o)) {
            r.set(o, []);
          }
          r.get(o).push(n);
        }
      }
      if (t) {
        for (const l of ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(3).GetItemDataList()) {
          if (l.GetItemType() === 1) {
            s = l.GetSubType();
            if (!r.has(s)) {
              r.set(s, []);
            }
            r.get(s).push(l);
          }
        }
      }
    }
    return r;
  }
  SetDirty() {
    this.FJd.clear();
    this.pXe.clear();
    this.IsDirty = true;
  }
  GetDirty() {
    return this.IsDirty;
  }
  PRm(t, i) {
    var r = [];
    if (!(t <= 0)) {
      var o;
      var s;
      var e = new Map();
      for ([, o] of i) {
        for (const n of o) {
          var h;
          var a = n;
          if (HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(t, a.GetRoleId()) && (h = a.GetGroupId(), a = a.GetBaseEnhance() + a.GetRoleEnhance(), !e.has(h) || e.get(h)[0] < a)) {
            e.set(h, [a, n]);
          }
        }
      }
      for ([, [, s]] of e) {
        r.push(s);
      }
    }
    return r;
  }
}
exports.HonamiStoryQuickEquipAllManager = HonamiStoryQuickEquipAllManager;
//# sourceMappingURL=HonamiStoryQuickEquipAllManager.js.map