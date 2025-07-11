"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCollectCardTabView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CardElementCountItem_1 = require("../../Common/CardItem/Item/CardElementCountItem");
const CollectGridCardItem_1 = require("../../Common/CardItem/Item/CollectGridCardItem");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const CollectRewardItem_1 = require("./CollectRewardItem");
const CollectRewardPopup_1 = require("./CollectRewardPopup");
class PhantomArenaCollectCardTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.CardScrollView = undefined;
    this.H3e = undefined;
    this.Mli = undefined;
    this.S2t = undefined;
    this.XAu = undefined;
    this.hoc = (e, t) => {
      if (ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardStateById(e) === 2) {
        this.hOe();
      } else {
        e = {
          RewardLists: ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardPopupTupleData(e),
          MountItem: t,
          PosBias: new UE.Vector(0, 30, 0)
        };
        this.S2t.Refresh(e);
      }
    };
    this.ZW1 = e => {
      e = {
        CardId: e,
        CallbackOnClose: this.Kfu
      };
      UiManager_1.UiManager.OpenView("CollectCardDetailView", e);
    };
    this.fnu = () => {
      this.jqe();
    };
    this.Xfu = e => {
      this.cHt();
      this.jqe();
    };
    this.Kfu = e => {
      this.CardScrollView.GetGridAndScrollToByJudge(e, this.Yfu, false);
    };
    this.Yfu = (e, t) => {
      return e === t.CardId;
    };
    this.Y5i = () => {
      var e = new CollectGridCardItem_1.CollectGridCardItem();
      e.CallbackOnClick = this.ZW1;
      return e;
    };
    this.rOe = () => {
      var e = new CollectRewardItem_1.CollectRewardItem();
      e.RewardType = 1;
      e.CallbackClickReward = this.hoc;
      return e;
    };
    this.jli = () => {
      return new CardElementCountItem_1.CardElementCountItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UISprite], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIHorizontalLayout], [7, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.S2t = new CollectRewardPopup_1.CollectRewardPopup();
    await this.S2t.CreateByResourceIdAsync("UiItem_SoundRemnantArenaRewardPopup", this.RootItem);
  }
  OnStart() {
    this.CardScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.Y5i);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.rOe);
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.jli);
    this.XAu = this.GetLoopScrollViewComponent(4).GetContent().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
  }
  OnBeforeShow() {
    this.cHt();
    this.jqe();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
    this.XAu?.Play();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, this.fnu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.Xfu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.Xfu);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, this.fnu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.Xfu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.Xfu);
  }
  cHt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardDataList();
    this.CardScrollView.RefreshByData(e, true);
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardElementDataList();
    this.Mli.RefreshByData(e);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(PhantomArenaDefine_1.COLLECT_ELEMENT_PHYSICAL_NAME, "");
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardElementCount().get(0);
    var r = t?.[0] ?? 0;
    var t = t?.[1] ?? 0;
    this.GetText(7).SetText(StringUtils_1.StringUtils.Format("{0} {1}/{2}", e, r.toString(), t.toString()));
  }
  jqe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardConfigList();
    this.H3e.RefreshByData(e);
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCardUnlockCount();
    this.GetArtText(0).SetText(e.toString());
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardProgress();
    this.GetSprite(1).SetFillAmount(e);
  }
  hOe() {
    var e = [];
    for (const t of ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardConfigList()) {
      if (ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardStateById(t) === 2) {
        e.push(t);
      }
    }
    if (!(e.length <= 0)) {
      PhantomArenaController_1.PhantomArenaController.CardRewardRequest(e);
    }
  }
  OnBeforeHide() {
    this.S2t.SetActive(false);
  }
}
exports.PhantomArenaCollectCardTabView = PhantomArenaCollectCardTabView;
//# sourceMappingURL=PhantomArenaCollectCardTabView.js.map