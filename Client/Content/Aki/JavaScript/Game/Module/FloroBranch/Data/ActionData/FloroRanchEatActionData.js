"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEatActionData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchEatActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this._gu = undefined;
    this._gu = o.kyu;
  }
  async OnExecute() {
    await this.CasterEntity.GetUiItemComponent().PlayEatAnim();
    await this.WaitIfPause();
    if (!this.IsExit()) {
      var o = [];
      for (const r of this._gu.khu) {
        if (r.nKn !== Protocol_1.Aki.Protocol.Wyu.Proto_UnitOpRemove) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("FloroRanchGamePlay", 58, "吞噬只能移除实体", ["data", r]);
          }
        } else {
          var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(r.hxs.Ziu);
          var a = e.GetUiItemComponent();
          if (!a) {
            return;
          }
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemoveOwnEntityData(e);
          o.push(a.PlayBeEatAnim());
        }
      }
      await Promise.all(o);
    }
  }
}
exports.FloroRanchEatActionData = FloroRanchEatActionData;
//# sourceMappingURL=FloroRanchEatActionData.js.map