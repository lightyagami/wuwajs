"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RoleInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get QualityId() {
    return this.qualityid();
  }
  get RoleType() {
    return this.roletype();
  }
  get IsTrial() {
    return this.istrial();
  }
  get Name() {
    return this.name();
  }
  get NickName() {
    return this.nickname();
  }
  get Introduction() {
    return this.introduction();
  }
  get Tag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.tagLength(), this.tag, this);
  }
  get ParentId() {
    return this.parentid();
  }
  get Priority() {
    return this.priority();
  }
  get PropertyId() {
    return this.propertyid();
  }
  get ShowProperty() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showpropertyLength(), this.showproperty, this);
  }
  get ElementId() {
    return this.elementid();
  }
  get SkinId() {
    return this.skinid();
  }
  get RoleHeadIconCircle() {
    return this.roleheadiconcircle();
  }
  get RoleHeadIconLarge() {
    return this.roleheadiconlarge();
  }
  get RoleHeadIconBig() {
    return this.roleheadiconbig();
  }
  get Card() {
    return this.card();
  }
  get RoleHeadIcon() {
    return this.roleheadicon();
  }
  get FormationRoleCard() {
    return this.formationrolecard();
  }
  get RoleStand() {
    return this.rolestand();
  }
  get RolePortrait() {
    return this.roleportrait();
  }
  get SpilloverItem() {
    return GameUtils_1.GameUtils.ConvertToMap(this.spilloveritemLength(), this.spilloveritemKey, this.spilloveritemValue, this);
  }
  spilloveritemKey(t) {
    return this.spilloveritem(t)?.key();
  }
  spilloveritemValue(t) {
    return this.spilloveritem(t)?.value();
  }
  get MeshId() {
    return this.meshid();
  }
  get UiMeshId() {
    return this.uimeshid();
  }
  get RoleBody() {
    return this.rolebody();
  }
  get BreachModel() {
    return this.breachmodel();
  }
  get SpecialEnergyBarId() {
    return this.specialenergybarid();
  }
  get CameraConfig() {
    return this.cameraconfig();
  }
  get CameraFloatHeight() {
    return this.camerafloatheight();
  }
  get EntityProperty() {
    return this.entityproperty();
  }
  get MaxLevel() {
    return this.maxlevel();
  }
  get LevelConsumeId() {
    return this.levelconsumeid();
  }
  get BreachId() {
    return this.breachid();
  }
  get SkillId() {
    return this.skillid();
  }
  get SkillTreeGroupId() {
    return this.skilltreegroupid();
  }
  get ResonanceId() {
    return this.resonanceid();
  }
  get ResonantChainGroupId() {
    return this.resonantchaingroupid();
  }
  get SkillBranchIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillbranchidsLength(), this.skillbranchids, this);
  }
  get DefaultSkillBranchId() {
    return this.defaultskillbranchid();
  }
  get IsShow() {
    return this.isshow();
  }
  get ExchangeConsume() {
    return GameUtils_1.GameUtils.ConvertToMap(this.exchangeconsumeLength(), this.exchangeconsumeKey, this.exchangeconsumeValue, this);
  }
  exchangeconsumeKey(t) {
    return this.exchangeconsume(t)?.key();
  }
  exchangeconsumeValue(t) {
    return this.exchangeconsume(t)?.value();
  }
  get InitWeaponItemId() {
    return this.initweaponitemid();
  }
  get WeaponType() {
    return this.weapontype();
  }
  get SkillDAPath() {
    return this.skilldapath();
  }
  get SkillLockDAPath() {
    return this.skilllockdapath();
  }
  get UiScenePerformanceABP() {
    return this.uisceneperformanceabp();
  }
  get LockOnDefaultId() {
    return this.lockondefaultid();
  }
  get LockOnLookOnId() {
    return this.lockonlookonid();
  }
  get SkillEffectDA() {
    return this.skilleffectda();
  }
  get FootStepState() {
    return this.footstepstate();
  }
  get PartyId() {
    return this.partyid();
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get Icon() {
    return this.icon();
  }
  get ItemQualityId() {
    return this.itemqualityid();
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription();
  }
  get NumLimit() {
    return this.numlimit();
  }
  get ShowInBag() {
    return this.showinbag();
  }
  get WeaponScale() {
    return GameUtils_1.GameUtils.ConvertToArray(this.weaponscaleLength(), this.weaponscale, this);
  }
  get Intervene() {
    return this.intervene();
  }
  get CharacterVoice() {
    return this.charactervoice();
  }
  get TrialRole() {
    return this.trialrole();
  }
  get IsAim() {
    return this.isaim();
  }
  get RoleGuide() {
    return this.roleguide();
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule();
  }
  get SkinDamage() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skindamageLength(), this.skindamage, this);
  }
  get HideHuLu() {
    return this.hidehulu();
  }
  get EnableOperateSelfBgm() {
    return this.enableoperateselfbgm();
  }
  get FormationSpineSkeletonData() {
    return this.formationspineskeletondata();
  }
  get FormationSpineAtlas() {
    return this.formationspineatlas();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoleInfo(t, i) {
    return (i || new RoleInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roletype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  istrial() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  nickname(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  introduction(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetTagAt(t) {
    return this.tag(t);
  }
  tag(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  tagLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  tagArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  parentid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  propertyid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowpropertyAt(t) {
    return this.showproperty(t);
  }
  showproperty(t) {
    var i = this.J7.__offset(this.z7, 26);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  showpropertyLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showpropertyArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  elementid() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skinid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleheadiconcircle(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleheadiconlarge(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleheadiconbig(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  card(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleheadicon(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  formationrolecard(t) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  rolestand(t) {
    var i = this.J7.__offset(this.z7, 44);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleportrait(t) {
    var i = this.J7.__offset(this.z7, 46);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSpilloveritemAt(t, i) {
    return this.spilloveritem(t);
  }
  spilloveritem(t, i) {
    var s = this.J7.__offset(this.z7, 48);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  spilloveritemLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  meshid() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  uimeshid() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolebody(t) {
    var i = this.J7.__offset(this.z7, 54);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  breachmodel() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergybarid() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cameraconfig(t) {
    var i = this.J7.__offset(this.z7, 60);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  camerafloatheight() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entityproperty() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxlevel() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelconsumeid() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  breachid() {
    var t = this.J7.__offset(this.z7, 70);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillid() {
    var t = this.J7.__offset(this.z7, 72);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilltreegroupid() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resonanceid() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resonantchaingroupid() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillbranchidsAt(t) {
    return this.skillbranchids(t);
  }
  skillbranchids(t) {
    var i = this.J7.__offset(this.z7, 80);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skillbranchidsLength() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillbranchidsArray() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  defaultskillbranchid() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isshow() {
    var t = this.J7.__offset(this.z7, 84);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetExchangeconsumeAt(t, i) {
    return this.exchangeconsume(t);
  }
  exchangeconsume(t, i) {
    var s = this.J7.__offset(this.z7, 86);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  exchangeconsumeLength() {
    var t = this.J7.__offset(this.z7, 86);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  initweaponitemid() {
    var t = this.J7.__offset(this.z7, 88);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weapontype() {
    var t = this.J7.__offset(this.z7, 90);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilldapath(t) {
    var i = this.J7.__offset(this.z7, 92);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  skilllockdapath(t) {
    var i = this.J7.__offset(this.z7, 94);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  uisceneperformanceabp(t) {
    var i = this.J7.__offset(this.z7, 96);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  lockondefaultid() {
    var t = this.J7.__offset(this.z7, 98);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lockonlookonid() {
    var t = this.J7.__offset(this.z7, 100);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilleffectda(t) {
    var i = this.J7.__offset(this.z7, 102);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  footstepstate(t) {
    var i = this.J7.__offset(this.z7, 104);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  partyid() {
    var t = this.J7.__offset(this.z7, 106);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 108);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 110);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  itemqualityid() {
    var t = this.J7.__offset(this.z7, 112);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  obtainedshowdescription(t) {
    var i = this.J7.__offset(this.z7, 114);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  numlimit() {
    var t = this.J7.__offset(this.z7, 116);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showinbag() {
    var t = this.J7.__offset(this.z7, 118);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetWeaponscaleAt(t) {
    return this.weaponscale(t);
  }
  weaponscale(t) {
    var i = this.J7.__offset(this.z7, 120);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  weaponscaleLength() {
    var t = this.J7.__offset(this.z7, 120);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponscaleArray() {
    var t = this.J7.__offset(this.z7, 120);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  intervene() {
    var t = this.J7.__offset(this.z7, 122);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  charactervoice(t) {
    var i = this.J7.__offset(this.z7, 124);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  trialrole() {
    var t = this.J7.__offset(this.z7, 126);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isaim() {
    var t = this.J7.__offset(this.z7, 128);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  roleguide() {
    var t = this.J7.__offset(this.z7, 130);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reddotdisablerule() {
    var t = this.J7.__offset(this.z7, 132);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkindamageAt(t) {
    return this.skindamage(t);
  }
  skindamage(t, i) {
    var s = this.J7.__offset(this.z7, 134);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  skindamageLength() {
    var t = this.J7.__offset(this.z7, 134);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  hidehulu() {
    var t = this.J7.__offset(this.z7, 136);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  enableoperateselfbgm() {
    var t = this.J7.__offset(this.z7, 138);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  formationspineskeletondata(t) {
    var i = this.J7.__offset(this.z7, 140);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  formationspineatlas(t) {
    var i = this.J7.__offset(this.z7, 142);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.RoleInfo = RoleInfo;
//# sourceMappingURL=RoleInfo.js.map