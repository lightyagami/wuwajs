"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateWalkOnWater extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Key = "";
    this.FixLocation = true;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t?.CharacterActorComponent?.Entity?.GetComponent(79)?.EnableOrDisableWalkOnWater(true, this.Key, this.FixLocation);
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t?.CharacterActorComponent?.Entity?.GetComponent(79)?.EnableOrDisableWalkOnWater(false, this.Key);
    }
    return true;
  }
  GetNotifyName() {
    return "水上行走";
  }
}
exports.default = TsAnimNotifyStateWalkOnWater;
//# sourceMappingURL=TsAnimNotifyStateWalkOnWater.js.map