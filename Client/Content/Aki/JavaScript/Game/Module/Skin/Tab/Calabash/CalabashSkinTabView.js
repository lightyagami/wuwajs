"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SkinObtainItem_1 = require("../../Skip/SkinObtainItem");
const CalabashSkinDefine_1 = require("./CalabashSkinDefine");
const CalabashSkinGridItem_1 = require("./CalabashSkinGridItem");
class CalabashSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.yil = undefined;
    this.GridLayout = undefined;
    this.ObtainLayout = undefined;
    this.HuluObserver = undefined;
    this.TsUiSceneRoleActor = undefined;
    this.Draggable = undefined;
    this.W2e = () => {
      var e = new CalabashSkinGridItem_1.CalabashSkinGridItem();
      e.BindOnExtendToggleStateChanged(this.yil.CalabashSkinViewProxy.CalabashGridItemClick);
      e.BindOnCanExecuteChange(this.yil.CalabashSkinViewProxy.CalabashGridItemCanExecuteChange);
      return e;
    };
    this.qil = () => new SkinObtainItem_1.SkinObtainItem();
    this.mmo = e => {
      if (e.ViewName === "CalabashSkinTabView" && this.yil.CalabashSkinViewProxy.NeedLoadModel) {
        this.yil.CalabashSkinViewProxy.NeedLoadModel = false;
        this.FDd(this.yil.CalabashSkinViewProxy.SelectedSkinId);
      }
    };
  }
  OnRegisterComponent() {
    this.yil = this.ExtraParams;
    this.yil.CalabashSkinViewProxy.RegisterView(this, this.yil);
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILayoutBase], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIButtonComponent], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIDraggableComponent]];
    this.BtnBindInfo = [[3, this.yil.CalabashSkinViewProxy.CalabashHideUiClick], [4, this.yil.CalabashSkinViewProxy.CalabashConfirmClick]];
  }
  OnStart() {
    this.Draggable = this.GetDraggable(9);
    this.Draggable.RootUIComp.SetUIActive(false);
    this.yil.CalabashSkinViewProxy.InitSkinDataList();
    this.uvt();
    this.GDd();
    this.TsUiSceneRoleActor = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    this.ObtainLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(5), this.qil, this.GetItem(6).GetOwner());
    this.GetExtendToggle(3)?.SetToggleState(1);
  }
  OnBeforeShow() {
    this.yil.ChangeModelState(3);
    this.yil.CalabashSkinViewProxy.InitGridSelected();
    this.yil.CalabashSkinViewProxy.TryPushCamera();
  }
  async OnBeforeShowAsyncImplement() {
    await this.GridLayout.RefreshByDataAsync(this.yil.CalabashSkinViewProxy.SkinDataList);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnBeforeHide() {
    this.NDd();
  }
  OnBeforeDestroy() {
    this.yil.CalabashSkinViewProxy.BeforeDestroy();
  }
  uvt() {
    this.GridLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(1), this.W2e, this.GetItem(2).GetOwner());
  }
  GDd() {
    this.HuluObserver = UiSceneManager_1.UiSceneManager.InitHuluObserver();
    var e = this.HuluObserver.Model;
    e.CheckGetComponent(1)?.SetTransformByTag(CalabashSkinDefine_1.DEFAULT_CALABASH_SKIN_CASE);
    e.CheckGetComponent(0)?.SetLoadingIconFollowState(false);
  }
  NDd() {
    if (this.HuluObserver) {
      UiSceneManager_1.UiSceneManager.HideObserver(this.HuluObserver, "ShowHideWeaponEffect");
    }
  }
  FDd(e) {
    ControllerHolder_1.ControllerHolder.CalabashSkinController.SelectedCalabashSkinChange(e, this.yil.RoleId, this.HuluObserver?.Model);
  }
  SwitchHuluRotate(e) {
    var i = this.HuluObserver?.Model?.CheckGetComponent(9);
    if (e) {
      i?.StopRotate();
    } else {
      i?.StartRotate();
    }
  }
  ReleaseHuluObserver() {
    if (this.HuluObserver) {
      UiSceneManager_1.UiSceneManager.HideObserverWithCallback(this.HuluObserver, "ShowHideWeaponEffect", e => {
        UiSceneManager_1.UiSceneManager.DestroyHuluObserver();
      });
    }
  }
  HideView() {
    this.Draggable.RootUIComp.SetUIActive(true);
    this.GetItem(0)?.SetUIActive(false);
    this.yil.HideRootView();
    this.yil.SetMoveGamepadKeyTipActive(true);
  }
  ShowView() {
    this.yil.SetMoveGamepadKeyTipActive(false);
    this.GetItem(0)?.SetUIActive(true);
    this.yil.ShowRootView();
    this.Draggable.RootUIComp.SetUIActive(false);
  }
  SelectedGrid(e) {
    this.GridLayout.DeselectCurrentGridProxy();
    this.GridLayout.SelectGridProxy(e, true);
  }
  RefreshText(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i);
  }
  RefreshConfirmBox(e) {
    this.GetButton(4)?.SetSelfInteractive(!e);
  }
  RefreshGridSelect(e, i) {
    this.GridLayout.GetLayoutItemByIndex(e)?.RefreshVisible();
    this.GridLayout.GetLayoutItemByIndex(i)?.RefreshVisible();
  }
  RefreshBottom(e, i) {
    var t = e.GetIsLock();
    this.GetButton(4)?.RootUIComp.SetUIActive(!t);
    this.ObtainLayout.SetActive(t);
    if (t) {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(e.SkinId);
      e = this.yil.GetSkinSkipDataList(e.SkinId, t.ItemAccess);
      this.ObtainLayout.SetActive(e.length !== 0);
      if (e.length > 0) {
        this.ObtainLayout.RefreshByData(e);
      }
    } else {
      this.GetButton(4)?.SetSelfInteractive(!i);
    }
  }
  ShowEquipTips() {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TerminalSkin_Change_Success");
  }
  SwitchHuluObserver(e) {
    ControllerHolder_1.ControllerHolder.CalabashSkinController.SelectedCalabashSkinChange(e, this.yil.RoleId, this.HuluObserver?.Model);
  }
  RefreshMainRoleHulu() {
    var e = this.TsUiSceneRoleActor.Model?.GetComponent(18);
    if (e) {
      e.Refresh();
    }
  }
  GetDragItem() {
    return this.GetDraggable(9);
  }
}
exports.CalabashSkinTabView = CalabashSkinTabView;
//# sourceMappingURL=CalabashSkinTabView.js.map