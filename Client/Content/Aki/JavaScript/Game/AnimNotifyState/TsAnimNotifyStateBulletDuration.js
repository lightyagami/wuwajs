"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyStateBulletDuration extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.BulletIds = undefined;
    this.LocationOffsets = undefined;
    this.RotatorOffsets = undefined;
    this.DestroyEffectImmediately = false;
    this.BulletEntityIdsMap = undefined;
    this.UeTransform = undefined;
    this.ArrayPreviewActor = undefined;
    this.PreviewActor = undefined;
  }
  Constructor() {
    this.BulletEntityIdsMap = undefined;
    this.ArrayPreviewActor = undefined;
    this.PreviewActor = undefined;
  }
  K2_NotifyBegin(s, e, t) {
    this.Initialize();
    const r = s.GetOwner();
    if (r instanceof TsBaseCharacter_1.default || r instanceof TsBaseVehicle_1.default) {
      var o = r.GetEntityNoBlueprint();
      if (o?.Valid) {
        var h = o.GetComponent(222)?.CreateAnimNotifyContent(e.GetName(), this.exportIndex);
        var e = o.GetComponent(42);
        var a = e ? e.GetCurrentMontageCorrespondingSkillId() : 0;
        var l = this.BulletIds.Num();
        var n = this.LocationOffsets.Num();
        var u = [];
        for (let i = 0; i < l; i++) {
          let e = undefined;
          if (n > i) {
            e = this.LocationOffsets.Get(i);
          }
          let t = undefined;
          if (n > i) {
            t = this.RotatorOffsets.Get(i);
          }
          u.push(BulletUtil_1.BulletUtil.CreateBulletFromAN(o, this.BulletIds.Get(i), this.UeTransform, a, false, h, undefined, e, t));
        }
        this.BulletEntityIdsMap.set(s, u);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Bullet", 57, "No Entity for TsBaseCharacter", ["Name", r.GetName()], ["location", r.D_K2_GetActorLocation()]);
      }
    }
    const c = this.BulletIds;
    const _ = c.Num();
    if (!(_ <= 0)) {
      if ((e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(r.GetWorld())) === 2 || e === 4) {
        ResourceSystem_1.ResourceSystem.LoadTypeAsync("BPL_BulletPreview_C", () => {
          var e = UE.KismetSystemLibrary.GetOuterObject(this);
          var t = UE.KismetSystemLibrary.GetPathName(e);
          this.ArrayPreviewActor = new Array(_);
          var i = (0, puerts_1.$ref)(this.PreviewActor);
          for (let e = 0; e < _; e++) {
            UE.BPL_BulletPreview_C.ShowBulletPreview(t, new UE.FName(c.Get(e)), r, s, r.GetWorld(), i);
            this.PreviewActor = (0, puerts_1.$unref)(i);
            this.ArrayPreviewActor[e] = this.PreviewActor;
            this.PreviewActor = undefined;
          }
        });
      }
    }
    return false;
  }
  K2_NotifyEnd(e, t) {
    var i = e.GetOwner();
    if (i instanceof TsBaseCharacter_1.default || i instanceof TsBaseVehicle_1.default) {
      if (i.GetEntityNoBlueprint()?.Valid) {
        (this.BulletEntityIdsMap.get(e) ?? []).forEach(e => {
          ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(e, false, 0, this.DestroyEffectImmediately);
        });
        this.BulletEntityIdsMap.delete(e);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "No Entity for TsBaseCharacter", ["Name", i.GetName()], ["location", i.D_K2_GetActorLocation()]);
      }
    }
    if (this.ArrayPreviewActor) {
      for (const s of this.ArrayPreviewActor) {
        s.K2_DestroyActor();
      }
      this.ArrayPreviewActor = undefined;
    }
    return false;
  }
  Initialize() {
    this.BulletEntityIdsMap ||= new Map();
    this.UeTransform ||= new UE.TransformDouble();
  }
  GetNotifyName() {
    return "创建子弹";
  }
}
exports.default = TsAnimNotifyStateBulletDuration;
//# sourceMappingURL=TsAnimNotifyStateBulletDuration.js.map