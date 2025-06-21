"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleUnbreakableLvInfoItem = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MoraleUnbreakableLvInfoItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync()
  }
  OnStart() {
    this.UpdateData()
  }
  UpdateData() {
    var e = this.GetArtText(0),
      a = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel();
    e.SetText(a.toString()), this.GetText(1)?.ShowTextNew("Morale_title_3")
  }
}
exports.MoraleUnbreakableLvInfoItem = MoraleUnbreakableLvInfoItem;
//# sourceMappingURL=MoraleUnbreakableLvInfoItem.js.map