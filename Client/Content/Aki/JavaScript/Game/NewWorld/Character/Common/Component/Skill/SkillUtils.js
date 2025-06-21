"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SkillUtils = void 0;
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../../GlobalData"),
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
class SkillUtils {
  static GetSkillRotateDirect(l, t, i) {
    if (i.Reset(), l?.Valid && t) {
      var e = l.Entity.GetComponent(1);
      if (e?.Valid) {
        var r = l.Entity.GetComponent(39);
        if (r?.Valid) {
          var a = e.ActorLocationProxy;
          switch (t.Type) {
            case 0:
              r.SkillTarget && (s = r.SkillTarget.Entity.CheckGetComponent(1), s = r.GetCurrentSkillRotateTargetDirect(s, a), i.DeepCopy(s));
              break;
            case 1:
              var s = t.Target;
              SkillUtils.Lz.DeepCopy(s), SkillUtils.Lz.SubtractionEqual(a), i.DeepCopy(SkillUtils.Lz);
              break;
            case 2:
              s = t.Target;
              i.DeepCopy(s);
              break;
            case 3:
            case 6: {
              let e = void 0;
              if (!(e = 3 === t.Type ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(l.Entity.Id, t.Target) : BlackboardController_1.BlackboardController.GetIntValueByEntity(l.Entity.Id, t.Target))) break;
              s = EntitySystem_1.EntitySystem.Get(e)?.CheckGetComponent(1);
              if (!s?.Valid) break;
              SkillUtils.Lz.DeepCopy(s.ActorLocationProxy), SkillUtils.Lz.SubtractionEqual(a), i.DeepCopy(SkillUtils.Lz);
              break
            }
            case 4:
              s = BlackboardController_1.BlackboardController.GetVectorValueByEntity(l.Entity.Id, t.Target);
              s && (SkillUtils.Lz.DeepCopy(s), SkillUtils.Lz.SubtractionEqual(a), i.DeepCopy(SkillUtils.Lz));
              break;
            case 5:
              s = BlackboardController_1.BlackboardController.GetVectorValueByEntity(l.Entity.Id, t.Target);
              s && i.DeepCopy(s);
              break;
            case 7:
              i.DeepCopy(e.ActorForwardProxy)
          }
        }
      }
    }
  }
  static GetStaticLineTrace() {
    return this.uoe || (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass()), this.uoe.bIsSingle = !0, this.uoe.bIgnoreSelf = !0, this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic), this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet)), this.uoe.WorldContextObject = GlobalData_1.GlobalData.World, this.uoe.ClearCacheData(), this.uoe
  }
}(exports.SkillUtils = SkillUtils).Lz = Vector_1.Vector.Create(), SkillUtils.uoe = void 0;
//# sourceMappingURL=SkillUtils.js.map