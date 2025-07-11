"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifyStateControllerShake extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Effect = undefined;
    this.Name = undefined;
    this.IsLooping = false;
    this.IsIgnoreTimeDilation = false;
    this.IsPlayWhilePaused = false;
  }
  Constructor() {}
  K2_NotifyBegin(e, r) {
    if (Info_1.Info.IsInGamepad()) {
      e = e.GetOwner();
      if (e instanceof TsBaseCharacter_1.default && e.CharacterActorComponent?.IsAutonomousProxy && Global_1.Global.CharacterController) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.GetEntityIdNoBlueprint());
        if (!e?.Valid) {
          return false;
        }
        if (!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(e)) {
          return false;
        }
        Global_1.Global.CharacterController.PlayKuroForceFeedback(this.Effect, this.Name, this.IsLooping, this.IsIgnoreTimeDilation, this.IsPlayWhilePaused);
      }
    }
    return true;
  }
  K2_NotifyEnd(e, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && e.CharacterActorComponent?.IsAutonomousProxy && Global_1.Global.CharacterController) {
      Global_1.Global.CharacterController.StopKuroForceFeedback(this.Effect, this.Name);
    }
    return true;
  }
  GetNotifyName() {
    return "手柄震动";
  }
}
exports.default = TsAnimNotifyStateControllerShake;
//# sourceMappingURL=TsAnimNotifyStateControllerShake.js.map