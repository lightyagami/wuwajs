"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRemoveBuffFromCreature = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRemoveBuffFromCreature extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.gLe = undefined;
    this.fLe = undefined;
  }
  ExecuteNew(e, t) {
    if (e) {
      this.gLe = e;
      this.fLe = [];
      if (e.EntityId !== undefined) {
        this.fLe.push(e.EntityId);
      }
      if (e.EntityIds?.length) {
        for (const o of e.EntityIds) {
          this.fLe.push(o);
        }
      }
      this.CreateWaitEntityTask(this.fLe);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 33, "参数类型错误");
      }
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    for (const o of this.fLe) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
      if (e?.IsInit) {
        var t = e.Entity.GetComponent(185);
        for (const s of this.gLe.BuffIds) {
          t.RemoveBuff(s, -1, "LevelEventRemoveBuffFromCreature");
        }
      }
    }
    this.FinishExecute(true);
  }
  ExecuteInGm(e, t) {
    if (e) {
      this.gLe = e;
      this.fLe = [];
      if (e.EntityId !== undefined) {
        this.fLe.push(e.EntityId);
      }
      if (e.EntityIds?.length) {
        for (const o of e.EntityIds) {
          this.fLe.push(o);
        }
      }
      this.ExecuteWhenEntitiesReady();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 33, "执行行为时:参数类型错误", ["EventType", this.Type]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventRemoveBuffFromCreature = LevelEventRemoveBuffFromCreature;
//# sourceMappingURL=LevelEventRemoveBuffFromCreature.js.map