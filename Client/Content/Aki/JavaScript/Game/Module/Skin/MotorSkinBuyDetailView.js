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
const TotalTopUpDefine_1 = require("../Activity/ActivityContent/TotalTopUp/TotalTopUpDefine");
const TotalTopUpPayAdditiveTagItem_1 = require("../Activity/ActivityContent/TotalTopUp/View/TotalTopUpPayAdditiveTagItem");
const UiCameraInputComponent_1 = require("../Common/UiCamera/UiCameraInputComponent");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../Help/HelpController");
const MotorcycleUiModelUtil_1 = require("../Motorcycle/Model/MotorcycleUiModelUtil");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const SkinRewardItemGrid_1 = require("./SkinRewardItemGrid");
const MOTORCYCLE_SHOP_ROOT_VIEW_CAMERA_CONFIG_ID = "摩托车贴纸商城";
const MOTOR_SHOP_HELP_ID = 478;
const MOTOR_FIXED_FRAME_ID = 89400001;
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
    this.F7f = undefined;
    this.Gyf = false;
    this.DNg = undefined;
    this.xNg = 0;
    this.W2e = () => {
      return new SkinRewardItemGrid_1.SkinRewardItemGrid();
    };
    this.$Ge = () => {
      this.CloseMe();
    };
    this.N7f = () => {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenBuySkinDetailView(this.C0t.GetCurrentGoodsData().GetCurrentGoodsData());
    };
    this.Lyl = () => {
      this.Gyf = !this.Gyf;
      const t = this.Gyf;
      if (t) {
        this.PlaySequence("UiOut", () => {
          if (!this.IsDestroyOrDestroying) {
            this.GetItem(3).SetUIActive(!t);
          }
        }, true);
      } else {
        this.GetItem(3).SetUIActive(!t);
        this.PlaySequence("UiIn", () => {}, true);
      }
    };
    this.mmo = t => {
      if (t.HandleName === this.x01) {
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
    this.t3i = t => {
      if (t === this.C0t.GetCurrentGoodsData()?.GetCurrentGoodsData().GetGoodsId()) {
        this.Og();
      }
    };
  }
  GetViewData() {
    return this.C0t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIButtonComponent], [14, UE.UIHorizontalLayout], [15, UE.UIText], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Lyl], [13, this.N7f]];
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
  async OnBeforeStartAsync() {
    this.DNg = new TotalTopUpPayAdditiveTagItem_1.TotalTopUpPayAdditiveTagItem();
    await this.DNg.CreateByResourceIdAsync("UiItem_CumulativeRechargeScoreTag", this.GetItem(18));
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2));
    this.lqe.SetCloseCallBack(this.$Ge);
    this.C0t = this.OpenParam;
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetHelpCallBack(this.dtt);
    this.GetExtendToggle(1)?.RootUIComp.SetUIActive(true);
    this.c3a = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.W2e);
    this.F7f = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.W2e);
    this.xNg = this.C0t.GetCurrentGoodsData()?.GetCurrentGoodsData()?.GetGoodsId() ?? 0;
    this.DNg?.RefreshByGoodsId(this.xNg);
  }
  OnHandleLoadScene() {
    this.V7f();
    this.G3f();
  }
  V7f() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.CreateMotor();
    this.J5g();
  }
  G3f() {
    var t = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(MOTORCYCLE_SHOP_ROOT_VIEW_CAMERA_CONFIG_ID);
    var i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("RoleCase"), 1).D_K2_GetActorLocation();
    var t = {
      DragComponent: this.GetDraggable(0),
      CameraSettingConfig: t,
      SourceLocation: i
    };
    this.CameraInputComponent.InitData(t);
  }
  J5g() {
    var t = this.OpenParam.GetCurrentGoodsData()?.GetMainReward() ?? [];
    let i = 0;
    let e = MOTOR_FIXED_FRAME_ID;
    var s = [];
    var o = [];
    for (const h of t) {
      TotalTopUpDefine_1.TotalTopUpUtil.Debug("检查主奖励道具", ["ItemId", h[0].ItemId]);
      var r = h[0].ItemId;
      var n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(r);
      if (n === 27) {
        i = r;
      } else if (n === 25) {
        e = r;
      } else if (n === 21) {
        s.push(r);
      } else if (n === 26) {
        o.push(r);
      }
    }
    if (i) {
      MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorBySkinId(i);
    } else {
      t = {
        FrameId: e,
        StickerIds: s,
        DecorationIds: o
      };
      MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadMotorByParam(t);
    }
  }
  OnBeforeShow() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(true);
    this.J5g();
    this.Og();
  }
  Og() {
    var t;
    var i = this.C0t;
    var e = i?.GetCurrentGoodsData();
    var s = e?.GetMotorSkinData();
    if (i && e && s && (s = s.GetMotorSkinShow())) {
      e.GetCurrentGoodsData().SaveRemindState(TimeUtil_1.TimeUtil.GetServerTime());
      e = e.GetIfCanBuy();
      this.GetText(15).SetUIActive(e);
      this.GetButton(13).RootUIComp.SetUIActive(e);
      this.GetItem(17).SetUIActive(!e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), s.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), s.TypeDescription);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), s.Desc ?? "");
      s = i.GetDiscountText();
      this.GetText(16).SetUIActive(s !== "");
      this.GetText(16).SetText(s);
      this.mZf(i);
      s = i.GetIfDirect();
      t = i.GetPriceData();
      if (s) {
        this.GetText(15).SetText(i.GetDirectPriceText());
      } else if (t) {
        this.GetText(15).SetText(t.NowPrice.toString());
      }
      if (s = t?.OriginalPrice) {
        this.GetText(15).SetText(`<s>${s.toString()}</s>`);
      }
      this.eMt(this.C0t);
      this.KWt(this.C0t);
      if (e) {
        this.DNg?.RefreshByGoodsId(this.xNg);
      } else {
        this.DNg?.SetUiActive(false);
      }
    }
  }
  mZf(t) {
    var t = t.GetCurrentGoodsData()?.GetCurrentGoodsData().GetCountDownData();
    if (t) {
      if (t[2] === 0) {
        this.GetItem(6).SetUIActive(false);
      } else {
        t = t[1];
        this.GetItem(6).SetUIActive(true);
        if (typeof t == "string") {
          this.GetText(7)?.SetText(t);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), t.TextId, t.TimeValue);
        }
      }
    }
  }
  eMt(t) {
    var i = [];
    for (const s of t.GetCurrentGoodsData().GetMainReward()) {
      var e = new SkinRewardItemGrid_1.SkinRewardData();
      e.ItemData = s;
      e.FinishState = !t.GetCurrentGoodsData().GetIfCanBuy();
      i.push(e);
    }
    this.c3a?.RefreshByData(i);
  }
  KWt(t) {
    var i;
    var e = t.GetCurrentGoodsData().GetOtherReward();
    if (e) {
      (i = new SkinRewardItemGrid_1.SkinRewardData()).ItemData = e;
      i.FinishState = !t.GetCurrentGoodsData().GetIfCanBuy();
      this.F7f?.RefreshByData([i]);
    }
  }
  OnAfterShow() {
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
  }
  OnTick(t) {
    var i;
    var e = this.C0t?.GetCurrentGoodsData()?.GetCurrentGoodsData();
    if (e) {
      if (e.NeedDown()) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131)).FunctionMap.set(1, () => {
          this.CloseMe();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else if (this.Tu_ !== e.GetGoodsData()?.Id) {
        this.Tu_ = e.GetGoodsData().Id;
        this.Iu_ = e.HasDiscount();
      } else {
        i = e?.HasDiscount();
        if (this.Iu_ !== i && this.Tu_ === e.GetGoodsData()?.Id) {
          this.Iu_ = i;
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131)).FunctionMap.set(2, () => {
            this.Og();
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
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