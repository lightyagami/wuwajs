"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponMeshVisibleHelper = undefined;
const WeaponVisibleTagHelper_1 = require("./WeaponVisibleTagHelper");
class WeaponVisibleState {
  constructor(e = false, i = true, t = 0) {
    this.IsHidden = e;
    this.Active = i;
    this.Priority = t;
  }
}
class WeaponMeshVisibleHelper {
  constructor(e) {
    this.Owner = e;
    this.WeaponVisibleTable = new Map();
    this.DefaultVisibleType = 0;
    this.DefaultVisibleState = new WeaponVisibleState();
    this.WeaponHiddenTag = new WeaponVisibleTagHelper_1.WeaponVisibleTagHelper();
    this.WeaponVisibleTag = new WeaponVisibleTagHelper_1.WeaponVisibleTagHelper();
  }
  InitBaseTable(e) {
    this.DefaultVisibleType = e;
    e = new WeaponVisibleState(false, false, 0);
    this.WeaponVisibleTable.set(0, e);
    e = new WeaponVisibleState(false, false, 1);
    this.WeaponVisibleTable.set(1, e);
    e = new WeaponVisibleState(false, false, 2);
    this.WeaponVisibleTable.set(2, e);
  }
  InitTagHelper(e, i, t, s, a) {
    this.WeaponVisibleTag.Init(this.Owner, e, i?.split("#"), t);
    this.WeaponHiddenTag.Init(this.Owner, e, s?.split("#"), a);
  }
  ClearTagHelper() {
    this.WeaponVisibleTag.Clear();
    this.WeaponHiddenTag.Clear();
  }
  RequestAndUpdateHiddenInGame(e, i = true, t = 0) {
    let s = false;
    switch (this.DefaultVisibleType) {
      case 0:
        s = e;
        if (i) {
          this.DefaultVisibleState.IsHidden = e;
        }
        break;
      case 1:
        s = true;
        if (i) {
          this.DefaultVisibleState.IsHidden = true;
        }
    }
    if (!i) {
      if (t = this.WeaponVisibleTable.get(t)) {
        t.IsHidden = e;
      }
    }
    t = this.uer();
    if (t) {
      if (t.Priority === 0 && i && t.Active) {
        t.Active = false;
      } else {
        s = t.IsHidden;
      }
    }
    return s;
  }
  EnableHiddenInGameByExtraVisibleType(e, i) {
    e = this.WeaponVisibleTable.get(e);
    if (e) {
      e.Active = i;
    }
  }
  uer() {
    let e = -1;
    let i = undefined;
    for (var [, t] of this.WeaponVisibleTable) {
      if (t.Active && t.Priority > e) {
        e = t.Priority;
        i = t;
      }
    }
    return i;
  }
}
exports.WeaponMeshVisibleHelper = WeaponMeshVisibleHelper;
//# sourceMappingURL=WeaponMeshVisibleHelper.js.map