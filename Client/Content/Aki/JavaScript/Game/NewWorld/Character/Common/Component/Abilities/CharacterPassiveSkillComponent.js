"use strict";

var ESkillAction;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var r;
  var o = arguments.length;
  var l = o < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(t, i, e, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        l = (o < 3 ? r(l) : o > 3 ? r(i, e, l) : r(i, e)) || l;
      }
    }
  }
  if (o > 3 && l) {
    Object.defineProperty(i, e, l);
  }
  return l;
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
    this.wOr = this.Entity.CheckGetComponent(183);
    this.BOr = this.Entity.GetComponent(217);
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
      for (const i of t) {
        this.LearnPassiveSkill(MathUtils_1.MathUtils.LongToNumber(i.r5n), {
          CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(i.K8n.$8n)
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
  gxm(t, i, e, s) {
    let r = this.Entity;
    if ((r = i ? e?.[i] ?? s?.[i] : r) && r instanceof Entity_1.Entity) {
      return r;
    }
    CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能Entity非法", ["targetKey", i], ["skillId", t]);
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
      var i = TriggerType_1.ETriggerEvent[r.TriggerType];
      if (!r.TriggerType || i === undefined) {
        CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能配置错误，缺少触发类型", ["skillId", s]);
        return false;
      }
      if (i === TriggerType_1.ETriggerEvent.GlobalDamageTrigger && !GlobalTriggerWhitelist.includes(s)) {
        CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "禁止白名单之外的被动使用全局伤害监听", ["skillId", s]);
        return false;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 19, "角色添加被动技能", ["owner", this.Entity.Id], ["skillId", s]);
      }
      i = this.xOr.AddTrigger({
        Type: r.TriggerType,
        Preset: r.TriggerPreset,
        Params: r.TriggerParams,
        Formula: r.TriggerFormula
      }, (t, i) => {
        var e = this.gxm(s, r.InstigatorType, t, i);
        if (e && (t = this.gxm(s, r.CDType, t, i)) && this.CheckSkillHasAuthority(r) && !this.BOr?.IsPassiveSkillInCd(s, t.Id)) {
          this.ExecuteAction(s, e, t, i);
        }
      }, () => {
        if (r.CDType === "Owner" && this.BOr?.IsPassiveSkillInCd(s, this.Entity.Id)) {
          return false;
        }
        return this.CheckSkillHasAuthority(r);
      });
      this.bOr.set(s, {
        SkillId: s,
        TriggerHandle: i,
        Actions: this.ParseActions(r, s),
        TargetKey: r.InstigatorType,
        CombatMessageId: t.CombatMessageId
      });
      this.OnPassiveSkillAdded(s, i, r, t);
    }
    return true;
  }
  ForgetPassiveSkill(t, i = false) {
    var e;
    if (PassiveSkillById_1.configPassiveSkillById.GetConfig(t)?.ActionExecuteFlag === 1) {
      SkillMessageController_1.SkillMessageController.PassiveSkillRemoveRequest(this.Entity, t);
    } else if ((e = this.bOr.get(t)) !== undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 19, "角色失去被动技能", ["owner", this.Entity.Id], ["skillId", t]);
      }
      this.xOr.RemoveTrigger(e.TriggerHandle);
      this.bOr.delete(t);
      this.OnPassiveSkillRemoved(t, i);
    }
  }
  SetPassiveSkillActive(t, i) {
    t = this.bOr.get(t);
    if (t !== undefined && t.TriggerHandle && t.TriggerHandle > 0) {
      this.xOr.SetTriggerActive(t.TriggerHandle, i);
    }
  }
  ParseActions(t, i) {
    var e = [];
    var s = this.ParseAction(t, i);
    if (s !== undefined) {
      e.push(s);
    }
    for (const o of t.SubSkillAction) {
      var r = PassiveSkillById_1.configPassiveSkillById.GetConfig(o);
      var r = this.ParseAction(r, i);
      if (r !== undefined) {
        e.push(r);
      }
    }
    return e;
  }
  ParseAction(t, i) {
    var e = ESkillAction[t.SkillAction];
    if (e !== undefined) {
      var s = t.SkillActionParams;
      switch (e) {
        case ESkillAction.AddBullet:
          return {
            Action: e,
            BulletRowNames: s.map(t => t.trim())
          };
        case ESkillAction.RemoveBullet:
          return {
            Action: e,
            BulletRowNames: s.map(t => t.split("#")?.[0]?.trim()),
            SummonChild: s.map(t => t.split("#")?.[1]?.trim() === "1")
          };
        case ESkillAction.AddBuff:
          return {
            Action: e,
            BuffId: s.map(t => Number(t))
          };
        case ESkillAction.RemoveBuff:
          {
            const r = {
              Action: e,
              BuffId: new Array(s.length),
              StackCount: new Array(s.length)
            };
            s.forEach((t, i) => {
              var [t, e] = t.split("#");
              r.BuffId[i] = Number(t);
              r.StackCount[i] = Number(e ?? -1);
            });
            return r;
          }
        case ESkillAction.StartSkill:
          return {
            Action: e,
            SkillId: Number(s[0])
          };
        case ESkillAction.LockOn:
          return {
            Action: e,
            IsHardLock: s[0] === "1",
            LockOnConfigId: Number(s[1] ?? 0),
            SkillTargetPriority: Number(s[2] ?? 8),
            ShowTarget: (s[3] ?? "1") === "1",
            GlobalTarget: s[4] === "1"
          };
        case ESkillAction.Customize:
          (t.ActionScriptParams?.length ? JSON.parse(t.ActionScriptParams) : {}).Owner = this.Entity;
          return {
            Action: e,
            Formula: CharacterPassiveSkillCustomAction_1.CharacterPassiveSkillCustomAction.AddCustomAction(t, this.Entity, this.xOr.TriggerFormulaFunc)
          };
        default:
          return;
      }
    }
  }
  ExecuteAction(t, i, e, s) {
    if (this.LockMap.has(t)) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能在同一次调用栈中重复触发，需要检查技能配置", ["skillId", t], ["desc", PassiveSkillById_1.configPassiveSkillById.GetConfig(t)?.SkillDesc ?? ""], ["current executing skill ids", [...this.LockMap]]);
    } else {
      var r = this.bOr.get(t);
      if (r !== undefined) {
        this.BOr?.StartPassiveCd(t, e.Id);
        this.LockMap.add(t);
        for (const A of r.Actions) {
          switch (A.Action) {
            case ESkillAction.AddBullet:
              var o = i?.GetComponent(1)?.ActorTransform;
              if (o) {
                for (const P of A.BulletRowNames) {
                  BulletController_1.BulletController.CreateBulletCustomTarget(this.Entity, P, o, {}, r.CombatMessageId);
                }
              } else {
                CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能目标没有ActorTransform", ["skillId", t], ["targetEntity", i?.Id]);
              }
              break;
            case ESkillAction.RemoveBullet:
              var l = ModelManager_1.ModelManager.BulletModel?.GetBulletSetByAttacker(this.Entity.Id);
              if (l !== undefined) {
                var a;
                var n;
                var h = new Array();
                var c = A.BulletRowNames;
                var k = A.SummonChild;
                for (const y of l) {
                  var u = y.GetBulletInfo();
                  var v = c.indexOf(u.BulletRowName);
                  if (v >= 0) {
                    v = k[v];
                    h.push([u.BulletEntityId, v ?? false]);
                  }
                }
                for ([a, n] of h) {
                  BulletController_1.BulletController.DestroyBullet(a, n, 3);
                }
              }
              break;
            case ESkillAction.AddBuff:
              var S = i.GetComponent(183);
              var d = `被动技能${t}添加`;
              for (const b of A.BuffId) {
                S?.AddBuff(b, {
                  InstigatorId: this.wOr.CreatureDataId,
                  PreMessageId: r.CombatMessageId,
                  Reason: d
                });
              }
              break;
            case ESkillAction.RemoveBuff:
              var C = i.GetComponent(183);
              var g = `被动技能${t}移除`;
              for (let t = 0; t < A.BuffId.length; t++) {
                var f = A.StackCount[t] ?? -1;
                C?.RemoveBuff(A.BuffId[t], f, g);
              }
              break;
            case ESkillAction.StartSkill:
              l = i.CheckGetComponent(41);
              if (l) {
                l.BeginSkillAsync(A.SkillId, {
                  ContextId: r.CombatMessageId,
                  Reason: "PassiveSkillComponent.ExecuteAction"
                });
              }
              break;
            case ESkillAction.LockOn:
              var _ = i.CheckGetComponent(33);
              var m = i.CheckGetComponent(41);
              if (A.IsHardLock) {
                _?.EnterLockDirection();
              } else {
                m?.LockOnTargetAndSetShow({
                  LockOnConfigId: A.LockOnConfigId,
                  SkillTargetPriority: A.SkillTargetPriority,
                  ShowTarget: A.ShowTarget,
                  GlobalTarget: A.GlobalTarget
                });
              }
              break;
            case ESkillAction.Customize:
              this.nx.SkillId = t;
              A.Formula?.Evaluate(s, this.nx);
          }
        }
        this.LockMap.delete(t);
      }
    }
  }
  OnPassiveSkillAdded(t, i, e, s = undefined) {
    this.xOr.GetTrigger(i);
    this.BOr?.InitPassiveSkill(e);
    if (s && s.NeedBroadcast) {
      s = s.PreMessageId;
      s = SkillMessageController_1.SkillMessageController.PassiveSkillAddRequest(this.Entity, t, s);
      this.bOr.get(t).CombatMessageId = s;
    }
    if (e.IsDefaultActivated) {
      this.xOr.SetTriggerActive(i, true);
    }
  }
  OnPassiveSkillRemoved(t, i) {
    if (i) {
      SkillMessageController_1.SkillMessageController.PassiveSkillRemoveRequest(this.Entity, t);
    }
  }
  static PassiveSkillAddNotify(t, i) {
    var e = t?.GetComponent(26);
    for (const s of i.KIs) {
      e?.LearnPassiveSkill(MathUtils_1.MathUtils.LongToNumber(s.r5n), {
        CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(s.K8n.$8n)
      });
    }
  }
  static PassiveSkillRemoveNotify(t, i) {
    var e = t?.GetComponent(26);
    for (const s of i._As) {
      e?.ForgetPassiveSkill(MathUtils_1.MathUtils.LongToNumber(s));
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("T3n", false)], CharacterPassiveSkillComponent, "PassiveSkillAddNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("L3n", false)], CharacterPassiveSkillComponent, "PassiveSkillRemoveNotify", null);
CharacterPassiveSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(26)], CharacterPassiveSkillComponent);
exports.CharacterPassiveSkillComponent = CharacterPassiveSkillComponent; //# sourceMappingURL=CharacterPassiveSkillComponent.js.map