"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookRoleView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const RoleRobotData_1 = require("../RoleUi/RoleData/RoleRobotData");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const HandBookRoleMediumItemGird_1 = require("./HandBookRoleMediumItemGird");
class HandBookRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.RoleScrollView = undefined;
    this.lqe = undefined;
    this.xVi = undefined;
    this.adi = undefined;
    this.nVi = undefined;
    this.m0o = [];
    this.C0o = e => {
      this.m0o = e;
      this.g0o(e);
    };
    this.cHe = () => {
      var e = new HandBookRoleMediumItemGird_1.HandBookRoleMediumItemGird();
      e.BindOnExtendToggleStateChanged(this.j5e);
      e.BindOnCanExecuteChange(this.Vbt);
      return e;
    };
    this.j5e = e => {
      var i = e.State;
      var e = e.Data;
      if (i === 1) {
        this.RoleScrollView.DeselectCurrentGridProxy();
        this.f0o(e);
      }
    };
    this.Vbt = (e, i, t) => {
      return (!UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() || this.nVi === undefined || t !== 0) && (t !== 1 || this.nVi !== e.GetDataId());
    };
    this.$lo = () => {
      var e = [ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(this.nVi)?.TrialRole];
      ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(1, 0, e, undefined, () => {});
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIText]];
    this.BtnBindInfo = [[5, this.$lo]];
  }
  OnBeforeCreate() {
    this.xVi = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
  }
  OnStart() {
    this.RoleScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.cHe);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetTitleLocalText("HandBookRoleTitle");
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(4), this.C0o);
    var e = [];
    for (const t of (ConfigManager_1.ConfigManager.RoleConfig?.GetRoleList()).filter(e => e.RoleType === 1 && !ModelManager_1.ModelManager.RoleModel.IsMainRole(e.Id) && ModelManager_1.ModelManager.HandBookModel.GetRoleCanShowInHandBook(e.Id))) {
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.Id);
      e.push(i || new RoleRobotData_1.RoleRobotData(t.TrialRole));
    }
    e.push(ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance());
    this.adi.UpdateData(21, e);
    this.InitRole();
    this.RefreshCollectText();
  }
  RefreshCollectText() {
    var e = ControllerHolder_1.ControllerHolder.HandBookController.GetCollectProgress(10);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "RoleExp", e[0], e[1]);
  }
  OnHandleLoadScene() {
    this.InitRole();
  }
  OnBeforeShow() {
    UiSceneManager_1.UiSceneManager.SetSceneFloorReflection(true, false);
  }
  InitRole() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor().Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  g0o(t) {
    this.RoleScrollView.DeselectCurrentGridProxy();
    this.RoleScrollView.RefreshByData(t, false, () => {
      let e = 0;
      for (const i of t) {
        if (i.GetDataId() === this.nVi) {
          this.RoleScrollView.ScrollToGridIndex(e);
          this.RoleScrollView.SelectGridProxy(e);
          return;
        }
        e++;
      }
      this.f0o(this.m0o[0], true);
    });
  }
  f0o(e, i = false) {
    var t = this.m0o.indexOf(e);
    if (t >= 0) {
      if (i) {
        this.RoleScrollView.ScrollToGridIndex(t);
      }
      this.RoleScrollView.SelectGridProxy(t);
      this.p0o(e);
    }
  }
  p0o(e) {
    var i;
    var t;
    var o = e.GetDataId();
    var r = this.nVi ?? 0;
    if (this.nVi !== o) {
      this.nVi = o;
      this.gOt(e.GetName());
      i = this.GetText(6);
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("HandBookRoleGetDate");
      if (o < RoleDefine_1.ROBOT_DATA_MIN_ID) {
        i.SetUIActive(true);
        i.SetText(t + TimeUtil_1.TimeUtil.DateFormat4(new Date(e.GetRoleCreateTime() * TimeUtil_1.TimeUtil.InverseMillisecond)));
      } else {
        i.SetUIActive(false);
      }
      ControllerHolder_1.ControllerHolder.RoleController.OnSelectedRoleChange(this.nVi, e.GetRoleConfig().SkinId);
      ControllerHolder_1.ControllerHolder.RoleController.PlayRoleMontage(3, false, r > 0);
    }
  }
  gOt(e) {
    this.GetText(1).SetText(e);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.xVi);
    this.RoleScrollView = undefined;
  }
}
exports.HandBookRoleView = HandBookRoleView;
//# sourceMappingURL=HandBookRoleView.js.map