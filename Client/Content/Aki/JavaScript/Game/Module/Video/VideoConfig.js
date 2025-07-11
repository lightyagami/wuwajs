"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoConfig = exports.VideoQteConfig = exports.VideoSubtitle = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const VideoCaptionByCgName_1 = require("../../../Core/Define/ConfigQuery/VideoCaptionByCgName");
const VideoDataByCgNameAndGirlOrBoy_1 = require("../../../Core/Define/ConfigQuery/VideoDataByCgNameAndGirlOrBoy");
const VideoQteByCgName_1 = require("../../../Core/Define/ConfigQuery/VideoQteByCgName");
const VideoSoundByCgNameAndGirlOrBoy_1 = require("../../../Core/Define/ConfigQuery/VideoSoundByCgNameAndGirlOrBoy");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class VideoSubtitle {
  constructor(e, o, i, r) {
    this.ShowMoment = e;
    this.Duration = o;
    this.CaptionText = i;
    this.CaptionId = r;
  }
}
exports.VideoSubtitle = VideoSubtitle;
class VideoQteConfig {
  constructor(e, o) {
    this.ShowMoment = e;
    this.QteId = o;
  }
}
exports.VideoQteConfig = VideoQteConfig;
class VideoConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetVideoData(e) {
    let o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (o === 2) {
      o = 0;
    }
    var i = VideoDataByCgNameAndGirlOrBoy_1.configVideoDataByCgNameAndGirlOrBoy.GetConfig(e, o);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Video", 38, "找不到cg视频配置！", ["名称", e]);
      }
    }
    return i;
  }
  GetVideoCaptions(e, o) {
    var i = VideoCaptionByCgName_1.configVideoCaptionByCgName.GetConfigList(e);
    if (!i || i.length === 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Video", 38, "找不到cg字幕配置！", ["名称", e]);
      }
      return [];
    }
    const r = [];
    switch (o) {
      case "en":
        i.forEach(e => {
          if (e.DurationEn !== 0) {
            r.push(new VideoSubtitle(e.ShowMomentEn, e.DurationEn, e.CaptionText, e.CaptionId));
          }
        });
        break;
      case "ja":
        i.forEach(e => {
          if (e.DurationJa !== 0) {
            r.push(new VideoSubtitle(e.ShowMomentJa, e.DurationJa, e.CaptionText, e.CaptionId));
          }
        });
        break;
      case "ko":
        i.forEach(e => {
          if (e.DurationKo !== 0) {
            r.push(new VideoSubtitle(e.ShowMomentKo, e.DurationKo, e.CaptionText, e.CaptionId));
          }
        });
    }
    if (r.length > 0) {
      return r;
    } else {
      return i;
    }
  }
  GetVideoQte(e, o) {
    var i = VideoQteByCgName_1.configVideoQteByCgName.GetConfigList(e);
    if (!i || i.length === 0) {
      return [];
    }
    const r = [];
    switch (o) {
      case "en":
        i.forEach(e => {
          if (e.ShowMomentEn !== 0) {
            r.push(new VideoQteConfig(e.ShowMomentEn, e.QteId));
          }
        });
        break;
      case "ja":
        i.forEach(e => {
          if (e.ShowMomentJa !== 0) {
            r.push(new VideoQteConfig(e.ShowMomentJa, e.QteId));
          }
        });
        break;
      case "ko":
        i.forEach(e => {
          if (e.ShowMomentKo !== 0) {
            r.push(new VideoQteConfig(e.ShowMomentKo, e.QteId));
          }
        });
    }
    if (r.length > 0) {
      return r;
    } else {
      return i;
    }
  }
  GetVideoCaptionText(e) {
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.CaptionText);
    return ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e);
  }
  GetVideoSounds(o) {
    let i = VideoSoundByCgNameAndGirlOrBoy_1.configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(o, 2);
    if (!i || i.length === 0) {
      let e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      if (e === 2) {
        e = 0;
      }
      i = VideoSoundByCgNameAndGirlOrBoy_1.configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(o, e);
    }
    if (i && i.length !== 0) {
      return i;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Video", 38, "找不到cg字幕配置！", ["名称", o]);
      }
      return [];
    }
  }
}
exports.VideoConfig = VideoConfig;
//# sourceMappingURL=VideoConfig.js.map