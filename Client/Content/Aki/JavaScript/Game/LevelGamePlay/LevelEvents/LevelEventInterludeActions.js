"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventInterludeActions = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventInterludeActions extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
    this.nx = undefined;
    this.RDe = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 17, "幕间行为执行完成");
      }
      this.UDe();
    };
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 17, "幕间行为触发");
    }
    if (e) {
      this.pDe = e;
      this.nx = t;
      if (this.pDe.IsFadeIn) {
        this.ADe();
      } else {
        this.PDe();
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 17, "幕间行为结束【inParams为空】");
      }
      this.FinishExecute(true);
    }
  }
  ADe() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 17, "幕间行为淡入");
    }
  }
  PDe() {
    if (this.pDe?.InterludeActionList && this.pDe?.InterludeActionList.length > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 17, "幕间行为开始执行");
      }
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(this.pDe.InterludeActionList, LevelGeneralContextDefine_1.GeneralContext.Copy(this.nx), this.RDe);
    } else {
      this.UDe();
    }
  }
  UDe() {
    if (this.pDe?.IsFadeOut) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 17, "幕间行为淡出");
      }
    } else {
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventInterludeActions = LevelEventInterludeActions;
//# sourceMappingURL=LevelEventInterludeActions.js.map