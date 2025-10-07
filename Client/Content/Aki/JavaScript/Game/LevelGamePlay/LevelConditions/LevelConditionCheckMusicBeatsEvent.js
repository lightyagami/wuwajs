"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckMusicBeatsEvent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelConditionCenter_1 = require("./LevelConditionCenter");
class LevelConditionCheckMusicBeatsEvent extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(t, e, o) {
    if (t) {
      let e = o;
      if ((e = o?.Type === 11 ? o.GetContextByType(10) : e)?.Type === 10) {
        var o = e.Params;
        var n = o[0];
        var o = o[1];
        if (t.MusicEvent.Type === n) {
          if (o === 7) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelCondition", 79, "[音乐节拍] 触发音乐开始行为", ["MusicEventType", n]);
            }
            return true;
          }
          if (o === 8) {
            var i = LevelConditionCenter_1.LevelConditionCenter.GetMusicBeatCounter(n);
            if (!i) {
              return false;
            }
            var o = t.MusicEvent.BeatType;
            var r = ConfigManager_1.ConfigManager.MusicBeatTypeConfig.GetMusicBeatTypeConfig(o);
            if (!r) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelCondition", 79, "[音乐节拍] 音乐配置不存在", ["BeatType", o]);
              }
              return false;
            }
            switch (r.BeatConfigType) {
              case "LoopBeat":
                if (this.a2d(i, r)) {
                  return true;
                }
                break;
              case "SpecialBeat":
                if (this.h2d(i, r)) {
                  return true;
                }
                break;
              default:
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("LevelCondition", 79, "[音乐节拍] 不支持的节拍规则", ["BeatConfigType", r.BeatConfigType]);
                }
            }
          }
        }
      }
    }
    return false;
  }
  a2d(e, t) {
    var o;
    var n = t.BeatConfig;
    if (n.length !== 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 79, "[音乐节拍] 不合法的节拍配置", ["BeatType", t.BeatType]);
      }
      return false;
    } else {
      o = n[0];
      n = n[1];
      return o <= e && (e - o) % n == 0 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelCondition", 79, "[音乐节拍] 触发节拍行为", ["MusicType", t.MusicType], ["BeatType", t.BeatType], ["StartBeatIndex", o], ["BeatInterval", n], ["BeatCount", e]), true);
    }
  }
  h2d(e, t) {
    for (const o of t.BeatConfig) {
      if (e === o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelCondition", 79, "[音乐节拍] 触发节拍行为", ["MusicType", t.MusicType], ["BeatType", t.BeatType], ["BeatCount", e]);
        }
        return true;
      }
    }
    return false;
  }
}
exports.LevelConditionCheckMusicBeatsEvent = LevelConditionCheckMusicBeatsEvent;
//# sourceMappingURL=LevelConditionCheckMusicBeatsEvent.js.map