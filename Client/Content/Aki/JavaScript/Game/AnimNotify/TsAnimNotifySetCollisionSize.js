"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifySetCollisionSize extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Radius = 30;
    this.HalfHeight = 100;
  }
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && ((this.HalfHeight <= 0 || this.Radius <= 0) && Log_1.Log.CheckError() && Log_1.Log.Error("Character", 31, "TsAnimNotifySetCollisionSize配置了错误的大小。为避免穿墙，必须大于0", ["Actor", e.GetName()], ["HalfHeight", this.HalfHeight], ["Radius", this.Radius]), e.CharacterActorComponent.SetRadiusAndHalfHeight(this.Radius, this.HalfHeight, false), true);
  }
  GetNotifyName() {
    return "设置碰撞大小";
  }
}
exports.default = TsAnimNotifySetCollisionSize;
//# sourceMappingURL=TsAnimNotifySetCollisionSize.js.map