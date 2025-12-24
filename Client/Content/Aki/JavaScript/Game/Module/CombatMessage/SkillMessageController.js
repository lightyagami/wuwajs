"use strict";

var _a;
var __decorate = this && this.__decorate || function (e, o, t, l) {
  var r;
  var a = arguments.length;
  var s = a < 3 ? o : l === null ? l = Object.getOwnPropertyDescriptor(o, t) : l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, o, t, l);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (r = e[i]) {
        s = (a < 3 ? r(s) : a > 3 ? r(o, t, s) : r(o, t)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(o, t, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillMessageController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatLog_1 = require("../../Utils/CombatLog");
const CombatMessage_1 = require("./CombatMessage");
const SKILL_PLAY_MONTAGE = 1;
class SkillMessageController extends ControllerBase_1.ControllerBase {
  static AddSkillMessageId(e) {
    this.UIt.add(e);
  }
  static OnInit() {
    Net_1.Net.Register(25844, SkillMessageController.sCc);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(25844);
    SkillMessageController.UIt.clear();
    return true;
  }
  static PreUseSkillNotify(e, o) {
    e = e?.GetComponent(58);
    return !e || !!e.PreSwitchRemoteFightState(o.dVn.mVn);
  }
  static UseSkillNotify(e, o, t) {
    var l;
    if (e && o && o.dVn && o.dVn.r5n) {
      if (o.dVn.s5n && (t = MathUtils_1.MathUtils.LongToBigInt(t.$8n), e = e.GetComponent(40), l = MathUtils_1.MathUtils.LongToNumber(o.dVn.CVn), e?.SimulatedBeginSkill(MathUtils_1.MathUtils.LongToNumber(o.dVn.r5n), l, o.dVn.gVn, o.dVn.n5n * 0.001, t))) {
        SkillMessageController.UIt.add(t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiplayerCombat", 14, "[CreatureController.UseSkillNotify] 服务器返回参数有误。");
    }
  }
  static SkillNotify(e, o, t) {
    var l;
    var r = e?.GetComponent(40);
    if (r) {
      l = MathUtils_1.MathUtils.LongToBigInt(t.X8n);
      if (SkillMessageController.UIt.has(l)) {
        if (o.pVn.fVn === SKILL_PLAY_MONTAGE) {
          l = MathUtils_1.MathUtils.LongToBigInt(t.$8n);
          r.SimulatePlayMontage(o.dVn?.r5n ? MathUtils_1.MathUtils.LongToNumber(o.dVn?.r5n) : 0, o.pVn.lVn, o.pVn.vVn, o.pVn.MVn, o.pVn.SVn, l);
        }
      } else {
        CombatLog_1.CombatLog.Info("Skill", e, "技能释放未被确认，拒绝其后续行为", ["技能Id", o.dVn.r5n]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiplayerCombat", 14, "[CreatureController.SkillNotify] 不存在skillComponent。");
    }
  }
  static EndSkillNotify(e, o, t) {
    if (o.dVn && o.dVn.s5n) {
      t = MathUtils_1.MathUtils.LongToBigInt(t.X8n);
      SkillMessageController.UIt.delete(t);
      e?.GetComponent(40)?.SimulateEndSkill(MathUtils_1.MathUtils.LongToNumber(o.dVn.r5n));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[CreatureController.EndSkillNotify] 服务器返回参数有误。");
    }
  }
  static UseSkillRequest(o, e, t) {
    const l = o.GetComponent(40);
    var r = e.SkillId;
    var a = e.SkillInfo.AutonomouslyBySimulate;
    var s = e.SkillInfo.MoveControllerTime;
    var i = e.InterruptLevel;
    var _ = e.PreContextId;
    var c = e.MNc;
    var n = Protocol_1.Aki.Protocol.b3n.create();
    n.dVn = Protocol_1.Aki.Protocol.W3s.create();
    n.dVn.r5n = r;
    var r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    n.dVn.CVn = MathUtils_1.MathUtils.NumberToLong(r);
    n.dVn.J8n = Time_1.Time.NowSeconds;
    n.dVn.gVn = a;
    n.dVn.n5n = s * 1000;
    n.dVn.EVn = i;
    n.Qh1 = e.BattleFlags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
    const C = e.FightStateHandle;
    if (C) {
      n.dVn.mVn = l.FightStateComp?.GetFightState() ?? 0;
    }
    CombatMessage_1.CombatNet.Call(18258, o, n, e => {
      if (!o.IsEnd) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (C) {
            l.FightStateComp?.ConfirmState(C);
          }
        } else {
          CombatLog_1.CombatLog.Info("Skill", o, "技能释放服务器拒绝，技能终止", ["技能Id", e.dVn?.r5n]);
          l.EndSkill(MathUtils_1.MathUtils.LongToNumber(e.dVn.r5n), "SkillMessageController.UseSkillRequest");
        }
      }
    }, _, c);
    return true;
  }
  static EndSkillRequest(e, o, t) {
    var l;
    if (e) {
      (l = Protocol_1.Aki.Protocol.ne_.create()).dVn = Protocol_1.Aki.Protocol.W3s.create();
      l.dVn.r5n = o;
      l.dVn.J8n = Time_1.Time.NowSeconds;
      l.x9n = t.Reason;
      l.WSl = Protocol_1.Aki.Protocol.WSl.create();
      l.WSl.F4n = t.EntityId;
      l.WSl.r5n = t.SkillId;
      l.WSl.Mjn = t.BulletId;
      CombatMessage_1.CombatNet.Send(27644, e, l);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiplayerCombat", 14, "[CreatureController.EndSkillRequest] entityId无效。", ["EntityId", undefined]);
      }
      return false;
    }
  }
  static MontageRequest(o, e, t, l, r, a = 1, s = "", i = 0, _ = undefined, c = undefined) {
    const n = Number(t);
    t = Protocol_1.Aki.Protocol.W3s.create();
    t.r5n = n;
    t.CVn = l;
    t.J8n = Time_1.Time.NowSeconds;
    l = Protocol_1.Aki.Protocol.T4s.create();
    l.fVn = e;
    l.lVn = r;
    l.vVn = a;
    l.MVn = s;
    l.SVn = i;
    e = Protocol_1.Aki.Protocol.w3n.create();
    e.dVn = t;
    e.pVn = l;
    CombatMessage_1.CombatNet.Call(17842, o, e, e => {
      if (!o.IsEnd) {
        switch (e.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrCombatSkillGAHandleGetEntityFailed:
            break;
          default:
            CombatLog_1.CombatLog.Error("Skill", o, "播放蒙太奇请求失败", ["技能Id", n], ["ErrorCode", e?.Q4n]);
        }
      }
    }, _, c);
  }
  static AnimNotifyRequest(e, o, t, l, r = undefined, a = undefined) {
    var s = Protocol_1.Aki.Protocol.Pe_.create();
    s.yVn = l;
    s.lVn = t;
    s.r5n = o;
    CombatMessage_1.CombatNet.Send(26668, e, Protocol_1.Aki.Protocol.Pe_.create(s), r, a);
  }
  static PassiveSkillAddRequest(e, o, t = undefined) {
    CombatLog_1.CombatLog.Info("Skill", e, "添加被动Request", ["被动技能Id", o]);
    var l = Protocol_1.Aki.Protocol.Be_.create();
    l.IVn = MathUtils_1.MathUtils.NumberToLong(o);
    l.TVn = e.GetComponent(0).GetCreatureDataId();
    var o = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    CombatMessage_1.CombatNet.Send(15020, e, Protocol_1.Aki.Protocol.Be_.create(l), t, o);
    return o;
  }
  static PassiveSkillRemoveRequest(e, o, t = undefined, l = undefined) {
    CombatLog_1.CombatLog.Info("Skill", e, "移除被动Request", ["被动技能Id", o]);
    var r = Protocol_1.Aki.Protocol.je_.create();
    r.IVn = MathUtils_1.MathUtils.NumberToLong(o);
    r.TVn = e.GetComponent(0).GetCreatureDataId();
    CombatMessage_1.CombatNet.Send(21852, e, Protocol_1.Aki.Protocol.je_.create(r), t, l);
  }
  static aCc(e, o) {
    if (!this.ClosePrintDebugFightErrInfo) {
      CombatLog_1.CombatLog.Error("Message", undefined, e, ["info", o]);
    }
  }
}
(_a = SkillMessageController).CloseMonsterServerLogic = false;
SkillMessageController.ClosePrintDebugFightErrInfo = true;
SkillMessageController.UIt = new Set();
SkillMessageController.sCc = e => {
  switch (e.Q4n) {
    case Protocol_1.Aki.Protocol.Q4n.Proto_ErrConfSkillNotExist:
      _a.aCc("技能配置未找到", e.GNs);
      break;
    case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillCD:
      _a.aCc("技能CD中", e.GNs);
      break;
    case Protocol_1.Aki.Protocol.Q4n.Proto_ErrContextCheckFail:
      _a.aCc("技能上下文校验报错", e.GNs);
      break;
    case Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayMontageButNoSkill:
      _a.aCc("蒙太奇对应的技能未释放成功", e.GNs);
      break;
    case Protocol_1.Aki.Protocol.Q4n.Proto_ErrMontageConfigNotFound:
      _a.aCc("蒙太奇配置未找到", e.GNs);
      break;
    case Protocol_1.Aki.Protocol.Q4n.Proto_ErrANConfigNotFound:
      _a.aCc("AN配置未找到", e.GNs);
      break;
    case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBulletConfigNotFound:
      _a.aCc("子弹配置未找到", e.GNs);
      break;
    case Protocol_1.Aki.Protocol.Q4n.Proto_ErrNoBuffConf:
      _a.aCc("BUFF配置未找到", e.GNs);
      break;
    default:
      _a.aCc("未支持的ErrorCode", e.GNs);
  }
};
__decorate([CombatMessage_1.CombatNet.Preprocess("DFn")], SkillMessageController, "PreUseSkillNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("DFn", true, true)], SkillMessageController, "UseSkillNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("LFn", true, true)], SkillMessageController, "SkillNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("AFn", true, true)], SkillMessageController, "EndSkillNotify", null);
exports.SkillMessageController = SkillMessageController; //# sourceMappingURL=SkillMessageController.js.map