"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventWaitSceneRefEntityPlaySequence = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventWaitSceneRefEntityPlaySequence extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.wDe = 0;
    this.$Pe = "";
    this.v0m = false;
  }
  ExecuteNew(e, t, n) {
    if (e) {
      this.wDe = e.EntityId;
      this.$Pe = e.Mark;
      this.v0m = false;
      this.CreateWaitEntityTask(e.EntityId);
      if (this.KJc(e.EntityId, e.Mark)) {
        this.FinishExecute(true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventWaitSceneRefEntityPlaySequence失败，参数错误");
    }
  }
  ExecuteWhenEntitiesReady() {
    this.v0m = true;
  }
  OnTick(e) {
    if (this.KJc(this.wDe, this.$Pe)) {
      this.FinishExecute(true);
    }
  }
  KJc(e, t) {
    var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    return !n?.Entity?.Valid || !this.v0m || ((n = n.Entity.GetComponent(167)) ? n.IsPlayToMarkFinished(t) : (Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "LevelEventWaitSceneRefEntityPlaySequence:找不到实体身上的SceneItemReferenceComponent组件", ["pbDataId", e]), true));
  }
}
exports.LevelEventWaitSceneRefEntityPlaySequence = LevelEventWaitSceneRefEntityPlaySequence;
//# sourceMappingURL=LevelEventWaitSceneRefEntityPlaySequence.js.map