"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBreachSuccessView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoleController_1 = require("../RoleController");
const StarItem_1 = require("../View/StarItem");
class RoleBreachSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.SuccessStarItem = undefined;
    this.StarLayout = undefined;
    this.StarList = [];
    this.MaskClick = () => {
      RoleController_1.RoleController.SendRoleLevelUpViewRequestWithOpenView(this.dFe, "RoleBreachSuccessView");
    };
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [0, UE.UIHorizontalLayout], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[1, this.MaskClick]];
  }
  async OnBeforeStartAsync() {
    this.dFe = this.OpenParam;
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetLevelData();
    var t = e.GetBreachLevel();
    var r = e.GetMaxBreachLevel();
    var i = e.GetLevel();
    var e = e.GetCurrentMaxLevel();
    this.GetText(2).SetText(i.toString());
    this.GetText(3).SetText(e.toString());
    this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.vke);
    await this.UpdateStar(t, r);
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      e.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
    }
    RoleController_1.RoleController.PlayRoleMontage(3, true);
  }
  OnAfterPlayStartSequence() {
    this.SuccessStarItem?.PlayActiveSequence();
  }
  async UpdateStar(e, t) {
    var r = e - 1;
    if (!(r < 0)) {
      var i = new Array(t);
      for (let e = 0; e < t; ++e) {
        var a = {
          StarOnActive: e < r,
          StarOffActive: e >= r,
          StarNextActive: false,
          StarLoopActive: false,
          PlayLoopSequence: false,
          PlayActivateSequence: false
        };
        i[e] = a;
      }
      await this.StarLayout.RefreshByDataAsync(i);
      this.SuccessStarItem = this.StarLayout.GetLayoutItemByIndex(r);
    }
  }
}
exports.RoleBreachSuccessView = RoleBreachSuccessView;
//# sourceMappingURL=RoleBreachSuccessView.js.map