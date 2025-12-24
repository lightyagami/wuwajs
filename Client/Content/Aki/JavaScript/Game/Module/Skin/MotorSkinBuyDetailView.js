"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorSkinBuyDetailView = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiCameraInputComponent_1 = require("../Common/UiCamera/UiCameraInputComponent");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../Help/HelpController");
const MotorcycleUiModelUtil_1 = require("../Motorcycle/Model/MotorcycleUiModelUtil");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const SkinRewardItemGrid_1 = require("./SkinRewardItemGrid");
const DEFAULT_MOTOR_SKIN_ID = 89200000;
const MOTORCYCLE_SHOP_ROOT_VIEW_CAMERA_CONFIG_ID = "摩托车贴纸商城";
const MOTOR_SHOP_HELP_ID = 478;
class MotorSkinBuyDetailView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.C0t = undefined;
    this.Tu_ = 0;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.x01 = undefined;
    this.lqe = undefined;
    this.Iu_ = false;
    this.U01 = false;
    this.c3a = undefined;
    this.hFf = undefined;
    this.ipf = false;
    this.W2e = () => {
      return new SkinRewardItemGrid_1.SkinRewardItemGrid();
    };
    this.$Ge = () => {
      this.CloseMe();
    };
    this.lFf = () => {
      var i;
      if (this.C0t.GetIfDirect()) {
        i = this.C0t.GetCurrentGoodsData().GetCurrentGoodsData().GetGoodsData().Id;
        ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(i);
      } else {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(this.C0t.GetCurrentGoodsData().GetCurrentGoodsData());
      }
    };
    this.Lyl = () => {
      this.ipf = !this.ipf;
      const i = this.ipf;
      if (i) {
        this.PlaySequence("UiOut", () => {
          if (!this.IsDestroyOrDestroying) {
            this.GetItem(3).SetUIActive(!i);
          }
        }, true);
      } else {
        this.GetItem(3).SetUIActive(!i);
        this.PlaySequence("UiIn", () => {}, true);
      }
    };
    this.mmo = i => {
      if (i.HandleName === this.x01) {
        this.x01 = undefined;
        this.U01 ||= true;
      }
    };
    this.dtt = () => {
      HelpController_1.HelpController.OpenHelpById(MOTOR_SHOP_HELP_ID);
    };
    this.USe = () => {
      this.Og();
    };
    this.t3i = i => {
      if (i === this.C0t.GetCurrentGoodsData()?.GetCurrentGoodsData().GetGoodsId()) {
        this.Og();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIButtonComponent], [14, UE.UIHorizontalLayout], [15, UE.UIText], [16, UE.UIText], [17, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Lyl], [13, this.lFf]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2));
    this.lqe.SetCloseCallBack(this.$Ge);
    this.C0t = this.OpenParam;
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetHelpCallBack(this.dtt);
    this.GetExtendToggle(1)?.RootUIComp.SetUIActive(true);
    this.c3a = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.W2e);
    this.hFf = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.W2e);
  }
  OnHandleLoadScene() {
    this._Ff();
    this.InitCameraInputData();
  }
  _Ff() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.CreateMotor();
    var i = [];
    for (const t of this.OpenParam.GetCurrentGoodsData()?.GetMainReward() ?? []) {
      var e = t[0].ItemId;
      if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 21) {
        i.push(e);
      }
    }
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorByParam(DEFAULT_MOTOR_SKIN_ID, i);
  }
  InitCameraInputData() {
    var i = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(MOTORCYCLE_SHOP_ROOT_VIEW_CAMERA_CONFIG_ID);
    var e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("RoleCase"), 1).D_K2_GetActorLocation();
    var i = {
      DragComponent: this.GetDraggable(0),
      CameraSettingConfig: i,
      SourceLocation: e
    };
    this.CameraInputComponent.InitData(i);
  }
  OnBeforeShow() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(true);
    this.Og();
  }
  Og() {
    var i = this.C0t;
    var e = i?.GetCurrentGoodsData();
    var t = e?.GetMotorSkinData();
    if (i && e && t && (t = t.GetMotorSkinShow())) {
      e.GetCurrentGoodsData().SaveRemindState(TimeUtil_1.TimeUtil.GetServerTime());
      e = e.GetIfCanBuy();
      this.GetText(15).SetUIActive(e);
      this.GetButton(13).RootUIComp.SetUIActive(e);
      this.GetItem(17).SetUIActive(!e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.TypeDescription);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Desc ?? "");
      e = i.GetDiscountText();
      this.GetText(16).SetUIActive(e !== "");
      this.GetText(16).SetText(e);
      this.m9f(i);
      t = i.GetIfDirect();
      e = i.GetPriceData();
      if (t) {
        this.GetText(15).SetText(i.GetDirectPriceText());
      } else if (e) {
        this.GetText(15).SetText(e.NowPrice.toString());
      }
      if (t = e?.OriginalPrice) {
        this.GetText(15).SetText(`<s>${t.toString()}</s>`);
      }
      this.eMt(this.C0t);
      this.KWt(this.C0t);
    }
  }
  m9f(i) {
    var i = i.GetCurrentGoodsData()?.GetCurrentGoodsData().GetCountDownData();
    if (i) {
      if (i[2] === 0) {
        this.GetItem(6).SetUIActive(false);
      } else {
        i = i[1];
        this.GetItem(6).SetUIActive(true);
        if (typeof i == "string") {
          this.GetText(7)?.SetText(i);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), i.TextId, i.TimeValue);
        }
      }
    }
  }
  eMt(i) {
    var e = [];
    for (const s of i.GetCurrentGoodsData().GetMainReward()) {
      var t = new SkinRewardItemGrid_1.SkinRewardData();
      t.ItemData = s;
      t.FinishState = !i.GetCurrentGoodsData().GetIfCanBuy();
      e.push(t);
    }
    this.c3a?.RefreshByData(e);
  }
  KWt(i) {
    var e;
    var t = i.GetCurrentGoodsData().GetOtherReward();
    if (t) {
      (e = new SkinRewardItemGrid_1.SkinRewardData()).ItemData = t;
      e.FinishState = !i.GetCurrentGoodsData().GetIfCanBuy();
      this.hFf?.RefreshByData([e]);
    }
  }
  OnAfterShow() {
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
  }
  OnTick(i) {
    var e;
    var t = this.C0t?.GetCurrentGoodsData()?.GetCurrentGoodsData();
    if (t) {
      if (t.NeedDown()) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131)).FunctionMap.set(1, () => {
          this.CloseMe();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else if (this.Tu_ !== t.GetGoodsData()?.Id) {
        this.Tu_ = t.GetGoodsData().Id;
        this.Iu_ = t.HasDiscount();
      } else {
        e = t?.HasDiscount();
        if (this.Iu_ !== e && this.Tu_ === t.GetGoodsData()?.Id) {
          this.Iu_ = e;
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131)).FunctionMap.set(2, () => {
            this.Og();
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
        }
      }
    }
  }
  OnBeforeHide() {
    this.CameraInputComponent.End();
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(false);
  }
  OnHandleReleaseScene() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.DestroyMotor();
  }
}
exports.MotorSkinBuyDetailView = MotorSkinBuyDetailView;
//# sourceMappingURL=MotorSkinBuyDetailView.js.map