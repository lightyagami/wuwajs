"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleFallbackView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class RogueBattleFallbackView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.JGn = () => {};
    this.tL1 = () => {
      ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).OpExecuteClientId = 0;
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.OpenParam);
      this.CloseMe();
    };
    this.iL1 = () => {
      ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).OpExecuteClientId = 1;
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.OpenParam);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.JGn], [2, this.tL1], [3, this.iL1]];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.oR1;
    this.GetText(1).SetText(e.F2s.toString());
    this.GetItem(4).SetUIActive(e.sR1);
    return super.OnBeforeStartAsync();
  }
}
exports.RogueBattleFallbackView = RogueBattleFallbackView;
//# sourceMappingURL=RogueBattleFallbackView.js.map