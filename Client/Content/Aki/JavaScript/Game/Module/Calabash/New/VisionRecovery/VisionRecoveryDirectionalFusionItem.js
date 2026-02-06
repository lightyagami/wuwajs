"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoveryDirectionalFusionItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionRecoveryDirectionalFusionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.nqe = () => {
      if (!UiManager_1.UiManager.IsViewOpen("VisionDirectionalFusionSelectTargetView")) {
        UiManager_1.UiManager.OpenView("VisionDirectionalFusionSelectTargetView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  RefreshItem() {
    var e;
    var i = this.GetTexture(2);
    var r = this.GetText(3);
    var a = ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTargetFetterGroup;
    if (a) {
      if ((a = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(a)) && (e = a.AimModelElementPath) !== "" && e.length !== 0) {
        r.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, a.FetterGroupName);
        this.SetTextureByPath(e, i);
      }
    } else {
      a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_IconElementAttriNone");
      this.SetTextureByPath(a, i);
      r.SetUIActive(false);
    }
  }
}
exports.VisionRecoveryDirectionalFusionItem = VisionRecoveryDirectionalFusionItem;
//# sourceMappingURL=VisionRecoveryDirectionalFusionItem.js.map