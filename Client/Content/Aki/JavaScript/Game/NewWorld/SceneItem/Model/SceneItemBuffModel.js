"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemBuffModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class SceneItemBuffModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Hsr = new Map();
  }
  Add(e, t, r) {
    let s = this.Hsr.get(e);
    if (!s) {
      s = new Map();
      this.Hsr.set(e, s);
    }
    let o = s.get(t);
    if (!o) {
      o = new Array();
      s.set(t, o);
    }
    return !o.includes(r) && (o.push(r), true);
  }
  Remove(e, t, r, s) {
    let o = new Array();
    var n;
    var i = this.Hsr.get(e);
    if (i && ((n = i.get(t)) && (s ? (s = n.indexOf(s)) > -1 && (o = n.splice(s, r)) : o = n.splice(0, r === -1 ? n.length : r), n.length === 0) && i.delete(t), i.size === 0)) {
      this.Hsr.delete(e);
    }
    return o;
  }
  RemoveAll(e) {
    return this.Hsr.delete(e);
  }
  Switch(e, t) {
    var r = this.Hsr.get(e);
    var s = this.Hsr.get(t);
    return !r && !!s && !(this.Hsr.set(e, s), this.Hsr.delete(t), 0);
  }
  GetSceneItemIds(e) {
    e = this.Hsr.get(e);
    if (e) {
      var t = new Array();
      for (const r of e.values()) {
        for (const s of r) {
          t.push(s);
        }
      }
      return t;
    }
  }
}
exports.SceneItemBuffModel = SceneItemBuffModel;
//# sourceMappingURL=SceneItemBuffModel.js.map