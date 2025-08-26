"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiInputDistribute = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiManager_1 = require("../../UiManager");
const UiModel_1 = require("../../UiModel");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class UiInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    if (UiManager_1.UiManager.IsViewShow(UiModel_1.UiModel.MainViewName)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "[InputDistribute]刷新UI输入时，主界面已经打开，设置输入分发Tag为 UiInputRootTag");
      }
      this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "[InputDistribute]刷新UI输入时，主界面没有打开，设置输入分发Tag为 ShortcutKeyTag，MouseInputTag，NavigationTag");
      }
      this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag]);
    }
    return true;
  }
}
exports.UiInputDistribute = UiInputDistribute;
//# sourceMappingURL=UiInputDistribute.js.map