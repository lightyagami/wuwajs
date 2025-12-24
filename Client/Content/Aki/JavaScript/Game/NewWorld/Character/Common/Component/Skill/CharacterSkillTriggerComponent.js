"use strict";

var __decorate = this && this.__decorate || function (t, e, r, i) {
  var o;
  var n = arguments.length;
  var s = n < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, r, i);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (o = t[l]) {
        s = (n < 3 ? o(s) : n > 3 ? o(e, r, s) : o(e, r)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSkillTriggerComponent = undefined;
const Entity_1 = require("../../../../../../Core/Entity/Entity");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const TriggerType_1 = require("../Abilities/Trigger/TriggerType");
let CharacterSkillTriggerComponent = class CharacterSkillTriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.cBe = undefined;
    this.dHs = undefined;
  }
  OnInit() {
    this.cBe = this.Entity.CheckGetComponent(40);
    this.dHs = this.Entity.CheckGetComponent(28);
    return true;
  }
  OnStart() {
    return true;
  }
  OnActivate() {
    for (const e of this.cBe.GetAllSkillId()) {
      var t = this.cBe.GetSkillInfo(e);
      this.pVs(e, t);
    }
    return true;
  }
  OnEnd() {
    return true;
  }
  pVs(o, e) {
    if (e) {
      for (let t = 0; t < e.SkillTriggers.Num(); t++) {
        const n = e.SkillTriggers.Get(t);
        if (n.TriggerType in TriggerType_1.ETriggerEvent) {
          var r;
          var i = [];
          if (n.TriggerPreset) {
            for (let t = 0; t < n.TriggerPreset.Num(); t++) {
              i.push(n.TriggerPreset.Get(t));
            }
          }
          if (TriggerType_1.ETriggerEvent[n.TriggerType] === TriggerType_1.ETriggerEvent.GlobalDamageTrigger) {
            CombatLog_1.CombatLog.Error("Skill", this.Entity, "禁止白名单之外的技能使用全局伤害监听", ["skillId", o]);
          } else {
            r = this.dHs.AddTrigger({
              Type: n.TriggerType,
              Preset: i,
              Params: n.TriggerParams || "{}",
              Formula: n.TriggerFormula || "TRUE"
            }, (t, e) => {
              var r = n.TriggerTarget;
              var r = r ? e?.[r] : undefined;
              var i = n.TriggerTargetSocket;
              var e = i ? e?.[i] : undefined;
              if (r === undefined || r instanceof Entity_1.Entity) {
                this.cBe.BeginSkill(o, {
                  Reason: "技能触发器触发",
                  Target: r,
                  SocketName: e
                });
              } else {
                CombatLog_1.CombatLog.Error("Skill", this.Entity, "技能触发器配的技能目标不正确或不存在");
              }
            });
            this.dHs.SetTriggerActive(r, true);
          }
        } else {
          CombatLog_1.CombatLog.Error("Skill", this.Entity, "技能触发器类型不合法", ["技能Id", o], ["触发器类型", n.TriggerType]);
        }
      }
    }
  }
  AddSkillTriggerDebug(t, e) {
    this.pVs(t, e);
  }
};
CharacterSkillTriggerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(219)], CharacterSkillTriggerComponent);
exports.CharacterSkillTriggerComponent = CharacterSkillTriggerComponent; //# sourceMappingURL=CharacterSkillTriggerComponent.js.map