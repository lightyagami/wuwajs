"use strict";

var __decorate = this && this.__decorate || function (e, t, r, i) {
  var o;
  var n = arguments.length;
  var s = n < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, r, i);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (o = e[l]) {
        s = (n < 3 ? o(s) : n > 3 ? o(t, r, s) : o(t, r)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(t, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSkillTriggerComponent = undefined;
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
    this.cBe = this.Entity.CheckGetComponent(39);
    this.dHs = this.Entity.CheckGetComponent(28);
    return true;
  }
  OnStart() {
    return true;
  }
  OnActivate() {
    for (const t of this.cBe.GetAllSkillData()) {
      var e = this.cBe.GetSkillInfo(t);
      this.pVs(t, e);
    }
    return true;
  }
  OnEnd() {
    return true;
  }
  pVs(r, t) {
    if (t) {
      for (let e = 0; e < t.SkillTriggers.Num(); e++) {
        var i = t.SkillTriggers.Get(e);
        if (i.TriggerType in TriggerType_1.ETriggerEvent) {
          var o;
          var n = [];
          if (i.TriggerPreset) {
            for (let e = 0; e < i.TriggerPreset.Num(); e++) {
              n.push(i.TriggerPreset.Get(e));
            }
          }
          if (TriggerType_1.ETriggerEvent[i.TriggerType] === TriggerType_1.ETriggerEvent.GlobalDamageTrigger) {
            CombatLog_1.CombatLog.Error("Skill", this.Entity, "禁止白名单之外的技能使用全局伤害监听", ["skillId", r]);
          } else {
            o = this.dHs.AddTrigger({
              Type: i.TriggerType,
              Preset: n,
              Params: i.TriggerParams || "{}",
              Formula: i.TriggerFormula || "TRUE"
            }, (e, t) => {
              this.cBe.BeginSkill(r, {
                Reason: "技能触发器触发"
              });
            });
            this.dHs.SetTriggerActive(o, true);
          }
        } else {
          CombatLog_1.CombatLog.Error("Skill", this.Entity, "技能触发器类型不合法", ["技能Id", r], ["触发器类型", i.TriggerType]);
        }
      }
    }
  }
  AddSkillTriggerDebug(e, t) {
    this.pVs(e, t);
  }
};
CharacterSkillTriggerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(209)], CharacterSkillTriggerComponent);
exports.CharacterSkillTriggerComponent = CharacterSkillTriggerComponent; //# sourceMappingURL=CharacterSkillTriggerComponent.js.map