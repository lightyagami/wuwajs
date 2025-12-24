"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevRoleViewItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleController_1 = require("../../RoleController");
const RoleViewViewModel_1 = require("../../View/ViewData/RoleViewViewModel");
const RoleDevDetailItem_1 = require("../Item/RoleDevDetailItem");
const RoleDevController_1 = require("../RoleDevController");
const RoleDevUtils_1 = require("../RoleDevUtils");
class RoleDevRoleViewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.UiViewSequence = undefined;
    this.Wvd = undefined;
    this.OnClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.pnd = undefined;
    this.Pe = undefined;
    this.vpm = undefined;
    this.ypm = undefined;
    this.vnd = () => {
      return new RoleDevDetailItem_1.RoleDevDetailItem();
    };
    this.i9i = () => {
      var e = this.Pe.RoleId;
      if (ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e) !== undefined) {
        RoleDevController_1.RoleDevController.LogRoleDevSubPageClick(e, 1, 1);
        (e = new RoleViewViewModel_1.RoleViewViewModel(e, false)).FadeInCurveId = "RoleFadeInCurve";
        e.FadeOutCurveId = "RoleFadeOutCurve";
        e.NeedShowOnViewPlayingStartSequence = true;
        e.NeedHideOnViewPlayingCloseSequence = true;
        if (this.Pe.IsCanUpgrade) {
          RoleController_1.RoleController.OpenRoleViewByViewModel("RoleLevelUpView", e);
        } else if (this.Pe.IsCanBreach) {
          RoleController_1.RoleController.OpenRoleViewByViewModel("RoleBreachView", e);
        }
      }
    };
    this.U1d = () => {
      UiManager_1.UiManager.OpenView("GachaMainView", this.Pe.GachaId);
    };
    this.Lke = () => false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIVerticalLayout], [9, UE.UIItem], [10, UE.UIText]];
    this.BtnBindInfo = [[6, this.U1d]];
  }
  async OnBeforeStartAsync() {
    this.Qvd();
    this.k1d();
    this.O1d();
    this.q1d();
    return Promise.resolve();
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  Refresh(e) {
    this.Pe = e;
    this.Kvd(e);
    this.P5e(e);
    this.Xvd(e);
    this.F1d(e);
    this.V1d(e);
  }
  Kvd(e) {
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e.RoleId) === 0) {
      const s = {
        Type: 5,
        Data: e,
        RoleId: e.RoleId
      };
      this.Wvd.Apply(s);
    } else {
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.RoleId);
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.RoleId)?.GetRoleSkinId() ?? 0;
      var o = e.RoleLevel;
      const s = {
        Type: 2,
        ItemConfigId: e.RoleId,
        SkinId: i,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [o],
        ElementId: t.ElementId,
        Data: e
      };
      this.Wvd.Apply(s);
    }
  }
  P5e(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.RoleName);
  }
  Xvd(e) {
    this.GetButton(6).RootUIComp.SetUIActive(e.IsCall);
  }
  F1d(e) {
    this.H1d(e);
  }
  V1d(e) {
    this.pnd.RefreshByData(e.DetailItems);
  }
  H1d(e) {
    this.GetItem(3).SetUIActive(true);
    if (ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.RoleId) !== undefined) {
      if (e.RoleLevel !== e.RoleGoalUpgradeLevel || e.RoleLevelIsMax) {
        if (e.RoleLevelIsMax) {
          this.GetText(2).SetUIActive(false);
          this.GetItem(4)?.SetUIActive(false);
          this.GetItem(5)?.SetUIActive(false);
          this.GetItem(7).SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "RoleProject_Tips06");
        } else {
          this.GetText(2).SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RoleProject_TargetLevel", [e.RoleGoalUpgradeLevel]);
          this.pwm(e);
          this.GetItem(7)?.SetUIActive(false);
        }
      } else {
        this.GetText(2).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RoleProject_Tips04");
        this.pwm(e);
        this.GetItem(7)?.SetUIActive(false);
      }
    } else {
      this.GetText(2).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RoleProject_TargetLevel", [e.RoleGoalUpgradeLevel]);
      this.GetItem(4)?.SetUIActive(false);
      this.GetItem(5)?.SetUIActive(false);
      this.GetItem(7)?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "RoleProject_Tips07");
    }
    if (e.IsForecast) {
      this.GetItem(3).SetUIActive(false);
      this.GetText(2).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RoleProject_TargetLevel", [e.RoleGoalUpgradeLevel]);
    }
  }
  pwm(e) {
    if (!ModelManager_1.ModelManager.RoleModel.GetRoleNeedBreakUp(e.RoleId) || ModelManager_1.ModelManager.RoleModel.GetRoleBreachState(e.RoleId) !== 4) {
      this.pxm(e);
    } else {
      this.GetItem(4).SetUIActive(true);
      this.GetItem(5).SetUIActive(false);
      this.vpm?.SetLocalTextNew("RoleProject_Button02");
    }
  }
  pxm(e) {
    (e.IsAllMaterialEnough ? (this.GetItem(4).SetUIActive(false), this.GetItem(5).SetUIActive(true), this.ypm) : (this.GetItem(4).SetUIActive(true), this.GetItem(5).SetUIActive(false), this.vpm))?.SetLocalTextNew("RoleProject_Button01");
  }
  Qvd() {
    this.Wvd = new SmallItemGrid_1.SmallItemGrid();
    this.Wvd.Initialize(this.GetItem(0).GetOwner());
    this.Wvd.BindOnCanExecuteChange(this.Lke);
    this.Wvd.SetExtendToggleEnable(false);
    this.Wvd.SetToggleInteractive(false);
  }
  k1d() {
    this.pnd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(8), this.vnd);
  }
  O1d() {
    this.vpm = new ButtonItem_1.ButtonItem(this.GetItem(4));
    this.vpm.SetLocalTextNew("RoleProject_Button01");
    this.vpm.SetFunction(() => {
      this.i9i();
    });
  }
  q1d() {
    this.ypm = new ButtonItem_1.ButtonItem(this.GetItem(5));
    this.ypm.SetLocalTextNew("RoleProject_Button01");
    this.ypm.SetFunction(() => {
      this.i9i();
    });
  }
}
exports.RoleDevRoleViewItem = RoleDevRoleViewItem;
//# sourceMappingURL=RoleDevRoleViewItem.js.map