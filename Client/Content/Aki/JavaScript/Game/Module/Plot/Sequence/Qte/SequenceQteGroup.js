"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteGroup = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
const PAUSED_TIME_BUFFER = 50;
class MovieSceneSubQteParamsProxy {
  constructor() {
    this.SubQteId = undefined;
    this.SpineInfo = undefined;
  }
}
class SequenceQteGroup extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  constructor(e, t) {
    super(e, t);
    this.QteManager = e;
    this.Context = t;
    this.w_m = new Map();
    this.ltd = PAUSED_TIME_BUFFER;
    this.L_m = new Map();
    this.P_m = e => {
      this.A_m(e);
    };
    this.D_m = e => {
      this.A_m(e);
    };
    if (this.Context.ContextMap) {
      this.Context.ContextMap.forEach(e => {
        e.SuccessCallback = this.P_m;
        e.FailCallback = this.D_m;
      });
    }
  }
  OnBegin() {
    super.OnBegin();
    this.MarkSequenceQtePending = true;
  }
  OnFinish() {
    super.OnFinish();
    this.L_m.clear();
  }
  OnReceiveTick(t) {
    if (this.Context.ContextMap && this.Context.MainQteContext && this.Context.ContextMap.size !== 0) {
      this.ltd += t;
      var s;
      var i = this.ltd >= PAUSED_TIME_BUFFER;
      if (i) {
        this.ltd = 0;
      }
      let e = 0;
      for ([, s] of this.Context.ContextMap) {
        if (s.Type === 1) {
          if (i) {
            this.L_m.set(s.HandleId, s.GetProgress());
            e += s.GetProgress();
          } else {
            e += this.L_m.get(s.HandleId) ?? 0;
          }
        } else if (s.Type === 2) {
          e += s.GetProgress();
        } else {
          e += s.IsSuccess() ? 100 : 0;
        }
      }
      this.Progress = MathUtils_1.MathUtils.Clamp(e / this.Context.ContextMap.size * SequenceQteHandleBase_1.PERCENT, 0, 1);
    }
  }
  SetSubQteParams(t) {
    if (t) {
      var s = t.Num();
      for (let e = 0; e < s; e++) {
        var i = t.Get(e);
        var h = new MovieSceneSubQteParamsProxy();
        h.SubQteId = i.SubQteId;
        h.SpineInfo = SequenceQteHandleBase_1.QteSpineInfoProxy.CreateQteSpineInfo(i.SpineInfo);
        this.w_m.set(i.SubQteId, h);
      }
    }
  }
  A_m(e) {
    if ((e &&= this.w_m.get(e.QteId)) && e.SpineInfo) {
      e.SpineInfo.EndSpine?.forEach(e => {
        if (e.Name) {
          if (this.SpineInfo.WaitEndSpineFinish && !e.NeedLoop) {
            this.EndSpineCheckList.add(e.Name);
          }
          this.View?.PlaySonUiSpine(e.Name, e.NeedLoop, false, 0);
        }
      });
    }
  }
}
exports.SequenceQteGroup = SequenceQteGroup;
//# sourceMappingURL=SequenceQteGroup.js.map