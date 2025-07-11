"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillInputView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleSkillInputPanel_1 = require("./RoleSkillInputPanel");
class RoleSkillInputView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Dmo = undefined;
    this.lqe = undefined;
    this.pFe = () => {
      UiManager_1.UiManager.CloseView("RoleSkillInputView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.Dmo = new RoleSkillInputPanel_1.RoleSkillInputPanel();
    var i = this.GetItem(1).GetOwner();
    await this.Dmo.CreateThenShowByActorAsync(i);
    await this.Dmo.RefreshUiAsync(e.GetRoleId(), e.IsTrialRole(), true);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.pFe);
  }
}
exports.RoleSkillInputView = RoleSkillInputView;
//# sourceMappingURL=RoleSkillInputView.js.map