"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkCharacter = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class LinkCharacter {
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
  get NeedLoadMesh() {
    return this.needloadmesh();
  }
  get CharacterDataAsset() {
    return this.characterdataasset();
  }
  get WeaponMeshList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.weaponmeshlistLength(), this.weaponmeshlist, this);
  }
  get WeaponAnimList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.weaponanimlistLength(), this.weaponanimlist, this);
  }
  get CompNameList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.compnamelistLength(), this.compnamelist, this);
  }
  get RoleLinkAudio() {
    return this.rolelinkaudio();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsLinkCharacter(t, s) {
    return (s || new LinkCharacter()).__init(t.readInt32(t.position()) + t.position(), t);
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
  needloadmesh() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  characterdataasset(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetWeaponmeshlistAt(t) {
    return this.weaponmeshlist(t);
  }
  weaponmeshlist(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  weaponmeshlistLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWeaponanimlistAt(t) {
    return this.weaponanimlist(t);
  }
  weaponanimlist(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  weaponanimlistLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCompnamelistAt(t) {
    return this.compnamelist(t);
  }
  compnamelist(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  compnamelistLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolelinkaudio(t) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.LinkCharacter = LinkCharacter;
//# sourceMappingURL=LinkCharacter.js.map