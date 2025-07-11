"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackboardModel = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const BlackboardMap_1 = require("../Define/BlackboardMap");
class BlackboardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.aMr = new BlackboardMap_1.BlackboardMap();
    this.hMr = new BlackboardMap_1.BlackboardMap();
    this.lMr = new Map();
  }
  OnClear() {
    this.aMr.Clear();
    this.hMr.Clear();
    this.lMr.clear();
    return true;
  }
  GetCreatureDataComponent(t) {
    if (!this.lMr.has(t)) {
      var o = EntitySystem_1.EntitySystem.Get(t);
      if (!o?.Valid) {
        return;
      }
      o = o.GetComponent(0);
      if (!o?.Valid) {
        return;
      }
      this.lMr.set(t, o);
    }
    return this.lMr.get(t);
  }
  RemoveCreatureDataComponent(t) {
    if (this.lMr.has(t)) {
      this.lMr.delete(t);
    }
  }
  GetIntValueByGlobal(t) {
    return this.aMr.GetValue(t)?.GetIntValue();
  }
  SetIntValueByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetIntValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Int)).SetIntValue(o);
      this.aMr.SetValue(t, e);
    }
  }
  GetIntValuesByGlobal(t) {
    t = this.aMr.GetValue(t);
    if (t) {
      return t.GetIntValues();
    } else {
      return undefined;
    }
  }
  SetIntValuesByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetIntValues(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_IntArray)).SetIntValues(o);
      this.aMr.SetValue(t, e);
    }
  }
  GetLongValueByGlobal(t) {
    return this.aMr.GetValue(t)?.GetLongValue();
  }
  SetLongValueByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetLongValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Long)).SetLongValue(o);
      this.aMr.SetValue(t, e);
    }
  }
  GetLongValuesByGlobal(t) {
    t = this.aMr.GetValue(t);
    if (t) {
      return t.GetLongValues();
    } else {
      return undefined;
    }
  }
  SetLongValuesByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetLongValues(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_LongArray)).SetLongValues(o);
      this.aMr.SetValue(t, e);
    }
  }
  GetBooleanValueByGlobal(t) {
    return this.aMr.GetValue(t)?.GetBooleanValue();
  }
  SetBooleanValueByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetBooleanValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Boolean)).SetBooleanValue(o);
      this.aMr.SetValue(t, e);
    }
  }
  GetFloatValueByGlobal(t) {
    return this.aMr.GetValue(t)?.GetFloatValue();
  }
  SetFloatValueByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetFloatValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Float)).SetFloatValue(o);
      this.aMr.SetValue(t, e);
    }
  }
  GetFloatValuesByGlobal(t) {
    t = this.aMr.GetValue(t);
    if (t) {
      return t.GetFloatValues();
    } else {
      return undefined;
    }
  }
  SetFloatValuesByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetFloatValues(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_FloatArray)).SetFloatValues(o);
      this.aMr.SetValue(t, e);
    }
  }
  GetStringValueByGlobal(t) {
    t = this.aMr.GetValue(t);
    if (t) {
      return t.GetStringValue();
    } else {
      return undefined;
    }
  }
  SetStringValueByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetStringValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_String)).SetStringValue(o);
      this.aMr.SetValue(t, e);
    }
  }
  GetStringValuesByGlobal(t) {
    t = this.aMr.GetValue(t);
    if (t) {
      return t.GetStringValues();
    } else {
      return undefined;
    }
  }
  SetStringValuesByGlobal(t, o) {
    let e = this.aMr.GetValue(t);
    if (e) {
      e.SetStringValues(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_StringArray)).SetStringValues(o);
      this.aMr.SetValue(t, e);
    }
  }
  SetValueByGlobal(t, o) {
    this.aMr.SetValue(t, o);
  }
  RemoveValueByGlobal(t) {
    this.aMr.RemoveValue(t);
  }
  SetWorldBlackboardByProtocol(t) {}
  GetIntValueByWorld(t) {
    return this.hMr.GetValue(t)?.GetIntValue();
  }
  SetIntValueByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetIntValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Int)).SetIntValue(o);
      this.hMr.SetValue(t, e);
    }
  }
  GetIntValuesByWorld(t) {
    t = this.hMr.GetValue(t);
    if (t) {
      return t.GetIntValues();
    } else {
      return undefined;
    }
  }
  SetIntValuesByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetIntValues(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_IntArray)).SetIntValues(o);
      this.hMr.SetValue(t, e);
    }
  }
  GetLongValueByWorld(t) {
    return this.hMr.GetValue(t)?.GetLongValue();
  }
  SetLongValueByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetLongValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Long)).SetLongValue(o);
      this.hMr.SetValue(t, e);
    }
  }
  GetLongValuesByWorld(t) {
    t = this.hMr.GetValue(t);
    if (t) {
      return t.GetLongValues();
    } else {
      return undefined;
    }
  }
  SetLongValuesByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetLongValues(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_LongArray)).SetLongValues(o);
      this.hMr.SetValue(t, e);
    }
  }
  GetBooleanValueByWorld(t) {
    return this.hMr.GetValue(t)?.GetBooleanValue();
  }
  SetBooleanValueByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetBooleanValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Boolean)).SetBooleanValue(o);
      this.hMr.SetValue(t, e);
    }
  }
  GetFloatValueByWorld(t) {
    return this.hMr.GetValue(t)?.GetFloatValue();
  }
  SetFloatValueByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetFloatValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Float)).SetFloatValue(o);
      this.hMr.SetValue(t, e);
    }
  }
  GetFloatValuesByWorld(t) {
    t = this.hMr.GetValue(t);
    if (t) {
      return t.GetFloatValues();
    } else {
      return undefined;
    }
  }
  SetFloatValuesByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetFloatValues(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_FloatArray)).SetFloatValues(o);
      this.hMr.SetValue(t, e);
    }
  }
  GetStringValueByWorld(t) {
    t = this.hMr.GetValue(t);
    if (t) {
      return t.GetStringValue();
    } else {
      return undefined;
    }
  }
  SetStringValueByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetStringValue(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_String)).SetStringValue(o);
      this.hMr.SetValue(t, e);
    }
  }
  GetStringValuesByWorld(t) {
    t = this.hMr.GetValue(t);
    if (t) {
      return t.GetStringValues();
    } else {
      return undefined;
    }
  }
  SetStringValuesByWorld(t, o) {
    let e = this.hMr.GetValue(t);
    if (e) {
      e.SetStringValues(o);
    } else {
      (e = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_StringArray)).SetStringValues(o);
      this.hMr.SetValue(t, e);
    }
  }
  SetValueByWorld(t, o) {
    this.hMr.SetValue(t, o);
  }
  RemoveValueByWorld(t) {
    this.hMr.RemoveValue(t);
  }
  SetVectorValueByWorld(t, o, e, l) {
    let a = this.hMr.GetValue(t);
    if (a) {
      a.SetVectorValue(o, e, l);
    } else {
      (a = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Vector)).SetVectorValue(o, e, l);
      this.hMr.SetValue(t, a);
    }
  }
  GetVectorValueByWorld(t) {
    return this.hMr.GetValue(t)?.GetVectorValue();
  }
  GetIntValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetIntValue();
    }
  }
  SetIntValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Int);
        t.SetIntValue(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Int)).SetIntValue(l);
        o.SetValue(e, t);
      }
    }
  }
  GetIntValuesByEntity(t, o) {
    var t = this.GetCreatureDataComponent(t);
    if (t = t && t.GetBlackboard().GetValue(o)) {
      return t.GetIntValues();
    } else {
      return undefined;
    }
  }
  SetIntValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_IntArray);
        t.SetIntValues(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_IntArray)).SetIntValues(l);
        o.SetValue(e, t);
      }
    }
  }
  GetLongValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetLongValue();
    }
  }
  SetLongValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Long);
        t.SetLongValue(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Long)).SetLongValue(l);
        o.SetValue(e, t);
      }
    }
  }
  GetLongValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetLongValues();
    }
  }
  SetLongValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_LongArray);
        t.SetLongValues(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_LongArray)).SetLongValues(l);
        o.SetValue(e, t);
      }
    }
  }
  GetBooleanValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetBooleanValue();
    }
  }
  SetBooleanValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Boolean);
        t.SetBooleanValue(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Boolean)).SetBooleanValue(l);
        o.SetValue(e, t);
      }
    }
  }
  GetFloatValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetFloatValue();
    }
  }
  SetFloatValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Float);
        t.SetFloatValue(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Float)).SetFloatValue(l);
        o.SetValue(e, t);
      }
    }
  }
  GetFloatValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetFloatValues();
    }
  }
  SetFloatValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_FloatArray);
        t.SetFloatValues(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_FloatArray)).SetFloatValues(l);
        o.SetValue(e, t);
      }
    }
  }
  GetStringValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetStringValue();
    }
  }
  SetStringValueByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_String);
        t.SetStringValue(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_String)).SetStringValue(l);
        o.SetValue(e, t);
      }
    }
  }
  GetStringValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetStringValues();
    }
  }
  SetStringValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_StringArray);
        t.SetStringValues(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_StringArray)).SetStringValues(l);
        o.SetValue(e, t);
      }
    }
  }
  GetVectorValueByEntity(t, o) {
    var t = this.GetCreatureDataComponent(t);
    if (t = t && t.GetBlackboard().GetValue(o)) {
      return t.GetVectorValue();
    } else {
      return undefined;
    }
  }
  SetVectorValueByEntity(o, e, l, a, r) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Vector);
        t.SetVectorValue(l, a, r);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Vector)).SetVectorValue(l, a, r);
        o.SetValue(e, t);
      }
    }
  }
  GetVectorValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetVectorValues();
    }
  }
  SetVectorValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_VectorArray);
        t.SetVectorValues(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_VectorArray)).SetVectorValues(l);
        o.SetValue(e, t);
      }
    }
  }
  GetRotatorValueByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetRotatorValue();
    }
  }
  SetRotatorValueByEntity(o, e, l, a, r) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Rotator);
        t.SetRotatorValue(l, a, r);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Rotator)).SetRotatorValue(l, a, r);
        o.SetValue(e, t);
      }
    }
  }
  GetRotatorValuesByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetRotatorValues();
    }
  }
  SetRotatorValuesByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_RotatorArray);
        t.SetRotatorValues(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_RotatorArray)).SetRotatorValues(l);
        o.SetValue(e, t);
      }
    }
  }
  GetEntityIdByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetIntValue();
    }
  }
  SetEntityIdByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Entity);
        t.SetIntValue(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Entity)).SetIntValue(l);
        o.SetValue(e, t);
      }
    }
  }
  GetEntityIdsByEntity(t, o) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      return t.GetBlackboard().GetValue(o)?.GetIntValues();
    }
  }
  SetEntityIdsByEntity(o, e, l) {
    o = this.GetCreatureDataComponent(o);
    if (o) {
      o = o.GetBlackboard();
      let t = o.GetValue(e);
      if (t) {
        BlackboardMap_1.BlackboardMap.CheckValueType(e, t, Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_EntityArray);
        t.SetIntValues(l);
      } else {
        (t = new BlackboardMap_1.BlackboardParam(Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_EntityArray)).SetIntValues(l);
        o.SetValue(e, t);
      }
    }
  }
  SetValueByEntity(t, o, e) {
    t = this.GetCreatureDataComponent(t);
    if (t) {
      t.SetBlackboard(o, e);
    }
  }
}
exports.BlackboardModel = BlackboardModel;
//# sourceMappingURL=BlackboardModel.js.map