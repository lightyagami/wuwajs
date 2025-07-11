"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRemoveEntityActionData = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchAsyncActionBase_1 = require("./FloroRanchAsyncActionBase");
class FloroRanchRemoveEntityActionData extends FloroRanchAsyncActionBase_1.FloroRanchAsyncActionBase {
  constructor(e) {
    super();
    this.E0 = 0;
    this.E0 = e;
  }
  async OnExecute() {
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.E0);
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemoveOwnEntityData(e);
    var e = e.GetUiItemComponent();
    if (e) {
      await e.PlayHideAnim();
    }
  }
}
exports.FloroRanchRemoveEntityActionData = FloroRanchRemoveEntityActionData;
//# sourceMappingURL=FloroRanchRemoveEntityActionData.js.map