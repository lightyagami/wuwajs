"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyRootView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
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
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
class MotorcycleDiyRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yvt = [];
    this.Ivt = undefined;
    this.Tvt = undefined;
    this.L6e = undefined;
    this.rmo = undefined;
    this.npf = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.TDe = undefined;
    this.Yyf = true;
    this.zyf = true;
    this.zFf = 0;
    this.R6e = (e, t) => {
      return new MotorcycleTabItem_1.MotorcycleTabItem();
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
      this.Tvt.ToggleCallBack(t, i, e);
      this.rmo = i;
    };
    this.yqe = e => {
      e = this.yvt[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.kcf = () => {
      this.npf.SetEnableClick(false);
    };
    this.PVi = (e, t) => {
      if (this.zFf !== e) {
        this.zFf = e;
        this.spf(e, t);
        this.Jyf(e);
        this.m6f();
      }
    };
    this.Zyf = () => {
      this.zyf = !this.zyf;
      this.Jyf(3);
      this.m6f();
    };
    this.hpf = () => {
      var e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList();
      ControllerHolder_1.ControllerHolder.MotorcycleDiyController.EquipMotorStickerRequest(e);
    };
    this.rpf = () => {
      this.Yyf = !this.Yyf;
      const e = this.Yyf;
      if (e) {
        this.GetItem(0).SetUIActive(e);
        this.PlaySequence("UiIn", () => {}, true);
      } else {
        this.PlaySequence("UiOut", () => {
          this.GetItem(0).SetUIActive(e);
        }, true);
      }
      this.Jyf(this.zFf);
    };
    this.CloseClick = () => {
      ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectStickerInfo();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIButtonComponent], [5, UE.UIExtendToggle], [6, UE.UIDraggableComponent]];
    this.BtnBindInfo = [[3, this.Zyf], [5, this.rpf]];
  }
  async OnBeforeStartAsync() {
    this.InitTabComponent();
    this.npf = new ButtonItem_1.ButtonItem();
    await Promise.all([this.npf.CreateThenShowByActorAsync(this.GetButton(4).RootUIComp.GetOwner()), this.RefreshTabListAsync()]);
    this.npf.SetFunction(this.hpf);
    this.npf.SetUiActive(false);
  }
  OnHandleLoadScene() {
    var e = ModelManager_1.ModelManager.MotorcycleDiyModel.CurSkinId;
    var t = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerIdList(false);
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.CreateMotor();
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorByParam(e, t);
  }
  OnBeforeShow() {
    this.jkf();
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(true);
    if (this.zFf !== 0 && (this.Jyf(this.zFf), this.m6f(), this.Tvt) && this.Tvt.GetCurrentTabViewName() === "MotorcycleDiyStickerTabView") {
      this.Tvt.GetCurrentTabView()?.RefreshPartScrollView();
    }
  }
  OnAfterShow() {
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
  }
  OnBeforeHide() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(false);
    this.CameraInputComponent.End();
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.kcf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDiyOnSelectToggleClick, this.PVi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDiyInfoUpdate, this.kcf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDiyOnSelectToggleClick, this.PVi);
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(1), e, this.CloseClick);
    this.L6e = undefined;
    this.Ivt.SetCanChange(this.Bpt);
    this.Ivt.SetTabComponentShowState(false);
    this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(2));
  }
  jkf() {
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(MotorcycleDiyDefine_1.MOTORCYCLE_DIY_ROOT_VIEW_CAMERA_CONFIG_ID);
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("RoleCase"), 1).D_K2_GetActorLocation();
    var e = {
      DragComponent: this.GetDraggable(6),
      CameraSettingConfig: e,
      SourceLocation: t
    };
    this.CameraInputComponent.InitData(e);
  }
  async RefreshTabListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", true);
    var e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetMotorDiyTabList();
    var t = this.yvt.toString() !== e.toString();
    this.yvt = e;
    var i = this.yvt.length;
    var o = this.Ivt.CreateTabItemDataByLength(i);
    for (let e = 0; e < i; e++) {
      var n = this.yvt[e].ChildViewName;
      o[e].RedDotName = this.GetRedDotName(n);
    }
    await this.Ivt.RefreshTabItemAsync(o, t).finally(() => {
      UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", false);
    });
    if (t) {
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
    if (e === "MotorcycleDiyStickerTabView") {
      return "MotorcycleDiyStickerTab";
    }
  }
  spf(e, t) {
    this.GetExtendToggle(3).RootUIComp.SetUIActive(e === 3);
  }
  n8_() {
    if (this.TDe) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  m6f() {
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
  Jyf(t) {
    var i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerPartConfig(t);
    if (i && !(i.CameraIds.length <= 0)) {
      const o = [];
      (this.Yyf ? i.CameraIds : i.DetailCameraIds).forEach((e, t) => {
        o.push(e);
      });
      let e = o[0];
      if (t === 3) {
        e = this.zyf ? o[0] : o[1];
      }
      this.CameraInputComponent.CanCameraInput = !this.Yyf;
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e, true, true, "1001");
    }
  }
}
exports.MotorcycleDiyRootView = MotorcycleDiyRootView;
//# sourceMappingURL=MotorcycleDiyRootView.js.map