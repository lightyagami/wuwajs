"use strict";

var SceneBulletComponent_1;
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
exports.SceneBulletComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const BulletController_1 = require("../Bullet/BulletController");
class BulletData {
  constructor(t, e) {
    this.BulletEntityId = undefined;
    this.BulletGroup = undefined;
    this.BulletTransform = undefined;
    this.BulletGroup = t;
    this.BulletTransform = e;
  }
}
let SceneBulletComponent = SceneBulletComponent_1 = class SceneBulletComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.M_n = false;
    this.Qcn = false;
    this.G2e = 0;
    this.Xcn = undefined;
    this.$cn = undefined;
    this.Ycn = undefined;
    this.vtn = undefined;
    this.Hte = undefined;
    this.JUn = undefined;
    this.V4l = false;
    this.Jcn = false;
    this.nye = () => {
      this.oZo(this.G2e);
    };
    this.zcn = (t, e) => {
      e = e.Entity;
      if (this.M_n && e && (e.GetComponent(61) || e.GetComponent(154))) {
        if (this.Qcn = t) {
          this.oZo(this.G2e);
        } else {
          for (const i of this.Ycn.keys()) {
            this.HVo(i);
          }
        }
      }
    };
    this.m1n = (t, e) => {
      this.G2e = t;
      if (this.M_n && e) {
        if (this.Qcn || this.Jcn) {
          this.oZo(this.G2e);
        }
        for (const i of this.Ycn.keys()) {
          if (i !== this.G2e) {
            this.HVo(i);
          }
        }
      }
    };
  }
  OnInitData(t) {
    this.$cn = Vector_1.Vector.Create(0, 0, 0);
    this.Xcn = Vector_1.Vector.Create(0, 0, 0);
    this.Ycn = new Map();
    t = t.GetParam(SceneBulletComponent_1)[0];
    for (const s of t.BulletGroups) {
      var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s.EntityState);
      if (!this.Ycn.has(e)) {
        this.Ycn.set(e, []);
      }
      this.Ycn.get(e).push(new BulletData(s, Transform_1.Transform.Create()));
    }
    var i = this.Entity.GetComponent(0)?.ComponentDataMap.get("Kys");
    this.JUn = MathUtils_1.MathUtils.LongToBigInt(i?.Kys?._Vn);
    this.V4l = t.DisableGenerateByRange ?? false;
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    return true;
  }
  OnStart() {
    var t = this.Entity.GetComponent(86);
    if (!this.V4l && t) {
      this.vtn = t;
      this.vtn.AddOnEntityOverlapCallback(this.zcn);
    } else {
      this.Jcn = true;
    }
    var e = this.Entity.GetComponent(196);
    for (const i of this.Ycn.keys()) {
      if (e.HasTag(i)) {
        this.G2e = i;
        break;
      }
    }
    return true;
  }
  OnActivate() {
    this.Hte = this.Entity.GetComponent(1);
    this.M_n = true;
    if (Global_1.Global.BaseCharacter?.CharacterActorComponent !== undefined && ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      if (this.Jcn) {
        this.oZo(this.G2e);
      }
    } else if (this.Jcn) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    return true;
  }
  oZo(t) {
    if (this.Ycn.has(t) && this.Ycn.get(t).length !== 0) {
      for (const n of this.Ycn.get(t)) {
        if (n.BulletEntityId) {
          return;
        }
        this.Zcn(n);
        var e = n.BulletGroup;
        var i = n.BulletTransform;
        let t = undefined;
        if (e.Range) {
          this.$cn.Set(e.Range.X, e.Range.Y, e.Range.Z);
          t = {
            Size: this.$cn
          };
        }
        var s = BulletController_1.BulletController.GetSceneBulletOwner();
        if (!s?.IsInit) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 17, "Bullet生成错误, 找不到场景子弹owner", ["EntityID", this.Entity.Id]);
          }
          return;
        }
        s = BulletController_1.BulletController.CreateBulletCustomTarget(s.Entity, e.BulletId.toString(), i.ToUeTransform(), t, this.JUn);
        if (s?.GetComponent(169)?.Owner?.IsValid()) {
          (i = BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(14)).IsParentActor = true;
          i.Actor = this.Hte.Owner;
          i.LocationRule = 1;
          i.RotationRule = 1;
          i.ScaleRule = 1;
          i.WeldSimulatedBodies = false;
          BulletController_1.BulletController.GetActionRunner().AddAction(s.GetBulletInfo(), i);
        }
        n.BulletEntityId = s?.Id;
        if (s) {
          if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
            EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 42, "Bullet生成错误", ["BulletID", e.BulletId], ["当前Bullet的EntityState", e.EntityState], ["EntityID", this.Entity.Id]);
        }
      }
    }
  }
  HVo(t) {
    if (this.Ycn.has(t) && this.Ycn.get(t).length !== 0) {
      for (const i of this.Ycn.get(t)) {
        if (!i.BulletEntityId) {
          return;
        }
        var e = EntitySystem_1.EntitySystem.Get(i.BulletEntityId);
        if (e?.Valid) {
          e.GetComponent(169).Owner?.K2_DetachFromActor(1, 1, 1);
        }
        BulletController_1.BulletController.DestroyBullet(i.BulletEntityId, false);
        i.BulletEntityId = undefined;
      }
    }
  }
  Zcn(t) {
    t.BulletTransform = Transform_1.Transform.Create();
    t.BulletTransform.FromUeTransform(this.Hte.ActorTransform);
    if (t.BulletGroup.Offset) {
      this.Xcn.Set(t.BulletGroup.Offset.X ?? 0, t.BulletGroup.Offset.Y ?? 0, t.BulletGroup.Offset.Z ?? 0);
      t.BulletTransform.TransformPositionNoScale(this.Xcn, this.Xcn);
      t.BulletTransform.SetLocation(this.Xcn);
    }
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    this.vtn?.RemoveOnEntityOverlapCallback(this.zcn);
    for (const t of this.Ycn.keys()) {
      this.HVo(t);
    }
    this.Ycn.clear();
    this.M_n = false;
    return !(this.Qcn = false);
  }
  OnClear() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    }
    return true;
  }
};
SceneBulletComponent = SceneBulletComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(142)], SceneBulletComponent);
exports.SceneBulletComponent = SceneBulletComponent; //# sourceMappingURL=SceneBulletComponent.js.map