"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefCompModifyActorMedia = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const RefCompControllerBase_1 = require("./RefCompControllerBase");
class RefCompModifyActorMedia extends RefCompControllerBase_1.RefCompControllerBase {
  constructor() {
    super(...arguments);
    this.Type = 3;
  }
  HandleActorMedia(e) {
    if (e.Config.Type === "ChangeMediaPlayDA") {
      this.Ztg(e.Config);
    }
  }
  Ztg(s) {
    const a = s.MediaPlayDa;
    if (a && a !== "None") {
      ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.PDA_MediaPlayDataAsset_C, e => {
        if (e?.IsValid()) {
          for (const r of s.ActorRefs) {
            var o = this.GetActorByActorRef(r, "[ChangeMediaDA]");
            if (o?.IsValid()) {
              if (o.IsA(UE.MediaPlayForModel_Extra_C.StaticClass())) {
                const t = o;
                t.Stop();
                TimerSystem_1.TimerSystem.Next(() => {
                  t.MediaPlayDataAsset = e;
                  t.ReInit();
                  t.PlaySound();
                  t.OpenSource();
                });
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 58, "[ChangeMediaDA]actor不存在", ["path", r.PathName]);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 58, "加载DA失败", ["path", a]);
        }
      });
    } else {
      for (const o of s.ActorRefs) {
        var e = this.GetActorByActorRef(o, "[ChangeMediaDA]");
        if (e?.IsValid()) {
          if (e.IsA(UE.MediaPlayForModel_Extra_C.StaticClass())) {
            (e = e).MediaPlayDataAsset = undefined;
            e.CloseSource();
            e.CloseSound();
            e.ReInit();
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 58, "[ChangeMediaDA]actor不存在", ["path", o.PathName]);
        }
      }
    }
  }
}
exports.RefCompModifyActorMedia = RefCompModifyActorMedia;
//# sourceMappingURL=RefCompModifyActorMedia.js.map