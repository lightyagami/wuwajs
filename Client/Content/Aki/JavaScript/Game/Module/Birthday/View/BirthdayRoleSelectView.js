"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BirthdayRoleSelectView = void 0;
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  BirthdayDefine_1 = require("../BirthdayDefine"),
  BirthdayRoleHeadItem_1 = require("./BirthdayRoleHeadItem");
class BirthdayRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.pI1 = void 0, this.vI1 = void 0, this.lI1 = 0, this.jR1 = 0, this.Bqe = () => {
      var e = new BirthdayRoleHeadItem_1.BirthdayRoleHeadItem;
      return e.OnToggleClickCallBack = this.yI1, e
    }, this.yI1 = (e, i) => {
      this.vI1 === i ? (this.vI1 = void 0, this.Sfi(), this.pI1.DeselectCurrentGridProxy()) : (this.vI1 = i, this.Sfi(), this.pI1.SelectGridProxy(e))
    }, this.SI1 = () => {
      this.vI1 ? UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "BirthdaySelectConfirmView", new BirthdayDefine_1.BirthdayInfo(this.jR1, this.lI1, this.vI1)) : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BirthdayUnSelectedRole")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText]
    ], this.BtnBindInfo = [
      [3, this.SI1]
    ]
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam,
      e = (this.jR1 = e.TriggerType, this.lI1 = e.Year, this.vI1 = e.RoleId, this.pI1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.Bqe), ModelManager_1.ModelManager.BirthdayModel.GetRoleIdList()),
      e = (await this.pI1.RefreshByDataAsync(e, !1, !0), this.vI1 && (e = e.indexOf(this.vI1), this.pI1.SelectGridProxy(e), this.pI1.ScrollToGridIndex(e)), ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(this.lI1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "BirthdaySelectedTip", this.lI1, e.getMonth() + 1, e.getDate()), this.Sfi()
  }
  Sfi() {
    let e = "";
    this.vI1 && (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(RoleInfoById_1.configRoleInfoById.GetConfig(this.vI1).Name)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "BirthdaySelected_Invite", e)
  }
}
exports.BirthdayRoleSelectView = BirthdayRoleSelectView;
//# sourceMappingURL=BirthdayRoleSelectView.js.map