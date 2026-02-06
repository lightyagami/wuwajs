"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerceptionReactionUtil = undefined;
const Time_1 = require("../../../../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../../../Global");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const BUBBLE_RANDOM_MAX = 100;
const TURN_SPEED = 20000;
const BUBBLE_TIME = 3;
class NpcPerceptionReactionUtil {
  static TurnToPlayer(e) {
    var t = e.GetComponent(2);
    var r = t.ActorLocationProxy;
    var i = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
    var o = Vector_1.Vector.Create();
    i.Subtraction(r, o);
    o.Z = 0;
    o.Normalize();
    var i = Rotator_1.Rotator.Create();
    o.ToOrientationRotator(i);
    var r = e.GetComponent(48);
    if (r) {
      r.SmoothCharacterRotation(i, TURN_SPEED, Time_1.Time.DeltaTimeSeconds);
    } else {
      t.SetActorRotation(i.ToUeRotator(), "NpcPerformUnderAttackState.TurnToPlayer");
    }
  }
  static ShowHeadDialog(e, t, r) {
    if (!(t < MathUtils_1.MathUtils.GetRandomFloatNumber(0, BUBBLE_RANDOM_MAX))) {
      if ((t = e.GetComponent(87)) && (e = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(r.FlowListName, r.FlowId, e.GetComponent(2).Actor.ActorLabel, r.StateId)) && e.TalkItems.length !== 0) {
        r = e.TalkItems[0];
        if (!StringUtils_1.StringUtils.IsEmpty(r.TidTalk)) {
          e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.TidTalk);
          if (r.WaitTime && r.WaitTime > 0) {
            t.SetDialogueText(e, r.WaitTime);
          } else {
            t.SetDialogueText(e, BUBBLE_TIME);
          }
        }
      }
    }
  }
}
exports.NpcPerceptionReactionUtil = NpcPerceptionReactionUtil;
//# sourceMappingURL=NpcPerceptionReactionUtil.js.map