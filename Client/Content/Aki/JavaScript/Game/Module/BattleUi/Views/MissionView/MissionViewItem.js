"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissionViewItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../Core/Container/Queue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const InputSettings_1 = require("../../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const QuestUtil_1 = require("../../../QuestNew/QuestUtil");
const BattleUiDefine_1 = require("../../BattleUiDefine");
const BattleChildView_1 = require("../BattleChildView/BattleChildView");
const FishingEntrustNavigationItem_1 = require("./FishingEntrustNavigationItem");
const MissionPanelStep_1 = require("./MissionPanelStep");
const MissionViewStepTextUtil_1 = require("./MissionViewStepTextUtil");
class ShortcutKeyController {
  constructor() {
    this.v9a = 0;
    this.ShortcutKeyRoot = undefined;
    this.ShortcutKeySprite = undefined;
    this.ShortcutTextComp = undefined;
    this.vct = 0;
    this.mW1 = undefined;
    this.pct = false;
    this.bMe = (t, e) => {
      if (e === 1) {
        this.OnShortcutKeyClick();
      }
    };
    this.UpdateShortcutButton = () => {
      this.fW1();
      this.gW1(this.vct);
    };
  }
  get ShowData() {
    return ModelManager_1.ModelManager.BattleUiModel.GetMissionViewData(this.v9a);
  }
  Init(t, e, i, s) {
    this.v9a = t;
    this.ShortcutKeyRoot = e;
    this.ShortcutKeySprite = i;
    this.ShortcutTextComp = s;
  }
  OnPanelShow() {
    this.UpdateShortcutButton();
  }
  OnPanelHide() {
    this.gW1(0);
  }
  OnProcessStart() {
    this.gW1(0);
  }
  OnProcessEnd() {
    this.UpdateShortcutButton();
  }
  Dispose() {
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.玩法放弃, this.bMe);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
  }
  fW1() {
    var t = void (this.vct = 0);
    if (this.ShowData?.DataSource === 0 && (t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id))) {
      this.vct = t.GetCurrentNodeShortcutShow();
    }
  }
  gW1(t) {
    let e = undefined;
    if (this.ShowData?.DataSource === 0) {
      e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id);
    }
    switch (t) {
      case 0:
        InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.玩法放弃, this.bMe);
        InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
        this.ShortcutKeyRoot.SetUIActive(false);
        break;
      case 1:
        {
          let t = e.GetGiveUpText();
          t = t || ConfigManager_1.ConfigManager.TextConfig.GetTextById("GeneralLogicTreeGiveUp");
          if (Info_1.Info.IsInKeyBoard()) {
            var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.玩法放弃);
            if (!i) {
              this.ShortcutKeyRoot.SetUIActive(false);
              break;
            }
            i = i.GetPcKey();
            if (!i) {
              this.ShortcutKeyRoot.SetUIActive(false);
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("GeneralLogicTree", 18, "pcKey为空", ["actionMapping", InputMappingsDefine_1.actionMappings.玩法放弃]);
              }
              break;
            }
            i = `<texture=${i.GetKeyIconPath()}/>${t}`;
            this.ShortcutTextComp.SetText(i);
          } else if (Info_1.Info.IsInGamepad()) {
            i = this.Nct(InputMappingsDefine_1.actionMappings.玩法放弃, t) ?? t;
            this.ShortcutTextComp.SetText(i);
          } else {
            i = `<texture=${ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("FightMissionStop")}/>${t}`;
            this.ShortcutTextComp.SetText(i);
          }
          this.ShortcutTextComp.SetAlpha(1);
          this.ShortcutTextComp.SetUIActive(true);
          this.ShortcutKeySprite.SetUIActive(false);
          this.ShortcutKeyRoot.SetUIActive(true);
          InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.玩法放弃, this.bMe);
          InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.玩法放弃, this.bMe);
          break;
        }
      case 3:
        {
          let t = e.GetGiveUpText();
          t = t || ConfigManager_1.ConfigManager.TextConfig.GetTextById("ChallengeAgain");
          if (Info_1.Info.IsInKeyBoard()) {
            i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.重新挑战);
            if (!i) {
              this.ShortcutKeyRoot.SetUIActive(false);
              break;
            }
            i = i.GetPcKey();
            if (!i) {
              this.ShortcutKeyRoot.SetUIActive(false);
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("GeneralLogicTree", 18, "pcKey为空", ["actionMapping", InputMappingsDefine_1.actionMappings.重新挑战]);
              }
              break;
            }
            i = `<texture=${i.GetKeyIconPath()}/>${t}`;
            this.ShortcutTextComp.SetText(i);
          } else if (Info_1.Info.IsInGamepad()) {
            i = this.Nct(InputMappingsDefine_1.actionMappings.重新挑战, t) ?? t;
            this.ShortcutTextComp.SetText(i);
          } else {
            i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ChallengeAgain_mobile") ?? t;
            this.ShortcutTextComp.SetText(i);
          }
          this.ShortcutTextComp.SetAlpha(1);
          this.ShortcutTextComp.SetUIActive(true);
          this.ShortcutKeyRoot.SetUIActive(true);
          this.ShortcutKeySprite.SetUIActive(false);
          break;
        }
      case 2:
        {
          i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.任务追踪);
          if (!i) {
            this.ShortcutKeyRoot.SetUIActive(false);
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("GeneralLogicTree", 18, "找不到actionBinding配置", ["actionMapping", InputMappingsDefine_1.actionMappings.任务追踪]);
            }
            break;
          }
          InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
          InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
          var s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("QuestCommunicateCallback");
          let t = s;
          if (Info_1.Info.IsInKeyBoard()) {
            i = i.GetPcKey();
            if (!i) {
              this.ShortcutKeyRoot.SetUIActive(false);
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("GeneralLogicTree", 18, "pcKey为空", ["actionMapping", InputMappingsDefine_1.actionMappings.任务追踪]);
              }
              break;
            }
            i = i.GetKeyIconPath();
            t = `<texture=${i}/>${s}`;
          } else if (Info_1.Info.IsInGamepad()) {
            t = this.Nct(InputMappingsDefine_1.actionMappings.任务追踪, s) ?? s;
          }
          this.ShortcutTextComp.SetText(t);
          this.ShortcutTextComp.SetAlpha(1);
          this.ShortcutTextComp.SetUIActive(true);
          this.ShortcutKeyRoot.SetUIActive(true);
          this.ShortcutKeySprite.SetUIActive(false);
          break;
        }
      case 4:
        if (this.CW1()) {
          InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
          InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
        } else {
          this.ShortcutKeyRoot.SetUIActive(false);
        }
        break;
      case 5:
        {
          i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.任务追踪);
          if (!i) {
            this.ShortcutKeyRoot.SetUIActive(false);
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("GeneralLogicTree", 18, "找不到actionBinding配置", ["actionMapping", InputMappingsDefine_1.actionMappings.任务追踪]);
            }
            break;
          }
          InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
          InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
          s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("QuestTrack_ReadMessage") ?? "";
          let t = s;
          if (Info_1.Info.IsInKeyBoard()) {
            i = i.GetPcKey();
            if (!i) {
              this.ShortcutKeyRoot.SetUIActive(false);
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("GeneralLogicTree", 18, "pcKey为空", ["actionMapping", InputMappingsDefine_1.actionMappings.任务追踪]);
              }
              break;
            }
            i = i.GetKeyIconPath();
            t = `<texture=${i}/>${s}`;
          } else if (Info_1.Info.IsInGamepad()) {
            t = this.Nct(InputMappingsDefine_1.actionMappings.任务追踪, s) ?? s;
          }
          this.ShortcutTextComp.SetText(t);
          this.ShortcutTextComp.SetAlpha(1);
          this.ShortcutTextComp.SetUIActive(true);
          this.ShortcutKeyRoot.SetUIActive(true);
          this.ShortcutKeySprite.SetUIActive(false);
          break;
        }
    }
  }
  UpdateTrackTargetShortcutKey() {
    this.CW1();
  }
  CW1() {
    if (this.vct !== 4) {
      return false;
    }
    var t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.任务追踪);
    if (!t) {
      this.ShortcutKeyRoot.SetUIActive(false);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "找不到actionBinding配置", ["actionMapping", InputMappingsDefine_1.actionMappings.任务追踪]);
      }
      return false;
    }
    if (!this.ShowData || this.ShowData.DataSource !== 0) {
      return false;
    }
    var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id);
    if (!e) {
      return false;
    }
    e = e.GetClosestMapMarkId();
    if (!e) {
      return false;
    }
    var i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!i) {
      return false;
    }
    this.mW1 = ModelManager_1.ModelManager.MapModel.QueryNearestTeleporter(e, 12, i);
    var s = this.mW1.Info === undefined;
    let n = "";
    switch (Info_1.Info.InputControllerMainType) {
      case 1:
        var r = t.GetPcKey();
        if (!r) {
          this.ShortcutTextComp.SetUIActive(false);
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("GeneralLogicTree", 18, "pcKey为空", ["actionMapping", InputMappingsDefine_1.actionMappings.任务追踪]);
          }
          return false;
        }
        var r = r.GetKeyIconPath();
        var a = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(s ? "FastTravel_CurrentLocationIsCloser" : "FastTravel_ClickToFastTravel");
        n = `<texture=${r}/>${a}`;
        break;
      case 2:
        r = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(s ? "FastTravel_CurrentLocationIsCloser" : "FastTravel_ClickToFastTravel");
        n = this.Nct(InputMappingsDefine_1.actionMappings.任务追踪, r) ?? r;
        break;
      case 3:
        n = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(s ? "FastTravel_CurrentLocationIsCloser" : "FastTravel_ClickToFastTravel_Mobile");
    }
    this.ShortcutTextComp.SetText(n);
    this.ShortcutTextComp.SetAlpha(1);
    this.ShortcutTextComp.SetUIActive(true);
    this.ShortcutKeyRoot.SetUIActive(true);
    this.ShortcutKeySprite.SetUIActive(Info_1.Info.InputControllerMainType === 3);
    return true;
  }
  Nct(i, s) {
    var t = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(i);
    if (t) {
      var n = new Map();
      t.GetCurrentPlatformKeyNameMap(n);
      if (n) {
        let t = i;
        let e = i;
        for (var [r, a] of n) {
          r = InputSettings_1.InputSettings.GetKey(r);
          a = InputSettings_1.InputSettings.GetKey(a);
          if (r) {
            t = r.GetKeyIconPath();
          }
          if (a) {
            e = a.GetKeyIconPath();
          }
          break;
        }
        return `<texture=${t}/>+<texture=${e}/>${s}`;
      }
    }
  }
  OnShortcutKeyClick() {
    if (this.ShowData && this.ShowData.DataSource === 0 && !this.pct) {
      this.pct = true;
      const e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id);
      if (e) {
        switch (this.vct) {
          case 1:
            var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(114);
            t.SetCloseFunction(() => {
              if (e.ContainTag(6)) {
                EventSystem_1.EventSystem.EmitWithTarget(e.GetBlackBoard(), EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate);
              }
            });
            t.FunctionMap.set(1, () => {
              this.pct = false;
            });
            t.FunctionMap.set(2, () => {
              if (!this.ShowData || e.ContainTag(6)) {
                this.pct = false;
              } else {
                GeneralLogicTreeController_1.GeneralLogicTreeController.RequestGiveUp(this.ShowData.Id, () => {
                  this.pct = false;
                });
              }
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
            break;
          case 2:
            t = e.GetBlackBoard().GetCurrentCommunicateId();
            if (t !== undefined) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommunicateAgain, t);
              this.UpdateShortcutButton();
              this.pct = false;
            }
            break;
          case 3:
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChallengeAgain, InputMappingsDefine_1.actionMappings.重新挑战);
            this.UpdateShortcutButton();
            this.pct = false;
            break;
          case 4:
            if (this.mW1) {
              if (this.mW1.Info) {
                ControllerHolder_1.ControllerHolder.WorldMapController.FocusNearestTargetOnWorldMap(this.mW1);
                this.pct = false;
              } else if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel.OnShortcutKeyClick,没找到最近的传送点", ["TreeConfigId", e.TreeConfigId], ["FailedReason", this.mW1.FailedReason]);
              }
            }
            break;
          case 5:
            {
              const e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id);
              t = e?.GetCurrentNodeCustomTrackBoard();
              if (t) {
                QuestUtil_1.QuestUtil.HandleTrackCustomBoard(t, true);
              }
              this.pct = false;
              break;
            }
        }
      }
    }
  }
}
class MissionViewItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.OU_ = new ShortcutKeyController();
    this.mct = undefined;
    this.dct = undefined;
    this.TotalTitleSequencePlayer = undefined;
    this.QuestFinishSequencePlayer = undefined;
    this.fct = undefined;
    this.GU_ = new FishingEntrustNavigationItem_1.FishingEntrustNavigationItem();
    this.Zut = 0;
    this.YOn = 0;
    this.ViewType = 0;
    this.$On = false;
    this.jCc = false;
    this.JF_ = undefined;
    this.ZF_ = undefined;
    this.eN_ = undefined;
    this.tN_ = undefined;
    this.UP1 = new Queue_1.Queue();
    this.wct = () => {
      this.OU_.OnShortcutKeyClick();
    };
    this.Uct = t => {
      if (t.Type === 6 && t.TreeIncId === this.ShowDataId) {
        this.OU_.UpdateShortcutButton();
      }
    };
    this.wQt = (t, e) => {
      if (t.Type === 6 && t.TreeIncId === this.ShowDataId) {
        this.zOn(0);
      }
    };
    this.FU_ = t => {
      if (t === 7) {
        this.OU_.UpdateShortcutButton();
      }
    };
    this.pqn = t => {
      if (this.ShowDataId === t && !this.GetText(8).IsUIActiveSelf()) {
        this.GetSprite(0)?.SetUIActive(false);
      }
    };
    this.vqn = t => {
      if (this.ShowDataId === t && !this.GetText(8).IsUIActiveSelf()) {
        this.Ost();
      }
    };
    this.dxn = t => {
      switch (t) {
        case "Start":
          if (this.JF_?.IsPending()) {
            this.JF_.SetResult(true);
          }
          break;
        case "Close":
          if (this.ZF_?.IsPending()) {
            this.ZF_.SetResult(true);
          }
      }
    };
    this.Lct = t => {
      switch (t) {
        case "Start":
          if (this.eN_?.IsPending()) {
            this.eN_.SetResult(true);
          }
          break;
        case "Close":
          if (this.tN_?.IsPending()) {
            this.tN_.SetResult(true);
          }
      }
    };
    this.ZOn = t => {
      this.WU_(t);
      this.Ost();
      this.OU_.UpdateShortcutButton();
    };
    this.fxn = () => {
      var t = this.GetText(8);
      var e = this.GetItem(9);
      var i = this.sec();
      t.SetText(i);
      if (StringUtils_1.StringUtils.IsBlank(i)) {
        t.SetUIActive(false);
        e?.SetUIActive(false);
        return false;
      } else {
        t.SetUIActive(true);
        e?.SetUIActive(true);
        return true;
      }
    };
    this.Ect = () => {
      var t;
      if (this.ShowData?.DataSource === 0 && this.ShowData.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.ShowData.TreeConfigId);
        this.GetText(6).SetText(t?.Name ?? "");
      }
    };
    this.Sct = () => {
      var t;
      var e;
      if (this.ShowData && (t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMarkConfig(this.ShowData.TrackIconConfigId)) && (e = this.GetUiNiagara(7))) {
        e.SetColor(UE.Color.FromHex(t.TrackTextStartEffectColor));
        e.ActivateSystem(true);
      }
    };
    this.Rct = t => {
      if (t === this.ShowData?.Id) {
        this.zOn(0);
      }
    };
  }
  get ShowDataId() {
    return this.ShowData?.Id;
  }
  get ShowData() {
    return ModelManager_1.ModelManager.BattleUiModel.GetMissionViewData(this.ViewType);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UINiagara], [8, UE.UIText], [9, UE.UIItem], [10, UE.UISprite], [11, UE.UIItem]];
    this.BtnBindInfo = [[3, this.wct]];
  }
  async OnBeforeStartAsync() {
    this.ViewType = this.OpenParam;
    this.VU_();
    this.jU_();
    await this.HU_();
    await this.$U_();
  }
  jU_() {
    this.OU_.Init(this.ViewType, this.GetItem(11), this.GetSprite(10), this.GetText(2));
  }
  VU_() {
    this.GetText(2).SetAlpha(1);
    this.GetItem(1).SetUIActive(false);
    this.mct = this.GetItem(5);
    this.mct.SetUIActive(true);
    this.dct = this.GetItem(4);
    this.dct.SetUIActive(false);
    this.GetUiNiagara(7).SetNiagaraUIActive(true, false);
  }
  async HU_() {
    var t = this.GetItem(1);
    this.fct = new MissionPanelStep_1.MissionPanelStep(this.ViewType, -1);
    await this.fct.CreateThenShowByActorAsync(t.GetOwner(), 0);
  }
  async $U_() {
    await this.GU_.CreateByResourceIdAsync("UiItem_MissionNavigation", this.GetItem(9));
    await this.GU_.HideAsync();
  }
  OnStart() {
    this.GetText(6).OnSelfLanguageChange.Bind(this.Ect);
    this.GetText(8).OnSelfLanguageChange.Bind(this.fxn);
    this.TotalTitleSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.mct);
    this.TotalTitleSequencePlayer.BindSequenceCloseEvent(this.dxn);
    this.QuestFinishSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.dct);
    this.QuestFinishSequencePlayer.BindSequenceCloseEvent(this.Lct);
  }
  OnBeforeDestroy() {
    this.OU_.Dispose();
    this.fct?.Destroy();
    this.GU_.Destroy();
    this.RootActor?.OnSequencePlayEvent.Unbind();
    this.TotalTitleSequencePlayer?.Clear();
    this.TotalTitleSequencePlayer = undefined;
  }
  OnPanelShow() {
    this.$On = true;
    this.Ore();
    this.QuestFinishSequencePlayer.ResumeSequence();
    this.TotalTitleSequencePlayer.ResumeSequence();
    this.UP1.Push(0);
    this.OU_.OnPanelShow();
    this.fxn();
  }
  OnPanelHide() {
    this.$On = false;
    this.kre();
    this.QuestFinishSequencePlayer.PauseSequence();
    this.TotalTitleSequencePlayer.PauseSequence();
    this.UP1.Push(1);
    this.OU_.OnPanelHide();
  }
  BP1() {
    if (!this.UP1.Empty) {
      switch (this.UP1.Pop()) {
        case 0:
          if (this.jCc) {
            this.fct?.Show();
          }
          break;
        case 1:
          this.jCc = this.fct.IsShowOrShowing;
          this.fct.Hide();
      }
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange, this.Uct);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeProgressChange, this.wQt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.Uct);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeAddTag, this.FU_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeRemoveTag, this.FU_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.Rct);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MissionPanelStepTitleAnimStart, this.pqn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd, this.vqn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStageNameChange, this.fxn);
    if (!Info_1.Info.IsInTouch()) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.OU_.UpdateShortcutButton);
    }
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange, this.Uct);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeProgressChange, this.wQt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.Uct);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeAddTag, this.FU_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeRemoveTag, this.FU_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.Rct);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MissionPanelStepTitleAnimStart, this.pqn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd, this.vqn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStageNameChange, this.fxn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.OU_.UpdateShortcutButton);
  }
  WU_(t) {
    ModelManager_1.ModelManager.BattleUiModel.SetMissionViewData(this.ViewType, t);
  }
  Ost() {
    var t;
    var e;
    if (this.ShowData && (t = this.ShowData.TrackIconConfigId)) {
      e = this.GetSprite(0);
      if (MissionViewStepTextUtil_1.MissionViewStepTextUtil.CheckShowConfigEmpty(this.ShowData)) {
        e.SetUIActive(false);
      } else {
        e.SetUIActive(true);
        this.SetSpriteByPath(ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(t), e, false);
      }
    }
  }
  async StartShow(t, e, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow流程开始", ["showDataId", e.Id]);
    }
    if (ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.get(this.ViewType)) {
      await this.fct?.OnReset();
    }
    ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.set(this.ViewType, true);
    this.Zut = t;
    this.OU_.OnProcessStart();
    this.ZOn(e);
    let s = i;
    if (!this.CheckVisible()) {
      s = true;
    }
    var t = this.fxn();
    var i = e.DataSource;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow数据更新完毕", ["是否在totalSequence之后播步骤开始动画", t], ["DataSource", i]);
    }
    if (i === 1) {
      await this.GU_.ShowAsync();
    } else {
      await this.GU_.HideAsync();
    }
    if (!s) {
      TimerSystem_1.GameplayTimerSystem.Next(this.Sct);
    }
    await this.ShowAsync();
    this.mct?.SetUIActive(true);
    this.TotalTitleSequencePlayer.PlayLevelSequenceByName("Start");
    if (t) {
      await this.fct.HideAsync();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow TotalSequence播放开始");
      }
      this.JF_ = new CustomPromise_1.CustomPromise();
      if (s) {
        this.TotalTitleSequencePlayer.EndSequenceLastFrame("Start");
      }
      await this.JF_.Promise;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow TotalSequence播放结束");
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow StepSequence播放开始");
      }
      await this.fct.StartShow(e, s);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow StepSequence播放结束");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow TotalSequence以及StepSequence播放开始");
      }
      i = [];
      this.JF_ = new CustomPromise_1.CustomPromise();
      if (s) {
        this.TotalTitleSequencePlayer.EndSequenceLastFrame("Start");
      }
      i.push(this.JF_.Promise);
      i.push(this.fct.StartShow(e, s));
      await Promise.all(i);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow TotalSequence以及StepSequence播放结束");
      }
    }
    this.Zut = 0;
    this.OU_.OnProcessEnd();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionViewItem.StartShow流程结束", ["showDataId", e.Id]);
    }
    return true;
  }
  async OnLogicTreeUpdateShow(t, e, i) {
    this.Zut = t;
    this.OU_.OnProcessStart();
    this.fct.Update();
    await this.fct.ExecuteSequenceOnUpdate(e, this.ZOn, i);
    this.Zut = 0;
    this.OU_.OnProcessEnd();
    return true;
  }
  async EndShow(t, e, i) {
    ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.set(this.ViewType, false);
    if (this.IsShowOrShowing) {
      this.Zut = t;
      this.OU_.OnProcessStart();
      if (i === 2) {
        this.Ect();
        this.mct.SetUIActive(false);
        this.dct.SetUIActive(true);
        this.QuestFinishSequencePlayer.PlayLevelSequenceByName("Start");
        this.eN_ = new CustomPromise_1.CustomPromise();
        if (e) {
          this.QuestFinishSequencePlayer.EndSequenceLastFrame("Start");
        }
        await this.eN_.Promise;
        this.QuestFinishSequencePlayer.PlayLevelSequenceByName("Close");
        this.tN_ = new CustomPromise_1.CustomPromise();
        if (e) {
          this.QuestFinishSequencePlayer.EndSequenceLastFrame("Close");
        }
        await this.tN_.Promise;
        this.mct.SetUIActive(true);
        this.dct.SetUIActive(false);
      } else {
        this.TotalTitleSequencePlayer.PlayLevelSequenceByName("Close");
        this.ZF_ = new CustomPromise_1.CustomPromise();
        if (e) {
          this.TotalTitleSequencePlayer.EndSequenceLastFrame("Close");
        }
        await this.ZF_.Promise;
        await this.fct.OnReset();
        await this.HideAsync();
      }
      this.Zut = 0;
      this.OU_.OnProcessEnd();
      this.WU_(undefined);
    } else {
      this.WU_(undefined);
    }
    return true;
  }
  async ChildStepConditionIndexChange(t, e) {
    return this.fct.ChildStepConditionIndexChange(t, e);
  }
  sec() {
    if (this.ShowData && this.ShowData.TitleTextKey) {
      return PublicUtil_1.PublicUtil.GetConfigTextByKey(this.ShowData.TitleTextKey);
    } else {
      return "";
    }
  }
  OnRefresh(t, e) {
    this.BP1();
    if (this.$On) {
      this.fct.OnTick(t);
      if (this.YOn > BattleUiDefine_1.REFRESH_POSITION_INTERVAL) {
        this.YOn -= BattleUiDefine_1.REFRESH_POSITION_INTERVAL;
        this.zOn(e);
      }
      this.YOn += t;
    }
  }
  zOn(t) {
    if (!t || t !== this.Zut) {
      if (this.CheckVisible()) {
        this.fct.Update();
        this.OU_.UpdateTrackTargetShortcutKey();
        this.mct?.SetUIActive(true);
      } else {
        this.mct?.SetUIActive(false);
      }
    }
  }
  CheckVisible() {
    if (!ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible) {
      return false;
    }
    if (!this.ShowData || !ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.get(this.ViewType)) {
      return false;
    }
    switch (this.ShowData.DataSource) {
      case 0:
        if (this.ShowData.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(this.ShowData.BtType, this.ShowData.TreeConfigId);
          if (t && t.CanShowTrackExpression()) {
            break;
          }
        }
        return false;
    }
    return !MissionViewStepTextUtil_1.MissionViewStepTextUtil.CheckShowConfigEmpty(this.ShowData);
  }
}
exports.MissionViewItem = MissionViewItem;
//# sourceMappingURL=MissionViewItem.js.map