"use strict";
var ESkillAction, __decorate = this && this.__decorate || function(t, e, i, s) {
  var o, r = arguments.length,
    l = r < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(t, e, i, s);
  else
    for (var a = t.length - 1; 0 <= a; a--)(o = t[a]) && (l = (r < 3 ? o(l) : 3 < r ? o(e, i, l) : o(e, i)) || l);
  return 3 < r && l && Object.defineProperty(e, i, l), l
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterPassiveSkillComponent = exports.ESkillAction = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  PassiveSkillById_1 = require("../../../../../../Core/Define/ConfigQuery/PassiveSkillById"),
  Entity_1 = require("../../../../../../Core/Entity/Entity"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  BulletController_1 = require("../../../../Bullet/BulletController"),
  CharacterPassiveSkillCustomAction_1 = require("./CharacterPassiveSkillCustomAction"),
  TriggerType_1 = require("./Trigger/TriggerType"),
  GlobalTriggerWhitelist = (! function(t) {
    t[t.AddBullet = 1] = "AddBullet", t[t.RemoveBullet = 2] = "RemoveBullet", t[t.AddBuff = 3] = "AddBuff", t[t.RemoveBuff = 4] = "RemoveBuff", t[t.StartSkill = 5] = "StartSkill", t[t.LockOn = 6] = "LockOn", t[t.Customize = 7] = "Customize"
  }(ESkillAction = exports.ESkillAction || (exports.ESkillAction = {})), [1302101064]);
let CharacterPassiveSkillComponent = class CharacterPassiveSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.xOr = void 0, this.wOr = void 0, this.BOr = void 0, this.bOr = new Map, this.nx = void 0, this.LockMap = new Set
  }
  OnInit() {
    return this.xOr = this.Entity.CheckGetComponent(28), this.wOr = this.Entity.CheckGetComponent(174), this.BOr = this.Entity.GetComponent(206), this.nx = {
      SkillId: 0,
      Owner: this.Entity,
      BuffComp: this.wOr,
      PassiveSkillComp: this
    }, !0
  }
  OnStart() {
    return !0
  }
  OnActivate() {
    var t = this.Entity.GetComponent(0).ComponentDataMap;
    if (this.wOr.HasBuffAuthority()) {
      t = t.get("Fys")?.Fys?.KIs;
      if (t)
        for (const e of t) this.LearnPassiveSkill(MathUtils_1.MathUtils.LongToNumber(e.r5n), {
          CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(e.K8n.$8n)
        })
    }
    return !0
  }
  OnClear() {
    for (const t of this.bOr.keys()) this.ForgetPassiveSkill(t);
    return !0
  }
  OnTick(t) {
    this.LockMap.clear()
  }
  GetAllPassiveSkills() {
    return [...this.bOr.values()]
  }
  HasSkill(t) {
    return this.bOr.has(t)
  }
  GetSKill(t) {
    return this.bOr.get(t)
  }
  LearnPassiveSkill(o, t) {
    if (this.HasSkill(o) || !this.wOr.HasBuffAuthority()) return !1;
    const r = PassiveSkillById_1.configPassiveSkillById.GetConfig(o);
    if (!r) return CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能配置不存在", ["skillId", o]), !1;
    var e = TriggerType_1.ETriggerEvent[r.TriggerType];
    if (!r.TriggerType || void 0 === e) return CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能配置错误，缺少触发类型", ["skillId", o]), !1;
    if (e === TriggerType_1.ETriggerEvent.GlobalDamageTrigger && !GlobalTriggerWhitelist.includes(o)) return CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "禁止白名单之外的被动使用全局伤害监听", ["skillId", o]), !1;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 19, "角色添加被动技能", ["owner", this.Entity.Id], ["skillId", o]);
    e = this.xOr.AddTrigger({
      Type: r.TriggerType,
      Preset: r.TriggerPreset,
      Params: r.TriggerParams,
      Formula: r.TriggerFormula
    }, (t, e) => {
      let i = this.Entity;
      var s = r.InstigatorType;
      (i = s ? t?.[s] ?? e?.[s] : i) && i instanceof Entity_1.Entity ? this.ExecuteAction(o, i, e) : CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能目标非法", ["targetKey", s], ["skillId", o])
    }, () => {
      var t = this.BOr?.IsPassiveSkillInCd(o);
      return !t
    });
    return this.bOr.set(o, {
      SkillId: o,
      TriggerHandle: e,
      Actions: this.ParseActions(r, o),
      TargetKey: r.InstigatorType,
      CombatMessageId: t.CombatMessageId
    }), this.OnPassiveSkillAdded(o, e, r, t), !0
  }
  ForgetPassiveSkill(t, e = !1) {
    var i = this.bOr.get(t);
    void 0 !== i && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 19, "角色失去被动技能", ["owner", this.Entity.Id], ["skillId", t]), this.xOr.RemoveTrigger(i.TriggerHandle), this.bOr.delete(t), this.OnPassiveSkillRemoved(t, e))
  }
  SetPassiveSkillActive(t, e) {
    t = this.bOr.get(t);
    void 0 !== t && t.TriggerHandle && 0 < t.TriggerHandle && this.xOr.SetTriggerActive(t.TriggerHandle, e)
  }
  ParseActions(t, e) {
    var i = [],
      s = this.ParseAction(t, e);
    void 0 !== s && i.push(s);
    for (const r of t.SubSkillAction) {
      var o = PassiveSkillById_1.configPassiveSkillById.GetConfig(r),
        o = this.ParseAction(o, e);
      void 0 !== o && i.push(o)
    }
    return i
  }
  ParseAction(t, e) {
    var i = ESkillAction[t.SkillAction];
    if (void 0 !== i) {
      var s = t.SkillActionParams;
      switch (i) {
        case ESkillAction.AddBullet:
          return {
            Action: i, BulletRowNames: s.map(t => t.trim())
          };
        case ESkillAction.RemoveBullet:
          return {
            Action: i, BulletRowNames: s.map(t => t.split("#")?.[0]?.trim()), SummonChild: s.map(t => "1" === t.split("#")?.[1]?.trim())
          };
        case ESkillAction.AddBuff:
          return {
            Action: i, BuffId: s.map(t => Number(t))
          };
        case ESkillAction.RemoveBuff: {
          const o = {
            Action: i,
            BuffId: new Array(s.length),
            StackCount: new Array(s.length)
          };
          return s.forEach((t, e) => {
            var [t, i] = t.split("#");
            o.BuffId[e] = Number(t), o.StackCount[e] = Number(i ?? -1)
          }), o
        }
        case ESkillAction.StartSkill:
          return {
            Action: i, SkillId: Number(s[0])
          };
        case ESkillAction.LockOn:
          return {
            Action: i, IsHardLock: "1" === s[0], LockOnConfigId: Number(s[1] ?? 0), SkillTargetPriority: Number(s[2] ?? 8), ShowTarget: "1" === (s[3] ?? "1"), GlobalTarget: "1" === s[4]
          };
        case ESkillAction.Customize:
          return (t.ActionScriptParams?.length ? JSON.parse(t.ActionScriptParams) : {}).Owner = this.Entity, {
            Action: i,
            Formula: CharacterPassiveSkillCustomAction_1.CharacterPassiveSkillCustomAction.AddCustomAction(t, this.Entity, this.xOr.TriggerFormulaFunc)
          };
        default:
          return
      }
    }
  }
  ExecuteAction(t, e, i) {
    if (this.wOr.HasBuffAuthority() && !this.BOr?.IsPassiveSkillInCd(t))
      if (this.LockMap.has(t)) CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能在同一次调用栈中重复触发，需要检查技能配置", ["skillId", t], ["desc", PassiveSkillById_1.configPassiveSkillById.GetConfig(t)?.SkillDesc ?? ""], ["current executing skill ids", [...this.LockMap]]);
      else {
        var s = this.bOr.get(t);
        if (void 0 !== s) {
          this.BOr?.StartPassiveCd(t), this.LockMap.add(t);
          for (const _ of s.Actions) switch (_.Action) {
            case ESkillAction.AddBullet:
              var o = (e?.GetComponent(1))?.ActorTransform;
              if (o)
                for (const P of _.BulletRowNames) BulletController_1.BulletController.CreateBulletCustomTarget(this.Entity, P, o, {}, s.CombatMessageId);
              else CombatLog_1.CombatLog.Error("PassiveSkill", this.Entity, "被动技能目标没有ActorTransform", ["skillId", t], ["targetEntity", e?.Id]);
              break;
            case ESkillAction.RemoveBullet:
              var r = ModelManager_1.ModelManager.BulletModel?.GetBulletSetByAttacker(this.Entity.Id);
              if (void 0 !== r) {
                var l, a, n = new Array,
                  c = _.BulletRowNames,
                  h = _.SummonChild;
                for (const A of r) {
                  var k = A.GetBulletInfo(),
                    u = c.indexOf(k.BulletRowName);
                  0 <= u && (u = h[u], n.push([k.BulletEntityId, u ?? !1]))
                }
                for ([l, a] of n) BulletController_1.BulletController.DestroyBullet(l, a, 3)
              }
              break;
            case ESkillAction.AddBuff:
              var v = e.GetComponent(174),
                S = `被动技能${t}添加`;
              for (const b of _.BuffId) v.AddBuff(b, {
                InstigatorId: this.wOr.CreatureDataId,
                PreMessageId: s.CombatMessageId,
                Reason: S
              });
              break;
            case ESkillAction.RemoveBuff:
              var d = e.GetComponent(174),
                C = `被动技能${t}移除`;
              for (let t = 0; t < _.BuffId.length; t++) {
                var f = _.StackCount[t] ?? -1;
                d.RemoveBuff(_.BuffId[t], f, C)
              }
              break;
            case ESkillAction.StartSkill:
              r = e.CheckGetComponent(40);
              r && r.BeginSkillAsync(_.SkillId, {
                ContextId: s.CombatMessageId,
                Reason: "PassiveSkillComponent.ExecuteAction"
              });
              break;
            case ESkillAction.LockOn:
              var g = e.CheckGetComponent(32),
                m = e.CheckGetComponent(40);
              _.IsHardLock ? g?.EnterLockDirection() : m?.LockOnTargetAndSetShow({
                LockOnConfigId: _.LockOnConfigId,
                SkillTargetPriority: _.SkillTargetPriority,
                ShowTarget: _.ShowTarget,
                GlobalTarget: _.GlobalTarget
              });
              break;
            case ESkillAction.Customize:
              this.nx.SkillId = t, _.Formula?.Evaluate(i, this.nx)
          }
          this.LockMap.delete(t)
        }
      }
  }
  OnPassiveSkillAdded(t, e, i, s = void 0) {
    this.xOr.GetTrigger(e);
    this.BOr?.InitPassiveSkill(i), s && s.NeedBroadcast && (s = s.Buff?.MessageId, s = SkillMessageController_1.SkillMessageController.PassiveSkillAddRequest(this.Entity, t, s), this.bOr.get(t).CombatMessageId = s), i.IsDefaultActivated && this.xOr.SetTriggerActive(e, !0)
  }
  OnPassiveSkillRemoved(t, e) {
    e && SkillMessageController_1.SkillMessageController.PassiveSkillRemoveRequest(this.Entity, t)
  }
  static PassiveSkillAddNotify(t, e) {
    var i = t?.GetComponent(26);
    for (const s of e.KIs) i?.LearnPassiveSkill(MathUtils_1.MathUtils.LongToNumber(s.r5n), {
      CombatMessageId: MathUtils_1.MathUtils.LongToBigInt(s.K8n.$8n)
    })
  }
  static PassiveSkillRemoveNotify(t, e) {
    var i = t?.GetComponent(26);
    for (const s of e._As) i?.ForgetPassiveSkill(MathUtils_1.MathUtils.LongToNumber(s))
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("T3n", !1)], CharacterPassiveSkillComponent, "PassiveSkillAddNotify", null), __decorate([CombatMessage_1.CombatNet.Listen("L3n", !1)], CharacterPassiveSkillComponent, "PassiveSkillRemoveNotify", null), CharacterPassiveSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(26)], CharacterPassiveSkillComponent), exports.CharacterPassiveSkillComponent = CharacterPassiveSkillComponent;
//# sourceMappingURL=CharacterPassiveSkillComponent.js.map