"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var s;
  var n = arguments.length;
  var r = n < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (n < 3 ? s(r) : n > 3 ? s(t, i, r) : s(t, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiMotorRoleComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelResourcesManager_1 = require("../../../UiComponent/UiModelResourcesManager");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const UiModelComponentInterface_1 = require("../UiModelComponentInterface");
let UiMotorRoleComponent = class UiMotorRoleComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.Jxg = undefined;
    this.mBr = undefined;
    this.ywr = undefined;
    this.g1t = new UE.FName("SeatProp01");
    this.olg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    this._ii = 0;
    this.eBg = () => {
      this.Refresh();
    };
    this.OnMotorMeshLoadComplete = () => {
      this.tBg();
      this.SetActive(this.ywr.GetModelLoadState() === 2);
    };
  }
  OnInit() {
    this.Jxg = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(21);
    this.mBr = this.Jxg.Model.CheckGetComponent(13);
    this.ywr = this.Jxg.Model.CheckGetComponent(0);
    this.SetActive(false);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnMotorMeshLoadComplete);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.eBg);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnMotorMeshLoadComplete);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.eBg);
    this.iBg();
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.Jxg);
  }
  OnModelVisibleChange(e) {
    if (this.ywr.GetModelLoadState() !== 2) {
      this.SetActive(false);
    } else {
      this.SetActive(e);
    }
  }
  Refresh() {
    var e = this.Jxg.Model;
    const i = this.Owner.CheckGetComponent(32);
    if (i.GetAnimPath() !== "") {
      const s = e.CheckGetComponent(14);
      this.iBg();
      this.ADg(i.GetAnimPath(), o => {
        var e = i.GetRoleId();
        var t = i.GetRoleSkinId();
        if (e !== this.mBr.RoleConfigId || t !== this.mBr.RoleSkinId) {
          this.SetActive(false);
          s?.LoadModelByRoleConfigId(e, t, true, () => {
            const e = this.Owner.CheckGetComponent(0);
            var t = this.Jxg?.Model?.CheckGetComponent(1);
            if (t?.Actor) {
              const e = this.Jxg?.Model?.CheckGetComponent(0);
              var i = ModelUtil_1.ModelUtil.GetModelConfig(e.ModelConfigId);
              t.Actor.D_K2_SetActorRelativeLocation(i.骑摩托位置偏移, false, undefined, false);
            }
            t = e?.GetModelLoadState() === 2;
            this.SetActive(t);
            this.Jxg?.Model?.CheckGetComponent(10)?.PlayAnimation(o, true);
          });
        }
      });
    }
  }
  SetActive(e) {
    if ((!e || this._ii !== 2) && (!!e || this._ii !== 1)) {
      this.Jxg?.Model?.CheckGetComponent(0)?.SetVisible(e);
      this._ii = e ? 2 : 1;
    }
  }
  tBg() {
    var e;
    var t = this.Owner.CheckGetComponent(1);
    if (this.Owner.CheckGetComponent(0).GetModelLoadState() === 2 && (t = t.MainMeshComponent, (e = this.Jxg?.Model?.CheckGetComponent(1))?.Actor?.K2_AttachToComponent(t, this.g1t, 2, 2, 1, false), e?.Actor)) {
      t = new UE.Rotator(0, -90, 0);
      e.Actor.K2_AddActorWorldRotation(t, false, undefined, false);
      t = this.Jxg?.Model?.CheckGetComponent(0);
      t = ModelUtil_1.ModelUtil.GetModelConfig(t.ModelConfigId);
      e.Actor.D_K2_SetActorRelativeLocation(t.骑摩托位置偏移, false, undefined, false);
    }
  }
  ADg(t, i) {
    this.olg = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimationAsset, e => {
      if (e) {
        i(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiModel", 58, "UiMotorRoleComponent LoadAnimByAnimPath animAsset is undefined", ["standAnim", t]);
      }
    }, 100, "Ui.UiSceneModel");
  }
  iBg() {
    if (this.olg !== UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.olg);
      this.olg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    }
  }
};
UiMotorRoleComponent = __decorate([(0, UiModelComponentInterface_1.RegisterUiModelComponentImplements)(0), (0, UiModelComponentDefine_1.RegisterUiModelComponent)(34)], UiMotorRoleComponent);
exports.UiMotorRoleComponent = UiMotorRoleComponent; //# sourceMappingURL=UiMotorRoleComponent.js.map