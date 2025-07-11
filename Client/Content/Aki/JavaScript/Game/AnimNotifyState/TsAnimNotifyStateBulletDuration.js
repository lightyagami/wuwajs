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
class TsAnimNotifyStateBulletDuration extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.BulletIds = undefined;
    this.LocationOffsets = undefined;
    this.RotatorOffsets = undefined;
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
  K2_NotifyBegin(s, t, e) {
    this.Initialize();
    const r = s.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var i = r.CharacterActorComponent?.Entity;
      if (i?.Valid) {
        var o = i.GetComponent(209)?.CreateAnimNotifyContent(t.GetName(), this.exportIndex);
        var t = i.GetComponent(40);
        var h = t ? t.GetCurrentMontageCorrespondingSkillId() : 0;
        var a = this.BulletIds.Num();
        var l = this.LocationOffsets.Num();
        var u = [];
        for (let i = 0; i < a; i++) {
          let t = undefined;
          if (l > i) {
            t = this.LocationOffsets.Get(i);
          }
          let e = undefined;
          if (l > i) {
            e = this.RotatorOffsets.Get(i);
          }
          u.push(BulletUtil_1.BulletUtil.CreateBulletFromAN(r, this.BulletIds.Get(i), this.UeTransform, h, false, o, undefined, t, e));
        }
        this.BulletEntityIdsMap.set(s, u);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Bullet", 57, "No Entity for TsBaseCharacter", ["Name", r.GetName()], ["location", r.D_K2_GetActorLocation()]);
      }
    }
    const n = this.BulletIds;
    const c = n.Num();
    if (!(c <= 0)) {
      if ((i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(r.GetWorld())) === 2 || i === 4) {
        ResourceSystem_1.ResourceSystem.LoadTypeAsync("BPL_BulletPreview_C", () => {
          var t = UE.KismetSystemLibrary.GetOuterObject(this);
          var e = UE.KismetSystemLibrary.GetPathName(t);
          this.ArrayPreviewActor = new Array(c);
          var i = (0, puerts_1.$ref)(this.PreviewActor);
          for (let t = 0; t < c; t++) {
            UE.BPL_BulletPreview_C.ShowBulletPreview(e, new UE.FName(n.Get(t)), r, s, r.GetWorld(), i);
            this.PreviewActor = (0, puerts_1.$unref)(i);
            this.ArrayPreviewActor[t] = this.PreviewActor;
            this.PreviewActor = undefined;
          }
        });
      }
    }
    return false;
  }
  K2_NotifyEnd(t, e) {
    var i = t.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      if (i.CharacterActorComponent?.Entity?.Valid) {
        (this.BulletEntityIdsMap.get(t) ?? []).forEach(t => {
          ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(t, false, 0);
        });
        this.BulletEntityIdsMap.delete(t);
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