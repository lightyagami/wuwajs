"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleHighMonsterProgressPanel = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MoraleHighMonsterProgressPanel extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync()
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateProgress(e) {
    e = (e ?? ModelManager_1.ModelManager.MoraleModel.GetAllHighMonsterProgress()) + "/" + ModelManager_1.ModelManager.MoraleModel.GetAllHighMonsterTotal();
    this.GetText(0)?.SetText(e)
  }
}
exports.MoraleHighMonsterProgressPanel = MoraleHighMonsterProgressPanel;
//# sourceMappingURL=MoraleHighMonsterProgressPanel.js.map