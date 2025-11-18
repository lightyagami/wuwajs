"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SneakController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
class SneakController extends ControllerBase_1.ControllerBase {
  static StartSneaking() {
    this.wpr = true;
    this.B$t(true);
    this.G$t();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakStart);
  }
  static EndSneaking() {
    this.wpr = false;
    this.B$t(false);
    this.O$t();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakEnd);
  }
  static get IsSneaking() {
    return this.wpr;
  }
  static G$t() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
  }
  static O$t() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    }
  }
  static B$t(e) {
    var t = Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(178);
    if (t?.Valid) {
      if (e) {
        t.AddBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, {
          InstigatorId: t.CreatureDataId,
          Reason: "SneakController"
        });
      } else {
        t.RemoveBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, -1, "SneakController");
      }
    }
  }
}
exports.SneakController = SneakController;
(_a = SneakController).wpr = false;
SneakController.R$t = false;
SneakController.Zpe = e => {
  _a.B$t(!e);
  if (e !== _a.R$t) {
    _a.R$t = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSneakFoundChange, _a.R$t, 0);
  }
}; //# sourceMappingURL=SneakController.js.map