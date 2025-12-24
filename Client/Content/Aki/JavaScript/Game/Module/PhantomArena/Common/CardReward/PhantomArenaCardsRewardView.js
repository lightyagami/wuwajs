"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardGridCardItem = exports.PhantomArenaCardsRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const CommonGridCardItem_1 = require("../CardItem/Item/CommonGridCardItem");
const MAX_CARD_NUM = 5;
class PhantomArenaCardsRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eVi = undefined;
    this.kau = undefined;
    this.Vnu = undefined;
    this.kRu = [];
    this.OQm = false;
    this.Y5i = () => {
      var e = new RewardGridCardItem();
      e.IsNewPhantomArenaActivity = this.OQm;
      return e;
    };
    this.C0u = e => {
      if (e === "CardChange") {
        this.RefreshCardList();
      }
    };
    this.dV1 = () => {
      if (this.kRu.length > 0) {
        this.PlaySequence("Switch", undefined, true);
      } else {
        this.CloseMe(this.Vnu);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[1, this.dV1]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.Vnu = e.CallbackOnClose;
    this.kRu = e.CardIdList;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.kRu[0]).ActivityId;
    this.OQm = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomBattle_1089");
    this.kau = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.Y5i);
    this.eVi = new RewardGridCardItem();
    this.eVi.IsNewPhantomArenaActivity = this.OQm;
    await this.eVi.CreateByActorAsync(this.GetItem(2).GetOwner());
    await this.RefreshCardList();
  }
  async RefreshCardList() {
    var e = this.kRu.splice(0, MAX_CARD_NUM);
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardDataListByIdList(e);
    this.kau?.GetRootUiItem()?.SetUIActive(e.length > 1);
    this.GetItem(3).SetUIActive(e.length === 1);
    this.eVi.SetActive(e.length === 1);
    if (e.length === 1) {
      this.eVi.Refresh(e[0]);
    } else if (e.length > 1) {
      await this.kau.RefreshByDataAsync(e);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.C0u);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.C0u);
  }
  GetExtraResourceId(e) {
    if (e?.IsNewPhantomArenaActivity) {
      return "UiView_CardUnlockNew";
    } else {
      return "UiView_CardUnlock";
    }
  }
}
exports.PhantomArenaCardsRewardView = PhantomArenaCardsRewardView;
class RewardGridCardItem extends CommonGridCardItem_1.CommonGridCardItem {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.IsNewPhantomArenaActivity = false;
    this.GFo = () => {
      PhantomArenaController_1.PhantomArenaController.OpenDeckBuilderCardInfoViewWithoutOutlookTab(this.Data.CardId);
    };
    this.Bpt = () => false;
  }
  OnRegisterCardComponent() {
    if (this.IsNewPhantomArenaActivity) {
      this.ComponentsRegisterInfoByItem = [[1, this.GetRootItem()]];
    } else {
      this.ComponentsRegisterInfoByItem = [[0, this.GetRootItem()]];
    }
    this.ComponentsRegisterInfoByResourceId = [[9, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]];
  }
  Refresh(e) {
    var t = {
      CardId: (this.Data = e).CardId,
      Attack: e.Attack,
      Life: e.Life,
      Element: e.Element,
      CardFaceTexturePath: e.CardFaceTexturePath,
      ShowCardFaceTexture: e.CardFaceType === 0,
      Cost: e.Cost,
      OnPointerUp: this.GFo,
      CanToggleExecuteChange: this.Bpt,
      OutlookUnlocked: e.OutlookUnlocked
    };
    var i = this.IsNewPhantomArenaActivity ? 1 : 0;
    this.GetComponent(i)?.Refresh(t);
    var i = {
      CardSpineData: e.CardSpineData,
      ShowSpine: e.CardFaceType === 1
    };
    this.GetComponent(9)?.Refresh(i);
  }
  GetKey(e, t) {
    return e.CardId;
  }
}
exports.RewardGridCardItem = RewardGridCardItem;
//# sourceMappingURL=PhantomArenaCardsRewardView.js.map