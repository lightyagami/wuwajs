"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTogetherView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const MotorRoleCategoryAll_1 = require("../../../Core/Define/ConfigQuery/MotorRoleCategoryAll");
const VehicleRidingRolesById_1 = require("../../../Core/Define/ConfigQuery/VehicleRidingRolesById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../Common/Button/ButtonItem");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const AreaSwitchGroupItem_1 = require("./Components/AreaSwitchGroupItem");
const MotorcycleTogetherRoleItem_1 = require("./Components/MotorcycleTogetherRoleItem");
class MotorcycleTogetherView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.raf = undefined;
    this.Flo = undefined;
    this.DLu = undefined;
    this.zo_ = 0;
    this.s0f = undefined;
    this.oaf = e => {
      this.HLu(e);
    };
    this.I2i = () => {
      var e = new MotorcycleTogetherRoleItem_1.MotorcycleTogetherRoleItem();
      e.OnClickToggleCallBack = this.tbl;
      e.IsToggleSelectOn = this.naf;
      return e;
    };
    this.tbl = (e, t, i) => {
      this.Flo.DeselectCurrentGridProxy();
      if (e) {
        this.zo_ = t;
        this.Flo.SelectGridProxy(i, false);
      } else {
        this.zo_ = 0;
      }
      this.saf();
    };
    this.naf = e => this.zo_ === e;
    this.L3e = () => {
      var e;
      if (ModelManager_1.ModelManager.ShipTogetherModel.IsInMovieRideSharingMode) {
        e = ModelManager_1.ModelManager.ShipTogetherModel.RiderSharingRoleId;
        if (this.zo_ !== 0 && this.zo_ !== e) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeRideSharingPassenger, this.zo_, 1);
        } else if (this.zo_ === 0 && e !== 0) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveRideSharingPassenger, -1, -1);
        }
        this.CloseMe();
      }
    };
    this.DSi = () => {
      if (ModelManager_1.ModelManager.ShipTogetherModel?.RiderSharingState && ModelManager_1.ModelManager.ShipTogetherModel.IsInMovieRideSharingMode && this.s0f === undefined) {
        this.a0f();
      }
    };
    this.$gf = (e, t) => {
      this.s0f?.SetResult();
      this.s0f = undefined;
      if (!e) {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, this.DSi]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Flo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.I2i, true);
    this.raf = new AreaSwitchGroupItem_1.AreaSwitchGroupItem();
    this.raf.OnSwitchCallBack = this.oaf;
    await this.raf.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.DLu = new ButtonItem_1.ButtonItem();
    await this.DLu.CreateThenShowByActorAsync(this.GetButton(4).GetOwner());
    this.DLu.SetFunction(this.L3e);
    this.fA_();
  }
  fA_() {
    var e;
    var t = [...(MotorRoleCategoryAll_1.configMotorRoleCategoryAll.GetConfigList() ?? [])].sort((e, t) => e.SortId - t.SortId).map(e => e.Id);
    this.zo_ = ModelManager_1.ModelManager.ShipTogetherModel.RiderSharingRoleId;
    let i = 0;
    if (this.zo_ !== 0 && (e = VehicleRidingRolesById_1.configVehicleRidingRolesById.GetConfig(this.zo_))) {
      i = e.RegionId;
    }
    this.raf.RefreshAreaList(t, i);
  }
  OnBeforeShow() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, this.$gf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, this.$gf);
  }
  HLu(e) {
    var t;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    const o = [];
    for (const s of i) {
      if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(s.GetRoleId())) {
        if ((t = VehicleRidingRolesById_1.configVehicleRidingRolesById.GetConfig(s.GetRoleId())) && t.RegionId === e) {
          o.push(s);
        }
      }
    }
    o.sort((e, t) => {
      var i = e.GetFavorData().GetFavorLevel();
      var o = t.GetFavorData().GetFavorLevel();
      if (i !== o) {
        return o - i;
      } else {
        return e.GetRoleId() - t.GetRoleId();
      }
    });
    var i = o.length !== 0;
    this.GetItem(6).SetUIActive(!i);
    var r = this.GetLoopScrollViewComponent(2);
    r.RootUIComp.SetUIActive(i);
    if (i) {
      r.StopMovement();
      this.Flo.RefreshByData(o, false, () => {
        var e;
        if (this.zo_ <= 0 || (e = o.findIndex(e => e.GetRoleId() === this.zo_)) < 0) {
          this.Flo.ScrollToGridIndex(0);
        } else {
          this.Flo.ScrollToGridIndex(e);
          this.Flo.DeselectCurrentGridProxy();
          this.Flo.SelectGridProxy(e, false);
        }
      }, true);
    }
    this.saf();
  }
  saf() {
    var e = this.zo_ !== 0;
    this.DLu.SetLocalTextNew(e ? "MotorSharingRide_Button01" : "MotorSharingRide_Button02");
  }
  async a0f() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3, ModelManager_1.ModelManager.ShipTogetherModel?.MotorSharingRideBlackScreenLoad);
    if (ModelManager_1.ModelManager.ShipTogetherModel?.RiderSharingState) {
      this.s0f = new CustomPromise_1.CustomPromise();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, false, false);
      await this.s0f.Promise;
      await TimerSystem_1.GameplayTimerSystem.Wait(ModelManager_1.ModelManager.ShipTogetherModel.MotorSharingRideBlackScreenQuit * MathUtils_1.MathUtils.SecondToMillisecond);
    }
    ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
  }
}
exports.MotorcycleTogetherView = MotorcycleTogetherView;
//# sourceMappingURL=MotorcycleTogetherView.js.map