"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueDungeonEntryView = exports.RogueDungeonInfoItem = exports.RogueDungeonEntryConfirm = undefined;
const UE = require("ue");
const RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityButtonItem_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityManager_1 = require("../../Activity/ActivityManager");
const NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueDungeonDataItem_1 = require("./RogueDungeonDataItem");
const RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueDungeonEntryConfirm extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DungeonId = 0;
    this.FunctionButton = undefined;
    this.PanelLock = undefined;
    this.xJa = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResEnterInstClicked);
      ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueRes).RequestEnterDungeon(this.DungeonId);
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCurrentSelectedInst(this.DungeonId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var t = this.GetItem(0);
    this.PanelLock = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    e.push(this.PanelLock.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(1);
    this.FunctionButton = new ActivityButtonItem_1.ActivityButtonItem();
    this.FunctionButton.SetExtraFunction(this.xJa);
    e.push(this.FunctionButton.CreateThenShowByActorAsync(t.GetOwner()));
    await Promise.all(e);
  }
  SetLockTextByTextId(e, ...t) {
    this.PanelLock.SetTextByTextId(e, ...t);
  }
  SetLockSpriteVisible(e) {
    this.PanelLock.SetSpriteVisible(e);
  }
  SetPanelConditionVisible(e) {
    this.GetItem(0).SetUIActive(e);
  }
  SetLockConditionButtonVisible(e) {
    this.PanelLock.SetButtonVisible(e);
  }
  Refresh(e) {
    this.DungeonId = e;
    var t;
    var i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    var n = i.CheckInstanceUnlock(e);
    this.SetPanelConditionVisible(!n);
    this.SetLockSpriteVisible(!n);
    if (!n) {
      i = i.GetUnlockTextIdById(e);
      if ((t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(e))[0] === 1) {
        this.SetLockTextByTextId(i ?? "", t[1].toString());
      } else if (t[0] === 4 && (t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) !== undefined) {
        this.SetLockTextByTextId(i ?? "", t.MapName);
      }
    }
    this.FunctionButton?.SetUiActive(n);
  }
}
exports.RogueDungeonEntryConfirm = RogueDungeonEntryConfirm;
class RogueDungeonInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DungeonId = 0;
    this.DNe = undefined;
    this.UNe = undefined;
    this.m8t = undefined;
    this.Y_1 = () => {
      var e = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(this.DungeonId);
      UiManager_1.UiManager.OpenView("RogueResEndingView", e?.SeasonId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.Y_1]];
  }
  async OnBeforeStartAsync() {
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.m8t = new RogueDungeonEntryConfirm();
    await this.m8t.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
  }
  OnBeforeDestroy() {
    this.DNe = undefined;
    this.UNe = undefined;
  }
  RefreshDungeonConfig(e) {
    var t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e);
    this.DungeonId = e;
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
      var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetInstDungeonEndingReachedCount(e);
      var n = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetInstDungeonEndingTotalCount(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RogueRes_DungeonEndingReach", i + "/" + n);
      var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillTreeLevel(t.SeasonId);
      var n = this.GetItem(5);
      if (i >= t.RecommendLevel) {
        n?.SetUIActive(false);
      } else {
        n?.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "RogueRes_DungeonRecommendLevel", t.RecommendLevel);
      }
      this.DNe.SetContentByTextId(t.Desc);
      var i = !ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(e);
      var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(e);
      var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(e);
      const s = i && t ? ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(t) : [];
      i = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(n);
      t = [...s, ...i];
      this.UNe.RefreshItemLayout(t, () => {
        for (const e of this.UNe.GetLayoutItemList()) {
          e.SetFirstRewardVisible(e.GridIndex < s.length);
        }
      });
      this.m8t.Refresh(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueViewInfoRefresh, e);
    }
  }
}
exports.RogueDungeonInfoItem = RogueDungeonInfoItem;
class RogueDungeonEntryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.I5c = undefined;
    this.lqe = undefined;
    this.Q6a = undefined;
    this.As1 = undefined;
    this.ELo = undefined;
    this.$pt = undefined;
    this.KO1 = -1;
    this._5e = () => {
      this.CloseMe();
    };
    this.Bco = e => {
      if (!this.ELo.IsVelocityMoveState() && e.GetData() !== undefined && !(this.ELo.AttachToIndex(e.GetCurrentShowItemIndex(), false), ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e.GetData()))) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RogueRes_DungeonLock");
      }
    };
    this.w5c = () => {
      UiManager_1.UiManager.OpenView("RogueResSkillView", this.I5c.SeasonId);
    };
    this.A5c = () => {
      this.P5c();
    };
    this.nq1 = () => {
      for (const e of this.ELo.GetItems()) {
        e.UnSelectWhenEnter();
      }
    };
    this.ILo = (e, t, i) => {
      var n = new RogueDungeonDataItem_1.RogueDungeonDataItem(e);
      n.CreateByActorAsync(e);
      n.OnToggleClick = this.Bco;
      n.OnSelectCall = this.R5c;
      n.CheckToggleCanClick = this.RHl;
      return n;
    };
    this.RHl = e => !this.ELo.MovingState() && e !== this.KO1;
    this.R5c = e => {
      this.Q6a.RefreshDungeonConfig(e);
      var t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e);
      if (t) {
        this.KO1 = e;
        if (this.$pt?.GetCurrentSequence() === "Switch") {
          this.$pt?.ReplaySequenceByKey("Switch");
        } else if (this.$pt?.GetCurrentSequence() === undefined) {
          this.$pt?.PlayLevelSequenceByName("Switch");
        }
        t = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 0 ? t.CoverF : t.CoverM;
        this.SetTextureByPath(t, this.GetTexture(2));
        t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e);
        this.GetItem(7)?.SetUIActive(!t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var t = this.GetItem(0);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(t.GetOwner()));
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseCallBack(this._5e);
    var t = this.GetItem(1);
    this.Q6a = new RogueDungeonInfoItem();
    e.push(this.Q6a.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(5);
    this.As1 = new RogueOutButtonItem_1.RogueButtonItemA();
    this.As1.SetOnClickCall(this.w5c);
    e.push(this.As1.CreateThenShowByActorAsync(t.GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.I5c = this.OpenParam;
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = this.GetItem(3);
    var t = this.GetItem(8);
    this.ELo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner());
    this.ELo?.SetIfNeedFakeItem(true);
    this.ELo.CreateItems(this.GetItem(4).GetOwner(), 0, this.ILo, 1);
    this.ELo?.SetControllerItem(t);
    this.GetItem(4).SetUIActive(false);
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCurrentSelectedInst(this.I5c.SeasonId);
    var t = this.I5c.DungeonList.includes(e) ? this.I5c.DungeonList.indexOf(e) : 0;
    var e = [...this.I5c.DungeonList];
    this.ELo.ReloadView(e.length, e, t);
  }
  OnBeforeShow() {
    this.P5c();
    this.K8e();
  }
  OnBeforeHide() {
    this.W8e();
  }
  OnBeforeDestroy() {
    this.lqe = undefined;
    this.I5c = undefined;
    this.ELo = undefined;
    this.Q6a = undefined;
    this.$pt = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResTalentLevelUp, this.A5c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResEnterInstClicked, this.nq1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResTalentLevelUp, this.A5c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResEnterInstClicked, this.nq1);
  }
  K8e() {
    this.As1?.BindRedDot("RogueResSkillTree", this.I5c.SeasonId);
  }
  W8e() {
    this.As1?.UnBindRedDot();
  }
  P5c() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillTreeLevel(this.I5c.SeasonId);
    this.As1?.SetNum("Lv." + e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && (e = this.ELo?.GetItemByShowIndex(0)?.GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.RogueDungeonEntryView = RogueDungeonEntryView;
//# sourceMappingURL=RogueDungeonEntryView.js.map