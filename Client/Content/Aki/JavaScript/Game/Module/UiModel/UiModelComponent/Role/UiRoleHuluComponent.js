"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var n;
  var h = arguments.length;
  var o = h < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, s);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (n = e[r]) {
        o = (h < 3 ? n(o) : h > 3 ? n(t, i, o) : n(t, i)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleHuluComponent = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines");
const SkeletalObserverManager_1 = require("../../../SkeletalObserver/SkeletalObserverManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const HULU_BASE_ID = 20000000;
const HULU_PARTY_ID = 100000;
let UiRoleHuluComponent = class UiRoleHuluComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ywr = undefined;
    this.mBr = undefined;
    this.n$t = undefined;
    this.Jwr = undefined;
    this.dBr = undefined;
    this.g1t = CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME;
    this._ii = 0;
    this.D4a = undefined;
    this.Twr = e => {
      if (!e && this._ii === 2) {
        this.SetActive(false);
      }
      this.D4a = e;
    };
    this.Ktc = () => {
      this.Refresh();
    };
    this.Dwr = e => {
      this.dBr?.Model?.CheckGetComponent(0)?.SetDitherEffect(e);
    };
    this.OnRoleMeshLoadComplete = () => {
      this.gBr();
    };
    this.OnAnsBegin = e => {
      var t = this.D4a ?? true;
      this.SetActive(t);
      this.D4a = undefined;
      if (e.IsRotate) {
        this.StartHuluRotate();
      }
      var t = e.Socket;
      if (t) {
        this.AttachHuluToRole(t);
      }
    };
    this.OnAnsEnd = e => {
      this.dBr?.Model?.CheckGetComponent(9)?.StopRotate();
      this.SetActive(false);
    };
  }
  OnInit() {
    this.mBr = this.Owner.CheckGetComponent(13);
    this.ywr = this.Owner.CheckGetComponent(0);
    this.n$t = this.Owner.CheckGetComponent(1);
    this.Jwr = this.Owner.CheckGetComponent(6);
    this.dBr = SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(5);
    this.SetActive(false);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.Ktc);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, this.Twr);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetDitherEffect, this.Dwr);
    this.Jwr?.RegisterAnsTrigger("UiCalabashAnsContext", this.OnAnsBegin, this.OnAnsEnd);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.Ktc);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, this.Twr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetDitherEffect, this.Dwr);
    SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(this.dBr);
  }
  GetHuluHandle() {
    return this.dBr;
  }
  Refresh() {
    var e = this.mBr.RoleConfigId;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).PartyId * HULU_PARTY_ID + HULU_BASE_ID + 1;
    var t = this.dBr.Model;
    if (e !== t.CheckGetComponent(0)?.ModelConfigId) {
      t.CheckGetComponent(2)?.LoadModelByModelId(e);
    }
  }
  SetActive(e) {
    if ((!e || this._ii !== 2) && (!!e || this._ii !== 1)) {
      this.dBr?.Model?.CheckGetComponent(0)?.SetVisible(e);
      this._ii = e ? 2 : 1;
    }
  }
  StartHuluRotate() {
    var e;
    var t;
    if (this.dBr) {
      e = CommonParamById_1.configCommonParamById.GetIntConfig("hulu_rotate_time");
      (t = this.dBr?.Model?.CheckGetComponent(9))?.SetRotateParam(e, 2, false);
      t?.StartRotate();
    }
  }
  AttachHuluToRole(e = CharacterNameDefines_1.CharacterNameDefines.HULU_CASE) {
    this.g1t = e;
    this.gBr();
  }
  gBr() {
    var e;
    var t;
    if (this.ywr.GetModelLoadState() === 2) {
      e = this.n$t.MainMeshComponent;
      (t = this.dBr?.Model?.CheckGetComponent(1))?.Actor?.K2_AttachToComponent(e, this.g1t, 0, 0, 0, false);
      t?.Actor?.D_K2_SetActorRelativeTransform(MathUtils_1.MathUtils.DefaultTransformDouble, false, undefined, false);
    }
  }
};
UiRoleHuluComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(18)], UiRoleHuluComponent);
exports.UiRoleHuluComponent = UiRoleHuluComponent; //# sourceMappingURL=UiRoleHuluComponent.js.map