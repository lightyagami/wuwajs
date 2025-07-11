"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifySetMovementMode extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.MovementMode = 0;
  }
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e.KuroSetMovementMode({
        Mode: this.MovementMode,
        Context: "[TsAnimNotifySetMovementMode.K2_Notify]"
      });
    }
    return true;
  }
  GetNotifyName() {
    return "设置移动模式";
  }
}
exports.default = TsAnimNotifySetMovementMode;
//# sourceMappingURL=TsAnimNotifySetMovementMode.js.map