"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkinTabView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const ConfirmBoxController_1 = require("../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const RoleController_1 = require("../../../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const UiCameraHandleData_1 = require("../../../UiCameraAnimation/UiCameraContext/UiCameraHandleData");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WeaponController_1 = require("../../../Weapon/WeaponController");
const SkinObtainItem_1 = require("../../Skip/SkinObtainItem");
const WeaponSkinController_1 = require("./WeaponSkinController");
const WeaponSkinDefine_1 = require("./WeaponSkinDefine");
const WeaponSkinGridItem_1 = require("./WeaponSkinGridItem");
class WeaponSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.yil = undefined;
    this.GridLayout = undefined;
    this.ObtainLayout = undefined;
    this.N2i = undefined;
    this.O2i = undefined;
    this.dmo = undefined;
    this.S6_ = true;
    this.W2e = () => {
      var e = new WeaponSkinGridItem_1.WeaponSkinGridItem();
      e.BindOnExtendToggleStateChanged(this.yil.GridItemClick);
      e.BindOnCanExecuteChange(this.yil.GridItemCanExecuteChange);
      return e;
    };
    this.qil = () => new SkinObtainItem_1.SkinObtainItem();
  }
  OnRegisterComponent() {
    this.yil = this.ExtraParams;
    this.yil.RegisterWeaponSkinTabView(this);
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILayoutBase], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIExtendToggle], [5, UE.UIButtonComponent], [6, UE.UILayoutBase], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText]];
    this.BtnBindInfo = [[3, this.yil.WeaponHideUiClick], [4, this.yil.WeaponSwitchShowClick], [5, this.yil.WeaponConfirmClick]];
  }
  async uvt() {
    this.GridLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(1), this.W2e, this.GetItem(2).GetOwner());
    await this.GridLayout.RefreshByDataAsync(this.yil.SkinDataList);
  }
  async OnBeforeStartAsync() {
    this.S6_ = true;
    await this.uvt();
  }
  OnStart() {
    this.ObtainLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(6), this.qil, this.GetItem(7).GetOwner());
    this.GetExtendToggle(3)?.SetToggleState(1);
    var e = this.yil.IsInShowWeapon ? 1 : 0;
    this.GetExtendToggle(4)?.SetToggleState(e);
  }
  OnBeforeShow() {
    if (this.S6_) {
      this.S6_ = false;
    } else {
      this.GridLayout.RefreshByData(this.yil.SkinDataList);
    }
    this.yil.InitGridSelected();
    RoleController_1.RoleController.PlayRoleMontage(6, false);
    this.SwitchWeaponSkinModel(this.yil.WeaponIncId, this.yil.SelectedSkinId, this.yil.IsInShowWeapon);
    if (this.yil.IsInShowWeapon) {
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
      this.yil.ChangeModelState(1);
    } else {
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1);
      this.yil.ChangeModelState(0);
    }
  }
  OnBeforeHide() {
    var e;
    if (this.yil.IsInShowWeapon) {
      this.yil.IsInShowWeapon = false;
      e = this.yil.IsInShowWeapon ? 1 : 0;
      this.GetExtendToggle(4)?.SetToggleState(e);
      this.RecoverySceneRoleActor();
      this.LKt();
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1);
    }
  }
  OnBeforeDestroy() {
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", false);
  }
  LKt() {
    if (this.N2i) {
      UiSceneManager_1.UiSceneManager.HideObserver(this.N2i, "ShowHideWeaponEffect");
    }
    if (this.O2i) {
      UiSceneManager_1.UiSceneManager.HideObserver(this.O2i, "ShowHideWeaponEffect");
    }
  }
  Oil(e, i) {
    WeaponController_1.WeaponController.SelectedWeaponSkinChange(e, i, this.N2i, this.O2i);
  }
  ReleaseWeaponObserver() {
    if (this.N2i) {
      UiSceneManager_1.UiSceneManager.HideObserverWithCallback(this.N2i, "ShowHideWeaponEffect", e => {
        UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(e);
      });
    }
    if (this.O2i) {
      UiSceneManager_1.UiSceneManager.HideObserverWithCallback(this.O2i, "ShowHideWeaponEffect", e => {
        UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(e);
      });
    }
  }
  RecoverySceneRoleActor() {
    if (this.yil.IsInShowWeapon) {
      this.yil.ChangeModelState(0);
    }
    this.dmo.Model?.CheckGetComponent(17)?.Refresh();
  }
  RecoverySceneRoleActorBySkin(e, i) {
    if (this.yil.IsInShowWeapon) {
      this.yil.ChangeModelState(0);
    }
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    this.dmo.Model?.CheckGetComponent(17)?.SetWeaponByWeaponData(e, i);
  }
  SelectedGrid(e) {
    this.GridLayout.DeselectCurrentGridProxy();
    this.GridLayout.SelectGridProxy(e, true);
  }
  RefreshText(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i);
  }
  RefreshConfirmBox(e) {
    this.GetButton(5)?.SetSelfInteractive(!e);
  }
  RefreshGridSelect(e, i) {
    this.GridLayout.GetLayoutItemByIndex(e)?.RefreshVisible();
    this.GridLayout.GetLayoutItemByIndex(i)?.RefreshVisible();
  }
  RefreshBottom(e, i) {
    var a = e.GetIsLock();
    this.GetButton(5)?.RootUIComp.SetUIActive(!a);
    this.ObtainLayout.SetActive(a);
    if (a) {
      a = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e.SkinId);
      e = this.yil.GetSkinSkipDataList(e.SkinId, a.ItemAccess);
      this.ObtainLayout.SetActive(e.length !== 0);
      if (e.length > 0) {
        this.ObtainLayout.RefreshByData(e);
      }
    } else {
      this.GetButton(5)?.SetSelfInteractive(!i);
    }
  }
  HideView() {
    this.GetItem(0)?.SetUIActive(false);
    this.GetExtendToggle(4)?.RootUIComp.SetUIActive(false);
  }
  ShowView() {
    this.GetItem(0)?.SetUIActive(true);
    this.GetExtendToggle(4)?.RootUIComp.SetUIActive(true);
  }
  SwitchRoleWeaponShow(e) {
    if (e === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID) {
      this.dmo.Model?.CheckGetComponent(17)?.Refresh();
    } else {
      e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e);
      this.dmo.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(e.Models);
    }
    this.yil.ChangeModelState(0);
    this.LKt();
    e = UiCameraHandleData_1.UiCameraHandleData.NewByView("WeaponSkinTabView");
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", true);
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandle(e, true, true, "1001", true, () => {
      UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", false);
    });
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1);
  }
  SwitchWeaponShow(e, i) {
    this.yil.ChangeModelState(1);
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", true);
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName("1072", true, true, "1001", true, () => {
      UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", false);
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
      this.Oil(e, i);
    });
  }
  kil(e) {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    this.N2i = UiSceneManager_1.UiSceneManager.InitWeaponObserver();
    var i = this.N2i.Model;
    i.CheckGetComponent(22)?.SetWeaponData(e);
    i.CheckGetComponent(0)?.SetLoadingIconFollowState(false);
  }
  Nil(e) {
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    this.O2i = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver();
    this.O2i.Model.CheckGetComponent(22).SetWeaponData(e);
  }
  InitWeaponModel(e, i) {
    this.kil(e);
    this.Nil(e);
    this.dmo = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
  }
  SwitchWeaponSkinModel(e, i, a) {
    if (a) {
      WeaponController_1.WeaponController.SelectedWeaponSkinChange(e, i, this.N2i, this.O2i);
    } else if (i === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID) {
      a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e).GetWeaponConfig();
      this.dmo.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(a.Models);
    } else {
      e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i);
      this.dmo.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(e.Models);
    }
  }
  ShowEquipTips() {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponSkinReplaceTip");
  }
  TrySendPbEquipTakeOnRequest(e, i) {
    var a;
    var n;
    var r = ModelManager_1.ModelManager.WeaponSkinModel.GetRoleIdBySkinId(i);
    var t = () => {
      WeaponSkinController_1.WeaponSkinController.SendEquipSkinRequest(e, i);
    };
    if (r) {
      a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(226);
      n = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i).Name;
      n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n);
      r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r).GetName();
      a.SetTextArgs(n, r);
      a.FunctionMap.set(2, t);
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(a);
    } else {
      t();
    }
  }
}
exports.WeaponSkinTabView = WeaponSkinTabView;
//# sourceMappingURL=WeaponSkinTabView.js.map