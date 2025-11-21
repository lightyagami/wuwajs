"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManipulateInputLayer = undefined;
const Info_1 = require("../../../../../../../Core/Common/Info");
const InputEnums_1 = require("../../../../../../Input/InputEnums");
const InputLayer_1 = require("../../../../../../Input/InputLayer");
const MANIPULATE_THROW_SKILL = 210005;
const MANIPULATE_RELEASE_SKILL = 210006;
const MANIPULATE_ROTATE_SKILL = 210009;
const MANIPULATE_PARABOLA_SKILL = 240001;
const actionsForbid = [InputEnums_1.EInputAction.攻击, InputEnums_1.EInputAction.幻象1, InputEnums_1.EInputAction.幻象2, InputEnums_1.EInputAction.技能1, InputEnums_1.EInputAction.瞄准, InputEnums_1.EInputAction.大招];
class ManipulateInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments);
    this.Lie = undefined;
    this.cBe = undefined;
  }
  Init(t) {
    t = t.Entity;
    this.Lie = t.GetComponent(197);
    this.cBe = t.GetComponent(40);
  }
  Clear() {
    this.Lie = undefined;
    this.cBe = undefined;
  }
  GetLayerType() {
    return 5;
  }
  HandlePress(t, e) {
    switch (t) {
      case InputEnums_1.EInputAction.攻击:
        if (!this.Lie.HasTag(-972568039)) {
          this.cBe.BeginSkillAsync(MANIPULATE_THROW_SKILL, {
            Reason: "Manipulate InputLayer, Item Throw"
          });
        }
        return ManipulateInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.幻象1:
        if (Info_1.Info.IsInTouch()) {
          break;
        }
        if (!this.Lie.HasTag(1278503102)) {
          this.cBe.BeginSkillAsync(MANIPULATE_RELEASE_SKILL, {
            Reason: "Manipulate InputLayer, Item Release"
          });
        }
        return ManipulateInputLayer.GetSwallowCommand();
      case InputEnums_1.EInputAction.技能1:
        if (this.Lie.HasTag(-1070569477)) {
          this.cBe.BeginSkillAsync(MANIPULATE_ROTATE_SKILL, {
            Reason: "Manipulate InputLayer, Item Rotate"
          });
          return ManipulateInputLayer.GetSwallowCommand();
        }
        break;
      case InputEnums_1.EInputAction.瞄准:
        this.cBe.BeginSkillAsync(MANIPULATE_PARABOLA_SKILL, {
          Reason: "Manipulate InputLayer, Item Rotate"
        });
        return ManipulateInputLayer.GetSwallowCommand();
    }
    if (actionsForbid.includes(t) && this.Q0l()) {
      return ManipulateInputLayer.GetSwallowCommand();
    }
  }
  HandleRelease(t, e) {
    if (t === InputEnums_1.EInputAction.幻象1) {
      if (Info_1.Info.IsInTouch()) {
        if (!this.Lie.HasTag(1278503102)) {
          this.cBe.BeginSkillAsync(MANIPULATE_RELEASE_SKILL, {
            Reason: "Manipulate InputLayer, Item Release"
          });
        }
        return ManipulateInputLayer.GetSwallowCommand();
      }
    }
    if (this.Q0l()) {
      return ManipulateInputLayer.GetSwallowCommand();
    }
  }
  HandleHold(t, e) {
    if (this.Q0l()) {
      return ManipulateInputLayer.GetSwallowCommand();
    }
  }
  Q0l() {
    return !!this.Lie.HasAnyTag([1491611589, 20810141, 1173061094]) && !this.Lie.HasTag(-611290244);
  }
}
exports.ManipulateInputLayer = ManipulateInputLayer;
//# sourceMappingURL=ManipulateInputLayer.js.map