"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateChangeSlot extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.ComponentName = undefined;
    this.SwitchToSlotName = undefined;
    this.SlotTransform = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t.GetEntityNoBlueprint()?.GetComponent(235)?.SetSubMeshAttach(this.ComponentName, this.SwitchToSlotName, this.SlotTransform), true);
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t.GetEntityNoBlueprint()?.GetComponent(235)?.ResetSubMeshAttach(this.ComponentName), true);
  }
  GetNotifyName() {
    return "切换组件到指定插槽";
  }
}
exports.default = TsAnimNotifyStateChangeSlot;
//# sourceMappingURL=TsAnimNotifyStateChangeSlot.js.map