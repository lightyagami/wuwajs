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
const LevelConditionCenter_1 = require("../LevelConditions/LevelConditionCenter");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPostAkEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      const i = e;
      if (i.EventConfig.Type === IAction_1.EPostAkEvent.Global) {
        const r = (0, AudioSystem_1.parseAudioEventPath)(i.EventConfig.AkEvent);
        if (ModelManager_1.ModelManager.MapModel.CurrentInWorld || i.PersistWhenExitDungeon) {
          if (i.MusicEventType) {
            AudioSystem_1.AudioSystem.PostEvent(r, undefined, {
              CallbackHandler: (e, o) => {
                this.Tmd(e, i);
              },
              CallbackMask: 384
            });
          } else {
            AudioSystem_1.AudioSystem.PostEvent(r);
          }
        } else {
          const a = AudioSystem_1.AudioSystem.PostEvent(r, undefined, {
            CallbackHandler: (e, o) => {
              if (e === 0) {
                GameAudioController_1.GameAudioController.RemovePostAkEventHandle(a);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 全局音频事件Handle移除记录", ["Handle", a], ["Event", r]);
                }
              } else {
                this.Tmd(e, i);
              }
            },
            CallbackMask: (i.MusicEventType ? 384 : 0) | 1
          });
          if (!ModelManager_1.ModelManager.MapModel.CurrentInWorld) {
            GameAudioController_1.GameAudioController.AddPostAkEventHandle(a);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 全局音频事件Handle添加记录", ["Handle", a], ["Event", r]);
            }
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Audio", 56, "[Game.Action] PostEvent", ["Event", r]);
        }
      } else {
        var t;
        var n;
        if (i.EventConfig.Type === IAction_1.EPostAkEvent.Target) {
          e = i.EventConfig.EntityId;
          if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)) {
            if ((t = t.Entity.GetComponent(1)?.Owner)?.IsValid()) {
              n = (0, AudioSystem_1.parseAudioEventPath)(i.EventConfig.AkEvent);
              if (i.MusicEventType) {
                AudioSystem_1.AudioSystem.PostEvent(n, undefined, {
                  CallbackHandler: (e, o) => {
                    this.Tmd(e, i);
                  },
                  CallbackMask: 384
                });
              } else {
                AudioSystem_1.AudioSystem.PostEvent(n, t);
              }
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Audio", 56, "[Game.Action] PostEvent", ["Event", n], ["Actor", t]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 33, "未能获取到该实体对应的有效Actor", ["entityId", e]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 33, "实体不存在", ["entityId", e]);
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 33, "参数配置错误");
    }
  }
  Tmd(e, o) {
    o = o.MusicEventType;
    if (o) {
      if (e === 7) {
        LevelConditionCenter_1.LevelConditionCenter.StartMusicBeatCounter(o);
      } else if (e === 8) {
        LevelConditionCenter_1.LevelConditionCenter.AddMusicBeatCounter(o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CheckMusicBeatsEvent, o, e);
      }
    }
  }
}
exports.LevelEventPostAkEvent = LevelEventPostAkEvent;
//# sourceMappingURL=LevelEventPostAkEvent.js.map