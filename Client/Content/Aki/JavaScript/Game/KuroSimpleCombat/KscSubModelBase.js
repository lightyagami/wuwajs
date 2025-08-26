"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscSubModelBase = undefined;
const UiAsyncTaskManager_1 = require("../Ui/Base/UiAsyncTaskManager");
class KscSubModelBase {
  constructor() {
    this.PropertyConfigs = new Map();
    this.SkillDataDt = new Map();
    this.EntityDataDt = new Map();
    this.dRu = new Map();
    this.EntityProcessMgr = new UiAsyncTaskManager_1.UiAsyncTaskManager(true);
    this.KscEntities = new Map();
  }
  GetSkillDtPath() {
    return "";
  }
  GetEntityDtPath() {
    return "";
  }
  Init() {
    return this.OnInit();
  }
  Clear() {
    this.PropertyConfigs.clear();
    this.SkillDataDt.clear();
    this.EntityDataDt.clear();
    this.dRu.clear();
    this.KscEntities.clear();
    return this.OnClear();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  get GameplayType() {
    return 0;
  }
  SetLogicProxy(t, e) {
    this.dRu.set(t, e);
  }
  GetLogicProxy(t) {
    if (this.dRu && this.dRu.size !== 0) {
      return this.dRu.get(t);
    }
  }
  GetKscEntityHandle(t) {
    t = this.GetLogicProxy(t);
    if (t) {
      return this.KscEntities.get(t);
    }
  }
  RemoveLogicProxy(t) {
    return this.dRu.delete(t);
  }
  GetEntityCreatureId(t) {
    t = this.KscEntities.get(t);
    if (t?.Valid) {
      return t.CreatureDataId;
    } else {
      return 0;
    }
  }
}
exports.KscSubModelBase = KscSubModelBase;
//# sourceMappingURL=KscSubModelBase.js.map