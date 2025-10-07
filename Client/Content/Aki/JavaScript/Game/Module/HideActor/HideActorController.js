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
    this.vdd = false;
    this.ydd = false;
    this.Sdd.clear();
    this.Mdd.clear();
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
    if (this.ydd) {
      for (const s of this.Sdd) {
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
    if (!this.vdd) {
      this.vdd = true;
      this.Edd(true, false);
    }
  }
  static HideNpcEffect() {
    if (!this.ydd) {
      this.ydd = true;
      this.Edd(false, true);
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
    if (this.vdd) {
      this.vdd = false;
      this.Idd(true, false);
    }
  }
  static ShowNpcEffect() {
    if (this.ydd) {
      this.ydd = false;
      this.Idd(false, true);
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
  static Edd(t, i) {
    if (Global_1.Global.BaseCharacter) {
      for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        var s;
        var e;
        if (r.Valid && r.IsInit && r.Entity.Active && (e = (s = r.Entity.GetComponent(2))?.Actor) && e !== Global_1.Global.BaseCharacter && (e = r.Entity.GetComponent(0))?.Valid && e.IsNpc() && (t && (this.Ffd(r, true), e = s.DisableActor("[HideNpcActorController] 隐藏NpcMesh"), this.Mdd.set(r, e)), i)) {
          this.fti(r, true);
          this.Sdd.add(r);
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
  static Idd(t, i) {
    if (t) {
      for (var [s, e] of this.Mdd) {
        if (s.Valid) {
          s.Entity.GetComponent(2).EnableActor(e);
          this.Ffd(s, false);
        }
      }
      this.Mdd.clear();
    }
    if (i) {
      for (const r of this.Sdd) {
        if (r.Valid) {
          this.fti(r, false);
        }
      }
      this.Sdd.clear();
    }
  }
  static fti(t, i) {
    t.Entity.GetComponent(40)?.CurrentSkill?.SetEffectHidden(i);
    t.Entity.GetComponent(21)?.SetHidden(i);
  }
  static Ffd(t, i) {
    t.Entity.GetComponent(82)?.EnableHeadInfo(!i);
  }
  static OnClear() {
    this.dti = false;
    this.Cti = false;
    this.vti(true, true);
    this.vdd = false;
    this.ydd = false;
    this.Idd(true, true);
    return true;
  }
}
(exports.HideActorController = HideActorController).dti = false;
HideActorController.Cti = false;
HideActorController.jAn = new Set();
HideActorController.WAn = new Map();
HideActorController.vdd = false;
HideActorController.ydd = false;
HideActorController.Sdd = new Set();
HideActorController.Mdd = new Map(); //# sourceMappingURL=HideActorController.js.map