"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdaySelectConfirmView = undefined;
const UE = require("ue");
const BirthDayByYear_1 = require("../../../../Core/Define/ConfigQuery/BirthDayByYear");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
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
  GetExtraResourceId(e) {
    if (e) {
      return ModelManager_1.ModelManager.BirthdayModel.GetSelectConfirmViewResource(e.Year);
    } else {
      return "";
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[1, this.KI1], [2, this.WI1]];
  }
  OnBeforeShow() {
    this.QI1 = this.OpenParam;
    var e = this.QI1.RoleId;
    let i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.GetRoleSkinId();
    i = i || RoleInfoById_1.configRoleInfoById.GetConfig(e).SkinId;
    var r = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i)?.FormationRoleCard;
    if (r) {
      this.SetTextureByPath(r, this.GetTexture(0));
    }
    var r = ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(this.QI1.Year);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "BirthdayConfirmText", this.QI1.Year, r.getMonth() + 1, r.getDate());
    var r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(RoleInfoById_1.configRoleInfoById.GetConfig(e).Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "BirthdaySelected_GO", r);
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
    var e = BirthDayByYear_1.configBirthDayByYear.GetConfig(this.QI1.Year);
    i.bird_round_id = e.Id;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
  }
}
exports.BirthdaySelectConfirmView = BirthdaySelectConfirmView;
//# sourceMappingURL=BirthdaySelectConfirmView.js.map