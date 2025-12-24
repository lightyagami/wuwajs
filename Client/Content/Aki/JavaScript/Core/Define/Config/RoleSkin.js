"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkin = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleSkin {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get SuitWeaponSkinId() {
    return this.suitweaponskinid();
  }
  get HeadId() {
    return this.headid();
  }
  get QualityId() {
    return this.qualityid();
  }
  get Name() {
    return this.name();
  }
  get TitleName() {
    return this.titlename();
  }
  get SubDecName() {
    return this.subdecname();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get BgDescription() {
    return this.bgdescription();
  }
  get IconMiddle() {
    return this.iconmiddle();
  }
  get IconSmall() {
    return this.iconsmall();
  }
  get ItemAccess() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemaccessLength(), this.itemaccess, this);
  }
  get SortIndex() {
    return this.sortindex();
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule();
  }
  get ShowInBag() {
    return this.showinbag();
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription();
  }
  get Icon() {
    return this.icon();
  }
  get FunctionDesc() {
    return this.functiondesc();
  }
  get FirstObtainDesc() {
    return this.firstobtaindesc();
  }
  get Quality() {
    return this.quality();
  }
  get Tag() {
    return this.tag();
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
  get PreviewRoleCard() {
    return this.previewrolecard();
  }
  get BuyShopPreviewRoleCard() {
    return this.buyshoppreviewrolecard();
  }
  get FormationRoleCard() {
    return this.formationrolecard();
  }
  get RoleStand() {
    return this.rolestand();
  }
  get SuitWeaponSkinColor() {
    return this.suitweaponskincolor();
  }
  get RoleObtainColor1() {
    return this.roleobtaincolor1();
  }
  get RoleObtainColor2() {
    return this.roleobtaincolor2();
  }
  get RolePortrait() {
    return this.roleportrait();
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
  get UiScenePerformanceABP() {
    return this.uisceneperformanceabp();
  }
  get FootStepState() {
    return this.footstepstate();
  }
  get PayShopPreviewRoleTexturePath() {
    return this.payshoppreviewroletexturepath();
  }
  get PayShopPreviewRoleTextureBgPath() {
    return this.payshoppreviewroletexturebgpath();
  }
  get PayShopPreviewWeaponTexturePath() {
    return this.payshoppreviewweapontexturepath();
  }
  get PayShopPreviewBuyRoleTexturePath() {
    return this.payshoppreviewbuyroletexturepath();
  }
  get PayShopPreviewBuyRoleSuitWeaponTexturePath() {
    return this.payshoppreviewbuyrolesuitweapontexturepath();
  }
  get ShareTexturePath() {
    return this.sharetexturepath();
  }
  get SpineSkeletonData() {
    return this.spineskeletondata();
  }
  get SmallSpineAtlas() {
    return this.smallspineatlas();
  }
  get SkinBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skinbuffLength(), this.skinbuff, this);
  }
  get FormationSpineSkeletonData() {
    return this.formationspineskeletondata();
  }
  get FormationSpineAtlas() {
    return this.formationspineatlas();
  }
  get SpineParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.spineparamLength(), this.spineparam, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoleSkin(t, i) {
    return (i || new RoleSkin()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  suitweaponskinid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  headid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  titlename(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  subdecname(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  typedescription(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bgdescription(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  iconmiddle(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  iconsmall(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetItemaccessAt(t) {
    return this.itemaccess(t);
  }
  itemaccess(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  itemaccessLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemaccessArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reddotdisablerule() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showinbag() {
    var t = this.J7.__offset(this.z7, 36);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  obtainedshowdescription(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  functiondesc(t) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  firstobtaindesc(t) {
    var i = this.J7.__offset(this.z7, 44);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  quality() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tag(t) {
    var i = this.J7.__offset(this.z7, 48);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleheadiconcircle(t) {
    var i = this.J7.__offset(this.z7, 50);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleheadiconlarge(t) {
    var i = this.J7.__offset(this.z7, 52);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleheadiconbig(t) {
    var i = this.J7.__offset(this.z7, 54);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  card(t) {
    var i = this.J7.__offset(this.z7, 56);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleheadicon(t) {
    var i = this.J7.__offset(this.z7, 58);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  previewrolecard(t) {
    var i = this.J7.__offset(this.z7, 60);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  buyshoppreviewrolecard(t) {
    var i = this.J7.__offset(this.z7, 62);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  formationrolecard(t) {
    var i = this.J7.__offset(this.z7, 64);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  rolestand(t) {
    var i = this.J7.__offset(this.z7, 66);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  suitweaponskincolor(t) {
    var i = this.J7.__offset(this.z7, 68);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleobtaincolor1(t) {
    var i = this.J7.__offset(this.z7, 70);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleobtaincolor2(t) {
    var i = this.J7.__offset(this.z7, 72);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleportrait(t) {
    var i = this.J7.__offset(this.z7, 74);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  meshid() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  uimeshid() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolebody(t) {
    var i = this.J7.__offset(this.z7, 80);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  uisceneperformanceabp(t) {
    var i = this.J7.__offset(this.z7, 82);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  footstepstate(t) {
    var i = this.J7.__offset(this.z7, 84);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  payshoppreviewroletexturepath(t) {
    var i = this.J7.__offset(this.z7, 86);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  payshoppreviewroletexturebgpath(t) {
    var i = this.J7.__offset(this.z7, 88);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  payshoppreviewweapontexturepath(t) {
    var i = this.J7.__offset(this.z7, 90);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  payshoppreviewbuyroletexturepath(t) {
    var i = this.J7.__offset(this.z7, 92);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  payshoppreviewbuyrolesuitweapontexturepath(t) {
    var i = this.J7.__offset(this.z7, 94);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  sharetexturepath(t) {
    var i = this.J7.__offset(this.z7, 96);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  spineskeletondata(t) {
    var i = this.J7.__offset(this.z7, 98);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  smallspineatlas(t) {
    var i = this.J7.__offset(this.z7, 100);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSkinbuffAt(t) {
    return this.skinbuff(t);
  }
  skinbuff(t) {
    var i = this.J7.__offset(this.z7, 102);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  skinbuffLength() {
    var t = this.J7.__offset(this.z7, 102);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skinbuffArray() {
    var t = this.J7.__offset(this.z7, 102);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  formationspineskeletondata(t) {
    var i = this.J7.__offset(this.z7, 104);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  formationspineatlas(t) {
    var i = this.J7.__offset(this.z7, 106);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSpineparamAt(t) {
    return this.spineparam(t);
  }
  spineparam(t) {
    var i = this.J7.__offset(this.z7, 108);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  spineparamLength() {
    var t = this.J7.__offset(this.z7, 108);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  spineparamArray() {
    var t = this.J7.__offset(this.z7, 108);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.RoleSkin = RoleSkin;
//# sourceMappingURL=RoleSkin.js.map