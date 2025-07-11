"use strict";

var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var s = arguments.length;
  var h = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, n);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        h = (s < 3 ? o(h) : s > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (s > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelAnimationComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelAnimationComponent = class UiModelAnimationComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ywr = undefined;
    this.n$t = undefined;
    this.qwr = undefined;
    this.Gwr = undefined;
    this.Nwr = undefined;
    this.Owr = true;
    this.kwr = undefined;
    this.Fwr = () => {
      this.UpdateAnimInstance();
      if (this.Gwr) {
        this.PlayMontage(this.Gwr);
        this.Gwr = undefined;
      }
      if (this.Nwr) {
        this.PlayAnimation(this.Nwr, this.Owr);
        this.Nwr = undefined;
      }
      if (this.kwr) {
        this.SetAnimationMode(this.kwr);
        this.kwr = undefined;
      }
    };
  }
  OnInit() {
    this.n$t = this.Owner.CheckGetComponent(1);
    this.ywr = this.Owner.CheckGetComponent(0);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
  }
  Vwr() {
    var t = this.n$t?.MainMeshComponent;
    if (t?.GetLinkedAnimGraphInstanceByTag(FNameUtil_1.FNameUtil.NONE) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "检测出该Actor有空的动画LinkGraph节点,将会影响同步,GAS等功能,请找对应策划修复", ["Actor", this.n$t?.Actor?.GetName()], ["AnimInstance", t?.GetAnimInstance()?.GetName()]);
    }
  }
  UpdateAnimInstance() {
    var t = this.n$t?.MainMeshComponent;
    if (t) {
      this.Vwr();
      this.qwr = t.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE);
      this.qwr ||= t.GetAnimInstance();
    }
  }
  IsMontagePlaying() {
    return this.qwr?.IsAnyMontagePlaying() ?? false;
  }
  PlayMontage(t) {
    if (this.ywr?.GetModelLoadState() !== 2) {
      this.Gwr = t;
    } else {
      this.qwr.Montage_Play(t);
    }
  }
  StopMontage(t = 0) {
    if (this.ywr?.GetModelLoadState() !== 2) {
      this.Gwr = undefined;
    } else {
      this.qwr.Montage_Stop(t);
    }
  }
  GetCurrentSection() {
    return this.qwr?.Montage_GetCurrentSection();
  }
  IsAnimationPlaying() {
    return this.n$t?.MainMeshComponent?.IsPlaying() ?? false;
  }
  PlayAnimation(t, e = true) {
    if (this.ywr?.GetModelLoadState() !== 2) {
      this.Nwr = t;
      this.Owr = e;
    } else {
      this.n$t.MainMeshComponent.PlayAnimation(t, e);
    }
  }
  StopAnimation() {
    if (this.ywr?.GetModelLoadState() !== 2) {
      this.Nwr = undefined;
    } else {
      this.n$t.MainMeshComponent.Stop();
    }
  }
  SetAnimationMode(t) {
    if (this.ywr?.GetModelLoadState() !== 2) {
      this.kwr = t;
    } else {
      this.n$t.MainMeshComponent.SetAnimationMode(t);
    }
  }
};
UiModelAnimationComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(10)], UiModelAnimationComponent);
exports.UiModelAnimationComponent = UiModelAnimationComponent; //# sourceMappingURL=UiModelAnimationComponent.js.map