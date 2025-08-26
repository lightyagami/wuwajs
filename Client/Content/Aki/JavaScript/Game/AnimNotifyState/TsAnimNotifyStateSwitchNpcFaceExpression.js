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
    this.PlayExpressionHandle = 0;
  }
  Constructor() {
    this.PlayExpressionHandle = 0;
  }
  K2_NotifyBegin(t, e, s) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent?.Entity.GetComponent(188)) && (this.PlayExpressionHandle ||= t.ExpressionController.ChangeFaceForExpressionFromAnimNotify(this.FaceExpressionId), true);
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent?.Entity.GetComponent(188)) && (this.PlayExpressionHandle && (t.ExpressionController.ResetFaceForExpressionFromAnimNotify(this.PlayExpressionHandle), this.PlayExpressionHandle = 0), true);
  }
  GetNotifyName() {
    return "切换Npc表情";
  }
}
exports.default = TsAnimNotifyStateSwitchNpcFaceExpression;
//# sourceMappingURL=TsAnimNotifyStateSwitchNpcFaceExpression.js.map