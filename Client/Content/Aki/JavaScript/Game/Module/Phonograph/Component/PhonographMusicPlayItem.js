"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographMusicPlayItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PhonographMusicPlayItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnClickMusicItem = undefined;
    this.MusicId = 0;
    this.TotalTime = 0;
    this.CurrentTime = 0;
    this.UpdateTimeHandle = undefined;
    this.LevelSequencePlayer = undefined;
    this.yY_ = e => {
      this.GetItem(7).SetUIActive(e === this.MusicId);
    };
    this.fr_ = e => {
      if (this.MusicId !== e) {
        this.GetSprite(6).SetAlpha(0);
      }
    };
    this.vr_ = () => {
      if (this.OnClickMusicItem) {
        this.OnClickMusicItem(this.MusicId, this.GridIndex);
      }
      this.GetSprite(6).SetAlpha(1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographSelectDisable, this.MusicId);
    };
    this.eTt = () => {
      if (ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId === this.MusicId) {
        this.GetExtendToggle(0).SetToggleState(1, false);
      }
      if (this.OnClickMusicItem) {
        this.OnClickMusicItem(this.MusicId, this.GridIndex);
      }
      if (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(this.MusicId)) {
        this.RefreshTime();
        this.GetItem(4).SetUIActive(false);
        this.LevelSequencePlayer.PlaySequencePurely("Play");
      }
    };
    this.OnPlayStop = () => {
      if (this.MusicId === ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId) {
        this.GetText(3).SetText(TimeUtil_1.TimeUtil.GetTimeString(this.TotalTime));
        this.GetSprite(2).SetFillAmount(0);
        this.GetExtendToggle(0).SetToggleState(0, false);
        this.LevelSequencePlayer?.PlaySequencePurely("Stop");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhonographPlayStop, this.OnPlayStop);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhonographSelectDisable, this.fr_);
    this.GetExtendToggle(0).bCanClickWhenDisable = true;
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.vr_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhonographSetBgm, this.yY_);
  }
  OnTick() {
    if (this.MusicId === ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId) {
      this.RefreshTime();
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhonographPlayStop, this.OnPlayStop);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhonographSelectDisable, this.fr_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhonographSetBgm, this.yY_);
  }
  RefreshTime() {
    var e = ModelManager_1.ModelManager.PhonographModel.GetCurrentPlayTimeFromAudio();
    this.GetText(3).SetText(TimeUtil_1.TimeUtil.GetTimeString(e) + "/" + TimeUtil_1.TimeUtil.GetTimeString(this.TotalTime));
    this.GetSprite(2).SetFillAmount(e / this.TotalTime);
  }
  Refresh(e, t, i) {
    this.MusicId = e.Id;
    var s;
    var h = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e.Id);
    if (h) {
      this.GetItem(7).SetUIActive(ModelManager_1.ModelManager.PhonographModel.RecordMusicId === e.Id);
      this.TotalTime = Math.floor(e.Duration);
      if (s = ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId === e.Id) {
        this.RefreshTime();
      } else {
        this.GetSprite(2).SetFillAmount(0);
        this.GetText(3).SetText(TimeUtil_1.TimeUtil.GetTimeString(this.TotalTime));
      }
      if (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e.Id)) {
        this.LevelSequencePlayer.PlaySequencePurely("Unlock");
      } else {
        this.LevelSequencePlayer.PlaySequencePurely("Lock");
      }
      if (s) {
        this.LevelSequencePlayer.PlaySequencePurely("Play");
      } else {
        this.LevelSequencePlayer.PlaySequencePurely("Stop");
      }
      s = s ? 1 : 0;
      this.GetSprite(6).SetAlpha(t ? 1 : 0);
      this.GetExtendToggle(0).CanExecuteChange.Unbind();
      this.GetExtendToggle(0).SetToggleState(s, false);
      this.GetExtendToggle(0).CanExecuteChange.Bind(() => ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId === this.MusicId && ModelManager_1.ModelManager.PhonographModel?.CurrentSelectMusicId !== this.MusicId || (ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId !== this.MusicId && ModelManager_1.ModelManager.PhonographModel?.CurrentSelectMusicId === this.MusicId ? (this.eTt(), false) : ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId !== this.MusicId));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), h.Title);
      this.GetItem(4).SetUIActive(ModelManager_1.ModelManager.PhonographModel.IsNewMusic(e.Id));
    }
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1, false);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0, false);
  }
  OnBeforeDestroy() {
    if (this.UpdateTimeHandle) {
      TimerSystem_1.TimerSystem.Remove(this.UpdateTimeHandle);
      this.UpdateTimeHandle = undefined;
    }
  }
}
exports.PhonographMusicPlayItem = PhonographMusicPlayItem;
//# sourceMappingURL=PhonographMusicPlayItem.js.map