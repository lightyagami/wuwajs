"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinBuyDetailView = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../Help/HelpController");
const UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const SkinDefine_1 = require("./SkinDefine");
const RenderUtil_1 = require("../../Render/Utils/RenderUtil");
const SkinRewardItemGrid_1 = require("./SkinRewardItemGrid");
class SkinBuyDetailView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.C0t = undefined;
    this.Syl = 0;
    this.lqe = undefined;
    this.dmo = undefined;
    this.x8i = undefined;
    this.A8i = undefined;
    this.s4e = undefined;
    this.vql = 0;
    this.Sql = 0;
    this.Iu_ = false;
    this.Tu_ = 0;
    this.USe = i => {
      this.Og();
    };
    this.t3i = (i, t, e) => {
      if (i === this.C0t.GetCurrentGoodsData()?.GetCurrentGoodsData().GetGoodsId()) {
        this.Og();
      }
    };
    this.Eqt = (i, t) => {
      if (t.TouchType === 2) {
        this.Egt();
      }
    };
    this.w8i = i => {
      this.x8i = i.GetLocalPointInPlane();
    };
    this.B8i = i => {
      var t;
      if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 || InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")) {
        this.x8i = undefined;
      } else {
        t = this.x8i;
        this.x8i = i.GetLocalPointInPlane();
        if (t && (i = this.x8i.X - t.X, t = this.x8i.Y - t.Y, i != 0 && this.A8i.AddYawInput(i), t != 0)) {
          this.A8i.AddPitchInput(t);
        }
      }
    };
    this.b8i = i => {
      this.x8i = undefined;
    };
    this.N8i = i => {
      if (i.scrollAxisValue !== 0) {
        this.A8i.AddZoomInput(-i.scrollAxisValue);
      }
    };
    this.q8i = i => {
      if (i !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddPitchInput(-i);
      }
    };
    this.G8i = i => {
      if (i !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddYawInput(i);
      }
    };
    this.PUn = (i, t) => {
      if (t !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddZoomInput(t);
      }
    };
    this._mo = () => {
      var i = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData();
      if (i) {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i.HandleName, true, true, "1001");
      }
    };
    this.A5e = () => !(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.Sql < ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonSwitchGap());
    this.W2e = () => {
      return new SkinRewardItemGrid_1.SkinRewardItemGrid();
    };
    this.$Oe = () => {
      this.CloseMe();
    };
    this.U5l = () => {
      this.Syl = 1;
      this.Eyl();
      this.Iyl();
      this.Sql = 0;
      this.GetExtendToggle(8).SetToggleState(0, false);
      this.Sql = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    };
    this.D5l = () => {
      this.Syl = 0;
      this.Eyl();
      this.Iyl();
      this.Sql = 0;
      this.GetExtendToggle(31).SetToggleState(0, false);
      this.Sql = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    };
    this.cmo = () => {
      this.A8i?.PauseTick();
    };
    this.mmo = i => {
      this.Tyl();
    };
    this.Lyl = () => {
      const i = this.GetItem(28).bIsUIActive;
      if (i) {
        this.PlaySequence("UiOut", () => {
          this.GetItem(28).SetUIActive(!i);
          this.GetButton(2).RootUIComp.SetUIActive(!i);
        }, true);
      } else {
        this.GetItem(28).SetUIActive(!i);
        this.GetButton(2).RootUIComp.SetUIActive(!i);
        this.PlaySequence("UiIn", () => {}, true);
      }
    };
    this.zSl = () => {
      var i;
      if (this.C0t.GetCurrentSkinData().GetIfHaveRole()) {
        this.Ryl();
      } else {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(229)).FunctionMap.set(2, () => {
          this.Ryl();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
    this.iNe = () => {
      if (!(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.vql < ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonGap())) {
        this.vql = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        if (this.C0t) {
          this.C0t.SwitchToNextGoods();
          this.Uyl();
          this.Og();
          this.Iyl();
        }
        this.PlaySequence("Switch", undefined, true);
      }
    };
    this.tNe = () => {
      if (!(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.vql < ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonGap())) {
        this.vql = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        if (this.C0t) {
          this.C0t.SwitchToPreGoods();
          this.Uyl();
          this.Og();
          this.Iyl();
        }
        this.PlaySequence("Switch", undefined, true);
      }
    };
    this.Dyl = () => {
      ControllerHolder_1.ControllerHolder.SkinController.OpenSkinShowView(this.C0t.GetCurrentSkinData().GetItemId());
    };
    this.dtt = () => {
      HelpController_1.HelpController.OpenHelpById(SkinDefine_1.ROLE_SKIN_HELP_ID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIExtendToggle], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [14, UE.UITexture], [12, UE.UIText], [13, UE.UIItem], [15, UE.UIText], [16, UE.UIText], [17, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIText], [22, UE.UITexture], [23, UE.UITexture], [24, UE.UITexture], [25, UE.UIItem], [26, UE.UITexture], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIDraggableComponent], [30, UE.UITexture], [31, UE.UIExtendToggle], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UITexture], [35, UE.UIText], [36, UE.UITexture], [37, UE.UIText], [38, UE.UIItem], [39, UE.UIItem], [40, UE.UIText], [43, UE.UITexture], [42, UE.UIText], [41, UE.UITexture], [44, UE.UIText], [45, UE.UIItem], [46, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Dyl], [3, this.tNe], [4, this.iNe], [17, this.zSl], [8, this.D5l], [31, this.U5l], [1, this.Lyl]];
  }
  OnAddEventListener() {
    var i = this.GetDraggable(29);
    i.OnPointerBeginDragCallBack.Bind(this.w8i);
    i.OnPointerDragCallBack.Bind(this.B8i);
    i.OnPointerEndDragCallBack.Bind(this.b8i);
    i.OnPointerScrollCallBack.Bind(this.N8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleLookUp, this.q8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleTurn, this.G8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleZoom, this.PUn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleReset, this._mo);
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.cmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  pmo() {
    var i = this.GetDraggable(29);
    i.OnPointerBeginDragCallBack.Unbind();
    i.OnPointerDragCallBack.Unbind();
    i.OnPointerEndDragCallBack.Unbind();
    i.OnPointerScrollCallBack.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleLookUp, this.q8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleTurn, this.G8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleZoom, this.PUn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleReset, this._mo);
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.cmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  OnHandleLoadScene() {
    this.dmo?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  Egt() {
    var i;
    if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
      i = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two);
      this.A8i.AddZoomInput(-i);
    }
  }
  OnBeforeShow() {
    var i = this.dmo?.Model;
    if (i) {
      UiModelUtil_1.UiModelUtil.SetVisible(i, true);
    }
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewCharacterSkinIcon");
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewCharacterSkinPackIcon");
    this.SetTextureByPath(i, this.GetTexture(34));
    this.SetTextureByPath(t, this.GetTexture(36));
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewCharacterSkinText");
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewCharacterSkinPackText");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(35), i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(37), t);
    this.GetItem(45)?.SetUIActive(true);
    this.GetItem(46)?.SetUIActive(false);
    this.Og();
  }
  OnAfterShow() {
    this.Tyl();
    RenderUtil_1.RenderUtil.BeginPSOSyncMode();
  }
  OnAfterHide() {
    var i = this.dmo?.Model;
    if (i) {
      UiModelUtil_1.UiModelUtil.SetVisible(i, false);
    }
    RenderUtil_1.RenderUtil.EndPSOSyncMode();
  }
  Tyl() {
    var i;
    if (!UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation()) {
      i = this.Syl === 0 ? ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailRoleCameraConfigId() : ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailWeaponCameraConfigId();
      this.Ayl(i);
    }
  }
  Ayl(i) {
    var t = UiCameraManager_1.UiCameraManager.Get();
    this.A8i = t.AddUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent, false);
    var t = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(i);
    this.A8i.InitDataByConfig(t);
    this.A8i.SetNeedFloorReflection(true);
    i = this.dmo.D_K2_GetActorLocation();
    t = this.C0t.GetCurrentSkinData().GetRoleId();
    t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t).RoleBody;
    t = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(t);
    this.A8i.UpdateData(i, t.镜头浮动最大高度, t.镜头浮动最低高度, t.镜头浮动最长臂长, t.镜头浮动最短臂长);
    this.A8i.Activate();
    this.A8i.ResumeTick();
  }
  OnStart() {
    this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(12);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.$Oe);
    this.C0t = this.OpenParam;
    this.lqe.SetTitleLocalText(this.C0t.GetPreviewTitle());
    this.lqe.SetTitleIconByResourceId("RoleSkinShopTitle_Icon");
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetHelpCallBack(this.dtt);
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.W2e);
    this.GetExtendToggle(8).CanExecuteChange.Bind(this.A5e);
    this.GetExtendToggle(31).CanExecuteChange.Bind(this.A5e);
    this.Uyl();
  }
  OnBeforeHide() {
    this.pmo();
    this.A8i.PauseTick();
  }
  OnBeforeDestroy() {
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo);
    this.dmo = undefined;
  }
  xyl() {
    ControllerHolder_1.ControllerHolder.RoleController.RefreshUiSceneRoleActorByConfigId(this.C0t.GetCurrentSkinData().GetRoleId(), this.C0t.GetCurrentSkinData().GetItemId(), () => {
      this.Pyl();
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectedRoleChanged);
  }
  Eyl() {
    var i = this.Syl === 0 ? 3 : 6;
    this.dmo?.Model?.CheckGetComponent(16)?.SetState(i, false, false, false);
  }
  Pyl() {
    var i = this.C0t?.GetCurrentSkinData().GetSuitWeaponSkinConfig();
    if (i) {
      const t = this.dmo?.Model?.CheckGetComponent(17);
      t?.ReplaceWeaponModel(i.Models, () => {
        t?.RefreshWeaponCase();
        t?.AttachWeaponToRole();
      });
    }
  }
  OnHandleReleaseScene() {
    this.UDn();
  }
  UDn() {}
  Iyl() {
    var i;
    if (this.Syl === 0) {
      UiLayer_1.UiLayer.SetShowMaskLayer("SkinBuyDetailView", true);
      if (i = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()) {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i.HandleName, true, true, "1001", true, () => {
          UiLayer_1.UiLayer.SetShowMaskLayer("SkinBuyDetailView", false);
        });
      }
    } else {
      UiLayer_1.UiLayer.SetShowMaskLayer("SkinBuyDetailView", true);
      if (i = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()) {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i.HandleName, true, true, "1001", true, () => {
          UiLayer_1.UiLayer.SetShowMaskLayer("SkinBuyDetailView", false);
        });
      }
    }
  }
  Ryl() {
    var i;
    if (this.C0t.GetIfDirect()) {
      i = this.C0t.GetCurrentGoodsData().GetCurrentGoodsData().GetGoodsData().Id;
      ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(i);
    } else {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(this.C0t.GetCurrentGoodsData().GetCurrentGoodsData());
    }
  }
  Uyl() {
    this.Syl = 0;
  }
  Og() {
    this.C0t?.GetCurrentGoodsData()?.GetCurrentGoodsData().SaveRemindState(TimeUtil_1.TimeUtil.GetServerTime());
    this.wyl(this.C0t);
    this.Byl(this.C0t);
    this.Nft(this.C0t);
    this.Myl(this.C0t);
    this.Iwn(this.C0t);
    this.byl(this.C0t);
    this.Zke(this.C0t);
    this.ZSl(this.C0t);
    this.qyl(this.C0t);
    this.Gyl(this.C0t);
    this.nyl(this.C0t);
    this.c3i(this.C0t);
    this.syl(this.C0t);
    this.iyl(this.C0t);
    this.ryl(this.C0t);
    this.kyl(this.C0t);
    this.Oyl(this.C0t);
    this.Ywn(this.C0t);
    this.Nyl(this.C0t);
    this.KWt(this.C0t);
    this.Fyl();
    this.Eyl();
    this.xyl();
    this.jQl(this.C0t);
    this.f7l(this.C0t);
    this.SK1(this.C0t);
  }
  Fyl() {
    this.GetExtendToggle(8).SetToggleState(this.Syl === 0 ? 1 : 0, false);
    this.GetExtendToggle(31).SetToggleState(this.Syl === 1 ? 1 : 0, false);
    this.Eyl();
  }
  Iwn(i) {
    if (i) {
      i = i.GetCurrentSkinData().GetDesc();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i);
    } else {
      this.GetText(12).SetText("");
    }
  }
  Nft(i) {
    if (i) {
      i = i.GetCurrentSkinData().GetTitleName();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i);
    } else {
      this.GetText(5).SetText("");
    }
  }
  Myl(i) {
    if (i) {
      i = i.GetCurrentSkinData().GetSubTitle();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i);
    } else {
      this.GetText(6).SetText("");
    }
  }
  Byl(i) {
    i = !!i && i.CheckIfHaveMutiGood();
    this.GetButton(4).RootUIComp.SetUIActive(i);
  }
  wyl(i) {
    i = !!i && i.CheckIfHaveMutiGood();
    this.GetButton(3).RootUIComp.SetUIActive(i);
  }
  byl(i) {
    if (i) {
      i = i.GetIfNeedShowSwitchItem();
      this.GetItem(7).SetUIActive(i);
    }
  }
  Zke(i) {
    if (i) {
      i = i.GetCurrentSkinData().GetBuyPreviewRoleCardPath();
      this.SetTextureByPath(i, this.GetTexture(23));
    }
  }
  Gyl(i) {
    if (i) {
      i = i.GetCurrentSkinData().GetBuyPreviewRoleQualityBgPath();
      this.SetTextureByPath(i, this.GetTexture(22));
    }
  }
  ZSl(i) {
    if (i && i.GetCurrentSkinData().GetSuitWeaponSkinId() > 0) {
      i = i.GetCurrentSkinData().GetSuitWeaponPreviewTexturePath();
      this.SetTextureByPath(i, this.GetTexture(26));
      this.GetTexture(26).SetUIActive(true);
    } else {
      this.GetTexture(26).SetUIActive(false);
    }
  }
  qyl(i) {
    if (i && i.GetCurrentSkinData().GetSuitWeaponSkinId() > 0) {
      i = i.GetCurrentSkinData();
      i = UE.Color.FromHex(i.GetRoleSkinConfig().SuitWeaponSkinColor);
      this.GetTexture(30).SetColor(i);
      this.GetItem(25).SetUIActive(true);
    } else {
      this.GetItem(25).SetUIActive(false);
    }
  }
  nyl(i) {
    if (i) {
      i = i.GetDiscountText();
      this.GetItem(18).SetUIActive(i !== "");
      this.GetText(19).SetText(i);
    } else {
      this.GetItem(18).SetUIActive(false);
    }
  }
  c3i(i) {
    var t;
    if (i = i && i.GetDiscountTimeData()) {
      this.GetItem(20).SetUIActive(true);
      t = this.GetText(21);
      if (typeof i == "string") {
        t.SetText(i);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.TimeValue);
      }
    } else {
      this.GetItem(20).SetUIActive(false);
    }
  }
  syl(i) {
    var t;
    if (i && i.GetCurrentGoodsData()) {
      t = i.GetIfDirect();
      this.GetTexture(14).SetUIActive(!t);
      if (!t) {
        t = i.GetPriceData();
        this.SetItemIcon(this.GetTexture(14), t.CurrencyId);
      }
    } else {
      this.GetTexture(14).SetUIActive(false);
    }
  }
  ryl(i) {
    if (!i || !i.GetCurrentGoodsData() || !i.GetCurrentGoodsData().GetIfCanBuy() || i.GetIfDirect()) {
      this.GetText(16).SetText("");
    } else if (i = i.GetPriceData().OriginalPrice) {
      this.GetText(16).SetUIActive(true);
      this.GetText(16).SetText(`<s>${i.toString()}</s>`);
    } else {
      this.GetText(16).SetUIActive(false);
    }
  }
  iyl(i) {
    var t;
    if (i && i.GetCurrentGoodsData()) {
      if (i.GetIfDirect()) {
        t = i.GetDirectPriceText();
        this.GetText(15).SetText(t);
      } else {
        t = i.GetPriceData().NowPrice;
        this.GetText(15).SetText(t.toString());
      }
    } else {
      this.GetText(15).SetText("");
    }
  }
  kyl(i) {
    var t;
    if (i && i.GetCurrentGoodsData()) {
      t = i.GetCurrentGoodsData().GetIfCanBuy();
      i = i.GetCurrentGoodsData().GetCurrentGoodsData().GetAvailableCouponItem();
      this.GetItem(38).SetUIActive(t && !i);
      this.GetItem(39).SetUIActive(t && !!i);
    } else {
      this.GetText(15).SetUIActive(false);
    }
  }
  Oyl(i) {
    if (i && i.GetCurrentGoodsData()) {
      i = i.GetCurrentGoodsData().GetIfCanBuy();
      this.GetButton(17).RootUIComp.SetUIActive(i);
    } else {
      this.GetButton(17).RootUIComp.SetUIActive(false);
    }
  }
  Ywn(i) {
    if (i && i.GetCurrentGoodsData()) {
      i = i.GetCurrentGoodsData().GetIfCanBuy();
      this.GetItem(27).SetUIActive(!i);
    } else {
      this.GetItem(27).SetUIActive(false);
    }
  }
  Nyl(i) {
    if (i && i.GetCurrentGoodsData()) {
      i = i.GetIfHaveSkinNeedRole();
      this.GetItem(13).SetUIActive(!i);
    } else {
      this.GetItem(13).SetUIActive(false);
    }
  }
  KWt(i) {
    if (i && i.GetCurrentGoodsData()) {
      var t = [];
      for (const s of i.GetCurrentGoodsData().GetOtherReward()) {
        var e = new SkinRewardItemGrid_1.SkinRewardData();
        e.ItemData = s;
        e.FinishState = !i.GetCurrentGoodsData().GetIfCanBuy();
        t.push(e);
      }
      this.s4e?.SetActive(t.length !== 0);
      this.s4e?.RefreshByData(t);
    } else {
      this.s4e?.SetActive(false);
    }
  }
  jQl(i) {
    if (i && i.GetCurrentGoodsData()) {
      this.GetItem(9).SetUIActive(true);
    } else {
      this.GetItem(9).SetUIActive(false);
    }
  }
  f7l(i) {
    if (i && i.GetCurrentGoodsData()) {
      i = i.GetCurrentSkinData().GetSuitWeaponSkinId() > 0;
      this.GetItem(33).SetUIActive(i);
      this.GetItem(32).SetUIActive(i);
    } else {
      this.GetItem(33).SetUIActive(false);
      this.GetItem(32).SetUIActive(false);
    }
  }
  SK1(i) {
    var t;
    var e;
    var s;
    var h;
    if (i && i.GetCurrentGoodsData()) {
      if (!i.GetIfDirect()) {
        if (t = i.GetCurrentGoodsData().GetCurrentGoodsData().GetAvailableCouponItem()) {
          s = (e = i.GetPriceData()).OriginalPrice ?? 0;
          i = i.GetCurrentGoodsData().GetCurrentGoodsData().GetAvailableCouponDiscount();
          h = e.NowPrice;
          this.GetText(40).SetText("-" + i);
          this.GetText(42).SetText(`<s>${s}</s>`);
          this.GetText(44).SetText(h.toString());
          this.SetItemIcon(this.GetTexture(41), t.GetConfigId());
          this.SetItemIcon(this.GetTexture(43), e.CurrencyId);
        }
      }
    }
  }
  OnTick(i) {
    var t;
    var e = this.C0t?.GetCurrentGoodsData()?.GetCurrentGoodsData();
    if (e) {
      if (this.Tu_ !== e.GetGoodsData()?.Id) {
        this.Tu_ = e.GetGoodsData().Id;
        this.Iu_ = e.HasDiscount();
      } else {
        t = e?.HasDiscount();
        if (this.Iu_ !== t && this.Tu_ === e.GetGoodsData()?.Id) {
          this.Iu_ = t;
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131)).FunctionMap.set(2, () => {
            this.Og();
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      }
    }
  }
}
exports.SkinBuyDetailView = SkinBuyDetailView;
//# sourceMappingURL=SkinBuyDetailView.js.map