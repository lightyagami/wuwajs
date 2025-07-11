"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEvolveUpdateActionData = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchEvolveUpdateActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.QLu = undefined;
    this.QLu = o.$Ru;
  }
  async OnExecute() {
    var o;
    var a;
    var e;
    var t;
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      e = (a = (o = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.QLu.Sfu)).CheckGetComponent(1)).EvolveData.CurLevel;
      a.RefreshEvolveData(this.QLu.HRu);
      (t = o.CheckGetComponent(9)).RefreshEvolveItem();
      FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogEvolveActionInfo(o, a);
      await t.PlayNormalAnim();
      if (this.QLu.HRu.TLs > e) {
        await t.PlayEvolveUpAnim();
      }
    }
  }
}
exports.FloroRanchEvolveUpdateActionData = FloroRanchEvolveUpdateActionData;
//# sourceMappingURL=FloroRanchEvolveUpdateActionData.js.map