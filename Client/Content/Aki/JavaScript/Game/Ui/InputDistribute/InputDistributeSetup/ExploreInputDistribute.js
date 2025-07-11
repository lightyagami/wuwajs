"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreInputDistribute = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiManager_1 = require("../../UiManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class ExploreInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    return !!UiManager_1.UiManager.IsViewOpen("PhantomExploreView") && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]PhantomExploreView轮盘界面打开,Input输入检测，刷新战斗输入时设置输入分发Tag为 MoveInputTag"), this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag]), true);
  }
}
exports.ExploreInputDistribute = ExploreInputDistribute;
//# sourceMappingURL=ExploreInputDistribute.js.map