"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NiagaraComponentHandle = undefined;
const UE = require("ue");
class EmitterFloatParam {
  constructor() {
    this.EmitterName = "";
    this.VariableName = "";
    this.FloatValue = 0;
  }
}
class EmitterVector4Param {
  constructor() {
    this.EmitterName = "";
    this.VariableName = "";
    this.Vector4Value = undefined;
  }
}
class EmitterCustomTextureParam {
  constructor() {
    this.EmitterName = "";
    this.VariableName = "";
    this.TextureValue = undefined;
  }
}
class NiagaraComponentHandle {
  constructor() {
    this.Upe = undefined;
    this.Ape = undefined;
    this.Ppe = undefined;
    this.xpe = undefined;
    this.wpe = undefined;
    this.nvl = undefined;
    this.vN1 = undefined;
    this.svl = undefined;
    this.avl = undefined;
    this.CAl = undefined;
    this.gAl = undefined;
    this.bForceSolo = undefined;
    this._Kl = undefined;
    this.lF_ = undefined;
    this.gUc = undefined;
  }
  IsValid() {
    return true;
  }
  SetNiagaraVariableFloat(t, i) {
    this.Upe ||= new Map();
    this.Upe.set(t, i);
  }
  SetNiagaraVariableVec3(t, i) {
    this.Ape ||= new Map();
    this.Ape.set(t, i);
  }
  SetIntParameter(t, i) {
    this.Ppe ||= new Map();
    this.Ppe.set(t, i);
  }
  SetFloatParameter(t, i) {
    this.xpe ||= new Map();
    this.xpe.set(t, i);
  }
  SetColorParameter(t, i) {
    this.wpe ||= new Map();
    this.wpe.set(t, i);
  }
  SetVectorParameter(t, i) {
    this.nvl ||= new Map();
    this.nvl.set(t, i);
  }
  SetVectorArrayParameter(t, i) {
    this.vN1 ||= new Map();
    this.vN1.set(t, i);
  }
  SetKuroNiagaraEmitterFloatParam(t, i, s) {
    this.svl ||= new Array();
    var a = new EmitterFloatParam();
    a.EmitterName = t;
    a.VariableName = i;
    a.FloatValue = s;
    this.svl.push(a);
  }
  SetKuroNiagaraEmitterVectorParam(t, i, s) {
    this.avl ||= new Array();
    var a = new EmitterVector4Param();
    a.EmitterName = t;
    a.VariableName = i;
    a.Vector4Value = s;
    this.avl.push(a);
  }
  SetNiagaraVariableLinearColor(t, i) {
    this.gAl ||= new Map();
    this.gAl.set(t, i);
  }
  SetCastShadow(t) {
    this._Kl = t;
  }
  SetEnviInteractionComp(t) {
    this.lF_ = t;
  }
  SetKuroNiagaraEmitterCustomTexture(t, i, s) {
    this.CAl ||= new Array();
    var a = new EmitterCustomTextureParam();
    a.EmitterName = t;
    a.VariableName = i;
    a.TextureValue = s;
    this.CAl.push(a);
  }
  SetEmitterQualityLevelBias(t) {
    this.gUc = t;
  }
  InitNiagaraComponent(t) {
    if (t) {
      if (this.Upe) {
        for (var [i, s] of this.Upe) {
          t.SetNiagaraVariableFloat(i, s);
        }
      }
      if (this.Ape) {
        for (var [a, r] of this.Ape) {
          t.SetNiagaraVariableVec3(a, r);
        }
      }
      if (this.Ppe) {
        for (var [h, o] of this.Ppe) {
          t.SetIntParameter(h, o);
        }
      }
      if (this.xpe) {
        for (var [e, n] of this.xpe) {
          t.SetFloatParameter(e, n);
        }
      }
      if (this.wpe) {
        for (var [v, f] of this.wpe) {
          t.SetColorParameter(v, f);
        }
      }
      if (this.nvl) {
        for (var [m, d] of this.nvl) {
          t.SetVectorParameter(m, d);
        }
      }
      if (this.vN1) {
        for (var [c, l] of this.vN1) {
          UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayVector(t, c, l);
        }
      }
      if (this.svl) {
        for (const w of this.svl) {
          t.SetKuroNiagaraEmitterFloatParam(w.EmitterName, w.VariableName, w.FloatValue);
        }
      }
      if (this.avl) {
        for (const S of this.avl) {
          t.SetKuroNiagaraEmitterVectorParam(S.EmitterName, S.VariableName, S.Vector4Value);
        }
      }
      if (this.gAl) {
        for (var [u, p] of this.gAl) {
          t.SetNiagaraVariableLinearColor(u, p);
        }
      }
      if (this.CAl) {
        for (const E of this.CAl) {
          t.SetKuroNiagaraEmitterCustomTexture(E.EmitterName, E.VariableName, E.TextureValue);
        }
      }
      if (this._Kl !== undefined) {
        t.SetCastShadow(this._Kl);
      }
      if (this.bForceSolo !== undefined) {
        t.bForceSolo = this.bForceSolo;
      }
      if (this.lF_ !== undefined) {
        this.lF_.SetNiagaraCompShiftColor(t);
      }
      if (this.gUc !== undefined) {
        t.SetEmitterQualityLevelBias(this.gUc);
      }
    }
  }
}
exports.NiagaraComponentHandle = NiagaraComponentHandle;
//# sourceMappingURL=NiagaraComponentHandle.js.map