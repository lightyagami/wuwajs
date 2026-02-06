"use strict";

var __decorate = this && this.__decorate || function (t, e, i, r) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, r);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (o = t[l]) {
        n = (s < 3 ? o(n) : s > 3 ? o(e, i, n) : o(e, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSkillCdComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const BaseSkillCdComponent_1 = require("./BaseSkillCdComponent");
const DEFAULT_PROPORTTION_VALUE = 10000;
let CharacterSkillCdComponent = class CharacterSkillCdComponent extends BaseSkillCdComponent_1.BaseSkillCdComponent {
  constructor() {
    super(...arguments);
    this.cBe = undefined;
    this.Bzr = undefined;
    this.fZo = undefined;
    this.qzr = undefined;
    this.TGn = undefined;
    this.EZo = undefined;
    this.Arn = t => {
      this.EZo.ResetOnChangeRole();
    };
  }
  OnInit() {
    super.OnInit();
    this.cBe = this.Entity.CheckGetComponent(42);
    this.Bzr = this.Entity.CheckGetComponent(183);
    this.fZo = ModelManager_1.ModelManager.SkillCdModel.GetCurWorldSkillCdData();
    this.qzr = new Map();
    this.TGn = new Map();
    this.EZo = this.fZo.InitMultiSkill(this.Entity.Id);
    this.EZo.Init(this.Entity.Id);
    return true;
  }
  OnStart() {
    for (const e of this.cBe.GetAllSkillId()) {
      var t = this.cBe.GetSkillInfo(e);
      if (t) {
        this.InitSkillCdBySkillInfo(e, t);
      }
    }
    this.uIl();
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      for (const i of this.qzr.values()) {
        i.CheckConfigValid();
      }
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, this.Arn);
    return true;
  }
  OnEnd() {
    super.OnEnd();
    for (const t of this.qzr.values()) {
      t.ClearCdTags(this.Entity.Id);
    }
    if (this.fZo) {
      this.fZo.RemoveEntity(this.Entity);
      this.fZo = undefined;
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, this.Arn);
    return true;
  }
  GetMultiSkillInfo(t) {
    return this.EZo.GetMultiSkillInfo(t);
  }
  GetNextMultiSkillId(t) {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      for (var [e, i] of this.TGn) {
        if (e === t) {
          if (!this.IsMultiSkill(i)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 17, "获取多段技能下一段技能Id时，传入的技能Id不是多段技能", ["skillId", t]);
            }
          }
          break;
        }
      }
    }
    return this.EZo.GetNextMultiSkillId(t);
  }
  IsMultiSkill(t) {
    return this.EZo.IsMultiSkill(t);
  }
  CanStartMultiSkill(t) {
    return !!ModelManager_1.ModelManager.SkillCdModel?.SkillDebugMode || this.EZo.CanStartMultiSkill(t);
  }
  StartMultiSkill(t, e = true) {
    return !!ModelManager_1.ModelManager.SkillCdModel?.SkillDebugMode || this.EZo.StartMultiSkill(t, e);
  }
  ResetMultiSkills(t) {
    this.EZo.ResetMultiSkills(t);
  }
  InitSkillCdBySkillInfo(e, i) {
    var t = this.qzr.get(e);
    if (t) {
      return t;
    }
    try {
      var r = i.CooldownConfig;
      if (r.SectionCount - r.SectionRemaining > 1) {
        return undefined;
      } else {
        t = this.fZo.InitSkillCd(this.Entity, e, i);
        this.qzr.set(e, t);
        this.TGn.set(e, i);
        return t;
      }
    } catch (t) {
      if (t instanceof Error) {
        CombatLog_1.CombatLog.ErrorWithStack("Skill", this.Entity, "初始化技能CD异常", t, ["skillId", e], ["skillId", i?.SkillName], ["error", t.message]);
      } else {
        CombatLog_1.CombatLog.Error("Skill", this.Entity, "初始化技能CD异常", ["skillId", e], ["skillId", i?.SkillName], ["error", t]);
      }
    }
  }
  uIl() {
    var t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
    for (const e of this.qzr.values()) {
      e.InitCdTags(t);
    }
  }
  GetGroupSkillCdInfo(t) {
    return this.qzr.get(t);
  }
  IsSkillInCd(t, e = true) {
    t = this.qzr.get(t);
    return !!t && (e ? !t.HasRemainingCount() : t.IsInCd());
  }
  ModifyCdInfo(t, e) {
    var i;
    if (this.qzr) {
      return !!(i = this.qzr.get(t)) && (i.SkillCdInfoMap.get(t).SkillCd = e, true);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 17, "角色技能组件还没有初始化，不允许修改技能CD");
      }
      return false;
    }
  }
  ModifyCdTime(t, e, i) {
    var r;
    if (t && t.length !== 0) {
      if (t.length === 1) {
        if (r = this.qzr.get(Number(t[0]))) {
          r.ModifyRemainingCd(e, i);
        }
      } else {
        var o = new Set();
        for (const n of t) {
          var s = this.qzr.get(Number(n));
          if (s) {
            o.add(s);
          }
        }
        for (const l of o) {
          l.ModifyRemainingCd(e, i);
        }
      }
    }
  }
  ModifyCdTimeBySkillGenres(t, e, i) {
    var r = new Array();
    for (const a of t) {
      r.push(Number(a));
    }
    var o;
    var s;
    var n;
    var l = new Set();
    for ([o, s] of this.TGn) {
      if (r.includes(s.SkillGenre) && (n = this.qzr.get(o))) {
        l.add(n);
      }
    }
    for (const h of l) {
      h.ModifyRemainingCd(e, i);
    }
  }
  StartCd(t, e) {
    var i;
    var r = this.qzr.get(t);
    return !!r && (i = (this.Bzr?.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_CdReduse) ?? DEFAULT_PROPORTTION_VALUE) / DEFAULT_PROPORTTION_VALUE, r.StartCd(t, i, ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity), this, e), true);
  }
  CalcExtraEffectCd(t, e, i) {
    let r = 0;
    let o = 1;
    if (this.HasModifyCdEffect) {
      for (const n of this.BuffComp.BuffEffectManager.FilterById(49)) {
        if (this.Hoa(n, e, i)) {
          if (n.ModifyType === 0) {
            r += n.ModifyValue;
          } else if (n.ModifyType === 1) {
            o *= n.ModifyValue;
          }
        }
      }
    }
    var s = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId());
    if (s?.GetComponent(219)?.HasModifyCdEffect) {
      s = s?.GetComponent(222);
      if (s) {
        for (const l of s.BuffEffectManager.FilterById(49)) {
          if (this.Hoa(l, e, i)) {
            if (l.ModifyType === 0) {
              r += l.ModifyValue;
            } else if (l.ModifyType === 1) {
              o *= l.ModifyValue;
            }
          }
        }
      }
    }
    return (t + r) * o;
  }
  Hoa(t, e, i) {
    if (t.SkillType === 0) {
      return t.SkillIdOrGenres.has(e);
    } else {
      return t.SkillType === 1 && t.SkillIdOrGenres.has(i);
    }
  }
  SetLimitCount(t, e) {
    var i = this.qzr?.get(t);
    if (i) {
      i.SetLimitCount(e);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "SetLimitCount 不存在该技能:", ["EntityId", this.Entity.Id], ["limitCount", e], ["skillID", t]);
      }
      return false;
    }
  }
  AddLimitCount(t, e) {
    var i = this.qzr?.get(t);
    if (i) {
      i.AddLimitCount(e);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "AddLimitCount 不存在该技能:", ["EntityId", this.Entity.Id], ["limitCount", e], ["skillID", t]);
      }
      return false;
    }
  }
  ResetCdDelayTime(t) {
    var e = this.qzr.get(t);
    if (e) {
      if (e.ResetDelayCd()) {
        (e = Protocol_1.Aki.Protocol.qe_.create()).r5n = t;
        CombatMessage_1.CombatNet.Send(29894, this.Entity, e);
        this.EZo?.ResetMultiSkills(t, true);
      }
      return true;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "修改CD不生效，该技能不记录CD", ["EntityId", this.Entity.Id], ["skillID", t]);
      }
      return false;
    }
  }
};
CharacterSkillCdComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(220)], CharacterSkillCdComponent);
exports.CharacterSkillCdComponent = CharacterSkillCdComponent; //# sourceMappingURL=CharacterSkillCdComponent.js.map