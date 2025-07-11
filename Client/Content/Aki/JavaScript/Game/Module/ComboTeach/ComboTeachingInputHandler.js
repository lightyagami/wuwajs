"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboTeachingInputHandler = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputEnums_1 = require("../../Input/InputEnums");
const InputFilter_1 = require("../../Input/InputFilter");
class ComboTeachingInputHandler {
  constructor() {
    this.InputFilter = undefined;
  }
  GetPriority() {
    return 1;
  }
  GetInputFilter() {
    this.InputFilter ||= new InputFilter_1.InputFilter([InputEnums_1.EInputAction.攻击, InputEnums_1.EInputAction.大招, InputEnums_1.EInputAction.跳跃, InputEnums_1.EInputAction.闪避, InputEnums_1.EInputAction.技能1, InputEnums_1.EInputAction.瞄准], undefined, undefined, undefined);
    return this.InputFilter;
  }
  HandlePressEvent(e, n) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingPress, e, n);
  }
  HandleReleaseEvent(e, n) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingRelease, e, n);
  }
  HandleHoldEvent(e, n) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingHold, e, n);
  }
  HandleInputAxis(e, n) {}
  ClearInputAxis(e) {}
  ClearSingleAxisInput(e, n) {}
  PreProcessInput(e, n) {}
  PostProcessInput(e, n) {}
}
exports.ComboTeachingInputHandler = ComboTeachingInputHandler;
//# sourceMappingURL=ComboTeachingInputHandler.js.map