"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroEffectHandle = undefined;
const cpp_1 = require("cpp");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../EffectSystem");
class KuroEffectHandle {
  constructor() {
    this.Id = 0;
    this.IsLoop = false;
    this.age = undefined;
    this.Hdc = undefined;
    this.$dc = undefined;
    this.Wdc = undefined;
    this.Qdc = undefined;
    this.nx = undefined;
    this.OnCustomCheckOwner = undefined;
    this.Kdc = false;
    this.zCe = false;
    this.Xdc = false;
    this.Ydc = () => {
      if (this.Xdc) {
        this.zdc();
      }
    };
    this.gfn = t => {
      if (t === this.Id || this.Id === 0) {
        if (this.age) {
          for (const i of this.age) {
            i(t);
          }
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishEffect, this.Id, "KuroEffectHandle.OnAfterFinish", true);
        EffectSystem_1.EffectSystem.RemoveKuroEffectHandle(this.Id);
      }
    };
    this.OnBeforeInitCallback = t => {
      if (t === this.Id || this.Id === 0) {
        if (this.Hdc) {
          this.Hdc(t);
        }
      }
    };
    this.OnEffectInitCallback = (t, i) => {
      if (i === this.Id || this.Id === 0) {
        if (this.$dc) {
          this.$dc(t, i);
        }
      }
    };
    this.OnBeforePlayCallback = t => {
      if (t === this.Id || this.Id === 0) {
        this.Kdc = true;
        if (this.Wdc) {
          this.Wdc(t);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforePlayEffect, this.Id, "KuroEffectHandle.OnBeforePlay");
      }
    };
    this.OnInitCallbackClear = () => {
      this.Hdc = undefined;
      this.$dc = undefined;
      this.Wdc = undefined;
    };
    this.OnDynamicEffectInitCallback = (t, i) => {
      if (i === this.Id || this.Id === 0) {
        if (this.Qdc) {
          this.Qdc(t, i);
        }
      }
    };
    this.Jdc = () => {
      this.Qdc = undefined;
    };
  }
  Init(t, i, s, h) {
    this.nx = t;
    this.Hdc = i;
    this.$dc = s;
    this.Wdc = h;
  }
  OnAfterSpawn(t) {
    this.Id = t;
    this.IsLoop = cpp_1.FEffectSystem.EffectIsLoop(t);
    this.RegisterFinishCallback();
  }
  Clear() {
    this.zdc();
    this.Hdc = undefined;
    this.$dc = undefined;
    this.Wdc = undefined;
    this.Qdc = undefined;
    this.nx = undefined;
    this.OnCustomCheckOwner = undefined;
  }
  CheckOwner() {
    if (this.OnCustomCheckOwner) {
      return this.OnCustomCheckOwner(this.Id);
    }
    if (this.nx) {
      if (this.nx.EntityId) {
        if (!EntitySystem_1.EntitySystem.Get(this.nx.EntityId)?.Valid) {
          return false;
        }
      }
      if (this.nx.SourceObject && !this.nx.SourceObject.IsValid()) {
        return false;
      }
    }
    return true;
  }
  IsDone() {
    return this.Kdc;
  }
  SetNotRecord(t) {
    this.zCe = t;
  }
  GetNotRecord() {
    return this.zCe;
  }
  RegisterFinishCallback() {
    if (!this.Xdc) {
      this.Xdc = true;
      cpp_1.FEffectSystem.AddFinishCallback(this.Id, this.gfn, this.Ydc, this);
    }
  }
  zdc() {
    if (this.Xdc && (this.Xdc = false, cpp_1.FEffectSystem.RemoveFinishCallback(this.Id), this.age)) {
      this.age.clear();
    }
  }
  AddFinishCallback(t) {
    if (t) {
      this.age ||= new Set();
      if (!this.age.has(t)) {
        this.age.add(t);
      }
    }
  }
  RemoveFinishCallback(t) {
    return !!t && !!this.age && this.age.delete(t);
  }
  RegisterDynamicEffectInitCallback(t) {
    this.Qdc = t;
    cpp_1.FEffectSystem.DynamicRegisterSpawnCallback(this.Id, this.OnDynamicEffectInitCallback, this.Jdc, this);
  }
}
exports.KuroEffectHandle = KuroEffectHandle;
//# sourceMappingURL=KuroEffectHandle.js.map