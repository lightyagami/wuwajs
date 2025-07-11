"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCharacterInputDistribute = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiManager_1 = require("../../UiManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class CreateCharacterInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    return !!UiManager_1.UiManager.IsViewShow("CreateCharacterView") && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]在创角中，则设置输入分发tag为 UiInputRootTag"), this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag), true);
  }
}
exports.CreateCharacterInputDistribute = CreateCharacterInputDistribute;
//# sourceMappingURL=CreateCharacterInputDistribute.js.map