"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorSubView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class SpringManorSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.xKt = undefined;
    this.PWa = e => {
      if (e === this.ActivityBaseData?.Id) {
        this.jqe();
        this.nOe();
      }
    };
    this.YDo = () => {
      UiManager_1.UiManager.OpenView("Spring26RewardView");
    };
    this.VWu = () => {
      var e;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ErrorCode_2000015_Text");
        } else if (ModelManager_1.ModelManager.QuestNewModel.IsInFocusMode()) {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(341)).FunctionMap.set(2, () => {
            var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
            ControllerHolder_1.ControllerHolder.QuestNewController.RequestCancelQuestFocusMode(e, () => {
              ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.EnterBigWorldInstRequestAndUnTrackQuest();
            });
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        } else {
          ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.EnterBigWorldInstRequestAndUnTrackQuest();
        }
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIArtText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIButtonComponent], [9, UE.UIText], [10, UE.UIItem]];
    this.BtnBindInfo = [[8, this.YDo]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.xKt = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.xKt.SetData(this.ActivityBaseData);
    e.push(this.xKt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.xKt?.SetClickFunc(this.VWu);
    this.ActivityBaseData?.ReadFirstOpenRedDot();
  }
  OnBeforeShow() {
    this.OnRefreshView();
  }
  OnRefreshView() {
    this._pg();
    this.jqe();
    this.nOe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  nOe() {
    let e = "";
    var i = this.ActivityBaseData.GetPreGuideQuestFinishState();
    e = i ? "Spring26_Entrance_Button" : "JumpToQuestText";
    this.xKt?.SetBtnText(e);
    this.sVg();
  }
  _pg() {
    var e;
    var i;
    var t;
    var r = this.ActivityBaseData?.IsUnLock() ?? false;
    this.GetItem(1)?.SetUIActive(r);
    if (r) {
      e = (r = ModelManager_1.ModelManager.SpringManorModel).GetAtmosphereLevel();
      i = r.ActivityData.GetAtmosphere();
      t = r.GetNextLevel();
      r = r.GetLevelNeedExp(t);
      this.tOg(e, i, r);
      if (t = ConfigManager_1.ConfigManager.SpringManorConfig?.GetLevelConfigById(e)) {
        r = MathUtils_1.MathUtils.Clamp((i - t.AtmosphereNeed) / t.AtmosphereNext, 0, 1);
        this.GetSprite(7)?.SetFillAmount(r);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SpringManor", 90, "获取不到等级配置！" + e);
      }
    }
  }
  tOg(e, i, t) {
    this.GetArtText(4)?.SetText(e.toString());
    this.GetText(3)?.SetText(i.toString());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Spring26_Atmosphere_TargetProgress", t.toString());
  }
  sVg() {
    if (this.ActivityBaseData?.IsUnLock()) {
      this.xKt?.SetFunctionRedDotVisible(this.ActivityBaseData?.HasActivityRedDot() ?? false);
    }
  }
  jqe() {
    var e = this.ActivityBaseData.GetCurrentRewardTaskProgress();
    var i = this.ActivityBaseData.GetTotalRewardTaskProgress();
    this.GetText(9)?.SetText(e + "/" + i);
    this.GetItem(10)?.SetUIActive(this.ActivityBaseData.HasRewardRedDot());
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "Spring_ConfirmBtn" && (e = this.xKt?.GetFunctionalButtonItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.SpringManorSubView = SpringManorSubView;
//# sourceMappingURL=SpringManorSubView.js.map