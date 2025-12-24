"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowChangeEntityState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowChangeEntityState extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.tRl = 0;
    this.fLe = undefined;
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnExecute() {
    var e = this.OPt;
    switch (e.Type) {
      case IAction_1.EChangeEntityState.Directly:
        this.tRl = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State);
        this.fLe = [e.EntityId];
        break;
      case IAction_1.EChangeEntityState.BatchDirectly:
        this.tRl = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State);
        this.fLe = e.EntityIds;
        break;
      case IAction_1.EChangeEntityState.Loop:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "不支持的切换实体状态");
        }
    }
    if (this.fLe !== undefined) {
      this.CreateWaitEntityTask(this.fLe);
    } else {
      this.FinishExecute(true);
    }
  }
  ExecuteWhenEntitiesReady() {
    for (const e of this.fLe) {
      LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(e, this.tRl, "ShowInRefSequence");
    }
    this.FinishExecute(true);
  }
}
exports.LevelFlowChangeEntityState = LevelFlowChangeEntityState;
//# sourceMappingURL=LevelFlowChangeEntityState.js.map