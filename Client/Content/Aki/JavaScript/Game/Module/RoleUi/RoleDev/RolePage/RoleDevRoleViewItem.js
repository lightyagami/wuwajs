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
    this.TCd = undefined;
    this.OnClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.nhd = undefined;
    this.Pe = undefined;
    this.aKd = undefined;
    this.hKd = undefined;
    this.ahd = () => {
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
    this.w1d = () => {
      UiManager_1.UiManager.OpenView("GachaMainView", this.Pe.GachaId);
    };
    this.Lke = () => false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIVerticalLayout], [9, UE.UIItem], [10, UE.UIText]];
    this.BtnBindInfo = [[6, this.w1d]];
  }
  async OnBeforeStartAsync() {
    this.bCd();
    this.P1d();
    this.A1d();
    this.D1d();
    return Promise.resolve();
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  Refresh(e) {
    this.Pe = e;
    this.RCd(e);
    this.P5e(e);
    this.wCd(e);
    this.U1d(e);
    this.k1d(e);
  }
  RCd(e) {
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e.RoleId) === 0) {
      const o = {
        Type: 5,
        Data: e,
        RoleId: e.RoleId
      };
      this.TCd.Apply(o);
    } else {
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.RoleId);
      var i = e.RoleLevel;
      const o = {
        Type: 2,
        ItemConfigId: e.RoleId,
        SkinId: t.SkinId,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [i],
        ElementId: t.ElementId,
        Data: e
      };
      this.TCd.Apply(o);
    }
  }
  P5e(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.RoleName);
  }
  wCd(e) {
    this.GetButton(6).RootUIComp.SetUIActive(e.IsCall);
  }
  U1d(e) {
    this.q1d(e);
  }
  k1d(e) {
    this.nhd.RefreshByData(e.DetailItems);
  }
  q1d(e) {
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
          this.kYd(e);
          this.GetItem(7)?.SetUIActive(false);
        }
      } else {
        this.GetText(2).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RoleProject_Tips04");
        this.kYd(e);
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
  kYd(e) {
    if (!ModelManager_1.ModelManager.RoleModel.GetRoleNeedBreakUp(e.RoleId) || ModelManager_1.ModelManager.RoleModel.GetRoleBreachState(e.RoleId) !== 4) {
      this.nzd(e);
    } else {
      this.GetItem(4).SetUIActive(true);
      this.GetItem(5).SetUIActive(false);
      this.aKd?.SetLocalTextNew("RoleProject_Button02");
    }
  }
  nzd(e) {
    (e.IsAllMaterialEnough ? (this.GetItem(4).SetUIActive(false), this.GetItem(5).SetUIActive(true), this.hKd) : (this.GetItem(4).SetUIActive(true), this.GetItem(5).SetUIActive(false), this.aKd))?.SetLocalTextNew("RoleProject_Button01");
  }
  bCd() {
    this.TCd = new SmallItemGrid_1.SmallItemGrid();
    this.TCd.Initialize(this.GetItem(0).GetOwner());
    this.TCd.BindOnCanExecuteChange(this.Lke);
    this.TCd.SetExtendToggleEnable(false);
    this.TCd.SetToggleInteractive(false);
  }
  P1d() {
    this.nhd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(8), this.ahd);
  }
  A1d() {
    this.aKd = new ButtonItem_1.ButtonItem(this.GetItem(4));
    this.aKd.SetLocalTextNew("RoleProject_Button01");
    this.aKd.SetFunction(() => {
      this.i9i();
    });
  }
  D1d() {
    this.hKd = new ButtonItem_1.ButtonItem(this.GetItem(5));
    this.hKd.SetLocalTextNew("RoleProject_Button01");
    this.hKd.SetFunction(() => {
      this.i9i();
    });
  }
}
exports.RoleDevRoleViewItem = RoleDevRoleViewItem;
//# sourceMappingURL=RoleDevRoleViewItem.js.map