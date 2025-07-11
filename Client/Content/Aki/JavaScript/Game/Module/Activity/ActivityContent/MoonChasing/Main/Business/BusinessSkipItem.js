"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessSkipItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class BusinessSkipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.aOn = undefined;
    this.xAa = undefined;
    this.fsa = () => {
      if (this.xAa[0] === 1) {
        this.aOn?.SkipToBuild();
      } else if (this.xAa[0] === 0) {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTaskView(2, this.xAa[1]);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.fsa]];
  }
  RegisterViewController(e) {
    this.aOn = e;
  }
  Refresh() {
    var i = ModelManager_1.ModelManager.MoonChasingModel.GetFirstUnlockData();
    if (i) {
      let e = "";
      if ((this.xAa = i)[0] === 1) {
        e = "Moonfiesta_PartnerTip2";
      } else if (i[0] === 0) {
        e = "Moonfiesta_PartnerTip1";
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
    }
  }
}
exports.BusinessSkipItem = BusinessSkipItem;
//# sourceMappingURL=BusinessSkipItem.js.map