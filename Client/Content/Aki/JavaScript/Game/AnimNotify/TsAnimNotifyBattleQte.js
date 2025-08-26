"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyBattleQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.BattleQteId = 0;
    this.当前实体为玩家控制时才触发 = false;
  }
  Constructor() {}
  K2_Notify(e, r) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "AN触发战斗QTE");
    }
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    if (this.当前实体为玩家控制时才触发) {
      var t = e.CharacterActorComponent;
      if (!t?.Valid) {
        return false;
      }
      if (!t.IsAutonomousProxy) {
        return false;
      }
    }
    t = e?.CharacterActorComponent?.Entity;
    e = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(t);
    t = t?.GetComponent(210)?.CreateAnimNotifyContent(r.GetName(), this.exportIndex);
    if (e && t) {
      ControllerHolder_1.ControllerHolder.BattleQteController.StartBattleQte(this.BattleQteId, t, e, 0);
    }
    return true;
  }
  GetNotifyName() {
    return "战斗QTE";
  }
}
exports.default = TsAnimNotifyBattleQte;
//# sourceMappingURL=TsAnimNotifyBattleQte.js.map