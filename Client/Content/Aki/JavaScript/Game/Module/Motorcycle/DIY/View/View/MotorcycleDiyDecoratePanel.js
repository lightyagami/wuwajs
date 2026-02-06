"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyDecoratePanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const MotorcycleDiyOutlookBoxItem_1 = require("../../Item/MotorcycleDiyOutlookBoxItem");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
class MotorcycleDiyDecoratePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Wyf = undefined;
    this.Qyf = () => {
      return new MotorcycleDiyOutlookBoxItem_1.MotorcycleDiyOutlookBoxItem();
    };
    this.Byf = () => {
      ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectedItemInfo();
      UiManager_1.UiManager.OpenView("MotorcycleDiyRootView", {
        OpenTabView: "MotorcycleDiyDecorationTabView",
        PartTabIndex: 1,
        IsNeedResetMotor: true
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Byf]];
  }
  OnStart() {
    this.Wyf = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.Qyf, this.GetItem(4).GetOwner());
  }
  Refresh(e) {
    e = e.map((e, o) => new MotorcycleDiyDefine_1.MotorcycleDiyOutlookBoxItemData(3, e, o));
    this.Wyf.RefreshByData(e);
    this.GetItem(5).SetUIActive(ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewDecorationByAnyPart());
  }
}
exports.MotorcycleDiyDecoratePanel = MotorcycleDiyDecoratePanel;
//# sourceMappingURL=MotorcycleDiyDecoratePanel.js.map