"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SevenHillsStageItem = void 0;
const UE = require("ue"),
  LongShanStageById_1 = require("../../../../../../../Core/Define/ConfigQuery/LongShanStageById"),
  MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  ActivityLongShanController_1 = require("../../ActivityLongShanController");
class SevenHillsStageItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.xOe = 0, this.CNe = void 0, this.TDe = void 0, this.XX1 = () => {
      var e = !this.CNe.IsStageUnlock(this.xOe),
        i = (this.GetItem(8)?.SetUIActive(e), this.GetButton(0)?.SetSelfInteractive(!e), this.CNe.GetProgress(this.xOe)),
        t = 100 === i,
        i = (this.GetText(7)?.SetText(i + "%"), this.GetItem(3)?.SetUIActive(t), e || t);
      this.GetText(6).useChangeColor = i, this.GetText(7).useChangeColor = i, this.GetSprite(5).useChangeColor = i, this.GetItem(4)?.SetUIActive(this.CNe.CheckStageRed(this.xOe))
    }, this.YX1 = e => {
      e === this.CNe?.Id && this.XX1()
    }, this.iu1 = () => {
      var e;
      this.CNe?.IsStageReachOpenTime(this.xOe) && (e = LongShanStageById_1.configLongShanStageById.GetConfig(this.xOe), SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.JumpId))
    }, this.zX1 = () => {
      UiManager_1.UiManager.OpenView("SevenHillsStageTaskView", this.xOe)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.zX1],
      [9, this.iu1]
    ]
  }
  OnStart() {
    this.CNe = ActivityLongShanController_1.ActivityLongShanController.GetActivityData()
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.YX1), this.kot()
  }
  kot() {
    this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
      this.o3i()
    }, 1e3)
  }
  Refresh(e, i, t) {
    this.xOe = e;
    e = LongShanStageById_1.configLongShanStageById.GetConfig(this.xOe);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Title), this.SetTextureByPath(e.Picture, this.GetTexture(1)), this.SetSpriteByPath(e.RomeNumSprite, this.GetSprite(2), !1), this.XX1(), this.nZ1()
  }
  nZ1() {
    var e, i;
    !this.CNe.IsStageUnlock(this.xOe) ? this.CNe.IsStageReachOpenTime(this.xOe) ? (i = LongShanStageById_1.configLongShanStageById.GetConfig(this.xOe), i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(i.OpenConditionId), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i)) : (i = this.CNe?.GetStageInfoByIdIncludeLock(this.xOe), i = Number(MathUtils_1.MathUtils.LongToBigInt(i.Pps)) / 1e3, e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("QiqiuTheme_UnlockTime"), i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(i, e) ?? "", this.GetText(10)?.SetText(i)) : (this.XX1(), this.xHe())
  }
  o3i() {
    this.nZ1()
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.YX1), this.xHe()
  }
  xHe() {
    void 0 !== this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0)
  }
}
exports.SevenHillsStageItem = SevenHillsStageItem;
//# sourceMappingURL=SevenHillsStageItem.js.map