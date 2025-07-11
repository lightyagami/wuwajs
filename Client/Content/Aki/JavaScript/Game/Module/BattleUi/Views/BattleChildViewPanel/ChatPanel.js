"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const InputManager_1 = require("../../../../Ui/Input/InputManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../../Ui/UiManager");
const ChatDefine_1 = require("../../../Chat/ChatDefine");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleSkillLeftRouletteItem_1 = require("../BattleSkillLeftRouletteItem");
const ChatRowItem_1 = require("../ChatRowItem");
const CommonKeyItem_1 = require("../KeyItem/CommonKeyItem");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class ChatPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.oze = new Map();
    this.OJs = [];
    this.rze = undefined;
    this.nze = 0;
    this.sze = undefined;
    this.aze = false;
    this.hze = undefined;
    this.Mah = undefined;
    this.SPe = undefined;
    this.FGn = e => {
      if (this.GetOperationType() === 2) {
        this.gze().then(() => {
          if (this.oze.size <= 0) {
            this.Pze(false);
          } else {
            this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY);
            if (!e || !!ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()) {
              this.uze();
            }
          }
        }, () => {});
      }
    };
    this.XBo = () => {
      this.dze();
    };
    this.Eze = () => {
      if (!Info_1.Info.IsInTouch()) {
        this.Sze();
        this.yze();
      }
    };
    this.RZe = e => {
      this.Sah();
    };
    this.Ize = () => {
      if (!UiManager_1.UiManager.IsViewShow("ChatView")) {
        UiManager_1.UiManager.OpenView("ChatView");
      }
    };
    this.bMe = (e, t) => {
      if (e === InputMappingsDefine_1.actionMappings.环境特性) {
        if (InputManager_1.InputManager.IsAllowOpenViewByShortcutKey() && t === 0) {
          switch (ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurEnvironmentalKey() ?? 0) {
            case 1:
              this.Tze();
              break;
            case 2:
              this.Lze();
              break;
            case 3:
              this.mXn();
              break;
            case 4:
              this.Dze();
              break;
            case 5:
              this.bZa();
              break;
            case 6:
              this.TG_();
              break;
            case 8:
              this.Kz1();
              break;
            case 7:
              this.Hw1();
              break;
            case 9:
              this.Q0u();
          }
        }
      } else if (e === InputMappingsDefine_1.actionMappings.组合主键) {
        this.Rze(t);
      }
    };
    this.Uze = () => {
      this.fze();
    };
    this.Aze = () => {
      this.SPe.StopCurrentSequence();
      this.SPe.PlaySequencePurely("Close");
    };
  }
  InitializeTemp() {
    this.nze = CommonParamById_1.configCommonParamById.GetIntConfig("ChatViewTimeDown");
    var e = this.GetOperationType();
    if (e === 2) {
      this.gze().then(() => {
        if (!(this.oze.size <= 0) && ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()) {
          this.uze();
          this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY);
        } else {
          this.Pze(false);
        }
      }, () => {});
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(3));
    }
    if (e === 1) {
      RedDotController_1.RedDotController.BindRedDot("ChatView", this.GetItem(1));
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(2));
    }
    this.SPe.BindSequenceCloseEvent(e => {
      if (e === "Close") {
        this.Pze(false);
      }
    });
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRedDot);
  }
  Reset() {
    super.Reset();
    this.xze();
    this.wze();
    if (this.GetOperationType() === 1) {
      RedDotController_1.RedDotController.UnBindRedDot("ChatView");
    }
  }
  OnRegisterComponent() {
    var e = this.GetOperationType();
    if (e === 2) {
      this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem]];
      this.BtnBindInfo = [[0, this.Ize]];
    } else if (e === 1) {
      this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem]];
      this.BtnBindInfo = [[0, this.Ize]];
    }
  }
  async InitializeAsync() {
    var e;
    await super.InitializeAsync();
    if (!Info_1.Info.IsInTouch()) {
      e = this.GetItem(8);
      this.hze = new CommonKeyItem_1.CommonKeyItem();
      await this.hze.CreateThenShowByActorAsync(e.GetOwner());
      await this.yah();
    }
  }
  async yah() {
    var e = this.GetItem(10)?.GetOwner();
    if (e) {
      this.Mah = new BattleSkillLeftRouletteItem_1.BattleSkillLeftRouletteItem();
      await this.Mah.CreateThenShowByActorAsync(e);
    }
  }
  OnShowBattleChildViewPanel() {
    var e = Info_1.Info.OperationType;
    if (e === 2) {
      var t = ModelManager_1.ModelManager.FriendModel;
      var i = [];
      for (const a of this.oze.values()) {
        var r;
        var n;
        var s = a.GetChatRowData();
        if (s) {
          r = s.UniqueId;
          if ((n = s.TargetPlayerId) && t.HasBlockedPlayer(n)) {
            i.push(r);
          }
          if (!s.IsVisible) {
            i.push(r);
          }
        }
      }
      for (const h of i) {
        this.mze(h);
      }
      if (this.oze.size <= 0) {
        this.wze();
        this.Pze(false);
      } else {
        this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY);
      }
      e = ModelManager_1.ModelManager.BattleUiModel.EnvironmentKeyData;
      e.SetEnvironmentKeyVisible(2, this.Bze());
      e.SetEnvironmentKeyVisible(4, this.bze());
      e.SetEnvironmentKeyVisible(7, this.QW1());
      e.SetEnvironmentKeyVisible(9, this.K0u());
      this.hze?.RefreshAction(InputMappingsDefine_1.actionMappings.功能菜单);
      this.yze();
      this.dze();
      this.SPe.StopCurrentSequence();
      this.SPe.PlaySequencePurely("Start");
    }
  }
  dze() {
    var e = Info_1.Info.IsInGamepad();
    this.GetItem(5)?.SetUIActive(e);
    this.Sze();
    this.Sah();
  }
  Sze() {
    var e = Info_1.Info.IsInGamepad();
    var t = ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurEnvironmentalKey() ?? 0;
    this.GetItem(7)?.SetUIActive(t !== 0 && this.aze && e);
  }
  yze() {
    var e = ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurKeyText();
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e);
    }
  }
  Sah() {
    this.Mah?.RefreshVisible();
  }
  AddEvents() {
    if (this.GetOperationType() === 2) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshChatRowData, this.FGn);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged, this.Eze);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressCombineButtonChanged, this.RZe);
      InputDistributeController_1.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.环境特性, InputMappingsDefine_1.actionMappings.组合主键], this.bMe);
    }
  }
  RemoveEvents() {
    if (this.GetOperationType() === 2) {
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnRefreshChatRowData, this.FGn)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshChatRowData, this.FGn);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.InputControllerChange, this.XBo)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged, this.Eze)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged, this.Eze);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.BattleUiPressCombineButtonChanged, this.RZe)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressCombineButtonChanged, this.RZe);
      }
      InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.环境特性, InputMappingsDefine_1.actionMappings.组合主键], this.bMe);
    }
  }
  Rze(e) {
    this.aze = e === 0;
    this.Sze();
  }
  Lze() {
    if (!!this.Bze() && !UiManager_1.UiManager.IsViewShow("TowerGuideView")) {
      UiManager_1.UiManager.OpenView("TowerGuideView");
    }
  }
  Bze() {
    return ModelManager_1.ModelManager.TowerModel.CheckInTower();
  }
  mXn() {
    ControllerHolder_1.ControllerHolder.InstanceDungeonGuideController.StartReplayGuide();
  }
  Dze() {
    var e;
    if (this.bze()) {
      e = ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue() ? "WeeklyRogueInfo" : "RogueInfoView";
      if (!UiManager_1.UiManager.IsViewShow(e)) {
        UiManager_1.UiManager.OpenView(e);
      }
    }
  }
  bze() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() || ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue();
  }
  QW1() {
    return ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance();
  }
  K0u() {
    return !!ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive();
  }
  Tze() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView);
  }
  bZa() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView);
  }
  TG_() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleShipTowerBuffInfo);
  }
  Kz1() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleMoraleBuffInfo);
  }
  Hw1() {
    if (!UiManager_1.UiManager.IsViewOpen("RogueBattleSummary")) {
      UiManager_1.UiManager.OpenView("RogueBattleSummary");
    }
  }
  Q0u() {
    if (ModelManager_1.ModelManager.MoraleModel?.IsInitData && ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive()) {
      UiManager_1.UiManager.OpenView("MoraleAreaSumView");
    }
  }
  async gze() {
    this.qze();
    var e;
    var t = [];
    for (const i of ModelManager_1.ModelManager.ChatModel.GetChatRowDataList()) {
      if (i.IsVisible) {
        e = this._ze(i);
        t.push(e);
      }
    }
    await Promise.all(t);
  }
  async _ze(e) {
    var t = e.UniqueId;
    if (e.ContentChatRoomType === 1) {
      var i = e.TargetPlayerId;
      if (!i) {
        return;
      }
      var r = ModelManager_1.ModelManager.FriendModel;
      var n = r.GetFriendById(i);
      if (!n) {
        return;
      }
      if (r.HasBlockedPlayer(i) || n.GetBlockBySdk()) {
        return;
      }
    }
    r = this.GetItem(2);
    i = await this.NewDynamicChildViewByResourceId(r, "UiItem_ChatRowItem_Prefab", ChatRowItem_1.ChatRowItem, true, e);
    this.oze.set(t, i);
    this.OJs.push(t);
  }
  DelayScroll(e) {
    this.xze();
    if (this.GetOperationType() === 2) {
      this.sze = TimerSystem_1.GameplayTimerSystem.Delay(this.Uze, e);
    }
  }
  xze() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.sze)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.sze);
    }
    this.sze = undefined;
  }
  wze() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.rze)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.rze);
    }
    this.rze = undefined;
  }
  fze() {
    var e = this.NJs();
    if (e) {
      this.GetScrollViewWithScrollbar(1)?.ScrollTo(e.GetRootItem());
    }
  }
  mze(e) {
    var t = this.oze.get(e);
    if (t?.GetRootActor()?.IsValid()) {
      t.Destroy();
    }
    this.oze.delete(e);
    var t = this.OJs.indexOf(e);
    if (t >= 0) {
      this.OJs.splice(t, 1);
    }
  }
  qze() {
    for (const e of this.oze.values()) {
      if (e?.GetRootActor()?.IsValid()) {
        e.Destroy();
      }
    }
    this.oze.clear();
    this.OJs.length = 0;
  }
  NJs() {
    var e = this.OJs.length;
    if (!(e <= 0)) {
      e = this.OJs[e - 1];
      if (e) {
        return this.oze.get(e);
      }
    }
  }
  uze() {
    this.wze();
    if (!this.GetItem(3)?.bIsUIActive) {
      this.SPe.StopCurrentSequence();
      this.SPe.PlaySequencePurely("Start");
    }
    this.Pze(true);
    this.rze = TimerSystem_1.GameplayTimerSystem.Delay(this.Aze, this.nze);
  }
  Pze(e) {
    this.GetItem(3)?.SetUIActive(e);
    ModelManager_1.ModelManager.BattleUiModel.ChatScrollViewVisible = e;
  }
  OnAfterDestroy() {
    super.OnAfterDestroy();
    ModelManager_1.ModelManager.BattleUiModel.ChatScrollViewVisible = false;
  }
}
exports.ChatPanel = ChatPanel;
//# sourceMappingURL=ChatPanel.js.map