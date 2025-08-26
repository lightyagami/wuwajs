"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLog = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class BulletLog {
  static ToPairs(e) {
    var r;
    var a;
    if (e) {
      r = e.BulletEntityId;
      a = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(r);
      return [["子弹表ID", e.BulletRowName], ["子弹实体ID", r], ["发射者实体ID", e.AttackerCreatureDataComp?.GetCreatureDataId()], ["发射者名称", e.AttackerActorComp?.Owner?.GetName()], ["子弹服务器ID", a]];
    } else {
      return [];
    }
  }
}
exports.BulletLog = BulletLog;
//# sourceMappingURL=BulletLog.js.map