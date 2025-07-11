"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSwitchNpcFaceExpression extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.FaceExpressionId = -1;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent?.Entity.GetComponent(187)) && (e.ExpressionController.ChangeFaceForExpressionFromAnimNotify(this.FaceExpressionId, this), true);
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent?.Entity.GetComponent(187)) && (e.ExpressionController.ResetFaceForExpressionFromAnimNotify(this), true);
  }
  GetNotifyName() {
    return "切换Npc表情";
  }
}
exports.default = TsAnimNotifyStateSwitchNpcFaceExpression;
//# sourceMappingURL=TsAnimNotifyStateSwitchNpcFaceExpression.js.map