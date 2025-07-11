"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdayRoleSelectView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const BirthdayDefine_1 = require("../BirthdayDefine");
const BirthdayRoleHeadItem_1 = require("./BirthdayRoleHeadItem");
class BirthdayRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.jI1 = undefined;
    this.HI1 = undefined;
    this.DI1 = 0;
    this.fL1 = 0;
    this.Bqe = () => {
      var e = new BirthdayRoleHeadItem_1.BirthdayRoleHeadItem();
      e.OnToggleClickCallBack = this.$I1;
      return e;
    };
    this.$I1 = (e, i) => {
      if (this.HI1 === i) {
        this.HI1 = undefined;
        this.Sfi();
        this.jI1.DeselectCurrentGridProxy();
      } else {
        this.HI1 = i;
        this.Sfi();
        this.jI1.SelectGridProxy(e);
      }
    };
    this.WI1 = () => {
      if (this.HI1) {
        UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "BirthdaySelectConfirmView", new BirthdayDefine_1.BirthdayInfo(this.fL1, this.DI1, this.HI1));
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BirthdayUnSelectedRole");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[3, this.WI1]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.fL1 = e.TriggerType;
    this.DI1 = e.Year;
    this.HI1 = e.RoleId;
    this.jI1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.Bqe);
    var e = ModelManager_1.ModelManager.BirthdayModel.GetRoleIdList();
    await this.jI1.RefreshByDataAsync(e, false, true);
    if (this.HI1) {
      e = e.indexOf(this.HI1);
      this.jI1.SelectGridProxy(e);
      this.jI1.ScrollToGridIndex(e);
    }
    var e = ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(this.DI1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "BirthdaySelectedTip", this.DI1, e.getMonth() + 1, e.getDate());
    this.Sfi();
  }
  Sfi() {
    let e = "";
    if (this.HI1) {
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(RoleInfoById_1.configRoleInfoById.GetConfig(this.HI1).Name);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "BirthdaySelected_Invite", e);
  }
}
exports.BirthdayRoleSelectView = BirthdayRoleSelectView;
//# sourceMappingURL=BirthdayRoleSelectView.js.map