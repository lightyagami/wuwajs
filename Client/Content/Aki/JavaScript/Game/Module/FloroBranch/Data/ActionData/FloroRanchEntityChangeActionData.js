"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityChangeActionData = undefined;
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
const FloroRanchEntityActionData_1 = require("./FloroRanchEntityActionData");
class FloroRanchEntityChangeActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(t) {
    super(t);
    this.Fre = undefined;
    this.aCu = [];
    this.Fre = t;
  }
  InitActionData(t) {
    this.aCu.length = 0;
    for (const i of t.llu) {
      var o = new FloroRanchEntityActionData_1.FloroRanchEntityActionData(i.nKn, i.hxs);
      this.aCu.push(o);
    }
  }
  async OnExecute() {
    this.InitActionData(this.Fre.xSu);
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      var t = [];
      for (const o of this.aCu) {
        t.push(this.gKu(o));
      }
      await Promise.all(t);
    }
  }
  async gKu(t) {
    await t.ExecuteAction();
    FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogEntityChangeActionInfo(this.CasterEntity, t.OperateType, t.EntityData);
  }
}
exports.FloroRanchEntityChangeActionData = FloroRanchEntityChangeActionData;
//# sourceMappingURL=FloroRanchEntityChangeActionData.js.map