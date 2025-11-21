"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiInteractionItemQueryManager = exports.ItemQueryResult = exports.AiInteractionSearchFilter = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneItemUtility_1 = require("../Util/SceneItemUtility");
class AiInteractionSearchFilter {
  constructor() {
    this.IsSearchedMarkByAi = undefined;
    this.Tag = undefined;
    this.Entity = undefined;
  }
}
exports.AiInteractionSearchFilter = AiInteractionSearchFilter;
class ItemQueryResult {
  constructor() {
    this.Entity = undefined;
    this.Length = -0;
  }
}
exports.ItemQueryResult = ItemQueryResult;
class AiInteractionItemQueryManager {
  constructor() {
    this.enr = undefined;
    this.cz = undefined;
  }
  AU() {
    this.enr = new Set();
    this.cz = Vector_1.Vector.Create(0, 0, 0);
  }
  static Get() {
    if (!this.za) {
      this.za = new AiInteractionItemQueryManager();
      this.za.AU();
    }
    return this.za;
  }
  RegisterItem(t) {
    return t !== undefined && !this.enr.has(t) && (this.enr.add(t), true);
  }
  UnRegisterItem(t) {
    return !!this.enr.has(t) && (this.enr.delete(t), true);
  }
  GetCloseActor(t, e = 0, r = undefined, i = undefined) {
    if (this.enr.size !== 0) {
      switch (e) {
        case 0:
          return this.tnr(t, r);
        case 1:
          return this.inr(t, i, r);
      }
    }
  }
  GetCloseActorsByRange(t, e, r = 0, i = undefined, s = undefined) {
    if (e !== 0 && this.enr.size !== 0) {
      switch (r) {
        case 0:
          return this.onr(t, e, i);
        case 1:
          return this.rnr(t, e, s, i);
      }
    }
    return [];
  }
  onr(t, e, r) {
    var i;
    var s;
    var o = new Array();
    var n = e * e;
    for (const a of this.enr) {
      if (!this.nnr(a, r)) {
        if ((i = this.snr(t, a)) <= n) {
          (s = new ItemQueryResult()).Entity = a;
          s.Length = Math.sqrt(i);
          o.push(s);
        }
      }
    }
    return o;
  }
  rnr(t, e, r, i) {
    var s;
    var o;
    var n = new Array();
    for (const a of this.enr) {
      if (!this.nnr(a, i)) {
        if ((s = this.anr(t, a, r))[1] && (s = s[0]) <= e) {
          (o = new ItemQueryResult()).Entity = a;
          o.Length = s;
          n.push(o);
        }
      }
    }
    return n;
  }
  tnr(t, e) {
    var r;
    var i = new ItemQueryResult();
    i.Length = MathUtils_1.MathUtils.MaxFloat;
    let s = i.Length;
    for (const o of this.enr) {
      if (!this.nnr(o, e)) {
        if ((r = this.snr(t, o)) <= s) {
          s = r;
          i.Entity = o;
        }
      }
    }
    i.Length = Math.sqrt(s);
    return i;
  }
  inr(t, e, r) {
    var i;
    var s = new ItemQueryResult();
    s.Length = MathUtils_1.MathUtils.MaxFloat;
    for (const o of this.enr) {
      if (!this.nnr(o, r)) {
        if ((i = this.anr(t, o, e))[1] && (i = i[0]) <= s.Length) {
          s.Entity = o;
          s.Length = i;
        }
      }
    }
    return s;
  }
  snr(t, e) {
    var r = this.cz;
    r.FromUeVector(t);
    var t = e.GetComponent(206).ActorLocation;
    r.Subtraction(Vector_1.Vector.Create(t), r);
    var e = r.SizeSquared();
    return e;
  }
  anr(t, e, r) {
    var i = new Array();
    var e = e.GetComponent(206).ActorLocation;
    if (AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(r, t, e, i)) {
      return [AiContollerLibrary_1.AiControllerLibrary.GetPathLength(t, i), true];
    } else {
      return [-1, false];
    }
  }
  nnr(e, r) {
    var t = e.GetComponent(148);
    if (!SceneItemUtility_1.SceneItemUtility.GetBaseItemActor(e) || !e.Active) {
      return true;
    }
    if (r) {
      if (!t.CanBeUsed()) {
        return true;
      }
      if (t.IsSearchByAi !== r.IsSearchedMarkByAi) {
        return true;
      }
      if (r) {
        let t = false;
        for (const i of r.Tag) {
          if (i !== "Weapon" || ModelManager_1.ModelManager.AiWeaponModel.HasWeaponConfig(e, r.Entity)) {
            t = true;
          }
        }
        if (!t) {
          return true;
        }
      }
    }
    return false;
  }
}
(exports.AiInteractionItemQueryManager = AiInteractionItemQueryManager).za = undefined;
//# sourceMappingURL=AiInteractionItemQueryManager.js.map