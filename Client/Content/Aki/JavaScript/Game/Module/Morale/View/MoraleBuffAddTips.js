"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffAddTips = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  MoraleBuffAddItem_1 = require("./MoraleBuffAddItem");
class MoraleBuffAddTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.OpenParam = void 0, this.ItemLayout = void 0, this.Qll = () => {
      this.CloseMe()
    }, this.Bqe = () => new MoraleBuffAddItem_1.MoraleBuffAddItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UILayoutBase],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.Qll]
    ]
  }
  Es_() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, this.constructor.name, ["TitleKey", this.OpenParam?.TitleKey], ["DataList", this.OpenParam?.DataList])
  }
  async OnBeforeStartAsync() {
    this.Es_(), await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(1),
      t = this.GetItem(2).GetOwner();
    this.ItemLayout = new GenericLayout_1.GenericLayout(e, this.Bqe, t)
  }
  OnBeforeShow() {
    this.UpdateData()
  }
  UpdateData() {
    this.UpdatePos(), this.UpdateTitle(), this.UpdateList()
  }
  UpdatePos() {
    var e = this.OpenParam?.ItemForLocation;
    e && this.GetItem(3).SetUIRelativeLocation(e.RelativeLocation)
  }
  UpdateTitle() {
    var e = this.OpenParam?.TitleKey ?? "Morale_title_22";
    this.GetText(4)?.ShowTextNew(e)
  }
  UpdateList() {
    var e = this.OpenParam?.DataList ?? ModelManager_1.ModelManager.MoraleModel.GetAllRoleAttrAddList();
    this.ItemLayout.RefreshByData(e)
  }
}
exports.MoraleBuffAddTips = MoraleBuffAddTips;
//# sourceMappingURL=MoraleBuffAddTips.js.map