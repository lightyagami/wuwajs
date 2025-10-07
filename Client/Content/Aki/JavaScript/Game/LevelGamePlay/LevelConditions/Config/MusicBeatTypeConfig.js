"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicBeatTypeConfig = undefined;
const MusicBeatTypeByBeatType_1 = require("../../../../Core/Define/ConfigQuery/MusicBeatTypeByBeatType");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class MusicBeatTypeConfig extends ConfigBase_1.ConfigBase {
  GetMusicBeatTypeConfig(e) {
    return MusicBeatTypeByBeatType_1.configMusicBeatTypeByBeatType.GetConfig(e);
  }
}
exports.MusicBeatTypeConfig = MusicBeatTypeConfig;
//# sourceMappingURL=MusicBeatTypeConfig.js.map