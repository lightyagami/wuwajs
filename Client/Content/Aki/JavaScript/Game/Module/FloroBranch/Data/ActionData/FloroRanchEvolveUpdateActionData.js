"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEvolveUpdateActionData = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchEvolveUpdateActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(a) {
    super(a);
    this.yAu = undefined;
    this.yAu = a.mLu;
  }
  async OnExecute() {
    var a;
    var t;
    var o;
    var e;
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit() && !(o = (t = (a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.yAu.ggu)).CheckGetComponent(1)).EvolveData.CurLevel, t.RefreshEvolveData(this.yAu.dLu), (e = a.CheckGetComponent(9)).RefreshEvolveItem(), FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogEvolveActionInfo(a, t), await e.PlayNormalAnim(), await this.WaitIfPause(), this.IsExit())) {
      if (this.yAu.dLu.TLs > o) {
        await e.PlayEvolveUpAnim();
      }
    }
  }
}
exports.FloroRanchEvolveUpdateActionData = FloroRanchEvolveUpdateActionData;
//# sourceMappingURL=FloroRanchEvolveUpdateActionData.js.map