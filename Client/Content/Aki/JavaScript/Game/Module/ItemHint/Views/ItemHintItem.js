"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemHintItem = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ItemController_1 = require("../../Item/ItemController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ListSliderControl_1 = require("./ListSliderControl");
const AUDIO_EFFECT_RARE_LEVEL = 4;
const AUDIO_HINT_CD_MS = 500;
class ItemHintItem extends ListSliderControl_1.SliderItem {
  constructor() {
    super(...arguments);
    this.CurSequencePlayer = undefined;
    this.LevelSequencePlayer = undefined;
    this.Data = undefined;
    this.zgi = undefined;
    this.K3t = e => {
      if (e === "Start") {
        this.FinishPlayStart();
      } else if (e === "Move") {
        this.FinishPlayHalfway();
      } else if (e === "Close") {
        this.FinishPlayEnd();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [3, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.K3t);
  }
  OnBeforeDestroy() {
    if (this.LevelSequencePlayer) {
      this.LevelSequencePlayer.Clear();
      this.LevelSequencePlayer = undefined;
    }
  }
  async AsyncLoadUiResource() {
    this.Data = ModelManager_1.ModelManager.ItemHintModel.ShiftMainInterfaceData();
    const e = new CustomPromise_1.CustomPromise();
    this.SetItemIcon(this.GetTexture(0), this.Data.ItemId, undefined, () => {
      e.SetResult(undefined);
    });
    await e.Promise;
  }
  InitData() {
    var e;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Data.ItemId);
    if (t && (e = t.Name, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e), e = this.Data.ItemCount, this.GetText(2).SetText(e.toString()), e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityByItemIdAndQuality(this.Data.ItemId, t.QualityId))) {
      e = UE.Color.FromHex(e.TextColor);
      this.GetText(1).SetColor(e);
      this.GetText(3).SetColor(e);
      this.GetText(2).SetColor(e);
      this.zgi = t.QualityId;
    }
    this.CurSequencePlayer = undefined;
  }
  PlayStart() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
    this.CurSequencePlayer = "Start";
    this.Zgi();
  }
  Zgi() {
    if (this.zgi && this.zgi >= AUDIO_EFFECT_RARE_LEVEL) {
      if (!ItemController_1.ItemController.LastItemHintAudioPlayedTime || Time_1.Time.Now - ItemController_1.ItemController.LastItemHintAudioPlayedTime > AUDIO_HINT_CD_MS || ItemController_1.ItemController.LastItemHintAudioLevel < 2) {
        AudioSystem_1.AudioSystem.PostEvent("play_ui_item_hint_in_list_rare");
        ItemController_1.ItemController.LastItemHintAudioLevel = 2;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Audio", 55, "[Item] 播放高品质物品提示音效");
        }
        ItemController_1.ItemController.LastItemHintAudioPlayedTime = Time_1.Time.Now;
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[Item] 物品音效冷却中，不播放音效");
      }
    } else if (!ItemController_1.ItemController.LastItemHintAudioPlayedTime || Time_1.Time.Now - ItemController_1.ItemController.LastItemHintAudioPlayedTime > AUDIO_HINT_CD_MS) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_item_hint_in_list_normal");
      ItemController_1.ItemController.LastItemHintAudioLevel = 1;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "[Item] 播放普通品质物品提示音效");
      }
      ItemController_1.ItemController.LastItemHintAudioPlayedTime = Time_1.Time.Now;
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 55, "[Item] 物品提示音效冷却中，跳过播放");
    }
  }
  PlayHalfway() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Move");
    this.CurSequencePlayer = "Move";
  }
  PlayEnd() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
    this.CurSequencePlayer = "Close";
  }
  OnActiveStatusChange(e) {
    if (this.CurSequencePlayer) {
      if (e) {
        this.LevelSequencePlayer.PauseSequence();
      } else {
        this.LevelSequencePlayer.ResumeSequence();
      }
    }
  }
}
exports.ItemHintItem = ItemHintItem;
//# sourceMappingURL=ItemHintItem.js.map