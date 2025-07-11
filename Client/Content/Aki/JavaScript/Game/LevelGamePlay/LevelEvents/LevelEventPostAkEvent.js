"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPostAkEvent = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../Manager/ModelManager");
const GameAudioController_1 = require("../../Module/Audio/GameAudioController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPostAkEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      var t;
      var n;
      if (e.EventConfig.Type === IAction_1.EPostAkEvent.Global) {
        const i = (0, AudioSystem_1.parseAudioEventPath)(e.EventConfig.AkEvent);
        if (ModelManager_1.ModelManager.MapModel.CurrentInWorld || e.PersistWhenExitDungeon) {
          AudioSystem_1.AudioSystem.PostEvent(i);
        } else {
          const r = AudioSystem_1.AudioSystem.PostEvent(i, undefined, {
            CallbackHandler: (e, o) => {
              GameAudioController_1.GameAudioController.RemovePostAkEventHandle(r);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Audio", 42, "[PostAkEventAudio] 全局音频事件Handle移除记录", ["Handle", r], ["Event", i]);
              }
            },
            CallbackMask: 1
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
      } else if (e.EventConfig.Type === IAction_1.EPostAkEvent.Target) {
        t = e.EventConfig.EntityId;
        if (n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)) {
          if ((n = n.Entity.GetComponent(1)?.Owner)?.IsValid()) {
            e = (0, AudioSystem_1.parseAudioEventPath)(e.EventConfig.AkEvent);
            AudioSystem_1.AudioSystem.PostEvent(e, n);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Audio", 56, "[Game.Action] PostEvent", ["Event", e], ["Actor", n]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 33, "未能获取到该实体对应的有效Actor", ["entityId", t]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 33, "实体不存在", ["entityId", t]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 33, "参数配置错误");
    }
  }
}
exports.LevelEventPostAkEvent = LevelEventPostAkEvent;
//# sourceMappingURL=LevelEventPostAkEvent.js.map