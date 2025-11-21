"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiNiagaraPanel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class HonamiNiagaraPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara]];
  }
  async SetNiagaraAndShow(e, a) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    await this.SetNiagaraSystemByPathAsync(e, this.GetUiNiagara(0));
    this.GetUiNiagara(0).ActivateSystem(true);
    if (a) {
      AudioSystem_1.AudioSystem.PostEvent(a);
    }
  }
}
exports.HonamiNiagaraPanel = HonamiNiagaraPanel;
//# sourceMappingURL=HonamiNiagaraPanel.js.map