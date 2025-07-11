"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipInterfaceModel = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const SkipConditionContext_1 = require("./SkipCondition/SkipConditionContext");
class SkipInterfaceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ResetToBattleViewCount = 0;
    this.ContainerLimitCount = 3;
    this.aql = new SkipConditionContext_1.SkipConditionContext();
    this.pFl = new Map();
  }
  OnInit() {
    this.ResetToBattleViewCount = CommonParamById_1.configCommonParamById.GetIntConfig("ResetToBattleViewCount");
    return true;
  }
  CheckAccessPathCondition(e) {
    let t = true;
    var i;
    var o = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(e);
    if ((o &&= o.ClientCondition) && o.length > 1) {
      i = o[0];
      o = o.splice(1);
      i = this.aql.Check(i, o);
      t = i;
    }
    return t = t && this.IsAccessPathInOpenTime(e);
  }
  FullUpdateAccessPathTimeServerConfig(e) {
    this.pFl.clear();
    e.forEach(e => {
      this.pFl.set(e.s5n, e);
    });
  }
  IsAccessPathInOpenTime(e) {
    var t;
    var e = this.pFl.get(e);
    return !e || (t = MathUtils_1.MathUtils.LongToNumber(e.cps), e = MathUtils_1.MathUtils.LongToNumber(e.dps), t <= (t = TimeUtil_1.TimeUtil.GetServerTimeStamp()) && t <= e);
  }
}
exports.SkipInterfaceModel = SkipInterfaceModel;
//# sourceMappingURL=SkipInterfaceModel.js.map