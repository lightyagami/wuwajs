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
const DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView");
const BattleSkillLeftRouletteItem_1 = require("../BattleSkillLeftRouletteItem");
const ChatRowItem_1 = require("../ChatRowItem");
const CommonKeyItem_1 = require("../KeyItem/CommonKeyItem");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class ChatPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.rze = undefined;
    this.nze = 0;
    this.sze = undefined;
    this.aze = false;
    this.hze = undefined;
    this.Mah = undefined;
    this.SPe = undefined;
    this.SOd = undefined;
    this.MOd = undefined;
    this.uwg = [];
    this.NPn = (e, t, i) => {
      return new ChatRowItem_1.ChatRowDynamicItem();
    };
    this.FGn = e => {
      if (this.GetOperationType() === 2) {
        this.gze();
        this.dwg(e);
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
    this.GBf = e => {
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
              this.yJ1();
              break;
            case 7:
              this.Hw1();
              break;
            case 9:
              this.Qpu();
          }
        }
      } else if (e === InputMappingsDefine_1.actionMappings.组合主键) {
        this.Rze(t);
      }
    };
    this.mwg = () => {
      if (!(this.uwg.length <= 0) && ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()) {
        this.uze();
        this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY);
      } else {
        this.fwg(false);
      }
    };
    this.dwg = e => {
      if (this.uwg.length <= 0) {
        this.fwg(false);
      } else {
        this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY);
        if (!e || !!ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()) {
          this.uze();
        }
      }
    };
    this.Uze = () => {
      if (!(this.uwg.length <= 0)) {
        this.SOd?.ScrollToItemIndex(this.uwg.length - 1);
      }
    };
    this.Aze = () => {
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlaySequencePurely("Close");
    };
  }
  OnRegisterComponent() {
    var e = this.GetOperationType();
    if (e === 2) {
      this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIDynScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem]];
      this.BtnBindInfo = [[0, this.Ize]];
    } else if (e === 1) {
      this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem]];
      this.BtnBindInfo = [[0, this.Ize]];
    }
  }
  InitializeTemp() {
    this.nze = CommonParamById_1.configCommonParamById.GetIntConfig("ChatViewTimeDown");
    var e = this.GetOperationType();
    if (e === 2) {
      this.gze();
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(3));
    }
    if (e === 1) {
      RedDotController_1.RedDotController.BindRedDot("ChatView", this.GetItem(1));
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(2));
    }
    this.SPe?.BindSequenceCloseEvent(e => {
      if (e === "Close") {
        this.fwg(false);
      }
    });
  }
  async InitializeAsync() {
    var e;
    await super.InitializeAsync();
    if (!Info_1.Info.IsInTouch()) {
      this.MOd = new ChatRowItem_1.ChatRowDynamicItemSize();
      this.SOd = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(1), this.GetItem(11), this.MOd, this.NPn);
      await this.SOd.Init();
      e = this.GetItem(8);
      this.hze = new CommonKeyItem_1.CommonKeyItem();
      await this.hze.CreateThenShowByActorAsync(e.GetOwner());
      await this.yah();
    }
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
  OnAfterDestroy() {
    super.OnAfterDestroy();
    ModelManager_1.ModelManager.BattleUiModel.ChatScrollViewVisible = false;
  }
  async yah() {
    var e = this.GetItem(10)?.GetOwner();
    if (e) {
      this.Mah = new BattleSkillLeftRouletteItem_1.BattleSkillLeftRouletteItem();
      await this.Mah.CreateThenShowByActorAsync(e);
    }
  }
  OnShowBattleChildViewPanel() {
    var e;
    if (Info_1.Info.OperationType === 2) {
      this.gze();
      this.mwg();
      (e = ModelManager_1.ModelManager.BattleUiModel.EnvironmentKeyData).SetEnvironmentKeyVisible(2, this.Bze());
      e.SetEnvironmentKeyVisible(4, this.bze());
      e.SetEnvironmentKeyVisible(7, this.QW1());
      e.SetEnvironmentKeyVisible(9, this.Kpu());
      this.hze?.RefreshAction(InputMappingsDefine_1.actionMappings.功能菜单);
      this.yze();
      this.dze();
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlaySequencePurely("Start");
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
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.RZe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.GBf);
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
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.RZe)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.RZe);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.GBf)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.GBf);
      }
      InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.环境特性, InputMappingsDefine_1.actionMappings.组合主键], this.bMe);
    }
  }
  Rze(e) {
    this.aze = e === 0;
    this.Sze();
  }
  Bze() {
    return ModelManager_1.ModelManager.TowerModel.CheckInTower();
  }
  bze() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() || ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue();
  }
  QW1() {
    return ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance();
  }
  Kpu() {
    return !!ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive();
  }
  Lze() {
    if (!!this.Bze() && !UiManager_1.UiManager.IsViewShow("TowerGuideView")) {
      UiManager_1.UiManager.OpenView("TowerGuideView");
    }
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
  Tze() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView);
  }
  bZa() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView);
  }
  TG_() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleShipTowerBuffInfo);
  }
  yJ1() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleMoraleBuffInfo);
  }
  Hw1() {
    if (!UiManager_1.UiManager.IsViewOpen("RogueBattleSummary")) {
      UiManager_1.UiManager.OpenView("RogueBattleSummary");
    }
  }
  Qpu() {
    if (ModelManager_1.ModelManager.MoraleModel?.IsInitData && ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive()) {
      UiManager_1.UiManager.OpenView("MoraleAreaSumView");
    }
  }
  gze() {
    this.uwg.length = 0;
    this.gwg();
    this.SOd?.RefreshByData(this.uwg, true, true);
    this.SOd?.BindLateUpdate(() => {
      this.SOd?.ScrollToItemIndex(this.uwg.length - 1);
      this.SOd?.UnBindLateUpdate();
    });
  }
  gwg() {
    for (const n of ModelManager_1.ModelManager.ChatModel.GetChatRowDataList()) {
      if (n.ContentChatRoomType === 1) {
        var e = n.TargetPlayerId;
        if (!e) {
          continue;
        }
        var t = ModelManager_1.ModelManager.FriendModel;
        var i = t.GetFriendById(e);
        if (!i) {
          continue;
        }
        if (t.HasBlockedPlayer(e) || i.GetBlockBySdk()) {
          continue;
        }
      }
      this.uwg.push(n);
    }
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
  uze() {
    this.wze();
    if (!this.GetItem(3)?.bIsUIActive) {
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlaySequencePurely("Start");
    }
    this.fwg(true);
    this.rze = TimerSystem_1.GameplayTimerSystem.Delay(this.Aze, this.nze);
  }
  fwg(e) {
    this.GetItem(3)?.SetUIActive(e);
    ModelManager_1.ModelManager.BattleUiModel.ChatScrollViewVisible = e;
  }
}
exports.ChatPanel = ChatPanel;
//# sourceMappingURL=ChatPanel.js.map