"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AceAntiCheatController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const InputController_1 = require("../../Input/InputController");
const InputEnums_1 = require("../../Input/InputEnums");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const POSTICKTIME = 1000;
const POSTICKCOUNT = 120;
const MINSPEEDINIT = 999999;
class AceAntiCheatController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(28119, AceAntiCheatController.PTa);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(28119);
    return true;
  }
  static OnTick(t) {
    var e;
    if (this.wTa && (e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorVelocityProxy.Size() ?? 0) > 0 && (this.BTa = (this.bTa * this.BTa + e) / (this.bTa + 1), this.bTa += 1, e < this.qTa && (this.qTa = e), e > this.nun)) {
      this.nun = e;
    }
    if (this.GTa && this.OTa && (this.kTa += t, this.kTa > POSTICKTIME)) {
      this.kTa -= POSTICKTIME;
      for (const r of this.OTa.keys()) {
        var o;
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity?.GetComponent(1)?.ActorLocationProxy;
        if (i && ((o = this.OTa.get(r).rS_).push(i), o.length > POSTICKCOUNT)) {
          this.GTa = false;
        }
      }
    }
  }
  static YNr() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    if (t) {
      return ModelManager_1.ModelManager.SceneTeamModel?.GetTeamPlayerData(t)?.GetGroup(1)?.GetRoleList();
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Net", 35, "StartSecFbRound playerId Error");
    }
  }
  static NTa(t) {
    var e;
    var o;
    if (this.FTa > 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Net", 35, "StartSecFbRound repeat", ["logId", t]);
      }
    } else {
      this.FTa = t;
      this.VTa = Time_1.Time.WorldTime;
      (e = Protocol_1.Aki.Protocol.zd_.create()).HTa = MathUtils_1.MathUtils.BigIntToLong(t);
      e.jTa = TimeUtil_1.TimeUtil.DateFormat2(new Date());
      if (o = this.YNr()) {
        e.WTa = o[0] ? this.QTa(o[0]) : undefined;
        e.KTa = o[1] ? this.QTa(o[1]) : undefined;
        e.$Ta = o[2] ? this.QTa(o[2]) : undefined;
        e.XTa = o[3] ? this.QTa(o[3]) : undefined;
        this.YTa(true);
        Net_1.Net.Call(27960, e, () => {});
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 35, "StartSecFbRound roleList Error", ["logId", t]);
      }
    }
  }
  static QTa(t) {
    var e = Protocol_1.Aki.Protocol.ZL_.create();
    var o = ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(t.RoleId);
    var i = o?.GetLevelData();
    e.txs = i?.GetBreachLevel() ?? 0;
    e.F6n = i?.GetLevel() ?? 0;
    e.U8n = i?.GetExp() ?? 0;
    e.Q6n = t.RoleId;
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.CreatureDataId)?.Entity?.GetComponent(173);
    if (r) {
      var a = [];
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        var l = Protocol_1.Aki.Protocol.Xks.create();
        l.s5n = t;
        l.e5n = r.GetCurrentValue(t);
        a.push(l);
      }
      e.JTa = a;
    }
    var s = o?.GetSkillData();
    var i = s?.GetSkillList();
    if (s && i) {
      var n = [];
      for (const h of i) {
        var _ = Protocol_1.Aki.Protocol.zTa.create();
        _.r5n = h.Id;
        _.F6n = s.GetSkillLevel(h.Id);
        n.push(_);
      }
      e.zTa = n;
    }
    return e;
  }
  static YTa(t) {
    this.wTa = t;
    this.bTa = 0;
    this.BTa = 0;
    this.nun = 0;
    this.qTa = MINSPEEDINIT;
  }
  static ZTa(t) {
    var e;
    if (this.FTa !== t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 35, "EndSecFbRound logId Error", ["logId", t], ["SecFbRoundLogId", this.FTa]);
      }
    } else {
      (e = Protocol_1.Aki.Protocol.tm_.create()).HTa = MathUtils_1.MathUtils.BigIntToLong(t);
      e.eLa = TimeUtil_1.TimeUtil.DateFormat2(new Date());
      e.tLa = Time_1.Time.WorldTime - this.VTa;
      e.iLa = this.nun;
      e.rLa = this.qTa === MINSPEEDINIT ? 0 : this.qTa;
      e.oLa = this.BTa;
      this.YTa(false);
      Net_1.Net.Call(27764, e, () => {});
      this.FTa = -1n;
    }
  }
  static nLa(t) {
    if (this.sLa > 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Net", 35, "StartSecRoleFightFlowBigWorld repeat", ["logId", t]);
      }
    } else {
      this.aLa();
      this.sLa = t;
    }
  }
  static hLa(t) {
    if (this.sLa !== t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 35, "EndSecRoleFightFlowBigWorld logId Error", ["logId", t], ["SecRoleFightFlowBigWorldLogId", this.sLa]);
      }
    } else {
      this.lLa(t, Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_BigWorldEnd);
      this.sLa = -1n;
    }
  }
  static aLa() {
    var t = this.YNr();
    if (t) {
      for (const i of this._La = t) {
        this.OTa ||= new Map();
        if (!this.OTa.get(i.CreatureDataId)) {
          (e = Protocol_1.Aki.Protocol.ew_.create()).uLa = i.RoleId;
          this.OTa.set(i.CreatureDataId, e);
        }
        var e = this.QTa(i);
        this.OTa.get(i.CreatureDataId).cLa = e;
        var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(i.CreatureDataId);
        var o = o?.Entity;
        if (o) {
          o.GetComponent(172)?.AddGeneralListener(this.qbr);
          if (!EventSystem_1.EventSystem.HasWithTarget(o, EventDefine_1.EEventName.CharDamage, this.Uie)) {
            EventSystem_1.EventSystem.AddWithTarget(o, EventDefine_1.EEventName.CharDamage, this.Uie);
          }
          this.GTa = true;
          this.jhh(o.Id);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Net", 35, "StartColletRoleFightFlow roleEntity Error");
        }
      }
      this.mLa = Time_1.Time.WorldTime;
      t = ModelManager_1.ModelManager.CharacterModel.GetHandle(Global_1.Global.BaseCharacter?.EntityId ?? 0);
      this.dLa = t?.Entity?.GetComponent(0).GetCreatureDataId();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Net", 35, "StartColletRoleFightFlow roleList Error");
    }
  }
  static lLa(t, e) {
    if (this._La && this.OTa) {
      var o;
      var i = Protocol_1.Aki.Protocol.rm_.create();
      i.HTa = MathUtils_1.MathUtils.BigIntToLong(t);
      i.D6n = TimeUtil_1.TimeUtil.DateFormat2(new Date());
      var r = [];
      var t = ModelManager_1.ModelManager.CharacterModel.GetHandle(Global_1.Global.BaseCharacter?.EntityId ?? 0)?.Entity?.GetComponent(0).GetCreatureDataId();
      if (t && this.OTa.get(t)) {
        o = MathUtils_1.MathUtils.LongToNumber(this.OTa.get(t).CLa);
        this.OTa.get(t).CLa = Time_1.Time.WorldTime - this.mLa + o;
      }
      for (const l of this.OTa.values()) {
        r.push(l);
      }
      i.gLa = r;
      i.fLa = e;
      Net_1.Net.Call(21920, i, () => {});
      for (const s of this._La) {
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(s.CreatureDataId)?.Entity;
        if (a) {
          a.GetComponent(172)?.RemoveGeneralListener(this.qbr);
          EventSystem_1.EventSystem.RemoveWithTarget(a, EventDefine_1.EEventName.CharDamage, this.Uie);
          this.GTa = false;
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Net", 35, "StartColletRoleFightFlow roleEntity Error");
        }
      }
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      this.Whh();
      this.OTa = undefined;
      this._La = undefined;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Net", 35, "SendRoleFightFlowRequest List Error");
    }
  }
  static pLa(t) {
    if (this.vLa > 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Net", 35, "StartSecRoleFightFlowInst repeat", ["logId", t]);
      }
    } else {
      this.aLa();
      this.vLa = t;
    }
  }
  static MLa(t) {
    if (this.vLa !== t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 35, "EndSecRoleFightFlowInst logId Error", ["logId", t], ["SecRoleFightFlowInstLogId", this.vLa]);
      }
    } else {
      this.lLa(t, Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_InstEnd);
      this.vLa = -1n;
    }
  }
  static SLa(t, e) {
    if (this.ELa > 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Net", 35, "StartSecFbRound repeat", ["logId", t]);
      }
    } else {
      this.ELa = t;
      this.YTa(true);
      this.yLa = TimerSystem_1.TimerSystem.Delay(() => {
        this.yLa = undefined;
        this.ILa(this.ELa);
      }, e);
    }
  }
  static ILa(t) {
    var e;
    if (this.ELa !== t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 35, "EndSecWorldInfoFlow logId Error", ["logId", t], ["SecWorldInfoFlowLogId", this.ELa]);
      }
    } else {
      if (this.yLa) {
        TimerSystem_1.TimerSystem.Remove(this.yLa);
        this.yLa = undefined;
      }
      (e = Protocol_1.Aki.Protocol.nm_.create()).HTa = MathUtils_1.MathUtils.BigIntToLong(t);
      e.D6n = TimeUtil_1.TimeUtil.DateFormat2(new Date());
      e.iLa = this.nun;
      e.rLa = this.qTa === MINSPEEDINIT ? 0 : this.qTa;
      e.oLa = this.BTa;
      this.YTa(false);
      Net_1.Net.Call(16741, e, () => {});
      this.ELa = -1n;
    }
  }
  static TLa(t) {
    var e;
    var o;
    if (this.LLa > 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Net", 35, "StartSecFbRound repeat", ["logId", t]);
      }
    } else {
      this.LLa = t;
      this.VTa = Time_1.Time.WorldTime;
      (e = Protocol_1.Aki.Protocol.am_.create()).HTa = MathUtils_1.MathUtils.BigIntToLong(t);
      e.jTa = TimeUtil_1.TimeUtil.DateFormat2(new Date());
      if (o = this.YNr()) {
        e.WTa = o[0] ? this.QTa(o[0]) : undefined;
        e.KTa = o[1] ? this.QTa(o[1]) : undefined;
        e.$Ta = o[2] ? this.QTa(o[2]) : undefined;
        e.XTa = o[3] ? this.QTa(o[3]) : undefined;
        this.YTa(true);
        Net_1.Net.Call(21377, e, () => {});
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 35, "StartSecWorldFlow roleList Error", ["logId", t]);
      }
    }
  }
  static DLa(t) {
    var e;
    if (this.LLa !== t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 35, "EndSecWorldFlow logId Error", ["logId", t], ["SecWorldFlowLogId", this.LLa]);
      }
    } else {
      this.LLa = -1n;
      (e = Protocol_1.Aki.Protocol.lm_.create()).HTa = MathUtils_1.MathUtils.BigIntToLong(t);
      e.eLa = TimeUtil_1.TimeUtil.DateFormat2(new Date());
      e.tLa = Time_1.Time.WorldTime - this.VTa;
      e.iLa = this.nun;
      e.rLa = this.qTa === MINSPEEDINIT ? 0 : this.qTa;
      e.oLa = this.BTa;
      this.YTa(false);
      Net_1.Net.Call(26075, e, () => {});
    }
  }
  static jhh(t) {
    var e = InputController_1.InputController.CreateInputLayer(99);
    if (e) {
      InputController_1.InputController.AddInputLayer(t, e);
      this.whh ||= [];
      this.whh.push(e);
    }
  }
  static Whh() {
    if (this.whh) {
      for (const t of this.whh) {
        t.Clear();
        InputController_1.InputController.RemoveInputLayer(t);
      }
      this.whh = undefined;
    }
  }
  static HandlePress(t, e) {
    this.LZo(t, e);
  }
}
exports.AceAntiCheatController = AceAntiCheatController;
(_a = AceAntiCheatController).FTa = -1n;
AceAntiCheatController.sLa = -1n;
AceAntiCheatController.vLa = -1n;
AceAntiCheatController.ELa = -1n;
AceAntiCheatController.LLa = -1n;
AceAntiCheatController.whh = undefined;
AceAntiCheatController.PTa = t => {
  var e = MathUtils_1.MathUtils.LongToBigInt(t.HTa);
  switch (t.fLa) {
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecGetReportData2Flow:
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecFBRoundStartFlow:
      _a.NTa(e);
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecFBRoundEndFlow:
      _a.ZTa(e);
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_BigWorldStart:
      _a.nLa(e);
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_BigWorldEnd:
      _a.hLa(e);
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_InstStart:
      _a.pLa(e);
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_InstEnd:
      _a.MLa(e);
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecWorldInfoFlow_Start:
      _a.SLa(e, MathUtils_1.MathUtils.LongToNumber(t.Hy_));
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecWorldInfoFlow_End:
      _a.ILa(e);
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecWorldStartFlow:
      _a.TLa(e);
      break;
    case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecWorldSEndFlow:
      _a.DLa(e);
      break;
    default:
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Net", 35, "UnknownAntiCheatingLogType", ["Type", t.fLa]);
      }
  }
};
AceAntiCheatController.VTa = 0;
AceAntiCheatController.BTa = 0;
AceAntiCheatController.qTa = 0;
AceAntiCheatController.nun = 0;
AceAntiCheatController.bTa = 0;
AceAntiCheatController.wTa = false;
AceAntiCheatController.GTa = false;
AceAntiCheatController.kTa = 0;
AceAntiCheatController._La = undefined;
AceAntiCheatController.OTa = undefined;
AceAntiCheatController.mLa = 0;
AceAntiCheatController.dLa = undefined;
AceAntiCheatController.qbr = (t, e, o) => {
  if (_a.OTa) {
    for (const r of _a.OTa.keys()) {
      const o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity?.GetComponent(172)?.GetCurrentValue(t) ?? 0;
      var i = _a.OTa.get(r).cLa.JTa[t - 1];
      if (i && i.s5n === t && i.e5n < o) {
        i.e5n = o;
      }
    }
  } else if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("Net", 35, "SetNewAttrMaxValue FightRoleInfoMap nil");
  }
};
AceAntiCheatController.Uie = (t, e, o, i) => {
  if (_a.OTa) {
    i = i.Damage;
    if (i !== 0) {
      var r = -i;
      for (const l of _a.OTa.keys()) {
        var a = t.GetComponent(0).GetCreatureDataId();
        if (l === a) {
          (a = _a.OTa.get(l)).ALa = r + MathUtils_1.MathUtils.LongToNumber(a.ALa);
          a.RLa += 1;
          a.ULa += o.IsImmune ? 1 : 0;
          if (o.IsCritical) {
            a.xLa += 1;
            if (r > a.PLa) {
              a.PLa = r;
            }
            if (r < a.wLa) {
              a.wLa = r;
            }
          } else {
            if (r > a.BLa) {
              a.BLa = r;
            }
            if (r < a.bLa) {
              a.bLa = r;
            }
          }
        }
      }
    }
  } else if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("Net", 35, "OnDamage FightRoleInfoMap nil");
  }
};
AceAntiCheatController.LZo = (t, e) => {
  if (_a.dLa && _a.OTa) {
    var o = _a.OTa.get(_a.dLa);
    if (o) {
      switch (t) {
        case InputEnums_1.EInputAction.攻击:
          o.qLa += 1;
          break;
        case InputEnums_1.EInputAction.闪避:
          o.GLa += 1;
          break;
        case InputEnums_1.EInputAction.跳跃:
          o.OLa += 1;
          break;
        case InputEnums_1.EInputAction.大招:
          o.kLa += 1;
          break;
        case InputEnums_1.EInputAction.幻象2:
          o.NLa += 1;
          break;
        case InputEnums_1.EInputAction.技能1:
          o.FLa += 1;
      }
    }
  }
};
AceAntiCheatController.xie = (t, e) => {
  var o;
  if (e && _a.OTa) {
    if ((e = e.Entity?.GetComponent(0).GetCreatureDataId()) && _a.OTa.get(e)) {
      o = MathUtils_1.MathUtils.LongToNumber(_a.OTa.get(e).CLa);
      _a.OTa.get(e).CLa = Time_1.Time.WorldTime - _a.mLa + o;
    }
    _a.mLa = Time_1.Time.WorldTime;
    _a.dLa = t.Entity?.GetComponent(0).GetCreatureDataId();
  }
};
AceAntiCheatController.yLa = undefined; //# sourceMappingURL=AceAntiCheatController.js.map