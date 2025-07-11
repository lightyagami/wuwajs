"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCache = undefined;
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityData_1 = require("./ActivityData");
class ActivityCache {
  constructor() {
    this.nNe = new Map();
  }
  InitData() {
    this.nNe = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Activity) ?? new Map();
  }
  OnReceiveActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap();
    const t = new Array();
    e.forEach((e, a) => {
      e = e.GetCacheKey();
      t.push(e);
    });
    var a = Array.from(this.nNe.keys());
    var r = a.length;
    for (let e = 0; e < r; e++) {
      if (!t.includes(a[e])) {
        this.nNe.delete(a[e]);
      }
    }
  }
  SaveData() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Activity, this.nNe);
  }
  SaveCacheData(e, a, t, r, i) {
    let o = this.nNe.get(e.GetCacheKey());
    if (!o) {
      o = new Array();
      this.nNe.set(e.GetCacheKey(), o);
    }
    var c = a * 100000 + t * 1000 + r * 100;
    let n = false;
    var s = o.length;
    for (let e = 0; e < s; e++) {
      if (o[e].Key === c) {
        o[e].Value = i;
        n = true;
      }
    }
    if (!n) {
      (a = new ActivityData_1.ActivityCacheData()).Key = c;
      a.Value = i;
      o.push(a);
    }
    this.nNe.set(e.GetCacheKey(), o);
    this.SaveData();
  }
  GetCacheData(e, a, t, r, i) {
    var o = this.nNe.get(e.GetCacheKey());
    if (o) {
      var c = o.length;
      var n = t * 100000 + r * 1000 + i * 100;
      for (let e = 0; e < c; e++) {
        if (o[e].Key === n) {
          return o[e].Value;
        }
      }
    }
    return a;
  }
}
exports.ActivityCache = ActivityCache;
//# sourceMappingURL=ActivityCache.js.map