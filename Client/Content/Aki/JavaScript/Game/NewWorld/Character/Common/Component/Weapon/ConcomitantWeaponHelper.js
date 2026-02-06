"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConcomitantWeaponHelper = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const SummonCfgById_1 = require("../../../../../../Core/Define/ConfigQuery/SummonCfgById");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const ModelUtil_1 = require("../../../../../../Core/Utils/ModelUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class ConcomitantWeaponHelper {
  static GetConcomitantWeaponSubMeshNames(e) {
    e = e.GetComponent(0);
    if (e?.IsConcomitantEntity) {
      e = e.SummonCfgId;
      if (e) {
        e = SummonCfgById_1.configSummonCfgById.GetConfig(e);
        if (e) {
          e = e.ShowWeaponSubMesh;
          if (e && e.length !== 0) {
            return e;
          }
        }
      }
    }
  }
  static SyncWeaponToConcomitants(e) {
    var o = e.GetComponent(0);
    if (o) {
      o = o.CustomServerEntityIds;
      if (o && o.length !== 0) {
        var r = e.GetComponent(86);
        if (r) {
          for (const t of o) {
            this.Opg(t, r);
          }
        }
      }
    }
  }
  static Opg(e, o) {
    var r;
    var t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e);
    if (t?.Valid && t.Entity && (r = t.Entity.GetComponent(3)) && (t = this.GetConcomitantWeaponSubMeshNames(t.Entity)) && (this.qpg(r, o, t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Character", 28, "同步武器到伴生物完成", ["concomitantServerId", e]);
    }
  }
  static qpg(e, o, r) {
    var t = e.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    var a = this.Gpg(o);
    var i = o.GetWeaponMesh();
    for (const s of r) {
      if (s && s !== "") {
        let r = undefined;
        for (let e = 0; e < t.Num(); ++e) {
          var n = t.Get(e);
          if (n.GetName() === s) {
            r = n;
            break;
          }
        }
        if (r) {
          let o = undefined;
          for (let e = 0; e < i.CharacterWeapons.length; ++e) {
            if (i.CharacterWeapons[e].Mesh.GetName() === s) {
              o = a[e];
              break;
            }
          }
          if (o) {
            this.Fpg(r, o);
          }
        }
      }
    }
  }
  static Fpg(a, e) {
    const i = ModelUtil_1.ModelUtil.GetModelConfig(e);
    if (i) {
      ResourceSystem_1.ResourceSystem.LoadAsync(i.网格体.ToAssetPathName(), UE.SkeletalMesh, e => {
        if (e && a) {
          var o = a.GetNumMaterials();
          for (let e = 0; e < o; ++e) {
            a.SetMaterial(e, undefined);
          }
          var r = e.Materials;
          var t = r.Num();
          a.SetAnimClass(undefined);
          a.SetSkeletalMesh(e, false);
          for (let e = 0; e < t; ++e) {
            a.SetMaterial(e, r.Get(e).MaterialInterface);
          }
          e = i.动画蓝图.ToAssetPathName();
          if (e && e !== "") {
            ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, e => {
              if (e && a) {
                a.SetAnimClass(e);
              }
            });
          }
        }
      });
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Character", 28, "武器模型配置不存在", ["modelId", e]);
    }
  }
  static Gpg(e) {
    var o = e.ActorComp?.CreatureData.GetWeaponSkinId() ?? 0;
    if (o > 0) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(o).Models;
    } else {
      return e.WeaponEquipInfo?.WeaponConfig?.Models ?? [];
    }
  }
}
exports.ConcomitantWeaponHelper = ConcomitantWeaponHelper;
//# sourceMappingURL=ConcomitantWeaponHelper.js.map