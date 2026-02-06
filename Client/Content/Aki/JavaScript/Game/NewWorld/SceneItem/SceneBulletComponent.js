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
    this.YQf = undefined;
    this.JUn = undefined;
    this.V4l = false;
    this.Jcn = false;
    this.nye = () => {
      this.zQf(this.G2e);
    };
    this.zcn = (t, e) => {
      e = e.Entity;
      if (this.M_n && e && (e.GetComponent(66) || e.GetComponent(165))) {
        if (this.Qcn = t) {
          this.zQf(this.G2e);
        } else {
          for (const i of this.Ycn.keys()) {
            this.JQf(i);
          }
        }
      }
    };
    this.m1n = (t, e) => {
      this.G2e = t;
      if (this.M_n && e) {
        if (this.Qcn || this.Jcn) {
          this.zQf(this.G2e);
        }
        for (const i of this.Ycn.keys()) {
          if (i !== this.G2e) {
            this.JQf(i);
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
    this.YQf = this.Entity.GetComponent(340);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    return true;
  }
  OnStart() {
    var t = this.Entity.GetComponent(91);
    if (!this.V4l && t) {
      this.vtn = t;
      this.vtn.AddOnEntityOverlapCallback(this.zcn);
    } else {
      this.Jcn = true;
    }
    var e = this.Entity.GetComponent(208);
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
        this.zQf(this.G2e);
      }
    } else if (this.Jcn) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    return true;
  }
  OnTick(t) {
    this.ZQf();
  }
  ZQf() {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && this.Ycn && this.YQf) {
      var t = this.YQf.GetVehicleTeamMember();
      if (t) {
        var e = this.Ycn.get(this.G2e);
        if (e && e.length) {
          for (const n of e) {
            var i;
            var s = n.BulletGroup?.CustomBulletLogic;
            if (s && s.Type === "TrafficBullet") {
              s = t.GetSpeed() >= s.MinSpeed;
              i = this.YQf.IsInPerceptionRange();
              if (s && i) {
                if (!n.BulletEntityId) {
                  this.oZo(n);
                }
              } else {
                this.HVo(n);
              }
            }
          }
        }
      }
    }
  }
  zQf(t) {
    if (this.Ycn) {
      t = this.Ycn.get(t);
      if (t && t.length) {
        for (const i of t) {
          if (!i.BulletEntityId) {
            if (i.BulletGroup?.CustomBulletLogic?.Type === "TrafficBullet") {
              if (!this.YQf) {
                continue;
              }
              var e = this.YQf.GetVehicleTeamMember();
              if (!e) {
                continue;
              }
              if (e.GetSpeed() < i.BulletGroup.CustomBulletLogic.MinSpeed) {
                continue;
              }
            }
            if (this.oZo(i) && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
              EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
            }
          }
        }
      }
    }
  }
  oZo(t) {
    if (t.BulletEntityId) {
      return false;
    }
    this.Zcn(t);
    var e = t.BulletGroup;
    var i = t.BulletTransform;
    let s = undefined;
    if (e.Range) {
      this.$cn.Set(e.Range.X, e.Range.Y, e.Range.Z);
      s = {
        Size: this.$cn
      };
    }
    var n = BulletController_1.BulletController.GetSceneBulletOwner();
    if (n?.IsInit) {
      if ((n = BulletController_1.BulletController.CreateBulletCustomTarget(n.Entity, e.BulletId.toString(), i.ToUeTransform(), s, this.JUn))?.GetComponent(180)?.Owner?.IsValid()) {
        (i = BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(14)).IsParentActor = true;
        i.Actor = this.Hte.Owner;
        i.LocationRule = 1;
        i.RotationRule = 1;
        i.ScaleRule = 1;
        i.WeldSimulatedBodies = false;
        BulletController_1.BulletController.GetActionRunner().AddAction(n.GetBulletInfo(), i);
      }
      t.BulletEntityId = n?.Id;
      if (!n) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 42, "Bullet生成错误", ["BulletID", e.BulletId], ["当前Bullet的EntityState", e.EntityState], ["EntityID", this.Entity.Id]);
        }
      }
      return n?.Valid;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 17, "Bullet生成错误, 找不到场景子弹owner", ["EntityID", this.Entity.Id]);
      }
      return false;
    }
  }
  JQf(t) {
    if (this.Ycn.has(t) && this.Ycn.get(t).length !== 0) {
      for (const e of this.Ycn.get(t)) {
        this.HVo(e);
      }
    }
  }
  HVo(t) {
    var e;
    return !!t.BulletEntityId && !((e = EntitySystem_1.EntitySystem.Get(t.BulletEntityId))?.Valid && e.GetComponent(180).Owner?.K2_DetachFromActor(1, 1, 1), BulletController_1.BulletController.DestroyBullet(t.BulletEntityId, false), t.BulletEntityId = undefined);
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
      this.JQf(t);
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
SceneBulletComponent = SceneBulletComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(153)], SceneBulletComponent);
exports.SceneBulletComponent = SceneBulletComponent; //# sourceMappingURL=SceneBulletComponent.js.map