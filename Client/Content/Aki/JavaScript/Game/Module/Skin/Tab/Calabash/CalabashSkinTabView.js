"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SkinObtainItem_1 = require("../../Skip/SkinObtainItem");
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
      var i = new CalabashSkinGridItem_1.CalabashSkinGridItem();
      i.BindOnExtendToggleStateChanged(this.yil.CalabashSkinViewProxy.CalabashGridItemClick);
      i.BindOnCanExecuteChange(this.yil.CalabashSkinViewProxy.CalabashGridItemCanExecuteChange);
      return i;
    };
    this.qil = () => new SkinObtainItem_1.SkinObtainItem();
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
    this.yil.CalabashSkinViewProxy.InitGridSelected();
    this.FDd(this.yil.CalabashSkinViewProxy.SelectedSkinId);
  }
  async OnBeforeShowAsyncImplement() {
    await this.GridLayout.RefreshByDataAsync(this.yil.CalabashSkinViewProxy.SkinDataList);
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
    this.HuluObserver.Model.CheckGetComponent(0)?.SetLoadingIconFollowState(false);
  }
  NDd() {
    if (this.HuluObserver) {
      UiSceneManager_1.UiSceneManager.HideObserver(this.HuluObserver, "ShowHideWeaponEffect");
    }
  }
  FDd(i) {
    this.yil.ChangeModelState(3);
    ControllerHolder_1.ControllerHolder.CalabashSkinController.SelectedCalabashSkinChange(i, this.yil.RoleId, this.HuluObserver?.Model);
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
    this.yil.HideRootView();
    this.yil.SetMoveGamepadKeyTipActive(true);
  }
  ShowView() {
    this.yil.SetMoveGamepadKeyTipActive(false);
    this.GetItem(0)?.SetUIActive(true);
    this.yil.ShowRootView();
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
      i = this.yil.GetSkinSkipDataList(i.SkinId, t.ItemAccess);
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
    ControllerHolder_1.ControllerHolder.CalabashSkinController.SelectedCalabashSkinChange(i, this.yil.RoleId, this.HuluObserver?.Model);
  }
  RefreshMainRoleHulu() {
    var i = this.TsUiSceneRoleActor.Model?.CheckGetComponent(18);
    if (i) {
      i.Refresh();
    }
  }
  GetDragItem() {
    return this.GetDraggable(9);
  }
}
exports.CalabashSkinTabView = CalabashSkinTabView;
//# sourceMappingURL=CalabashSkinTabView.js.map