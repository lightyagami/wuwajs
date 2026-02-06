"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyRootView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../../../Ui/UiLayer");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const CommonTabComponentData_1 = require("../../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../../Common/TabComponent/TabComponentWithCaptionItem");
const TabViewComponent_1 = require("../../../../Common/TabComponent/TabViewComponent");
const UiCameraInputComponent_1 = require("../../../../Common/UiCamera/UiCameraInputComponent");
const UiCameraAnimationManager_1 = require("../../../../UiCameraAnimation/UiCameraAnimationManager");
const MotorcycleTabItem_1 = require("../../../Develop/TabItem/MotorcycleTabItem");
const MotorcycleUiModelUtil_1 = require("../../../Model/MotorcycleUiModelUtil");
const MotorcycleDiyDefine_1 = require("../../MotorcycleDiyDefine");
class MotorcycleDiyRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yvt = [];
    this.Ivt = undefined;
    this.Tvt = undefined;
    this.L6e = undefined;
    this.TDe = undefined;
    this.Vyf = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.ZEf = true;
    this.eIf = true;
    this.rmo = undefined;
    this.hIg = 0;
    this.lIg = 0;
    this.q6g = false;
    this.N9g = false;
    this.R6e = (e, t) => {
      var i = new MotorcycleTabItem_1.MotorcycleTabItem();
      i.OnRegisterViewCallback = e => {
        if (e) {
          e.OnTabCameraClick = this.sPg;
        }
      };
      return i;
    };
    this.sPg = e => {
      this.hIg = e;
      this.tIf(e);
      this.Mzf();
    };
    this.Bpt = e => {
      var t;
      return !!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t;
    };
    this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      var t = this.yvt[e];
      var i = t.ChildViewName;
      var e = this.Ivt.GetTabItemByIndex(e);
      if (this.lIg > 0) {
        this.Tvt.ToggleCallBack(t, i, e, this.lIg);
        this.lIg = 0;
      } else {
        this.Tvt.ToggleCallBack(t, i, e);
      }
      this.rmo = i;
    };
    this.yqe = e => {
      e = this.yvt[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.Umf = () => {
      this.Vyf.SetEnableClick(false);
    };
    this.PVi = (e, t, i) => {
      this.Hyf(e, t, i);
    };
    this.iIf = () => {
      this.eIf = !this.eIf;
      this.tIf(3);
      this.Mzf();
    };
    this.$yf = () => {
      var e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList();
      ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorStickerRequest(e);
    };
    this.Fyf = () => {
      this.ZEf = !this.ZEf;
      const e = this.ZEf;
      if (e) {
        this.GetItem(0).SetUIActive(e);
        this.PlaySequence("UiIn", () => {}, true);
        this.CameraInputComponent.End();
      } else {
        this.PlaySequence("UiOut", () => {
          this.GetItem(0).SetUIActive(e);
        }, true);
        this.CameraInputComponent.Start();
        this.CameraInputComponent.TryActivate();
      }
      this.tIf(this.hIg);
    };
    this.CloseClick = () => {
      if (this.q6g) {
        ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectedItemInfo();
        MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadEquippedMotor(() => {
          this.CloseMe();
        });
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIButtonComponent], [5, UE.UIExtendToggle], [6, UE.UIDraggableComponent]];
    this.BtnBindInfo = [[3, this.iIf], [5, this.Fyf]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e) {
      this.rmo = e.OpenTabView;
      this.lIg = e.PartTabIndex ?? 0;
      this.q6g = e.IsNeedResetMotor ?? false;
    }
    this.InitTabComponent();
    this.Vyf = new ButtonItem_1.ButtonItem();
    await Promise.all([this.Vyf.CreateThenShowByActorAsync(this.GetButton(4).RootUIComp.GetOwner()), this.RefreshTabListAsync()]);
    this.Vyf.SetFunction(this.$yf);
    this.Vyf.SetUiActive(false);
  }
  OnHandleLoadScene() {
    var e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedFrameId();
    var t = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList(false);
    var i = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedDecorationIdList(false);
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.CreateMotor();
    var e = {
      FrameId: e,
      StickerIds: t,
      DecorationIds: i
    };
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorByParam(e);
  }
  OnBeforeShow() {
    var e;
    this.G3f();
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(true);
    if (this.Tvt && (e = this.Tvt.GetCurrentTabView())) {
      e.RefreshItemScrollView();
      e.OnTabCameraClick?.(this.hIg);
    }
    if (MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.IsMotorCreated()) {
      e = {
        FrameId: ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedFrameId(),
        StickerIds: ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList(false),
        DecorationIds: ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedDecorationIdList(false)
      };
      MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorByParam(e);
    }
  }
  OnBeforeHide() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(false);
  }
  OnHandleReleaseScene() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.DestroyMotor();
  }
  OnBeforeDestroy() {
    if (this.Ivt) {
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    if (this.Tvt) {
      this.Tvt.DestroyTabViewComponent();
      this.Tvt = undefined;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.Umf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDiyOnSelectToggleClick, this.PVi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.Umf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDiyOnSelectToggleClick, this.PVi);
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(1), e, this.CloseClick);
    this.L6e = undefined;
    this.Ivt.SetCanChange(this.Bpt);
    this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(2));
  }
  G3f() {
    var e;
    var t;
    if (!this.N9g) {
      t = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(MotorcycleDiyDefine_1.MOTORCYCLE_DIY_ROOT_VIEW_CAMERA_CONFIG_ID);
      e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("RoleCase"), 1).D_K2_GetActorLocation();
      t = {
        DragComponent: this.GetDraggable(6),
        CameraSettingConfig: t,
        SourceLocation: e
      };
      this.CameraInputComponent.InitData(t);
      this.N9g = true;
    }
  }
  async RefreshTabListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", true);
    var e;
    var t;
    var i = ModelManager_1.ModelManager.MotorcycleDiyModel.GetMotorDiyTabList();
    var o = this.yvt.toString() !== i.toString();
    this.yvt = i;
    var r = this.yvt.length;
    var a = this.Ivt.CreateTabItemDataByLength(r);
    for (let e = 0; e < r; e++) {
      var n = this.yvt[e].ChildViewName;
      a[e].RedDotName = this.GetRedDotName(n);
    }
    await this.Ivt.RefreshTabItemAsync(a, o).finally(() => {
      UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", false);
    });
    for ([e, t] of this.Ivt.GetTabItemMap()) {
      var s = this.yvt[e].ChildViewName;
      var s = this.GetPreviewRedDotName(s);
      if (s) {
        t.BindPreviewRedDot(s);
      }
    }
    if (o) {
      let t = 0;
      for (let e = 0; e < this.yvt.length; e++) {
        if (this.yvt[e].ChildViewName === this.rmo) {
          t = e;
          break;
        }
      }
      this.Ivt.SelectToggleByIndex(t, true);
    } else {
      this.Tvt?.SetCurrentTabViewState(true);
    }
  }
  GetRedDotName(e) {
    if (e === "MotorcycleDiyFrameTabView") {
      return "MotorcycleDiyFrameTab";
    } else if (e === "MotorcycleDiyStickerTabView") {
      return "MotorcycleDiyStickerTab";
    } else if (e === "MotorcycleDiyDecorationTabView") {
      return "MotorcycleDiyDecorationTab";
    } else {
      return undefined;
    }
  }
  GetPreviewRedDotName(e) {
    if (e === "MotorcycleDiyFrameTabView") {
      return "MotorcycleDiyFramePreTab";
    } else if (e === "MotorcycleDiyStickerTabView") {
      return "MotorcycleDiyStickerPreTab";
    } else if (e === "MotorcycleDiyDecorationTabView") {
      return "MotorcycleDiyDecorationPreTab";
    } else {
      return undefined;
    }
  }
  Hyf(e, t, i) {
    if (e === 3 || e === 1) {
      this.GetExtendToggle(3).RootUIComp.SetUIActive(false);
    } else {
      this.GetExtendToggle(3).RootUIComp.SetUIActive(t === 3);
    }
  }
  n8_() {
    if (this.TDe) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  Mzf() {
    this.n8_();
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorDiyChangeBPartDelay");
    if (e !== undefined) {
      UiLayer_1.UiLayer.SetShowMaskLayer("DiyChangeBPartPos", true);
      this.TDe = TimerSystem_1.RealTimeTimerSystem.Delay(() => {
        this.n8_();
        UiLayer_1.UiLayer.SetShowMaskLayer("DiyChangeBPartPos", false);
      }, e * 1000);
    }
  }
  tIf(t) {
    let i = undefined;
    if (this.rmo === "MotorcycleDiyFrameTabView") {
      i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFramePartConfig();
    } else if (this.rmo === "MotorcycleDiyStickerTabView") {
      if (t > 0) {
        i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerPartConfig(t);
      }
    } else if (this.rmo === "MotorcycleDiyDecorationTabView" && t > 0) {
      i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationPartConfig(t);
    }
    if (i && !(i.CameraIds.length <= 0)) {
      const o = [];
      (this.ZEf ? i.CameraIds : i.DetailCameraIds).forEach((e, t) => {
        o.push(e);
      });
      let e = o[0];
      if (t === 3) {
        e = this.eIf ? o[0] : o[1];
      }
      this.CameraInputComponent.CanCameraInput = !this.ZEf;
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e, true, true, "1001");
    }
  }
}
exports.MotorcycleDiyRootView = MotorcycleDiyRootView;
//# sourceMappingURL=MotorcycleDiyRootView.js.map