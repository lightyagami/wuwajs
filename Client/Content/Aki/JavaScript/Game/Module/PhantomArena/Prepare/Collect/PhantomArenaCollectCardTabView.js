"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCollectCardTabView = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  CardElementCountItem_1 = require("../../Common/CardItem/Item/CardElementCountItem"),
  CollectGridCardItem_1 = require("../../Common/CardItem/Item/CollectGridCardItem"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  CollectRewardItem_1 = require("./CollectRewardItem"),
  CollectRewardPopup_1 = require("./CollectRewardPopup");
class PhantomArenaCollectCardTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), this.CardScrollView = void 0, this.H3e = void 0, this.Mli = void 0, this.S2t = void 0, this.tmu = void 0, this.hoc = (e, t) => {
      2 === ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardStateById(e) ? this.hOe() : (e = {
        RewardLists: ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardPopupTupleData(e),
        MountItem: t,
        PosBias: new UE.Vector(0, 30, 0)
      }, this.S2t.Refresh(e))
    }, this.gW1 = e => {
      e = {
        CardId: e,
        CallbackOnClose: this.tlu
      };
      UiManager_1.UiManager.OpenView("CollectCardDetailView", e)
    }, this.Ztu = () => {
      this.jqe()
    }, this.ilu = e => {
      this.cHt(), this.jqe()
    }, this.tlu = e => {
      this.CardScrollView.GetGridAndScrollToByJudge(e, this.rlu, !1)
    }, this.rlu = (e, t) => {
      return e === t.CardId
    }, this.Y5i = () => {
      var e = new CollectGridCardItem_1.CollectGridCardItem;
      return e.CallbackOnClick = this.gW1, e
    }, this.rOe = () => {
      var e = new CollectRewardItem_1.CollectRewardItem;
      return e.RewardType = 1, e.CallbackClickReward = this.hoc, e
    }, this.jli = () => {
      return new CardElementCountItem_1.CardElementCountItem
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UISprite],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    this.S2t = new CollectRewardPopup_1.CollectRewardPopup, await this.S2t.CreateByResourceIdAsync("UiItem_SoundRemnantArenaRewardPopup", this.RootItem)
  }
  OnStart() {
    this.CardScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.Y5i), this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.rOe), this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.jli), this.tmu = this.GetLoopScrollViewComponent(4).GetContent().GetComponentByClass(UE.UIInturnAnimController.StaticClass())
  }
  OnBeforeShow() {
    this.cHt(), this.jqe()
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start"), this.tmu?.Play()
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, this.Ztu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.ilu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.ilu)
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, this.Ztu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.ilu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.ilu)
  }
  cHt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardDataList(),
      e = (this.CardScrollView.RefreshByData(e, !0), ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardElementDataList()),
      e = (this.Mli.RefreshByData(e), ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(PhantomArenaDefine_1.COLLECT_ELEMENT_PHYSICAL_NAME, "")),
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardElementCount().get(0),
      r = t?.[0] ?? 0,
      t = t?.[1] ?? 0;
    this.GetText(7).SetText(StringUtils_1.StringUtils.Format("{0} {1}/{2}", e, r.toString(), t.toString()))
  }
  jqe() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardConfigList(),
      e = (this.H3e.RefreshByData(e), ModelManager_1.ModelManager.PhantomArenaModel.GetCardUnlockCount()),
      e = (this.GetArtText(0).SetText(e.toString()), ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardProgress());
    this.GetSprite(1).SetFillAmount(e)
  }
  hOe() {
    var e = [];
    for (const t of ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardConfigList()) 2 === ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardStateById(t) && e.push(t);
    e.length <= 0 || PhantomArenaController_1.PhantomArenaController.CardRewardRequest(e)
  }
  OnBeforeHide() {
    this.S2t.SetActive(!1)
  }
}
exports.PhantomArenaCollectCardTabView = PhantomArenaCollectCardTabView;
//# sourceMappingURL=PhantomArenaCollectCardTabView.js.map