"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffItemSimpleContainer = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CharacterBuffController_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffController");
const GameplayCueController_1 = require("../../../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const BuffItemInfo_1 = require("../BuffItemInfo");
const BuffItem_1 = require("./BuffItem");
const MAX_ITEM_COUNT = 6;
const TICK_INTERVAL_FRAME_AT_MORE = 2;
class BuffItemSimpleContainer {
  constructor() {
    this.dkn = [];
    this.gkn = new Map();
    this.fkn = [];
    this._nt = [];
    this.unt = [];
    this.pkn = undefined;
    this.aa = 0;
    this.rJl = false;
    this.PGl = 0;
  }
  Init(t, e = MAX_ITEM_COUNT, i = false) {
    this.pkn = t;
    this.aa = e;
    this.rJl = i;
  }
  Tick(e) {
    var t = Time_1.Time.Frame;
    if (!(t < this.PGl)) {
      if (this.dkn.length > MAX_ITEM_COUNT) {
        this.PGl = t + TICK_INTERVAL_FRAME_AT_MORE;
      }
      for (const s of this.dkn) {
        var i = s.BuffItem;
        if (!i) {
          break;
        }
        i.Tick(e);
      }
      for (let t = this._nt.length - 1; t >= 0; t--) {
        var r = this._nt[t];
        if (!r.TickHiding(e)) {
          this._nt.splice(t, 1);
          r.GetRootItem().SetHierarchyIndex(this.dkn.length + this._nt.length);
          this.unt.push(r);
        }
      }
    }
  }
  RefreshBuff(t) {
    this.ClearAll();
    for (const e of t) {
      this.AddBuffByBuffId(e);
    }
  }
  AddBuffByBuffId(t) {
    var e = CharacterBuffController_1.default.GetBuffDefinition(t);
    if (e?.GameplayCueIds) {
      for (const r of e.GameplayCueIds) {
        var i = GameplayCueController_1.GameplayCueController.GetConfigById(r);
        if (i) {
          this.AddBuffByCue(i, t);
        }
      }
    }
  }
  AddBuffByCue(e, i, r = false) {
    if (this.oJl(e)) {
      var s = e.Id;
      let t = this.gkn.get(s);
      if (t) {
        if (t.BuffHandleSet.has(i)) {
          return undefined;
        } else {
          t.BuffHandleSet.add(i);
          return;
        }
      }
      (t = this.Mkn(e)).BuffHandleSet.add(i);
      this.gkn.set(s, t);
      this.Ekn(t, r);
    }
  }
  oJl(t) {
    return !this.rJl || !(t.Parameters.length > 4) || t.Parameters[4] !== "1";
  }
  RemoveBuffByBuffId(t) {
    var e = CharacterBuffController_1.default.GetBuffDefinition(t);
    if (e?.GameplayCueIds) {
      for (const r of e.GameplayCueIds) {
        var i = GameplayCueController_1.GameplayCueController.GetConfigById(r);
        if (i) {
          this.RemoveBuffByCue(i, t);
        }
      }
    }
  }
  RemoveBuffByCue(t, e, i = false) {
    var t = t.Id;
    var r = this.gkn.get(t);
    if (r && r.BuffHandleSet.has(e) && (r.BuffHandleSet.delete(e), r.BuffHandleSet.size <= 0)) {
      this.gkn.delete(t);
      this.ykn(r, i);
    }
  }
  Mkn(t) {
    let e = undefined;
    (e = this.fkn.length > 0 ? this.fkn.pop() : new BuffItemInfo_1.BuffItemInfo()).SortId = BuffItemInfo_1.BuffItemInfo.GenSortId();
    e.Priority = t.Priority;
    e.BuffCueConfig = t;
    return e;
  }
  Ikn(t) {
    t.Clear();
    this.fkn.push(t);
  }
  Ekn(t, e = false) {
    var i = this.Tkn(t);
    if (i < this.aa) {
      if (this.dkn.length > this.aa) {
        this.DeactivateBuffItem(this.dkn[this.aa], false);
      }
      t.BuffItem = this.cst();
      this.mst(t, i, e);
    }
  }
  Tkn(e) {
    var i = this.dkn.length;
    for (let t = 0; t < i; t++) {
      var r = this.dkn[t];
      if (BuffItemInfo_1.BuffItemInfo.Compare(r, e) >= 0) {
        this.dkn.splice(t, 0, e);
        return t;
      }
    }
    this.dkn.push(e);
    return i;
  }
  ykn(t, e = false) {
    var i = this.dkn.indexOf(t);
    if (!(i < 0)) {
      this.dkn.splice(i, 1);
      if (i < this.aa && (this.DeactivateBuffItem(t, e), this.dkn.length >= this.aa)) {
        if ((i = this.dkn[this.aa - 1]).BuffItem && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "有残留的buffItem引用", ["cueId", i.BuffCueConfig?.Id]);
        }
        i.BuffItem = this.cst();
        this.mst(i, this.aa - 1, false);
      }
      this.Ikn(t);
    }
  }
  cst() {
    if (this.unt.length > 0) {
      return this.unt.pop();
    } else {
      return new BuffItem_1.BuffItem(this.pkn);
    }
  }
  mst(t, e, i = false) {
    var r = t.BuffItem;
    r.Activate(t.BuffCueConfig, t.SingleBuff, i);
    if (e <= 0) {
      r.GetRootItem().SetHierarchyIndex(0);
    } else if (t = this.dkn[e - 1].BuffItem) {
      r.GetRootItem().SetHierarchyIndex(t.GetRootItem().GetHierarchyIndex() + 1);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "要插入的buff图标前面的buff没有buffItem");
    }
  }
  DeactivateBuffItem(t, e = false) {
    var i = t.BuffItem;
    if (i) {
      t.BuffItem = undefined;
      (e ? (i.DeactivateWithCloseAnim(), this._nt) : (i.Deactivate(), i.GetRootItem().SetHierarchyIndex(this.dkn.length + this._nt.length), this.unt)).push(i);
    }
  }
  ClearAll() {
    for (const t of this.dkn) {
      t.BuffItem?.DestroyCompatible();
    }
    this.dkn.length = 0;
    this.gkn.clear();
    this.fkn.length = 0;
    for (const e of this._nt) {
      e.Deactivate();
      e.DestroyCompatible();
    }
    this._nt.length = 0;
    for (const i of this.unt) {
      i.DestroyCompatible();
    }
    this.unt.length = 0;
    this.PGl = 0;
  }
}
exports.BuffItemSimpleContainer = BuffItemSimpleContainer;
//# sourceMappingURL=BuffItemSimpleContainer.js.map