"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventChangeEntityState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelEventChangeEntityState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.tRl = 0;
    this.fLe = undefined;
  }
  ExecuteNew(t, e, i) {
    if (e.Type === 1 && e.ClientExecuteActions || e.Type === 5 && e.IsClientTrigger) {
      this.Lo = t;
      let e = undefined;
      switch (this.Lo.Type) {
        case IAction_1.EChangeEntityState.Directly:
          e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.Lo.State);
          this.fLe = [this.Lo.EntityId];
          break;
        case IAction_1.EChangeEntityState.Loop:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 26, "不支持的切换实体状态");
          }
          this.FinishExecute(true);
          return;
        case IAction_1.EChangeEntityState.BatchDirectly:
          e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.Lo.State);
          this.fLe = this.Lo.EntityIds;
      }
      if (e === undefined) {
        this.FinishExecute(true);
      } else {
        this.tRl = e;
        this.CreateWaitEntityTask(this.fLe);
      }
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
  OnReset() {
    this.Lo = undefined;
    this.tRl = 0;
    this.fLe = undefined;
  }
}
exports.LevelEventChangeEntityState = LevelEventChangeEntityState;
//# sourceMappingURL=LevelEventChangeEntityState.js.map