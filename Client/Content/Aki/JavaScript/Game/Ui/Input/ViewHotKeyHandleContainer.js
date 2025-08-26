"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandleContainer = undefined;
class ViewHotKeyHandleContainer {
  constructor() {
    this.iIa = new Map();
    this.Fzc = new Map();
    this.Nzc = new Map();
  }
  Add(t) {
    var s;
    var e = t.ViewName;
    if (e && ((s = this.iIa.get(e)) ? s.push(t) : this.iIa.set(e, [t]), (s = this.Fzc.get(e)) && t.BindOpenViewCallback(s), s = this.Nzc.get(e))) {
      t.BindCloseViewCallback(s);
    }
  }
  Remove(t) {
    var s;
    var e;
    var o = t.ViewName;
    if (!!o && !!(s = this.iIa.get(o)) && !((e = s.indexOf(t)) < 0)) {
      t.Destroy();
      s.splice(e, 1);
      if (s.length === 0) {
        this.iIa.delete(o);
      }
    }
  }
  Clear() {
    for (const t of this.iIa.values()) {
      for (const s of t) {
        s.Destroy();
      }
    }
    this.iIa.clear();
  }
  Get(t) {
    return this.iIa.get(t);
  }
  GetAll() {
    let t = [];
    for (const s of this.iIa.values()) {
      t = t.concat(s);
    }
    return t;
  }
  ForEach(t) {
    for (const s of this.iIa.values()) {
      for (const e of s) {
        t(e);
      }
    }
  }
  IsDataExist(t) {
    for (const s of this.iIa.values()) {
      for (const e of s) {
        if (e.ConfigId === t) {
          return true;
        }
      }
    }
    return false;
  }
  RegisterOpenViewFunc(t, s) {
    this.Fzc.set(t, s);
  }
  RegisterCloseViewFunc(t, s) {
    this.Nzc.set(t, s);
  }
}
exports.ViewHotKeyHandleContainer = ViewHotKeyHandleContainer;
//# sourceMappingURL=ViewHotKeyHandleContainer.js.map