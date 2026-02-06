"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPostAkEvent = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const GameAudioController_1 = require("../../Module/Audio/GameAudioController");
const UiManager_1 = require("../../Ui/UiManager");
const LevelConditionCenter_1 = require("../LevelConditions/LevelConditionCenter");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPostAkEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      const n = e;
      if (n.EventConfig.Type === IAction_1.EPostAkEvent.Global) {
        const i = (0, AudioSystem_1.parseAudioEventPath)(n.EventConfig.AkEvent);
        if (ModelManager_1.ModelManager.MapModel.CurrentInWorld || n.PersistWhenExitDungeon) {
          if (n.MusicEventType) {
            AudioSystem_1.AudioSystem.PostEvent(i, undefined, {
              CallbackHandler: (e, o) => {
                this.Pgd(e, o, n);
              },
              CallbackMask: 384
            });
          } else {
            AudioSystem_1.AudioSystem.PostEvent(i);
          }
        } else {
          const r = AudioSystem_1.AudioSystem.PostEvent(i, undefined, {
            CallbackHandler: (e, o) => {
              if (e === 0) {
                GameAudioController_1.GameAudioController.RemovePostAkEventHandle(r);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 全局音频事件Handle移除记录", ["Handle", r], ["Event", i]);
                }
              } else {
                this.Pgd(e, o, n);
              }
            },
            CallbackMask: (n.MusicEventType ? 384 : 0) | 1
          });
          if (!ModelManager_1.ModelManager.MapModel.CurrentInWorld) {
            GameAudioController_1.GameAudioController.AddPostAkEventHandle(r);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 全局音频事件Handle添加记录", ["Handle", r], ["Event", i]);
            }
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Audio", 56, "[Game.Action] PostEvent", ["Event", i]);
        }
      } else {
        if (n.EventConfig.Type === IAction_1.EPostAkEvent.Target) {
          var e = n.EventConfig.EntityId;
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
          if (!t) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 33, "实体不存在", ["entityId", e]);
            }
            return;
          }
          t = t.Entity.GetComponent(1)?.Owner;
          if (!t?.IsValid()) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 33, "未能获取到该实体对应的有效Actor", ["entityId", e]);
            }
            return;
          }
          e = (0, AudioSystem_1.parseAudioEventPath)(n.EventConfig.AkEvent);
          if (n.MusicEventType) {
            AudioSystem_1.AudioSystem.PostEvent(e, undefined, {
              CallbackHandler: (e, o) => {
                this.Pgd(e, o, n);
              },
              CallbackMask: 384
            });
          } else {
            AudioSystem_1.AudioSystem.PostEvent(e, t);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 56, "[Game.Action] PostEvent", ["Event", e], ["Actor", t]);
          }
        }
        if (n.EventConfig.Type === IAction_1.EPostAkEvent.MusicSubtitle) {
          UiManager_1.UiManager.OpenView("MusicSubtitleView", n.EventConfig);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 33, "参数配置错误");
    }
  }
  Pgd(e, o, t) {
    t = t.MusicEventType;
    if (t) {
      if (e === 7) {
        LevelConditionCenter_1.LevelConditionCenter.StartMusicBeatCounter(t);
      } else if (e === 8) {
        if (o && ((o = o.SegmentInfo).CurrentPosition <= 0 && LevelConditionCenter_1.LevelConditionCenter.StartMusicBeatCounter(t), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Audio", 79, "[音乐节拍] 触发MusicSyncBeat事件", ["MusicEventType", t], ["CurrentPosition", o.CurrentPosition], ["BeatCount", LevelConditionCenter_1.LevelConditionCenter.GetMusicBeatCounter(t) + 1]);
        }
        LevelConditionCenter_1.LevelConditionCenter.AddMusicBeatCounter(t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CheckMusicBeatsEvent, t, e);
      }
    }
  }
}
exports.LevelEventPostAkEvent = LevelEventPostAkEvent;
//# sourceMappingURL=LevelEventPostAkEvent.js.map