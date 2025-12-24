"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoBpController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class VideoBpController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.jio = ModelManager_1.ModelManager.VideoBpModel;
    return true;
  }
  static OnClear() {
    return true;
  }
  static Ydd() {
    return this.jio.SpawnOrGetVideoBp();
  }
  static RemoveBp() {
    this.jio.RemoveOnVideoEnd();
  }
  static RemovePreload() {
    this.jio.RemovePreload();
  }
  static async PreloadMp4s(e) {
    var o = [];
    for (const r of e) {
      o.push(this.Wgd(r));
    }
    await Promise.all(o);
  }
  static async Wgd(o) {
    const r = new CustomPromise_1.CustomPromise();
    const t = ConfigManager_1.ConfigManager.VideoConfig.GetVideoData(o);
    if (t) {
      ResourceSystem_1.ResourceSystem.LoadAsync(t.CgFile, UE.MediaSource, e => {
        if (e) {
          this.jio.AddToPreloadMap(o, e);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Video", 45, "PreloadMp4Internal mediaSource加载失败", ["配置名称", t.CgName], ["视频路径", t.CgFile]);
        }
        r.SetResult();
      });
    } else {
      r.SetResult();
    }
    return r.Promise;
  }
  static PlayEffect(o) {
    const r = this.Ydd();
    if (!r) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Preload", 45, "[VideoBp]生成VideoBp蓝图失败");
      }
    }
    const t = ConfigManager_1.ConfigManager.VideoConfig.GetVideoData(o.Path);
    var e;
    if (t) {
      if (e = this.jio.GetFromPreloadMap(t.CgName)) {
        r.PlayEffect(t.CgFile, new UE.Vector2D(o.ScreenPos.X ?? 0, o.ScreenPos.Y ?? 0), o.Scale ?? 1, o.FadeInTime ?? 1, o.FadeOutTime ?? 1, e, o.IsFullScreenMask ?? false);
      } else {
        ResourceSystem_1.ResourceSystem.LoadAsync(t.CgFile, UE.MediaSource, e => {
          if (e) {
            r.PlayEffect(t.CgFile, new UE.Vector2D(o.ScreenPos.X ?? 0, o.ScreenPos.Y ?? 0), o.Scale ?? 1, o.FadeInTime ?? 1, o.FadeOutTime ?? 1, e, o.IsFullScreenMask ?? false);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Video", 45, "VideoBpController mediaSource加载失败", ["配置名称", t.CgName], ["视频路径", t.CgFile]);
          }
        });
      }
      return true;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Preload", 45, "[VideoBp]获取VideoData失败");
      }
      return false;
    }
  }
}
(exports.VideoBpController = VideoBpController).jio = undefined;
//# sourceMappingURL=VideoBpController.js.map