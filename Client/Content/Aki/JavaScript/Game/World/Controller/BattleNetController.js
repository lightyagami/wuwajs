"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleNetController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
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
      return !!(r = await Net_1.Net.CallAsync(26158, r)) && (r.G9n === 0 || !(Log_1.Log.CheckWarn() && Log_1.Log.Warn("Level", 29, "幻象收复失败", ["ErrCode", r.G9n]), 1));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 29, "[CreatureController.RequestCaptureEntity] 请求幻象收复失败, Entity为空。", ["CreatureDataId", t], ["EntityId", e]);
      }
      return false;
    }
  }
  static async RequestBatchCaptureEntity(t) {
    var e = Time_1.Time.Now;
    if (e - this.jku < REQUEST_TIME_GAP) {
      return [];
    }
    this.jku = e;
    var r = new Map();
    var o = Protocol_1.Aki.Protocol.Fbm.create();
    o.r6n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    for (const s of t) {
      var a = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(s);
      if (ModelManager_1.ModelManager.CreatureModel.GetEntity(a)) {
        r.set(a, s);
        o.BVn.push(MathUtils_1.MathUtils.NumberToLong(a));
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 96, "[CreatureController.RequestBatchCaptureEntity] 客户端 请求幻象收复失败, Entity为空。", ["CreatureDataId", a], ["entityIds", t]);
      }
    }
    var i = await Net_1.Net.CallAsync(25822, o);
    var l = [];
    if (i && i.G9n === 0) {
      for (let e = 0; e < i?.BVn.length; e++) {
        var n;
        var _ = MathUtils_1.MathUtils.LongToNumber(i?.BVn[e]);
        if (r.has(_)) {
          if (n = EntitySystem_1.EntitySystem.Get(r.get(_))) {
            l.push(n.Id);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("World", 96, "[CreatureController.RequestBatchCaptureEntity] 没找到幻象实体Id", ["ErrCode", i?.G9n], ["upIds", t], ["downIds", i?.BVn], ["creatureDataId", _]);
          }
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("World", 96, "[CreatureController.RequestBatchCaptureEntity] 服务端 判定批量幻象收复失败", ["ErrCode", i?.G9n], ["upIds", t], ["downIds", i?.BVn]);
    }
    return l;
  }
}
(exports.BattleNetController = BattleNetController).C0r = 0;
BattleNetController.jku = 0; //# sourceMappingURL=BattleNetController.js.map