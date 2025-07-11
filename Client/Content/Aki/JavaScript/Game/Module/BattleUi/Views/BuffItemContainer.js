"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffItemContainer = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BuffItemInfo_1 = require("../BuffItemInfo");
const BuffItem_1 = require("./BuffItem");
const MAX_ITEM_COUNT = 6;
const TICK_INTERVAL_FRAME_AT_MORE = 2;
class BuffItemContainer {
  constructor() {
    this.dkn = [];
    this.Ckn = new Map();
    this.gkn = new Map();
    this.fkn = [];
    this._nt = [];
    this.unt = [];
    this.pkn = undefined;
    this.aa = 0;
    this.rJl = false;
    this.YLe = false;
    this.m1t = undefined;
    this.vkn = undefined;
    this.PGl = 0;
  }
  Init(t, i = MAX_ITEM_COUNT, s = false, e = false) {
    this.pkn = t;
    this.aa = i;
    this.rJl = s;
    this.YLe = e;
  }
  Tick(i) {
    var t = Time_1.Time.Frame;
    if (!(t < this.PGl)) {
      if (this.dkn.length > MAX_ITEM_COUNT) {
        this.PGl = t + TICK_INTERVAL_FRAME_AT_MORE;
      }
      for (const h of this.dkn) {
        var s = h.BuffItem;
        if (!s) {
          break;
        }
        s.Tick(i);
      }
      for (let t = this._nt.length - 1; t >= 0; t--) {
        var e = this._nt[t];
        if (!e.TickHiding(i)) {
          this._nt.splice(t, 1);
          e.GetRootItem().SetHierarchyIndex(this.dkn.length + this._nt.length);
          this.unt.push(e);
        }
      }
    }
  }
  RefreshBuff(t) {
    this.ClearAll();
    if (t?.IsInit) {
      this.m1t = t.Entity.GetComponent(174);
      this.vkn = t.Entity.GetComponent(190);
      t = t.Entity.GetComponent(21);
      this.Fah(t);
      if (this.YLe && (t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.GetComponent(226))) {
        this.Fah(t);
      }
    } else {
      this.m1t = undefined;
      this.vkn = undefined;
    }
  }
  Fah(t) {
    for (const s of t.GetAllCurrentCueRef()) {
      var i = s.CueConfig;
      if (i.CueType === 2 || i.CueType === 14) {
        this.AddBuffByCue(i, s.BuffHandleId);
      }
    }
  }
  AddBuffByCue(i, s, e = false) {
    var t;
    var h = i.CueType;
    if (h === 2) {
      if (this.oJl(i) && !this.Ckn.has(s) && (r = this.Skn(s))) {
        (t = this.Mkn(i)).SingleBuff = r;
        this.Ckn.set(s, t);
        this.Ekn(t, e);
      }
    } else if (h === 14 && this.oJl(i)) {
      var r = i.Id;
      let t = this.gkn.get(r);
      if (t) {
        if (t.BuffHandleSet.has(s)) {
          return undefined;
        } else {
          t.BuffHandleSet.add(s);
          return;
        }
      }
      (t = this.Mkn(i)).BuffHandleSet.add(s);
      this.gkn.set(r, t);
      this.Ekn(t, e);
    }
  }
  oJl(t) {
    return !this.rJl || !(t.Parameters.length > 4) || t.Parameters[4] !== "1";
  }
  RemoveBuffByCue(t, i, s = false) {
    var e;
    var h = t.CueType;
    if (h === 2) {
      if (e = this.Ckn.get(i)) {
        this.Ckn.delete(i);
        this.ykn(e, s);
      }
    } else if (h === 14 && (e = t.Id, h = this.gkn.get(e)) && h.BuffHandleSet.has(i) && (h.BuffHandleSet.delete(i), h.BuffHandleSet.size <= 0)) {
      this.gkn.delete(e);
      this.ykn(h, s);
    }
  }
  Mkn(t) {
    let i = undefined;
    (i = this.fkn.length > 0 ? this.fkn.pop() : new BuffItemInfo_1.BuffItemInfo()).SortId = BuffItemInfo_1.BuffItemInfo.GenSortId();
    i.Priority = t.Priority;
    i.BuffCueConfig = t;
    return i;
  }
  Ikn(t) {
    t.Clear();
    this.fkn.push(t);
  }
  Ekn(t, i = false) {
    var s = this.Tkn(t);
    if (s < this.aa) {
      if (this.dkn.length > this.aa) {
        this.DeactivateBuffItem(this.dkn[this.aa], false);
      }
      t.BuffItem = this.cst();
      this.mst(t, s, i);
    }
  }
  Tkn(i) {
    var s = this.dkn.length;
    for (let t = 0; t < s; t++) {
      var e = this.dkn[t];
      if (BuffItemInfo_1.BuffItemInfo.Compare(e, i) >= 0) {
        this.dkn.splice(t, 0, i);
        return t;
      }
    }
    this.dkn.push(i);
    return s;
  }
  ykn(t, i = false) {
    var s = this.dkn.indexOf(t);
    if (!(s < 0)) {
      this.dkn.splice(s, 1);
      if (s < this.aa && (this.DeactivateBuffItem(t, i), this.dkn.length >= this.aa)) {
        if ((s = this.dkn[this.aa - 1]).BuffItem && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "有残留的buffItem引用", ["cueId", s.BuffCueConfig?.Id]);
        }
        s.BuffItem = this.cst();
        this.mst(s, this.aa - 1, false);
      }
      this.Ikn(t);
    }
  }
  Skn(t) {
    let i = this.m1t.GetBuffByHandle(t);
    return i = i || this.vkn?.GetFormationBuffComp()?.GetBuffByHandle(t);
  }
  cst() {
    if (this.unt.length > 0) {
      return this.unt.pop();
    } else {
      return new BuffItem_1.BuffItem(this.pkn);
    }
  }
  mst(t, i, s = false) {
    var e = t.BuffItem;
    e.Activate(t.BuffCueConfig, t.SingleBuff, s);
    if (i <= 0) {
      e.GetRootItem().SetHierarchyIndex(0);
    } else if (t = this.dkn[i - 1].BuffItem) {
      e.GetRootItem().SetHierarchyIndex(t.GetRootItem().GetHierarchyIndex() + 1);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "要插入的buff图标前面的buff没有buffItem");
    }
  }
  DeactivateBuffItem(t, i = false) {
    var s = t.BuffItem;
    if (s) {
      t.BuffItem = undefined;
      (i ? (s.DeactivateWithCloseAnim(), this._nt) : (s.Deactivate(), s.GetRootItem().SetHierarchyIndex(this.dkn.length + this._nt.length), this.unt)).push(s);
    }
  }
  ClearAll() {
    for (const t of this.dkn) {
      t.BuffItem?.DestroyCompatible();
    }
    this.dkn.length = 0;
    this.Ckn.clear();
    this.gkn.clear();
    this.fkn.length = 0;
    for (const i of this._nt) {
      i.Deactivate();
      i.DestroyCompatible();
    }
    this._nt.length = 0;
    for (const s of this.unt) {
      s.DestroyCompatible();
    }
    this.unt.length = 0;
    this.PGl = 0;
  }
}
exports.BuffItemContainer = BuffItemContainer;
//# sourceMappingURL=BuffItemContainer.js.map