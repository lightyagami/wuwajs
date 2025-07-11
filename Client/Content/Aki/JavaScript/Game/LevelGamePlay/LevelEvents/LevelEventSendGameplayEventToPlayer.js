"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSendGameplayEventToPlayer = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSendGameplayEventToPlayer extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var l = Global_1.Global.BaseCharacter;
    if (l && ((l = l.CharacterActorComponent.Entity.GetComponent(18)) && e.Tag && l.SendGameplayEventToActor(e.Tag), e.Both) && t.Type === 1 && (l = EntitySystem_1.EntitySystem.Get(t.EntityId))?.Valid && (t = l.GetComponent(18))?.Valid) {
      t.SendGameplayEventToActor(e.Tag);
    }
  }
}
exports.LevelEventSendGameplayEventToPlayer = LevelEventSendGameplayEventToPlayer;
//# sourceMappingURL=LevelEventSendGameplayEventToPlayer.js.map