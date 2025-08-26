"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchBuffUpdateActionData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchBuffUpdateActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.dDo = undefined;
    this.dDo = o.PSu;
  }
  async OnExecute() {
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      for (const a of this.dDo.llu) {
        var o;
        var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(a.wSu);
        if (e) {
          if ((o = e.CheckGetComponent(0)).IsValid) {
            o.UpdateBuff(a);
            e.CheckGetComponent(9).RefreshRemainTimeItem();
            FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogBuffActionInfo(this.CasterEntity, e, a);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchBuffUpdateActionData OnExecute 实体数据无效", ["entity", e.Info()]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchBuffUpdateActionData OnExecute 实体不存在", ["entity", a.wSu], ["BuffType", a.h5n]);
        }
      }
    }
  }
}
exports.FloroRanchBuffUpdateActionData = FloroRanchBuffUpdateActionData;
//# sourceMappingURL=FloroRanchBuffUpdateActionData.js.map