"use strict";

var __decorate = this && this.__decorate || function (t, e, r, i) {
  var s;
  var o = arguments.length;
  var n = o < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, r, i);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (s = t[a]) {
        n = (o < 3 ? s(n) : o > 3 ? s(e, r, n) : s(e, r)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(e, r, n);
  }
  return n;
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
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
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
      var e = [];
      var r = this.Init();
      for (const n of t) {
        var i = n.tSs;
        var s = n.vna;
        var o = n.pna ?? 0;
        if (o === 0) {
          e.push(i);
        }
        this.BaseValues[i] = s;
        this.CurrentValues[i] = s + o;
      }
      if (r) {
        for (const a of e) {
          this.UpdateCurrentValue(a);
        }
      }
    }
  }
  SeamlessTravelingRefresh() {
    var t = this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("sys")?.sys?.Mna;
    if (t !== undefined) {
      for (const i of t) {
        var e = i.vna;
        var r = i.pna ?? 0;
        this.SyncValueFromServer(i.tSs, e, e + r);
      }
    }
  }
  static AttributeChangedNotify(t, e) {
    var r = t?.GetComponent(177);
    if (t && r) {
      for (const i of e.GSs) {
        if (CharacterAttributeTypes_1.stateAttributeIds.has(i.tSs)) {
          i.y6n = i.eSs;
        }
        if (i.tSs) {
          r.SyncValueFromServer(i.tSs, i.eSs, i.y6n);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnServerAttributeChange, t.Id, e);
    }
  }
  static RecoverPropChangedNotify(t, e) {
    var r = t?.GetComponent(177);
    if (r) {
      var i = Time_1.Time.ServerCombatStopTime - Number(MathUtils_1.MathUtils.LongToBigInt(e.S6n));
      for (const s of e.GSs) {
        r.SyncRecoverPropFromServer(s.E6n, s.y6n, s.I6n, s.L6n, Number(i));
      }
    }
  }
  OnInit() {
    super.OnInit();
    this.BuffComponent = this.Entity.CheckGetComponent(178);
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
  DispatchCurrentValueEventImplement(t, e, r) {
    super.DispatchCurrentValueEventImplement(t, e, r);
    SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 5, t, t, this.Entity, e, r);
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("OFn", true)], CharacterAttributeComponent, "AttributeChangedNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("v3n", true)], CharacterAttributeComponent, "RecoverPropChangedNotify", null);
CharacterAttributeComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(177)], CharacterAttributeComponent);
exports.CharacterAttributeComponent = CharacterAttributeComponent; //# sourceMappingURL=CharacterAttributeComponent.js.map