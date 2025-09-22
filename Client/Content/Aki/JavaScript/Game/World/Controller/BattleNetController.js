"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleNetController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const REQUEST_TIME_GAP = 2000;
class BattleNetController {
  static async RequestCaptureEntity(e) {
    var t = Time_1.Time.Now;
    if (t - this.C0r < REQUEST_TIME_GAP) {
      return false;
    }
    this.C0r = t;
    var r;
    var t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    if (ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) {
      (r = Protocol_1.Aki.Protocol.ocs.create()).s5n = MathUtils_1.MathUtils.NumberToLong(t);
      return !!(r = await Net_1.Net.CallAsync(28369, r)) && (r.G9n === 0 || !(Log_1.Log.CheckWarn() && Log_1.Log.Warn("Level", 29, "幻象收复失败", ["ErrCode", r.G9n]), 1));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 29, "[CreatureController.RequestCaptureEntity] 请求幻象收复失败, Entity为空。", ["CreatureDataId", t], ["EntityId", e]);
      }
      return false;
    }
  }
  static async RequestBatchCaptureEntity(e) {
    var t = Time_1.Time.Now;
    if (t - this.jku < REQUEST_TIME_GAP) {
      return [];
    }
    this.jku = t;
    var r = [];
    var o = new Map();
    for (const _ of e) {
      var a;
      var i = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(_);
      if (i) {
        if (ModelManager_1.ModelManager.CreatureModel.GetEntity(i)) {
          (a = Protocol_1.Aki.Protocol.ocs.create()).s5n = MathUtils_1.MathUtils.NumberToLong(i);
          r.push(Net_1.Net.CallAsync(28369, a));
          o.set(i, _);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 72, "[CreatureController.RequestBatchCaptureEntity] 客户端 请求幻象收复失败, Entity为空。", ["CreatureDataId", i], ["EntityId", _]);
        }
      }
    }
    var l;
    var n = [];
    for (const s of await Promise.all(r)) {
      if (s && s.G9n === 0) {
        l = MathUtils_1.MathUtils.LongToNumber(s.s5n);
        if (o.has(l)) {
          n.push(o.get(l));
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("World", 72, "[CreatureController.RequestBatchCaptureEntity] 服务端 判定批量幻象收复失败", ["ErrCode", s?.G9n], ["CreatureDataId", s?.s5n], ["entityIds", e]);
      }
    }
    return n;
  }
}
(exports.BattleNetController = BattleNetController).C0r = 0;
BattleNetController.jku = 0; //# sourceMappingURL=BattleNetController.js.map