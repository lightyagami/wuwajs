"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyStickerPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
const UiManager_1 = require("../../../../../Ui/UiManager");
const MotorcycleDiyPartBoxItem_1 = require("../../Item/MotorcycleDiyPartBoxItem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class MotorcycleDiyStickerPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.lpf = undefined;
    this._pf = () => {
      return new MotorcycleDiyPartBoxItem_1.MotorcycleDiyPartBoxItem();
    };
    this.JCf = () => {
      ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectStickerInfo();
      ModelManager_1.ModelManager.MotorcycleDiyModel.SetJumpStickerIndex(0);
      UiManager_1.UiManager.OpenView("MotorcycleDiyRootView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.JCf]];
  }
  OnStart() {
    this.lpf = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this._pf, this.GetItem(4).GetOwner());
  }
  Refresh(e) {
    e = e.map((e, r) => new MotorcycleDiyDefine_1.MotorcycleDiyPartBoxItemData(1, e, r));
    this.lpf.RefreshByData(e);
    this.GetItem(5).SetUIActive(ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewStickerByAnyPart());
  }
}
exports.MotorcycleDiyStickerPanel = MotorcycleDiyStickerPanel;
//# sourceMappingURL=MotorcycleDiyStickerPanel.js.map