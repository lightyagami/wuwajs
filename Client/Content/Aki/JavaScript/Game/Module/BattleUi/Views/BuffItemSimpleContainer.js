"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BuffItemSimpleContainer = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CharacterBuffController_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffController"),
  GameplayCueController_1 = require("../../../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController"),
  BuffItemInfo_1 = require("../BuffItemInfo"),
  BuffItem_1 = require("./BuffItem"),
  MAX_ITEM_COUNT = 6,
  TICK_INTERVAL_FRAME_AT_MORE = 2;
class BuffItemSimpleContainer {
  constructor() {
    this.dkn = [], this.gkn = new Map, this.fkn = [], this._nt = [], this.unt = [], this.pkn = void 0, this.aa = 0, this.rJl = !1, this.PGl = 0
  }
  Init(t, e = MAX_ITEM_COUNT, i = !1) {
    this.pkn = t, this.aa = e, this.rJl = i
  }
  Tick(e) {
    var t = Time_1.Time.Frame;
    if (!(t < this.PGl)) {
      this.dkn.length > MAX_ITEM_COUNT && (this.PGl = t + TICK_INTERVAL_FRAME_AT_MORE);
      for (const s of this.dkn) {
        var i = s.BuffItem;
        if (!i) break;
        i.Tick(e)
      }
      for (let t = this._nt.length - 1; 0 <= t; t--) {
        var r = this._nt[t];
        r.TickHiding(e) || (this._nt.splice(t, 1), r.GetRootItem().SetHierarchyIndex(this.dkn.length + this._nt.length), this.unt.push(r))
      }
    }
  }
  RefreshBuff(t) {
    this.ClearAll();
    for (const e of t) this.AddBuffByBuffId(e)
  }
  AddBuffByBuffId(t) {
    var e = CharacterBuffController_1.default.GetBuffDefinition(t);
    if (e?.GameplayCueIds)
      for (const r of e.GameplayCueIds) {
        var i = GameplayCueController_1.GameplayCueController.GetConfigById(r);
        i && this.AddBuffByCue(i, t)
      }
  }
  AddBuffByCue(e, i, r = !1) {
    if (this.oJl(e)) {
      var s = e.Id;
      let t = this.gkn.get(s);
      if (t) return t.BuffHandleSet.has(i) ? void 0 : void t.BuffHandleSet.add(i);
      (t = this.Mkn(e)).BuffHandleSet.add(i), this.gkn.set(s, t), this.Ekn(t, r)
    }
  }
  oJl(t) {
    return !(this.rJl && 4 < t.Parameters.length && "1" === t.Parameters[4])
  }
  RemoveBuffByBuffId(t) {
    var e = CharacterBuffController_1.default.GetBuffDefinition(t);
    if (e?.GameplayCueIds)
      for (const r of e.GameplayCueIds) {
        var i = GameplayCueController_1.GameplayCueController.GetConfigById(r);
        i && this.RemoveBuffByCue(i, t)
      }
  }
  RemoveBuffByCue(t, e, i = !1) {
    var t = t.Id,
      r = this.gkn.get(t);
    r && r.BuffHandleSet.has(e) && (r.BuffHandleSet.delete(e), r.BuffHandleSet.size <= 0) && (this.gkn.delete(t), this.ykn(r, i))
  }
  Mkn(t) {
    let e = void 0;
    return (e = 0 < this.fkn.length ? this.fkn.pop() : new BuffItemInfo_1.BuffItemInfo).SortId = BuffItemInfo_1.BuffItemInfo.GenSortId(), e.Priority = t.Priority, e.BuffCueConfig = t, e
  }
  Ikn(t) {
    t.Clear(), this.fkn.push(t)
  }
  Ekn(t, e = !1) {
    var i = this.Tkn(t);
    i < this.aa && (this.dkn.length > this.aa && this.DeactivateBuffItem(this.dkn[this.aa], !1), t.BuffItem = this.cst(), this.mst(t, i, e))
  }
  Tkn(e) {
    var i = this.dkn.length;
    for (let t = 0; t < i; t++) {
      var r = this.dkn[t];
      if (0 <= BuffItemInfo_1.BuffItemInfo.Compare(r, e)) return this.dkn.splice(t, 0, e), t
    }
    return this.dkn.push(e), i
  }
  ykn(t, e = !1) {
    var i = this.dkn.indexOf(t);
    i < 0 || (this.dkn.splice(i, 1), i < this.aa && (this.DeactivateBuffItem(t, e), this.dkn.length >= this.aa) && ((i = this.dkn[this.aa - 1]).BuffItem && Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "有残留的buffItem引用", ["cueId", i.BuffCueConfig?.Id]), i.BuffItem = this.cst(), this.mst(i, this.aa - 1, !1)), this.Ikn(t))
  }
  cst() {
    return 0 < this.unt.length ? this.unt.pop() : new BuffItem_1.BuffItem(this.pkn)
  }
  mst(t, e, i = !1) {
    var r = t.BuffItem;
    r.Activate(t.BuffCueConfig, t.SingleBuff, i), e <= 0 ? r.GetRootItem().SetHierarchyIndex(0) : (t = this.dkn[e - 1].BuffItem) ? r.GetRootItem().SetHierarchyIndex(t.GetRootItem().GetHierarchyIndex() + 1) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "要插入的buff图标前面的buff没有buffItem")
  }
  DeactivateBuffItem(t, e = !1) {
    var i = t.BuffItem;
    i && (t.BuffItem = void 0, (e ? (i.DeactivateWithCloseAnim(), this._nt) : (i.Deactivate(), i.GetRootItem().SetHierarchyIndex(this.dkn.length + this._nt.length), this.unt)).push(i))
  }
  ClearAll() {
    for (const t of this.dkn) t.BuffItem?.DestroyCompatible();
    this.dkn.length = 0, this.gkn.clear(), this.fkn.length = 0;
    for (const e of this._nt) e.Deactivate(), e.DestroyCompatible();
    this._nt.length = 0;
    for (const i of this.unt) i.DestroyCompatible();
    this.unt.length = 0, this.PGl = 0
  }
}
exports.BuffItemSimpleContainer = BuffItemSimpleContainer;
//# sourceMappingURL=BuffItemSimpleContainer.js.map