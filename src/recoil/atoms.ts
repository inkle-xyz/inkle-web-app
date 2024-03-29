import { atom } from 'recoil';
import { Widget } from '../interfaces/widget.interface';
import { User } from '../interfaces/user.interface';

export const selectedWidgetState = atom<Widget | null>({
  key: 'selectedWidget',
  default: null,
});

export const originalSelectedWidgetState = atom<Widget | null>({
  key: 'originalSelectedWidget',
  default: null,
});

export const userState = atom<User | null>({
  key: 'user',
  default: null,
});

export const usersWidgetsState = atom<Widget[] | null>({
  key: 'usersWidgets',
  default: null,
});

export const userWidgetCodeState = atom<string>({
  key: 'userWidgetCode',
  default: '',
});

export const isWidgetErrorsState = atom<boolean>({
  key: 'isWidgetErrors',
  default: false,
});

export const signupWidgetState = atom<boolean>({
  key: 'signupWidgetState',
  default: false,
});
