"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SkinRootViewModel = void 0;
const UE = require("ue"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  UiCameraInputComponent_1 = require("../Common/UiCamera/UiCameraInputComponent"),
  UiModelUtil_1 = require("../UiModel/UiModelUtil"),
  FlySkinTabViewModel_1 = require("./Tab/Fly/FlySkinTabViewModel"),
  WeaponSkinDefine_1 = require("./Tab/Weapon/WeaponSkinDefine"),
  WeaponSkinGridData_1 = require("./Tab/Weapon/WeaponSkinGridData");
class SkinRootViewModel {
  constructor() {
    this.Yzt = void 0, this.TsUiSceneRoleActor = void 0, this.CurSelectTabViewName = void 0, this.NeedLoadRole = !1, this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent, this.GliderObserver = void 0, this.CloseView = () => {
      this.NeedLoadRole && BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "CloseRoleSkinView"), this.Yzt.CloseMe(() => {
        this.NeedLoadRole && BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "CloseRoleSkinView")
      })
    }, this.SelectRoleSkinId = 0, this.IsWearWeaponSkin = !1, this.WeaponIncId = 0, this.EquipSkinId = 0, this.RoleId = 0, this.SelectedSkinId = 0, this.SkinDataList = [], this.Dil = void 0, this.IsInShowWeapon = !1, this.Ail = (i, e) => {
      var t;
      this.RoleId === i && (i = this.Ril(this.EquipSkinId), t = this.Ril(e), this.Dil?.RefreshGridSelect(i, t), this.Dil?.RefreshConfirmBox(!0), this.Dil?.ShowEquipTips(), this.EquipSkinId = e)
    }, this.xil = i => {
      var e;
      this.RoleId === i && (i = this.Ril(this.EquipSkinId), e = this.Ril(WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID), this.Dil?.RefreshGridSelect(i, e), this.Dil?.RefreshConfirmBox(!0), this.Dil?.ShowEquipTips(), this.EquipSkinId = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID)
    }, this.WeaponHideUiClick = i => {
      1 === i ? (this.Dil?.ShowView(), this.Yzt.ShowView()) : (this.Dil?.HideView(), this.Yzt.HideView())
    }, this.WeaponSwitchShowClick = i => {
      1 === i ? (this.IsInShowWeapon = !0, this.Dil?.SwitchWeaponShow(this.WeaponIncId, this.SelectedSkinId)) : (this.IsInShowWeapon = !1, this.Dil?.SwitchRoleWeaponShow(this.SelectedSkinId))
    }, this.WeaponConfirmClick = () => {
      this.Dil?.TrySendPbEquipTakeOnRequest(this.RoleId, this.SelectedSkinId)
    }, this.GridItemClick = i => {
      i = i.Data.SkinId;
      this.Pil(i), this.Dil?.SwitchWeaponSkinModel(this.WeaponIncId, i, this.IsInShowWeapon), this.SelectedSkinId = i
    }, this.GridItemCanExecuteChange = i => {
      i = i.SkinId;
      return this.SelectedSkinId !== i
    }, this.FlySkinTabViewModel = new FlySkinTabViewModel_1.FlySkinTabViewModel, this.S6c = 0
  }
  RegisterView(i) {
    this.Yzt = i
  }
  SetViewData(i, e, t, n, s = -1, a = 0) {
    this.RoleId = i, this.FlySkinTabViewModel.RoleDataId = i, this.FlySkinTabViewModel.SelectedFlySkinId = s, this.FlySkinTabViewModel.SelectedTab = a, this.WeaponIncId = e, this.CurSelectTabViewName = t, this.NeedLoadRole = n, this.sTl()
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EquipWeaponSkin, this.Ail), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UninstallWeaponSkin, this.xil)
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EquipWeaponSkin, this.Ail), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UninstallWeaponSkin, this.xil)
  }
  BeforeDestroy() {
    this.Dil?.ReleaseWeaponObserver();
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.RoleId);
    this.Dil?.RecoverySceneRoleActorBySkin(i.GetIncId(), this.EquipSkinId), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkinRootViewDestroy), this.ChangeModelState(0)
  }
  wil(i, e) {
    return new WeaponSkinGridData_1.WeaponSkinData(i, e)
  }
  sTl() {
    var i = (ModelManager_1.ModelManager.WeaponModel?.GetWeaponDataByIncId(this.WeaponIncId)).GetWeaponConfig().WeaponType,
      i = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfigListByType(i);
    const e = this.wil(WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, this.RoleId);
    this.SkinDataList.push(e);
    for (const t of i)
      if (!t.HideInSkinView) {
        const e = this.wil(t.Id, this.RoleId);
        this.SkinDataList.push(e)
      }
  }
  InitSelectedWeaponSkinId() {
    var i = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(this.RoleId),
      i = (this.EquipSkinId = i, this.Ril(i));
    this.SelectedSkinId = this.SkinDataList[i].SkinId
  }
  Ril(e) {
    var i = this.SkinDataList.findIndex(i => i.SkinId === e);
    return i < 0 ? 0 : i
  }
  Pil(i) {
    var e = this.Ril(i),
      t = this.SkinDataList[e];
    this.Dil?.RefreshBottom(t, this.EquipSkinId === i), this.Dil?.RefreshText(t.Name, t.Description), this.Dil?.SelectedGrid(e)
  }
  RegisterWeaponSkinTabView(i) {
    this.Dil = i, this.InitSelectedWeaponSkinId(), this.Dil.InitWeaponModel(this.WeaponIncId, this.SelectedSkinId)
  }
  InitGridSelected() {
    this.Pil(this.SelectedSkinId)
  }
  GetSkinSkipDataList(i) {
    var e = [];
    for (const n of ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i).ItemAccess) {
      var t = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(n);
      t && (t = {
        Id: n,
        ConfigId: i,
        Type: t?.Type,
        Text: t.Description,
        SortIndex: t.SortIndex
      }, e.push(t))
    }
    return e.sort((i, e) => {
      var t = i.SortIndex,
        n = e.SortIndex;
      return t === n ? e.Id - i.Id : n - t
    }), e
  }
  SetCaptionItemActive(i) {
    i ? this.Yzt.ShowView() : this.Yzt.HideView()
  }
  RefreshGamePadKeyTip() {
    this.Yzt.RefreshGamePadKeyTip()
  }
  GetRoleTabCameraInputData() {
    var i = this.IsWearWeaponSkin ? ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailWeaponCameraConfigId() : ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailRoleCameraConfigId(),
      i = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(i),
      e = this.TsUiSceneRoleActor,
      t = e.D_K2_GetActorLocation(),
      e = (e.Model?.CheckGetComponent(13)).RoleConfigId,
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).RoleBody,
      e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(e);
    return {
      DragComponent: this.Yzt.GetDragItem(),
      CameraSettingConfig: i,
      CameraOffsetConfig: e,
      SourceLocation: t
    }
  }
  InitRoleTabCameraInputData() {
    var i = this.GetRoleTabCameraInputData();
    this.CameraInputComponent?.InitData(i)
  }
  UpdateRoleTabCameraInputData() {
    var i = this.GetRoleTabCameraInputData();
    this.CameraInputComponent?.UpdateData(i)
  }
  ActiveRoleTabCameraInput() {
    this.InitRoleTabCameraInputData(), this.CameraInputComponent.Start(), this.CameraInputComponent.TryActivate(), this.CameraInputComponent.CanCameraInput = !0
  }
  ReActiveRoleTabCameraInput() {
    this.CameraInputComponent.TryDeActivate(), this.CameraInputComponent.CanCameraInput = !1, this.UpdateRoleTabCameraInputData(), this.CameraInputComponent.TryActivate(), this.CameraInputComponent.CanCameraInput = !0
  }
  InitFlySkinTabCameraInputData() {
    var i, e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig("翱翔滑翔皮肤旋转查看");
    this.GliderObserver?.Model && (i = this.FlySkinTabViewModel.ModelCase, i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(i), 1).D_K2_GetActorLocation(), e = {
      DragComponent: this.Yzt.GetDragItem(),
      CameraSettingConfig: e,
      SourceLocation: i
    }, this.CameraInputComponent?.InitData(e))
  }
  GetTabRedDotName(i) {
    if ("FlySkinTabView" === i) return "FlySkinTab"
  }
  ChangeModelState(i) {
    var e, t;
    this.S6c !== i && (e = this.S6c, i = this.S6c = i, t = this.TsUiSceneRoleActor?.Model) && (0 === e && 1 === i ? UiModelUtil_1.UiModelUtil.ModelFadeIn(t, "WeaponSkinRoleFadeInCurve") : 1 === e && 0 === i ? UiModelUtil_1.UiModelUtil.ModelFadeOut(t, "WeaponSkinRoleFadeOutCurve") : 0 === e && 2 === i ? UiModelUtil_1.UiModelUtil.ModelFadeIn(t, "FlySkinRoleFadeInCurve") : 2 === e && 0 === i && UiModelUtil_1.UiModelUtil.ModelFadeOut(t, "FlySkinRoleFadeOutCurve"))
  }
}
exports.SkinRootViewModel = SkinRootViewModel;
//# sourceMappingURL=SkinRootViewModel.js.map