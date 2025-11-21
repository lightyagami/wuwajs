"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffDefinition = exports.actionTagRemove = undefined;
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
exports.actionTagRemove = new Set([2, 1, 4, 3, 102, 101, 104, 103]);
class BuffDefinition {
  constructor() {
    this.Id = undefined;
    this.Desc = "";
    this.FormationPolicy = 0;
    this.Probability = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    this.PrematureExpirationEffects = undefined;
    this.RoutineExpirationEffects = undefined;
    this.OverflowEffects = undefined;
    this.Modifiers = [];
    this.StackLimitCount = 1;
    this.StackingType = 0;
    this.DefaultStackCount = 1;
    this.StackAppendCount = 0;
    this.DenyOverflowAdd = false;
    this.ClearStackOnOverflow = false;
    this.DurationPolicy = 0;
    this.DurationMagnitude = undefined;
    this.DurationMagnitude2 = undefined;
    this.DurationCalculationPolicy = undefined;
    this.GameplayCueIds = undefined;
    this.Period = 0;
    this.ExecutePeriodicOnAdd = false;
    this.PeriodicInhibitionPolicy = 0;
    this.StackDurationRefreshPolicy = 1;
    this.StackPeriodResetPolicy = 1;
    this.StackExpirationRemoveNumber = 0;
    this.DurationAffectedByBulletTime = false;
    this.RemoveBuffWithTags = undefined;
    this.GrantedTags = undefined;
    this.AddInstigatorTagRequirements = undefined;
    this.AddInstigatorTagIgnores = undefined;
    this.AddTagRequirements = undefined;
    this.AddTagIgnores = undefined;
    this.ActivateTagRequirements = undefined;
    this.ActivateTagIgnores = undefined;
    this.RemoveTagExistAll = undefined;
    this.RemoveTagIgnores = undefined;
    this.ImmuneTags = undefined;
    this.ImmuneTagIgnores = undefined;
    this.RemoveTagExistAny = undefined;
    this.BuffsAddedByStackCountOnRemoved = undefined;
    this.BuffAction = undefined;
    this.HasBuffEffect = false;
    this.HasBuffPeriodExecution = false;
    this.EffectInfos = [];
    this.DeadRemove = true;
  }
}
exports.BuffDefinition = BuffDefinition;
//# sourceMappingURL=BuffTypes.js.map