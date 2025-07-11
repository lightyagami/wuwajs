"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReputationTips = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class ReputationTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.bsi = undefined;
    this.x5e = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnBeforeCreate() {
    this.x5e = this.OpenParam;
  }
  OnStart() {
    this.bsi = new ReputationTipsItem(this.GetItem(0));
    this.GetItem(1).SetUIActive(false);
  }
  OnAfterShow() {
    this.bsi.UpdateItem(this.x5e[0].Item1, this.x5e[0].Item2);
  }
  OnBeforeDestroy() {
    this.bsi.Destroy();
    this.bsi = undefined;
  }
}
exports.ReputationTips = ReputationTips;
class ReputationTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
  }
  UpdateItem(e, t) {
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
    var i = e / t;
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ReputationValue", e, t);
    this.GetSprite(1).SetFillAmount(i);
  }
}
//# sourceMappingURL=ReputationTips.js.map