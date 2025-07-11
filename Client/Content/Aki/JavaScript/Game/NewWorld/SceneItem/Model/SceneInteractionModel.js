"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneInteractionModel = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../Core/Common/Stats");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines");
class SceneInteractionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Fsr = false;
    this.JQl = Stats_1.Stat.Create("SceneInteractionModel.GetEntityByActor");
  }
  GetEntityByBaseItem(e) {
    if (!this.Fsr) {
      this.Fsr = true;
      UE.KuroLevelPlayLibrary.RegisterBaseItemInfo(UE.BP_BaseItem_C.StaticClass(), "EntityId");
    }
    e = UE.KuroLevelPlayLibrary.GetEntityIdByBaseItem(e);
    return ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e);
  }
  GetEntityByActor(e, t = false) {
    this.JQl.Start();
    e = this.GetBaseItemByActor(e, t);
    if (e) {
      t = ActorUtils_1.ActorUtils.GetEntityByActor(e);
      this.JQl.Stop();
      return t;
    }
    this.JQl.Stop();
  }
  GetBaseItemByActor(t, r = false) {
    if (t?.IsValid()) {
      let e = t.GetOwner();
      if (e === undefined) {
        if (r) {
          return;
        }
        if ((e = this.Vsr(t)) === undefined) {
          return;
        }
      }
      if (UE.KuroStaticLibrary.IsObjectClassByName(e, CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM)) {
        return e;
      } else if (r) {
        return undefined;
      } else {
        return this.Vsr(t);
      }
    }
  }
  Vsr(e) {
    let t = e;
    while (t && !UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
      t = t.GetAttachParentActor();
    }
    if (t) {
      e = t;
      if (EntitySystem_1.EntitySystem.Get(e.GetEntityId())?.Valid) {
        return t;
      }
    }
  }
}
exports.SceneInteractionModel = SceneInteractionModel;
//# sourceMappingURL=SceneInteractionModel.js.map