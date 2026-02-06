"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPreviewRoleSubView = undefined;
const UE = require("ue");
const ItemController_1 = require("../../../../../Item/ItemController");
const RoleController_1 = require("../../../../../RoleUi/RoleController");
const TotalTopUpPreviewSubViewBase_1 = require("./TotalTopUpPreviewSubViewBase");
class TotalTopUpPreviewRoleSubView extends TotalTopUpPreviewSubViewBase_1.TotalTopUpPreviewSubViewBase {
  constructor() {
    super(...arguments);
    this.hkg = [];
    this.lkg = 0;
    this._kg = () => {
      ItemController_1.ItemController.OpenItemTipsByItemId(this.lkg, false);
    };
    this.ukg = () => {
      RoleController_1.RoleController.OpenRoleMainView(1, 0, this.hkg);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this._kg], [1, this.ukg]];
  }
  ShowPreview(e) {
    if (e && e.RewardData?.TotalTopUpRolePackageData) {
      e = e.RewardData.TotalTopUpRolePackageData;
      this.hkg = [...e.RoleTrialIdList];
      this.lkg = e.ItemId;
    }
  }
}
exports.TotalTopUpPreviewRoleSubView = TotalTopUpPreviewRoleSubView;
//# sourceMappingURL=TotalTopUpPreviewRoleSubView.js.map