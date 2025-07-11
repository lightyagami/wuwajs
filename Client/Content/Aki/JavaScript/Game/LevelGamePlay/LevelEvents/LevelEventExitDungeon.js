"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventExitDungeon = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitDungeon extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.EDe = () => {
      this.FinishExecute(true);
    };
  }
  ExecuteInGm(e, r, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, r) {
    if (ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText("ExitDungeon被GM屏蔽，跳过执行");
      this.FinishExecute(true);
    } else if (e.IsNeedSecondaryConfirmation) {
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton(this.EDe, this.EDe, false);
    } else {
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventExitDungeon = LevelEventExitDungeon;
//# sourceMappingURL=LevelEventExitDungeon.js.map