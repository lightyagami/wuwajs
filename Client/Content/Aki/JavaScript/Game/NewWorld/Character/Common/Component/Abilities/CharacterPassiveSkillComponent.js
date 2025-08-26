"use strict";

var ESkillAction;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var l = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        l = (r < 3 ? o(l) : r > 3 ? o(e, i, l) : o(e, i)) || l;
      }
    }
  }
  if (r > 3 && l) {
    Object.defineProperty(e, i, l);
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
    this.bOr = new Map();
    this.nx = undefined;
    this.LockMap = new Set();
  }
  OnInit() {
    this.xOr = this.Entity.CheckGetComponent(28);
    this.wOr = this.Entity.CheckGetComponent(175);
    this.BOr = this.Entity.GetComponent(207);
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
    var t = this.Entity.GetComponent(0).ComponentDataMap;
    if (this.wOr.HasBuffAuthority()) {
      t = t.get("Fys")?.Fys?.KIs;
      if (t) {
        for (const e of t) {
          this.LearnPassiveSkill(MathUtils_1.MathUtils.LongToNumber(e.r5n), {
            CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(e.K8n.$8n)
          });
        }
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
  LearnPassiveSkill(o, t) {
    if (this.HasSkill(o) || !this.wOr.HasBuffAuthority()) {
      return false;
    }
    const r = PassiveSkillById_1.configPassiveSkillById.GetConfig(o);
    if (!r) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能配置不存在", ["skillId", o]);
      return false;
    }
    var e = TriggerType_1.ETriggerEvent[r.TriggerType];
    if (!r.TriggerType || e === undefined) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能配置错误，缺少触发类型", ["skillId", o]);
      return false;
    }
    if (e === TriggerType_1.ETriggerEvent.GlobalDamageTrigger && !GlobalTriggerWhitelist.includes(o)) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "禁止白名单之外的被动使用全局伤害监听", ["skillId", o]);
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 19, "角色添加被动技能", ["owner", this.Entity.Id], ["skillId", o]);
    }
    e = this.xOr.AddTrigger({
      Type: r.TriggerType,
      Preset: r.TriggerPreset,
      Params: r.TriggerParams,
      Formula: r.TriggerFormula
    }, (t, e) => {
      let i = this.Entity;
      var s = r.InstigatorType;
      if ((i = s ? t?.[s] ?? e?.[s] : i) && i instanceof Entity_1.Entity) {
        this.ExecuteAction(o, i, e);
      } else {
        CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能目标非法", ["targetKey", s], ["skillId", o]);
      }
    }, () => {
      var t = this.BOr?.IsPassiveSkillInCd(o);
      return !t;
    });
    this.bOr.set(o, {
      SkillId: o,
      TriggerHandle: e,
      Actions: this.ParseActions(r, o),
      TargetKey: r.InstigatorType,
      CombatMessageId: t.CombatMessageId
    });
    this.OnPassiveSkillAdded(o, e, r, t);
    return true;
  }
  ForgetPassiveSkill(t, e = false) {
    var i = this.bOr.get(t);
    if (i !== undefined) {
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
    for (const r of t.SubSkillAction) {
      var o = PassiveSkillById_1.configPassiveSkillById.GetConfig(r);
      var o = this.ParseAction(o, e);
      if (o !== undefined) {
        i.push(o);
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
            const o = {
              Action: i,
              BuffId: new Array(s.length),
              StackCount: new Array(s.length)
            };
            s.forEach((t, e) => {
              var [t, i] = t.split("#");
              o.BuffId[e] = Number(t);
              o.StackCount[e] = Number(i ?? -1);
            });
            return o;
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
        default:
          return;
      }
    }
  }
  ExecuteAction(t, e, i) {
    if (this.wOr.HasBuffAuthority() && !this.BOr?.IsPassiveSkillInCd(t)) {
      if (this.LockMap.has(t)) {
        CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能在同一次调用栈中重复触发，需要检查技能配置", ["skillId", t], ["desc", PassiveSkillById_1.configPassiveSkillById.GetConfig(t)?.SkillDesc ?? ""], ["current executing skill ids", [...this.LockMap]]);
      } else {
        var s = this.bOr.get(t);
        if (s !== undefined) {
          this.BOr?.StartPassiveCd(t);
          this.LockMap.add(t);
          for (const _ of s.Actions) {
            switch (_.Action) {
              case ESkillAction.AddBullet:
                var o = e?.GetComponent(1)?.ActorTransform;
                if (o) {
                  for (const P of _.BulletRowNames) {
                    BulletController_1.BulletController.CreateBulletCustomTarget(this.Entity, P, o, {}, s.CombatMessageId);
                  }
                } else {
                  CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能目标没有ActorTransform", ["skillId", t], ["targetEntity", e?.Id]);
                }
                break;
              case ESkillAction.RemoveBullet:
                var r = ModelManager_1.ModelManager.BulletModel?.GetBulletSetByAttacker(this.Entity.Id);
                if (r !== undefined) {
                  var l;
                  var a;
                  var n = new Array();
                  var c = _.BulletRowNames;
                  var h = _.SummonChild;
                  for (const A of r) {
                    var k = A.GetBulletInfo();
                    var u = c.indexOf(k.BulletRowName);
                    if (u >= 0) {
                      u = h[u];
                      n.push([k.BulletEntityId, u ?? false]);
                    }
                  }
                  for ([l, a] of n) {
                    BulletController_1.BulletController.DestroyBullet(l, a, 3);
                  }
                }
                break;
              case ESkillAction.AddBuff:
                var v = e.GetComponent(175);
                var S = `被动技能${t}添加`;
                for (const b of _.BuffId) {
                  v.AddBuff(b, {
                    InstigatorId: this.wOr.CreatureDataId,
                    PreMessageId: s.CombatMessageId,
                    Reason: S
                  });
                }
                break;
              case ESkillAction.RemoveBuff:
                var d = e.GetComponent(175);
                var C = `被动技能${t}移除`;
                for (let t = 0; t < _.BuffId.length; t++) {
                  var f = _.StackCount[t] ?? -1;
                  d.RemoveBuff(_.BuffId[t], f, C);
                }
                break;
              case ESkillAction.StartSkill:
                r = e.CheckGetComponent(40);
                if (r) {
                  r.BeginSkillAsync(_.SkillId, {
                    ContextId: s.CombatMessageId,
                    Reason: "PassiveSkillComponent.ExecuteAction"
                  });
                }
                break;
              case ESkillAction.LockOn:
                var g = e.CheckGetComponent(32);
                var m = e.CheckGetComponent(40);
                if (_.IsHardLock) {
                  g?.EnterLockDirection();
                } else {
                  m?.LockOnTargetAndSetShow({
                    LockOnConfigId: _.LockOnConfigId,
                    SkillTargetPriority: _.SkillTargetPriority,
                    ShowTarget: _.ShowTarget,
                    GlobalTarget: _.GlobalTarget
                  });
                }
                break;
              case ESkillAction.Customize:
                this.nx.SkillId = t;
                _.Formula?.Evaluate(i, this.nx);
            }
          }
          this.LockMap.delete(t);
        }
      }
    }
  }
  OnPassiveSkillAdded(t, e, i, s = undefined) {
    this.xOr.GetTrigger(e);
    this.BOr?.InitPassiveSkill(i);
    if (s && s.NeedBroadcast) {
      s = s.Buff?.MessageId;
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