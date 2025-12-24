"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryShopView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Time_1 = require("../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
const HonamiStoryShopScrollItem_1 = require("./Items/HonamiStoryShopScrollItem");
const HonamiStoryShopGriditem_1 = require("./Items/HonamiStoryShopGriditem");
class HonamiStoryShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.PopupCaption = undefined;
    this.c6c = undefined;
    this.kom = new Map();
    this.CVm = () => {
      var e = this.CNe.ShopId;
      this.c6c.Refresh(e);
    };
    this.Hh_ = () => {
      this.qom(10);
    };
    this._5e = () => {
      ModelManager_1.ModelManager.PayShopModel.ReadShopItemCheckFlag(this.CNe.ShopId);
      this.CloseMe();
    };
    this.ZVd = () => {
      HonamiStoryController_1.HonamiStoryController.OpenHonamiStoryBag();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [5, UE.UIButtonComponent], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[5, this.ZVd]];
  }
  GetLoopAudioEventSwitch() {
    return !HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
  }
  async OnBeforeStartAsync() {
    this.CNe ||= ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    this.kom = new Map();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this._5e);
    this.PopupCaption.SetHelpBtnActive(false);
    var e = this.GetLoopScrollViewComponent(3);
    var i = this.GetItem(4);
    this.c6c = new HonamiStoryShopScrollItem_1.HonamiStoryShopScrollItem(e, i, this.GetViewId(), HonamiStoryShopGriditem_1.HonamiStoryShopGridItem);
    await this.c6c.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeShow() {
    var e;
    var i = this.CNe.ShopId;
    if (i > 0) {
      e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(i);
      this.PopupCaption.SetCurrencyItemList(e.Money);
      ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopUpdate(i, false);
    }
    this.qom(9);
    this.eWm();
  }
  OnBeforeHide() {
    this.tWm();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshPayShop, this.CVm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PayShopGoodsBuy, this.Hh_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshPayShop, this.CVm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PayShopGoodsBuy, this.Hh_);
  }
  qom(i) {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(i);
    if (t) {
      let e = this.kom.get(i);
      e = e || 0;
      if (!(Math.abs(Time_1.Time.ServerTimeStamp - e) < t.Interval * CommonDefine_1.THOUSAND)) {
        this.kom.set(i, Time_1.Time.ServerTimeStamp);
        this.Xh_(t);
        this.Yh_(t);
        this.XZi(t);
      }
    }
  }
  Xh_(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Desc);
  }
  Yh_(e) {
    var i;
    var t = e.EntityId;
    if (!(t <= 0)) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(t);
      if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)) {
        i = t?.Entity?.GetComponent(196);
        t = t?.Entity?.GetComponent(45);
        i?.PlayPerformMontage(2, {
          MontagePath: t?.GetMontageResPathByName(e.MontagePath)
        });
      }
    }
  }
  XZi(e) {
    if (e.AudioEvent !== "") {
      AudioSystem_1.AudioSystem.PostEvent(e.AudioEvent);
    }
  }
  eWm() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(e.Entity, false, true, true, "HonamiStoryShopView");
    }
  }
  tWm() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(e.Entity, true, true, true, "HonamiStoryShopView");
    }
  }
}
exports.HonamiStoryShopView = HonamiStoryShopView;
//# sourceMappingURL=HonamiStoryShopView.js.map