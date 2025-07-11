"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSacrificeActionData = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
const FloroRanchGroupActionData_1 = require("./FloroRanchGroupActionData");
class FloroRanchSacrificeActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.t7c = undefined;
    this.VAu = undefined;
    this.t7c = o.iNu;
  }
  async OnExecute() {
    var o = this.CasterEntity.GetUiItemComponent();
    FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogSacrificeActionInfo(this.CasterEntity);
    await o.PlaySacrificeAnim();
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemoveOwnEntityData(this.CasterEntity);
    await this.WaitIfPause();
    if (!this.IsExit()) {
      this.VAu = new FloroRanchGroupActionData_1.FloroRanchGroupActionData();
      this.VAu.InitActionData(this.t7c.RJ_);
      this.VAu.SetIgnoreCasterEntityAnim(this.CasterEntity.EntityId);
      await this.VAu.ExecuteAction();
    }
  }
}
exports.FloroRanchSacrificeActionData = FloroRanchSacrificeActionData;
//# sourceMappingURL=FloroRanchSacrificeActionData.js.map