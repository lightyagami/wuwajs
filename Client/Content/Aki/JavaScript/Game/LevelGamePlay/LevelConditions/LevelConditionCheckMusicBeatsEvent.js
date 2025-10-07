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
  CheckNew(t, e, n) {
    if (t) {
      let e = n;
      if ((e = n?.Type === 11 ? n.GetContextByType(10) : e)?.Type === 10) {
        var n = e.Params;
        var o = n[0];
        var n = n[1];
        if (t.MusicEvent.Type === o) {
          if (n === 7) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelCondition", 79, "[音乐节拍] 触发音乐开始行为", ["MusicEventType", o]);
            }
            return true;
          }
          if (n === 8) {
            var i = LevelConditionCenter_1.LevelConditionCenter.GetMusicBeatCounter(o);
            if (!i) {
              return false;
            }
            var n = t.MusicEvent.BeatType;
            var r = ConfigManager_1.ConfigManager.MusicBeatTypeConfig.GetMusicBeatTypeConfig(n);
            if (!r) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelCondition", 79, "[音乐节拍] 音乐配置不存在", ["BeatType", n]);
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
    var n;
    var o = t.BeatConfig;
    if (o.length !== 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 79, "[音乐节拍] 不合法的节拍配置", ["BeatType", t.BeatType]);
      }
      return false;
    } else {
      n = o[0];
      o = o[1];
      return n <= e && (e - n) % o == 0 && (LevelConditionCenter_1.LevelConditionCenter.MusicBeatLogOpen && Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelCondition", 79, "[音乐节拍] 触发节拍行为", ["MusicType", t.MusicType], ["BeatType", t.BeatType], ["StartBeatIndex", n], ["BeatInterval", o], ["BeatCount", e]), true);
    }
  }
  h2d(e, t) {
    for (const n of t.BeatConfig) {
      if (e === n) {
        if (LevelConditionCenter_1.LevelConditionCenter.MusicBeatLogOpen && Log_1.Log.CheckInfo()) {
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