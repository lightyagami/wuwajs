"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueDungeonEntryView = exports.RogueDungeonInfoItem = exports.RogueDungeonEntryConfirm = void 0;
const UE = require("ue"),
  RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityButtonItem_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem"),
  ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityManager_1 = require("../../Activity/ActivityManager"),
  NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueDungeonDataItem_1 = require("./RogueDungeonDataItem"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueDungeonEntryConfirm extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.DungeonId = 0, this.FunctionButton = void 0, this.PanelLock = void 0, this.xJa = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResEnterInstClicked), ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueRes).RequestEnterDungeon(this.DungeonId), ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCurrentSelectedInst(this.DungeonId)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    var e = [],
      t = this.GetItem(0),
      t = (this.PanelLock = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock, e.push(this.PanelLock.CreateThenShowByActorAsync(t.GetOwner())), this.GetItem(1));
    this.FunctionButton = new ActivityButtonItem_1.ActivityButtonItem, this.FunctionButton.SetExtraFunction(this.xJa), e.push(this.FunctionButton.CreateThenShowByActorAsync(t.GetOwner())), await Promise.all(e)
  }
  SetLockTextByTextId(e, ...t) {
    this.PanelLock.SetTextByTextId(e, ...t)
  }
  SetLockSpriteVisible(e) {
    this.PanelLock.SetSpriteVisible(e)
  }
  SetPanelConditionVisible(e) {
    this.GetItem(0).SetUIActive(e)
  }
  SetLockConditionButtonVisible(e) {
    this.PanelLock.SetButtonVisible(e)
  }
  Refresh(e) {
    this.DungeonId = e;
    var t, i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel,
      n = i.CheckInstanceUnlock(e);
    this.SetPanelConditionVisible(!n), this.SetLockSpriteVisible(!n), n || (i = i.GetUnlockTextIdById(e), 1 === (t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(e))[0] ? this.SetLockTextByTextId(i ?? "", t[1].toString()) : 4 === t[0] && void 0 !== (t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && this.SetLockTextByTextId(i ?? "", t.MapName)), this.FunctionButton?.SetUiActive(n)
  }
}
exports.RogueDungeonEntryConfirm = RogueDungeonEntryConfirm;
class RogueDungeonInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.DungeonId = 0, this.DNe = void 0, this.UNe = void 0, this.m8t = void 0, this.__1 = () => {
      var e = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(this.DungeonId);
      UiManager_1.UiManager.OpenView("RogueResEndingView", e?.SeasonId)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [7, this.__1]
    ]
  }
  async OnBeforeStartAsync() {
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA, await this.DNe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.UNe = new ActivityRewardList_1.ActivityRewardList, await this.UNe.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.m8t = new RogueDungeonEntryConfirm, await this.m8t.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.UNe.InitGridLayout(this.UNe.InitCommonGridItem)
  }
  OnBeforeDestroy() {
    this.DNe = void 0, this.UNe = void 0
  }
  RefreshDungeonConfig(e) {
    var t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e);
    if (this.DungeonId = e, t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
      var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetInstDungeonEndingReachedCount(e),
        n = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetInstDungeonEndingTotalCount(e),
        i = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RogueRes_DungeonEndingReach", i + "/" + n), ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillTreeLevel(t.SeasonId)),
        n = this.GetItem(5),
        i = (i >= t.RecommendLevel ? n?.SetUIActive(!1) : (n?.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "RogueRes_DungeonRecommendLevel", t.RecommendLevel)), this.DNe.SetContentByTextId(t.Desc), !ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(e)),
        n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(e),
        t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(e);
      const s = i && t ? ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(t) : [];
      i = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(n), t = [...s, ...i];
      this.UNe.RefreshItemLayout(t, () => {
        for (const e of this.UNe.GetLayoutItemList()) e.SetFirstRewardVisible(e.GridIndex < s.length)
      }), this.m8t.Refresh(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueViewInfoRefresh, e)
    }
  }
}
exports.RogueDungeonInfoItem = RogueDungeonInfoItem;
class RogueDungeonEntryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.I5c = void 0, this.lqe = void 0, this.Q6a = void 0, this.hs1 = void 0, this.ELo = void 0, this.$pt = void 0, this.CO1 = -1, this._5e = () => {
      this.CloseMe()
    }, this.Bco = e => {
      this.ELo.IsVelocityMoveState() || void 0 === e.GetData() || (this.ELo.AttachToIndex(e.GetCurrentShowItemIndex(), !1), ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e.GetData())) || ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RogueRes_DungeonLock")
    }, this.w5c = () => {
      UiManager_1.UiManager.OpenView("RogueResSkillView", this.I5c.SeasonId)
    }, this.A5c = () => {
      this.P5c()
    }, this.LO1 = () => {
      for (const e of this.ELo.GetItems()) e.UnSelectWhenEnter()
    }, this.ILo = (e, t, i) => {
      var n = new RogueDungeonDataItem_1.RogueDungeonDataItem(e);
      return n.CreateByActorAsync(e), n.OnToggleClick = this.Bco, n.OnSelectCall = this.R5c, n.CheckToggleCanClick = this.RHl, n
    }, this.RHl = e => !this.ELo.MovingState() && e !== this.CO1, this.R5c = e => {
      this.Q6a.RefreshDungeonConfig(e);
      var t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e);
      t && (this.CO1 = e, "Switch" === this.$pt?.GetCurrentSequence() ? this.$pt?.ReplaySequenceByKey("Switch") : void 0 === this.$pt?.GetCurrentSequence() && this.$pt?.PlayLevelSequenceByName("Switch"), t = 0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ? t.CoverF : t.CoverM, this.SetTextureByPath(t, this.GetTexture(2)), t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e), this.GetItem(7)?.SetUIActive(!t))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    var e = [],
      t = this.GetItem(0),
      t = (this.lqe = new PopupCaptionItem_1.PopupCaptionItem, e.push(this.lqe.CreateThenShowByActorAsync(t.GetOwner())), this.lqe.SetHelpBtnActive(!1), this.lqe.SetCloseCallBack(this._5e), this.GetItem(1)),
      t = (this.Q6a = new RogueDungeonInfoItem, e.push(this.Q6a.CreateThenShowByActorAsync(t.GetOwner())), this.GetItem(5));
    this.hs1 = new RogueOutButtonItem_1.RogueButtonItemA, this.hs1.SetOnClickCall(this.w5c), e.push(this.hs1.CreateThenShowByActorAsync(t.GetOwner())), await Promise.all(e)
  }
  OnStart() {
    this.I5c = this.OpenParam, this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = this.GetItem(3),
      t = this.GetItem(8),
      e = (this.ELo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner()), this.ELo?.SetIfNeedFakeItem(!0), this.ELo.CreateItems(this.GetItem(4).GetOwner(), 0, this.ILo, 1), this.ELo?.SetControllerItem(t), this.GetItem(4).SetUIActive(!1), ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCurrentSelectedInst(this.I5c.SeasonId)),
      t = this.I5c.DungeonList.includes(e) ? this.I5c.DungeonList.indexOf(e) : 0,
      e = [...this.I5c.DungeonList];
    this.ELo.ReloadView(e.length, e, t)
  }
  OnBeforeShow() {
    this.P5c(), this.K8e()
  }
  OnBeforeHide() {
    this.W8e()
  }
  OnBeforeDestroy() {
    this.lqe = void 0, this.I5c = void 0, this.ELo = void 0, this.Q6a = void 0, this.$pt = void 0
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResTalentLevelUp, this.A5c), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResEnterInstClicked, this.LO1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResTalentLevelUp, this.A5c), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResEnterInstClicked, this.LO1)
  }
  K8e() {
    this.hs1?.BindRedDot("RogueResSkillTree", this.I5c.SeasonId)
  }
  W8e() {
    this.hs1?.UnBindRedDot()
  }
  P5c() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillTreeLevel(this.I5c.SeasonId);
    this.hs1?.SetNum("Lv." + e)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && (e = this.ELo?.GetItemByShowIndex(0)?.GetRootItem()) ? [e, e] : void 0
  }
}
exports.RogueDungeonEntryView = RogueDungeonEntryView;
//# sourceMappingURL=RogueDungeonEntryView.js.map