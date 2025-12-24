"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyBattleQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.BattleQteId = 0;
    this.当前实体为玩家控制时才触发 = false;
    this.存在Tag时才触发 = undefined;
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
    var e = e.CharacterActorComponent;
    var t = e?.Entity;
    if (this.当前实体为玩家控制时才触发) {
      if (!e?.Valid) {
        return false;
      }
      if (!e.IsAutonomousProxy) {
        return false;
      }
    }
    return (!this.存在Tag时才触发 || this.存在Tag时才触发.TagName === StringUtils_1.NONE_STRING || !!t?.GetComponent(215)?.HasTag(this.存在Tag时才触发.TagId)) && !(e = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(t), t = t?.GetComponent(220)?.CreateAnimNotifyContent(r.GetName(), this.exportIndex), e && t && ControllerHolder_1.ControllerHolder.BattleQteController.StartBattleQte(this.BattleQteId, t, e, 0), 0);
  }
  GetNotifyName() {
    return "战斗QTE";
  }
}
exports.default = TsAnimNotifyBattleQte;
//# sourceMappingURL=TsAnimNotifyBattleQte.js.map