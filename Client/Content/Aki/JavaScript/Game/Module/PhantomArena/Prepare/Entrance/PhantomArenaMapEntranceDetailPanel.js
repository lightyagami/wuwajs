"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMapEntranceDetailPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ConditionGroupData_1 = require("../../../Activity/ConditionGroupData");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
class PhantomArenaMapEntranceDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Mli = undefined;
    this.H3e = undefined;
    this.Wpm = undefined;
    this.hyc = 0;
    this.$pt = undefined;
    this.fsf = 0;
    this.BaseCloseCallBack = undefined;
    this.gsf = undefined;
    this.K3t = e => {
      if (e === "Close") {
        this.Gh_();
      }
    };
    this.Close = (e, t = true) => {
      this.gsf = e;
      this.fsf = 1;
      if (t) {
        this.$pt?.PlaySequence("Close");
      } else {
        this.Gh_();
      }
    };
    this.Awe = () => {
      this.Close();
    };
    this.g5m = () => {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(this.hyc);
      if (e) {
        if (ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeStateById(this.hyc) === 2) {
          this.MPf(e.TeleporterId, e.ReChallengeQuestId);
        } else {
          this.Bwf(e.TeleporterId, e.QuestId);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "PhantomArenaMapEntranceDetailPanel:获取挑战信息失败", ["ChallengeId", this.hyc]);
      }
    };
    this.YCu = () => {
      UiManager_1.UiManager.ResetToBattleView();
    };
    this.ru_ = () => {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(this.hyc);
      if (e) {
        var t = [];
        var i = ConfigManager_1.ConfigManager.ConditionConfig?.GetGroupConditionIds(e.OpenConditionGroupId);
        if (i) {
          for (const a of i) {
            var n = ConfigManager_1.ConfigManager.ConditionConfig?.GetConditionConfig(a);
            if (n) {
              let e = -1;
              if (!StringUtils_1.StringUtils.IsEmpty(n.Description)) {
                if (n.AccessId) {
                  r = ConfigManager_1.ConfigManager.GetWayConfig?.GetConfigById(n.AccessId);
                  e = r?.SkipName ?? -1;
                }
                var r = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(this.hyc);
                const o = {
                  ConditionId: a,
                  ConditionTextId: n.Description,
                  IsFinished: r?.qS_.includes(a) ?? false,
                  AccessId: n.AccessId,
                  AccessType: e
                };
                t.push(o);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("PhantomArena", 87, "获取条件配置失败", ["ConditionId", a]);
            }
          }
          const o = new ConditionGroupData_1.ConditionGroupData(e.OpenConditionGroupId, t);
          UiManager_1.UiManager.OpenView("CommonConditionView", o);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 87, "获取条件组失败", ["OpenConditionGroupId", e?.OpenConditionGroupId]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "获取挑战信息失败", ["ChallengeId", this.hyc]);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIText]];
    this.BtnBindInfo = [[0, this.Awe], [11, this.g5m]];
  }
  async OnBeforeStartAsync() {
    await this.Qpm();
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), () => new CardElementItem_1.CardElementItem());
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    });
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem());
    this.$pt.BindOnEndSequenceEvent(this.K3t);
  }
  ShowPanel(e) {
    this.SetActive(true);
    this.$pt?.ReplaySequence("Start");
    this.Refresh(e);
    this.fsf = 0;
    if (this.$pt?.IsSequenceInPlaying("Start")) {
      this.$pt?.ReplaySequence("Start");
    } else {
      this.$pt?.PlaySequence("Start");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetWorldMapCursorButtonVisible, false);
  }
  Gh_() {
    this.SetActive(false);
    this.m2e();
  }
  m2e() {
    this.fsf = 2;
    this.BaseCloseCallBack?.();
    this.gsf?.();
    this.gsf = undefined;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetWorldMapCursorButtonVisible, true);
  }
  Bwf(e, t) {
    var i = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(t);
    if (i === 1 || i === 2) {
      ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(t, true, 2);
      i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, i.Tree.BtType, i.Tree.TreeIncId);
    }
    ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(e, this.YCu);
  }
  MPf(e, t) {
    var t = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(t);
    if (t === 1 || t === 2) {
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(423)).FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(e, this.YCu);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    } else {
      ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(e, this.YCu);
    }
  }
  Refresh(e) {
    this.hyc = e;
    var t;
    var i;
    var n = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(e);
    if (n) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), n.ChallengeName);
      this.GetText(2)?.SetText(n.NpcLevel.toString());
      i = (t = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(e)?.VCf ?? true) ? n.NpcName : "PhantomBattle_1164";
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(3), i);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), n.NpcTitle);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(7), n.FieldInfoDesc);
      i = t ? n.NpcDesc : "PhantomBattle_1165";
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(8), i);
      t = n.Elements;
      this.Mli?.RefreshByData(t);
      if (ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeStateById(e) === 2) {
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(13), "PhantomBattle_1155");
      } else {
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(13), "PhantomBattle_1154");
      }
      i = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentRewardListByChallengeId(e);
      this.H3e?.RefreshByData(i);
      this.Kpm();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "获取挑战信息失败", ["ChallengeId", e]);
    }
  }
  Kpm() {
    var e;
    if (ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(this.hyc)) {
      e = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeStateById(this.hyc) === 0;
      this.Wpm?.SetUiActive(false);
      this.GetButton(11)?.RootUIComp.SetUIActive(true);
      if (e) {
        this.Csf();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "获取挑战配置失败", ["ChallengeId", this.hyc]);
    }
  }
  Csf() {
    var e;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(this.hyc);
    if (t) {
      if (e = ConfigManager_1.ConfigManager.ConditionConfig?.GetGroupConditionIds(t.OpenConditionGroupId)) {
        if (e = this.vsf(e)) {
          this.Wpm?.SetTextByTextId(e);
        }
        this.Wpm?.SetUiActive(true);
        this.Wpm?.SetButtonVisible(true);
        this.GetButton(11)?.RootUIComp.SetUIActive(false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "获取条件组失败", ["OpenConditionGroupId", t.OpenConditionGroupId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "获取挑战配置失败", ["ChallengeId", this.hyc]);
    }
  }
  vsf(e) {
    var t = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(this.hyc);
    for (const i of e) {
      if (!t?.qS_.includes(i)) {
        return ConfigManager_1.ConfigManager.ConditionConfig?.GetConditionConfig(i)?.Description;
      }
    }
  }
  async Qpm() {
    this.Wpm = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    this.Wpm.ButtonCallBack = this.ru_;
    await this.Wpm.CreateThenShowByActorAsync(this.GetItem(12).GetOwner());
  }
  get IsUiOpen() {
    return this.fsf === 0;
  }
  get IsUiCloseComplete() {
    return this.fsf === 2;
  }
  get IsUiClose() {
    return this.fsf === 1;
  }
}
exports.PhantomArenaMapEntranceDetailPanel = PhantomArenaMapEntranceDetailPanel;
//# sourceMappingURL=PhantomArenaMapEntranceDetailPanel.js.map