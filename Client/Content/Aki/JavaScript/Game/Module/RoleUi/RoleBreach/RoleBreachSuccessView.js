"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBreachSuccessView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
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
    this.yil = undefined;
    this.MaskClick = () => {
      var e;
      UiManager_1.UiManager.CloseView("RoleBreachView");
      if (ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetLevelData().GetRoleIsMaxLevel()) {
        UiManager_1.UiManager.CloseView("RoleBreachSuccessView");
      } else {
        e = this.yil;
        RoleController_1.RoleController.CloseAndOpenRoleViewByViewModel("RoleBreachSuccessView", "RoleLevelUpView", e);
      }
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
    var e;
    var t;
    var i;
    var r = this.OpenParam;
    if (r) {
      this.yil = r;
      this.dFe = r.RoleId;
      e = (r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetLevelData()).GetBreachLevel();
      t = r.GetMaxBreachLevel();
      i = r.GetLevel();
      r = r.GetCurrentMaxLevel();
      this.GetText(2).SetText(i.toString());
      this.GetText(3).SetText(r.toString());
      this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.vke);
      await this.UpdateStar(e, t);
      await this.yil?.InitRoleActor();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 78, "RoleBreachSuccessView OpenParam is not valid");
    }
  }
  OnHandleLoadScene() {
    this.yil.HandleLoadScene(() => {
      RoleController_1.RoleController.PlayRoleMontage(3, false, true);
    });
  }
  OnHandleReleaseScene() {
    this.yil.HandleReleaseScene();
  }
  OnAfterPlayStartSequence() {
    this.SuccessStarItem?.PlayActiveSequence();
  }
  async UpdateStar(e, t) {
    var i = e - 1;
    if (!(i < 0)) {
      var r = new Array(t);
      for (let e = 0; e < t; ++e) {
        var a = {
          StarOnActive: e < i,
          StarOffActive: e >= i,
          StarNextActive: false,
          StarLoopActive: false,
          PlayLoopSequence: false,
          PlayActivateSequence: false
        };
        r[e] = a;
      }
      await this.StarLayout.RefreshByDataAsync(r);
      this.SuccessStarItem = this.StarLayout.GetLayoutItemByIndex(i);
    }
  }
}
exports.RoleBreachSuccessView = RoleBreachSuccessView;
//# sourceMappingURL=RoleBreachSuccessView.js.map