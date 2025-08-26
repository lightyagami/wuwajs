"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RewardController_1 = require("../../../../../Module/Reward/RewardController");
class TsSceneInteractBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetSitDownState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 29)?.GetSitDownState() ?? false;
  }
  static GetEnterSitDownIndex(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 29)?.EnterSitDownIndex;
  }
  static GetLeaveSitDownIndex(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 29)?.LeaveSitDownIndex;
  }
  static PreLeaveSitDownAction(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 29)?.PreLeaveSitDownAction();
  }
  static LeaveSitDownAction(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 29)?.LeaveSitDownAction();
  }
  static GetGiantActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 29)?.Giant;
  }
  static EndCatapult(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 29)?.EndCatapult();
  }
  static EndBounce(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 29)?.EndBounce();
  }
  static IsAiDriver(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 47)?.IsAiDriver ?? false;
  }
  static IsDropItem(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 150) !== undefined;
  }
  static PickUpDropItem(t, e) {
    e = EntitySystem_1.EntitySystem.Get(e).GetComponent(0);
    RewardController_1.RewardController.PickUpFightDrop(e.GetCreatureDataId(), e.GetPbDataId());
  }
  static InteractSceneItem(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(e, 198)?.ExecuteInteractFromVision(t);
  }
}
exports.default = TsSceneInteractBlueprintFunctionLibrary;
//# sourceMappingURL=TsSceneInteractBlueprintFunctionLibrary.js.map