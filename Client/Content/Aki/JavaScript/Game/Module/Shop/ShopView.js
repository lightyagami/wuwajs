"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopView = undefined;
const UE = require("ue");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const AsyncTask_1 = require("../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../World/Task/TaskSystem");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const ShopController_1 = require("./ShopController");
const ShopPanelData_1 = require("./ShopPanelData");
const ShopUtils_1 = require("./ShopUtils");
const ShopItemInfoDetailPanel_1 = require("./SubViews/ShopItemInfoDetailPanel");
const ShopMediumItemGrid_1 = require("./SubViews/ShopMediumItemGrid");
class ShopView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.mMo = 0;
    this.ShopItemScrollView = undefined;
    this.dMo = undefined;
    this.PTt = [];
    this.CMo = undefined;
    this.gMo = undefined;
    this.Jgt = e => {
      e = e.Data;
      e = this.CMo.indexOf(e);
      this.ShopItemScrollView.DeselectCurrentGridProxy();
      if (!(e < 0)) {
        this.ShopItemScrollView.SelectGridProxy(e);
      }
    };
    this.Mxe = () => {
      var e = new ShopPanelData_1.ShopPanelData();
      var t = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
      e.ItemId = t.ItemId;
      e.ParamData = t.Id;
      e.CurrencyId = t.GetMoneyId();
      e.SingleBuyCount = t.StackSize;
      e.SingleBuyPrice = t.DefaultPrice.CoinPrice;
      e.BoughtCount = t.BoughtCount;
      e.BuyLimit = t.BuyLimit;
      e.IsLock = t.IsLocked;
      e.LockText = t.LockInfo;
      e.InSellTime = t.InSellTime();
      e.BuySuccessFunction = this.fMo;
      this.dMo.UpdatePanel(e);
    };
    this.fMo = (e, t, i, s) => {
      ShopController_1.ShopController.SendShopBuyRequest(this.mMo, s, i, t, () => {
        var e = new ShopPanelData_1.ShopPanelData();
        ModelManager_1.ModelManager.ShopModel.OpenItemInfo = ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(this.mMo, ModelManager_1.ModelManager.ShopModel.OpenItemInfo.Id);
        var t = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
        e.ItemId = t.ItemId;
        e.ParamData = t.Id;
        e.CurrencyId = t.GetMoneyId();
        e.SingleBuyCount = t.StackSize;
        e.SingleBuyPrice = t.DefaultPrice.CoinPrice;
        e.BoughtCount = t.BoughtCount;
        e.BuyLimit = t.BuyLimit;
        e.IsLock = t.IsLocked;
        e.LockText = t.LockInfo;
        e.InSellTime = t.InSellTime();
        e.BuySuccessFunction = this.fMo;
        this.dMo.UpdatePanel(e);
      });
    };
    this.pMo = (e, t) => {
      this.RefreshShopItemList();
      this.UpdateCurrency();
    };
    this.aoo = e => {
      if (this.mMo === e) {
        this.RefreshShopItemList(false, true);
      }
    };
    this.vMo = () => {
      this.PlaySequence("Sle", this.Mxe);
      ModelManager_1.ModelManager.ShopModel.OpenItemInfo = ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(this.mMo, ModelManager_1.ModelManager.ShopModel.OpenItemInfo.Id);
      var e = new ShopPanelData_1.ShopPanelData();
      var t = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
      e.ItemId = t.ItemId;
      e.ParamData = t.Id;
      e.CurrencyId = t.GetMoneyId();
      e.SingleBuyCount = t.StackSize;
      e.SingleBuyPrice = t.DefaultPrice.CoinPrice;
      e.BoughtCount = t.BoughtCount;
      e.BuyLimit = t.BuyLimit;
      e.IsLock = t.IsLocked;
      e.LockText = t.LockInfo;
      e.InSellTime = t.InSellTime();
      e.BuySuccessFunction = this.fMo;
      this.dMo.UpdatePanel(e);
    };
    this.MMo = () => {
      this.UiViewSequence.PlaySequence("UnSle");
    };
  }
  get ShopInfo() {
    return ModelManager_1.ModelManager.ShopModel.GetShopInfo(this.mMo);
  }
  get u3e() {
    return this.ShopInfo?.UpdateTime;
  }
  get SecondsToRefresh() {
    return this.gMo;
  }
  set SecondsToRefresh(e) {
    if (e <= 0 && this.gMo > 0) {
      this.EMo();
    }
    this.gMo = e;
  }
  OnBeforeCreate() {
    var e = "ShopView" + (10000 + this.OpenParam);
    this.Info.CommonPopBgKey = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [4, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.dMo = new ShopItemInfoDetailPanel_1.ShopItemInfoDetailPanel();
    await Promise.all([this.dMo.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), ShopController_1.ShopController.SendShopInfoRequest(ModelManager_1.ModelManager.ShopModel.VersionId)]);
  }
  OnStart() {
    this.mMo = this.OpenParam;
    this.ShopItemScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(6).GetOwner(), () => {
      var e = new ShopMediumItemGrid_1.ShopMediumItemGrid();
      e.BindOnExtendToggleStateChanged(this.Jgt);
      return e;
    });
    this.ChildPopView?.PopItem.SetMaskResponsibleState(false);
    this.UpdateCurrency();
    this.SetShopName();
    this.RefreshShopItemList(true);
    this.SMo();
    this.GetItem(1).SetUIActive(this.u3e !== undefined && this.u3e > 0);
    ModelManager_1.ModelManager.ShopModel.CurrentInteractCreatureDataLongId = ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId;
  }
  yMo(e) {
    let t = "";
    var i = EntitySystem_1.EntitySystem.Get(ModelManager_1.ModelManager.ShopModel.InteractTarget);
    if (i) {
      t = i.GetComponent(121)?.PawnName ?? "";
    }
    this.GetText(2).SetText(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenItemInfo, this.vMo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseItemInfo, this.MMo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BoughtItem, this.pMo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShopUpdate, this.aoo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenItemInfo, this.vMo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseItemInfo, this.MMo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BoughtItem, this.pMo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShopUpdate, this.aoo);
  }
  OnTick(e) {
    this.SMo();
  }
  SMo() {
    var e;
    if (this.u3e === undefined || this.u3e === 0) {
      this.GetItem(1).SetUIActive(false);
    } else if (e = this.FormatCountdown()) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "RefreshTime", e);
    }
  }
  OnBeforeDestroy() {
    this.CMo.length = 0;
    if (this.ShopItemScrollView) {
      this.ShopItemScrollView.ClearGridProxies();
    }
    if (this.dMo) {
      this.dMo.Destroy();
    }
    for (const e of this.PTt) {
      e.Destroy();
    }
    this.RootActor.OnSequencePlayEvent.Unbind();
  }
  SetShopName() {}
  UpdateCurrency() {
    var e = ModelManager_1.ModelManager.ShopModel.GetShopConfig(this.mMo);
    if (e) {
      this.yMo(e);
    }
  }
  RefreshShopItemList(i = false, s = false) {
    var e = new AsyncTask_1.AsyncTask("ShopView.RefreshShopItemList", async () => {
      if (this.CMo) {
        for (let e = 0; e < this.CMo.length; e++) {
          var t = this.CMo[e];
          var t = ModelManager_1.ModelManager.ShopModel.GetShopItemFullInfoByShopIdAndItemId(this.mMo, t.Id);
          if (t) {
            this.CMo[e] = t;
          }
        }
      } else {
        var e = ModelManager_1.ModelManager.ShopModel.GetShopItemList(this.mMo);
        this.CMo = e;
      }
      await this.ShopItemScrollView.RefreshByDataAsync(this.CMo, false);
      if (i) {
        this.ShopItemScrollView.ClearSelectInfo();
        this.ShopItemScrollView.SelectGridProxy(0, true);
        this.vMo();
      } else if (s) {
        this.vMo();
      }
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(e);
    TaskSystem_1.TaskSystem.Run();
  }
  FormatCountdown() {
    var e = Math.trunc(this.u3e - TimeUtil_1.TimeUtil.GetServerTime());
    if (!((this.SecondsToRefresh = e) <= 0)) {
      return ShopUtils_1.ShopUtils.FormatTime(e);
    }
    ShopController_1.ShopController.SendShopUpdateRequest(this.mMo);
  }
  EMo() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(36);
    e.FunctionMap.set(1, () => {
      ShopController_1.ShopController.SendShopUpdateRequest(this.mMo);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
}
exports.ShopView = ShopView;
//# sourceMappingURL=ShopView.js.map