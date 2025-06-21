"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BirthdaySelectConfirmView = void 0;
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById"),
  RoleSkinBirthdayById_1 = require("../../../../Core/Define/ConfigQuery/RoleSkinBirthdayById"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LogReportDefine_1 = require("../../LogReport/LogReportDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class BirthdaySelectConfirmView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.MI1 = void 0, this.QW1 = !1, this.EI1 = () => {
      this.QW1 || (UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "BirthdayRoleSelectView", this.MI1), this.QW1 = !0)
    }, this.SI1 = () => {
      this.QW1 || (this.HR1(), UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "BirthdayLetterView", this.MI1), this.QW1 = !0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText]
    ], this.BtnBindInfo = [
      [1, this.EI1],
      [2, this.SI1]
    ]
  }
  OnBeforeShow() {
    this.MI1 = this.OpenParam;
    var e = this.MI1.RoleId;
    let i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.GetRoleSkinId();
    i = i || RoleInfoById_1.configRoleInfoById.GetConfig(e).SkinId;
    var t = RoleSkinBirthdayById_1.configRoleSkinBirthdayById.GetConfig(i);
    t && (this.SetTextureByPath(t.RolePortrait, this.GetTexture(0)), t = ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(this.MI1.Year), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "BirthdayConfirmText", this.MI1.Year, t.getMonth() + 1, t.getDate()), t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(RoleInfoById_1.configRoleInfoById.GetConfig(e).Name), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "BirthdaySelected_GO", t), e = ModelManager_1.ModelManager.BirthdayModel.IsRoleSelected(e), this.GetText(4)?.SetUIActive(e), e) && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "PrefabTextItem_434004484_Text", t)
  }
  HR1() {
    var e = this.MI1.RoleId,
      i = new LogReportDefine_1.BirthdaySelectRoleEvent,
      e = (i.i_role_id = e, ModelManager_1.ModelManager.BirthdayModel.IsRoleSelected(e)),
      e = (i.b_if_selected_role = e, ModelManager_1.ModelManager.BirthdayModel.GetBirthdayCount());
    i.i_birthday_count = e + 1, i.i_trigger_type = 1, ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i)
  }
}
exports.BirthdaySelectConfirmView = BirthdaySelectConfirmView;
//# sourceMappingURL=BirthdaySelectConfirmView.js.map