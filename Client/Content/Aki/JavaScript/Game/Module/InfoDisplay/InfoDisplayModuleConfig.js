"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayModuleConfig = undefined;
const InfoDisplayById_1 = require("../../../Core/Define/ConfigQuery/InfoDisplayById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class InfoDisplayModuleConfig extends ConfigBase_1.ConfigBase {
  Hsi(e) {
    e = InfoDisplayById_1.configInfoDisplayById.GetConfig(e);
    if (e) {
      return e;
    }
  }
  GetInfoDisplayType(e) {
    e = this.Hsi(e);
    if (e) {
      return e.Type;
    } else {
      return 0;
    }
  }
  GetInfoDisplayTitle(e) {
    e = this.Hsi(e);
    if (e) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title);
    } else {
      return "";
    }
  }
  GetInfoDisplayDesc(e) {
    e = this.Hsi(e);
    if (e) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Text);
    } else {
      return "";
    }
  }
  GetInfoDisplayAudio(e) {
    e = this.Hsi(e);
    if (e) {
      return e.Audio;
    } else {
      return "";
    }
  }
  GetInfoDisplayBgStamp(e) {
    e = this.Hsi(e);
    if (e) {
      return e.Background;
    } else {
      return "";
    }
  }
  GetInfoDisplayPictures(e) {
    e = this.Hsi(e);
    let i = new Array();
    if (e && e.Picture !== "") {
      return i = e.Picture.split(",");
    } else {
      return i;
    }
  }
}
exports.InfoDisplayModuleConfig = InfoDisplayModuleConfig;
//# sourceMappingURL=InfoDisplayModuleConfig.js.map