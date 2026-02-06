"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureShopView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiTimeDilation_1 = require("../../../../Ui/Base/UiTimeDilation");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FurnitureShopExchangePopViewProxy_1 = require("../Data/FurnitureShopExchangePopViewProxy");
const FurnitureShopScrollItem_1 = require("./FurnitureShopScrollItem");
class FurnitureShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.mMo = 0;
    this.fBg = undefined;
    this.S9t = [];
    this.PopupCaption = undefined;
    this.g1g = undefined;
    this.C1g = undefined;
    this.k6m = () => {
      var e = new UiAsyncTask_1.UiAsyncTask("RefreshShop", this.p1g);
      this.RunAsyncTask(e);
    };
    this.p1g = async () => {
      if (this.fBg) {
        await this.g1g.Refresh(this.mMo, this.fBg);
      }
    };
    this.v1g = (e, i) => {
      this.fBg = this.S9t[e];
      this.k6m();
    };
    this._5e = () => {
      ControllerHolder_1.ControllerHolder.FurnitureController.SetAllFurnitureShopItemRedDotAsRead();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.mMo = e.ShopId;
    var e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(this.mMo);
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this._5e);
    this.PopupCaption.SetHelpBtnActive(false);
    this.S9t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureFilterConfigList();
    this.C1g = new CommonDropDown_1.CommonDropDown(this.GetItem(5), e => new OneTextDropDownItem_1.OneTextDropDownItem(e), e => new OneTextTitleItem_1.OneTextTitleItem(e));
    this.C1g.SetOnSelectCall(this.v1g);
    this.C1g.SetShowType(0);
    var i = this.GetLoopScrollViewComponent(3);
    var t = this.GetItem(4);
    this.g1g = new FurnitureShopScrollItem_1.FurnitureShopScrollItem(i, t);
    await Promise.all([this.g1g.CreateThenShowByActorAsync(i.GetOwner()), this.PopupCaption.SetCurrencyItemList(e.Money), this.C1g.Init(), ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopUpdateAsync(this.mMo, false)]);
    this.C1g.InitScroll(this.S9t, e => {
      return new LguiUtil_1.TableTextArgNew(e.Name ?? "");
    }, 0);
  }
  OnBeforeShow() {
    this.PauseTimeDilation();
    this.KQm();
    this.y1g();
    this.Z6g();
  }
  OnAfterShow() {
    var e;
    var i = this.OpenParam;
    if (i.GoodsId > 0 && (e = new FurnitureShopExchangePopViewProxy_1.FurnitureShopExchangePopViewProxy(), i = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(i.GoodsId))) {
      e.UpdateFromPayShopGoods(i);
      UiManager_1.UiManager.OpenView("GameplayExchangePopView", e);
    }
  }
  OnBeforeHide() {
    this.ResumeTimeDilation();
    this.XQm();
    this.e7g();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityPayShopGoodsBuy, this.k6m);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityPayShopGoodsBuy, this.k6m);
  }
  PauseTimeDilation() {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("FurnitureShopView");
  }
  ResumeTimeDilation() {
    UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("FurnitureShopView");
  }
  KQm() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(e.Entity, false, true, true, "FurnitureShopView");
    }
  }
  XQm() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(e.Entity, true, true, true, "FurnitureShopView");
    }
  }
  Z6g() {
    var e = this.OpenParam;
    if (e && e.UseSpareShopNpc) {
      ModelManager_1.ModelManager.FurnitureModel.FurnitureEntityVisibleManager.EnableSpareShopNpcEntity();
    }
  }
  e7g() {
    var e = this.OpenParam;
    if (e && e.UseSpareShopNpc) {
      ModelManager_1.ModelManager.FurnitureModel.FurnitureEntityVisibleManager.DisableSpareShopNpcEntity();
    }
  }
  y1g() {
    var e;
    var i;
    var t = this.OpenParam;
    if (t && t.NpcEntityId && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NpcName), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.NpcDesc), i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.NpcEntityId))) {
      e = i.Entity.GetComponent(198);
      i = i.Entity.GetComponent(47);
      e?.PlayPerformMontage(2, {
        MontagePath: i?.GetMontageResPathByName(t.NpcStartMontagePath)
      });
    }
  }
}
exports.FurnitureShopView = FurnitureShopView;
//# sourceMappingURL=FurnitureShopView.js.map