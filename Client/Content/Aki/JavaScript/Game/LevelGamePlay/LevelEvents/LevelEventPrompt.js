"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventPrompt = void 0;
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  GameplayViewDefine_1 = require("../../../Game/Module/LevelPlay/GameplayView/GameplayViewDefine"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPrompt extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, i) {
    var t = e;
    if (t) {
      if (3 === i.Type) {
        i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(i.LevelPlayId);
        if (i && "Hang" === i.OnlineType && ModelManager_1.ModelManager.GameModeModel.IsMulti) return
      }
      var o = t.TipOption;
      if (o) {
        let e = void 0,
          i = void 0,
          r = 0,
          a = void 0,
          n = void 0;
        switch (o.Type) {
          case IAction_1.ECommonTipType.TipId:
            a = o.Id, r = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(a).TypeId, e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(a).TipsText);
            break;
          case IAction_1.ECommonTipType.ChallengeFail:
            e = o.TidMainText, r = 4;
            break;
          case IAction_1.ECommonTipType.ChallengeCondition:
            e = o.TidMainText, i = o.TidSubText, r = 0;
            break;
          case IAction_1.ECommonTipType.ChallengeSuccess:
            e = o.TidMainText, r = 3;
            break;
          case IAction_1.ECommonTipType.GeneralFloatingTip:
            e = o.TidMainText, r = 9;
            break;
          case IAction_1.ECommonTipType.MissionComplete:
            e = o.TidMainText, i = o.TidSubText, r = 7;
            break;
          case IAction_1.ECommonTipType.ReachChallenge:
            e = o.TidMainText, r = 5;
            break;
          case IAction_1.ECommonTipType.TriggerDelegation:
            e = o.TidMainText, i = o.TidSubText, r = 6;
            break;
          case IAction_1.ECommonTipType.PrepareCountdown:
            r = 13;
            break;
          case IAction_1.ECommonTipType.EnterInRange:
            var l = o.TidText;
            return l ? ((_ = new GameplayViewDefine_1.GameplayEnterViewData).InfoId = "GameplayEnter", _.TitleId = l, void UiManager_1.UiManager.OpenView("GameplayEnterView", _)) : void 0;
          case IAction_1.ECommonTipType.FirstComplete:
            l = o.TidText;
            return l ? ((_ = new GameplayViewDefine_1.GameplayFirstPassViewData).InfoId = "GameplayFirstPass", _.TitleId = l, void UiManager_1.UiManager.OpenView("GameplayFirstPassView", _)) : void 0;
          case IAction_1.ECommonTipType.RemainStarWarning:
            r = 18;
            l = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(l);
            break;
          case IAction_1.ECommonTipType.DreamlessWarning:
            r = 20;
            var _ = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(_);
            break;
          case IAction_1.ECommonTipType.PunishReport:
            l = o;
            return void UiManager_1.UiManager.OpenView("PunishReportView", l);
          case IAction_1.ECommonTipType.WhiteCatWarning:
            r = 22;
            _ = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(_);
            break;
          case IAction_1.ECommonTipType.BlackCatWarning:
            r = 23;
            l = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(l);
            break;
          case IAction_1.ECommonTipType.SlashAndTowerTip:
            _ = o.WarningText;
            return void EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerBattleTip, _);
          case IAction_1.ECommonTipType.BadBuKingChallengeTip:
            l = o.WarningText;
            return void EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowBadDangoTip, l);
          case IAction_1.ECommonTipType.MoraleAreaTip:
            _ = {
              AreaId: o.AreaType
            };
            return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(31, void 0, void 0, [PublicUtil_1.PublicUtil.GetConfigTextByKey(o.TidAreaNameText)], [PublicUtil_1.PublicUtil.GetConfigTextByKey(o.TidRecommendText)], void 0, void 0, _);
          default:
            return
        }
        e = e && PublicUtil_1.PublicUtil.GetConfigTextByKey(e), i = i && PublicUtil_1.PublicUtil.GetConfigTextByKey(i), ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(r, n, void 0, [e], [i], a, void 0, void 0, t.Duration)
      } else i = e.GeneralTextId, t = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(i).TypeId, ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(t, void 0, void 0, void 0, void 0, i)
    }
  }
}
exports.LevelEventPrompt = LevelEventPrompt;
//# sourceMappingURL=LevelEventPrompt.js.map