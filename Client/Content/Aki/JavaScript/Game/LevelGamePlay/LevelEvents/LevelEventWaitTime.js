"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventWaitTime = undefined;
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventWaitTime extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.oUe = -0;
    this.yRn = false;
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t) {
    this.oUe = e.Time * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    if (e.BanInput) {
      this.yRn = true;
      ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = true;
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "LevelEventWait");
    if (!this.oUe) {
      if (this.yRn) {
        ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = false;
        ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
        this.yRn = false;
      }
      this.FinishExecute(false);
    }
  }
  OnTick(e) {
    e = this.BaseContext ? e * (LevelGamePlayUtils_1.LevelGamePlayUtils.GetCustomTimeDilationByContext(this.BaseContext) ?? 1) : e;
    this.oUe -= e;
    if (this.oUe < 0) {
      if (this.yRn) {
        ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = false;
        ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
        this.yRn = false;
      }
      this.FinishExecute(true);
    }
  }
  OnReset() {
    this.yRn = false;
    this.oUe = 0;
  }
}
exports.LevelEventWaitTime = LevelEventWaitTime;
//# sourceMappingURL=LevelEventWaitTime.js.map