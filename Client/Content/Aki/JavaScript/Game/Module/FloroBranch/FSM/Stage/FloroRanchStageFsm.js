"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchStageFsm = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const FloroRanchDefine_1 = require("../../FloroRanchDefine");
const FloroRanchFsmBase_1 = require("../FloroRanchFsmBase");
const FloroRanchDailyInStageState_1 = require("./FloroRanchDailyInStageState");
const FloroRanchGameExitState_1 = require("./FloroRanchGameExitState");
const FloroRanchGameStartState_1 = require("./FloroRanchGameStartState");
const FloroRanchStageFailState_1 = require("./FloroRanchStageFailState");
const FloroRanchStageSuccessState_1 = require("./FloroRanchStageSuccessState");
class FloroRanchStageFsm extends FloroRanchFsmBase_1.FloroRanchFsmBase {
  InitStateInstance() {
    this.CurrentStateType = 0;
    this.RegisterState(1, new FloroRanchGameStartState_1.FloroRanchGameStartState(this));
    this.RegisterState(2, new FloroRanchDailyInStageState_1.FloroRanchDailyInStageState(this));
    this.RegisterState(3, new FloroRanchStageFailState_1.FloroRanchStageFailState(this));
    this.RegisterState(4, new FloroRanchStageSuccessState_1.FloroRanchStageSuccessState(this));
    this.RegisterState(5, new FloroRanchGameExitState_1.FloroRanchGameExitState(this));
  }
  CheckCanChangeState(e, a) {
    var t = FloroRanchDefine_1.floroRanchStageTransitionMap[e];
    return !!t && !!t.includes(a) || (Log_1.Log.CheckError() && Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchStageFsm 检查状态转换失败", ["curStateType", e], ["nextStateType", a]), false);
  }
}
exports.FloroRanchStageFsm = FloroRanchStageFsm;
//# sourceMappingURL=FloroRanchStageFsm.js.map