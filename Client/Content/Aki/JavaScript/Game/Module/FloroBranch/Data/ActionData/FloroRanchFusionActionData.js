"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchFusionActionData = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchFusionActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.eOu = undefined;
    this.eOu = o.mDu;
  }
  async OnExecute() {
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      var o = this.CasterEntity.GetUiItemComponent();
      var a = [];
      for (const s of this.eOu.dDu) {
        var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(s);
        a.push(t.GetUiItemComponent().MoveToTarget(o.GetUiItem()));
      }
      await Promise.all(a);
      await this.WaitIfPause();
      if (!this.IsExit()) {
        FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogFusionStartActionInfo(this.CasterEntity, this.eOu);
        a.length = 0;
        for (const r of this.eOu.dDu) {
          var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(r);
          a.push(i.GetUiItemComponent().PlayFusionHideAnim());
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemoveOwnEntityData(i);
        }
        var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.eOu.cDu.Tru);
        a.push(e.GetUiItemComponent().PlayFusionHideAnim());
        await Promise.all(a);
        await this.WaitIfPause();
        if (!this.IsExit()) {
          e.RefreshEntityData(this.eOu.cDu);
          await e.GetUiItemComponent().PlayFusionShowAnim();
          FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogFusionEndActionInfo(this.eOu);
        }
      }
    }
  }
}
exports.FloroRanchFusionActionData = FloroRanchFusionActionData;
//# sourceMappingURL=FloroRanchFusionActionData.js.map