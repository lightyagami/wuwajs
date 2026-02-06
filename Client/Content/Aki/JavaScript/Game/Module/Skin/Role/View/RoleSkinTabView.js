"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinTabView = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView");
const ConfirmBoxController_1 = require("../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const RoleController_1 = require("../../../RoleUi/RoleController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SkinController_1 = require("../../SkinController");
const WeaponSkinDefine_1 = require("../../Tab/Weapon/WeaponSkinDefine");
const RoleSkinItem_1 = require("../Item/RoleSkinItem");
const RoleSkinObtainItem_1 = require("../Item/RoleSkinObtainItem");
const RoleSkinViewModel_1 = require("./RoleSkinViewModel");
class RoleSkinTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.kIl = undefined;
    this.ObtainLayout = undefined;
    this.L9m = undefined;
    this.yil = undefined;
    this.OIl = undefined;
    this.NIl = 0;
    this.gbl = 0;
    this.pbl = 0;
    this.SQl = true;
    this.m3c = false;
    this.fTu = i => {
      if (i === 0 || i === 1) {
        i = this.OIl[this.NIl];
        this.Hqe(i);
      }
    };
    this.w3g = i => {
      if (i === 0 && this.IsShowOrShowing) {
        this.oTl();
      }
    };
    this.VIl = i => {
      var e = new RoleSkinItem_1.RoleSkinItem();
      e.CreateThenShowByActor(i);
      e.ButtonFunction = this.HIl;
      return e;
    };
    this.qil = () => new RoleSkinObtainItem_1.RoleSkinObtainItem();
    this.D01 = () => {
      this.rTl();
      this.oTl();
      this.D11();
    };
    this.HIl = i => {
      if (this.NIl !== i) {
        this.NIl = i;
        if (this.kIl.GetCurrentSelectIndex() !== i) {
          this.kIl.AttachToIndex(i);
        }
        i = this.OIl[this.NIl];
        this.P9m(i);
        ControllerHolder_1.ControllerHolder.GuideController.TryFinishRunningGuides();
      }
    };
    this.jIl = i => {
      if (i === 1) {
        this.UiViewSequence?.PlaySequence("UiIn");
        this.L9m.SetCaptionItemActive(true);
        this.GetButton(3).RootUIComp.SetUIActive(!this.SQl);
      } else {
        this.UiViewSequence?.PlaySequence("UiOut");
        this.L9m.SetCaptionItemActive(false);
        this.GetButton(3).RootUIComp.SetUIActive(false);
      }
      ControllerHolder_1.ControllerHolder.GuideController.TryFinishRunningGuides();
    };
    this.WIl = () => {
      var i = this.OIl[this.NIl];
      SkinController_1.SkinController.OpenSkinShowView(i.GetItemId());
    };
    this.QIl = () => {
      if (this.fbl()) {
        this.NIl--;
        this.P9m(this.OIl[this.NIl]);
        this.kIl.AttachToIndex(this.NIl, false);
      }
    };
    this.KIl = () => {
      if (this.fbl()) {
        this.NIl++;
        this.P9m(this.OIl[this.NIl]);
        this.kIl.AttachToIndex(this.NIl, false);
      }
    };
    this.$Il = i => {
      var i = i === 1;
      this.yil.SetIsWearWeaponSkin(i);
      var e = this.OIl[this.NIl];
      var t = e.GetRoleSkinConfig().SuitWeaponSkinId;
      if (ModelManager_1.ModelManager.RoleSkinModel.CheckSuitWeaponFirstWear(t)) {
        this.GetUiNiagara(16).SetUIActive(false);
        ModelManager_1.ModelManager.RoleSkinModel.RecordSuitWeaponFirstWear(t, false);
      }
      if (i) {
        t = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e.GetRoleSkinConfig().SuitWeaponSkinId);
        this.L9m.TsUiSceneRoleActor?.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(t.Models);
      }
      this.ubc(e, i);
      this.XIl(e, i);
      this.YIl(i);
    };
    this.gke = () => this.fbl();
    this.zIl = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(231);
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.JIl = () => {
      var i;
      if (ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip()) {
        i = this.OIl[this.NIl];
        RoleController_1.RoleController.RoleSkinChangeRequest(this.L9m.RoleId, i.ItemId, this.yil.GetIsWearWeaponSkin(), this.ZIl);
      }
    };
    this.ZIl = (i, e) => {
      i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i);
      this.XIl(i, e);
      this.kIl.RefreshItems();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIExtendToggle], [11, UE.UIButtonComponent], [12, UE.UIVerticalLayout], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UINiagara]];
    this.BtnBindInfo = [[2, this.jIl], [3, this.WIl], [4, this.QIl], [5, this.KIl], [10, this.$Il], [11, this.zIl], [14, this.JIl]];
  }
  async OnBeforeStartAsync() {
    this.L9m = this.ExtraParams;
    this.L9m.Bind(this.w3g);
    this.yil = new RoleSkinViewModel_1.RoleSkinViewModel();
    this.yil.Init(this.L9m.ViewData);
    this.yil.Bind(this.fTu);
    var i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(this.yil.GetSelectRoleSkinId()).IsWearWeaponSkin();
    this.yil.SetIsWearWeaponSkin(i, true);
    this.gbl = CommonParamById_1.configCommonParamById.GetIntConfig("SkinDetailButtonGap");
    await this.Ykl();
    this.kIl = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(0).GetOwner());
    this.GetItem(1).SetUIActive(false);
    this.kIl.CreateItems(this.GetItem(1).GetOwner(), -50, this.VIl);
    this.ObtainLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(12), this.qil, this.GetItem(13).GetOwner());
    this.GetExtendToggle(2).SetToggleState(1);
    this.GetExtendToggle(10).CanExecuteChange.Bind(this.gke);
    this.eTl();
  }
  async Ykl() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_RoleSkin_Offset");
    var i = new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_RoleSkin_Scale");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Ani_RoleSkin_Alpha");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    await Promise.all([i.Promise, e.Promise, t.Promise]).then(i => {
      RoleSkinItem_1.RoleSkinItem.OffsetCurve = i[0];
      RoleSkinItem_1.RoleSkinItem.ScaleCurve = i[1];
      RoleSkinItem_1.RoleSkinItem.AlphaCurve = i[2];
    });
  }
  eTl() {
    this.OIl = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataList(this.L9m.RoleId);
    this.kIl.ReloadView(this.OIl.length, this.OIl);
  }
  P9m(i) {
    var e = i.IsWearWeaponSkin();
    this.yil.SetIsWearWeaponSkin(e);
    this.yil.SetSelectRoleSkinId(i.GetItemId());
  }
  Hqe(i) {
    var e = this.yil.GetIsWearWeaponSkin();
    var t = i.GetRoleSkinConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.TitleName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.SubDecName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t.BgDescription);
    this.ObtainLayout.SetActive(i.IsLocked() && t.ItemAccess.length > 0);
    this.XIl(i, e);
    this.tTl(t.Id);
    this.GetButton(4).RootUIComp.SetUIActive(this.NIl > 0);
    this.GetButton(5).RootUIComp.SetUIActive(this.NIl < this.OIl.length - 1);
    this.SQl = i.IsOriginalSkin();
    this.GetButton(3).RootUIComp.SetUIActive(!this.SQl);
    this.GetItem(9).SetUIActive(t.SuitWeaponSkinId > 0);
    let s = ModelManager_1.ModelManager.RoleSkinModel.CheckSuitWeaponFirstWear(t.SuitWeaponSkinId);
    if (s && e) {
      s = false;
      ModelManager_1.ModelManager.RoleSkinModel?.RecordSuitWeaponFirstWear(t.SuitWeaponSkinId, false);
    }
    this.GetUiNiagara(16).SetUIActive(s);
    RoleController_1.RoleController.RefreshUiSceneRoleActor(this.L9m.TsUiSceneRoleActor, this.L9m.RoleId, i.ItemId);
    t = e && t.SuitWeaponSkinId > 0;
    if (t) {
      this.iTl(i);
    }
    this.ubc(i, e);
    this.YIl(t);
    this.i4_(i);
  }
  ubc(i, e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(10).SetToggleStateForce(e);
    e = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData();
    if (e) {
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e.HandleName, true, true, "1001");
    }
    if (this.m3c) {
      this.A9m();
    } else {
      this.D9m();
      this.m3c = true;
    }
  }
  XIl(i, e) {
    var t = this.GetButton(14);
    t.RootUIComp.SetUIActive(!i.IsLocked());
    t.SetSelfInteractive(this.CanWearSkin(i, e));
  }
  i4_(i) {
    if (!i.IsLocked()) {
      ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot, i.GetItemId());
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSkinRedDotRefresh, i.GetRoleId());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MainViewRoleButtonRefreshByRoleSkin);
    }
  }
  CanWearSkin(i, e) {
    var t;
    return !i.IsLocked() && (!i.IsWear() || !((t = i.GetRoleSkinConfig().SuitWeaponSkinId) <= 0) && (!(i = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(i.GetRoleId()) === t) || !e) && (!!i || !!e));
  }
  iTl(i) {
    if (i.GetRoleSkinConfig().SuitWeaponSkinId > 0) {
      i = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i.GetRoleSkinConfig().SuitWeaponSkinId);
      this.L9m.TsUiSceneRoleActor?.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(i.Models);
    } else {
      this.WQl();
    }
  }
  WQl() {
    var i;
    var e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(this.L9m.RoleId);
    var t = this.L9m.TsUiSceneRoleActor;
    if (e === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID) {
      i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.L9m.WeaponIncId).GetWeaponConfig();
      t?.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(i.Models);
    } else {
      i = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e);
      t?.Model?.CheckGetComponent(17)?.ReplaceWeaponModel(i.Models);
    }
  }
  YIl(i) {
    if (i) {
      RoleController_1.RoleController.PlayRoleMontage(6, false);
    } else {
      RoleController_1.RoleController.PlayRoleMontage(3, false);
    }
  }
  OnBeforeShow() {
    var i = this.OIl.findIndex(i => i.ItemId === this.yil.GetSelectRoleSkinId());
    this.kIl.AttachToIndex(i, true);
    this.NIl = i;
    var i = this.OIl[this.NIl];
    this.kIl.RefreshItems();
    this.P9m(i);
    this.L9m.SetModelState(0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleSkinSubViewShow, this.NIl === 0 && this.OIl.length > 1);
  }
  tTl(i) {
    i = ModelManager_1.ModelManager.InventoryModel.GetGetWayDataList(i);
    this.ObtainLayout.RefreshByData(i);
  }
  OnBeforeHide() {
    this.rTl();
    this.D11();
  }
  OnBeforeDestroy() {
    this.L9m.UnBind(this.w3g);
    this.yil.UnBind(this.fTu);
  }
  rTl() {
    this.WQl();
  }
  oTl() {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.L9m.RoleId);
    if (i !== undefined && this.L9m.TsUiSceneRoleActor !== undefined) {
      RoleController_1.RoleController.RefreshUiSceneRoleActor(this.L9m.TsUiSceneRoleActor, this.L9m.RoleId, i.GetRoleSkinId());
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkinRootViewDestroy, this.D01);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkinRootViewDestroy, this.D01);
  }
  fbl() {
    if (this.pbl !== 0 && Time_1.Time.Now - this.pbl <= this.gbl) {
      return false;
    }
    this.pbl = Time_1.Time.Now;
    return true;
  }
  D11() {
    if (this.m3c) {
      this.L9m.CameraInputComponent.End();
      this.m3c = false;
    }
  }
  U9m() {
    var i = this.L9m;
    return this.yil.GetRoleTabCameraInputData(i.GetDragItem(), i.TsUiSceneRoleActor);
  }
  x9m() {
    var i = this.U9m();
    this.L9m.CameraInputComponent?.InitData(i);
  }
  B9m() {
    var i = this.U9m();
    this.L9m.CameraInputComponent?.UpdateData(i);
  }
  D9m() {
    var i = this.L9m.CameraInputComponent;
    this.x9m();
    i.Start();
    i.TryActivate();
    i.CanCameraInput = true;
  }
  A9m() {
    var i = this.L9m.CameraInputComponent;
    i.TryDeActivate();
    i.CanCameraInput = false;
    this.B9m();
    i.TryActivate();
    i.CanCameraInput = true;
  }
}
exports.RoleSkinTabView = RoleSkinTabView;
//# sourceMappingURL=RoleSkinTabView.js.map