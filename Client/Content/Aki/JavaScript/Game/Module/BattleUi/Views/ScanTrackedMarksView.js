"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScanTrackedMarksView = undefined;
const UE = require("ue");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const ScanTrackedMarks_1 = require("./ScanTrackedMarks");
class ScanTrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.wmt = new Map();
    this.Bmt = new Set();
    this.bmt = (s, e) => {
      if (e && !(e.ScanInfos.length <= 0)) {
        const r = EntitySystem_1.EntitySystem.Get(s);
        if (r) {
          this.Bmt.add(s);
          const n = r.GetComponent(1)?.Owner;
          const a = e.ScanCompositeConfig.ShowDistance;
          const o = e.ScanCompositeConfig.ClampToEllipse;
          for (const _ of e.ScanInfos) {
            const c = _.Color;
            if (_.IconPath.length !== 0) {
              ResourceSystem_1.ResourceSystem.LoadAsync(_.IconPath, UE.LGUISpriteData_BaseObject, e => {
                var t;
                var i;
                if (e && e.IsValid() && n && this.Bmt.has(s)) {
                  t = Vector_1.Vector.Create(_.Offset);
                  i = r.GetComponent(1);
                  GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(i, t);
                  this.qmt(s, e, 0, "", undefined, n, Vector_1.Vector.Create(t), c, a, o);
                }
              });
              break;
            }
          }
        }
      }
    };
    this.Gmt = e => {
      if (this.Bmt.has(e)) {
        this.Bmt.delete(e);
      }
      var t = this.wmt.get(e);
      if (t) {
        t.ToClose();
        this.wmt.delete(e);
      }
    };
  }
  Initialize(e) {
    super.Initialize(e);
    this.yWe();
  }
  Reset() {
    super.Reset();
    this.Nmt();
    this.wmt.clear();
  }
  Update() {
    for (var [, e] of this.wmt) {
      e.Update();
    }
  }
  qmt(e, t, i, s, r, n, a, o, _, c) {
    if (!this.wmt.has(e)) {
      t = new ScanTrackedMarks_1.ScanTrackedMarks(this.RootItem, t, i, s, r, n, a, o, _, c);
      this.wmt.set(e, t);
    }
  }
  yWe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScanTrackedStart, this.bmt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScanTrackedEnd, this.Gmt);
  }
  Nmt() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScanTrackedStart, this.bmt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScanTrackedEnd, this.Gmt);
  }
  DestroyOverride() {
    return true;
  }
}
exports.ScanTrackedMarksView = ScanTrackedMarksView;
//# sourceMappingURL=ScanTrackedMarksView.js.map