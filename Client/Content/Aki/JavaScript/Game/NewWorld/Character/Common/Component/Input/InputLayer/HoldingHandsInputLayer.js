"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoldingHandsInputLayer = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../../../../Input/InputEnums");
const InputLayer_1 = require("../../../../../../Input/InputLayer");
class HoldingHandsInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments);
    this.LongHoldLeaveTime = 1;
    this.LWc = undefined;
    this.AWc = new Map();
  }
  Init(e) {
    this.LWc = e;
    this.LongHoldLeaveTime = e.Params.LongPressDuration;
  }
  Clear() {
    this.LWc = undefined;
    this.AWc.clear();
  }
  GetLayerType() {
    return 6;
  }
  GetIsHoldingHands() {
    return this.LWc.GetRoleState() !== 0;
  }
  HandlePress(e, n) {
    if (e === InputEnums_1.EInputAction.技能1) {
      return HoldingHandsInputLayer.GetSwallowCommand();
    }
  }
  HandleHold(e, n) {
    if (e === InputEnums_1.EInputAction.技能1) {
      if (this.GetIsHoldingHands()) {
        if (!this.AWc.has(e)) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressStart, e);
        }
        if (n > this.LongHoldLeaveTime) {
          this.LWc?.ReleaseAllHands("长按技能键", true);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressEnd, e);
        }
        this.AWc.set(e, true);
      }
      return HoldingHandsInputLayer.GetSwallowCommand();
    }
  }
  HandleRelease(e, n) {
    this.AWc.delete(e);
    if (e === InputEnums_1.EInputAction.技能1) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillLongPressEnd, e);
      return HoldingHandsInputLayer.GetSwallowCommand();
    }
  }
  IsHoldingAction(e) {
    return this.AWc.has(e);
  }
}
exports.HoldingHandsInputLayer = HoldingHandsInputLayer;
//# sourceMappingURL=HoldingHandsInputLayer.js.map