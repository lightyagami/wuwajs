"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeIntervalCheck = undefined;
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const Macro_1 = require("../../../../../../Core/Preprocessor/Macro");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
class AttributeIntervalCheck {
  constructor(t, e, s, r) {
    this.MaxAttributeId = undefined;
    this.LowerBound = -1;
    this.UpperBound = -1;
    this.IsPerTenThousand = false;
    this.ListenAttributeId = t;
    this.LowerBound = e;
    this.UpperBound = s;
    this.IsPerTenThousand = r;
    if (this.IsPerTenThousand) {
      this.MaxAttributeId = CharacterAttributeTypes_1.attributeIdsWithMax.get(this.ListenAttributeId);
    }
  }
  CheckListenActiveness(t, e) {
    if (this.IsPerTenThousand) {
      return (e = t / e.GetCurrentValue(this.MaxAttributeId) * CharacterAttributeTypes_1.PER_TEN_THOUSAND) <= this.UpperBound && e > this.LowerBound;
    } else {
      return t <= this.UpperBound && t > this.LowerBound;
    }
  }
  CheckActiveness(t) {
    var e;
    return !!t && (e = t.GetCurrentValue(this.ListenAttributeId), this.IsPerTenThousand ? (t = e / t.GetCurrentValue(this.MaxAttributeId) * CharacterAttributeTypes_1.PER_TEN_THOUSAND) <= this.UpperBound && t > this.LowerBound : e <= this.UpperBound && e > this.LowerBound);
  }
}
exports.AttributeIntervalCheck = AttributeIntervalCheck;
//# sourceMappingURL=CharacterAttributeIntervalCheck.js.map