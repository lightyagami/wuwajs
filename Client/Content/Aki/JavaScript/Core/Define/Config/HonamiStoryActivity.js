"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class HonamiStoryActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get LimitTime() {
    return this.limittime();
  }
  get LimitShopItemId() {
    return this.limitshopitemid();
  }
  get LimitShopItemMax() {
    return this.limitshopitemmax();
  }
  get ScoreItemId() {
    return this.scoreitemid();
  }
  get OutCoinItemId() {
    return this.outcoinitemid();
  }
  get InnerItemId() {
    return this.inneritemid();
  }
  get FailLeaveCoinRatio() {
    return this.failleavecoinratio();
  }
  get MainLineInstId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mainlineinstidLength(), this.mainlineinstid, this);
  }
  get MainLineInstIdUnlock() {
    return GameUtils_1.GameUtils.ConvertToMap(this.mainlineinstidunlockLength(), this.mainlineinstidunlockKey, this.mainlineinstidunlockValue, this);
  }
  mainlineinstidunlockKey(t) {
    return this.mainlineinstidunlock(t)?.key();
  }
  mainlineinstidunlockValue(t) {
    return this.mainlineinstidunlock(t)?.value();
  }
  get AreaInstId() {
    return this.areainstid();
  }
  get OriAreaDangerLevel() {
    return this.oriareadangerlevel();
  }
  get MaxAreaDangerLevel() {
    return this.maxareadangerlevel();
  }
  get TopTowerInstId() {
    return this.toptowerinstid();
  }
  get OriTopTowerDangerLevel() {
    return this.oritoptowerdangerlevel();
  }
  get MaxTopTowerDangerLevel() {
    return this.maxtoptowerdangerlevel();
  }
  get TopTowerVarName() {
    return this.toptowervarname();
  }
  get LimitShopId() {
    return this.limitshopid();
  }
  get ShopId() {
    return this.shopid();
  }
  get BottomWeaponLevel() {
    return this.bottomweaponlevel();
  }
  get BottomRoleLevel() {
    return this.bottomrolelevel();
  }
  get BottomSkillLevel() {
    return this.bottomskilllevel();
  }
  get TalentFuncId() {
    return this.talentfuncid();
  }
  get MascotFuncId() {
    return this.mascotfuncid();
  }
  get ItemCollectionFuncId() {
    return this.itemcollectionfuncid();
  }
  get SafeLeaveBuyFuncId() {
    return this.safeleavebuyfuncid();
  }
  get LifeSupportFuncId() {
    return this.lifesupportfuncid();
  }
  get LifeSupportUpFuncId() {
    return this.lifesupportupfuncid();
  }
  get EnhanceLevelFuncId() {
    return this.enhancelevelfuncid();
  }
  get AreaTaskFuncId() {
    return this.areataskfuncid();
  }
  get EquipRoleFuncId() {
    return this.equiprolefuncid();
  }
  get EquipWeaponFuncId() {
    return this.equipweaponfuncid();
  }
  get PreparationFuncId() {
    return this.preparationfuncid();
  }
  get PollutionFuncId() {
    return this.pollutionfuncid();
  }
  get ChangeDangerFuncId() {
    return this.changedangerfuncid();
  }
  get LvSelectOpenFuncId() {
    return this.lvselectopenfuncid();
  }
  get TowerOpenFuncId() {
    return this.toweropenfuncid();
  }
  get TowerName() {
    return this.towername();
  }
  get ShopFuncId() {
    return this.shopfuncid();
  }
  get HelpId() {
    return this.helpid();
  }
  get MarkId() {
    return this.markid();
  }
  get MainQuestId() {
    return this.mainquestid();
  }
  get MainDropQuality() {
    return this.maindropquality();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsHonamiStoryActivity(t, i) {
    return (i || new HonamiStoryActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  limittime() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  limitshopitemid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  limitshopitemmax() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scoreitemid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  outcoinitemid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  inneritemid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  failleavecoinratio() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMainlineinstidAt(t) {
    return this.mainlineinstid(t);
  }
  mainlineinstid(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  mainlineinstidLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mainlineinstidArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMainlineinstidunlockAt(t, i) {
    return this.mainlineinstidunlock(t);
  }
  mainlineinstidunlock(t, i) {
    var e = this.J7.__offset(this.z7, 22);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  mainlineinstidunlockLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  areainstid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  oriareadangerlevel() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxareadangerlevel() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  toptowerinstid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  oritoptowerdangerlevel() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxtoptowerdangerlevel() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  toptowervarname(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  limitshopid() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopid() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bottomweaponlevel() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bottomrolelevel() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bottomskilllevel() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  talentfuncid() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mascotfuncid() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemcollectionfuncid() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  safeleavebuyfuncid() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lifesupportfuncid() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lifesupportupfuncid() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  enhancelevelfuncid() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  areataskfuncid() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  equiprolefuncid() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  equipweaponfuncid() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  preparationfuncid() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pollutionfuncid() {
    var t = this.J7.__offset(this.z7, 70);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  changedangerfuncid() {
    var t = this.J7.__offset(this.z7, 72);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lvselectopenfuncid() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  toweropenfuncid() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  towername(t) {
    var i = this.J7.__offset(this.z7, 78);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  shopfuncid() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  helpid() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markid() {
    var t = this.J7.__offset(this.z7, 84);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mainquestid() {
    var t = this.J7.__offset(this.z7, 86);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maindropquality() {
    var t = this.J7.__offset(this.z7, 88);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryActivity = HonamiStoryActivity;
//# sourceMappingURL=HonamiStoryActivity.js.map