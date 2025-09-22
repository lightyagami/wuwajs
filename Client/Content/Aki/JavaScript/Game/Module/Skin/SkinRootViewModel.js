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
const CalabashSkinDefine_1 = require("./Tab/Calabash/CalabashSkinDefine");
const CalabashSkinViewProxy_1 = require("./Tab/Calabash/CalabashSkinViewProxy");
const FlySkinTabViewModel_1 = require("./Tab/Fly/FlySkinTabViewModel");
const WeaponSkinDefine_1 = require("./Tab/Weapon/WeaponSkinDefine");
const WeaponSkinGridData_1 = require("./Tab/Weapon/WeaponSkinGridData");
const fadeCurveMap = new Map([[0, new Map([[1, [0, "WeaponSkinRoleFadeInCurve"]], [2, [0, "FlySkinRoleFadeInCurve"]], [3, [0, "TerminalSkinRoleFadeInCurve"]]])], [1, new Map([[0, [1, "WeaponSkinRoleFadeOutCurve"]]])], [2, new Map([[0, [1, "FlySkinRoleFadeOutCurve"]]])], [3, new Map([[0, [1, "TerminalSkinRoleFadeOutCurve"]]])]]);
class SkinRootViewModel {
  constructor() {
    this.Yzt = undefined;
    this.TsUiSceneRoleActor = undefined;
    this.CurSelectTabViewName = undefined;
    this.NeedLoadRole = false;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.GliderObserver = undefined;
    this.HelpIdMap = new Map([["RoleSkinTabView", 146], ["CalabashSkinTabView", CalabashSkinDefine_1.CALABASH_SKIN_HELP_ID]]);
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
    this.Ail = (e, i) => {
      var t;
      if (this.RoleId === e) {
        e = this.Ril(this.EquipSkinId);
        t = this.Ril(i);
        this.Dil?.RefreshGridSelect(e, t);
        this.Dil?.RefreshConfirmBox(true);
        this.Dil?.ShowEquipTips();
        this.EquipSkinId = i;
      }
    };
    this.xil = e => {
      var i;
      if (this.RoleId === e) {
        e = this.Ril(this.EquipSkinId);
        i = this.Ril(WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID);
        this.Dil?.RefreshGridSelect(e, i);
        this.Dil?.RefreshConfirmBox(true);
        this.Dil?.ShowEquipTips();
        this.EquipSkinId = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
      }
    };
    this.WeaponHideUiClick = e => {
      if (e === 1) {
        this.Dil?.ShowView();
        this.ShowRootView();
      } else {
        this.Dil?.HideView();
        this.HideRootView();
      }
    };
    this.WeaponSwitchShowClick = e => {
      if (e === 1) {
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
    this.GridItemClick = e => {
      e = e.Data.SkinId;
      this.Pil(e);
      this.Dil?.SwitchWeaponSkinModel(this.WeaponIncId, e, this.IsInShowWeapon);
      this.SelectedSkinId = e;
    };
    this.GridItemCanExecuteChange = e => {
      e = e.SkinId;
      return this.SelectedSkinId !== e;
    };
    this.FlySkinTabViewModel = new FlySkinTabViewModel_1.FlySkinTabViewModel();
    this.CalabashSkinViewProxy = new CalabashSkinViewProxy_1.CalabashSkinViewProxy();
    this.S6c = 0;
  }
  RegisterView(e) {
    this.Yzt = e;
  }
  SetViewData(e) {
    this.RoleId = e.RoleId;
    this.FlySkinTabViewModel.RoleDataId = e.RoleId;
    this.FlySkinTabViewModel.SelectedFlySkinId = e.FlySkinId ?? -1;
    this.FlySkinTabViewModel.SelectedTab = e.FlySkinTab ?? 0;
    this.WeaponIncId = e.WeaponId;
    this.CurSelectTabViewName = e.TabViewName;
    this.NeedLoadRole = e.NeedLoadRole;
    this.CalabashSkinViewProxy.SkinIdFromSkip = e.CalabashSkinId ?? CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
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
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.RoleId);
    this.Dil?.RecoverySceneRoleActorBySkin(e.GetIncId(), this.EquipSkinId);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkinRootViewDestroy);
    this.ChangeModelState(0);
  }
  get IsMainRole() {
    return ModelManager_1.ModelManager.RoleModel.IsMainRole(this.RoleId);
  }
  HideRootView() {
    this.Yzt.HideView();
  }
  ShowRootView() {
    this.Yzt.ShowView();
  }
  wil(e, i) {
    return new WeaponSkinGridData_1.WeaponSkinData(e, i);
  }
  sTl() {
    var e = (ModelManager_1.ModelManager.WeaponModel?.GetWeaponDataByIncId(this.WeaponIncId)).GetWeaponConfig().WeaponType;
    var e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfigListByType(e);
    const i = this.wil(WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, this.RoleId);
    this.SkinDataList.push(i);
    for (const t of e) {
      if (!t.HideInSkinView) {
        const i = this.wil(t.Id, this.RoleId);
        this.SkinDataList.push(i);
      }
    }
  }
  InitSelectedWeaponSkinId() {
    var e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(this.RoleId);
    this.EquipSkinId = e;
    var e = this.Ril(e);
    this.SelectedSkinId = this.SkinDataList[e].SkinId;
  }
  Ril(i) {
    var e = this.SkinDataList.findIndex(e => e.SkinId === i);
    if (e < 0) {
      return 0;
    } else {
      return e;
    }
  }
  Pil(e) {
    var i = this.Ril(e);
    var t = this.SkinDataList[i];
    this.Dil?.RefreshBottom(t, this.EquipSkinId === e);
    this.Dil?.RefreshText(t.Name, t.Description);
    this.Dil?.SelectedGrid(i);
  }
  RegisterWeaponSkinTabView(e) {
    this.Dil = e;
    this.InitSelectedWeaponSkinId();
    this.Dil.InitWeaponModel(this.WeaponIncId, this.SelectedSkinId);
  }
  InitGridSelected() {
    this.Pil(this.SelectedSkinId);
  }
  GetSkinSkipDataList(e, i) {
    var t = [];
    for (const n of i) {
      var a = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(n);
      if (a) {
        a = {
          Id: n,
          ConfigId: e,
          Type: a?.Type,
          Text: a.Description,
          SortIndex: a.SortIndex
        };
        t.push(a);
      }
    }
    t.sort((e, i) => {
      var t = e.SortIndex;
      var a = i.SortIndex;
      if (t === a) {
        return i.Id - e.Id;
      } else {
        return a - t;
      }
    });
    return t;
  }
  SetCaptionItemActive(e) {
    if (e) {
      this.ShowRootView();
    } else {
      this.HideRootView();
    }
  }
  RefreshGamePadKeyTip() {
    this.Yzt.RefreshGamePadKeyTip();
  }
  SetMoveGamepadKeyTipActive(e) {
    this.Yzt.SetMoveGamepadKeyTipActive(e);
  }
  GetRoleTabCameraInputData() {
    var e = this.IsWearWeaponSkin ? ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailWeaponCameraConfigId() : ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailRoleCameraConfigId();
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(e);
    var i = this.TsUiSceneRoleActor;
    var t = i.D_K2_GetActorLocation();
    var i = (i.Model?.CheckGetComponent(13)).RoleConfigId;
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i).RoleBody;
    var i = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(i);
    return {
      DragComponent: this.Yzt.GetDragItem(),
      CameraSettingConfig: e,
      CameraOffsetConfig: i,
      SourceLocation: t
    };
  }
  InitRoleTabCameraInputData() {
    var e = this.GetRoleTabCameraInputData();
    this.CameraInputComponent?.InitData(e);
  }
  UpdateRoleTabCameraInputData() {
    var e = this.GetRoleTabCameraInputData();
    this.CameraInputComponent?.UpdateData(e);
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
    var e;
    var i = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig("翱翔滑翔皮肤旋转查看");
    if (this.GliderObserver?.Model) {
      e = this.FlySkinTabViewModel.ModelCase;
      e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e), 1).D_K2_GetActorLocation();
      i = {
        DragComponent: this.Yzt.GetDragItem(),
        CameraSettingConfig: i,
        SourceLocation: e
      };
      this.CameraInputComponent?.InitData(i);
    }
  }
  GetTabRedDotName(e) {
    if (e === "FlySkinTabView") {
      return "FlySkinTab";
    } else if (e === "CalabashSkinTabView") {
      return "HuluSkinTab";
    } else {
      return undefined;
    }
  }
  ChangeModelState(e) {
    var i;
    var t;
    var a;
    if (this.S6c !== e && (t = this.S6c, e = this.S6c = e, i = this.TsUiSceneRoleActor?.Model) && (t = fadeCurveMap.get(t)) && (a = t.get(e))) {
      if (a[0] === 0) {
        UiModelUtil_1.UiModelUtil.ModelFadeIn(i, a[1]);
      } else {
        UiModelUtil_1.UiModelUtil.ModelFadeOut(i, a[1]);
      }
    }
  }
}
exports.SkinRootViewModel = SkinRootViewModel;
//# sourceMappingURL=SkinRootViewModel.js.map