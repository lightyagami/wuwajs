"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportHelper = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
class Entry {
  constructor() {
    this.Path = undefined;
    this.Module = undefined;
    this.Time = 0;
  }
}
const DEFAULT_CAPACITY = 50;
class ImportHelper {
  static GetModule(e, r) {
    var t = ImportHelper.mp;
    var o = ImportHelper.v3o;
    let i = o.get(e);
    if (i) {
      i.Time = Date.now();
      t.Update(i);
      return i.Module;
    }
    r = r(e);
    if (r) {
      (i = new Entry()).Path = e;
      i.Time = Date.now();
      i.Module = r;
      o.set(e, i);
      t.Push(i);
      while (t.Size > DEFAULT_CAPACITY) {
        var p = ImportHelper.mp.Pop();
        o.delete(p.Path);
      }
      return i.Module;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "动态require脚本失败", ["Path", e]);
    }
  }
  static CreateInstance(e, r, t) {
    e = ImportHelper.GetModule(e, r);
    if (e) {
      r = e[t];
      if (r) {
        return new r();
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "ImportHelper.CreateInstance失败", ["className", t]);
      }
    }
  }
}
(exports.ImportHelper = ImportHelper).E7 = (e, r) => e.Time - r.Time;
ImportHelper.mp = new PriorityQueue_1.PriorityQueue(ImportHelper.E7);
ImportHelper.v3o = new Map(); //# sourceMappingURL=ImportHelper.js.map