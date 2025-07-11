"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsAnimNotifyHideMesh extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.ChildMeshName = "";
    this.HideChildren = true;
    this.HideChildrenActors = false;
    this.Hide = true;
  }
  Constructor() {}
  K2_Notify(t, e) {
    var s = t.GetOwner();
    if (!s) {
      return false;
    }
    let i = undefined;
    if (this.ChildMeshName) {
      var r = s.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
      for (let t = r.Num() - 1; t >= 0; --t) {
        var o = r.Get(t);
        if (o.GetName() === this.ChildMeshName) {
          i = o;
          break;
        }
      }
    } else {
      i = t;
    }
    return !!i && (i.SetHiddenInGame(this.Hide, this.HideChildren), true);
  }
  GetNotifyName() {
    return "隐藏网格体";
  }
}
exports.default = TsAnimNotifyHideMesh;
//# sourceMappingURL=TsAnimNotifyHideMesh.js.map