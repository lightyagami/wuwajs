"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const PanelQteController_1 = require("../Module/PanelQte/PanelQteController");
class TsAnimNotifyPanelQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.QteId = 0;
    this.CheckAutonomousProxy = false;
  }
  Constructor() {}
  K2_Notify(e, r) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PanelQte", 17, "AN触发通用QTE");
    }
    var t = e.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    if (this.CheckAutonomousProxy) {
      var o = t.CharacterActorComponent;
      if (!o?.Valid) {
        return false;
      }
      if (!o.IsAutonomousProxy) {
        return false;
      }
    }
    o = t?.CharacterActorComponent?.Entity?.GetComponent(209).CreateAnimNotifyContent(r.GetName(), this.exportIndex);
    PanelQteController_1.PanelQteController.StartAnimNotifyQte(this.QteId, e, o);
    return true;
  }
  GetNotifyName() {
    return "通用QTE";
  }
}
exports.default = TsAnimNotifyPanelQte;
//# sourceMappingURL=TsAnimNotifyPanelQte.js.map