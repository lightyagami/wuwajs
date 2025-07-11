"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachToActorController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../Manager/ModelManager");
const ATTACH_REASON_LENGTH_LIMIT = 4;
class AttachToActorController extends ControllerBase_1.ControllerBase {
  static AttachToActor(t, o, r, e, a, n, c, A, _, i = true) {
    var s;
    if (e) {
      if (e.length < ATTACH_REASON_LENGTH_LIMIT) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "AttachToActor的Reason字符串长度必须大于等于限制字符数量", ["Reason", e], ["限制的字符数量", ATTACH_REASON_LENGTH_LIMIT]);
        }
        return false;
      } else if (t?.IsValid()) {
        if (o?.IsValid()) {
          if (UE.KuroStaticLibrary.IsImplementInterface(o.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
            if (s = o.GetEntityId()) {
              if (ModelManager_1.ModelManager.AttachToActorModel.AddEntityActor(s, t, o, e, r)) {
                if (i) {
                  t.K2_AttachToActor(o, a, n, c, A, _);
                }
                t.OnEndPlay.Add(AttachToActorController.hbn);
                return true;
              } else {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Entity", 3, "actor添加失败", ["ActorName", o.GetName()], ["Reason", e]);
                }
                return false;
              }
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "entityId无效", ["ActorName", o.GetName()], ["Reason", e]);
              }
              return false;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "parentActor未实现接口CreatureInterface", ["ActorName", o.GetName()], ["Reason", e]);
            }
            return false;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "parentActor无效", ["Reason", e]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "actor无效", ["Reason", e]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachToActor的Reason不能使用undefined", ["Entity", this.constructor.name]);
      }
      return false;
    }
  }
  static AttachToComponent(t, o, r, e, a, n, c, A, _, i = true) {
    var s;
    var L;
    if (e) {
      if (e.length < ATTACH_REASON_LENGTH_LIMIT) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "AttachToComponent的Reason字符串长度必须大于等于限制字符数量", ["Reason", e], ["限制的字符数量", ATTACH_REASON_LENGTH_LIMIT]);
        }
        return false;
      } else if (t?.IsValid()) {
        if (o?.IsValid()) {
          if ((s = o.GetOwner())?.IsValid()) {
            if (UE.KuroStaticLibrary.IsImplementInterface(s.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
              if (L = s.GetEntityId()) {
                if (ModelManager_1.ModelManager.AttachToActorModel.AddEntityActor(L, t, s, e, r)) {
                  if (i) {
                    t.K2_AttachToComponent(o, a, n, c, A, _);
                  }
                  t.OnEndPlay.Add(AttachToActorController.hbn);
                  return true;
                } else {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Entity", 3, "actor添加失败", ["ActorName", s.GetName()], ["Reason", e]);
                  }
                  return false;
                }
              } else {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Entity", 3, "entityId无效", ["ActorName", s.GetName()], ["Reason", e]);
                }
                return false;
              }
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "ParentActor未实现接口CreatureInterface", ["ActorName", s.GetName()], ["Reason", e]);
              }
              return false;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "parentActor无效", ["Reason", e]);
            }
            return false;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "parentComponent无效", ["Reason", e]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "actor无效", ["Reason", e]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachToComponent的Reason不能使用undefined", ["Entity", this.constructor.name]);
      }
      return false;
    }
  }
  static DetachActor(t, o, r, e, a, n) {
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachActor: RemoveActor的Reason不能使用undefined", ["Entity", this.constructor.name]);
      }
      return false;
    }
    if (r.length < ATTACH_REASON_LENGTH_LIMIT) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachActor: RemoveActor的Reason字符串长度必须大于等于限制字符数量", ["Reason", r], ["限制的字符数量", ATTACH_REASON_LENGTH_LIMIT]);
      }
      return false;
    }
    if (!t?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "srcActor无效", ["Reason", r]);
      }
      return false;
    }
    var c = t.GetAttachParentActor();
    if (!c?.IsValid()) {
      const A = ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(t);
      if (A) {
        return this.DetachActorByEntity(t, r, A, o, e, a, n);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "AttachActor: entityActor无效", ["Name", t.GetName()], ["Reason", r]);
        }
        return false;
      }
    }
    if (!UE.KuroStaticLibrary.IsImplementInterface(c.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachActor: Actor未实现接口CreatureInterface", ["ActorName", c.GetName()], ["Reason", r]);
      }
      return false;
    }
    const A = c.GetEntityId();
    if (A) {
      return this.DetachActorByEntity(t, r, A, o, e, a, n);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachActor: entityId无效", ["ActorName", c.GetName()], ["Reason", r]);
      }
      return false;
    }
  }
  static DetachActorByEntity(t, o, r, e, a, n, c) {
    var A;
    if (o) {
      if (o.length < ATTACH_REASON_LENGTH_LIMIT) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "AttachActor: RemoveActor的Reason字符串长度必须大于等于限制字符数量", ["Reason", o], ["限制的字符数量", ATTACH_REASON_LENGTH_LIMIT]);
        }
        return false;
      } else if (t?.IsValid()) {
        if (r) {
          if ((A = ModelManager_1.ModelManager.AttachToActorModel).GetAttachActorItem(r, t)) {
            t.OnEndPlay.Remove(AttachToActorController.hbn);
            if (A.RemoveEntityActor(r, t, o)) {
              if (e) {
                t.K2_DestroyActor();
              } else {
                t.K2_DetachFromActor(a, n, c);
              }
              return true;
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "AttachActor: Detach Actor 失败", ["EntityId", r], ["ActorName", t.GetName()], ["Reason", o]);
              }
              return false;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "AttachActor: attachActorItem无效", ["EntityId", r], ["ActorName", t.GetName()], ["Reason", o]);
            }
            return false;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "AttachActor: entityId无效", ["EntityId", r], ["ActorName", t.GetName()], ["Reason", o]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "srcActor无效", ["Reason", o]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachActor: RemoveActor的Reason不能使用undefined", ["Entity", this.constructor.name]);
      }
      return false;
    }
  }
  static DetachActorsBeforeDestroyEntity(o) {
    if (!o?.Valid) {
      return true;
    }
    var t = ModelManager_1.ModelManager.AttachToActorModel.GetAttachActorEntry(o.Id);
    if (!t) {
      return true;
    }
    var r = t.GetAttachActorItems();
    if (!r?.length) {
      return true;
    }
    let e = true;
    for (let t = r.length - 1; t >= 0; --t) {
      var a = r[t];
      if (a.DetachType === 1 && a.Actor?.IsValid() && !this.DetachActorByEntity(a.Actor, "AttachToActorController.DetachActorsBeforeDestroyEntity", o.Id, true, 1, 1, 1)) {
        e = false;
      }
    }
    return e;
  }
  static DetachActorsAfterDestroyEntity(o) {
    var t = ModelManager_1.ModelManager.AttachToActorModel.GetAttachActorEntry(o);
    if (!t) {
      return true;
    }
    var r = t.GetAttachActorItems();
    if (!r?.length) {
      return true;
    }
    let e = true;
    for (let t = r.length - 1; t >= 0; --t) {
      var a = r[t];
      if (a.DetachType === 0 && (Log_1.Log.CheckError() && Log_1.Log.Error("Entity", 3, "AttachActor: 存在未类型为ManualDestroy未Detach的Actor", ["EntityId", o], ["ActorName", a.Name], ["ParentActorName", a.ParentActorName], ["Reason", a.Reason]), a.Actor?.IsValid()) && !this.DetachActorByEntity(a.Actor, "AttachToActorController.DetachActorsAfterDestroyEntity", o, true, 1, 1, 1)) {
        e = false;
      }
    }
    return e;
  }
  static CheckAttachError(o) {
    var t = ModelManager_1.ModelManager.AttachToActorModel;
    var r = t.GetAttachActorEntry(o);
    if (!r) {
      return true;
    }
    var e = r.GetAttachActorItems();
    if (!e?.length) {
      return true;
    }
    let a = true;
    for (let t = e.length - 1; t >= 0; --t) {
      var n = e[t];
      a = false;
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "AttachActor: Attach的Actor没有删除", ["EntityId", o], ["ActorName", n.Name], ["ParentActorName", n.ParentActorName], ["Reason", n.Reason]);
      }
      if (n.Actor?.IsValid()) {
        this.DetachActorByEntity(n.Actor, "AttachToActorController.CheckAttachError", n.EntityId, true, 1, 1, 1);
      }
    }
    t.ClearActorsByEntity(o);
    return a;
  }
}
exports.AttachToActorController = AttachToActorController;
(_a = AttachToActorController).hbn = (t, o) => {
  if (t) {
    switch (o) {
      case 2:
      case 4:
        return;
    }
    o = ModelManager_1.ModelManager.AttachToActorModel;
    if (o) {
      var r = o.GetEntityIdByActor(t);
      var e = o.GetAttachActorItem(r, t);
      if (e) {
        switch (e.DetachType) {
          case 2:
            _a.DetachActorByEntity(t, "AttachToActorController.OnEndPlay DestroyExternal", r, false, 1, 1, 1);
            break;
          case 0:
          case 1:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "非法删除Attach的Actor", ["EntityId", r], ["ActorName", e.Name], ["ParentActorName", e.ParentActorName], ["DetachType", e.DetachType]);
            }
            _a.DetachActorByEntity(t, "AttachToActorController.OnEndPlay ManualDestroy", r, false, 1, 1, 1);
        }
      }
    }
  }
}; //# sourceMappingURL=AttachToActorController.js.map