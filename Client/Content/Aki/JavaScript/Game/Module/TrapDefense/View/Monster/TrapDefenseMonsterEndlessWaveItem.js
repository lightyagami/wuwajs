"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterEndlessWaveItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TrapDefenseMonsterEndlessWaveItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  UpdateDescKey(e) {
    this.GetText(0)?.ShowTextNew(e);
  }
}
exports.TrapDefenseMonsterEndlessWaveItem = TrapDefenseMonsterEndlessWaveItem;
//# sourceMappingURL=TrapDefenseMonsterEndlessWaveItem.js.map