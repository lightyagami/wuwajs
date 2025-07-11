"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifyFormationAttributeMax = exports.FormationLockLowerBound = exports.FormationLockUpperBound = exports.ModifyFormationAttributeDecreaseRate = exports.ModifyFormationAttributeIncreaseRate = exports.SetFormationAttributeRate = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const FormationAttributeController_1 = require("../../../../../../Module/Abilities/FormationAttributeController");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class SetFormationAttributeRate extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = undefined;
    this.Rate = -0;
    this.ModifierHandle = undefined;
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? false;
  }
  InitParameters(t) {
    if (t.ExtraEffectParameters[0] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "SetFormationAttributeRate参数错误，没有合法的队伍属性id", ["buffId", this.BuffId]);
      }
    } else {
      this.AttributeId = Number(t.ExtraEffectParameters[0]);
      this.Rate = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
      this.ModifierHandle = "buff" + this.ActiveHandleId;
    }
  }
  OnCreated() {
    if (this.AttributeId !== undefined && this.CheckExecutable()) {
      FormationAttributeController_1.FormationAttributeController.AddSpeedModifier(this.ModifierHandle, this.AttributeId, 0, this.Rate);
    }
  }
  OnExecute() {}
  OnRemoved(t) {
    if (this.AttributeId !== undefined && this.CheckExecutable()) {
      FormationAttributeController_1.FormationAttributeController.RemoveSpeedModifier(this.ModifierHandle, this.AttributeId);
    }
  }
}
exports.SetFormationAttributeRate = SetFormationAttributeRate;
class ModifyFormationAttributeIncreaseRate extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = undefined;
    this.Rate = -0;
    this.ModifierHandle = undefined;
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? false;
  }
  InitParameters(t) {
    if (t.ExtraEffectParameters[0] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "SetFormationAttributeRate参数错误，没有合法的队伍属性id", ["buffId", this.BuffId]);
      }
    } else {
      this.AttributeId = Number(t.ExtraEffectParameters[0]);
      this.Rate = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
      this.ModifierHandle = "buff" + this.ActiveHandleId;
    }
  }
  OnCreated() {
    if (this.AttributeId !== undefined && this.CheckExecutable()) {
      FormationAttributeController_1.FormationAttributeController.AddSpeedModifier(this.ModifierHandle, this.AttributeId, 1, this.Rate);
    }
  }
  OnExecute() {}
  OnRemoved(t) {
    if (this.AttributeId !== undefined && this.CheckExecutable()) {
      FormationAttributeController_1.FormationAttributeController.RemoveSpeedModifier(this.ModifierHandle, this.AttributeId);
    }
  }
}
exports.ModifyFormationAttributeIncreaseRate = ModifyFormationAttributeIncreaseRate;
class ModifyFormationAttributeDecreaseRate extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = undefined;
    this.Rate = -0;
    this.ModifierHandle = undefined;
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? false;
  }
  InitParameters(t) {
    if (t.ExtraEffectParameters[0] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "SetFormationAttributeRate参数错误，没有合法的队伍属性id", ["buffId", this.BuffId]);
      }
    } else {
      this.AttributeId = Number(t.ExtraEffectParameters[0]);
      this.Rate = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
      this.ModifierHandle = "buff" + this.ActiveHandleId;
    }
  }
  OnCreated() {
    if (this.AttributeId !== undefined && this.CheckExecutable()) {
      FormationAttributeController_1.FormationAttributeController.AddSpeedModifier(this.ModifierHandle, this.AttributeId, 2, this.Rate);
    }
  }
  OnExecute() {}
  OnRemoved(t) {
    if (this.AttributeId !== undefined && this.CheckExecutable()) {
      FormationAttributeController_1.FormationAttributeController.RemoveSpeedModifier(this.ModifierHandle, this.AttributeId);
    }
  }
}
exports.ModifyFormationAttributeDecreaseRate = ModifyFormationAttributeDecreaseRate;
class FormationLockUpperBound extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = -1;
    this.Offset = 0;
    this.Percent = -0;
  }
  InitParameters(t) {
    this.AttributeId = Number(t.ExtraEffectParameters[0]);
    this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
    this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters2, this.Level, 0);
    if (t.ExtraEffectParameters.length > 2) {
      this.Percent = Number(t.ExtraEffectParameters[2]);
    }
  }
  OnCreated() {
    if (this.AttributeId !== -1 && this.OwnerBuffComponent?.HasBuffAuthority()) {
      FormationAttributeController_1.FormationAttributeController.AddBoundsLocker(this.AttributeId, {
        LockUpperBounds: true,
        LockLowerBounds: false,
        UpperPercent: this.Percent * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        UpperOffset: this.Offset,
        LowerPercent: 0,
        LowerOffset: 0
      }, this.ActiveHandleId);
    }
  }
  OnExecute() {}
  OnRemoved() {
    if (this.AttributeId !== -1 && this.OwnerBuffComponent?.HasBuffAuthority()) {
      FormationAttributeController_1.FormationAttributeController.RemoveBoundsLocker(this.AttributeId, this.ActiveHandleId);
    }
  }
}
exports.FormationLockUpperBound = FormationLockUpperBound;
class FormationLockLowerBound extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = -1;
    this.Offset = 0;
    this.Percent = -0;
  }
  InitParameters(t) {
    this.AttributeId = Number(t.ExtraEffectParameters[0]);
    this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
    this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters2, this.Level, 0);
    if (t.ExtraEffectParameters.length > 2) {
      this.Percent = Number(t.ExtraEffectParameters[2]);
    }
  }
  OnCreated() {
    if (this.AttributeId !== -1 && this.OwnerBuffComponent?.HasBuffAuthority()) {
      FormationAttributeController_1.FormationAttributeController.AddBoundsLocker(this.AttributeId, {
        LockUpperBounds: false,
        LockLowerBounds: true,
        UpperPercent: 0,
        UpperOffset: 0,
        LowerPercent: this.Percent * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        LowerOffset: this.Offset
      }, this.ActiveHandleId);
    }
  }
  OnExecute() {}
  OnRemoved() {
    if (this.AttributeId !== -1 && this.OwnerBuffComponent?.HasBuffAuthority()) {
      FormationAttributeController_1.FormationAttributeController.RemoveBoundsLocker(this.AttributeId, this.ActiveHandleId);
    }
  }
}
exports.FormationLockLowerBound = FormationLockLowerBound;
class ModifyFormationAttributeMax extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = -1;
    this.Offset = 0;
    this.Percent = 0;
    this.ModifierKey = undefined;
  }
  InitParameters(t) {
    this.AttributeId = Number(t.ExtraEffectParameters[0]);
    this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
    this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters2, this.Level, 0);
    this.ModifierKey = "buff" + this.ActiveHandleId;
  }
  OnCreated() {
    if (this.AttributeId !== -1 && this.OwnerBuffComponent?.HasBuffAuthority()) {
      FormationAttributeController_1.FormationAttributeController.AddMaxModifier(this.ModifierKey, this.AttributeId, this.Percent, this.Offset);
    }
  }
  OnExecute() {}
  OnRemoved() {
    if (this.AttributeId !== -1 && this.OwnerBuffComponent?.HasBuffAuthority()) {
      FormationAttributeController_1.FormationAttributeController.RemoveMaxModifier(this.ModifierKey, this.AttributeId);
    }
  }
}
exports.ModifyFormationAttributeMax = ModifyFormationAttributeMax;
//# sourceMappingURL=ExtraEffectFormationAttribute.js.map