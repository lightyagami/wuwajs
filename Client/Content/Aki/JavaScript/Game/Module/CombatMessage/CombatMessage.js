"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombatNet = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../Core/Common/Log");
const LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer");
const Time_1 = require("../../../Core/Common/Time");
const NetDefine_1 = require("../../../Core/Define/Net/NetDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
var CombatCommon = Protocol_1.Aki.Protocol.K8n;
var PushData = Protocol_1.Aki.Protocol.CombatMessage.OFs;
var RequestData = Protocol_1.Aki.Protocol.CombatMessage.FFs;
var SendData = Protocol_1.Aki.Protocol.CombatMessage.VFs;
const Stats_1 = require("../../../Core/Common/Stats");
const IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : undefined;
class CombatNet {
  static CheckHandle(e, t, o, a) {
    return typeof e == "function" || (Log_1.Log.CheckError() && Log_1.Log.Error("MultiplayerCombat", 19, "CombatMessage notify callback should be static function", ["MessageKey", t], ["MessageId", o], ["FunctionName", a]), false);
  }
  static Listen(o, s, i = false) {
    const n = NetDefine_1.ECombatNotifyDataMessage[o];
    return (a, t, r) => {
      if (this.CheckHandle(a, o, n, t)) {
        let e = this.NotifyMap.get(n);
        if (!e) {
          e = {
            Type: 0,
            IsSync: s,
            IsCache: i,
            Listener: undefined,
            Preprocessor: undefined
          };
          this.NotifyMap.set(n, e);
        }
        if (e.Type === 1 || e.Listener) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiplayerCombat", 19, "重复注册函数监听", ["MessageKey", o], ["MessageId", n], ["FunctionName", t]);
          }
        } else {
          e.IsSync = e.IsSync ?? s;
          if (this.CheckHandle(a, o, n, t)) {
            e.Listener = (e, t, o) => {
              r.value?.call(a, e, t, o);
            };
          }
        }
      }
    };
  }
  static Preprocess(o) {
    const s = NetDefine_1.ECombatNotifyDataMessage[o];
    return (a, t, r) => {
      if (this.CheckHandle(a, o, s, t)) {
        let e = this.NotifyMap.get(s);
        if (!e) {
          e = {
            Type: 0,
            IsSync: undefined,
            IsCache: undefined,
            Listener: undefined,
            Preprocessor: undefined
          };
          this.NotifyMap.set(s, e);
        }
        if (e.Type === 1 || e.Preprocessor) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiplayerCombat", 19, "不能为组件listener注册预处理函数或重复注册预处理函数", ["MessageKey", o], ["MessageId", s], ["FunctionName", t]);
          }
        } else {
          e.Preprocessor = (e, t, o) => r.value?.call(a, e, t, o);
        }
      }
    };
  }
  static GenerateRpcId() {
    if (CombatNet.zyt < 32767) {
      return ++CombatNet.zyt;
    } else {
      return CombatNet.zyt = 0;
    }
  }
  static RemovePendingCall(e) {
    this.R5l.delete(e);
  }
  static Call(e, t, o, a, r, s, i, n) {
    CombatNet.Tc_.Start();
    if (r && this.R5l.has(r)) {
      const [C, l, _] = this.R5l.get(r);
      CombatNet.RequestMap.set(C, l);
      ModelManager_1.ModelManager.CombatMessageModel.MessagePack.R5n.push(_);
      this.R5l.delete(r);
    }
    t = (t instanceof Entity_1.Entity ? t : ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity)?.GetComponent(0)?.GetCreatureDataId() ?? 0;
    e = NetDefine_1.ECombatRequestDataMessage[e];
    const C = CombatNet.GenerateRpcId();
    var s = s ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    var m = RequestData.create();
    m.W8n = C;
    m.K8n = CombatNet.CreateCombatCommon(t, i, r, s);
    m[e] = o;
    const _ = SendData.create();
    _.x5n = m;
    if (n) {
      this.R5l.set(s, [C, a, _]);
    } else {
      CombatNet.RequestMap.set(C, a);
      ModelManager_1.ModelManager.CombatMessageModel.MessagePack.R5n.push(_);
    }
    CombatNet.Tc_.Stop();
    return s;
  }
  static Send(e, t, o, a, r, s) {
    CombatNet.bc_.Start();
    if (a && this.R5l.has(a)) {
      const [C, m, n] = this.R5l.get(a);
      CombatNet.RequestMap.set(C, m);
      ModelManager_1.ModelManager.CombatMessageModel.MessagePack.R5n.push(n);
      this.R5l.delete(a);
    }
    var e = NetDefine_1.ECombatPushDataMessage[e];
    var i = PushData.create();
    var t = t?.GetComponent(0)?.GetCreatureDataId() ?? 0;
    r = r ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    i.K8n = CombatNet.CreateCombatCommon(t, s, a, r);
    i[e] = o;
    const n = SendData.create();
    n.Q8n = i;
    ModelManager_1.ModelManager.CombatMessageModel.MessagePack.R5n.push(n);
    CombatNet.bc_.Stop();
    return r;
  }
  static CreateCombatCommon(e, t, o, a) {
    return CombatCommon.create({
      F4n: e,
      X8n: o ? MathUtils_1.MathUtils.BigIntToLong(o) : 0,
      $8n: MathUtils_1.MathUtils.BigIntToLong(a ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      Y8n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      J8n: Time_1.Time.NowSeconds,
      z8n: t ?? false
    });
  }
}
(exports.CombatNet = CombatNet).NotifyMap = new Map();
CombatNet.zyt = 0;
CombatNet.RequestMap = new Map();
CombatNet.R5l = new Map();
CombatNet.Tc_ = Stats_1.Stat.Create("CombatNet.Call");
CombatNet.bc_ = Stats_1.Stat.Create("CombatNet.Send"); //# sourceMappingURL=CombatMessage.js.map