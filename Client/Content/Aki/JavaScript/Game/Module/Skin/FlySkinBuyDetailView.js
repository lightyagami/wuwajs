"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinBuyDetailView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const UiCameraInputComponent_1 = require("../Common/UiCamera/UiCameraInputComponent");
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
const SkinRewardItemGrid_1 = require("./SkinRewardItemGrid");
const FlySkinDefine_1 = require("./Tab/Fly/FlySkinDefine");
class FlySkinBuyDetailView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.C0t = undefined;
    this.y31 = 1;
    this.Tu_ = 0;
    this.Vkc = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.x01 = undefined;
    this.P11 = false;
    this.lqe = undefined;
    this.s4e = undefined;
    this.vql = 0;
    this.Sql = 0;
    this.Iu_ = false;
    this.U01 = false;
    this.W2e = () => {
      return new SkinRewardItemGrid_1.SkinRewardItemGrid();
    };
    this.$Ge = () => {
      this.CloseMe();
    };
    this.U5l = () => {
      this.y31 = 0;
      this.GetExtendToggle(8).SetToggleState(0, false);
      this.M31();
    };
    this.D5l = () => {
      this.y31 = 1;
      this.GetExtendToggle(31).SetToggleState(0, false);
      this.M31();
    };
    this.Lyl = () => {
      const i = this.GetItem(28).bIsUIActive;
      if (i) {
        this.PlaySequence("UiOut", () => {
          if (!this.IsDestroyOrDestroying) {
            this.GetItem(28).SetUIActive(!i);
          }
        }, true);
      } else {
        this.GetItem(28).SetUIActive(!i);
        this.PlaySequence("UiIn", () => {}, true);
      }
      this.GetItem(46)?.SetUIActive(i);
      this.CameraInputComponent.CanCameraInput = i;
      this.x11();
    };
    this.zSl = () => {
      var i;
      if (this.C0t.GetIfDirect()) {
        i = this.C0t.GetCurrentGoodsData().GetCurrentGoodsData().GetGoodsData().Id;
        ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(i);
      } else {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(this.C0t.GetCurrentGoodsData().GetCurrentGoodsData());
      }
    };
    this.iNe = () => {
      if (!(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.vql < ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonGap())) {
        this.C0t.SwitchToNextGoods();
        this.E31();
      }
    };
    this.tNe = () => {
      if (!(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.vql < ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonGap())) {
        this.C0t.SwitchToPreGoods();
        this.E31();
      }
    };
    this.mmo = i => {
      if (i.HandleName === this.x01) {
        this.x01 = undefined;
        if (!this.U01) {
          this.U01 = true;
          this.TryLoadModel();
        }
      }
    };
    this.dtt = () => {
      HelpController_1.HelpController.OpenHelpById(SkinDefine_1.FLY_SKIN_HELP_ID);
    };
    this.USe = i => {
      this.Og();
    };
    this.t3i = (i, t, e) => {
      if (i === this.C0t.GetCurrentGoodsData()?.GetCurrentGoodsData().GetGoodsId()) {
        this.Og();
      }
    };
    this.A5e = () => !(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.Sql < ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonSwitchGap());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIExtendToggle], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [14, UE.UITexture], [12, UE.UIText], [13, UE.UIItem], [15, UE.UIText], [16, UE.UIText], [17, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIText], [22, UE.UITexture], [23, UE.UITexture], [24, UE.UITexture], [25, UE.UIItem], [26, UE.UITexture], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIDraggableComponent], [30, UE.UITexture], [31, UE.UIExtendToggle], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UITexture], [35, UE.UIText], [36, UE.UITexture], [37, UE.UIText], [45, UE.UIItem], [46, UE.UIItem]];
    this.BtnBindInfo = [[3, this.tNe], [4, this.iNe], [17, this.zSl], [8, this.D5l], [31, this.U5l], [1, this.Lyl]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  pmo() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.$Ge);
    this.C0t = this.OpenParam;
    this.lqe.SetTitleLocalText(this.C0t.GetPreviewTitle());
    this.lqe.SetTitleIconByResourceId("FlySkinShopTitle_Icon");
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetHelpCallBack(this.dtt);
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.W2e);
    this.GetExtendToggle(8).CanExecuteChange.Bind(this.A5e);
    this.GetExtendToggle(31).CanExecuteChange.Bind(this.A5e);
    this.I31();
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewGliderSkinIcon");
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewSoarWingSkinIcon");
    this.SetTextureByPath(i, this.GetTexture(34));
    this.SetTextureByPath(t, this.GetTexture(36));
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewGliderSkinText");
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewSoarWingSkinText");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(35), i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(37), t);
    this.GetItem(7).SetUIActive(true);
    this.GetItem(25).SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.GetItem(45)?.SetUIActive(false);
    this.GetItem(46)?.SetUIActive(false);
  }
  OnHandleLoadScene() {
    this.Kkc();
    this.InitCameraInputData();
  }
  Kkc() {
    UiSceneManager_1.UiSceneManager.InitGliderSkeletalHandle();
    var i = UiSceneManager_1.UiSceneManager.GetGliderSkeletalHandle();
    i.Model.CheckGetComponent(1).SetTransformByTag(FlySkinDefine_1.DEFAULT_FLY_SKIN_CASE);
    this.Vkc = i;
  }
  InitCameraInputData() {
    var i;
    var t = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig("翱翔滑翔皮肤旋转查看");
    if (this.Vkc?.Model) {
      i = FlySkinDefine_1.flySkinTypeToCase[this.y31];
      i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(i), 1).D_K2_GetActorLocation();
      t = {
        DragComponent: this.GetDraggable(29),
        CameraSettingConfig: t,
        SourceLocation: i
      };
      this.CameraInputComponent.InitData(t);
      this.CameraInputComponent.CanCameraInput = false;
    }
  }
  OnBeforeShow() {
    this.P11 = true;
    this.x11();
    this.TryLoadModel();
    this.Og();
  }
  Og() {
    var i;
    var t = this.C0t;
    var e = t?.GetCurrentGoodsData();
    var s = t?.GetCurrentSkinData(this.y31);
    if (t && e && s) {
      e.GetCurrentGoodsData().SaveRemindState(TimeUtil_1.TimeUtil.GetServerTime());
      i = !!t && t.CheckIfHaveMutiGood();
      this.GetButton(4).RootUIComp.SetUIActive(i);
      this.GetButton(3).RootUIComp.SetUIActive(i);
      i = e.GetIfCanBuy();
      this.GetText(15).SetUIActive(i);
      this.GetButton(17).RootUIComp.SetUIActive(i);
      this.GetItem(27).SetUIActive(!i);
      e = t.GetCurrentSkinData(this.y31).GetSkinGrade() === 1;
      this.GetItem(33).SetUIActive(e);
      this.GetItem(32).SetUIActive(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), s.GetTitleName());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), s.GetSubTitle());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), s.GetDesc());
      this.SetTextureByPath(s.GetPreviewTextureInBuyView(), this.GetTexture(23));
      this.SetTextureByPath(s.GetBuyPreviewQualityBgPath(), this.GetTexture(22));
      i = t.GetDiscountText();
      this.GetItem(18).SetUIActive(i !== "");
      this.GetText(19).SetText(i);
      if (e = t.GetDiscountTimeData()) {
        this.GetItem(20).SetUIActive(true);
        if (typeof e == "string") {
          this.GetText(21)?.SetText(e);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(21), e.TextId, e.TimeValue);
        }
      } else {
        this.GetItem(20).SetUIActive(false);
      }
      s = t.GetIfDirect();
      i = t.GetPriceData();
      this.GetTexture(14).SetUIActive(!s);
      if (s) {
        this.GetText(15).SetText(t.GetDirectPriceText());
      } else {
        this.SetItemIcon(this.GetTexture(14), i.CurrencyId);
        this.GetText(15).SetText(i.NowPrice.toString());
      }
      if (e = i.OriginalPrice) {
        this.GetText(16).SetUIActive(true);
        this.GetText(16).SetText(`<s>${e.toString()}</s>`);
      } else {
        this.GetText(16).SetUIActive(false);
      }
      this.GetExtendToggle(8).SetToggleState(this.y31 === 1 ? 1 : 0, false);
      this.GetExtendToggle(31).SetToggleState(this.y31 === 0 ? 1 : 0, false);
      this.KWt(this.C0t);
    }
  }
  KWt(i) {
    var t = [];
    for (const s of i.GetCurrentGoodsData().GetOtherReward()) {
      var e = new SkinRewardItemGrid_1.SkinRewardData();
      e.ItemData = s;
      e.FinishState = !i.GetCurrentGoodsData().GetIfCanBuy();
      t.push(e);
    }
    this.s4e?.SetActive(t.length !== 0);
    this.GetItem(9).SetUIActive(t.length !== 0);
    this.s4e?.RefreshByData(t);
  }
  OnAfterShow() {
    this.Kkc();
    this.P11 = true;
    this.x11();
    this.TryLoadModel();
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
  }
  x11() {
    var i;
    if (this.P11) {
      i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinModelCameraId(this.y31);
      this.x01 = i;
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i, true, true, "10010");
    }
  }
  TryLoadModel() {
    var i = this.Vkc?.Model;
    if (i) {
      var t = FlySkinDefine_1.flySkinTypeToCase[this.y31];
      if (this.U01) {
        var e = ConfigManager_1.ConfigManager.SkinConfig;
        var s = this.y31;
        var h = this.C0t.GetCurrentSkinData(s).GetFlySkinConfig();
        const r = h.StandAnim;
        var n = e.GetFlySkinSpawnEffectId(s);
        var e = e.GetFlySkinSpawnMaterialController(s);
        var s = EffectUtil_1.EffectUtil.GetEffectPath(n);
        const o = EffectUtil_1.EffectUtil.GetEffectPath(e);
        n = [r, s, o];
        const a = i.CheckGetComponent(2);
        const U = i.CheckGetComponent(1);
        U.SetTransformByTag(t);
        a.LoadModelByModelId(h.ModelId, true, () => {
          var i;
          var t;
          var e = this.Vkc?.Model;
          if (e) {
            UiModelUtil_1.UiModelUtil.SetVisible(e, true);
            if (!(i = a?.GetLoadedResource(r))) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("UiCommon", 71, "[FlySkin] 商城飞行皮肤待机动画预加载失败");
              }
            }
            e.CheckGetComponent(10).PlayAnimation(i, true);
            i = e.CheckGetComponent(5);
            if (t = a.GetLoadedResource(o)) {
              i?.AddRenderingMaterialByData(t);
            }
            UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, "GliderEffect");
          }
        }, n);
      } else {
        UiModelUtil_1.UiModelUtil.SetVisible(i, false);
        const U = i.CheckGetComponent(1);
        U.SetTransformByTag(t);
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
  OnBeforeHide() {
    this.pmo();
    this.CameraInputComponent?.End();
  }
  OnBeforeDestroy() {
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    this.Xkc();
  }
  Xkc() {
    UiSceneManager_1.UiSceneManager.DestroyGliderSkeletalHandle();
    this.Vkc = undefined;
  }
  M31() {
    this.Sql = 0;
    this.Og();
    this.x11();
    this.TryLoadModel();
    this.Sql = TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
  E31() {
    this.vql = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.I31();
    this.Og();
    this.x11();
    this.TryLoadModel();
    this.PlaySequence("Switch", undefined, true);
  }
  I31() {
    this.y31 = 1;
  }
}
exports.FlySkinBuyDetailView = FlySkinBuyDetailView;
//# sourceMappingURL=FlySkinBuyDetailView.js.map