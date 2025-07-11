"use strict";

var HackManagementComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        s = (r < 3 ? o(s) : r > 3 ? o(e, i, s) : o(e, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HackManagementComponent = undefined;
const Time_1 = require("../../../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NUM_TAG_ID = 586736149;
const NUM_IS_EMPTY_TAG_ID = -1725495138;
const HACKING_TAG_ID = 1545618306;
const TIP_TEXT_ID = "ClientErrorCode_0_Text";
const SHOW_TIP_INTERVAL = 1000;
let HackManagementComponent = HackManagementComponent_1 = class HackManagementComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.EIe = undefined;
    this.Lie = undefined;
    this.U2_ = 0;
    this.D2_ = [];
    this.B2_ = false;
    this.k2_ = 0;
    this.q2_ = (t, e) => {
      var i = Time_1.Time.Now - this.k2_;
      if (e && this.B2_ && i > SHOW_TIP_INTERVAL) {
        this.k2_ = Time_1.Time.Now;
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(TIP_TEXT_ID);
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(HackManagementComponent_1)[0];
    this.Lo = t;
    this.U2_ = this.Lo.MaxHackingCount;
    return true;
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    if (this.EIe?.PbHackingEntities) {
      for (const i of this.EIe.PbHackingEntities) {
        var t = MathUtils_1.MathUtils.LongToNumber(i);
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
        if (t && t.Entity?.Valid) {
          this.D2_.push(t.Entity);
        }
      }
    }
    this.Lie = this.Entity.GetComponent(205);
    this.Lie?.AddTag(NUM_TAG_ID);
    var e = this.GetRemainingHackNumber();
    if (e > 1) {
      this.Lie?.TagContainer.UpdateExactTag(1, NUM_TAG_ID, e - 1);
    }
    this.Lie?.AddTagAddOrRemoveListener(NUM_IS_EMPTY_TAG_ID, (t, e) => {
      TimerSystem_1.TimerSystem.Delay(() => {
        this.B2_ = e;
      }, 100);
    });
    this.Lie?.AddTagAddOrRemoveListener(HACKING_TAG_ID, this.q2_);
    return true;
  }
  CanHack() {
    return this.D2_.length < this.U2_;
  }
  AddHackEntity(t) {
    this.D2_.push(t);
    this.Lie?.TagContainer.UpdateExactTag(1, NUM_TAG_ID, -1);
  }
  RemoveHackEntity(t) {
    t = this.D2_.indexOf(t);
    if (t !== -1) {
      this.D2_.splice(t, 1);
      this.Lie?.TagContainer.UpdateExactTag(1, NUM_TAG_ID, 1);
    }
  }
  GetRemainingHackNumber() {
    return Math.max(0, this.U2_ - this.D2_.length);
  }
};
HackManagementComponent = HackManagementComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(277)], HackManagementComponent);
exports.HackManagementComponent = HackManagementComponent; //# sourceMappingURL=HackManagementComponent.js.map