"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleOnlineButton = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleEntranceButton_1 = require("./BattleEntranceButton");
const onlinePlayerIconList = ["Online1PIcon", "Online2PIcon", "Online3PIcon"];
class BattleOnlineButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.QYe = undefined;
    this.XYe = "";
    this.$Ye = () => {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 0) {
        this.GetItem(2).SetUIActive(false);
        this.SPe?.StopCurrentSequence();
      }
    };
    this.YYe = () => {
      this.GetItem(2).SetUIActive(true);
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("AutoLoop");
    };
    this.JYe = () => {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.RefreshButtonState();
      }
    };
    this.zYe = () => {
      this.RefreshButtonState();
    };
    this.ZYe = () => {
      this.RefreshButtonState();
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, UE.UIItem], [3, UE.UISprite]);
  }
  Initialize(e) {
    super.Initialize(e);
    if (e) {
      this.QYe = this.GetSprite(3);
      this.AddEvents();
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem.GetParentAsUIItem());
    }
  }
  OnShowBattleChildView() {
    super.OnShowBattleChildView();
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 1) {
      this.GetItem(2).SetUIActive(true);
      if (this.SPe.GetCurrentSequence() === "AutoLoop") {
        this.SPe.ReplaySequenceByKey("AutoLoop");
      } else {
        this.SPe.PlayLevelSequenceByName("AutoLoop");
      }
    } else {
      this.GetItem(2).SetUIActive(false);
      this.SPe?.StopCurrentSequence();
    }
    this.RefreshButtonState();
  }
  Reset() {
    this.SPe?.Clear();
    this.SPe = undefined;
    this.RemoveEvents();
    super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingBegin, this.YYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.JYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnlineDisableStateChange, this.ZYe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingBegin, this.YYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.JYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnlineDisableStateChange, this.ZYe);
  }
  SetGamepadHide(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      super.SetGamepadHide(false);
    } else {
      super.SetGamepadHide(e);
    }
  }
  eJe() {
    let e = undefined;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      var t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t);
      if (!t) {
        return;
      }
      e = onlinePlayerIconList[t.PlayerNumber - 1];
    } else {
      e = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled() ? "OnlineLimitIcon" : "OnlineNoLimitIcon";
    }
    if (this.XYe !== e && !(this.XYe = e, t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e), StringUtils_1.StringUtils.IsEmpty(t))) {
      this.SetSpriteByPath(t, this.QYe, true);
    }
  }
  RefreshButtonState() {
    var e;
    if (this.QYe) {
      if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.GameModeModel.IsMulti, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 1 || e || !Info_1.Info.IsInGamepad())) {
        this.SetOtherHide(false);
        this.eJe();
      } else {
        this.SetOtherHide(true);
      }
    }
  }
}
exports.BattleOnlineButton = BattleOnlineButton;
//# sourceMappingURL=BattleOnlineButton.js.map