"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyChangeSlot extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.ComponentName = undefined;
    this.SwitchToSlotName = undefined;
    this.SlotTransform = undefined;
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var r = t.CharacterActorComponent;
    if (!r) {
      return false;
    }
    var s = r.SkeletalMesh?.GetNumChildrenComponents();
    for (let t = 0; t < s; t++) {
      var i = r.SkeletalMesh?.GetChildComponent(t);
      if (i && i.GetName() === this.ComponentName && i instanceof UE.SkeletalMeshComponent) {
        i.K2_AttachToComponent(r.SkeletalMesh, this.SwitchToSlotName, 0, 0, 0, true);
        if (this.SlotTransform) {
          i.K2_SetRelativeTransform(this.SlotTransform, false, undefined, true);
        }
        break;
      }
    }
    return true;
  }
  GetNotifyName() {
    return "切换组件到指定插槽";
  }
}
exports.default = TsAnimNotifyChangeSlot;
//# sourceMappingURL=TsAnimNotifyChangeSlot.js.map