"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackboardMap = exports.BlackboardParam = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IVar_1 = require("../../../UniverseEditor/Interface/IVar");
const ModelManager_1 = require("../../Manager/ModelManager");
class BlackboardParam {
  constructor(t) {
    this.jEe = "";
    this.zpr = 0;
    this.svr = undefined;
    this.Zpr = undefined;
    this.avr = undefined;
    this.evr = false;
    this.tvr = 0;
    this.hvr = undefined;
    this.ivr = "";
    this.lvr = undefined;
    this.IGe = undefined;
    this.ovr = undefined;
    this.rvr = undefined;
    this.nvr = undefined;
    this.E9 = t;
  }
  static CreateByProtocol(t) {
    if (t !== undefined) {
      var r = t;
      var e = new BlackboardParam(r.h5n);
      e.SetKey(r.Z4n);
      var t = Protocol_1.Aki.Protocol.sNs;
      switch (r.h5n) {
        case t.Proto_BlackboardParamType_Int:
          e.SetIntValue(r.V8n);
          return e;
        case t.Proto_BlackboardParamType_IntArray:
          e.SetIntValues(r.CKn.gKn);
          return e;
        case t.Proto_BlackboardParamType_Long:
          e.SetLongValue(MathUtils_1.MathUtils.LongToBigInt(r.fKn));
          return e;
        case t.Proto_BlackboardParamType_LongArray:
          var a = r.pKn.gKn;
          var s = new Array();
          for (const i of a) {
            s.push(MathUtils_1.MathUtils.LongToBigInt(i));
          }
          e.SetLongValues(s);
          return e;
        case t.Proto_BlackboardParamType_Boolean:
          e.SetBooleanValue(r.vKn);
          return e;
        case t.Proto_BlackboardParamType_String:
          e.SetStringValue(r.j8n);
          return e;
        case t.Proto_BlackboardParamType_StringArray:
          e.SetStringValues(r.EKn.gKn);
          return e;
        case t.Proto_BlackboardParamType_Float:
          e.SetFloatValue(r.MKn);
          return e;
        case t.Proto_BlackboardParamType_FloatArray:
          e.SetFloatValues(r.SKn.gKn);
          return e;
        case t.Proto_BlackboardParamType_Vector:
          e.SetVectorValue(r.yKn.X, r.yKn.Y, r.yKn.Z);
          return e;
        case t.Proto_BlackboardParamType_VectorArray:
          e.SetVectorValues(r.IKn.gKn);
          return e;
        case t.Proto_BlackboardParamType_Rotator:
          e.SetRotatorValue(r.TKn.Pitch, r.TKn.Roll, r.TKn.Yaw);
          return e;
        case t.Proto_BlackboardParamType_RotatorArray:
          e.SetRotatorValues(r.LKn.gKn);
          return e;
        case t.Proto_BlackboardParamType_Entity:
          e.SetLongValue(MathUtils_1.MathUtils.LongToBigInt(r.fKn));
          return e;
        case t.Proto_BlackboardParamType_EntityArray:
          var a = r.pKn.gKn;
          var o = new Array();
          for (const n of a) {
            o.push(MathUtils_1.MathUtils.LongToBigInt(n));
          }
          e.SetLongValues(o);
          return e;
        default:
          return;
      }
    }
  }
  static CreateByConfig(t) {
    var r = Protocol_1.Aki.Protocol.sNs;
    switch (t.Type) {
      case IVar_1.EBlackBoardType.Boolean:
        var e = new BlackboardParam(r.Proto_BlackboardParamType_Boolean);
        e.SetKey(t.Key);
        e.SetBooleanValue(t.Value);
        return e;
      case IVar_1.EBlackBoardType.Int:
        e = new BlackboardParam(r.Proto_BlackboardParamType_Int);
        e.SetKey(t.Key);
        e.SetIntValue(t.Value);
        return e;
      case IVar_1.EBlackBoardType.Float:
        e = new BlackboardParam(r.Proto_BlackboardParamType_Float);
        e.SetKey(t.Key);
        e.SetFloatValue(t.Value);
        return e;
      case IVar_1.EBlackBoardType.String:
        e = new BlackboardParam(r.Proto_BlackboardParamType_String);
        e.SetKey(t.Key);
        e.SetStringValue(t.Value);
        return e;
      case IVar_1.EBlackBoardType.Vector:
        e = new BlackboardParam(r.Proto_BlackboardParamType_Vector);
        e.SetKey(t.Key);
        e.SetVectorValue(t.Vector.X ?? 0, t.Vector.Y ?? 0, t.Vector.Z ?? 0);
        return e;
      case IVar_1.EBlackBoardType.EntityPos:
        var e = new BlackboardParam(r.Proto_BlackboardParamType_Vector);
        e.SetKey(t.Key);
        var a = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(t.EntityId);
        if (a) {
          e.SetVectorValue(a.Transform?.Pos.X ?? 0, a.Transform?.Pos.Y ?? 0, a.Transform?.Pos.Z ?? 0);
          return e;
        } else {
          return undefined;
        }
      case IVar_1.EBlackBoardType.EntityId:
        a = new BlackboardParam(r.Proto_BlackboardParamType_Float);
        a.SetKey(t.Key);
        a.SetFloatValue(t.EntityId);
        return a;
      default:
        return;
    }
  }
  GetKey() {
    return this.jEe;
  }
  GetType() {
    return this.E9;
  }
  SetKey(t) {
    this.jEe = t;
  }
  GetIntValue() {
    return this.zpr;
  }
  SetIntValue(t) {
    this.zpr = t;
  }
  GetIntValues() {
    return this.svr;
  }
  SetIntValues(t) {
    this.svr = t;
  }
  GetLongValue() {
    return this.Zpr;
  }
  SetLongValue(t) {
    this.Zpr = t;
  }
  GetLongValues() {
    return this.avr;
  }
  SetLongValues(t) {
    this.avr = t;
  }
  GetBooleanValue() {
    return this.evr;
  }
  SetBooleanValue(t) {
    this.evr = t;
  }
  GetFloatValue() {
    return this.tvr;
  }
  SetFloatValue(t) {
    this.tvr = t;
  }
  GetFloatValues() {
    return this.hvr;
  }
  SetFloatValues(t) {
    this.hvr = t;
  }
  GetStringValue() {
    return this.ivr;
  }
  SetStringValue(t) {
    this.ivr = t;
  }
  GetStringValues() {
    return this.lvr;
  }
  SetStringValues(t) {
    this.lvr = t;
  }
  GetVectorValue() {
    return this.IGe;
  }
  SetVectorValue(t, r, e) {
    this.IGe ||= Protocol_1.Aki.Protocol.Gks.create();
    this.IGe.X = t;
    this.IGe.Y = r;
    this.IGe.Z = e;
  }
  GetVectorValues() {
    return this.ovr;
  }
  SetVectorValues(t) {
    this.ovr = t;
  }
  GetRotatorValue() {
    return this.rvr;
  }
  SetRotatorValue(t, r, e) {
    this.rvr ||= Protocol_1.Aki.Protocol.D2s.create();
    this.rvr.Pitch = t;
    this.rvr.Roll = r;
    this.rvr.Yaw = e;
  }
  GetRotatorValues() {
    return this.nvr;
  }
  SetRotatorValues(t) {
    this.nvr = t;
  }
  ToString() {
    var t = Protocol_1.Aki.Protocol.sNs;
    switch (this.E9) {
      case t.Proto_BlackboardParamType_Int:
        return this.zpr.toString();
      case t.Proto_BlackboardParamType_IntArray:
        {
          let r = "[";
          if (this.svr !== undefined) {
            var e = this.svr.length;
            for (let t = 0; t < e; t++) {
              r += this.svr[t];
              if (t !== e - 1) {
                r += ", ";
              }
            }
          }
          return r += "]";
        }
      case t.Proto_BlackboardParamType_Long:
        return this.Zpr.toString();
      case t.Proto_BlackboardParamType_LongArray:
        {
          let r = "[";
          if (this.avr !== undefined) {
            var a = this.avr.length;
            for (let t = 0; t < a; t++) {
              r += this.avr[t];
              if (t !== a - 1) {
                r += ", ";
              }
            }
          }
          return r += "]";
        }
      case t.Proto_BlackboardParamType_Boolean:
        return this.evr.toString();
      case t.Proto_BlackboardParamType_String:
        return this.ivr;
      case t.Proto_BlackboardParamType_StringArray:
        {
          let r = "[";
          if (this.lvr !== undefined) {
            var s = this.lvr.length;
            for (let t = 0; t < s; t++) {
              r += this.lvr[t];
              if (t !== s - 1) {
                r += ", ";
              }
            }
          }
          return r += "]";
        }
      case t.Proto_BlackboardParamType_Float:
        return this.tvr.toString();
      case t.Proto_BlackboardParamType_FloatArray:
        {
          let r = "[";
          if (this.hvr !== undefined) {
            var o = this.hvr.length;
            for (let t = 0; t < o; t++) {
              r += this.hvr[t];
              if (t !== o - 1) {
                r += ", ";
              }
            }
          }
          return r += "]";
        }
      case t.Proto_BlackboardParamType_Vector:
        {
          let t = "";
          if (this.IGe !== undefined) {
            t += `X:${this.IGe.X} Y:${this.IGe.Y} Z:${this.IGe.Z}`;
          }
          return t;
        }
      case t.Proto_BlackboardParamType_VectorArray:
        {
          let r = "[";
          if (this.ovr !== undefined) {
            var i = this.ovr.length;
            for (let t = 0; t < i; t++) {
              var n = this.ovr[t];
              r += `X:${n.X} Y:${n.Y} Z:${n.Z}`;
              if (t !== i - 1) {
                r += ", ";
              }
            }
          }
          return r += "]";
        }
      case t.Proto_BlackboardParamType_Rotator:
        {
          let t = "";
          if (this.rvr !== undefined) {
            t += `Pitch:${this.rvr.Pitch} Roll:${this.rvr.Roll} Yaw:${this.rvr.Yaw}`;
          }
          return t;
        }
      case t.Proto_BlackboardParamType_RotatorArray:
        {
          let r = "[";
          if (this.nvr !== undefined) {
            var l = this.nvr.length;
            for (let t = 0; t < l; t++) {
              var c = this.nvr[t];
              r += `Pitch:${c.Pitch} Roll:${c.Roll} Yaw:${c.Yaw}`;
              if (t !== l - 1) {
                r += ", ";
              }
            }
          }
          return r += "]";
        }
      case t.Proto_BlackboardParamType_Entity:
        return this.zpr.toString();
      case t.Proto_BlackboardParamType_EntityArray:
        {
          let r = "[";
          if (this.svr !== undefined) {
            var u = this.svr.length;
            for (let t = 0; t < u; t++) {
              r += this.svr[t];
              if (t !== u - 1) {
                r += ", ";
              }
            }
          }
          return r += "]";
        }
      default:
        return "";
    }
  }
}
exports.BlackboardParam = BlackboardParam;
class BlackboardMap {
  constructor() {
    this.BlackboardMap = new Map();
  }
  GetValue(t) {
    t = this.BlackboardMap.get(t);
    return t || undefined;
  }
  HasValue(t) {
    return this.BlackboardMap.has(t);
  }
  SetValue(t, r) {
    this.BlackboardMap.set(t, r);
  }
  RemoveValue(t) {
    return this.BlackboardMap.delete(t);
  }
  Clear() {
    this.BlackboardMap.clear();
  }
  ToString() {
    let t = "";
    for (const e of this.BlackboardMap.keys()) {
      var r = this.BlackboardMap.get(e);
      t += `key:${e}  type:${BlackboardMap._vr(r.GetType())}  value:${r?.ToString()}
`;
    }
    return t;
  }
  static CheckValueType(t, r, e) {
    return r.GetType() === e || (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[BlackboardMap.CheckValue] 设置黑板值失败,因为相同的Key使用了不同的数据类型。", ["Key", t], ["Old字段类型", BlackboardMap._vr(r.GetType())], ["New字段类型", BlackboardMap._vr(e)]), false);
  }
  static _vr(t) {
    switch (t) {
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_None:
        return "none";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Int:
        return "int";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_IntArray:
        return "array<int>";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Long:
        return "long";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_LongArray:
        return "array<long>";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Boolean:
        return "boolean";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_String:
        return "string";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_StringArray:
        return "array<string>";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Float:
        return "float";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_FloatArray:
        return "array<float>";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Vector:
        return "vector";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_VectorArray:
        return "array<vector>";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Rotator:
        return "rotator";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_RotatorArray:
        return "array<rotator>";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_Entity:
        return "entity";
      case Protocol_1.Aki.Protocol.sNs.Proto_BlackboardParamType_EntityArray:
        return "array<entity>";
      default:
        return;
    }
  }
}
exports.BlackboardMap = BlackboardMap;
//# sourceMappingURL=BlackboardMap.js.map