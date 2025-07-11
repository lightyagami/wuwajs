"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssShopView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ActivityShopGridItem_1 = require("../../../Activity/ActivityContent/Common/ActivityShopGridItem");
const ActivityShopScrollItem_1 = require("../../../Activity/ActivityContent/Common/ActivityShopScrollItem");
const CommonCurrencyItemListComponent_1 = require("../../../Common/CommonCurrencyItemListComponent");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const DangoAbyssDefine_1 = require("../DangoAbyssDefine");
const DANGOSHOP = "DangoAbyssShop";
const MODELINDEX = 99;
const CHANGECD = 1800;
class DangoAbyssShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ucr = undefined;
    this.c6c = undefined;
    this.Dw1 = 0;
    this.Uw1 = false;
    this.Bw1 = 0;
    this.kw1 = undefined;
    this._5e = () => {
      this.CloseMe();
    };
    this.v7t = e => {
      if (e === "CommonRewardView") {
        this.Ow1();
        this.qw1(ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoBuyAni(), false);
        this.kw1 = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.qw1(ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoStandAni(), true);
        }, ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoShopBuyTime());
      }
    };
    this.YFi = (e, i, t) => {
      this.Dw1 = 0;
    };
    this.Gw1 = () => {
      var e = new Date().getTime();
      if (!(e - this.Bw1 < CHANGECD)) {
        this.Bw1 = e;
        this.Dw1++;
        if (this.Dw1 > 3) {
          if (!this.Uw1) {
            this.Uw1 = true;
            this.qw1(ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoBadDangoPinkOverAni(), true);
            this.Ow1();
          }
        } else {
          this.qw1(ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoBadDangoPinkAni(), false);
          this.Ow1();
          this.kw1 = TimerSystem_1.GameplayTimerSystem.Delay(() => {
            this.qw1(ConfigManager_1.ConfigManager.DangoAbyssConfig.GetBadDangoStandAni(), true);
          }, ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoShopClickTime());
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this._5e], [4, this.Gw1]];
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  OnHandleLoadScene() {
    ControllerHolder_1.ControllerHolder.DangoAbyssController.InitAbyssDangoObserver(MODELINDEX);
  }
  OnHandleReleaseScene() {
    ControllerHolder_1.ControllerHolder.DangoAbyssController.DestroyAbyssDangoObserver(MODELINDEX);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.YFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.v7t);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.YFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.v7t);
  }
  qw1(e, i) {
    ControllerHolder_1.ControllerHolder.DangoAbyssController.RefreshAbyssDangoAnimation(MODELINDEX, e, i);
  }
  Ow1() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.kw1)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.kw1);
      this.kw1 = undefined;
    }
  }
  async OnBeforeStartAsync() {
    this.ucr = new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(this.GetItem(1));
    var e = this.GetLoopScrollViewComponent(2);
    var i = this.GetItem(3);
    this.c6c = new ActivityShopScrollItem_1.ActivityShopScrollItem(e, i, this.GetViewId(), ActivityShopGridItem_1.ActivityShopGridItem);
    await this.c6c.CreateThenShowByActorAsync(e.GetOwner());
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetOpenShopId();
    if (i > 0) {
      e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(i);
      await this.ucr.SetCurrencyItemList(e.Money);
    }
  }
  PushCameraHandle(e, i, t) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(DANGOSHOP, this.GetViewId(), true);
  }
  PopCameraHandle(e, i, t, n) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(DANGOSHOP, i, t, n);
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.DangoAbyssController.RefreshAbyssDangoModel(MODELINDEX, DangoAbyssDefine_1.BADDANGOID, "MonsterCase2", undefined);
    this.PushCameraHandle(DANGOSHOP, this.GetViewId(), true);
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetOpenShopId();
    this.c6c.Refresh(e);
  }
  OnBeforeHide() {
    this.Ow1();
  }
}
exports.DangoAbyssShopView = DangoAbyssShopView;
//# sourceMappingURL=DangoAbyssShopView.js.map