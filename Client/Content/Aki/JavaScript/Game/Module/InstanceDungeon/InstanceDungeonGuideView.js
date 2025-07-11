"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonGuideView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDungeonGuideView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Vgt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [5, UE.UIItem], [4, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[6, this.Vgt]];
  }
  OnStart() {
    this.GetButton(4).RootUIComp.SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this._1i();
  }
  _1i() {
    var e = ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetCurrentInstanceDungeonGuideValue();
    if (!!e && !!(e = ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e)) && !(e.length < 1)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e[0].Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e[0].Content);
      if ((e = e[0].Picture) && e !== "") {
        this.GetTexture(1).SetUIActive(true);
        this.SetTextureByPath(e, this.GetTexture(1));
      } else {
        this.GetTexture(1).SetUIActive(false);
      }
    }
  }
}
exports.InstanceDungeonGuideView = InstanceDungeonGuideView;
//# sourceMappingURL=InstanceDungeonGuideView.js.map