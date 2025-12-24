"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifyControllerShake extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Effect = undefined;
    this.Name = undefined;
    this.IsLooping = false;
    this.IsIgnoreTimeDilation = false;
    this.IsPlayWhilePaused = false;
  }
  Constructor() {}
  K2_Notify(r, e) {
    if (Info_1.Info.IsInGamepad()) {
      r = r.GetOwner();
      if (r instanceof TsBaseCharacter_1.default && r.CharacterActorComponent?.IsAutonomousProxy && Global_1.Global.CharacterController) {
        r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r.GetEntityIdNoBlueprint());
        if (!r?.Valid) {
          return false;
        }
        if (!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(r)) {
          return false;
        }
        ControllerHolder_1.ControllerHolder.GamepadController.PlayKuroForceFeedback(this.Effect, this.Name, this.IsLooping, this.IsIgnoreTimeDilation, this.IsPlayWhilePaused, "TsAnimNotifyControllerShake");
      }
    }
    return true;
  }
  GetNotifyName() {
    return "手柄震动";
  }
}
exports.default = TsAnimNotifyControllerShake;
//# sourceMappingURL=TsAnimNotifyControllerShake.js.map