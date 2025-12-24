"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleCardEffectItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class BattleCardEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CardConfigId = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara], [1, UE.UINiagara]];
  }
  async RefreshNiagara(t, e) {
    if (StringUtils_1.StringUtils.IsBlank(t)) {
      e.SetUIActive(false);
    } else {
      await this.SetNiagaraSystemByPathAsync(t, e);
      e.SetUIActive(true);
    }
  }
  async OnBeforeStartAsync() {
    await this.pB1(this.CardConfigId);
  }
  async pB1(t) {
    t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t);
    await Promise.all([this.RefreshNiagara(t.SettingEffect[0], this.GetUiNiagara(0)), this.RefreshNiagara(t.SettingEffect[1], this.GetUiNiagara(1))]);
  }
  async RefreshEffectById(t) {
    if (this.CardConfigId !== t) {
      this.CardConfigId = t;
      await this.pB1(t);
    }
  }
  PlayStartEffect() {
    var t = this.GetUiNiagara(0);
    var e = this.GetUiNiagara(1);
    this.SetActive(true);
    if (t.IsUIActiveSelf()) {
      t.ActivateSystem(true);
    }
    if (e.IsUIActiveSelf()) {
      e.ActivateSystem(true);
    }
  }
  SetCardConfigId(t) {
    this.CardConfigId = t;
  }
}
exports.BattleCardEffectItem = BattleCardEffectItem;
//# sourceMappingURL=BattleCardEffectItem.js.map