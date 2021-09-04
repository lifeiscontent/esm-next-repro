import * as React from 'react';
import * as warning from 'warning';

export function useControlledSwitchWarning(
  controlledPropValue: unknown,
  controlledPropName: string,
  callerName: string
): void {
  const isControlled = controlledPropValue != null;
  const { current: wasControlled } = React.useRef(isControlled);

  React.useEffect(() => {
    warning(
      !(isControlled && !wasControlled),
      `\`${callerName}\` is changing from uncontrolled to be controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${callerName}\` for the lifetime of the component. Check the \`${controlledPropName}\` prop.`
    );
    warning(
      !(!isControlled && wasControlled),
      `\`${callerName}\` is changing from controlled to be uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${callerName}\` for the lifetime of the component. Check the \`${controlledPropName}\` prop.`
    );
  }, [callerName, controlledPropName, isControlled, wasControlled]);
}
