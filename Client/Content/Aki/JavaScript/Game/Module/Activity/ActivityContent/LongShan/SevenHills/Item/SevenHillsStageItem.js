"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SevenHillsStageItem = undefined;
const UE = require("ue");
const LongShanStageById_1 = require("../../../../../../../Core/Define/ConfigQuery/LongShanStageById");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const ActivityLongShanController_1 = require("../../ActivityLongShanController");
class SevenHillsStageItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.xOe = 0;
    this.CNe = undefined;
    this.TDe = undefined;
    this.VY1 = () => {
      var e = !this.CNe.IsStageUnlock(this.xOe);
      this.GetItem(8)?.SetUIActive(e);
      this.GetButton(0)?.SetSelfInteractive(!e);
      var i = this.CNe.GetProgress(this.xOe);
      var t = i === 100;
      this.GetText(7)?.SetText(i + "%");
      this.GetItem(3)?.SetUIActive(t);
      var i = e || t;
      this.GetText(6).useChangeColor = i;
      this.GetText(7).useChangeColor = i;
      this.GetSprite(5).useChangeColor = i;
      this.GetItem(4)?.SetUIActive(this.CNe.CheckStageRed(this.xOe));
    };
    this.jY1 = e => {
      if (e === this.CNe?.Id) {
        this.VY1();
      }
    };
    this.Tu1 = () => {
      var e;
      if (this.CNe?.IsStageReachOpenTime(this.xOe)) {
        e = LongShanStageById_1.configLongShanStageById.GetConfig(this.xOe);
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.JumpId);
      }
    };
    this.HY1 = () => {
      UiManager_1.UiManager.OpenView("SevenHillsStageTaskView", this.xOe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIText]];
    this.BtnBindInfo = [[0, this.HY1], [9, this.Tu1]];
  }
  OnStart() {
    this.CNe = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.jY1);
    this.kot();
  }
  kot() {
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.o3i();
    }, 1000);
  }
  Refresh(e, i, t) {
    this.xOe = e;
    e = LongShanStageById_1.configLongShanStageById.GetConfig(this.xOe);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Title);
    this.SetTextureByPath(e.Picture, this.GetTexture(1));
    this.SetSpriteByPath(e.RomeNumSprite, this.GetSprite(2), false);
    this.VY1();
    this.eeu();
  }
  eeu() {
    var e;
    var i;
    if (!this.CNe.IsStageUnlock(this.xOe)) {
      if (this.CNe.IsStageReachOpenTime(this.xOe)) {
        i = LongShanStageById_1.configLongShanStageById.GetConfig(this.xOe);
        i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(i.OpenConditionId);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i);
      } else {
        i = this.CNe?.GetStageInfoByIdIncludeLock(this.xOe);
        i = Number(MathUtils_1.MathUtils.LongToBigInt(i.Pps)) / 1000;
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("QiqiuTheme_UnlockTime");
        i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(i, e) ?? "";
        this.GetText(10)?.SetText(i);
      }
    } else {
      this.VY1();
      this.xHe();
    }
  }
  o3i() {
    this.eeu();
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.jY1);
    this.xHe();
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.SevenHillsStageItem = SevenHillsStageItem;
//# sourceMappingURL=SevenHillsStageItem.js.map