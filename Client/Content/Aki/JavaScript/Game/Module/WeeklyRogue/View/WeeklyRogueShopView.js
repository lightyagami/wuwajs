"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueShopView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const WeeklyRogueShopDetail_1 = require("../Components/WeeklyRogueShopDetail");
const WeeklyRogueTokenGrid_1 = require("../Components/WeeklyRogueTokenGrid");
class WeeklyRogueShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.CaptionItem = undefined;
    this.DetailPanel = undefined;
    this.GoodsLayout = undefined;
    this.Wvt = (e, t) => {
      this.DetailPanel.Refresh(t);
      this.GoodsLayout?.SelectGridProxy(e);
    };
    this.pMo = () => {
      var e = new UiAsyncTask_1.UiAsyncTask("RefreshWeeklyRogueShop", async () => {
        await this.RefreshItemList();
      });
      this.RunAsyncTask(e);
    };
    this.$bf = () => {
      this.Wbf();
    };
    this.Mlo = () => {
      UiManager_1.UiManager.OpenView("WeeklyRogueInfo");
    };
    this.cV_ = () => {
      return new WeeklyRogueTokenGrid_1.WeeklyRogueTokenGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[5, UE.UILoopScrollViewComponent], [6, UE.UIItem], [1, UE.UIItem], [3, UE.UIButtonComponent], [2, UE.UIItem], [0, UE.UIItem], [4, UE.UIText], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.Mlo]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueShopSelect, this.Wvt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueSelectOption, this.pMo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PayShopGoodsBuy, this.$bf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.$bf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.$bf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveCommonItem, this.$bf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.$bf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueShopSelect, this.Wvt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueSelectOption, this.pMo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PayShopGoodsBuy, this.$bf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.$bf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.$bf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveCommonItem, this.$bf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.$bf);
  }
  async OnBeforeStartAsync() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.DetailPanel = new WeeklyRogueShopDetail_1.WeeklyRogueShopDetail();
    await Promise.all([this.DetailPanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.CaptionItem.SetCurrencyItemList([RoguelikeDefine_1.INSIDE_CURRENCY_ID])]);
    this.GoodsLayout = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(5), this.GetItem(6).GetOwner(), this.cV_);
    await this.RefreshItemList();
    this.GetButton(3).GetRootComponent().SetUIActive(false);
    this.GetItem(2)?.SetUIActive(false);
  }
  OnAfterShow() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Show");
  }
  Wbf() {
    this.GoodsLayout?.RefreshAllGridProxies();
  }
  async RefreshItemList() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.GetCurrentOption()?.UN_.sort((e, t) => {
      var i;
      var n;
      if (e.BN_?.O2s !== t.BN_?.O2s) {
        if (e.BN_?.O2s) {
          return 1;
        } else {
          return -1;
        }
      } else if ((i = e.BN_?.qN_ !== e.BN_?.kN_) != (n = t.BN_?.qN_ !== t.BN_?.kN_)) {
        if (i) {
          return -1;
        } else {
          return 1;
        }
      } else if (i && n) {
        return e.BN_.qN_ - t.BN_.qN_;
      } else if (i || n) {
        return e.c5n - t.c5n;
      } else {
        return e.BN_.kN_ - t.BN_.kN_;
      }
    });
    await this.GoodsLayout.RefreshByDataAsync(e);
    if (e && e.length > 0) {
      this.GoodsLayout.DeselectCurrentGridProxy();
      this.GoodsLayout.SelectGridProxy(0, true);
      this.DetailPanel.Refresh(e[0]);
    }
  }
}
exports.WeeklyRogueShopView = WeeklyRogueShopView;
//# sourceMappingURL=WeeklyRogueShopView.js.map