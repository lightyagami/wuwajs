"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleCard = void 0;
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  OneItemConfig_1 = require("./SubType/OneItemConfig");
class PhantomBattleCard {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get ActivityId() {
    return this.activityid()
  }
  get ItemType() {
    return this.itemtype()
  }
  get UnlockConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToArray(this.unlockconsumeitemsLength(), this.unlockconsumeitems, this)
  }
  get UpOutLookConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToArray(this.upoutlookconsumeitemsLength(), this.upoutlookconsumeitems, this)
  }
  get Name() {
    return this.name()
  }
  get BattlePower() {
    return this.battlepower()
  }
  get Cost() {
    return this.cost()
  }
  get BackRecoverCost() {
    return this.backrecovercost()
  }
  get Element() {
    return this.element()
  }
  get CardGroupNum() {
    return this.cardgroupnum()
  }
  get SlotTendency() {
    return this.slottendency()
  }
  get CardAddTendency() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cardaddtendencyLength(), this.cardaddtendency, this)
  }
  get PassiveSkillId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.passiveskillidLength(), this.passiveskillid, this)
  }
  get ActiveSkillTag() {
    return this.activeskilltag()
  }
  get ActiveSkillId() {
    return this.activeskillid()
  }
  get CardFactorId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cardfactoridLength(), this.cardfactorid, this)
  }
  get InitAttack() {
    return GameUtils_1.GameUtils.ConvertToMap(this.initattackLength(), this.initattackKey, this.initattackValue, this)
  }
  initattackKey(t) {
    return this.initattack(t)?.key()
  }
  initattackValue(t) {
    return this.initattack(t)?.value()
  }
  get EntityConfigId() {
    return this.entityconfigid()
  }
  get AttrLevel() {
    return this.attrlevel()
  }
  get BaseProId() {
    return this.baseproid()
  }
  get CardEffectDescription() {
    return this.cardeffectdescription()
  }
  get CardEffectDescriptionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cardeffectdescriptionparamsLength(), this.cardeffectdescriptionparams, this)
  }
  get EntryIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.entryidlistLength(), this.entryidlist, this)
  }
  get CardFaceTexture() {
    return this.cardfacetexture()
  }
  get DeckFaceTexture() {
    return this.deckfacetexture()
  }
  get BvbIcon() {
    return this.bvbicon()
  }
  get SpineAtlas() {
    return this.spineatlas()
  }
  get SpineSkeleton() {
    return this.spineskeleton()
  }
  get QualityId() {
    return this.qualityid()
  }
  get ConditionDesc() {
    return this.conditiondesc()
  }
  get EnableBuy() {
    return this.enablebuy()
  }
  get TypeDescription() {
    return this.typedescription()
  }
  get AttributesDescription() {
    return this.attributesdescription()
  }
  get BgDescription() {
    return this.bgdescription()
  }
  get Icon() {
    return this.icon()
  }
  get IconMiddle() {
    return this.iconmiddle()
  }
  get IconSmall() {
    return this.iconsmall()
  }
  get Mesh() {
    return this.mesh()
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription()
  }
  get ShowInBag() {
    return this.showinbag()
  }
  get ItemAccess() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemaccessLength(), this.itemaccess, this)
  }
  get SortIndex() {
    return this.sortindex()
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule()
  }
  get AtmosphereEffect() {
    return this.atmosphereeffect()
  }
  get SettingEffect() {
    return GameUtils_1.GameUtils.ConvertToArray(this.settingeffectLength(), this.settingeffect, this)
  }
  get TaskBg() {
    return this.taskbg()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleCard(t, i) {
    return (i || new PhantomBattleCard).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  itemtype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetUnlockconsumeitemsAt(t, i) {
    return this.unlockconsumeitems(t)
  }
  unlockconsumeitems(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? (i || new OneItemConfig_1.OneItemConfig).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  unlockconsumeitemsLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetUpoutlookconsumeitemsAt(t, i) {
    return this.upoutlookconsumeitems(t)
  }
  upoutlookconsumeitems(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    return s ? (i || new OneItemConfig_1.OneItemConfig).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  upoutlookconsumeitemsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  battlepower() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  cost() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  backrecovercost() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  element() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  cardgroupnum() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 2
  }
  slottendency() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 1
  }
  GetCardaddtendencyAt(t) {
    return this.cardaddtendency(t)
  }
  cardaddtendency(t) {
    var i = this.J7.__offset(this.z7, 28);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  cardaddtendencyLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  cardaddtendencyArray() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetPassiveskillidAt(t) {
    return this.passiveskillid(t)
  }
  passiveskillid(t) {
    var i = this.J7.__offset(this.z7, 30);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  passiveskillidLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  passiveskillidArray() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  activeskilltag() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  activeskillid() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetCardfactoridAt(t) {
    return this.cardfactorid(t)
  }
  cardfactorid(t) {
    var i = this.J7.__offset(this.z7, 36);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  cardfactoridLength() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  cardfactoridArray() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetInitattackAt(t, i) {
    return this.initattack(t)
  }
  initattack(t, i) {
    var s = this.J7.__offset(this.z7, 38);
    return s ? (i || new DicIntInt_1.DicIntInt).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  initattackLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  entityconfigid() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  attrlevel() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  baseproid() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  cardeffectdescription(t) {
    var i = this.J7.__offset(this.z7, 46),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  GetCardeffectdescriptionparamsAt(t) {
    return this.cardeffectdescriptionparams(t)
  }
  cardeffectdescriptionparams(t, i) {
    var s = this.J7.__offset(this.z7, 48),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  cardeffectdescriptionparamsLength() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetEntryidlistAt(t) {
    return this.entryidlist(t)
  }
  entryidlist(t) {
    var i = this.J7.__offset(this.z7, 50);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  entryidlistLength() {
    var t = this.J7.__offset(this.z7, 50);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  entryidlistArray() {
    var t = this.J7.__offset(this.z7, 50);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  cardfacetexture(t) {
    var i = this.J7.__offset(this.z7, 52),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  deckfacetexture(t) {
    var i = this.J7.__offset(this.z7, 54),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  bvbicon(t) {
    var i = this.J7.__offset(this.z7, 56),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  spineatlas(t) {
    var i = this.J7.__offset(this.z7, 58),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  spineskeleton(t) {
    var i = this.J7.__offset(this.z7, 60),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 62);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  conditiondesc(t) {
    var i = this.J7.__offset(this.z7, 64),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  enablebuy() {
    var t = this.J7.__offset(this.z7, 66);
    return !t || !!this.J7.readInt8(this.z7 + t)
  }
  typedescription(t) {
    var i = this.J7.__offset(this.z7, 68),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 70),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  bgdescription(t) {
    var i = this.J7.__offset(this.z7, 72),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 74),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  iconmiddle(t) {
    var i = this.J7.__offset(this.z7, 76),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  iconsmall(t) {
    var i = this.J7.__offset(this.z7, 78),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  mesh(t) {
    var i = this.J7.__offset(this.z7, 80),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  obtainedshowdescription(t) {
    var i = this.J7.__offset(this.z7, 82),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  showinbag() {
    var t = this.J7.__offset(this.z7, 84);
    return !t || !!this.J7.readInt8(this.z7 + t)
  }
  GetItemaccessAt(t) {
    return this.itemaccess(t)
  }
  itemaccess(t) {
    var i = this.J7.__offset(this.z7, 86);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  itemaccessLength() {
    var t = this.J7.__offset(this.z7, 86);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  itemaccessArray() {
    var t = this.J7.__offset(this.z7, 86);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 88);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  reddotdisablerule() {
    var t = this.J7.__offset(this.z7, 90);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  atmosphereeffect(t) {
    var i = this.J7.__offset(this.z7, 92),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  GetSettingeffectAt(t) {
    return this.settingeffect(t)
  }
  settingeffect(t, i) {
    var s = this.J7.__offset(this.z7, 94),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  settingeffectLength() {
    var t = this.J7.__offset(this.z7, 94);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  taskbg(t) {
    var i = this.J7.__offset(this.z7, 96),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
}
exports.PhantomBattleCard = PhantomBattleCard;
//# sourceMappingURL=PhantomBattleCard.js.map