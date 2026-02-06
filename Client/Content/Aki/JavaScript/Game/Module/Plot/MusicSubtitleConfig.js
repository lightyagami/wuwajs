"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicSubtitleConfig = undefined;
const MusicSubTitleBySubtitleGroupTag_1 = require("../../../Core/Define/ConfigQuery/MusicSubTitleBySubtitleGroupTag");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MusicSubtitleConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetMusicSubtitle(e) {
    return MusicSubTitleBySubtitleGroupTag_1.configMusicSubTitleBySubtitleGroupTag.GetConfigList(e);
  }
}
exports.MusicSubtitleConfig = MusicSubtitleConfig;
//# sourceMappingURL=MusicSubtitleConfig.js.map