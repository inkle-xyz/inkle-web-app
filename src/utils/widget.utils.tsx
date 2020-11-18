import { SetterOrUpdater } from 'recoil';
import { Widget, WidgetVariable } from '../interfaces/widget.interface';

/**
 * Higher order function to update a widgetVariables field
 * @param {string} field - The field to update
 * @param {Function} setFunction - the setState function to update the global state
 */
export const updateWidgetVariableField = (
  field: string,
  setFunction: SetterOrUpdater<Widget | null>,
) => (newValue: string, id: string, widget: Widget): void => {
  const newWidgetVariables = JSON.parse(JSON.stringify(widget.variables));
  for (let i = 0; i < newWidgetVariables.length; i += 1) {
    if (newWidgetVariables[i].id === id) {
      newWidgetVariables[i][field] = newValue;
    }
  }
  setFunction((w) => {
    if (w) {
      return {
        ...w,
        variables: newWidgetVariables,
      };
    }
    return null;
  });
};

export const deleteWidgetVariable = (
  setFunction: SetterOrUpdater<Widget | null>,
) => (id: string, widget: Widget): void => {
  const newWidgetVariables: WidgetVariable[] = JSON.parse(JSON.stringify(widget.variables));
  setFunction((w) => {
    if (w) {
      return {
        ...w,
        variables: newWidgetVariables.filter((variable) => variable.id !== id),
      };
    }
    return null;
  });
};

export const getScopeFromWidget = (widget: Widget): Record<string, any> => {
  const p: Record<string, any> = {};
  if (widget) {
    const widgetVariables = widget?.variables;
    for (let i = 0; i < widgetVariables.length; i += 1) {
      p[widgetVariables[i].name] = widgetVariables[i].value;
    }
  }
  return p;
};
