"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSelectionView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RoleController_1 = require("../RoleController");
const RoleSelectionMediumItemGrid_1 = require("./RoleSelectionMediumItemGrid");
class RoleSelectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.adi = undefined;
    this.Flo = undefined;
    this.d1o = undefined;
    this.m0o = [];
    this.d0o = undefined;
    this.nVi = undefined;
    this.BackFunction = () => {
      if (this.d0o !== this.nVi) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSystemChangeRole, this.nVi);
      }
      this.CloseMe();
    };
    this.cHe = () => {
      var e = new RoleSelectionMediumItemGrid_1.RoleSelectionMediumItemGrid();
      var i = this.d1o.GetRoleSystemUiParams();
      e.SetNeedShowTrial(i.RoleListNeedTrial);
      e.BindOnExtendToggleStateChanged(this.j5e);
      e.BindOnCanExecuteChange(this.Vbt);
      return e;
    };
    this.C0o = (e, i, t) => {
      this.m0o = e;
      this.g0o(e, i, t);
    };
    this.j5e = e => {
      var i = e.State;
      var e = e.Data;
      if (i === 1) {
        this.Flo.DeselectCurrentGridProxy();
        this.f0o(e);
      }
    };
    this.Vbt = (e, i, t) => {
      return (!UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() || this.nVi === undefined || t !== 0) && (t !== 1 || this.nVi !== e.GetRoleId());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[1, this.BackFunction]];
  }
  OnStart() {
    this.Flo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(4).GetOwner(), this.cHe);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(5), this.C0o);
    this.d1o = this.OpenParam;
    var e = [];
    for (const i of this.d1o.GetRoleIdList()) {
      e.push(ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i));
    }
    this.adi.UpdateData(1, e);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSelectionListUpdate);
    this.adi.Destroy();
    this.adi = undefined;
    this.Flo.ClearGridProxies();
    this.Flo = undefined;
    this.m0o = [];
  }
  OnBeforeShow() {
    var e = this.d1o.GetCurSelectRoleData();
    this.d0o = this.d1o.GetCurSelectRoleId();
    this.f0o(e, true);
  }
  g0o(i, e, t) {
    this.Flo.DeselectCurrentGridProxy();
    this.Flo.ReloadData(i);
    if (this.nVi !== undefined && !(i.length <= 0)) {
      let e = 0;
      if (t === 0) {
        e = (e = i.findIndex(e => e.GetDataId() === this.nVi)) <= 0 ? 0 : e;
      }
      this.Flo.ScrollToGridIndex(e);
      this.Flo.SelectGridProxy(e);
      this.f0o(i[e], true);
    }
  }
  gOt(e) {
    this.GetText(2).SetText(e);
  }
  p0o(e) {
    var i = e.GetDataId();
    var t = this.nVi ?? 0;
    if (this.nVi !== i) {
      this.nVi = i;
      this.gOt(e.GetName());
      this.d1o.SetCurSelectRoleId(this.nVi);
      RoleController_1.RoleController.OnSelectedRoleChange(this.nVi, e.GetRoleSkinId());
      RoleController_1.RoleController.PlayRoleMontage(3, false, t > 0);
    }
  }
  f0o(e, i = false) {
    var t = this.m0o.indexOf(e);
    if (t >= 0) {
      if (i) {
        this.Flo.ScrollToGridIndex(t);
      }
      this.Flo.SelectGridProxy(t);
      this.p0o(e);
    }
  }
}
exports.RoleSelectionView = RoleSelectionView;
//# sourceMappingURL=RoleSelectionView.js.map