"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideActorController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const CHARACTER = 224;
const NPC = 56;
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
    this.SNg = false;
    this.MNg = false;
    this.PauseTick();
    return true;
  }
  static OnTick(t) {
    var r;
    if (this.dti || this.Cti || this.Tdd || this.Rdd) {
      if (this.SNg || this.MNg) {
        this.pti(this.dti, this.Cti, true);
        this.Pdd(this.dti, this.Cti, true);
      } else if (HideActorController.ENg > 0 && Global_1.Global.BaseCharacter?.IsValid() && HideActorController.INg !== FNameUtil_1.FNameUtil.NONE && Global_1.Global.BaseCharacter.Mesh?.DoesSocketExist(HideActorController.INg)) {
        (r = HideActorController.Lz).FromUeVector(Global_1.Global.BaseCharacter.Mesh.D_GetSocketLocation(HideActorController.INg));
        if (!HideActorController.TNg.Equals(r, MathUtils_1.MathUtils.KindaSmallNumber)) {
          this.pti(this.dti, this.Cti, true);
          this.Pdd(this.dti, this.Cti, true);
        }
      }
    }
    if (Macro_1.NOT_SHIPPING_ENVIRONMENT && this.jFr) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, HideActorController.TNg.ToUeVector(), HideActorController.ENg, 12, ColorUtils_1.ColorUtils.LinearGreen, 0, 1);
    }
  }
  static HideMesh() {
    if (!this.dti) {
      this.dti = true;
      this.pti(true, false);
      this.ResumeTick();
    }
  }
  static HideEffect() {
    if (!this.Cti) {
      this.Cti = true;
      this.pti(false, true);
      this.ResumeTick();
    }
  }
  static HideNpcMesh() {
    if (!this.Tdd) {
      this.Tdd = true;
      this.Pdd(true, false);
      this.ResumeTick();
    }
  }
  static HideNpcEffect() {
    if (!this.Rdd) {
      this.Rdd = true;
      this.Pdd(false, true);
      this.ResumeTick();
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
  static SetHideParameter(t, r) {
    if (this.ENg !== t || !this.INg.op_Equality(r)) {
      this.ENg = t;
      this.INg = r;
      this.SNg = true;
      this.MNg = true;
      this.ResumeTick();
    }
  }
  static ResetHideParameter() {
    this.ENg = 0;
    this.INg = FNameUtil_1.FNameUtil.NONE;
    this.SNg = false;
    this.MNg = false;
    this.PauseTick();
  }
  static pti(t, r, o = false) {
    if (Global_1.Global.BaseCharacter) {
      var e;
      var i;
      var l = HideActorController.bNg(o);
      if (this.WAn.size > 0) {
        for (var [s, h] of this.WAn) {
          if (!l.has(s)) {
            this.WAn.delete(s);
            if (s.Valid) {
              s.Entity.GetComponent(3).EnableActor(h);
            }
          }
        }
      }
      if (this.jAn.size > 0) {
        for (const a of this.jAn) {
          if (!l.has(a)) {
            this.jAn.delete(a);
            if (a.Valid) {
              this.fti(a, false);
            }
          }
        }
      }
      for (const c of l) {
        if (c.Valid && c.IsInit && c.Entity.Active && (i = (e = c.Entity.GetComponent(3))?.Actor) && i !== Global_1.Global.BaseCharacter && CampUtils_1.CampUtils.GetCampRelationship(i.Camp, Global_1.Global.BaseCharacter.Camp) !== 1 && (!this.WAn.has(c) && t && (i = e.DisableActor("[HideActorController] 隐藏Mesh"), this.WAn.set(c, i)), !this.jAn.has(c)) && r) {
          this.fti(c, true);
          this.jAn.add(c);
        }
      }
    }
  }
  static Pdd(t, r, o = false) {
    if (Global_1.Global.BaseCharacter) {
      var e;
      var i;
      var l = HideActorController.RNg(o);
      if (this.Ldd.size > 0) {
        for (var [s, h] of this.Ldd) {
          if (!l.has(s)) {
            this.Ldd.delete(s);
            if (s.Valid) {
              s.Entity.GetComponent(2).EnableActor(h);
              this.$0d(s, false);
            }
          }
        }
      }
      if (this.wdd.size > 0) {
        for (const a of this.wdd) {
          if (!l.has(a)) {
            this.wdd.delete(a);
            if (a.Valid) {
              this.fti(a, false);
            }
          }
        }
      }
      for (const c of l) {
        if (c.Valid && c.IsInit && c.Entity.Active && (i = (e = c.Entity.GetComponent(2))?.Actor) && i !== Global_1.Global.BaseCharacter && (i = c.Entity.GetComponent(0))?.Valid && i.IsNpc() && (!this.Ldd.has(c) && t && (this.$0d(c, true), i = e.DisableActor("[HideNpcActorController] 隐藏NpcMesh"), this.Ldd.set(c, i)), !this.wdd.has(c)) && r) {
          this.fti(c, true);
          this.wdd.add(c);
        }
      }
    }
  }
  static vti(t, r) {
    if (t) {
      for (var [o, e] of this.WAn) {
        if (o.Valid) {
          o.Entity.GetComponent(3).EnableActor(e);
        }
      }
      this.WAn.clear();
    }
    if (r) {
      for (const i of this.jAn) {
        if (i.Valid) {
          this.fti(i, false);
        }
      }
      this.jAn.clear();
    }
  }
  static Ddd(t, r) {
    if (t) {
      for (var [o, e] of this.Ldd) {
        if (o.Valid) {
          o.Entity.GetComponent(2).EnableActor(e);
          this.$0d(o, false);
        }
      }
      this.Ldd.clear();
    }
    if (r) {
      for (const i of this.wdd) {
        if (i.Valid) {
          this.fti(i, false);
        }
      }
      this.wdd.clear();
    }
  }
  static bNg(t) {
    var r;
    if (HideActorController.LNg !== Time_1.Time.Frame || this.SNg || t) {
      HideActorController.LNg = Time_1.Time.Frame;
      this.SNg = false;
      HideActorController.wNg.clear();
      t = Global_1.Global.BaseCharacter;
      if (HideActorController.ENg > 0 && t?.IsValid() && HideActorController.INg !== FNameUtil_1.FNameUtil.NONE && t.Mesh?.DoesSocketExist(HideActorController.INg)) {
        (r = HideActorController.TNg).FromUeVector(t.Mesh.D_GetSocketLocation(HideActorController.INg));
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(r, HideActorController.ENg, CHARACTER, HideActorController.wNg);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 57, "[HideActorController][Actor]隐藏全部角色", ["baseCharacter", t?.IsValid()], ["HideDistance", HideActorController.ENg], ["HideBasisBoneName", HideActorController.INg], ["SocketExist", t?.Mesh?.DoesSocketExist(HideActorController.INg)]);
        }
        ModelManager_1.ModelManager.CreatureModel.GetAllEntities().forEach(t => {
          HideActorController.wNg.add(t);
        });
      }
    }
    return HideActorController.wNg;
  }
  static RNg(t) {
    var r;
    if (HideActorController.PNg !== Time_1.Time.Frame || this.MNg || t) {
      HideActorController.PNg = Time_1.Time.Frame;
      this.MNg = false;
      HideActorController.ANg.clear();
      t = Global_1.Global.BaseCharacter;
      if (HideActorController.ENg > 0 && t?.IsValid() && HideActorController.INg !== FNameUtil_1.FNameUtil.NONE && t.Mesh?.DoesSocketExist(HideActorController.INg)) {
        (r = HideActorController.TNg).FromUeVector(t.Mesh.D_GetSocketLocation(HideActorController.INg));
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(r, HideActorController.ENg, NPC, HideActorController.ANg);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 57, "[HideActorController][Npc]隐藏全部角色", ["baseCharacter", t?.IsValid()], ["HideDistance", HideActorController.ENg], ["HideBasisBoneName", HideActorController.INg], ["SocketExist", t?.Mesh?.DoesSocketExist(HideActorController.INg)]);
        }
        ModelManager_1.ModelManager.CreatureModel.GetAllEntities().forEach(t => {
          HideActorController.ANg.add(t);
        });
      }
    }
    return HideActorController.ANg;
  }
  static fti(t, r) {
    t.Entity.GetComponent(43)?.CurrentSkill?.SetEffectHidden(r);
    t.Entity.GetComponent(21)?.SetHidden(r);
  }
  static $0d(t, r) {
    t.Entity.GetComponent(87)?.EnableHeadInfo(!r);
  }
  static OnClear() {
    this.dti = false;
    this.Cti = false;
    this.vti(true, true);
    this.Tdd = false;
    this.Rdd = false;
    this.Ddd(true, true);
    this.ResetHideParameter();
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
HideActorController.Ldd = new Map();
HideActorController.ENg = 0;
HideActorController.INg = FNameUtil_1.FNameUtil.NONE;
HideActorController.LNg = 0;
HideActorController.PNg = 0;
HideActorController.SNg = false;
HideActorController.MNg = false;
HideActorController.wNg = new Set();
HideActorController.ANg = new Set();
HideActorController.TNg = Vector_1.Vector.Create();
HideActorController.Lz = Vector_1.Vector.Create();
HideActorController.jFr = false; //# sourceMappingURL=HideActorController.js.map