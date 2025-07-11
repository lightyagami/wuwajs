"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiProhibitFightInputDistribute = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const UiProhibitFightInputCenter_1 = require("../UiProhibit/UiProhibitFightInputCenter");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class UiProhibitFightInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    var t;
    var i;
    var e = ModelManager_1.ModelManager.InputDistributeModel;
    return !!e.HasAnyNotAllowFightInputViewIsOpen() && (t = UiProhibitFightInputCenter_1.UiProhibitFightInputCenter.CheckExtraRefreshData(), StringUtils_1.StringUtils.IsBlank(t) ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]禁止战斗输入的界面的输入分发，有不允许战斗输入的界面打开", ["NotAllowFightInputViewNameSet", e.GetNotAllowFightInputViewNameSet()]), this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag])) : (i = UiProhibitFightInputCenter_1.UiProhibitFightInputCenter.GetExtraRefreshData(t).GetDistributeTags(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]禁止战斗输入的界面的输入分发,检测到额外注册的刷新数据条件判断成功", ["NotAllowFightInputViewNameSet", e.GetNotAllowFightInputViewNameSet()], ["额外注册名字", t]), this.SetInputDistributeTags(i)), true);
  }
}
exports.UiProhibitFightInputDistribute = UiProhibitFightInputDistribute;
//# sourceMappingURL=UiProhibitFightInputDistribute.js.map