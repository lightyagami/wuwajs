"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceRewardItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSimpleGridExFinish_1 = require("../../../Common/ItemGrid/CommonItemSimpleGridExFinish");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class InfluenceRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.eGe = undefined;
    this.aVt = false;
    this.sGe = (e, i, t) => {
      i = new CommonItemSimpleGridExFinish_1.CommonItemSimpleGridExFinish(i.GetOwner());
      i.RefreshItem(e[0], e[1]);
      i.SetReceived(this.aVt);
      return {
        Key: t,
        Value: i
      };
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILayoutBase]];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(1), this.sGe);
  }
  OnBeforeDestroy() {
    this.eGe.ClearChildren();
    this.eGe = undefined;
  }
  UpdateItem(e, i) {
    this.aVt = i;
    this.Psi(e.Item1);
    i = ModelManager_1.ModelManager.InfluenceReputationModel.GetRewardList(e.Item2);
    this.eGe.RebuildLayoutByDataNew(i);
  }
  Psi(e) {
    var i = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalText(i, "ReputationReceive", e);
  }
  SetAllReceivedTitle() {
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalText(e, "ReputationAllReceived");
  }
}
exports.InfluenceRewardItem = InfluenceRewardItem;
//# sourceMappingURL=InfluenceRewardItem.js.map