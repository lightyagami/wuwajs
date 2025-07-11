"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeActivityTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class RoguelikeActivityTabInstanceItem extends UiComponentsAction_1.UiComponentsAction {
  constructor(e) {
    super();
    this.InstanceId = 0;
    this.ItemGridList = [];
    this.IsShowReward = false;
    this.RewardItemList = [];
    this.InstanceId = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent]];
  }
  OnStart() {
    this.Update(this.InstanceId);
  }
  Update(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.MapName);
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(e);
    var t = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(t);
    this.RewardItemList = t;
    this.IsShowReward = this.RewardItemList && this.RewardItemList.length > 0;
    var i = this.GetItem(3).GetOwner();
    var s = this.GetItem(2);
    var n = !ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(e);
    for (let t = 0; t < this.RewardItemList.length; t++) {
      var r = this.RewardItemList[t];
      let e = this.ItemGridList[t];
      if (!e) {
        (e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(LguiUtil_1.LguiUtil.DuplicateActor(i, s));
        this.ItemGridList.push(e);
      }
      e.Refresh(r);
      e.SetReceivedVisible(n);
      e.SetActive(true);
    }
    for (let e = this.RewardItemList.length; e < this.ItemGridList.length; e++) {
      this.ItemGridList[e].SetActive(false);
    }
    this.GetItem(3).SetUIActive(false);
  }
}
class RoguelikeActivityTabItem extends UiComponentsAction_1.UiComponentsAction {
  constructor(e, t) {
    super();
    this.SeasonId = 0;
    this.Index = 0;
    this.OnClickToggle = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeSelectSeason, this.SeasonId, this.Index);
    };
    this.SeasonId = e;
    this.Index = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite]];
    this.BtnBindInfo = [[0, this.OnClickToggle]];
  }
  OnStart() {
    this.Update(this.SeasonId);
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e);
  }
  Update(e) {
    this.SeasonId = e;
    e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SeasonName);
    this.SetSpriteByPath(e.TabIcon, this.GetSprite(2), false);
  }
}
class RoguelikeActivityTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.TabList = [];
    this.SelectIndex = 0;
    this.ScrollView = undefined;
    this.Bqe = (e, t, i) => {
      e = new RoguelikeActivityTabInstanceItem(e);
      e.SetRootActor(t.GetOwner(), true);
      return {
        Key: i,
        Value: e
      };
    };
    this.OnSelectSeason = (e, t) => {
      var i = this.TabList[this.SelectIndex];
      if (i) {
        i.SetToggleState(0);
      }
      this.SelectIndex = t;
      var i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(e);
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.PointItem);
      var e = ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Roguelike_ActivityTab_Currency", t, e.PointItemMaxCount);
      var t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(i.InstanceDungeonEntrance);
      this.ScrollView.RefreshByData(t.InstanceDungeonList, t.InstanceDungeonList.length);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.ScrollView = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.Bqe);
    var t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigList();
    for (let e = 0; e < t.length; e++) {
      var i = t[e];
      var i = new RoguelikeActivityTabItem(i.Id, e);
      var s = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), this.GetItem(4));
      i.SetRootActor(s.GetOwner(), true);
      this.TabList.push(i);
      if (e === 0) {
        i.SetToggleState(1);
        this.OnSelectSeason(t[e].Id, e);
      }
    }
    this.GetItem(5).SetUIActive(false);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoguelikeSelectSeason, this.OnSelectSeason);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoguelikeSelectSeason, this.OnSelectSeason);
  }
  OnBeforeShow() {
    this.OnSelectSeason(this.TabList[this.SelectIndex].SeasonId, this.SelectIndex);
  }
}
exports.RoguelikeActivityTabView = RoguelikeActivityTabView;
//# sourceMappingURL=RoguelikeActivityTabView.js.map