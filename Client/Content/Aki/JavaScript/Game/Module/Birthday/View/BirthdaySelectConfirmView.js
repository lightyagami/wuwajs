"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdaySelectConfirmView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById");
const RoleSkinBirthdayById_1 = require("../../../../Core/Define/ConfigQuery/RoleSkinBirthdayById");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
class BirthdaySelectConfirmView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.QI1 = undefined;
    this.AQ1 = false;
    this.KI1 = () => {
      if (!this.AQ1) {
        this.CloseMe();
        this.AQ1 = true;
      }
    };
    this.WI1 = () => {
      if (!this.AQ1) {
        this.gL1();
        UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "BirthdayLetterView", this.QI1, () => {
          UiManager_1.UiManager.CloseView("BirthdayRoleSelectView");
        });
        this.AQ1 = true;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText]];
    this.BtnBindInfo = [[1, this.KI1], [2, this.WI1]];
  }
  OnBeforeShow() {
    this.QI1 = this.OpenParam;
    var e = this.QI1.RoleId;
    let i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.GetRoleSkinId();
    i = i || RoleInfoById_1.configRoleInfoById.GetConfig(e).SkinId;
    var t = RoleSkinBirthdayById_1.configRoleSkinBirthdayById.GetConfig(i);
    if (t && (this.SetTextureByPath(t.RolePortrait, this.GetTexture(0)), t = ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(this.QI1.Year), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "BirthdayConfirmText", this.QI1.Year, t.getMonth() + 1, t.getDate()), t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(RoleInfoById_1.configRoleInfoById.GetConfig(e).Name), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "BirthdaySelected_GO", t), e = ModelManager_1.ModelManager.BirthdayModel.IsRoleSelected(e), this.GetText(4)?.SetUIActive(e), e)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "PrefabTextItem_434004484_Text", t);
    }
  }
  gL1() {
    var e = this.QI1.RoleId;
    var i = new LogReportDefine_1.BirthdaySelectRoleEvent();
    i.i_role_id = e;
    var e = ModelManager_1.ModelManager.BirthdayModel.IsRoleSelected(e);
    i.b_if_selected_role = e;
    var e = ModelManager_1.ModelManager.BirthdayModel.GetBirthdayCount();
    i.i_birthday_count = e + 1;
    i.i_trigger_type = 1;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
  }
}
exports.BirthdaySelectConfirmView = BirthdaySelectConfirmView;
//# sourceMappingURL=BirthdaySelectConfirmView.js.map