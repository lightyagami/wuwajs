"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var o = arguments.length;
  var r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (n = t[h]) {
        r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterBirthTagComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralController_1 = require("../../../../LevelGamePlay/LevelGeneralController");
let CharacterBirthTagComponent = class CharacterBirthTagComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this._Ka = undefined;
    this.uKa = false;
    this.cKa = [];
    this.dIe = () => {
      if (this.cKa && this.cKa.length !== 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "天气变更，检查待机状态Tag条件", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["EntityId", this.Hte?.Entity.Id]);
        }
        this.mKa();
      }
    };
    this.J5l = () => {
      if (this.cKa && this.cKa.length !== 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "时间状态变更，检查待机状态Tag条件", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["EntityId", this.Hte?.Entity.Id]);
        }
        this.mKa();
      }
    };
  }
  OnEnd() {
    if (this.uKa) {
      this.cKa.length = 0;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeatherChange, this.dIe);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossHour, this.J5l);
    }
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Lie = this.Entity.GetComponent(217);
    var t = this.Hte.CreatureData?.GetPbEntityInitData();
    if (t && this.Lie && this.Hte && (this._Ka = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent"), this._Ka)) {
      switch (this._Ka.InitState?.Type) {
        case 0:
          this.Lie.AddTag(1927538016);
          break;
        case 1:
          this.CKa(this._Ka.InitState);
          break;
        case 2:
          this.Lie.AddTag(447365096);
          break;
        case 3:
          this.Lie.AddTag(-1183618125);
          break;
        case 4:
          this.Lie.AddTag(-1609174800);
          break;
        case 5:
          this.Lie.AddTag(1694559440);
      }
    }
    return true;
  }
  CKa(e) {
    if (this.Lie && e) {
      this.cKa.length = 0;
      var i = ObjectUtils_1.ObjectUtils.GetGameplayTags(e.StandbyTags);
      for (let t = 0; t < i.length; t++) {
        var s = i[t].TagId;
        if (e.Conditions) {
          var n = e.Conditions[t];
          if (n) {
            this.cKa.push({
              Tag: i[t],
              Conditions: n
            });
            continue;
          }
        }
        if (!this.Lie.HasTag(s)) {
          this.Lie.AddTag(s);
        }
      }
      if (this.cKa.length !== 0) {
        this.uKa = true;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeatherChange, this.dIe);
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossHour, this.J5l);
        this.mKa();
      }
    }
  }
  mKa() {
    if (this.Lie && this.cKa && this.cKa.length !== 0) {
      for (const i of this.cKa) {
        var t = LevelGeneralController_1.LevelGeneralController.CheckConditionNew(i.Conditions, undefined);
        var e = i.Tag.TagId;
        if (t && !this.Lie.HasTag(e)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 42, "待机状态Tag条件发生变化，添加Tag", ["Tag", i.Tag.TagName], ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["EntityId", this.Hte?.Entity.Id]);
          }
          this.Lie.AddTag(e);
        }
        if (!t && this.Lie.HasTag(e)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 42, "待机状态Tag条件发生变化，移除Tag", ["Tag", i.Tag.TagName], ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["EntityId", this.Hte?.Entity.Id]);
          }
          this.Lie.RemoveTag(e);
        }
      }
    }
  }
};
CharacterBirthTagComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(281)], CharacterBirthTagComponent);
exports.CharacterBirthTagComponent = CharacterBirthTagComponent; //# sourceMappingURL=CharacterBirthTagComponent.js.map