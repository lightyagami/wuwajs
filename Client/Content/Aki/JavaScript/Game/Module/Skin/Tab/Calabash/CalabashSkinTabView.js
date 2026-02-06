"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinTabView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const UiCameraHandleData_1 = require("../../../UiCameraAnimation/UiCameraContext/UiCameraHandleData");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SkinObtainItem_1 = require("../../Skip/SkinObtainItem");
const CalabashSkinDefine_1 = require("./CalabashSkinDefine");
const CalabashSkinGridItem_1 = require("./CalabashSkinGridItem");
const CalabashSkinViewProxy_1 = require("./CalabashSkinViewProxy");
class CalabashSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.L9m = undefined;
    this.yil = undefined;
    this.GridLayout = undefined;
    this.ObtainLayout = undefined;
    this.HuluObserver = undefined;
    this.TsUiSceneRoleActor = undefined;
    this.Draggable = undefined;
    this.TimeHandler = undefined;
    this.W2e = () => {
      var i = new CalabashSkinGridItem_1.CalabashSkinGridItem();
      i.BindOnExtendToggleStateChanged(this.V9m);
      i.BindOnCanExecuteChange(this.yil.CalabashGridItemCanExecuteChange);
      return i;
    };
    this.qil = () => new SkinObtainItem_1.SkinObtainItem();
    this.fTu = i => {
      var e;
      var t;
      if (i === 1) {
        t = this.yil.GetDataIndexBySkinId(this.yil.PrevEquipSkinId);
        e = this.yil.GetDataIndexBySkinId(this.yil.GetSelectedSkinId());
        this.RefreshGridSelect(t, e);
        this.RefreshConfirmBox(true);
        this.ShowEquipTips();
        this.RefreshMainRoleHulu();
      } else if (i === 2) {
        t = this.yil.GetSelectedSkinId();
        this.j9m();
        this.SwitchHuluObserver(t);
      }
    };
    this.q9m = () => this.GetDraggable(9);
    this.mmo = i => {
      if (i.ViewName === "CalabashSkinTabView" && this.yil.NeedLoadModel) {
        this.yil.NeedLoadModel = false;
        this.xBd(this.yil.GetSelectedSkinId());
      }
    };
    this.H9m = i => {
      if (i === 1) {
        this.ShowView();
        this.L9m.SetRootUiVisible(true);
        this.SwitchHuluRotate(false);
        this.kBd();
        this.ResetCamera();
      } else {
        this.HideView();
        this.L9m.SetRootUiVisible(false);
        this.SwitchHuluRotate(this.yil.NeedStopRotate);
        this.OBd();
      }
    };
    this.$9m = async () => {
      if (!this.TimeHandler) {
        if (ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip()) {
          if (await ControllerHolder_1.ControllerHolder.CalabashSkinController.RequestCalabashSkinTakeOn(this.yil.GetSelectedSkinId())) {
            this.yil.SetEquipSkinId(this.yil.GetSelectedSkinId());
          }
        } else {
          this.qBd();
        }
      }
    };
    this.V9m = i => {
      i = i.Data.SkinId;
      this.yil.SetSelectedSkinId(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILayoutBase], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIButtonComponent], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIDraggableComponent]];
    this.BtnBindInfo = [[3, this.H9m], [4, this.$9m]];
  }
  OnStart() {
    this.L9m = this.ExtraParams;
    this.yil = new CalabashSkinViewProxy_1.CalabashSkinViewProxy();
    this.yil.Init(this.L9m.ViewData);
    this.yil.SetGetDragItemFunc(this.q9m);
    this.yil.Bind(this.fTu);
    this.Draggable = this.GetDraggable(9);
    this.Draggable.RootUIComp.SetUIActive(false);
    this.uvt();
    this.UBd();
    this.TsUiSceneRoleActor = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    this.ObtainLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(5), this.qil, this.GetItem(6).GetOwner());
    this.GetExtendToggle(3)?.SetToggleState(1);
  }
  OnBeforeShow() {
    this.L9m.SetModelState(3);
    this.j9m();
    this.TryPushCamera();
  }
  async OnBeforeShowAsyncImplement() {
    await this.GridLayout.RefreshByDataAsync(this.yil.GetSkinDataList());
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnBeforeHide() {
    this.BBd();
  }
  OnBeforeDestroy() {
    this.yil.UnBind(this.fTu);
    this.ReleaseHuluObserver();
    this.FBd();
  }
  uvt() {
    this.GridLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(1), this.W2e, this.GetItem(2).GetOwner());
  }
  UBd() {
    this.HuluObserver = UiSceneManager_1.UiSceneManager.InitHuluObserver();
    var i = this.HuluObserver.Model;
    i.CheckGetComponent(1)?.SetTransformByTag(CalabashSkinDefine_1.DEFAULT_CALABASH_SKIN_CASE);
    i.CheckGetComponent(0)?.SetLoadingIconFollowState(false);
  }
  BBd() {
    if (this.HuluObserver) {
      UiSceneManager_1.UiSceneManager.HideObserver(this.HuluObserver, "ShowHideWeaponEffect");
    }
  }
  xBd(i) {
    ControllerHolder_1.ControllerHolder.CalabashSkinController.SelectedCalabashSkinChange(i, this.L9m.RoleId, this.HuluObserver?.Model);
  }
  SwitchHuluRotate(i) {
    var e = this.HuluObserver?.Model?.CheckGetComponent(9);
    if (i) {
      e?.StopRotate();
    } else {
      e?.StartRotate();
    }
  }
  ReleaseHuluObserver() {
    if (this.HuluObserver) {
      UiSceneManager_1.UiSceneManager.HideObserverWithCallback(this.HuluObserver, "ShowHideWeaponEffect", i => {
        UiSceneManager_1.UiSceneManager.DestroyHuluObserver();
      });
    }
  }
  HideView() {
    this.Draggable.RootUIComp.SetUIActive(true);
    this.GetItem(0)?.SetUIActive(false);
    this.L9m.SetRootUiVisible(false);
    this.L9m.SetMoveGamepadKeyTipActive(true);
  }
  ShowView() {
    this.L9m.SetMoveGamepadKeyTipActive(false);
    this.GetItem(0)?.SetUIActive(true);
    this.L9m.SetRootUiVisible(true);
    this.Draggable.RootUIComp.SetUIActive(false);
  }
  SelectedGrid(i) {
    this.GridLayout.DeselectCurrentGridProxy();
    this.GridLayout.SelectGridProxy(i, true);
  }
  RefreshText(i, e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e);
  }
  RefreshConfirmBox(i) {
    this.GetButton(4)?.SetSelfInteractive(!i);
  }
  RefreshGridSelect(i, e) {
    this.GridLayout.GetLayoutItemByIndex(i)?.RefreshVisible();
    this.GridLayout.GetLayoutItemByIndex(e)?.RefreshVisible();
  }
  RefreshBottom(i, e) {
    var t = i.GetIsLock();
    this.GetButton(4)?.RootUIComp.SetUIActive(!t);
    this.ObtainLayout.SetActive(t);
    if (t) {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(i.SkinId);
      i = this.L9m.GetSkinSkipDataList(i.SkinId, t.ItemAccess);
      this.ObtainLayout.SetActive(i.length !== 0);
      if (i.length > 0) {
        this.ObtainLayout.RefreshByData(i);
      }
    } else {
      this.GetButton(4)?.SetSelfInteractive(!e);
    }
  }
  ShowEquipTips() {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TerminalSkin_Change_Success");
  }
  SwitchHuluObserver(i) {
    ControllerHolder_1.ControllerHolder.CalabashSkinController.SelectedCalabashSkinChange(i, this.L9m.RoleId, this.HuluObserver?.Model);
  }
  RefreshMainRoleHulu() {
    var i = this.TsUiSceneRoleActor.Model?.GetComponent(18);
    if (i) {
      i.Refresh();
    }
  }
  j9m() {
    var i = this.yil.GetSelectedSkinId();
    var e = this.yil.GetDataIndexBySkinId(i);
    var t = this.yil.GetSkinDataByIndex(e);
    this.RefreshBottom(t, this.yil.GetEquipSkinId() === i);
    this.RefreshText(t.Name, t.Description);
    this.SelectedGrid(e);
  }
  qBd() {
    this.TimeHandler ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.TimeHandler = undefined;
    }, this.yil.FailRequestCd);
  }
  FBd() {
    if (this.TimeHandler) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimeHandler);
      this.TimeHandler = undefined;
    }
  }
  NBd() {
    var i;
    if (this.L9m.CameraInputComponent) {
      i = this.yil.GetCalabashSkinTabCameraInputData();
      this.L9m.CameraInputComponent.InitData(i);
    }
  }
  OBd() {
    if (this.L9m.CameraInputComponent) {
      this.NBd();
      this.L9m.CameraInputComponent.CanCameraInput = true;
      this.L9m.CameraInputComponent.Start();
      this.L9m.CameraInputComponent.Activate();
    }
  }
  kBd() {
    if (this.L9m.CameraInputComponent) {
      this.L9m.CameraInputComponent.CanCameraInput = false;
      this.L9m.CameraInputComponent.End();
    }
  }
  ResetCamera() {
    var i = UiCameraHandleData_1.UiCameraHandleData.NewByView("CalabashSkinTabView");
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandle(i, true, true, "1001");
  }
  TryPushCamera() {
    this.yil.NeedLoadModel = true;
    var i = UiCameraHandleData_1.UiCameraHandleData.NewByView("CalabashSkinTabView");
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandle(i, true, true, "10010");
  }
}
exports.CalabashSkinTabView = CalabashSkinTabView;
//# sourceMappingURL=CalabashSkinTabView.js.map