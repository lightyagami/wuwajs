"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterDetectView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TextById_1 = require("../../../../Core/Define/ConfigQuery/TextById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const CommonSearchComponent_1 = require("../../Common/InputView/CommonSearchComponent");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HelpController_1 = require("../../Help/HelpController");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const AdventureGuideController_1 = require("../AdventureGuideController");
const MonsterDetectItem_1 = require("./MonsterDetectItem");
const MONSTER_HELP = 17;
const LEFT_TIME_HELP = 72;
class MonsterDetectView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.O6e = undefined;
    this.k6e = undefined;
    this.H3e = undefined;
    this.F6e = 0;
    this.V6e = undefined;
    this.H6e = undefined;
    this.j6e = undefined;
    this.W6e = -1;
    this.K6e = undefined;
    this.Q6e = undefined;
    this.X6e = true;
    this.L6e = 0;
    this.$6e = undefined;
    this.SPe = undefined;
    this.Anl = false;
    this.xnl = 0;
    this.dqe = undefined;
    this.oDu = undefined;
    this.YVe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Y6e = () => {
      this.J6e();
    };
    this.RefreshByDetectingId = (e, i) => {
      if (this.H6e && this.H6e !== i) {
        this.H6e.SetToggleState(0);
      }
      this.SPe?.StopCurrentSequence(false, true);
      this.SPe?.PlayLevelSequenceByName("Switch");
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = e;
      this.H6e = i;
      this.F6e = e;
      var i = ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(e);
      var t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(i.Conf.MonsterInfoId).Name;
      var r = {
        Data: [{
          IncId: 0,
          ItemId: i.Conf.MonsterInfoId
        }, 1],
        Type: 3,
        BottomText: "",
        IsNotFoundVisible: i.IsLock,
        IsSelectedFlag: false,
        MonsterId: i.Conf.MonsterInfoId,
        IsQualityHidden: true,
        IconHidden: i.IsLock
      };
      this.$6e?.Apply(r);
      this.$6e?.SetToggleInteractive(false);
      var r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(TextById_1.configTextById.GetConfig(AdventureGuideController_1.DETECT).TextContent);
      this.j6e.SetText(r);
      if (i.IsLock) {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), AdventureGuideController_1.UNKNOWNTEXT);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.Conf.AttributesDescriptionLock);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.Conf.AttributesDescriptionUnlock);
        this.J6e();
      }
      var r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(i.Conf.DangerType);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(i.Conf.DangerType));
      this.SetSpriteByPath(r.Icon, this.GetSprite(6), false);
      if (i.Conf.ShowReward) {
        this.GetItem(9).SetUIActive(true);
        this.z6e(i.Conf.ShowReward, false);
      } else {
        this.GetItem(9).SetUIActive(false);
      }
      ControllerHolder_1.ControllerHolder.AdventureGuideController.NormalMonsterManualInfoRequest(e);
      var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("CanUpAbsorbDangerTypeList");
      var r = CommonParamById_1.configCommonParamById.GetIntArrayConfig("CanUpAbsorbTypeDescription2List");
      var e = t.includes(i.Conf.DangerType) && r.includes(i.Conf.TypeDescription2);
      this.GetText(15)?.SetUIActive(e);
      this.GetButton(16)?.RootUIComp.SetUIActive(e);
    };
    this.Z6e = e => {
      var i = new Array();
      for (const t of e) {
        i.push(t);
      }
      this.e8e(i);
      this.oDu = i;
      this.GetItem(18).SetUIActive(true);
      this.GetItem(19).SetUIActive(false);
      this.dqe.ResetSearch(true);
    };
    this.t8e = () => {
      var e;
      if (!(Time_1.Time.Now - this.L6e <= TimeUtil_1.TimeUtil.InverseMillisecond)) {
        this.L6e = Time_1.Time.Now;
        if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
        } else {
          e = this.GetCurrentId();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("AdventureGuide", 5, "手动探测怪物", ["探测Id", e]);
          }
          ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
          ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster, [], this.F6e);
        }
      }
    };
    this.i8e = () => {
      HelpController_1.HelpController.OpenHelpById(LEFT_TIME_HELP);
    };
    this.Pnl = () => {
      this.wnl();
      this.O6e?.SetAnimFinishDelegate(undefined);
    };
    this.Mbe = e => {
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetSearchList(this.k6e ?? [], e);
      this.GetItem(18).SetUIActive(e.length > 0);
      this.GetItem(19).SetUIActive(e.length <= 0);
      this.O6e.RefreshByData(e);
    };
    this.Tqe = () => {
      this.O6e.RefreshByData(this.oDu ?? []);
    };
  }
  GetCurrentId() {
    return this.F6e;
  }
  GetCurrentToggle() {
    return this.H6e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UISprite], [7, UE.UILoopScrollViewComponent], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIButtonComponent], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem]];
    this.BtnBindInfo = [[1, this.t8e], [16, this.i8e]];
  }
  OnStart() {
    this.O6e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(7), this.GetItem(2).GetOwner(), () => {
      var e = new MonsterDetectItem_1.MonsterDetectItem();
      e.BindCallback(this.RefreshByDetectingId);
      return e;
    });
    this.O6e.SetAnimFinishDelegate(this.Pnl);
    this.$6e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.$6e.Initialize(this.GetItem(14).GetOwner());
    this.k6e = new Array();
    this.H3e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.YVe);
    this.V6e = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(0), this.Z6e);
    this.j6e = this.GetText(10);
    this.j6e.OnSelfLanguageChange.Bind(this.Y6e);
    this.Q6e = this.GetButton(1);
    this.F6e = ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = ModelManager_1.ModelManager.CalabashModel.GetLeftIntensifyCaptureGuarantee();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "UpAbsorptionTimeWithTagText", e);
    this.Bnl();
    this.dqe = new CommonSearchComponent_1.CommonSearchComponent(this.GetItem(17), this.Mbe, this.Tqe);
  }
  Bnl() {
    var e = this.ExtraParams;
    var e = e.OpenTabViewName === "MonsterDetectView" ? Number(e.OpenParam) : undefined;
    if (e !== undefined && e > 0) {
      this.Anl = true;
    }
  }
  wnl() {
    var e;
    if (this.Anl && (this.Anl = false, e = this.O6e.UnsafeGetGridProxy(this.xnl))) {
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(e.GetToggleItem());
    }
  }
  OnBeforeShow() {
    var e = this.ExtraParams;
    var e = e.OpenTabViewName === "MonsterDetectView" ? Number(e.OpenParam) : undefined;
    let i = undefined;
    if (e !== undefined) {
      if (e > 0) {
        i = Number(e);
      } else {
        this.K6e = -Number(e);
      }
    }
    this.W6e = i;
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = i;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AdventureGuide", 27, "当前拾音辑录默认选择怪物", ["id", i]);
    }
    this.V6e.UpdateData(16, Array.from(ModelManager_1.ModelManager.AdventureGuideModel.GetAllDetectMonsters().values()));
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayLevelSequenceByName("Start");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, MONSTER_HELP);
  }
  OnBeforeDestroy() {
    this.H3e = undefined;
    if (this.O6e) {
      this.O6e.ClearGridProxies();
      this.O6e = undefined;
    }
    this.j6e.OnSelfLanguageChange.Unbind();
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  e8e(e) {
    this.k6e.length = 0;
    for (const i of e) {
      this.k6e.push(i);
      if (this.W6e !== -1 && this.W6e === i.Conf.Id) {
        this.W6e = -1;
      }
    }
    if (!ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId) {
      e = this.o8e();
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = e;
    }
    this.O6e.RefreshByData(this.k6e, false, () => {
      this.JumpToTarget(ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId);
    }, true);
  }
  o8e() {
    var e = this.K6e;
    this.K6e = undefined;
    if (this.k6e.length <= 0) {
      return -1;
    }
    var i = this.k6e[0].Conf.Id;
    if (e !== undefined) {
      for (const t of this.k6e) {
        if (!t.IsLock && t.Conf.DangerType === e) {
          return t.Conf.Id;
        }
      }
    }
    return i;
  }
  J6e() {
    var e = this.GetCurrentId();
    if (e &&= ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(e)) {
      this.GetItem(13).SetUIActive(e.IsLock);
      if (!e.IsLock && !(this.Q6e.RootUIComp.SetUIActive(true), e.IsLock) && !this.X6e) {
        this.Q6e.SetSelfInteractive(true);
        this.X6e = true;
      }
    }
  }
  Tick(e) {
    this.J6e();
  }
  z6e(e, i) {
    var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e);
    var r = new Array();
    for (const s of t.keys()) {
      var o = [{
        IncId: 0,
        ItemId: s
      }, t.get(s)];
      r.push(o);
    }
    this.H3e.RefreshByData(r);
  }
  JumpToTarget(e) {
    let i = 0;
    let t = false;
    for (const r of this.k6e) {
      if (e === r.Conf.Id) {
        this.O6e.DeselectCurrentGridProxy();
        this.O6e.ScrollToGridIndex(i, true);
        this.O6e.SelectGridProxy(i);
        t = true;
        break;
      }
      i++;
    }
    this.xnl = i;
    if (!t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AdventureGuide", 27, "找不到拾音辑录跳转Target", ["target", e]);
      }
    }
  }
}
exports.MonsterDetectView = MonsterDetectView;
//# sourceMappingURL=MonsterDetectView.js.map