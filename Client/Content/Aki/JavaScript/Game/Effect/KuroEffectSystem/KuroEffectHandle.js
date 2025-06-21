"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.KuroEffectHandle = void 0;
const cpp_1 = require("cpp"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../EffectSystem");
class KuroEffectHandle {
  constructor() {
    this.Id = 0, this.IsLoop = !1, this.age = void 0, this.Hdc = void 0, this.$dc = void 0, this.Wdc = void 0, this.Qdc = void 0, this.nx = void 0, this.OnCustomCheckOwner = void 0, this.Kdc = !1, this.zCe = !1, this.Xdc = !1, this.Ydc = () => {
      this.Xdc && this.zdc()
    }, this.gfn = t => {
      if (t === this.Id || 0 === this.Id) {
        if (this.age)
          for (const i of this.age) i(t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishEffect, this.Id, "KuroEffectHandle.OnAfterFinish", !0), EffectSystem_1.EffectSystem.RemoveKuroEffectHandle(this.Id)
      }
    }, this.OnBeforeInitCallback = t => {
      t !== this.Id && 0 !== this.Id || this.Hdc && this.Hdc(t)
    }, this.OnEffectInitCallback = (t, i) => {
      i !== this.Id && 0 !== this.Id || this.$dc && this.$dc(t, i)
    }, this.OnBeforePlayCallback = t => {
      t !== this.Id && 0 !== this.Id || (this.Kdc = !0, this.Wdc && this.Wdc(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforePlayEffect, this.Id, "KuroEffectHandle.OnBeforePlay"))
    }, this.OnInitCallbackClear = () => {
      this.Hdc = void 0, this.$dc = void 0, this.Wdc = void 0
    }, this.OnDynamicEffectInitCallback = (t, i) => {
      i !== this.Id && 0 !== this.Id || this.Qdc && this.Qdc(t, i)
    }, this.Jdc = () => {
      this.Qdc = void 0
    }
  }
  Init(t, i, s, h) {
    this.nx = t, this.Hdc = i, this.$dc = s, this.Wdc = h
  }
  OnAfterSpawn(t) {
    this.Id = t, this.IsLoop = cpp_1.FEffectSystem.EffectIsLoop(t), this.RegisterFinishCallback()
  }
  Clear() {
    this.zdc(), this.Hdc = void 0, this.$dc = void 0, this.Wdc = void 0, this.Qdc = void 0, this.nx = void 0, this.OnCustomCheckOwner = void 0
  }
  CheckOwner() {
    if (this.OnCustomCheckOwner) return this.OnCustomCheckOwner(this.Id);
    if (this.nx) {
      if (this.nx.EntityId)
        if (!EntitySystem_1.EntitySystem.Get(this.nx.EntityId)?.Valid) return !1;
      if (this.nx.SourceObject && !this.nx.SourceObject.IsValid()) return !1
    }
    return !0
  }
  IsDone() {
    return this.Kdc
  }
  SetNotRecord(t) {
    this.zCe = t
  }
  GetNotRecord() {
    return this.zCe
  }
  RegisterFinishCallback() {
    this.Xdc || (this.Xdc = !0, cpp_1.FEffectSystem.AddFinishCallback(this.Id, this.gfn, this.Ydc, this))
  }
  zdc() {
    this.Xdc && (this.Xdc = !1, cpp_1.FEffectSystem.RemoveFinishCallback(this.Id), this.age) && this.age.clear()
  }
  AddFinishCallback(t) {
    t && (this.age || (this.age = new Set), this.age.has(t) || this.age.add(t))
  }
  RemoveFinishCallback(t) {
    return !!t && !!this.age && this.age.delete(t)
  }
  RegisterDynamicEffectInitCallback(t) {
    this.Qdc = t, cpp_1.FEffectSystem.DynamicRegisterSpawnCallback(this.Id, this.OnDynamicEffectInitCallback, this.Jdc, this)
  }
}
exports.KuroEffectHandle = KuroEffectHandle;
//# sourceMappingURL=KuroEffectHandle.js.map