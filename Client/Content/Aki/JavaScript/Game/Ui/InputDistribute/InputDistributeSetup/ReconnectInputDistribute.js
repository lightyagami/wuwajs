"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReconnectInputDistribute = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../UiManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class ReconnectInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    return !!this.wdr() && (this.Bdr() ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]刷新重连状态输入Tag时，可点击鼠标"), this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag])) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]刷新重连状态输入Tag时，禁用所有操作"), this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag)), true);
  }
  Bdr() {
    return UiManager_1.UiManager.GetViewByName("NetWorkConfirmBoxView") !== undefined;
  }
  wdr() {
    return ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus() === 1;
  }
}
exports.ReconnectInputDistribute = ReconnectInputDistribute;
//# sourceMappingURL=ReconnectInputDistribute.js.map