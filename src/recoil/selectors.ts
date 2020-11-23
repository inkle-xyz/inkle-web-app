import { selector } from 'recoil';
import { selectedWidgetState, userState } from './atoms';

export const isUsersWidgetState = selector<boolean>({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const user = get(userState);
    const currentWidget = get(selectedWidgetState);
    if (user?.isAdmin) {
      return true;
    }
    if (user && currentWidget) {
      return currentWidget.author === user.id;
    }
    return false;
  },
});
