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
    let o = n.get(i);
    if (!o) {
      o = new Map();
      n.set(i, o);
    }
    o.set(t, r);
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
    this.UQm = false;
    this.GmOverrideIsSunSpiritEnable = false;
    this.IsUsingGmOverrideSunSpiritEnable = false;
    this._sm = new Map();
    this.csm = new DoubleKeyIndexSet();
    this.xQm = new TripleKeyIndexMap();
    this.msm = [];
    this.fsm = 0;
    this.oeg = ResourceSystem_1.ResourceSystem.InvalidId;
    this.seg = undefined;
    this.qHg = new Set();
  }
  GetIsSunSpiritEnable() {
    if (!Info_1.Info.IsBuildShipping && this.IsUsingGmOverrideSunSpiritEnable) {
      return this.GmOverrideIsSunSpiritEnable;
    } else {
      return this.UQm;
    }
  }
  SetIsSunSpiritEnable(e) {
    this.UQm = e;
  }
  gsm() {
    if (this.msm.length > 0) {
      return this.msm.pop();
    } else {
      return ++this.fsm;
    }
  }
  OnClear() {
    this._sm.clear();
    this.xQm.clear();
    this.csm.clear();
    if (this.oeg !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.oeg);
      this.oeg = ResourceSystem_1.ResourceSystem.InvalidId;
      this.OHg(false);
    }
    return true;
  }
  AddOrUpdateSunSpiritDataByPb(e, i = true) {
    let t = this.GetSunSpiritDataByPlayerIdAndConfigId(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), e.r6n, e.A5n);
    if (t) {
      this.csm.DeleteValFromSet(t.PlayerId, t.AreaId, t.SunSpiritId);
      this.xQm.DelVal(t.PlayerId, t.InstId, t.ConfigId);
    }
    if (!t) {
      t = new SunSpiritData_1.SunSpiritData(this.gsm());
      this._sm.set(t.SunSpiritId, t);
    }
    t.SetOrUpdateSunSpiritBasicDataByProto(e);
    this.xQm.SetVal(t.PlayerId, t.InstId, t.ConfigId, t.SunSpiritId);
    this.csm.AddValToSet(t.PlayerId, t.AreaId, t.SunSpiritId);
    if (i) {
      t.RefreshSunSpiritStateByCachedProto(false);
    }
  }
  RemoveSunSpirit(e) {
    var i = this._sm.get(e);
    if (i) {
      this.csm.DeleteValFromSet(i.PlayerId, i.AreaId, e);
      this.xQm.DelVal(i.PlayerId, i.InstId, i.ConfigId);
      this._sm.delete(e);
      this.msm.push(e);
    }
  }
  GetSunSpiritDataById(e) {
    return this._sm.get(e);
  }
  GetSunSpiritDataByPlayerIdAndConfigId(e, i, t) {
    e = this.xQm.GetVal(e, i, t);
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
            for (const u of r) {
              if (u.State === "常态") {
                e = u.MaterialDa;
                break;
              }
            }
            if (e && e !== "") {
              var n = ResourceSystem_1.ResourceSystem.Load(e, UE.PD_CharacterControllerData_C);
              if (n?.IsValid()) {
                var o = new Array();
                for (let e = 0; e < appearanceConfigMap.size; ++e) {
                  o.push(0);
                }
                var a = n.CustomFloatParameters.Num();
                for (let e = 0; e < a; ++e) {
                  var s = n.CustomFloatParameters.Get(e);
                  var S = s.ParameterName.toString();
                  var s = s.ParameterValue.Loop.Constant;
                  if (appearanceConfigMap.has(S)) {
                    o[appearanceConfigMap.get(S)] = s;
                  }
                }
                var _ = UE.NewArray(UE.BuiltinFloat);
                for (const h of o) {
                  _.Add(h);
                }
                return _;
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
      var o = this.csm.GetSet(e, s);
      if (o?.size) {
        for (const S of o) {
          var a = this._sm.get(S);
          if (!!a && (!r || !!r(a))) {
            n.push(a);
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
    let o = 0;
    for (const S of n) {
      var a = this.csm.GetSet(e, S);
      if (a?.size) {
        if (r) {
          for (const _ of a) {
            var s = this._sm.get(_);
            if (s && r(s)) {
              ++o;
            }
          }
        } else {
          o += a.size;
        }
      }
    }
    return o;
  }
  GetSunSpiritConfig() {
    if (!this.seg) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SunSpirit", 39, "日灵: 获取配置时配置异步加载尚未完成，触发同步加载兜底，需要关注加载性能");
      }
      this.seg = new SunSpiritConfig_1.SunSpiritConfig();
      this.LoadAndInitSunSpiritConfig(false);
    }
    return this.seg;
  }
  OHg(e) {
    var i = this.qHg;
    this.qHg = new Set();
    for (const t of i) {
      t(e);
    }
  }
  LoadAndInitSunSpiritConfig(e = true, i) {
    if (i && !this.qHg.has(i)) {
      this.qHg.add(i);
    }
    i = SUN_SPIRIT_CONFIG_DA_PATH;
    if (e) {
      if (this.oeg !== ResourceSystem_1.ResourceSystem.InvalidId) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "加载配置: 异步加载中，不重复加载", ["Path", i]);
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "加载配置: 异步加载", ["Path", i]);
        }
        let t = false;
        e = ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.BP_SunSpiritConfig_C, (e, i) => {
          t = true;
          this.OnLoadSunSpiritConfig(e, i);
          this.OHg(true);
        });
        if (!t) {
          this.oeg = e;
        }
      }
    } else {
      if (this.oeg !== ResourceSystem_1.ResourceSystem.InvalidId) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SunSpirit", 39, "加载配置: 异步加载中，取消并改为同步加载", ["Path", i]);
        }
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.oeg);
        this.oeg = ResourceSystem_1.ResourceSystem.InvalidId;
      }
      this.OnLoadSunSpiritConfig(ResourceSystem_1.ResourceSystem.Load(i, UE.BP_SunSpiritConfig_C), i);
      this.OHg(true);
    }
  }
  ClearAndReleaseSunSpiritConfig() {
    if (this.oeg !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.oeg);
      this.oeg = ResourceSystem_1.ResourceSystem.InvalidId;
      this.OHg(false);
    }
    this.seg = undefined;
  }
  OnLoadSunSpiritConfig(e, i) {
    this.oeg = ResourceSystem_1.ResourceSystem.InvalidId;
    if (e?.IsValid()) {
      this.seg ||= new SunSpiritConfig_1.SunSpiritConfig();
      this.seg.UpdateFromUeData(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "初始化日灵配置成功", ["Path", i]);
      }
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