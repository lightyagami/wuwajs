"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterCursorHandle = undefined;
const Stats_1 = require("../../../../Core/Common/Stats");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ObjectSystem_1 = require("../../../../Core/Object/ObjectSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CampUtils_1 = require("../../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
const MonsterCursorUnit_1 = require("../HudUnit/MonsterCursorUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class MonsterCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.Pri = [];
    this.xri = new Map();
    this.wri = new Set();
    this.Bri = new Map();
    this.bri = 0;
    this.qri = 0;
    this.Gri = undefined;
    this.CurrentEntity = undefined;
    this.dri = undefined;
    this.f7e = undefined;
    this.p7e = false;
    this.Nri = new Set();
    this.Ori = 0;
    this.kri = 0;
    this.Fri = 0;
    this.Vri = 0;
    this.Hri = 0;
    this.PVs = 0;
    this.gri = undefined;
    this.GUe = (t, s, e) => {
      if (this.jri(s.Entity)) {
        this.Wri(s.Entity);
        this.Kri();
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, s, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
    };
    this.zpe = (t, s) => {
      var e;
      if (this.jri(s.Entity) && (EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, s, EventDefine_1.EEventName.RemoveEntity, this.zpe), (e = this.HudEntitySet.GetByEntity(s.Entity)) && (this.Qri(e), this.Xri(s.Entity)), this.HudEntitySet.Num() <= 0)) {
        this.$ri();
      }
    };
    this.fHe = (t, s) => {
      this.CurrentEntity = t;
      this.dri = this.CurrentEntity.Entity.GetComponent(1);
      this.O7e(t);
    };
    this.Yri = (t, s) => {
      if (s) {
        this.wri.add(t);
      } else {
        this.wri.delete(t);
      }
    };
    this.v7e = (t, s) => {
      if (this.p7e = s) {
        this.Kri();
      } else {
        this.Jri();
        this.$ri();
      }
    };
    this.zri = () => {
      if (this.CurrentEntity?.Valid) {
        MonsterCursorHandle.Zri.Start();
        this.Nri.clear();
        if (this.HudEntitySet.Num() <= this.bri) {
          this.eni();
        } else if (!this.tni() && !this.ini()) {
          this.oni();
        }
        MonsterCursorHandle.Zri.Stop();
      }
    };
    this.wal = [];
  }
  OnInitialize() {
    var t;
    this.InitCursorAxis();
    this.bri = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorMaxCount");
    this.qri = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorRefreshInterval");
    this.Hri = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorMaxDistance");
    this.PVs = Math.pow(this.Hri, 2);
    this.Ori = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorMaxScale");
    this.kri = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorMinScale");
    this.Fri = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorMaxScaleDistance");
    this.Vri = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorMinScaleDistance");
    this.gri = CameraController_1.CameraController.FightCamera.GetComponent(5);
    this.CurrentEntity = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (this.CurrentEntity?.Valid) {
      this.dri = this.CurrentEntity.Entity.GetComponent(1);
      t = this.CurrentEntity.Entity.GetComponent(217);
      this.p7e = t.HasTag(1996802261);
      this.NewHudEntitySet();
      this.rni();
      this.nni();
      this.O7e(this.CurrentEntity);
      if (!this.Kri()) {
        this.$ri();
      }
    }
  }
  OnDestroyed() {
    this.CurrentEntity = undefined;
    this.dri = undefined;
    this.wri.clear();
    this.Bri.clear();
    this.N7e();
    this.$ri();
    this.sni();
  }
  OnShowHud() {
    super.OnShowHud();
    for (const t of this.Pri) {
      t.SetActive(false);
    }
  }
  OnHideHud() {
    super.OnHideHud();
  }
  OnTick(t) {
    if (this.IsHudVisible && this.p7e && ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid) {
      var s;
      var e;
      var r = this.j$e();
      for (const i of this.xri.values()) {
        if (i.IsValid() && (e = i.GetHudEntityData()).IsValid()) {
          s = e.GetLocation();
          s = this.GetInEllipsePosition(r, s)[0];
          e = e.GetDistanceSquaredTo(r);
          e = MathUtils_1.MathUtils.RangeClamp(e, this.Vri, this.Fri, this.Ori, this.kri);
          i.Refresh(e / CommonDefine_1.PERCENTAGE_FACTOR, s);
          if (!i.GetActive()) {
            i.SetActive(true);
          }
        }
      }
    }
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
  }
  rni() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t) {
      for (const s of t) {
        if (s.IsInit && this.jri(s.Entity)) {
          this.Wri(s.Entity);
        }
      }
    }
  }
  nni() {
    for (let t = 0; t < this.bri; t++) {
      this.ani();
    }
  }
  sni() {
    this.DestroyAllHudUnit();
    this.Pri.length = 0;
    this.xri.clear();
  }
  ani() {
    this.NewHudUnit(MonsterCursorUnit_1.MonsterCursorUnit, "UiItem_MonCursor_Prefab").then(t => {
      t.SetActive(false);
      this.Pri.push(t);
    }, () => {});
  }
  Wri(t) {
    var t = this.HudEntitySet.Add(t);
    t.SetComponent(0);
    t.SetComponent(1);
    t.SetComponent(217);
    t.ListenForTagCountChanged(-1371021686, this.Yri);
    var s = t.GetMonsterMatchType();
    let e = this.Bri.get(s);
    if (!e) {
      e = new Set();
      this.Bri.set(s, e);
    }
    e.add(t);
  }
  Xri(t) {
    var s;
    var e = this.HudEntitySet.GetByEntity(t);
    if (e && (s = e.GetMonsterMatchTypeNumber(), this.HudEntitySet.Remove(t), this.wri.delete(e), t = this.Bri.get(s))) {
      t.delete(e);
    }
  }
  O7e(t) {
    this.N7e();
    t = t.Entity.GetComponent(217);
    this.f7e = t.ListenForTagAddOrRemove(1996802261, this.v7e, MonsterCursorHandle.SYe);
  }
  N7e() {
    this.f7e?.EndTask();
  }
  Kri() {
    return !(this.HudEntitySet.Num() <= 0) && !!this.p7e && !(this.hni(), 0);
  }
  hni() {
    if (!TimerSystem_1.TimerSystem.Has(this.Gri)) {
      this.Gri = TimerSystem_1.TimerSystem.Forever(this.zri, this.qri);
    }
  }
  $ri() {
    if (TimerSystem_1.TimerSystem.Has(this.Gri)) {
      TimerSystem_1.TimerSystem.Remove(this.Gri);
      this.Gri = undefined;
    }
  }
  eni() {
    for (const t of this.HudEntitySet.GetAll()) {
      this.lni(t);
      if (this.Nri.size >= this.bri) {
        break;
      }
    }
    this._ni(this.Nri);
  }
  tni() {
    for (const t of this.wri) {
      this.lni(t);
      if (this.Nri.size >= this.bri) {
        this._ni(this.Nri);
        return true;
      }
    }
    return false;
  }
  ini() {
    for (let t = 2; t >= 1; t--) {
      var s = this.Bri.get(t);
      if (s && !(s.size <= 0)) {
        for (const e of s) {
          this.lni(e);
          if (this.Nri.size >= this.bri) {
            this._ni(this.Nri);
            return true;
          }
        }
      }
    }
    return false;
  }
  oni() {
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(this.PVs, 96, this.wal);
    for (const s of this.wal) {
      var t = this.HudEntitySet.GetByEntityId(s.Id);
      if (t && this.lni(t, false) && this.Nri.size >= this.bri) {
        break;
      }
    }
    this._ni(this.Nri);
  }
  lni(t, s = true) {
    return !!t.IsValid() && (!s || !(t.GetEntity().DistanceWithCamera > this.PVs)) && !!this.cni(t) && !this.mni(t.GetLocationProxy()) && !(this.Nri.add(t.GetId()), 0);
  }
  cni(t) {
    MonsterCursorHandle.dni.Start();
    if (!t.ContainsTagById(1996802261) || t.ContainsTagById(1963731483)) {
      MonsterCursorHandle.dni.Stop();
      return false;
    } else {
      MonsterCursorHandle.dni.Stop();
      return true;
    }
  }
  mni(t) {
    MonsterCursorHandle.Cni.Start();
    t = this.gri.CheckPositionInScreen(t, this.gri.CameraAdjustController.CheckInScreenMinX, this.gri.CameraAdjustController.CheckInScreenMaxX, this.gri.CameraAdjustController.CheckInScreenMinY, this.gri.CameraAdjustController.CheckInScreenMaxY);
    MonsterCursorHandle.Cni.Stop();
    return t;
  }
  _ni(t) {
    var s;
    var e;
    var r = [];
    for (const o of this.xri.values()) {
      var i = o.GetEntityId();
      if (!t.has(i)) {
        o.Deactivate();
        o.SetActive(false);
        r.push(i);
        this.Pri.push(o);
      }
    }
    for (const n of r) {
      this.xri.delete(n);
    }
    for (const h of t) {
      if (!this.gni(h)) {
        if (s = this.fni()) {
          e = this.HudEntitySet.GetByEntityId(h);
          this.pni(e, s);
        }
      }
    }
  }
  pni(t, s) {
    var e;
    if (s && (e = t.GetId(), s.GetEntityId() !== e)) {
      s.Activate(t);
      this.xri.set(e, s);
    }
  }
  Qri(t) {
    var s;
    if (t?.IsValid() && (t = t.GetId(), s = this.gni(t)) && s.IsValid()) {
      s.Deactivate();
      s.SetActive(false);
      this.xri.delete(t);
      this.Pri.push(s);
    }
  }
  Jri() {
    for (const t of this.xri.values()) {
      if (t.IsValid()) {
        t.Deactivate();
        t.SetActive(false);
        this.Pri.push(t);
      }
    }
    this.xri.clear();
  }
  gni(t) {
    return this.xri.get(t);
  }
  fni() {
    return this.Pri.pop();
  }
  j$e() {
    return this.dri.ActorLocationProxy;
  }
  jri(t) {
    var s;
    return !!ObjectSystem_1.ObjectSystem.IsValid(t) && !!(t = t.GetComponent(0)) && t.GetBaseInfo()?.Category?.MainType === "Monster" && (s = t.GetEntityCamp(), CampUtils_1.CampUtils.GetCampRelationship(s, 0) === 2) && (s = t.GetMonsterMatchType()) !== undefined && s !== 3;
  }
}
(exports.MonsterCursorHandle = MonsterCursorHandle).Zri = Stats_1.Stat.Create("[MonsterCursor]RefreshMonsterCursor");
MonsterCursorHandle.Cni = Stats_1.Stat.Create("[MonsterCursor]IsInScreen");
MonsterCursorHandle.dni = Stats_1.Stat.Create("[MonsterCursor]CheckMonsterCursorTagStatObject");
MonsterCursorHandle.GetTargetInfo2StatObject = Stats_1.Stat.Create("[MonsterCursor]GetTargetInfo2StatObject");
MonsterCursorHandle.SYe = Stats_1.Stat.Create("[MonsterCursor]ListenTag"); //# sourceMappingURL=MonsterCursorHandle.js.map