"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleShopView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RogueBattleShopDetail_1 = require("../Component/RogueBattleShopDetail");
const RogueBattleShopGrid_1 = require("../Component/RogueBattleShopGrid");
class RogueBattleShopView extends UiViewBase_1.UiViewBase {
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
    this.Mlo = () => {};
    this.cV_ = () => {
      var e = new RogueBattleShopGrid_1.RogueBattleShopGrid();
      e.SelectCallback = this.Wvt;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[5, UE.UILoopScrollViewComponent], [6, UE.UIItem], [1, UE.UIItem], [3, UE.UIButtonComponent], [2, UE.UIItem], [0, UE.UIItem], [4, UE.UIText], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.Mlo]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueBattleSelectOption, this.pMo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueBattleSelectOption, this.pMo);
  }
  async OnBeforeStartAsync() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.DetailPanel = new RogueBattleShopDetail_1.RogueBattleShopDetail();
    await Promise.all([this.DetailPanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.CaptionItem.SetCurrencyItemList([RoguelikeDefine_1.INSIDE_CURRENCY_ID])]);
    this.GoodsLayout = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(5), this.GetItem(6).GetOwner(), this.cV_);
    await this.RefreshItemList();
    this.GetButton(3).GetRootComponent().SetUIActive(false);
    this.GetItem(2)?.SetUIActive(false);
  }
  OnAfterShow() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Show");
  }
  async RefreshItemList() {
    var e = this.OpenParam;
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetOptionDataById(e)?.fIc.sort((e, t) => {
      var i;
      var s;
      if (e._Ic?.O2s !== t._Ic?.O2s) {
        if (e._Ic?.O2s) {
          return 1;
        } else {
          return -1;
        }
      } else if ((i = e._Ic?.qN_ !== e._Ic?.kN_) != (s = t._Ic?.qN_ !== t._Ic?.kN_)) {
        if (i) {
          return -1;
        } else {
          return 1;
        }
      } else if (i && s) {
        return e._Ic.qN_ - t._Ic.qN_;
      } else if (i || s) {
        return e._Ic.v9n - t._Ic.v9n;
      } else {
        return e._Ic.kN_ - t._Ic.kN_;
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
exports.RogueBattleShopView = RogueBattleShopView;
//# sourceMappingURL=RogueBattleShopView.js.map