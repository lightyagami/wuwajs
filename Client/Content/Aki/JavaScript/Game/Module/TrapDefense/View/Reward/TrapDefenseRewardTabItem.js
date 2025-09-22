"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRewardTabItem = exports.TrapDefenseRewardTabData = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
class TrapDefenseRewardTabData {
  constructor(e) {
    this.Type = e;
  }
  GetTitle() {
    return TrapDefenseDefine_1.rewardTypeNames[this.Type];
  }
  GetProgressText() {
    var [e, t] = ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetRewardProgressByType(this.Type);
    return e + "/" + t;
  }
  IsFinished() {
    var [e, t] = ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetRewardProgressByType(this.Type);
    return t <= e;
  }
  HasRedDot() {
    return ModelManager_1.ModelManager.TrapDefenseModel.RewardData.IsCanClaimLimitRewardByType(this.Type);
  }
}
exports.TrapDefenseRewardTabData = TrapDefenseRewardTabData;
class TrapDefenseRewardTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.eTt = () => {
      this.OnSelected(false);
    };
    this.a9u = e => {
      if (this.Pe && e !== this.Pe.Type) {
        this.OnDeselected(false);
      }
    };
    this.iMd = () => {
      if (this.Pe) {
        this.GetItem(4)?.SetUIActive(this.Pe.HasRedDot());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelReward.RegisterOnSelectRewardTypeChange(this.a9u);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RedDotUpdateTrapDefenseLimitReward, this.iMd);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RedDotUpdateTrapDefenseLimitReward, this.iMd);
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelReward.UnregisterOnSelectRewardTypeChange(this.a9u);
  }
  Refresh(e, t, r) {
    if (e) {
      this.Pe = e;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.GetTitle());
      this.GetText(2).SetText(e.GetProgressText());
      this.GetTexture(3).SetUIActive(e.IsFinished());
      this.GetItem(4).SetUIActive(e.HasRedDot());
    }
  }
  OnSelected(e) {
    this.EUt(1, e);
    e = ModelManager_1.ModelManager.TrapDefenseModel;
    if (e.ViewModelReward.CurSelectRewardType !== this.Pe.Type) {
      e.ViewModelReward.SetCurSelectRewardType(this.Pe.Type);
    }
  }
  OnDeselected(e) {
    this.EUt(0, e);
  }
  EUt(e, t) {
    var r = this.GetExtendToggle(0);
    if (r) {
      r.SetToggleState(e, t);
    }
  }
}
exports.TrapDefenseRewardTabItem = TrapDefenseRewardTabItem;
//# sourceMappingURL=TrapDefenseRewardTabItem.js.map