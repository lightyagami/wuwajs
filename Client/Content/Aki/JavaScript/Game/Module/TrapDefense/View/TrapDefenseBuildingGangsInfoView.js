"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingGangsInfoView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TrapDefenseBuildingGangsInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.sO1 = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.sO1]];
  }
  OnStart() {
    var e = this.OpenParam;
    var e = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.BdDataMap.get(e);
    if (e) {
      this.SetTextureByPath(e.Config.Icon, this.GetTexture(1));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Config.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.Config.Desc);
    }
  }
}
exports.TrapDefenseBuildingGangsInfoView = TrapDefenseBuildingGangsInfoView;
//# sourceMappingURL=TrapDefenseBuildingGangsInfoView.js.map