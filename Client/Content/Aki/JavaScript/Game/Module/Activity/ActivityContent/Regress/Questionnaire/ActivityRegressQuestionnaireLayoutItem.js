"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressQuestionnaireLayoutItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressQuestionnaireLayoutItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.sft = undefined;
    this.Pe = undefined;
    this.Bco = () => {
      var e;
      if (this.Pe.ItemData.RewardState === 1) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimQuestionnaireReward(this.Pe.Type);
      } else {
        e = this.Pe.ItemData.ItemInfo.Id;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[7, UE.UIItem]];
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(7).GetOwner());
    this.sft.BindOnCanExecuteChange(() => false);
    this.sft.BindOnExtendToggleClicked(this.Bco);
  }
  Refresh(e, t, r) {
    this.Pe = e;
    ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(this.sft, e.ItemData);
  }
}
exports.ActivityRegressQuestionnaireLayoutItem = ActivityRegressQuestionnaireLayoutItem;
//# sourceMappingURL=ActivityRegressQuestionnaireLayoutItem.js.map