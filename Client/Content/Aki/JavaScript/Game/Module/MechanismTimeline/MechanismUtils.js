"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MechanismUtils = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
class MechanismUtils {
  static GetAllAnimNotifyEvents(e) {
    return MechanismUtils.fZu(e, false);
  }
  static GetAllAnimNotifyStateEvents(e) {
    return MechanismUtils.fZu(e, true);
  }
  static GetAllAnimNotifyEventsByPath(e, t) {
    MechanismUtils.gZu(e).then(e => {
      if (e) {
        e = MechanismUtils.GetAllAnimNotifyEvents(e);
        t(e);
      }
    });
  }
  static GetAllAnimNotifyStateEventsByPath(e, t) {
    MechanismUtils.gZu(e).then(e => {
      if (e) {
        e = MechanismUtils.GetAllAnimNotifyStateEvents(e);
        t(e);
      }
    });
  }
  static async gZu(e) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, e => {
      t.SetResult(e);
    });
    e = await t.Promise;
    if (e.IsValid()) {
      return e;
    }
  }
  static fZu(e, t) {
    var s = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(e, UE.MovieSceneMechanismTrack.StaticClass());
    if (s && s.Num()) {
      var i = [];
      for (let e = 0; e < s.Num(); e++) {
        var r = s.Get(e);
        if (!r.bIsEvalDisabled) {
          var a = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(r);
          if (a && a.Num()) {
            for (let e = 0; e < a.Num(); e++) {
              if (t) {
                var o;
                var n = a.Get(e);
                if (n instanceof UE.MovieSceneMechanismRepeaterSection) {
                  if (o = n.Event) {
                    o = {
                      EventName: o.EventName.toString(),
                      EventType: o.EventNotifyStateType.toString(),
                      IsAnimNotifyState: o.bAnimNotifyState,
                      StartFrame: n.GetStartFrame().Value.Value,
                      EndFrame: n.GetEndFrame().Value.Value,
                      RowIndex: n.GetRowIndex()
                    };
                    i.push(o);
                  } else if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Temp", 1, "测试输出报错", ["startFrame", n.GetStartFrame().Value.Value]);
                  }
                }
              } else {
                var m = a.Get(e);
                if (m instanceof UE.MovieSceneMechanismTriggerSection) {
                  var c = m.EventChannel;
                  if (c && c.KeyValues.Num()) {
                    for (let e = 0; e < c.KeyValues.Num(); e++) {
                      var l = c.KeyValues.Get(e);
                      var l = {
                        EventName: l.EventName.toString(),
                        EventType: l.EventNotifyType.toString(),
                        IsAnimNotifyState: l.bAnimNotifyState,
                        StartFrame: c.KeyTimes.Get(e).Value,
                        EndFrame: c.KeyTimes.Get(e).Value,
                        RowIndex: m.GetRowIndex()
                      };
                      i.push(l);
                    }
                  } else if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Temp", 1, "测试输出报错", ["startFrame", m.GetStartFrame().Value.Value]);
                  }
                }
              }
            }
          }
        }
      }
      i.sort((e, t) => e.StartFrame !== t.StartFrame ? e.StartFrame - t.StartFrame : e.RowIndex - t.RowIndex);
      return i;
    }
  }
}
exports.MechanismUtils = MechanismUtils;
//# sourceMappingURL=MechanismUtils.js.map