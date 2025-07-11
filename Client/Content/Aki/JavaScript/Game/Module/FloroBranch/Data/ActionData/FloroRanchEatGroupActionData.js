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
    this.abu = undefined;
    this.VAu = undefined;
    this.abu = o.Oyu;
  }
  async OnExecute() {
    var o = this.CasterEntity.GetUiItemComponent();
    for (const i of this.abu.khu) {
      var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(i.xyu);
      var a = t.GetUiItemComponent();
      FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogEatActionInfo(this.CasterEntity, t);
      await o.MoveToTarget(a.GetUiItem());
      await this.WaitIfPause();
      if (this.IsExit()) {
        return;
      }
      this.VAu = new FloroRanchGroupActionData_1.FloroRanchGroupActionData();
      this.VAu.InitActionData(i.khu);
      await this.VAu.ExecuteAction();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      await o.MoveToOriginalPosition();
    }
  }
  OnPause() {
    if (this.VAu) {
      this.VAu.Pause();
    }
  }
  OnResume() {
    if (this.VAu) {
      this.VAu.Resume();
    }
  }
}
exports.FloroRanchEatGroupActionData = FloroRanchEatGroupActionData;
//# sourceMappingURL=FloroRanchEatGroupActionData.js.map