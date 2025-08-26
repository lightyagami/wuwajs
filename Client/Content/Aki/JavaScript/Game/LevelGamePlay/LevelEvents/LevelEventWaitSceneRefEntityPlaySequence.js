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
  }
  ExecuteNew(e, t, n) {
    if (e) {
      this.wDe = e.EntityId;
      this.$Pe = e.Mark;
      if (this.QYc(e.EntityId, e.Mark)) {
        this.FinishExecute(true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventWaitSceneRefEntityPlaySequence失败，参数错误");
    }
  }
  OnTick(e) {
    if (this.QYc(this.wDe, this.$Pe)) {
      this.FinishExecute(true);
    }
  }
  QYc(e, t) {
    var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (n?.Entity?.Valid) {
      if (n = n.Entity.GetComponent(164)) {
        return n.IsPlayToMarkFinished(t);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "LevelEventWaitSceneRefEntityPlaySequence:找不到实体身上的SceneItemReferenceComponent组件", ["pbDataId", e]);
        }
        return true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "LevelEventWaitSceneRefEntityPlaySequence:找不到实体", ["pbDataId", e]);
      }
      return true;
    }
  }
}
exports.LevelEventWaitSceneRefEntityPlaySequence = LevelEventWaitSceneRefEntityPlaySequence;
//# sourceMappingURL=LevelEventWaitSceneRefEntityPlaySequence.js.map