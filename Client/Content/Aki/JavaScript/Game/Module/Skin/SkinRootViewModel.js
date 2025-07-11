"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinRootViewModel = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const UiCameraInputComponent_1 = require("../Common/UiCamera/UiCameraInputComponent");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const FlySkinTabViewModel_1 = require("./Tab/Fly/FlySkinTabViewModel");
const WeaponSkinDefine_1 = require("./Tab/Weapon/WeaponSkinDefine");
const WeaponSkinGridData_1 = require("./Tab/Weapon/WeaponSkinGridData");
class SkinRootViewModel {
  constructor() {
    this.Yzt = undefined;
    this.TsUiSceneRoleActor = undefined;
    this.CurSelectTabViewName = undefined;
    this.NeedLoadRole = false;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.GliderObserver = undefined;
    this.CloseView = () => {
      if (this.NeedLoadRole) {
        BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "CloseRoleSkinView");
      }
      this.Yzt.CloseMe(() => {
        if (this.NeedLoadRole) {
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "CloseRoleSkinView");
        }
      });
    };
    this.SelectRoleSkinId = 0;
    this.IsWearWeaponSkin = false;
    this.WeaponIncId = 0;
    this.EquipSkinId = 0;
    this.RoleId = 0;
    this.SelectedSkinId = 0;
    this.SkinDataList = [];
    this.Dil = undefined;
    this.IsInShowWeapon = false;
    this.Ail = (i, e) => {
      var t;
      if (this.RoleId === i) {
        i = this.Ril(this.EquipSkinId);
        t = this.Ril(e);
        this.Dil?.RefreshGridSelect(i, t);
        this.Dil?.RefreshConfirmBox(true);
        this.Dil?.ShowEquipTips();
        this.EquipSkinId = e;
      }
    };
    this.xil = i => {
      var e;
      if (this.RoleId === i) {
        i = this.Ril(this.EquipSkinId);
        e = this.Ril(WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID);
        this.Dil?.RefreshGridSelect(i, e);
        this.Dil?.RefreshConfirmBox(true);
        this.Dil?.ShowEquipTips();
        this.EquipSkinId = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
      }
    };
    this.WeaponHideUiClick = i => {
      if (i === 1) {
        this.Dil?.ShowView();
        this.Yzt.ShowView();
      } else {
        this.Dil?.HideView();
        this.Yzt.HideView();
      }
    };
    this.WeaponSwitchShowClick = i => {
      if (i === 1) {
        this.IsInShowWeapon = true;
        this.Dil?.SwitchWeaponShow(this.WeaponIncId, this.SelectedSkinId);
      } else {
        this.IsInShowWeapon = false;
        this.Dil?.SwitchRoleWeaponShow(this.SelectedSkinId);
      }
    };
    this.WeaponConfirmClick = () => {
      this.Dil?.TrySendPbEquipTakeOnRequest(this.RoleId, this.SelectedSkinId);
    };
    this.GridItemClick = i => {
      i = i.Data.SkinId;
      this.Pil(i);
      this.Dil?.SwitchWeaponSkinModel(this.WeaponIncId, i, this.IsInShowWeapon);
      this.SelectedSkinId = i;
    };
    this.GridItemCanExecuteChange = i => {
      i = i.SkinId;
      return this.SelectedSkinId !== i;
    };
    this.FlySkinTabViewModel = new FlySkinTabViewModel_1.FlySkinTabViewModel();
    this.S6c = 0;
  }
  RegisterView(i) {
    this.Yzt = i;
  }
  SetViewData(i, e, t, n, s = -1, a = 0) {
    this.RoleId = i;
    this.FlySkinTabViewModel.RoleDataId = i;
    this.FlySkinTabViewModel.SelectedFlySkinId = s;
    this.FlySkinTabViewModel.SelectedTab = a;
    this.WeaponIncId = e;
    this.CurSelectTabViewName = t;
    this.NeedLoadRole = n;
    this.sTl();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EquipWeaponSkin, this.Ail);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UninstallWeaponSkin, this.xil);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EquipWeaponSkin, this.Ail);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UninstallWeaponSkin, this.xil);
  }
  BeforeDestroy() {
    this.Dil?.ReleaseWeaponObserver();
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.RoleId);
    this.Dil?.RecoverySceneRoleActorBySkin(i.GetIncId(), this.EquipSkinId);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkinRootViewDestroy);
    this.ChangeModelState(0);
  }
  wil(i, e) {
    return new WeaponSkinGridData_1.WeaponSkinData(i, e);
  }
  sTl() {
    var i = (ModelManager_1.ModelManager.WeaponModel?.GetWeaponDataByIncId(this.WeaponIncId)).GetWeaponConfig().WeaponType;
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfigListByType(i);
    const e = this.wil(WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, this.RoleId);
    this.SkinDataList.push(e);
    for (const t of i) {
      if (!t.HideInSkinView) {
        const e = this.wil(t.Id, this.RoleId);
        this.SkinDataList.push(e);
      }
    }
  }
  InitSelectedWeaponSkinId() {
    var i = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(this.RoleId);
    this.EquipSkinId = i;
    var i = this.Ril(i);
    this.SelectedSkinId = this.SkinDataList[i].SkinId;
  }
  Ril(e) {
    var i = this.SkinDataList.findIndex(i => i.SkinId === e);
    if (i < 0) {
      return 0;
    } else {
      return i;
    }
  }
  Pil(i) {
    var e = this.Ril(i);
    var t = this.SkinDataList[e];
    this.Dil?.RefreshBottom(t, this.EquipSkinId === i);
    this.Dil?.RefreshText(t.Name, t.Description);
    this.Dil?.SelectedGrid(e);
  }
  RegisterWeaponSkinTabView(i) {
    this.Dil = i;
    this.InitSelectedWeaponSkinId();
    this.Dil.InitWeaponModel(this.WeaponIncId, this.SelectedSkinId);
  }
  InitGridSelected() {
    this.Pil(this.SelectedSkinId);
  }
  GetSkinSkipDataList(i) {
    var e = [];
    for (const n of ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i).ItemAccess) {
      var t = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(n);
      if (t) {
        t = {
          Id: n,
          ConfigId: i,
          Type: t?.Type,
          Text: t.Description,
          SortIndex: t.SortIndex
        };
        e.push(t);
      }
    }
    e.sort((i, e) => {
      var t = i.SortIndex;
      var n = e.SortIndex;
      if (t === n) {
        return e.Id - i.Id;
      } else {
        return n - t;
      }
    });
    return e;
  }
  SetCaptionItemActive(i) {
    if (i) {
      this.Yzt.ShowView();
    } else {
      this.Yzt.HideView();
    }
  }
  RefreshGamePadKeyTip() {
    this.Yzt.RefreshGamePadKeyTip();
  }
  GetRoleTabCameraInputData() {
    var i = this.IsWearWeaponSkin ? ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailWeaponCameraConfigId() : ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailRoleCameraConfigId();
    var i = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(i);
    var e = this.TsUiSceneRoleActor;
    var t = e.D_K2_GetActorLocation();
    var e = (e.Model?.CheckGetComponent(13)).RoleConfigId;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).RoleBody;
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(e);
    return {
      DragComponent: this.Yzt.GetDragItem(),
      CameraSettingConfig: i,
      CameraOffsetConfig: e,
      SourceLocation: t
    };
  }
  InitRoleTabCameraInputData() {
    var i = this.GetRoleTabCameraInputData();
    this.CameraInputComponent?.InitData(i);
  }
  UpdateRoleTabCameraInputData() {
    var i = this.GetRoleTabCameraInputData();
    this.CameraInputComponent?.UpdateData(i);
  }
  ActiveRoleTabCameraInput() {
    this.InitRoleTabCameraInputData();
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
    this.CameraInputComponent.CanCameraInput = true;
  }
  ReActiveRoleTabCameraInput() {
    this.CameraInputComponent.TryDeActivate();
    this.CameraInputComponent.CanCameraInput = false;
    this.UpdateRoleTabCameraInputData();
    this.CameraInputComponent.TryActivate();
    this.CameraInputComponent.CanCameraInput = true;
  }
  InitFlySkinTabCameraInputData() {
    var i;
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig("翱翔滑翔皮肤旋转查看");
    if (this.GliderObserver?.Model) {
      i = this.FlySkinTabViewModel.ModelCase;
      i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(i), 1).D_K2_GetActorLocation();
      e = {
        DragComponent: this.Yzt.GetDragItem(),
        CameraSettingConfig: e,
        SourceLocation: i
      };
      this.CameraInputComponent?.InitData(e);
    }
  }
  GetTabRedDotName(i) {
    if (i === "FlySkinTabView") {
      return "FlySkinTab";
    }
  }
  ChangeModelState(i) {
    var e;
    var t;
    if (this.S6c !== i && (e = this.S6c, i = this.S6c = i, t = this.TsUiSceneRoleActor?.Model)) {
      if (e === 0 && i === 1) {
        UiModelUtil_1.UiModelUtil.ModelFadeIn(t, "WeaponSkinRoleFadeInCurve");
      } else if (e === 1 && i === 0) {
        UiModelUtil_1.UiModelUtil.ModelFadeOut(t, "WeaponSkinRoleFadeOutCurve");
      } else if (e === 0 && i === 2) {
        UiModelUtil_1.UiModelUtil.ModelFadeIn(t, "FlySkinRoleFadeInCurve");
      } else if (e === 2 && i === 0) {
        UiModelUtil_1.UiModelUtil.ModelFadeOut(t, "FlySkinRoleFadeOutCurve");
      }
    }
  }
}
exports.SkinRootViewModel = SkinRootViewModel;
//# sourceMappingURL=SkinRootViewModel.js.map