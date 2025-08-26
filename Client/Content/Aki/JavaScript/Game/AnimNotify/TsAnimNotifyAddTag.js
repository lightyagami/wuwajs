"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyAddTag extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Tag = undefined;
  }
  Constructor() {}
  K2_Notify(e, r) {
    var e = e.GetOwner();
    var t = this.Tag?.TagId;
    if (e instanceof TsBaseCharacter_1.default && t && (e = e.CharacterActorComponent.Entity?.GetComponent(206))) {
      e.TagContainer.UpdateExactTag(4, t, 1);
    }
    return true;
  }
  GetNotifyName() {
    return "添加Tag";
  }
}
exports.default = TsAnimNotifyAddTag;
//# sourceMappingURL=TsAnimNotifyAddTag.js.map