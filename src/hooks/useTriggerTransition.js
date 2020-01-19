import { useContext } from "react";
import { Context } from "../context/createTransitionContext";
import { triggerTransition } from "../utils/triggerTransition";

const useTriggerTransition = defaultOptions => {
  const context = useContext(Context);
  const programmaticallyTriggerTransition = calledOptions => {
    // If the user has set their browser or OS to prefers-reduced-motion
    // we should respect that.
    const forceZeroMotion = {};
    if (context.disableAnimation) {
      forceZeroMotion.exit = {
        length: 0,
        delay: 0
      };
      forceZeroMotion.entry = {
        length: 0,
        delay: 0
      };
    }

    // allow passing an event directly instead of options
    if (
      calledOptions instanceof Event ||
      (calledOptions.nativeEvent && calledOptions.nativeEvent instanceof Event)
    ) {
      calledOptions = {
        event: calledOptions
      };
    }

    triggerTransition({
      ...context,
      ...defaultOptions,
      ...calledOptions,
      ...forceZeroMotion
    });
  };
  return programmaticallyTriggerTransition;
};

export { useTriggerTransition };
