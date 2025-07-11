"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyFootprint extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.IsLeftFoot = false;
  }
  Constructor() {}
  K2_Notify(t, e) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.GetEntityNoBlueprint()?.GetComponent(57)) && (t.TriggerFootprint(this.IsLeftFoot), true);
  }
  GetNotifyName() {
    return "脚印特效";
  }
}
exports.default = TsAnimNotifyFootprint;
//# sourceMappingURL=TsAnimNotifyFootprint.js.map