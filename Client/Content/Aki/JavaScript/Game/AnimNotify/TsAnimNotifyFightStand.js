"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const BATLLE_IDLE_TIME = 5000;
class TsAnimNotifyFightStand extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.BattleIdleTime = BATLLE_IDLE_TIME;
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t?.CharacterActorComponent?.Entity?.GetComponent(188)?.EnterBattleIdle(this.BattleIdleTime);
    }
    return true;
  }
  GetNotifyName() {
    return "设置战斗待机";
  }
}
exports.default = TsAnimNotifyFightStand;
//# sourceMappingURL=TsAnimNotifyFightStand.js.map