"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBuffAddTips = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const MoraleBuffAddItem_1 = require("./MoraleBuffAddItem");
class MoraleBuffAddTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.ItemLayout = undefined;
    this.Qll = () => {
      this.CloseMe();
    };
    this.Bqe = () => new MoraleBuffAddItem_1.MoraleBuffAddItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UILayoutBase], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.Qll]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, this.constructor.name, ["TitleKey", this.OpenParam?.TitleKey], ["DataList", this.OpenParam?.DataList]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(1);
    var t = this.GetItem(2).GetOwner();
    this.ItemLayout = new GenericLayout_1.GenericLayout(e, this.Bqe, t);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    this.UpdatePos();
    this.UpdateTitle();
    this.UpdateList();
  }
  UpdatePos() {
    var e = this.OpenParam?.ItemForLocation;
    if (e) {
      this.GetItem(3).SetUIRelativeLocation(e.RelativeLocation);
    }
  }
  UpdateTitle() {
    var e = this.OpenParam?.TitleKey ?? "Morale_title_22";
    this.GetText(4)?.ShowTextNew(e);
  }
  UpdateList() {
    var e = this.OpenParam?.DataList ?? ModelManager_1.ModelManager.MoraleModel.GetAllRoleAttrAddList();
    this.ItemLayout.RefreshByData(e);
  }
}
exports.MoraleBuffAddTips = MoraleBuffAddTips;
//# sourceMappingURL=MoraleBuffAddTips.js.map