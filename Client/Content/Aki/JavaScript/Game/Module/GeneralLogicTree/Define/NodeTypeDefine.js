"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newNodeObj = exports.childQuestNodeType = exports.NodeTypeData = undefined;
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const TimerNode_1 = require("../../TimerNode");
const AtomicProcessBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/AtomicProcessBehaviorNode");
const AwakeAndLoadEntityNode_1 = require("../BehaviorNode/ChildQuestNode/AwakeAndLoadEntityNode");
const CheckCombatStateBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckCombatStateBehaviorNode");
const CheckEntityStateNode_1 = require("../BehaviorNode/ChildQuestNode/CheckEntityStateNode");
const CheckLevelPlayBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckLevelPlayBehaviorNode");
const CheckPlayerInputBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckPlayerInputBehaviorNode");
const CommunicateNode_1 = require("../BehaviorNode/ChildQuestNode/CommunicateNode");
const CompareDemoActorVarChildQuestNode_1 = require("../BehaviorNode/ChildQuestNode/CompareDemoActorVarChildQuestNode");
const DeliverBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/DeliverBehaviorNode");
const EntityPhotoBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/EntityPhotoBehaviorNode");
const GuideFinishBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/GuideFinishBehaviorNode");
const InteractBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/InteractBehaviorNode");
const KillBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/KillBehaviorNode");
const MonsterCreatorBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/MonsterCreatorBehaviorNode");
const ParallaxBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ParallaxBehaviorNode");
const ParkourBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ParkourBehaviorNode");
const PlayFlowBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/PlayFlowBehaviorNode");
const ReachAreaBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode");
const ReadMailBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReadMailBehaviorNode");
const ReadPhoneMessageBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReadPhoneMessageBehaviorNode");
const ServerAchieveChildQuestNode_1 = require("../BehaviorNode/ChildQuestNode/ServerAchieveChildQuestNode");
const ShowUiBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ShowUiBehaviorNode");
const TakePicturesWithTimeScaleChildQuestNode_1 = require("../BehaviorNode/ChildQuestNode/TakePicturesWithTimeScaleChildQuestNode");
const UseItemBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/UseItemBehaviorNode");
const WaitSceneReferenceEntityPlaySequenceNode_1 = require("../BehaviorNode/ChildQuestNode/WaitSceneReferenceEntityPlaySequenceNode");
const WalkingPatternBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/WalkingPatternBehaviorNode");
const ParallelSelectNode_1 = require("../BehaviorNode/LogicNode/ParallelSelectNode");
const SequenceNode_1 = require("../BehaviorNode/LogicNode/SequenceNode");
const QuestFailedBehaviorNode_1 = require("../BehaviorNode/QuestFailedBehaviorNode");
class NodeTypeData {
  constructor(e) {
    this.Ctor = e;
  }
}
const defaultNodeType = new (exports.NodeTypeData = NodeTypeData)(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode);
function newNodeObj(d) {
  if (d) {
    let o = undefined;
    var a = d.Id;
    switch (d.Type) {
      case "ChildQuest":
        {
          var r = d.Condition.Type;
          let e = exports.childQuestNodeType[r];
          e = e || defaultNodeType;
          o = new e.Ctor(a);
          break;
        }
      case "QuestFailed":
        o = new QuestFailedBehaviorNode_1.QuestFailedBehaviorNode(a);
        break;
      case "ParallelSelect":
        o = new ParallelSelectNode_1.ParallelSelectNode(a);
        break;
      case "Sequence":
        o = new SequenceNode_1.SequenceNode(a);
    }
    return o;
  }
}
exports.childQuestNodeType = {
  [IQuest_1.EChildQuest.DoInteract]: new NodeTypeData(InteractBehaviorNode_1.InteractBehaviorNode),
  [IQuest_1.EChildQuest.Kill]: new NodeTypeData(KillBehaviorNode_1.KillBehaviorNode),
  [IQuest_1.EChildQuest.ReachArea]: new NodeTypeData(ReachAreaBehaviorNode_1.ReachAreaBehaviorNode),
  [IQuest_1.EChildQuest.PlayFlow]: new NodeTypeData(PlayFlowBehaviorNode_1.PlayFlowBehaviorNode),
  [IQuest_1.EChildQuest.GetItem]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.UseSkill]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.GetSkill]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.DetectCombatState]: new NodeTypeData(CheckCombatStateBehaviorNode_1.CheckCombatStateBehaviorNode),
  [IQuest_1.EChildQuest.Timer]: new NodeTypeData(TimerNode_1.TimerNode),
  [IQuest_1.EChildQuest.Parkour]: new NodeTypeData(ParkourBehaviorNode_1.ParkourBehaviorNode),
  [IQuest_1.EChildQuest.MonsterCreator]: new NodeTypeData(MonsterCreatorBehaviorNode_1.MonsterCreatorBehaviorNode),
  [IQuest_1.EChildQuest.HandInItems]: new NodeTypeData(DeliverBehaviorNode_1.DeliverBehaviorNode),
  [IQuest_1.EChildQuest.InformationViewCheck]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.UseItem]: new NodeTypeData(UseItemBehaviorNode_1.UseItemBehaviorNode),
  [IQuest_1.EChildQuest.CheckLevelPlay]: new NodeTypeData(CheckLevelPlayBehaviorNode_1.CheckLevelPlayBehaviorNode),
  [IQuest_1.EChildQuest.CheckEntityState]: new NodeTypeData(CheckEntityStateNode_1.CheckEntityStateNode),
  [IQuest_1.EChildQuest.FinishDungeon]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.WaitTime]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.ScheduleTime]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.ReadMail]: new NodeTypeData(ReadMailBehaviorNode_1.ReadMailBehaviorNode),
  [IQuest_1.EChildQuest.Guide]: new NodeTypeData(GuideFinishBehaviorNode_1.GuideFinishBehaviorNode),
  [IQuest_1.EChildQuest.EnterDungeon]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.LeaveDungeon]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.CheckTargetBattleAttribute]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.CompareVar]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.CheckUiGame]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.ReceiveTelecom]: new NodeTypeData(CommunicateNode_1.CommunicateNode),
  [IQuest_1.EChildQuest.ShowUi]: new NodeTypeData(ShowUiBehaviorNode_1.ShowUiBehaviorNode),
  [IQuest_1.EChildQuest.WaitBattleCondition]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.TakePhoto]: new NodeTypeData(EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode),
  [IQuest_1.EChildQuest.VisionSystem]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.ParallaxAlign]: new NodeTypeData(ParallaxBehaviorNode_1.ParallaxBehaviorNode),
  [IQuest_1.EChildQuest.CheckConditionGroup]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.CheckActivityState]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.CheckPlayerInput]: new NodeTypeData(CheckPlayerInputBehaviorNode_1.CheckPlayerInputBehaviorNode),
  [IQuest_1.EChildQuest.AwakeAndLoadEntity]: new NodeTypeData(AwakeAndLoadEntityNode_1.AwakeAndLoadEntityNode),
  [IQuest_1.EChildQuest.WalkingPattern]: new NodeTypeData(WalkingPatternBehaviorNode_1.WalkingPatternBehaviorNode),
  [IQuest_1.EChildQuest.DetectCombatState2]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.FinishBvbChallenge]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.FinishTrapDefense]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.CheckTrapDefenseEvent]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.CompareActorVar]: new NodeTypeData(CompareDemoActorVarChildQuestNode_1.CompareDemoActorVarChildQuestNode),
  [IQuest_1.EChildQuest.ProgramSpecialProcess]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.WaitUntilLevelSequenceReachMark]: new NodeTypeData(WaitSceneReferenceEntityPlaySequenceNode_1.WaitSceneReferenceEntityPlaySequenceNode),
  [IQuest_1.EChildQuest.FinishSurvivorsRouge]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.TakePicturesWithTimeScale]: new NodeTypeData(TakePicturesWithTimeScaleChildQuestNode_1.TakePicturesWithTimeScaleChildQuestNode),
  [IQuest_1.EChildQuest.AtomicProcess]: new NodeTypeData(AtomicProcessBehaviorNode_1.AtomicProcessBehaviorNode),
  [IQuest_1.EChildQuest.FinishRollBlock]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode),
  [IQuest_1.EChildQuest.ReadPhoneMessage]: new NodeTypeData(ReadPhoneMessageBehaviorNode_1.ReadPhoneMessageBehaviorNode),
  [IQuest_1.EChildQuest.UseWeatherSwitch]: new NodeTypeData(ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode)
};
exports.newNodeObj = newNodeObj; //# sourceMappingURL=NodeTypeDefine.js.map