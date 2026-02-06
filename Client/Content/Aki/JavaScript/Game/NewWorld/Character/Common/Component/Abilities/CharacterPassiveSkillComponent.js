"use strict";

var ESkillAction;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var l = arguments.length;
  var o = l < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        o = (l < 3 ? r(o) : l > 3 ? r(e, i, o) : r(e, i)) || o;
      }
    }
  }
  if (l > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPassiveSkillComponent = exports.ESkillAction = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const PassiveSkillById_1 = require("../../../../../../Core/Define/ConfigQuery/PassiveSkillById");
const Entity_1 = require("../../../../../../Core/Entity/Entity");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const BulletController_1 = require("../../../../Bullet/BulletController");
const CharacterPassiveSkillCustomAction_1 = require("./CharacterPassiveSkillCustomAction");
const TriggerType_1 = require("./Trigger/TriggerType");
(function (t) {
  t[t.AddBullet = 1] = "AddBullet";
  t[t.RemoveBullet = 2] = "RemoveBullet";
  t[t.AddBuff = 3] = "AddBuff";
  t[t.RemoveBuff = 4] = "RemoveBuff";
  t[t.StartSkill = 5] = "StartSkill";
  t[t.LockOn = 6] = "LockOn";
  t[t.Customize = 7] = "Customize";
  t[t.ReduceSkillCd = 8] = "ReduceSkillCd";
})(ESkillAction = exports.ESkillAction ||= {});
const GlobalTriggerWhitelist = [1302101064];
let CharacterPassiveSkillComponent = class CharacterPassiveSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.xOr = undefined;
    this.wOr = undefined;
    this.BOr = undefined;
    this.H1m = undefined;
    this.bOr = new Map();
    this.nx = undefined;
    this.LockMap = new Set();
  }
  OnInit() {
    this.xOr = this.Entity.CheckGetComponent(28);
    this.wOr = this.Entity.CheckGetComponent(185);
    this.BOr = this.Entity.GetComponent(219);
    this.H1m = this.Entity.GetComponent(3);
    this.nx = {
      SkillId: 0,
      Owner: this.Entity,
      BuffComp: this.wOr,
      PassiveSkillComp: this
    };
    return true;
  }
  OnStart() {
    return true;
  }
  OnActivate() {
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("Fys")?.Fys?.KIs;
    if (t) {
      for (const e of t) {
        this.LearnPassiveSkill(MathUtils_1.MathUtils.LongToNumber(e.r5n), {
          CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(e.K8n.$8n)
        });
      }
    }
    return true;
  }
  OnClear() {
    for (const t of this.bOr.keys()) {
      this.ForgetPassiveSkill(t);
    }
    return true;
  }
  OnTick(t) {
    this.LockMap.clear();
  }
  GetAllPassiveSkills() {
    return [...this.bOr.values()];
  }
  HasSkill(t) {
    return this.bOr.has(t);
  }
  GetSKill(t) {
    return this.bOr.get(t);
  }
  jxm(t, e, i, s) {
    let r = this.Entity;
    if ((r = e ? i?.[e] ?? s?.[e] : r) && r instanceof Entity_1.Entity) {
      return r;
    }
    CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能Entity非法", ["targetKey", e], ["skillId", t]);
  }
  CheckAddSkillHasAuthority(t) {
    return !!this.wOr.HasBuffAuthority() || t.ActionExecuteFlag === 2;
  }
  CheckSkillHasAuthority(t) {
    return !!this.wOr.HasBuffAuthority() || t.ActionExecuteFlag === 2 && !!this.H1m.IsAutonomousProxy;
  }
  LearnPassiveSkill(s, t) {
    const r = PassiveSkillById_1.configPassiveSkillById.GetConfig(s);
    if (!r) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能配置不存在", ["skillId", s]);
      return false;
    }
    if (this.HasSkill(s) || !this.CheckAddSkillHasAuthority(r)) {
      return false;
    }
    if (r.ActionExecuteFlag === 1) {
      SkillMessageController_1.SkillMessageController.PassiveSkillAddRequest(this.Entity, s, t.PreMessageId);
    } else {
      var e = TriggerType_1.ETriggerEvent[r.TriggerType];
      if (!r.TriggerType || e === undefined) {
        CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能配置错误，缺少触发类型", ["skillId", s]);
        return false;
      }
      if (e === TriggerType_1.ETriggerEvent.GlobalDamageTrigger && !GlobalTriggerWhitelist.includes(s)) {
        CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "禁止白名单之外的被动使用全局伤害监听", ["skillId", s]);
        return false;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 19, "角色添加被动技能", ["owner", this.Entity.Id], ["skillId", s]);
      }
      e = this.xOr.AddTrigger({
        Type: r.TriggerType,
        Preset: r.TriggerPreset,
        Params: r.TriggerParams,
        Formula: r.TriggerFormula
      }, (t, e) => {
        var i = this.jxm(s, r.InstigatorType, t, e);
        if (i && (t = this.jxm(s, r.CDType, t, e)) && this.CheckSkillHasAuthority(r) && !this.BOr?.IsPassiveSkillInCd(s, t.Id)) {
          this.ExecuteAction(s, i, t, e);
        }
      }, () => {
        if (r.CDType === "Owner" && this.BOr?.IsPassiveSkillInCd(s, this.Entity.Id)) {
          return false;
        }
        return this.CheckSkillHasAuthority(r);
      });
      this.bOr.set(s, {
        SkillId: s,
        TriggerHandle: e,
        Actions: this.ParseActions(r, s),
        TargetKey: r.InstigatorType,
        CombatMessageId: t.CombatMessageId
      });
      this.OnPassiveSkillAdded(s, e, r, t);
    }
    return true;
  }
  ForgetPassiveSkill(t, e = false) {
    var i;
    if (PassiveSkillById_1.configPassiveSkillById.GetConfig(t)?.ActionExecuteFlag === 1) {
      SkillMessageController_1.SkillMessageController.PassiveSkillRemoveRequest(this.Entity, t);
    } else if ((i = this.bOr.get(t)) !== undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 19, "角色失去被动技能", ["owner", this.Entity.Id], ["skillId", t]);
      }
      this.xOr.RemoveTrigger(i.TriggerHandle);
      this.bOr.delete(t);
      this.OnPassiveSkillRemoved(t, e);
    }
  }
  SetPassiveSkillActive(t, e) {
    t = this.bOr.get(t);
    if (t !== undefined && t.TriggerHandle && t.TriggerHandle > 0) {
      this.xOr.SetTriggerActive(t.TriggerHandle, e);
    }
  }
  ParseActions(t, e) {
    var i = [];
    var s = this.ParseAction(t, e);
    if (s !== undefined) {
      i.push(s);
    }
    for (const l of t.SubSkillAction) {
      var r = PassiveSkillById_1.configPassiveSkillById.GetConfig(l);
      var r = this.ParseAction(r, e);
      if (r !== undefined) {
        i.push(r);
      }
    }
    return i;
  }
  ParseAction(t, e) {
    var i = ESkillAction[t.SkillAction];
    if (i !== undefined) {
      var s = t.SkillActionParams;
      switch (i) {
        case ESkillAction.AddBullet:
          return {
            Action: i,
            BulletRowNames: s.map(t => t.trim())
          };
        case ESkillAction.RemoveBullet:
          return {
            Action: i,
            BulletRowNames: s.map(t => t.split("#")?.[0]?.trim()),
            SummonChild: s.map(t => t.split("#")?.[1]?.trim() === "1")
          };
        case ESkillAction.AddBuff:
          return {
            Action: i,
            BuffId: s.map(t => Number(t))
          };
        case ESkillAction.RemoveBuff:
          {
            const r = {
              Action: i,
              BuffId: new Array(s.length),
              StackCount: new Array(s.length)
            };
            s.forEach((t, e) => {
              var [t, i] = t.split("#");
              r.BuffId[e] = Number(t);
              r.StackCount[e] = Number(i ?? -1);
            });
            return r;
          }
        case ESkillAction.StartSkill:
          return {
            Action: i,
            SkillId: Number(s[0])
          };
        case ESkillAction.LockOn:
          return {
            Action: i,
            IsHardLock: s[0] === "1",
            LockOnConfigId: Number(s[1] ?? 0),
            SkillTargetPriority: Number(s[2] ?? 8),
            ShowTarget: (s[3] ?? "1") === "1",
            GlobalTarget: s[4] === "1"
          };
        case ESkillAction.Customize:
          (t.ActionScriptParams?.length ? JSON.parse(t.ActionScriptParams) : {}).Owner = this.Entity;
          return {
            Action: i,
            Formula: CharacterPassiveSkillCustomAction_1.CharacterPassiveSkillCustomAction.AddCustomAction(t, this.Entity, this.xOr.TriggerFormulaFunc)
          };
        case ESkillAction.ReduceSkillCd:
          return {
            Action: i,
            SkillId: s.map(t => Number(t.split("#")?.[0]?.trim())),
            CdResetType: s.map(t => Number(t.split("#")?.[1]?.trim())),
            DecreaseRatio: s.map(t => Number(t.split("#")?.[2]?.trim())),
            DecreaseMagnitude: s.map(t => Number(t.split("#")?.[3]?.trim()))
          };
        default:
          return;
      }
    }
  }
  ExecuteAction(t, e, i, s) {
    if (this.LockMap.has(t)) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能在同一次调用栈中重复触发，需要检查技能配置", ["skillId", t], ["desc", PassiveSkillById_1.configPassiveSkillById.GetConfig(t)?.SkillDesc ?? ""], ["current executing skill ids", [...this.LockMap]]);
    } else {
      var r = this.bOr.get(t);
      if (r !== undefined) {
        this.BOr?.StartPassiveCd(t, i.Id);
        this.LockMap.add(t);
        for (const P of r.Actions) {
          switch (P.Action) {
            case ESkillAction.AddBullet:
              var l = e?.GetComponent(1)?.ActorTransform;
              if (l) {
                for (const b of P.BulletRowNames) {
                  BulletController_1.BulletController.CreateBulletCustomTarget(this.Entity, b, l, {}, r.CombatMessageId);
                }
              } else {
                CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能目标没有ActorTransform", ["skillId", t], ["targetEntity", e?.Id]);
              }
              break;
            case ESkillAction.RemoveBullet:
              var o = ModelManager_1.ModelManager.BulletModel?.GetBulletSetByAttacker(this.Entity.Id);
              if (o !== undefined) {
                var a;
                var n;
                var c = new Array();
                var h = P.BulletRowNames;
                var k = P.SummonChild;
                for (const y of o) {
                  var u = y.GetBulletInfo();
                  var v = h.indexOf(u.BulletRowName);
                  if (v >= 0) {
                    v = k[v];
                    c.push([u.BulletEntityId, v ?? false]);
                  }
                }
                for ([a, n] of c) {
                  BulletController_1.BulletController.DestroyBullet(a, n, 3);
                }
              }
              break;
            case ESkillAction.AddBuff:
              var S = e.GetComponent(185);
              var d = `被动技能${t}添加`;
              for (const M of P.BuffId) {
                S?.AddBuff(M, {
                  InstigatorId: this.wOr.CreatureDataId,
                  PreMessageId: r.CombatMessageId,
                  Reason: d
                });
              }
              break;
            case ESkillAction.RemoveBuff:
              var C = e.GetComponent(185);
              var f = `被动技能${t}移除`;
              for (let t = 0; t < P.BuffId.length; t++) {
                var g = P.StackCount[t] ?? -1;
                C?.RemoveBuff(P.BuffId[t], g, f);
              }
              break;
            case ESkillAction.StartSkill:
              o = e.CheckGetComponent(43);
              if (o) {
                o.BeginSkillAsync(P.SkillId, {
                  ContextId: r.CombatMessageId,
                  Reason: "PassiveSkillComponent.ExecuteAction"
                });
              }
              break;
            case ESkillAction.LockOn:
              var m = e.CheckGetComponent(34);
              var _ = e.CheckGetComponent(43);
              if (P.IsHardLock) {
                m?.EnterLockDirection();
              } else {
                _?.LockOnTargetAndSetShow({
                  LockOnConfigId: P.LockOnConfigId,
                  SkillTargetPriority: P.SkillTargetPriority,
                  ShowTarget: P.ShowTarget,
                  GlobalTarget: P.GlobalTarget
                });
              }
              break;
            case ESkillAction.Customize:
              this.nx.SkillId = t;
              P.Formula?.Evaluate(s, this.nx);
              break;
            case ESkillAction.ReduceSkillCd:
              var A = e.CheckGetComponent(220);
              if (A) {
                for (let t = 0; t < P.SkillId.length; t++) {
                  switch (P.CdResetType[t]) {
                    case 0:
                      A.ModifyCdTime([P.SkillId[t]], -P.DecreaseMagnitude[t], -P.DecreaseRatio[t]);
                      break;
                    case 1:
                      A.ModifyCdTimeBySkillGenres([P.SkillId[t]], -P.DecreaseMagnitude[t], -P.DecreaseRatio[t]);
                  }
                }
              }
          }
        }
        this.LockMap.delete(t);
      }
    }
  }
  OnPassiveSkillAdded(t, e, i, s = undefined) {
    this.xOr.GetTrigger(e);
    this.BOr?.InitPassiveSkill(i);
    if (s && s.NeedBroadcast) {
      s = s.PreMessageId;
      s = SkillMessageController_1.SkillMessageController.PassiveSkillAddRequest(this.Entity, t, s);
      this.bOr.get(t).CombatMessageId = s;
    }
    if (i.IsDefaultActivated) {
      this.xOr.SetTriggerActive(e, true);
    }
  }
  OnPassiveSkillRemoved(t, e) {
    if (e) {
      SkillMessageController_1.SkillMessageController.PassiveSkillRemoveRequest(this.Entity, t);
    }
  }
  static PassiveSkillAddNotify(t, e) {
    var i = t?.GetComponent(26);
    for (const s of e.KIs) {
      i?.LearnPassiveSkill(MathUtils_1.MathUtils.LongToNumber(s.r5n), {
        CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(s.K8n.$8n)
      });
    }
  }
  static PassiveSkillRemoveNotify(t, e) {
    var i = t?.GetComponent(26);
    for (const s of e._As) {
      i?.ForgetPassiveSkill(MathUtils_1.MathUtils.LongToNumber(s));
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("T3n", false)], CharacterPassiveSkillComponent, "PassiveSkillAddNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("L3n", false)], CharacterPassiveSkillComponent, "PassiveSkillRemoveNotify", null);
CharacterPassiveSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(26)], CharacterPassiveSkillComponent);
exports.CharacterPassiveSkillComponent = CharacterPassiveSkillComponent; //# sourceMappingURL=CharacterPassiveSkillComponent.js.map