"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritModel = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SunSpiritConfig_1 = require("./SunSpiritConfig");
const SunSpiritData_1 = require("./SunSpiritData");
const SunSpiritDefine_1 = require("./SunSpiritDefine");
const SunSpiritOccupiedByGearState_1 = require("./SunSpiritState/SunSpiritOccupiedByGearState");
const SUN_SPIRIT_FACE_ID = 0;
const SUN_SPIRIT_EYE_ID = 1;
const SUN_SPIRIT_BODY_ID = 2;
const SUN_SPIRIT_RING_ID = 3;
const appearanceConfigMap = new Map([["FaceID_Riling", SUN_SPIRIT_FACE_ID], ["EyeID_Riling", SUN_SPIRIT_EYE_ID], ["BodyID_Riling", SUN_SPIRIT_BODY_ID], ["RingID_Riling", SUN_SPIRIT_RING_ID]]);
const SUN_SPIRIT_CONFIG_DA_PATH = "/Game/Aki/Data/Gameplay/SunSpirit/DA_SunSpiritConfig_Default.DA_SunSpiritConfig_Default";
class DoubleKeyIndexSet extends Map {
  AddValToSet(e, i, t) {
    let r = this.get(e);
    if (!r) {
      r = new Map();
      this.set(e, r);
    }
    let n = r.get(i);
    if (!n) {
      n = new Set();
      r.set(i, n);
    }
    n.add(t);
  }
  DeleteValFromSet(e, i, t) {
    var r;
    var n = this.get(e);
    if (n && (r = n.get(i)) && (r.delete(t), r.size === 0 && n.delete(i), n.size === 0)) {
      this.delete(e);
    }
  }
  GetSet(e, i) {
    return this.get(e)?.get(i);
  }
}
class TripleKeyIndexMap extends Map {
  GetVal(e, i, t) {
    return this.get(e)?.get(i)?.get(t);
  }
  SetVal(e, i, t, r) {
    let n = this.get(e);
    if (!n) {
      n = new Map();
      this.set(e, n);
    }
    let a = n.get(i);
    if (!a) {
      a = new Map();
      n.set(i, a);
    }
    a.set(t, r);
  }
  DelVal(e, i, t) {
    var r;
    var n = this.get(e);
    if (n && (r = n.get(i)) && (r.delete(t), r.size === 0 && n.delete(i), n.size === 0)) {
      this.delete(e);
    }
  }
  HasVal(e, i, t) {
    return !!this.get(e)?.get(i)?.has(t);
  }
  GetValMap(e, i) {
    return this.get(e)?.get(i);
  }
}
class SunSpiritModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.k$m = false;
    this.GmOverrideIsSunSpiritEnable = false;
    this.IsUsingGmOverrideSunSpiritEnable = false;
    this._sm = new Map();
    this.csm = new DoubleKeyIndexSet();
    this.q$m = new TripleKeyIndexMap();
    this.msm = [];
    this.fsm = 0;
    this.O9f = ResourceSystem_1.ResourceSystem.InvalidId;
    this.G9f = undefined;
  }
  GetIsSunSpiritEnable() {
    if (!Info_1.Info.IsBuildShipping && this.IsUsingGmOverrideSunSpiritEnable) {
      return this.GmOverrideIsSunSpiritEnable;
    } else {
      return this.k$m;
    }
  }
  SetIsSunSpiritEnable(e) {
    this.k$m = e;
  }
  gsm() {
    if (this.msm.length > 0) {
      return this.msm.pop();
    } else {
      return ++this.fsm;
    }
  }
  OnInit() {
    this.LoadAndInitSunSpiritConfig(true);
    return true;
  }
  OnClear() {
    this._sm.clear();
    this.q$m.clear();
    this.csm.clear();
    if (this.O9f !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.O9f);
      this.O9f = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    return true;
  }
  AddOrUpdateSunSpiritDataByPb(e) {
    let i = this.GetSunSpiritDataByPlayerIdAndConfigId(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), e.r6n, e.A5n);
    if (i) {
      this.csm.DeleteValFromSet(i.PlayerId, i.AreaId, i.SunSpiritId);
      this.q$m.DelVal(i.PlayerId, i.InstId, i.ConfigId);
    }
    if (!i) {
      i = new SunSpiritData_1.SunSpiritData(this.gsm());
      this._sm.set(i.SunSpiritId, i);
    }
    i.SetOrUpdateSunSpiritBasicDataByProto(e);
    this.q$m.SetVal(i.PlayerId, i.InstId, i.ConfigId, i.SunSpiritId);
    this.csm.AddValToSet(i.PlayerId, i.AreaId, i.SunSpiritId);
    i.RefreshSunSpiritStateByCachedProto(false);
  }
  RemoveSunSpirit(e) {
    var i = this._sm.get(e);
    if (i) {
      this.csm.DeleteValFromSet(i.PlayerId, i.AreaId, e);
      this.q$m.DelVal(i.PlayerId, i.InstId, i.ConfigId);
      this._sm.delete(e);
      this.msm.push(e);
    }
  }
  GetSunSpiritDataById(e) {
    return this._sm.get(e);
  }
  GetSunSpiritDataByPlayerIdAndConfigId(e, i, t) {
    e = this.q$m.GetVal(e, i, t);
    if (e) {
      return this.GetSunSpiritDataById(e);
    }
  }
  GetSunSpiritAreaIdByConfigId(e, i) {
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceMapConfigId(e);
    if (e === undefined || (i = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(i, e)) === undefined) {
      return 0;
    } else {
      return (0, IComponent_1.getComponent)(i.ComponentsData, "SunSpiritCollectComponent")?.AreaId ?? 0;
    }
  }
  GetSunSpiritConfigByConfigId(e, i) {
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceMapConfigId(e);
    if (e !== undefined) {
      i = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(i, e);
      if (i !== undefined) {
        return (0, IComponent_1.getComponent)(i.ComponentsData, "SunSpiritCollectComponent");
      }
    }
  }
  GetSunSpiritAppearanceInfoByConfigId(i, t) {
    var r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceMapConfigId(i);
    if (r !== undefined) {
      r = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(t, r);
      if (r !== undefined) {
        r = (0, IComponent_1.getComponent)(r.ComponentsData, "NpcPerformComponent");
        if (r !== undefined) {
          r = r.NpcPerformState?.Configs;
          if (r) {
            let e = undefined;
            for (const _ of r) {
              if (_.State === "常态") {
                e = _.MaterialDa;
                break;
              }
            }
            if (e && e !== "") {
              var n = ResourceSystem_1.ResourceSystem.Load(e, UE.PD_CharacterControllerData_C);
              if (n?.IsValid()) {
                var a = new Array();
                for (let e = 0; e < appearanceConfigMap.size; ++e) {
                  a.push(0);
                }
                var o = n.CustomFloatParameters.Num();
                for (let e = 0; e < o; ++e) {
                  var s = n.CustomFloatParameters.Get(e);
                  var S = s.ParameterName.toString();
                  var s = s.ParameterValue.Loop.Constant;
                  if (appearanceConfigMap.has(S)) {
                    a[appearanceConfigMap.get(S)] = s;
                  }
                }
                var u = UE.NewArray(UE.BuiltinFloat);
                for (const p of a) {
                  u.Add(p);
                }
                return u;
              }
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("SunSpirit", 50, "加载日灵外观DA失败", ["InstId", i], ["ConfigId", t], ["Path", e]);
              }
            }
          }
        }
      }
    }
  }
  GetAllSunSpiritDataByPlayerIdAndAreaId(e = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId() ?? 0, i = ModelManager_1.ModelManager.AreaModel?.AreaInfo?.AreaId ?? 0, t = false, r, n = []) {
    for (const s of t ? ModelManager_1.ModelManager.AreaModel?.GetAllAreaIdInheritableById(i) ?? [] : [i]) {
      var a = this.csm.GetSet(e, s);
      if (a?.size) {
        for (const S of a) {
          var o = this._sm.get(S);
          if (!!o && (!r || !!r(o))) {
            n.push(o);
          }
        }
      }
    }
    return n;
  }
  GetSunSpiritNumByPlayerIdAndAreaId(e = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId() ?? 0, i = ModelManager_1.ModelManager.AreaModel?.AreaInfo?.AreaId ?? 0, t = false, r) {
    var n = [i];
    if (t) {
      let e = i;
      while (e = ConfigManager_1.ConfigManager.AreaConfig?.GetParentAreaId(e)) {
        n.push(e);
      }
    }
    let a = 0;
    for (const S of n) {
      var o = this.csm.GetSet(e, S);
      if (o?.size) {
        if (r) {
          for (const u of o) {
            var s = this._sm.get(u);
            if (s && r(s)) {
              ++a;
            }
          }
        } else {
          a += o.size;
        }
      }
    }
    return a;
  }
  GetSunSpiritConfig() {
    if (!this.G9f) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: 获取配置时配置异步加载尚未完成，触发同步加载兜底，需要关注加载性能");
      }
      this.G9f = new SunSpiritConfig_1.SunSpiritConfig();
      this.LoadAndInitSunSpiritConfig(false);
    }
    return this.G9f;
  }
  LoadAndInitSunSpiritConfig(e = true, i = SUN_SPIRIT_CONFIG_DA_PATH) {
    if (this.O9f !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.O9f);
      this.O9f = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (e) {
      let t = false;
      e = ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.BP_SunSpiritConfig_C, (e, i) => {
        t = true;
        this.OnLoadSunSpiritConfig(e, i);
      });
      if (!t) {
        this.O9f = e;
      }
    } else {
      this.OnLoadSunSpiritConfig(ResourceSystem_1.ResourceSystem.Load(i, UE.BP_SunSpiritConfig_C), i);
    }
  }
  OnLoadSunSpiritConfig(e, i) {
    this.O9f = ResourceSystem_1.ResourceSystem.InvalidId;
    if (e?.IsValid()) {
      this.G9f ||= new SunSpiritConfig_1.SunSpiritConfig();
      this.G9f.UpdateFromUeData(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SunSpirit", 39, "加载日灵配置DA失败", ["Path", i]);
    }
  }
  GetDebugString() {
    let e = "";
    e += `日灵开启:${this.GetIsSunSpiritEnable()}
`;
    let i = ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId();
    for (e += "当前区域:" + i; i = i && ConfigManager_1.ConfigManager.AreaConfig?.GetParentAreaId(i);) {
      e += " ∈ " + i;
    }
    e = `${e += "\n日灵信息:\n"}总数(客户端)=${this._sm.size}

`;
    for (const r of this._sm.values()) {
      e = `${e = `${e = `${e = `${e = `${e += "ID=" + r.SunSpiritId} 	配置ID=${r.ConfigId}`} 	副本ID=${r.InstId}`} 	区域ID=${r.AreaId}`} 	状态=${r.StateType}(${SunSpiritDefine_1.sunSpiritStateTypeToString[r.StateType]})`} 
 	位置=[${r.Location?.ToString()}]`;
      var t = r.GetSunSpiritState();
      if (t.StateType === 3 && t instanceof SunSpiritOccupiedByGearState_1.SunSpiritOccupiedByGearState) {
        e = `${e += `
 	占用机关配置ID=${t.GearConfigId}`} 	占用机关插槽Index=${t.GearSocketIndex}`;
      }
      e += "\n";
    }
    return e;
  }
}
exports.SunSpiritModel = SunSpiritModel;
//# sourceMappingURL=SunSpiritModel.js.map