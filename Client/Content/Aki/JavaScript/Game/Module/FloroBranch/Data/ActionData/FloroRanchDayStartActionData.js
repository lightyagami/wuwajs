"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDayStartAction = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchAsyncActionBase_1 = require("./FloroRanchAsyncActionBase");
class FloroRanchDayStartAction extends FloroRanchAsyncActionBase_1.FloroRanchAsyncActionBase {
  constructor(a) {
    super();
    this.Plu = undefined;
    this.Plu = a;
  }
  async OnExecute() {
    var a = [];
    for (const o of ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetShowCardEntityList()) {
      a.push(o.GetUiItemComponent()?.PlayHideAnim());
    }
    await Promise.all(a);
    await this.WaitIfPause();
    if (!this.IsExit()) {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ClearLastDayIncome();
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.RefreshEntityList(this.Plu.Bhu);
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.RefreshRemoveEntityList(this.Plu.zku);
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ClearRemoveEntity();
      var e = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
      if (e) {
        await e.PlayNewDayAnim();
      }
      e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetShowCardEntityList();
      a.length = 0;
      for (const r of e) {
        a.push(r.GetUiItemComponent().PlayShowAnim());
      }
      FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogDayStart();
      await Promise.all(a);
    }
  }
}
exports.FloroRanchDayStartAction = FloroRanchDayStartAction;
//# sourceMappingURL=FloroRanchDayStartActionData.js.map