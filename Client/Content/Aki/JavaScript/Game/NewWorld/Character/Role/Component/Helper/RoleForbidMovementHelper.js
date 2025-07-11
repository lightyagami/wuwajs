"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleForbidMovementHelper = undefined;
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const MAX_PRIORITY = 3;
class LimitTagHandler {
  constructor(t, i, s, e) {
    this.TagId = t;
    this.Priority = i;
    this.TagExist = s;
    this.CallBack = e;
    this.MutuallyTags = [];
    this.Active = false;
    this.Priority = MathUtils_1.MathUtils.Clamp(this.Priority, 0, MAX_PRIORITY);
  }
}
class RoleForbidMovementHelper {
  constructor() {
    this.TagComp = undefined;
    this.Cer = new Array();
    this.CurrentActiveHandlers = new Array();
    this.Handlers = new Map();
    this.Eir = (t, i) => {
      var s = this.Handlers.get(t);
      if (s && (s.TagExist = i, !s.TagExist || !s.Active) && (s.TagExist || s.Active)) {
        if (i) {
          let t = undefined;
          let i = undefined;
          for (const h of s.MutuallyTags) {
            var e = this.Handlers.get(h);
            if (e) {
              if (e.Priority > s.Priority && e.Active) {
                t = e;
                break;
              }
              if (e.Priority <= s.Priority && e.Active) {
                i = e;
                break;
              }
            }
          }
          if (!t) {
            if (i) {
              this.ActiveHandler(i, false);
            }
            this.ActiveHandler(s, true);
          }
        } else {
          this.ActiveHandler(s, false);
          let t = undefined;
          for (const o of s.MutuallyTags) {
            var r = this.Handlers.get(o);
            if (r && r.Priority <= s.Priority && r.TagExist) {
              t = r;
              break;
            }
          }
          if (t) {
            this.ActiveHandler(t, true);
          }
        }
      }
    };
  }
  RegisterMutuallyTags(t) {
    for (const s of t) {
      var i = this.Handlers.get(s);
      if (i) {
        for (const e of t) {
          if (e !== i.TagId) {
            i.MutuallyTags.push(e);
          }
        }
      }
    }
  }
  Awake() {
    for (const i of this.Handlers) {
      var t = this.TagComp.HasTag(i[0]);
      this.Eir(i[0], t);
    }
  }
  ActiveHandler(t, i) {
    t.Active = i;
    t.CallBack(i);
    if (i) {
      this.CurrentActiveHandlers.push(t);
    } else if (!((i = this.CurrentActiveHandlers.indexOf(t)) < 0)) {
      this.CurrentActiveHandlers.splice(i, 1);
    }
  }
  CreateTagHandler(t, i, s) {
    var e = this.TagComp.HasTag(t);
    this.Handlers.set(t, new LimitTagHandler(t, i, e, s));
    this.Cer.push(this.TagComp.ListenForTagAddOrRemove(t, this.Eir));
  }
  Clear() {
    this.CurrentActiveHandlers.length = 0;
    this.Handlers.clear();
    for (const t of this.Cer) {
      t.EndTask();
    }
    this.Cer.length = 0;
  }
}
exports.RoleForbidMovementHelper = RoleForbidMovementHelper;
//# sourceMappingURL=RoleForbidMovementHelper.js.map