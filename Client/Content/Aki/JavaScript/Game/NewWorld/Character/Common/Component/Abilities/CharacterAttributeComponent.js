"use strict";

var __decorate = this && this.__decorate || function (t, e, r, i) {
  var s;
  var o = arguments.length;
  var a = o < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, r, i);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        a = (o < 3 ? s(a) : o > 3 ? s(e, r, a) : s(e, r)) || a;
      }
    }
  }
  if (o > 3 && a) {
    Object.defineProperty(e, r, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAttributeComponent = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const BaseAttributeComponent_1 = require("./BaseAttributeComponent");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
let CharacterAttributeComponent = class CharacterAttributeComponent extends BaseAttributeComponent_1.BaseAttributeComponent {
  constructor() {
    super(...arguments);
    this.BuffComponent = undefined;
    this.qbr = (e, t, r) => {
      if (CharacterAttributeTypes_1.stateAttributeIds.has(e) || [...CharacterAttributeTypes_1.attributeIdsWithMax.values()].some(t => t === e)) {
        this.Gbr?.InternalApplyModToAttribute(e, 3, t);
      }
    };
    this.Gbr = undefined;
    this.Nbr = (t, e, r) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnHealthChanged, this.Entity.Id, e, r);
    };
    this.Obr = (t, e, r) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnHealthMaxChanged, this.Entity.Id, e, r);
    };
    this.kbr = (t, e, r) => {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnEnergyChanged, t, e, r);
    };
  }
  OnInitData() {
    this.Koa();
    this.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.Nbr);
    this.AddListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.Obr);
    this.AddListeners(CharacterAttributeTypes_1.energyAttrIds, this.kbr);
    this.AddGeneralListener(this.qbr);
    return true;
  }
  OnActivate() {
    this.Koa();
  }
  Koa() {
    var t = this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("sys")?.sys?.Mna;
    if (t !== undefined) {
      var e = new Map();
      var r = [];
      var i = this.Init();
      for (const n of t) {
        var s = n.tSs;
        var o = n.vna;
        var a = n.pna ?? 0;
        if (a !== 0) {
          e.set(s, a);
        } else {
          r.push(s);
        }
        this.BaseValues[s] = o;
        this.CurrentValues[s] = o + a;
      }
      if (i) {
        for (const h of r) {
          this.UpdateCurrentValue(h);
        }
      }
    }
  }
  static AttributeChangedNotify(t, e) {
    var r = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    var i = r?.Entity?.GetComponent(173);
    if (r && i) {
      for (const s of e.GSs) {
        if (CharacterAttributeTypes_1.stateAttributeIds.has(s.tSs)) {
          s.y6n = s.eSs;
        }
        if (s.tSs) {
          i.SyncValueFromServer(s.tSs, s.eSs, s.y6n);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnServerAttributeChange, r.Id, e);
    }
  }
  static RecoverPropChangedNotify(t, e) {
    var r = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity?.GetComponent(173);
    if (i) {
      var s = Time_1.Time.ServerCombatStopTime - Number(MathUtils_1.MathUtils.LongToBigInt(e.S6n));
      for (const o of e.GSs) {
        i.SyncRecoverPropFromServer(o.E6n, o.y6n, o.I6n, o.L6n, Number(s));
      }
    }
  }
  OnInit() {
    super.OnInit();
    this.BuffComponent = this.Entity.CheckGetComponent(174);
    return true;
  }
  OnStart() {
    this.Koa();
    var t = this.Entity.CheckGetComponent(1)?.Owner;
    if (t && t instanceof UE.BaseCharacter) {
      this.Gbr = t.AbilitySystemComponent;
    }
    for (const e of CharacterAttributeTypes_1.attributeIdsWithMax.values()) {
      this.Gbr?.InternalApplyModToAttribute(e, 3, this.GetCurrentValue(e));
    }
    for (const r of CharacterAttributeTypes_1.stateAttributeIds.values()) {
      this.Gbr?.InternalApplyModToAttribute(r, 3, this.GetCurrentValue(r));
    }
    return true;
  }
  OnEnd() {
    this.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.Nbr);
    this.RemoveListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.Obr);
    this.RemoveListeners(CharacterAttributeTypes_1.energyAttrIds, this.kbr);
    this.RemoveGeneralListener(this.qbr);
    return true;
  }
  OnClear() {
    return true;
  }
  ClearSpecialEnergy() {
    if (this.BuffComponent?.HasBuffAuthority()) {
      for (const t of CharacterAttributeTypes_1.specialEnergyIds) {
        this.SetBaseValue(t, 0);
      }
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("OFn", true)], CharacterAttributeComponent, "AttributeChangedNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("v3n", true)], CharacterAttributeComponent, "RecoverPropChangedNotify", null);
CharacterAttributeComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(173)], CharacterAttributeComponent);
exports.CharacterAttributeComponent = CharacterAttributeComponent; //# sourceMappingURL=CharacterAttributeComponent.js.map