"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritNoneState = undefined;
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const SunSpiritNonePerform_1 = require("../SunSpiritPerform/SunSpiritNonePerform");
const SunSpiritBaseState_1 = require("./SunSpiritBaseState");
class SunSpiritNoneState extends SunSpiritBaseState_1.SunSpiritBaseState {
  constructor(r) {
    super(0, r);
  }
  OnEnter() {
    var r;
    if (!(this.SunSpiritData.GetSunSpiritPerform() instanceof SunSpiritNonePerform_1.SunSpiritNonePerform)) {
      r = Transform_1.Transform.Create();
      this.SunSpiritData.GetSunSpiritPerform().GetTransform(r);
      this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritNonePerform_1.SunSpiritNonePerform(this.SunSpiritData, r));
    }
    return true;
  }
}
exports.SunSpiritNoneState = SunSpiritNoneState;
//# sourceMappingURL=SunSpiritNoneState.js.map