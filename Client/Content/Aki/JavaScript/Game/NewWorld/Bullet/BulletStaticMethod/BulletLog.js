"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLog = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
class BulletLog {
  static ToPairs(o) {
    var e;
    var r;
    if (o) {
      e = o.BulletEntityId;
      r = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(e);
      return [["子弹表ID", o.BulletRowName], ["子弹实体ID", e], ["发射者实体ID", o.AttackerCreatureDataComp?.GetCreatureDataId()], ["发射者名称", o.AttackerActorComp?.Owner?.GetName()], ["子弹服务器ID", r?.W5n + "," + r?.cVn]];
    } else {
      return [];
    }
  }
  static Debug(o, e, ...r) {
    if (Info_1.Info.IsPlayInEditor && (o = o?.GetComponent(22))?.Valid) {
      o.AddBulletDebugLogString(e, ...r);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, e, ...r);
    }
  }
  static Info(o, e, ...r) {
    if (Info_1.Info.IsPlayInEditor && (o = o?.GetComponent(22))?.Valid) {
      o.AddBulletDebugLogString(e, ...r);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, e, ...r);
    }
  }
  static Warn(o, e, ...r) {
    if (Info_1.Info.IsPlayInEditor && (o = o?.GetComponent(22))?.Valid) {
      o.AddBulletDebugLogString(e, ...r);
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Bullet", 20, e, ...r);
    }
  }
  static Error(o, e, ...r) {
    if (Info_1.Info.IsPlayInEditor && (o = o?.GetComponent(22))?.Valid) {
      o.AddBulletDebugLogString(e, ...r);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Bullet", 20, e, ...r);
    }
  }
}
exports.BulletLog = BulletLog;
//# sourceMappingURL=BulletLog.js.map