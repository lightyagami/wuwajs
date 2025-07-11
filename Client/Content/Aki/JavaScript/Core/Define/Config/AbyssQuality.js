"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssQuality = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AbyssQuality {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Bg() {
    return this.bg();
  }
  get AbyssItemBg() {
    return this.abyssitembg();
  }
  get AbyssCoreItemBg() {
    return this.abysscoreitembg();
  }
  get AbyssCoreItemFormationBg() {
    return this.abysscoreitemformationbg();
  }
  get AbyssItemFormationBg() {
    return this.abyssitemformationbg();
  }
  get AbyssItemFormationBgColor() {
    return this.abyssitemformationbgcolor();
  }
  get Mesh() {
    return this.mesh();
  }
  get PayShopQualitySprite() {
    return this.payshopqualitysprite();
  }
  get AbyssPassiveItemBg() {
    return this.abysspassiveitembg();
  }
  get AbyssSpecialEffects() {
    return this.abyssspecialeffects();
  }
  get AbyssTailEffects() {
    return this.abysstaileffects();
  }
  get AbyssDissipateEffects() {
    return this.abyssdissipateeffects();
  }
  get MediumItemGridQualitySpritePath() {
    return this.mediumitemgridqualityspritepath();
  }
  get QualityColor() {
    return this.qualitycolor();
  }
  get DropColor() {
    return this.dropcolor();
  }
  get TipsQualityTexturePath() {
    return this.tipsqualitytexturepath();
  }
  get RecoveryRewardItem() {
    return this.recoveryrewarditem();
  }
  get AcquireQualityTexPath() {
    return this.acquirequalitytexpath();
  }
  get TextColor() {
    return this.textcolor();
  }
  get AcquireQualitySpritePath() {
    return this.acquirequalityspritepath();
  }
  get Name() {
    return this.name();
  }
  get BackgroundSprite() {
    return this.backgroundsprite();
  }
  get FilterIconPath() {
    return this.filtericonpath();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAbyssQuality(t, s) {
    return (s || new AbyssQuality()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bg(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abyssitembg(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abysscoreitembg(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abysscoreitemformationbg(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abyssitemformationbg(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abyssitemformationbgcolor(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  mesh(t) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  payshopqualitysprite(t) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abysspassiveitembg(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abyssspecialeffects(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abysstaileffects(t) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  abyssdissipateeffects(t) {
    var s = this.J7.__offset(this.z7, 28);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  mediumitemgridqualityspritepath(t) {
    var s = this.J7.__offset(this.z7, 30);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  qualitycolor(t) {
    var s = this.J7.__offset(this.z7, 32);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  dropcolor(t) {
    var s = this.J7.__offset(this.z7, 34);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  tipsqualitytexturepath(t) {
    var s = this.J7.__offset(this.z7, 36);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  recoveryrewarditem() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  acquirequalitytexpath(t) {
    var s = this.J7.__offset(this.z7, 40);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  textcolor(t) {
    var s = this.J7.__offset(this.z7, 42);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  acquirequalityspritepath(t) {
    var s = this.J7.__offset(this.z7, 44);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 46);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  backgroundsprite(t) {
    var s = this.J7.__offset(this.z7, 48);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  filtericonpath(t) {
    var s = this.J7.__offset(this.z7, 50);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.AbyssQuality = AbyssQuality;
//# sourceMappingURL=AbyssQuality.js.map