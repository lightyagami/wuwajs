"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var n;
  var o = arguments.length;
  var h = o < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (n = e[r]) {
        h = (o < 3 ? n(h) : o > 3 ? n(t, i, h) : n(t, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleHuluComponent = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines");
const SkeletalObserverManager_1 = require("../../../SkeletalObserver/SkeletalObserverManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const UiModelComponentInterface_1 = require("../UiModelComponentInterface");
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
    this.Ktc = () => {
      this.Refresh();
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
    this.Jwr?.RegisterAnsTrigger("UiCalabashAnsContext", this.OnAnsBegin, this.OnAnsEnd);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.Ktc);
    SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(this.dBr);
  }
  GetHuluHandle() {
    return this.dBr;
  }
  OnModelVisibleChange(e) {
    if (!e && this._ii === 2) {
      this.SetActive(false);
    }
    this.D4a = e;
  }
  OnModelDitherEffectChange(e) {
    this.dBr?.Model?.CheckGetComponent(0)?.SetDitherEffect(e);
  }
  Refresh() {
    var e = this.dBr.Model;
    var t = e.CheckGetComponent(31);
    t?.RefreshCurrentSkinData(this.mBr.RoleConfigId);
    var t = t.ModelId;
    if (t !== e.CheckGetComponent(0)?.ModelConfigId) {
      e.CheckGetComponent(2)?.LoadModelByModelId(t);
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
UiRoleHuluComponent = __decorate([(0, UiModelComponentInterface_1.RegisterUiModelComponentImplements)(0, 1), (0, UiModelComponentDefine_1.RegisterUiModelComponent)(18)], UiRoleHuluComponent);
exports.UiRoleHuluComponent = UiRoleHuluComponent; //# sourceMappingURL=UiRoleHuluComponent.js.map