"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleCardLoopEffectItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class BattleCardLoopEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CardConfigId = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara]];
  }
  async RefreshNiagara(e, t) {
    if (StringUtils_1.StringUtils.IsBlank(e)) {
      t.SetUIActive(false);
    } else {
      await this.SetNiagaraSystemByPathAsync(e, t);
      t.SetUIActive(true);
    }
  }
  async OnBeforeStartAsync() {
    await this.pB1(this.CardConfigId);
  }
  async pB1(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardConfigId);
    await this.RefreshNiagara(t.AtmosphereEffect, this.GetUiNiagara(0));
  }
  async RefreshEffectById(e) {
    if (this.CardConfigId !== e) {
      this.CardConfigId = e;
      await this.pB1(e);
    }
  }
  SetCardConfigId(e) {
    this.CardConfigId = e;
  }
}
exports.BattleCardLoopEffectItem = BattleCardLoopEffectItem;
//# sourceMappingURL=BattleCardLoopEffectItem.js.map