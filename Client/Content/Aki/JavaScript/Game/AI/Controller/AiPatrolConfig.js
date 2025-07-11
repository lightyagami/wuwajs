"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiPatrolConfig = undefined;
class AiPatrolConfig {
  constructor() {
    this.Id = 0;
    this.CirclePatrol = false;
    this.SplineEntityId = 0;
    this.IsNavigation = false;
    this.StartIndex = 0;
    this.LimitNpcDistance = 0;
    this.TurnSpeed = 0;
    this.Loop = false;
    this.EndDistance = 0;
    this.Sampling = 0;
    this.ContainZ = false;
  }
  Init(t) {
    this.Id = t.Id;
    this.CirclePatrol = t.CirclePatrol;
    this.IsNavigation = t.IsNavigation;
    this.StartIndex = t.StartIndex;
    this.LimitNpcDistance = t.LimitNpcDistance;
    this.TurnSpeed = t.TurnSpeed;
    this.Loop = t.Loop;
    this.EndDistance = t.EndDistance;
    this.Sampling = t.Sampling;
    this.ContainZ = t.ContainZ;
  }
}
exports.AiPatrolConfig = AiPatrolConfig;
//# sourceMappingURL=AiPatrolConfig.js.map