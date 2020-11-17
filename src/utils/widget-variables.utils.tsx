import { SetterOrUpdater } from 'recoil';
import { WidgetVariable } from '../interfaces/widget.interface';

/**
 * Higher order function to update a widgetVariables field
 * @param {string} field - The field to update
 * @param {Function} setFunction - the setState function to update the global state
 */
export const updateWidgetVariableField = (
  field: string,
  setFunction: SetterOrUpdater<WidgetVariable[]>,
) => (newValue: string, id: string, widgetVariables: WidgetVariable[]): void => {
  const newWidgetVariables = JSON.parse(JSON.stringify(widgetVariables));
  for (let i = 0; i < newWidgetVariables.length; i += 1) {
    if (newWidgetVariables[i].id === id) {
      newWidgetVariables[i][field] = newValue;
    }
  }
  setFunction(newWidgetVariables);
};

export const deleteWidgetVariable = (
  setFunction: SetterOrUpdater<WidgetVariable[]>,
) => (id: string, widgetVariables: WidgetVariable[]): void => {
  const newWidgetVariables: WidgetVariable[] = JSON.parse(JSON.stringify(widgetVariables));
  setFunction(newWidgetVariables.filter((variable) => variable.id !== id));
};
