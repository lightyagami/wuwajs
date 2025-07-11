"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRunConfig = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ParkourChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRunConfig extends ConfigBase_1.ConfigBase {
  GetActivityRunChallengeConfig(e) {
    return ParkourChallengeById_1.configParkourChallengeById.GetConfig(e);
  }
  GetActivityRunTitle(e) {
    e = this.GetActivityRunChallengeConfig(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title) ?? "";
  }
  GetActivityRunScoreMap(e) {
    e = this.GetActivityRunChallengeConfig(e);
    const i = new Map();
    let r = 0;
    e.RewardList.forEach(e => {
      var t = e.Item1;
      var e = e.Item2;
      i.set(r, [t, e]);
      r++;
    });
    return i;
  }
  GetActivityRunMarkId(e) {
    return this.GetActivityRunChallengeConfig(e).MarkId;
  }
  GetActivityRunTexture(e) {
    return this.GetActivityRunChallengeConfig(e).BackGroundTexture;
  }
}
exports.ActivityRunConfig = ActivityRunConfig;
//# sourceMappingURL=ActivityRunConfig.js.map