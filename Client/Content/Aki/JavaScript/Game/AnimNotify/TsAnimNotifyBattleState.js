"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyBattleState extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.取消无敌 = false;
  }
  Constructor() {}
  K2_Notify(t, e) {
    var t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default && (t = (t?.CharacterActorComponent?.Entity).GetComponent(205), this.取消无敌) && t) {
      t.RemoveTag(501201000);
    }
    return true;
  }
  GetNotifyName() {
    return "设置战斗状态";
  }
}
exports.default = TsAnimNotifyBattleState;
//# sourceMappingURL=TsAnimNotifyBattleState.js.map