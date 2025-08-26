"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefCompModifyActorMaterial = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RefCompControllerBase_1 = require("./RefCompControllerBase");
const PATH_LENGTH = 3;
class RefCompModifyActorMaterial extends RefCompControllerBase_1.RefCompControllerBase {
  constructor() {
    super(...arguments);
    this.Type = 2;
    this.oMn = undefined;
    this.iMn = undefined;
  }
  OnStart() {}
  HandleActorMaterial(e) {
    switch (e.Config.Type) {
      case "ChangeMaterialData":
        this.mMn(e.Config.MaterialData, e.Config.ActorRefs.map(e => e.PathName));
        break;
      case "ChangeMPC":
        this.dMn(e.Config.MpcData);
    }
  }
  mMn(e, s) {
    if (e && e !== "None") {
      if (s.length) {
        this.iMn ||= new Map();
        this.oMn ||= new Map();
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.ItemMaterialControllerActorData_C, o => {
          if (o?.IsValid()) {
            for (const a of s) {
              var t = a.split(".");
              if (t.length < PATH_LENGTH) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("LevelEvent", 7, "[ReferenceComponent:ChangeMaterial]actor路径错误", ["RefPath", a]);
                }
              } else {
                t = new UE.FName(t[1] + "." + t[2]);
                t = this.ActorSubsystem.GetActor(t);
                if (t?.IsValid()) {
                  if (!this.iMn.get(a)) {
                    this.iMn.set(a, true);
                    var r = this.oMn.get(a);
                    if (r && r.length) {
                      for (const n of r) {
                        ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(n);
                      }
                      r.length = 0;
                      this.oMn.set(a, r);
                    }
                  }
                  r = ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(o, t);
                  let e = this.oMn.get(a);
                  (e = e || new Array()).push(r);
                  this.oMn.set(a, e);
                }
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
          }
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]目标actor未配置");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]未配置对应MaterialData");
    }
  }
  dMn(e) {
    if (e && e !== "None") {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.ItemMaterialControllerMPCData_C, e => {
        if (!e?.IsValid()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
          }
        }
        ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(e);
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]未配置对应MPCData");
    }
  }
  ResetActorMaterialClearMap() {
    this.iMn?.clear();
  }
}
exports.RefCompModifyActorMaterial = RefCompModifyActorMaterial;
//# sourceMappingURL=RefCompModifyActorMaterial.js.map