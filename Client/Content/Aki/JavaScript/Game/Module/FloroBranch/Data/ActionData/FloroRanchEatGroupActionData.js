"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEatGroupActionData = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
const FloroRanchGroupActionData_1 = require("./FloroRanchGroupActionData");
class FloroRanchEatGroupActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.Rbu = undefined;
    this.fPu = undefined;
    this.Rbu = o.USu;
  }
  async OnExecute() {
    var o = this.CasterEntity.GetUiItemComponent();
    for (const i of this.Rbu.llu) {
      var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(i.wSu);
      var a = t.GetUiItemComponent();
      FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogEatActionInfo(this.CasterEntity, t);
      await o.MoveToTarget(a.GetUiItem());
      await this.WaitIfPause();
      if (this.IsExit()) {
        return;
      }
      this.fPu = new FloroRanchGroupActionData_1.FloroRanchGroupActionData();
      this.fPu.InitActionData(i.llu);
      await this.fPu.ExecuteAction();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      await o.MoveToOriginalPosition();
    }
  }
  OnPause() {
    if (this.fPu) {
      this.fPu.Pause();
    }
  }
  OnResume() {
    if (this.fPu) {
      this.fPu.Resume();
    }
  }
}
exports.FloroRanchEatGroupActionData = FloroRanchEatGroupActionData;
//# sourceMappingURL=FloroRanchEatGroupActionData.js.map