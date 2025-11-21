"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasEnoughEnergy = exports.createInputCommandFromDataTable = exports.canVehicleResponseInput = exports.canResponseInput = exports.createSkillCommand = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes");
const Skill_1 = require("../../Skill/Skill");
const SkillBehaviorCondition_1 = require("../../Skill/SkillBehavior/SkillBehaviorCondition");
const tempSkill = new Skill_1.Skill();
function createSkillCommand(e, t) {
  if (t !== 0) {
    var r;
    var i;
    var n;
    var e = e.GetComponent(39);
    if (e && e.Valid) {
      r = e.GetSkillInfo(t);
      i = e.GetPriority(t);
      n = e.GetSkillIdWithGroupId(1);
      if ((n = e.GetActivePriority(n)) < i || e.IsMainSkillReadyEnd || i === n && e.SkillAcceptInput || r && r.GroupId !== 1) {
        return new UE.SInputCommand(1, t, undefined);
      } else {
        return undefined;
      }
    }
  }
}
function canResponseInput(e) {
  return !!e.GetComponent(45)?.CanResponseInput() && !(e = e.GetComponent(209))?.HasAnyTag([-2044964178, 855966206, 504239013, -1159105522, -648310348, 1501154053]) && (!e?.HasTag(-2100129479) || !!e.HasTag(2077247789));
}
function canVehicleResponseInput(e) {
  return !!e.GetComponent(240)?.CanResponseInput() && !e.GetComponent(209)?.HasTag(1646668090);
}
function createInputCommandFromDataTable(e, t, r) {
  var i = EntitySystem_1.EntitySystem.Get(e);
  if (i) {
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 209);
    var o = EntitySystem_1.EntitySystem.GetComponent(e, 39);
    if (n && o) {
      e = ModelManager_1.ModelManager.InputModel?.GetInputCommandTransformData(t, r);
      if (e) {
        for (const a of e) {
          if (n.HasTag(a.Tag.TagId)) {
            let e = false;
            if (e = a.BehaviorConditionGroup.Num() === 0 || SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(a.BehaviorConditionGroup, a.BehaviorConditionFormula, {
              Entity: i,
              SkillComponent: o,
              Skill: tempSkill
            }) ? true : e) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 67, "[通用输入转换]指令转换成功", ["Desc", a.Desc], ["Action", a.Action], ["State", a.State], ["Tag", a.Tag.TagName], ["CommandType", a.Command.CommandType], ["CommandValue", a.Command.IntValue]);
              }
              if (a.Command.CommandType === 1) {
                return createSkillCommand(i, a.Command.IntValue);
              } else {
                return new UE.SInputCommand(a.Command.CommandType, a.Command.IntValue, a.Command.TagValue);
              }
            }
          }
        }
      }
    }
  }
}
function hasEnoughEnergy(e) {
  e = e.GetComponent(177);
  return e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4) >= e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4Max);
}
exports.createSkillCommand = createSkillCommand;
exports.canResponseInput = canResponseInput;
exports.canVehicleResponseInput = canVehicleResponseInput;
exports.createInputCommandFromDataTable = createInputCommandFromDataTable;
exports.hasEnoughEnergy = hasEnoughEnergy; //# sourceMappingURL=InputFunctionCommon.js.map