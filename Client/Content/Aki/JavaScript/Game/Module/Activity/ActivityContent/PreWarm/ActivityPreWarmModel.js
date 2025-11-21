"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPreWarmModel = undefined;
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const ActivityPreWarmCollectItemData_1 = require("./ActivityPreWarmCollectItemData");
const ActivityPreWarmDefine_1 = require("./ActivityPreWarmDefine");
class ActivityPreWarmModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.g1m = new Map();
  }
  CreateCollectItemData(t) {
    for (let e = 1; e <= ActivityPreWarmDefine_1.PREWARMTASKNUM; e++) {
      var r = new ActivityPreWarmCollectItemData_1.ActivityPreWarmCollectItemData(t);
      r.SetId(e);
      this.g1m.set(e, r);
    }
  }
  GetCollectItemDataById(e) {
    if (e !== undefined) {
      return this.g1m.get(e);
    }
  }
  GetDefaultId() {
    let e = 1;
    let t = 1;
    let r = false;
    let i = false;
    for (var [a, o] of this.g1m) {
      o = o.GetQuestState();
      e = Math.min(e, a);
      t = Math.max(t, a);
      if (o === 2) {
        return a;
      }
      if (o !== 3) {
        r = true;
      }
      if (o !== 0 && o !== 1) {
        i = true;
      }
    }
    if (r) {
      i;
      return e;
    } else {
      return t;
    }
  }
  GetLastFinishedId() {
    let e = 1;
    for (var [t, r] of this.g1m) {
      if (r.GetQuestState() !== 3) {
        break;
      }
      e = t;
    }
    return e;
  }
  GetProgressId() {
    let e = undefined;
    for (var [t, r] of this.g1m) {
      if (r.GetQuestState() === 2) {
        e = t;
        break;
      }
    }
    return e;
  }
  GetAllCollectItemData() {
    return this.g1m;
  }
  IsHasQuest(e) {
    for (const t of this.g1m.values()) {
      if (t.GetQuestId() === e) {
        return true;
      }
    }
    return false;
  }
  IsAllFinish() {
    for (const e of this.g1m.values()) {
      if (e.GetQuestState() !== 3) {
        return false;
      }
    }
    return true;
  }
  OnClear() {
    this.g1m.clear();
    return true;
  }
}
exports.ActivityPreWarmModel = ActivityPreWarmModel;
//# sourceMappingURL=ActivityPreWarmModel.js.map