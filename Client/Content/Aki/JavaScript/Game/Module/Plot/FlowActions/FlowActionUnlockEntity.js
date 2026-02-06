"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionUnlockEntity = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionUnlockEntity extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    for (const e of this.ActionInfo.Params.EntityIds) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity?.GetComponent(208);
      if (o) {
        o.RemoveServerTagByIdLocal(-662723379, "FlowActionUnlockEntity");
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 31, "找不对对应的实体", ["pbDataId", e], ["actionId", this.ActionInfo.ActionId]);
      }
    }
  }
}
exports.FlowActionUnlockEntity = FlowActionUnlockEntity;
//# sourceMappingURL=FlowActionUnlockEntity.js.map