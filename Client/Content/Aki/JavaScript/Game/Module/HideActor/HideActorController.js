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
    return true;
  }
  static OnTick(t) {
    if (this.Cti) {
      for (const e of this.jAn) {
        if (e.Valid) {
          this.fti(e, true);
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
  static pti(t, e) {
    if (Global_1.Global.BaseCharacter) {
      for (const s of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        var i;
        var r;
        if (s.Valid && s.IsInit && s.Entity.Active && (r = (i = s.Entity.GetComponent(3))?.Actor) && r !== Global_1.Global.BaseCharacter && CampUtils_1.CampUtils.GetCampRelationship(r.Camp, Global_1.Global.BaseCharacter.Camp) !== 1 && (t && (r = i.DisableActor("[HideActorController] 隐藏Mesh"), this.WAn.set(s, r)), e)) {
          this.fti(s, true);
          this.jAn.add(s);
        }
      }
    }
  }
  static vti(t, e) {
    if (t) {
      for (var [i, r] of this.WAn) {
        if (i.Valid) {
          i.Entity.GetComponent(3).EnableActor(r);
        }
      }
      this.WAn.clear();
    }
    if (e) {
      for (const s of this.jAn) {
        if (s.Valid) {
          this.fti(s, false);
        }
      }
      this.jAn.clear();
    }
  }
  static fti(t, e) {
    t.Entity.GetComponent(40)?.CurrentSkill?.SetEffectHidden(e);
    t.Entity.GetComponent(21)?.SetHidden(e);
  }
  static OnClear() {
    this.dti = false;
    this.Cti = false;
    this.vti(true, true);
    return true;
  }
}
(exports.HideActorController = HideActorController).dti = false;
HideActorController.Cti = false;
HideActorController.jAn = new Set();
HideActorController.WAn = new Map(); //# sourceMappingURL=HideActorController.js.map