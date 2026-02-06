"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerModeSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const WheelTowerScoreItem_1 = require("../Component/WheelTowerScoreItem");
const ICON_PLAY = "/Game/Aki/UI/UIResources/UiActivity/Atlas/ActivityMowingTower/MowingTower30/Main/SP_IconPlay.SP_IconPlay";
const ICON_LOCK = "/Game/Aki/UI/UIResources/UiActivity/Atlas/ActivityMowingTower/MowingTower30/Main/SP_IconLock.SP_IconLock";
class WheelTowerModeSelectView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.Wrf = undefined;
    this.Qrf = undefined;
    this.eel = undefined;
    this.Hea = undefined;
    this.MRf = () => {
      this.Og(true);
      this.GetItem(25)?.SetUIActive(ModelManager_1.ModelManager.WheelTowerModel.ActivityData.ShouldShowRewardRedDot());
    };
    this.zrf = () => {
      UiManager_1.UiManager.OpenView("WheelTowerRewardView", undefined, (e, t) => {
        if (e) {
          this.AddChildViewById(t);
        }
      });
    };
    this.Jrf = () => {
      UiManager_1.UiManager.OpenView("WheelTowerRoundSelectView");
    };
    this.lPe = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton();
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UIText], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIText], [14, UE.UIText], [15, UE.UIButtonComponent], [16, UE.UIText], [17, UE.UITexture], [18, UE.UITexture], [19, UE.UITexture], [20, UE.UITexture], [21, UE.UITexture], [22, UE.UITexture], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem]];
    this.BtnBindInfo = [[12, this.zrf], [15, this.Jrf]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Wrf = new ModeToggleItem();
    e.push(this.Wrf.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Qrf = new ModeToggleItem();
    e.push(this.Qrf.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    var t = ModelManager_1.ModelManager.WheelTowerModel.ActivityData;
    var i = t.IsLevelUnlocked(false);
    var t = t.IsLevelUnlocked(true);
    if (i || t) {
      e.push(ActivityControllerHolder_1.ActivityControllerHolder.WheelTowerController.RequestRoleEnergyUpdate());
    }
    e.push(this.NVf());
    await Promise.all(e);
  }
  OnStart() {
    this.Qyi?.SetCloseCallBack(this.lPe);
    this.Wrf?.SetToggleClickCallback(() => {
      this.Aqd(false);
      this.Og();
    });
    this.Qrf?.SetToggleClickCallback(() => {
      this.Aqd(true);
      this.Og();
    });
    this.eel = new WheelTowerScoreItem_1.WheelTowerScoreItem(this, this.GetItem(10));
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.lyf();
    this.lpf();
    this._rm();
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
  }
  lpf() {
    var e = ModelManager_1.ModelManager.WheelTowerModel;
    this.R3a();
    let t = e.EndlessMode;
    if (!e.ActivityData.IsLevelUnlocked(t)) {
      t = false;
    }
    this.Aqd(t);
    this.Wrf?.SetToggleStateForce(!t);
    this.Qrf?.SetToggleStateForce(t);
  }
  OnTick(e) {
    var [t, i] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(ModelManager_1.ModelManager.WheelTowerModel.ActivityData);
    var s = this.GetText(16);
    s?.SetUIActive(t);
    if (t) {
      s?.SetText(i);
    }
  }
  OnBeforeShow() {
    this.OnTick(0);
    this.MRf();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.MRf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.MRf);
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.NVf();
  }
  Aqd(e) {
    ModelManager_1.ModelManager.WheelTowerModel.SetEndlessMode(e);
  }
  lyf() {
    this.GetItem(1)?.SetUIActive(true);
    this.GetItem(2)?.SetUIActive(true);
    this.GetItem(23)?.SetUIActive(true);
    this.GetItem(24)?.SetUIActive(true);
  }
  Og(e = false) {
    var t = ModelManager_1.ModelManager.WheelTowerModel.EndlessMode;
    var i = t ? "SwitchB_W" : "SwitchW_B";
    this.Hea?.PlayOrReplaySequenceByName(i);
    if (e) {
      this.Hea?.EndSequenceLastFrame(i);
    }
    this.R3a();
    this.Wrf?.SetToggleStateForce(!t);
    this.Qrf?.SetToggleStateForce(t);
    var e = ModelManager_1.ModelManager.WheelTowerModel;
    var i = e.GetMaxChallengeRound() + 1;
    this.GetText(9)?.SetText(i.toString());
    var t = e.GetTotalScore();
    this.GetText(11)?.SetText(t.toString());
    var i = e.GetTotalScoreLevel(t);
    this.eel?.Refresh(i);
    var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigById(e.GetCurrentLevelRecord().Hif.Wif);
    this.SetTextureShowUntilLoaded(t.SmallIcon, this.GetTexture(6));
    var i = e.ActivityData.GetCurrentRewardProgress(0);
    var t = e.ActivityData.GetTotalRewardProgress(0);
    this.GetText(13)?.SetText(i.toString());
    this.GetText(14)?.SetText(t.toString());
  }
  R3a() {
    this.Wrf?.Refresh(false);
    this.Qrf?.Refresh(true);
  }
  async NVf() {
    var e;
    var t = ModelManager_1.ModelManager.WheelTowerModel;
    var i = [];
    if (t.ActivityData.IsLevelUnlocked(false)) {
      e = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigById(t.ActivityData.GetLevelRecord(false).Hif.Wif);
      i.push(this.SetTextureAsync(e.BigIcon[0], this.GetTexture(3)));
      i.push(this.SetTextureAsync(e.BigIcon[1], this.GetTexture(4)));
      i.push(this.SetTextureAsync(e.BigIcon[0], this.GetTexture(17)));
      i.push(this.SetTextureAsync(e.BigIcon[1], this.GetTexture(18)));
    }
    if (t.ActivityData.IsLevelUnlocked(true)) {
      e = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigById(t.ActivityData.GetLevelRecord(true).Hif.Wif);
      i.push(this.SetTextureAsync(e.BigIcon[0], this.GetTexture(19)));
      i.push(this.SetTextureAsync(e.BigIcon[1], this.GetTexture(21)));
      i.push(this.SetTextureAsync(e.BigIcon[0], this.GetTexture(20)));
      i.push(this.SetTextureAsync(e.BigIcon[1], this.GetTexture(22)));
    }
    await Promise.all(i);
  }
  _rm() {
    this.UiBehaviourHomeBtn?.AddExtraAsyncCallback(async () => {
      if (ModelManager_1.ModelManager.WheelTowerModel.CheckInInstanceDungeon()) {
        await ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      }
    });
  }
}
exports.WheelTowerModeSelectView = WheelTowerModeSelectView;
class ModeToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Erf = undefined;
    this.N8e = () => {
      this.Erf?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggleSpriteTransition], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    const e = this.GetExtendToggle(0);
    e.CanExecuteChange.Bind(() => e.ToggleState !== 1);
    this.SetToggleStateForce(false);
  }
  Refresh(e) {
    var t = ModelManager_1.ModelManager.WheelTowerModel;
    var i = t.ActivityData.IsLevelUnlocked(e);
    var s = t.IsLevelCompleted(e);
    this.SetExtendToggleSpriteTransitionByPath(i ? ICON_PLAY : ICON_LOCK, this.GetUiExtendToggleSpriteTransition(1));
    this.GetExtendToggle(0)?.SetSelfInteractive(i);
    this.GetItem(3)?.SetUIActive(s);
    this.GetUiExtendToggleSpriteTransition(1)?.RootUIComp.SetUIActive(!s);
    if (e) {
      this.GetText(2)?.ShowTextNew(i ? "PrefabTextItem_2898489298_Text" : "WheelTower_EndlessCondition");
    }
    this.GetItem(4)?.SetUIActive(t.ActivityData.HasLevelRedDot(e));
  }
  SetToggleClickCallback(e) {
    this.Erf = e;
  }
  SetToggleStateForce(e) {
    this.GetExtendToggle(0)?.SetToggleStateForce(e ? 1 : 0, false);
  }
}
//# sourceMappingURL=WheelTowerModeSelectView.js.map