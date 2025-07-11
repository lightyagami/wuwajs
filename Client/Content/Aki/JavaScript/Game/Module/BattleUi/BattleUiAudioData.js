"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiAudioData = exports.BattleUiAudioInfo = undefined;
const Time_1 = require("../../../Core/Common/Time");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const DEFAULT_COOL_DOWN = 500;
const audioIds = ["play_ui_fb_concerto_energy", "play_ui_fb_concerto_energy_rogue", "play_scene_ui_fight_focus_on", "play_scene_ui_fight_focus_switch"];
class BattleUiAudioInfo {
  constructor() {
    this.AudioType = 0;
    this.CoolDownEndTime = 0;
    this.UiChildType = 0;
  }
  PlayAudio() {
    if (!(Time_1.Time.Now < this.CoolDownEndTime)) {
      if (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(this.UiChildType)) {
        this.vQe();
      }
    }
  }
  vQe() {
    this.CoolDownEndTime = Time_1.Time.Now + DEFAULT_COOL_DOWN;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiPlayAudio, audioIds[this.AudioType]);
  }
  Reset() {
    this.CoolDownEndTime = 0;
  }
}
exports.BattleUiAudioInfo = BattleUiAudioInfo;
class BattleUiAudioData {
  constructor() {
    this.MQe = new Map();
  }
  Init() {}
  OnLeaveLevel() {
    for (const e of this.MQe.values()) {
      e.Reset();
    }
  }
  Clear() {}
  PlayAudio(e, t = 0) {
    let i = this.MQe.get(e);
    if (!i) {
      (i = new BattleUiAudioInfo()).AudioType = e;
      this.MQe.set(e, i);
    }
    i.UiChildType = t;
    i.PlayAudio();
  }
}
exports.BattleUiAudioData = BattleUiAudioData;
//# sourceMappingURL=BattleUiAudioData.js.map