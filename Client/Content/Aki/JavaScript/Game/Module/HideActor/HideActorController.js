"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideActorController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
class HideActorController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.dti = false;
    this.Cti = false;
    this.jAn.clear();
    this.WAn.clear();
    this.Tdd = false;
    this.Rdd = false;
    this.wdd.clear();
    this.Ldd.clear();
    return true;
  }
  static OnTick(t) {
    if (this.Cti) {
      for (const i of this.jAn) {
        if (i.Valid) {
          this.fti(i, true);
        }
      }
    }
    if (this.Rdd) {
      for (const s of this.wdd) {
        if (s.Valid) {
          this.fti(s, true);
        }
      }
    }
  }
  static HideMesh() {
    if (!this.dti) {
      this.dti = true;
      this.pti(true, false);
    }
  }
  static HideEffect() {
    if (!this.Cti) {
      this.Cti = true;
      this.pti(false, true);
    }
  }
  static HideNpcMesh() {
    if (!this.Tdd) {
      this.Tdd = true;
      this.Pdd(true, false);
    }
  }
  static HideNpcEffect() {
    if (!this.Rdd) {
      this.Rdd = true;
      this.Pdd(false, true);
    }
  }
  static ShowMesh() {
    if (this.dti) {
      this.dti = false;
      this.vti(true, false);
    }
  }
  static ShowEffect() {
    if (this.Cti) {
      this.Cti = false;
      this.vti(false, true);
    }
  }
  static ShowNpcMesh() {
    if (this.Tdd) {
      this.Tdd = false;
      this.Ddd(true, false);
    }
  }
  static ShowNpcEffect() {
    if (this.Rdd) {
      this.Rdd = false;
      this.Ddd(false, true);
    }
  }
  static pti(t, i) {
    if (Global_1.Global.BaseCharacter) {
      for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        var s;
        var e;
        if (r.Valid && r.IsInit && r.Entity.Active && (e = (s = r.Entity.GetComponent(3))?.Actor) && e !== Global_1.Global.BaseCharacter && CampUtils_1.CampUtils.GetCampRelationship(e.Camp, Global_1.Global.BaseCharacter.Camp) !== 1 && (t && (e = s.DisableActor("[HideActorController] 隐藏Mesh"), this.WAn.set(r, e)), i)) {
          this.fti(r, true);
          this.jAn.add(r);
        }
      }
    }
  }
  static Pdd(t, i) {
    if (Global_1.Global.BaseCharacter) {
      for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        var s;
        var e;
        if (r.Valid && r.IsInit && r.Entity.Active && (e = (s = r.Entity.GetComponent(2))?.Actor) && e !== Global_1.Global.BaseCharacter && (e = r.Entity.GetComponent(0))?.Valid && e.IsNpc() && (t && (this.$0d(r, true), e = s.DisableActor("[HideNpcActorController] 隐藏NpcMesh"), this.Ldd.set(r, e)), i)) {
          this.fti(r, true);
          this.wdd.add(r);
        }
      }
    }
  }
  static vti(t, i) {
    if (t) {
      for (var [s, e] of this.WAn) {
        if (s.Valid) {
          s.Entity.GetComponent(3).EnableActor(e);
        }
      }
      this.WAn.clear();
    }
    if (i) {
      for (const r of this.jAn) {
        if (r.Valid) {
          this.fti(r, false);
        }
      }
      this.jAn.clear();
    }
  }
  static Ddd(t, i) {
    if (t) {
      for (var [s, e] of this.Ldd) {
        if (s.Valid) {
          s.Entity.GetComponent(2).EnableActor(e);
          this.$0d(s, false);
        }
      }
      this.Ldd.clear();
    }
    if (i) {
      for (const r of this.wdd) {
        if (r.Valid) {
          this.fti(r, false);
        }
      }
      this.wdd.clear();
    }
  }
  static fti(t, i) {
    t.Entity.GetComponent(40)?.CurrentSkill?.SetEffectHidden(i);
    t.Entity.GetComponent(21)?.SetHidden(i);
  }
  static $0d(t, i) {
    t.Entity.GetComponent(82)?.EnableHeadInfo(!i);
  }
  static OnClear() {
    this.dti = false;
    this.Cti = false;
    this.vti(true, true);
    this.Tdd = false;
    this.Rdd = false;
    this.Ddd(true, true);
    return true;
  }
}
(exports.HideActorController = HideActorController).dti = false;
HideActorController.Cti = false;
HideActorController.jAn = new Set();
HideActorController.WAn = new Map();
HideActorController.Tdd = false;
HideActorController.Rdd = false;
HideActorController.wdd = new Set();
HideActorController.Ldd = new Map(); //# sourceMappingURL=HideActorController.js.map