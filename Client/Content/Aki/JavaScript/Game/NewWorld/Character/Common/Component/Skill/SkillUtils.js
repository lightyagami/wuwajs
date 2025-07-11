"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillUtils = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../../../GlobalData");
const BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
class SkillUtils {
  static GetSkillRotateDirect(l, t, i) {
    i.Reset();
    if (l?.Valid && t) {
      var e = l.Entity.GetComponent(1);
      if (e?.Valid) {
        var r = l.Entity.GetComponent(39);
        if (r?.Valid) {
          var a = e.ActorLocationProxy;
          switch (t.Type) {
            case 0:
              if (r.SkillTarget) {
                s = r.SkillTarget.Entity.CheckGetComponent(1);
                s = r.GetCurrentSkillRotateTargetDirect(s, a);
                i.DeepCopy(s);
              }
              break;
            case 1:
              var s = t.Target;
              SkillUtils.Lz.DeepCopy(s);
              SkillUtils.Lz.SubtractionEqual(a);
              i.DeepCopy(SkillUtils.Lz);
              break;
            case 2:
              s = t.Target;
              i.DeepCopy(s);
              break;
            case 3:
            case 6:
              {
                let e = undefined;
                if (!(e = t.Type === 3 ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(l.Entity.Id, t.Target) : BlackboardController_1.BlackboardController.GetIntValueByEntity(l.Entity.Id, t.Target))) {
                  break;
                }
                s = EntitySystem_1.EntitySystem.Get(e)?.CheckGetComponent(1);
                if (!s?.Valid) {
                  break;
                }
                SkillUtils.Lz.DeepCopy(s.ActorLocationProxy);
                SkillUtils.Lz.SubtractionEqual(a);
                i.DeepCopy(SkillUtils.Lz);
                break;
              }
            case 4:
              s = BlackboardController_1.BlackboardController.GetVectorValueByEntity(l.Entity.Id, t.Target);
              if (s) {
                SkillUtils.Lz.DeepCopy(s);
                SkillUtils.Lz.SubtractionEqual(a);
                i.DeepCopy(SkillUtils.Lz);
              }
              break;
            case 5:
              s = BlackboardController_1.BlackboardController.GetVectorValueByEntity(l.Entity.Id, t.Target);
              if (s) {
                i.DeepCopy(s);
              }
              break;
            case 7:
              i.DeepCopy(e.ActorForwardProxy);
          }
        }
      }
    }
  }
  static GetStaticLineTrace() {
    if (!this.uoe) {
      this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.uoe.bIsSingle = true;
      this.uoe.bIgnoreSelf = true;
      this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    }
    this.uoe.WorldContextObject = GlobalData_1.GlobalData.World;
    this.uoe.ClearCacheData();
    return this.uoe;
  }
}
(exports.SkillUtils = SkillUtils).Lz = Vector_1.Vector.Create();
SkillUtils.uoe = undefined; //# sourceMappingURL=SkillUtils.js.map