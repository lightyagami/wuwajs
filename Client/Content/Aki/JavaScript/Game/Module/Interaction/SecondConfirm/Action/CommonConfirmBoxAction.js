"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonConfirmBoxAction = undefined;
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InteractConfirmActionBase_1 = require("../InteractConfirmActionBase");
class CommonConfirmBoxAction extends InteractConfirmActionBase_1.InteractConfirmBoxActionBase {
  ConfigConfirmBoxData() {
    var o = this.Context.Option.ConfirmBox.Type;
    if (o && "Id" in o) {
      (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o.Id)).FunctionMap.set(1, () => {
        this.ExecuteFinish(false);
      });
      o.FunctionMap.set(2, () => {
        this.ExecuteFinish(true);
      });
      return o;
    }
  }
}
exports.CommonConfirmBoxAction = CommonConfirmBoxAction;
//# sourceMappingURL=CommonConfirmBoxAction.js.map