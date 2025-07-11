"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityHandle = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class EntityHandle {
  constructor(t) {
    this.Entity = t;
    this.Id = 0;
    this.CreatureDataId = 0;
    this.PbDataId = 0;
    this.ConfigType = 0;
    this.EntityType = 0;
    this.Index = 0;
    this.Priority = 100;
    this.PendingRemoving = false;
    this.HasSendingRequest = false;
    this.HoldEntityMap = new Map();
    this.Id = t.Id;
    this.Index = t.Index;
  }
  AddHoldEntity(t) {
    let e = this.HoldEntityMap.get(t);
    if (e) {
      e++;
    } else {
      e = 1;
    }
    if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.EntityType) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Engine", 3, "AddHoldEntity", ["Reason", t], ["CreatureDataId", this.CreatureDataId], ["EntityId", this.Id], ["Count", e]);
    }
    this.HoldEntityMap.set(t, e);
    return true;
  }
  RemoveHoldEntity(t) {
    var e = this.HoldEntityMap.get(t);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Engine", 3, "reason不存在，RemoveHoldEntity失败", ["Reason", t], ["CreatureDataId", this.CreatureDataId], ["EntityId", this.Id]);
      }
      return false;
    } else {
      if (--e) {
        this.HoldEntityMap.set(t, e);
      } else {
        this.HoldEntityMap.delete(t);
      }
      if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.EntityType) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Engine", 3, "RemoveHoldEntity", ["Reason", t], ["CreatureDataId", this.CreatureDataId], ["EntityId", this.Id]);
      }
      return true;
    }
  }
  ClearHoldEntity() {
    if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.EntityType) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Engine", 3, "ClearHoldEntity", ["CreatureDataId", this.CreatureDataId], ["EntityId", this.Id]);
    }
    this.HoldEntityMap.clear();
  }
  get Valid() {
    return ModelManager_1.ModelManager.CharacterModel.IsValid(this.Id);
  }
  get IsInit() {
    return !!this.Valid && this.Entity.IsInit;
  }
  get AllowDestroy() {
    return this.HoldEntityMap.size === 0;
  }
}
exports.EntityHandle = EntityHandle;
//# sourceMappingURL=EntityHandle.js.map