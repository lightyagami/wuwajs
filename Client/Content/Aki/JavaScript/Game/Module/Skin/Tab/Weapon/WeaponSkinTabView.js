"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkinTabView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
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
const WeaponSkinViewModel_1 = require("./WeaponSkinViewModel");
class WeaponSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.L9m = undefined;
    this.yil = undefined;
    this.GridLayout = undefined;
    this.ObtainLayout = undefined;
    this.N2i = undefined;
    this.O2i = undefined;
    this.dmo = undefined;
    this.S6_ = true;
    this.D01 = () => {
      this.ReleaseWeaponObserver();
      var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.L9m.RoleId);
      this.RecoverySceneRoleActorBySkin(e.GetIncId(), this.yil.GetEquipSkinId());
    };
    this.ojm = e => {
      if (e === 1) {
        this.yil.SetWeaponUiVisible(true);
        this.L9m.SetRootUiVisible(true);
      } else {
        this.yil.SetWeaponUiVisible(false);
        this.L9m.SetRootUiVisible(false);
      }
    };
    this.njm = e => {
      this.yil.SetIsInShowWeapon(e === 1);
    };
    this.WeaponConfirmClick = () => {
      this.TrySendPbEquipTakeOnRequest(this.L9m.RoleId, this.yil.GetSelectedSkinId());
    };
    this.fTu = e => {
      switch (e) {
        case 4:
          if (this.yil.GetWeaponUiVisible()) {
            this.ShowView();
          } else {
            this.HideView();
          }
          break;
        case 0:
          var i = this.yil.GetIsInShowWeapon();
          var t = this.yil.GetSelectedSkinId();
          if (i) {
            this.SwitchWeaponShow(this.L9m.WeaponIncId, t);
          } else {
            this.SwitchRoleWeaponShow(t);
          }
          break;
        case 2:
          i = this.yil.GetDataIndexBySkinId(this.yil.PrevEquipSkinId);
          t = this.yil.GetDataIndexBySkinId(this.yil.GetEquipSkinId());
          this.RefreshGridSelect(i, t);
          this.RefreshConfirmBox(true);
          this.ShowEquipTips();
          break;
        case 3:
          i = this.yil.GetSelectedSkinId();
          this.sjm();
          this.SwitchWeaponSkinModel(this.L9m.WeaponIncId, i, this.yil.GetIsInShowWeapon());
      }
    };
    this.W2e = () => {
      var e = new WeaponSkinGridItem_1.WeaponSkinGridItem();
      e.BindOnExtendToggleStateChanged(this.gGc);
      e.BindOnCanExecuteChange(this.yil.GridItemCanExecuteChange);
      return e;
    };
    this.gGc = e => {
      e = e.Data.SkinId;
      this.yil.SetSelectedSkinId(e);
    };
    this.qil = () => new SkinObtainItem_1.SkinObtainItem();
  }
  OnRegisterComponent() {
    this.L9m = this.ExtraParams;
    this.yil = new WeaponSkinViewModel_1.WeaponSkinViewModel();
    this.yil.Init(this.L9m.ViewData);
    this.yil.Bind(this.fTu);
    this.InitWeaponModel(this.L9m.WeaponIncId, this.yil.GetSelectedSkinId());
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILayoutBase], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIExtendToggle], [5, UE.UIButtonComponent], [6, UE.UILayoutBase], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText]];
    this.BtnBindInfo = [[3, this.ojm], [4, this.njm], [5, this.WeaponConfirmClick]];
  }
  async uvt() {
    this.GridLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(1), this.W2e, this.GetItem(2).GetOwner());
    await this.GridLayout.RefreshByDataAsync(this.yil.GetSkinDataList());
  }
  async OnBeforeStartAsync() {
    this.S6_ = true;
    await this.uvt();
  }
  OnStart() {
    this.ObtainLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(6), this.qil, this.GetItem(7).GetOwner());
    this.GetExtendToggle(3)?.SetToggleState(1);
    var e = this.yil.GetIsInShowWeapon() ? 1 : 0;
    this.GetExtendToggle(4)?.SetToggleState(e);
  }
  AddEventListener() {
    this.yil?.AddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkinRootViewDestroy, this.D01);
  }
  RemoveEventListener() {
    this.yil?.RemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkinRootViewDestroy, this.D01);
  }
  OnBeforeShow() {
    if (this.S6_) {
      this.S6_ = false;
    } else {
      this.GridLayout.RefreshByData(this.yil.GetSkinDataList());
    }
    this.sjm();
    RoleController_1.RoleController.PlayRoleMontage(6, false);
    this.SwitchWeaponSkinModel(this.L9m.WeaponIncId, this.yil.GetSelectedSkinId(), this.yil.GetIsInShowWeapon());
    if (this.yil.GetIsInShowWeapon()) {
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
      this.L9m.SetModelState(1);
    } else {
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1);
      this.L9m.SetModelState(0);
    }
  }
  OnBeforeHide() {
    var e;
    if (this.yil.GetIsInShowWeapon()) {
      this.yil.SetIsInShowWeapon(false, true);
      e = this.yil.GetIsInShowWeapon() ? 1 : 0;
      this.GetExtendToggle(4)?.SetToggleState(e);
      this.RecoverySceneRoleActor();
      this.LKt();
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1);
    }
  }
  OnBeforeDestroy() {
    this.yil.UnBind(this.fTu);
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", false);
  }
  sjm() {
    var e = this.yil.GetSelectedSkinId();
    var i = this.yil.GetDataIndexBySkinId(e);
    var t = this.yil.GetSkinDataList()[i];
    this.RefreshBottom(t, this.yil.GetEquipSkinId() === e);
    this.RefreshText(t.Name, t.Description);
    this.SelectedGrid(i);
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
    if (this.yil.GetIsInShowWeapon()) {
      this.L9m.SetModelState(0);
    }
    this.dmo.Model?.CheckGetComponent(17)?.Refresh();
  }
  RecoverySceneRoleActorBySkin(e, i) {
    if (this.yil.GetIsInShowWeapon()) {
      this.L9m.SetModelState(0);
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
    var t = e.GetIsLock();
    this.GetButton(5)?.RootUIComp.SetUIActive(!t);
    this.ObtainLayout.SetActive(t);
    if (t) {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e.SkinId);
      e = this.L9m.GetSkinSkipDataList(e.SkinId, t.ItemAccess);
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
    this.L9m.SetModelState(0);
    this.LKt();
    e = UiCameraHandleData_1.UiCameraHandleData.NewByView("WeaponSkinTabView");
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", true);
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandle(e, true, true, "1001", true, () => {
      UiLayer_1.UiLayer.SetShowMaskLayer("WeaponSkinCamera", false);
    });
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1);
  }
  SwitchWeaponShow(e, i) {
    this.L9m.SetModelState(1);
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
  SwitchWeaponSkinModel(e, i, t) {
    if (t) {
      WeaponController_1.WeaponController.SelectedWeaponSkinChange(e, i, this.N2i, this.O2i);
    } else if (i === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID) {
      t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e).GetWeaponConfig();
      this.dmo.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(t.Models);
    } else {
      e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i);
      this.dmo.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(e.Models);
    }
  }
  ShowEquipTips() {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponSkinReplaceTip");
  }
  TrySendPbEquipTakeOnRequest(e, i) {
    var t;
    var n;
    var a = ModelManager_1.ModelManager.WeaponSkinModel.GetRoleIdBySkinId(i);
    var r = () => {
      WeaponSkinController_1.WeaponSkinController.SendEquipSkinRequest(e, i);
    };
    if (a) {
      t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(226);
      n = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i).Name;
      n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n);
      a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a).GetName();
      t.SetTextArgs(n, a);
      t.FunctionMap.set(2, r);
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
    } else {
      r();
    }
  }
}
exports.WeaponSkinTabView = WeaponSkinTabView;
//# sourceMappingURL=WeaponSkinTabView.js.map