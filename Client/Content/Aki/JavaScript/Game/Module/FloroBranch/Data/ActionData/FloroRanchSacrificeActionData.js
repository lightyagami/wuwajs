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
  constructor(t) {
    super(t);
    this.OVu = undefined;
    this.fPu = undefined;
    this.OVu = t.LVu;
  }
  async OnExecute() {
    var t;
    await this.WaitIfPause();
    if (!this.IsExit() && !(t = this.CasterEntity.GetUiItemComponent(), FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogSacrificeActionInfo(this.CasterEntity), await t.PlaySacrificeAnim(), await this.WaitIfPause(), this.IsExit())) {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemoveOwnEntityData(this.CasterEntity);
      this.fPu = new FloroRanchGroupActionData_1.FloroRanchGroupActionData();
      this.fPu.InitActionData(this.OVu.RJ_);
      this.fPu.SetIgnoreCasterEntityAnim(this.CasterEntity.EntityId);
      await this.fPu.ExecuteAction();
    }
  }
  OnExit() {
    if (this.fPu) {
      this.fPu.Exit();
    }
  }
}
exports.FloroRanchSacrificeActionData = FloroRanchSacrificeActionData;
//# sourceMappingURL=FloroRanchSacrificeActionData.js.map